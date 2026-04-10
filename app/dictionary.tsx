// dictionary.tsx — Dictionary screen
//
// A searchable reference covering ALL vocabulary across A1–B2.
// The dictionary is level-agnostic — it always shows every word.
//
// Search modes (in priority order):
//   1. German direct match  — query matches base word or word-with-article
//   2. Conjugation match    — query matches a conjugated form (index built from data)
//   3. English match        — query matches any word in the English translation
//
// Filter pills: All / Nouns / Verbs / Adjectives / Prepositions / Other
// Sub-category dropdowns (Nouns, Verbs, Prepositions, Other) — same pattern as flashcards.tsx
// Alphabetical SectionList when idle; flat FlatList when searching.
// Bottom sheet for nouns, adjectives, other word types.
// Full-screen verb detail for verbs (dictionary-verb.tsx).
// Recently viewed stored in AsyncStorage ("dictionary_recent").

import React, {
  useState, useCallback, useRef, useMemo,
} from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, FlatList, SectionList, Animated,
  ScrollView, useWindowDimensions,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import { A1_WORDS } from '../src/data/vocabulary/a1';
import { A2_WORDS } from '../src/data/vocabulary/a2';
import { B1_WORDS } from '../src/data/vocabulary/b1';
import { B2_WORDS } from '../src/data/vocabulary/b2';
import type { Word } from '../src/data/vocabulary/types';
import {
  colors, font, fontSize, spacing, radius,
} from '../src/styles/theme';
import type { Level } from '../src/store/useLevelStore';

// ─── Types ─────────────────────��───────────────────────────────────────────────

// Every word in the dictionary carries its level (A1/A2/B1/B2)
export type WordWithLevel = Word & { level: Level };

// Main filter pill categories
type CategoryId = 'All' | 'Nouns' | 'Verbs' | 'Adjectives' | 'Prepositions' | 'Other';

// Sub-category types — same as flashcards.tsx
type VerbSubCategory        = 'Regular' | 'Irregular' | 'Modal' | 'Separable' | 'Reflexive';
type NounSubCategory        = 'der' | 'die' | 'das';
type PrepositionSubCategory = 'Accusative' | 'Dative' | 'Two-way' | 'Genitive';
type OtherSubCategory       = 'Adverbs' | 'Conjunctions' | 'Pronouns' | 'Phrases';

// Items rendered by the search FlatList (section headers or word rows)
type ListItem =
  | { kind: 'header'; title: string }
  | { kind: 'word'; word: WordWithLevel; conjNote?: string };

// ─── Module-level constant — built once, never re-computed ────────────────────
// Tag each word with its source level, then combine all levels.

const ALL_WORDS: WordWithLevel[] = [
  ...A1_WORDS.map(w => ({ ...w, level: 'A1' as Level })),
  ...A2_WORDS.map(w => ({ ...w, level: 'A2' as Level })),
  ...B1_WORDS.map(w => ({ ...w, level: 'B1' as Level })),
  ...B2_WORDS.map(w => ({ ...w, level: 'B2' as Level })),
];

// Word count per category — static since ALL_WORDS never changes
const CATEGORY_COUNTS: Record<string, number> = {
  All:          ALL_WORDS.length,
  Nouns:        ALL_WORDS.filter(w => w.partOfSpeech === 'noun').length,
  Verbs:        ALL_WORDS.filter(w => w.partOfSpeech === 'verb').length,
  Adjectives:   ALL_WORDS.filter(w => w.partOfSpeech === 'adjective').length,
  Prepositions: ALL_WORDS.filter(w => w.partOfSpeech === 'preposition').length,
  Other:        ALL_WORDS.filter(w => !['noun', 'verb', 'adjective', 'preposition'].includes(w.partOfSpeech)).length,
};

// ─── Helper functions ─────────────────────────────────────────────────────────

// Strip leading article / "sich" and lowercase — used for sorting and indexing.
// "der Abend" → "abend", "sich ärgern" → "ärgern"
function baseWord(german: string): string {
  return german.replace(/^(der|die|das|sich)\s+/i, '').toLowerCase();
}

// Web Speech API — speaks text in German. No-op in environments without speech.
function speakGerman(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'de-DE';
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

// Strip article prefix from a user-typed query: "der Mann" → "mann"
function stripArticle(q: string): string {
  return q.replace(/^(der|die|das|ein|eine)\s+/i, '').toLowerCase();
}

// ─── Sub-category detection — ported from flashcards.tsx ─────────────────────

const MODAL_VERBS = ['können', 'müssen', 'wollen', 'möchten', 'dürfen', 'sollen'];

// Irregular if er/sie/es form doesn't match the expected regular stem + 't' or 'et'
function isIrregularVerb(word: Word): boolean {
  const stem = word.german.replace(/\s.*$/, '').replace(/en$|n$/, ''); // strip separable particle
  const er = word.conjugations?.er ?? '';
  // For separable verbs, the er form includes the particle: strip it for comparison
  const erStem = er.includes(' ') ? er.split(' ')[0] : er;
  return erStem !== stem + 't' && erStem !== stem + 'et';
}

function getVerbSubCategory(word: Word): VerbSubCategory {
  if (MODAL_VERBS.includes(word.german)) return 'Modal';
  if (word.german.startsWith('sich '))   return 'Reflexive';
  if (word.conjugations?.ich?.includes(' ')) return 'Separable';
  if (word.conjugations && isIrregularVerb(word)) return 'Irregular';
  return 'Regular';
}

// Case map for prepositions — covers all common German prepositions
const PREPOSITION_CASES: Record<string, PrepositionSubCategory> = {
  durch: 'Accusative', für: 'Accusative', gegen: 'Accusative',
  ohne: 'Accusative', um: 'Accusative', bis: 'Accusative', entlang: 'Accusative',
  aus: 'Dative', bei: 'Dative', mit: 'Dative', nach: 'Dative',
  seit: 'Dative', von: 'Dative', zu: 'Dative', gegenüber: 'Dative', außer: 'Dative',
  an: 'Two-way', auf: 'Two-way', hinter: 'Two-way', in: 'Two-way',
  neben: 'Two-way', über: 'Two-way', unter: 'Two-way', vor: 'Two-way', zwischen: 'Two-way',
  wegen: 'Genitive', trotz: 'Genitive', während: 'Genitive',
  innerhalb: 'Genitive', außerhalb: 'Genitive', statt: 'Genitive', anstatt: 'Genitive',
};

// Preposition case display label (for bottom sheet info box)
const PREP_CASE_DISPLAY: Record<PrepositionSubCategory, string> = {
  Accusative: 'Takes Akkusativ',
  Dative:     'Takes Dativ',
  'Two-way':  'Two-way (Akk/Dat)',
  Genitive:   'Takes Genitiv',
};

// Sub-category pill definitions per main category
const VERB_SUBCATS:  { label: VerbSubCategory }[]        = [{ label: 'Modal' }, { label: 'Separable' }, { label: 'Reflexive' }, { label: 'Irregular' }, { label: 'Regular' }];
const NOUN_SUBCATS:  { label: NounSubCategory }[]        = [{ label: 'der' }, { label: 'die' }, { label: 'das' }];
const PREP_SUBCATS:  { label: PrepositionSubCategory }[] = [{ label: 'Accusative' }, { label: 'Dative' }, { label: 'Two-way' }, { label: 'Genitive' }];
const OTHER_SUBCATS: { label: OtherSubCategory }[]       = [{ label: 'Adverbs' }, { label: 'Conjunctions' }, { label: 'Pronouns' }, { label: 'Phrases' }];

// Categories that have sub-category dropdowns
const SUBCATEGORY_CATS: CategoryId[] = ['Verbs', 'Nouns', 'Prepositions', 'Other'];

// POS map for the Other sub-category filter
const OTHER_POS_MAP: Record<OtherSubCategory, string> = {
  Adverbs: 'adverb', Conjunctions: 'conjunction', Pronouns: 'pronoun', Phrases: 'phrase',
};

// ─── Level badge colours ───────────────────────────────────────────────────────

const LEVEL_STYLE: Record<Level, { bg: string; text: string }> = {
  A1: { bg: '#f0fdf4', text: '#16a34a' },
  A2: { bg: '#eff6ff', text: '#2563eb' },
  B1: { bg: '#fffbeb', text: '#f59e0b' },
  B2: { bg: '#fef2f2', text: '#dc2626' },
};

// ─── Index builders ───────────────────────────────────────────────────────────

// 1. German base-word → entry
function buildGermanIndex(words: WordWithLevel[]): Map<string, WordWithLevel> {
  const map = new Map<string, WordWithLevel>();
  for (const w of words) {
    const key = baseWord(w.german);
    if (!map.has(key)) map.set(key, w);
  }
  return map;
}

// 2. Conjugated form → { base word entry, pronoun label }
//    Also indexes the stem of separable verbs without the particle.
function buildConjugationIndex(
  words: WordWithLevel[],
): Map<string, { word: WordWithLevel; pronoun: string }> {
  const map = new Map<string, { word: WordWithLevel; pronoun: string }>();
  const PRONOUN_LABELS: Record<string, string> = {
    ich: 'ich, Präsens', du: 'du, Präsens', er: 'er/sie/es, Präsens',
    wir: 'wir, Präsens', ihr: 'ihr, Präsens', sie: 'sie/Sie, Präsens',
  };
  for (const w of words) {
    if (!w.conjugations) continue;
    for (const [pronoun, form] of Object.entries(w.conjugations)) {
      const label   = PRONOUN_LABELS[pronoun] ?? pronoun;
      const formKey = form.toLowerCase();
      if (!map.has(formKey)) map.set(formKey, { word: w, pronoun: label });
      // For separable verbs ("rufe an"), also index the stem alone ("rufe")
      const parts = form.split(' ');
      if (parts.length === 2) {
        const stemKey = parts[0].toLowerCase();
        if (!map.has(stemKey)) map.set(stemKey, { word: w, pronoun: label });
      }
    }
  }
  return map;
}

// 3. English token → matching word entries
function buildEnglishIndex(words: WordWithLevel[]): Map<string, WordWithLevel[]> {
  const map = new Map<string, WordWithLevel[]>();
  function add(key: string, word: WordWithLevel) {
    const k = key.toLowerCase().trim();
    if (!k || k.length < 2) return;
    if (!map.has(k)) map.set(k, []);
    const arr = map.get(k)!;
    if (!arr.includes(word)) arr.push(word);
  }
  for (const w of words) {
    add(w.english, w);
    const tokens = w.english.split(/[\s/,()\-]+/);
    for (const t of tokens) add(t.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, ''), w);
  }
  return map;
}

// ─── AsyncStorage helpers ────��─────────────────────────────────────────────────

const RECENT_KEY = 'dictionary_recent';

async function loadRecentIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

async function addToRecent(word: WordWithLevel): Promise<void> {
  try {
    const ids = await loadRecentIds();
    const updated = [word.id, ...ids.filter(id => id !== word.id)].slice(0, 10);
    await AsyncStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch {}
}

// ─── Sub-components ────────────────────────────────────────────────────────────

// Small pill showing the word's level (A1/A2/B1/B2)
function LevelBadge({ level, large }: { level: Level; large?: boolean }) {
  const s = LEVEL_STYLE[level];
  return (
    <View style={[
      styles.levelBadge,
      { backgroundColor: s.bg },
      large && { paddingHorizontal: 10, paddingVertical: 4 },
    ]}>
      <Text style={[styles.levelBadgeText, { color: s.text }, large && { fontSize: 12 }]}>
        {level}
      </Text>
    </View>
  );
}

// One row in the word list
function WordRow({ word, conjNote, onPress }: {
  word: WordWithLevel;
  conjNote?: string;
  onPress: () => void;
}) {
  const typeLabel =
    word.partOfSpeech === 'noun'        ? 'noun' :
    word.partOfSpeech === 'verb'        ? 'verb' :
    word.partOfSpeech === 'adjective'   ? 'adj'  :
    word.partOfSpeech === 'adverb'      ? 'adv'  :
    word.partOfSpeech === 'preposition' ? 'prep' :
    word.partOfSpeech === 'conjunction' ? 'conj' :
    word.partOfSpeech === 'pronoun'     ? 'pron' :
    'other';

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.6}>
      <View style={styles.rowLeft}>
        <Text style={styles.rowGerman}>{word.german}</Text>
        {conjNote ? <Text style={styles.rowConjNote}>{conjNote}</Text> : null}
      </View>
      <View style={styles.rowRight}>
        <Text style={styles.rowType}>{typeLabel}</Text>
        <LevelBadge level={word.level} />
        <Feather name="chevron-right" size={14} color={colors.border} />
      </View>
    </TouchableOpacity>
  );
}

// ─── Bottom sheet content ──���───────────────────────────────────────────────────

function SheetContent({ word }: { word: WordWithLevel }) {
  if (word.partOfSpeech === 'noun') {
    const parts   = word.german.split(' ');
    const article = parts[0] ?? '';
    const name    = parts.slice(1).join(' ') || word.german;

    return (
      <View style={styles.sheetInner}>
        <View style={styles.handle} />
        <View style={styles.sheetHeader}>
          <View style={styles.sheetHeaderLeft}>
            <Text style={styles.sheetArticle}>{article}</Text>
            <Text style={styles.sheetWord}>{name}</Text>
          </View>
          <View style={styles.sheetHeaderRight}>
            <TouchableOpacity onPress={() => speakGerman(`${article} ${name}`)} style={styles.speakerBtn}>
              <Feather name="volume-2" size={20} color={colors.accent} />
            </TouchableOpacity>
            <LevelBadge level={word.level} large />
          </View>
        </View>
        <Text style={styles.sheetEnglish}>{word.english}</Text>
        <View style={[styles.infoCard, { marginTop: spacing.lg }]}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Plural</Text>
            <Text style={styles.infoValue}>{word.plural ?? '—'}</Text>
          </View>
        </View>
        <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>EXAMPLE</Text>
        <Text style={styles.exampleDe}>{word.exampleDe}</Text>
        <Text style={styles.exampleEn}>{word.exampleEn}</Text>
      </View>
    );
  }

  if (word.partOfSpeech === 'adjective') {
    return (
      <View style={styles.sheetInner}>
        <View style={styles.handle} />
        <View style={styles.sheetHeader}>
          <View style={styles.sheetHeaderLeft}>
            <Text style={styles.sheetWord}>{word.german}</Text>
          </View>
          <View style={styles.sheetHeaderRight}>
            <TouchableOpacity onPress={() => speakGerman(word.german)} style={styles.speakerBtn}>
              <Feather name="volume-2" size={20} color={colors.accent} />
            </TouchableOpacity>
            <LevelBadge level={word.level} large />
          </View>
        </View>
        <Text style={styles.sheetEnglish}>{word.english}</Text>
        {word.comparative && (
          <View style={[styles.infoCard, { marginTop: spacing.lg }]}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Comparative</Text>
              <Text style={styles.infoValue}>{word.comparative}</Text>
            </View>
          </View>
        )}
        <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>EXAMPLE</Text>
        <Text style={styles.exampleDe}>{word.exampleDe}</Text>
        <Text style={styles.exampleEn}>{word.exampleEn}</Text>
      </View>
    );
  }

  // Preposition, conjunction, adverb, pronoun, phrase
  const prepCase = word.partOfSpeech === 'preposition'
    ? PREPOSITION_CASES[word.german.toLowerCase()]
    : undefined;
  const caseLabel = prepCase ? PREP_CASE_DISPLAY[prepCase] : null;

  const typeDisplay =
    word.partOfSpeech === 'preposition' ? 'Preposition' :
    word.partOfSpeech === 'conjunction' ? 'Conjunction' :
    word.partOfSpeech === 'adverb'      ? 'Adverb'      :
    word.partOfSpeech === 'pronoun'     ? 'Pronoun'      :
    word.partOfSpeech === 'phrase'      ? 'Phrase'       :
    word.partOfSpeech;

  return (
    <View style={styles.sheetInner}>
      <View style={styles.handle} />
      <View style={styles.sheetHeader}>
        <View style={styles.sheetHeaderLeft}>
          <Text style={styles.sheetWord}>{word.german}</Text>
          <Text style={styles.sheetTypeLabel}>{typeDisplay}</Text>
        </View>
        <View style={styles.sheetHeaderRight}>
          <TouchableOpacity onPress={() => speakGerman(word.german)} style={styles.speakerBtn}>
            <Feather name="volume-2" size={20} color={colors.accent} />
          </TouchableOpacity>
          <LevelBadge level={word.level} large />
        </View>
      </View>
      <Text style={styles.sheetEnglish}>{word.english}</Text>
      {caseLabel && (
        <View style={[styles.infoBox, { marginTop: spacing.lg }]}>
          <Feather name="info" size={13} color={colors.accent} style={{ marginRight: 8 }} />
          <Text style={styles.infoBoxText}>{caseLabel}</Text>
        </View>
      )}
      <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>EXAMPLE</Text>
      <Text style={styles.exampleDe}>{word.exampleDe}</Text>
      <Text style={styles.exampleEn}>{word.exampleEn}</Text>
    </View>
  );
}

// ─── Alphabetical section type ─────────────────────────────────────────────────

type Section = { title: string; data: WordWithLevel[] };

// ─── Main screen ───────────────────────────────────────────────────────────────

const CATEGORIES: CategoryId[] = ['All', 'Nouns', 'Verbs', 'Adjectives', 'Prepositions', 'Other'];

export default function DictionaryScreen() {
  const router = useRouter();
  const { height: screenHeight } = useWindowDimensions();
  const sheetHeight = screenHeight * 0.6;

  // ── Search state ──
  const [rawQuery, setRawQuery]     = useState('');  // immediate input value
  const [query, setQuery]           = useState('');  // debounced value for search
  const [category, setCategory]     = useState<CategoryId>('All');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Sub-category state (one per supported main category) ──
  const [verbSub,  setVerbSub]  = useState<VerbSubCategory | null>(null);
  const [nounSub,  setNounSub]  = useState<NounSubCategory | null>(null);
  const [prepSub,  setPrepSub]  = useState<PrepositionSubCategory | null>(null);
  const [otherSub, setOtherSub] = useState<OtherSubCategory | null>(null);

  // ── Dropdown state — positioned absolutely, zero layout impact ──
  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState<{ x: number; y: number } | null>(null);

  // ── Refs for dropdown positioning ──
  const containerRef = useRef<View>(null);
  const pillRefs     = useRef<Partial<Record<CategoryId, any>>>({});

  // ── Recently viewed ──
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // ── Bottom sheet ──
  const [activeWord, setActiveWord] = useState<WordWithLevel | null>(null);
  const sheetAnim = useRef(new Animated.Value(1)).current; // 0=open, 1=closed

  const sheetTranslateY = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sheetHeight],
  });

  // ── Load recently viewed whenever the screen comes into focus ──
  useFocusEffect(
    useCallback(() => {
      loadRecentIds().then(setRecentIds);
    }, []),
  );

  // ── Debounce search input ──
  function handleQueryChange(text: string) {
    setRawQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setQuery(text), 150);
  }

  // ── Category + sub-category selection ──
  function handleCategorySelect(cat: CategoryId) {
    setCategory(cat);
    setVerbSub(null);
    setNounSub(null);
    setPrepSub(null);
    setOtherSub(null);
  }

  function handlePillPress(cat: CategoryId) {
    const isAlreadySelected = cat === category;
    handleCategorySelect(cat);

    // Categories without sub-categories just close the dropdown
    if (!SUBCATEGORY_CATS.includes(cat)) {
      setDropdownOpen(false);
      return;
    }

    // Same pill tapped again while open: toggle closed
    if (isAlreadySelected && dropdownOpen) {
      setDropdownOpen(false);
      return;
    }

    // Measure pill position relative to the outer container to anchor the dropdown
    const pillRef = pillRefs.current[cat];
    if (!pillRef || !containerRef.current) return;

    containerRef.current.measureInWindow((cx, cy) => {
      pillRef.measureInWindow((px: number, py: number, _pw: number, ph: number) => {
        setDropdownAnchor({ x: px - cx, y: py - cy + ph + 6 });
        setDropdownOpen(true);
      });
    });
  }

  // ── Central filter function — used for both alphabetical list and search ──
  // Returns true if the word matches the active category + sub-category.
  function matchesCategoryAndSub(w: WordWithLevel): boolean {
    if (category === 'All') return true;

    if (category === 'Nouns') {
      if (w.partOfSpeech !== 'noun') return false;
      return !nounSub || w.gender === nounSub;
    }
    if (category === 'Verbs') {
      if (w.partOfSpeech !== 'verb') return false;
      return !verbSub || getVerbSubCategory(w) === verbSub;
    }
    if (category === 'Adjectives') {
      return w.partOfSpeech === 'adjective';
    }
    if (category === 'Prepositions') {
      if (w.partOfSpeech !== 'preposition') return false;
      return !prepSub || PREPOSITION_CASES[w.german.toLowerCase()] === prepSub;
    }
    // Other = adverbs, conjunctions, pronouns, phrases (not noun/verb/adj/prep)
    if (!['noun', 'verb', 'adjective', 'preposition'].includes(w.partOfSpeech)) {
      if (!otherSub) return true;
      return w.partOfSpeech === OTHER_POS_MAP[otherSub];
    }
    return false;
  }

  // ── Build indexes (once — ALL_WORDS never changes) ──
  const germanIndex      = useMemo(() => buildGermanIndex(ALL_WORDS), []);
  const conjugationIndex = useMemo(() => buildConjugationIndex(ALL_WORDS), []);
  const englishIndex     = useMemo(() => buildEnglishIndex(ALL_WORDS), []);

  // ── Alphabetical sections (re-computes when category or sub-category changes) ──
  const sections = useMemo((): Section[] => {
    const filtered = ALL_WORDS.filter(matchesCategoryAndSub);
    const sorted = [...filtered].sort((a, b) =>
      baseWord(a.german).localeCompare(baseWord(b.german), 'de'),
    );
    const buckets: Record<string, WordWithLevel[]> = {};
    for (const w of sorted) {
      const letter = (baseWord(w.german)[0] ?? '#').toUpperCase();
      if (!buckets[letter]) buckets[letter] = [];
      buckets[letter].push(w);
    }
    return Object.entries(buckets)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([title, data]) => ({ title, data }));
  }, [category, verbSub, nounSub, prepSub, otherSub]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Search results (re-computes when query, category, or sub-category changes) ──
  const searchItems = useMemo((): ListItem[] => {
    const q = query.trim();
    if (!q) return [];

    const qLower    = q.toLowerCase();
    const qStripped = stripArticle(q);

    const germanResults:  { word: WordWithLevel; conjNote?: string }[] = [];
    const englishResults: WordWithLevel[] = [];

    // Step 1 — German direct match
    const directMatch = germanIndex.get(qStripped) ?? germanIndex.get(qLower);
    if (directMatch) germanResults.push({ word: directMatch });

    // Step 2 — Conjugation reverse match
    const conjMatch = conjugationIndex.get(qLower);
    if (conjMatch) {
      const baseG = baseWord(conjMatch.word.german);
      if (baseG !== qLower && baseG !== qStripped) {
        const note = `conjugated form of ${conjMatch.word.german} (${conjMatch.pronoun})`;
        if (!germanResults.find(r => r.word.id === conjMatch.word.id)) {
          germanResults.push({ word: conjMatch.word, conjNote: note });
        }
      }
    }

    // Step 3 — English match
    const exactEnglish  = englishIndex.get(qLower) ?? [];
    const tokenMatches  = englishIndex.get(qStripped) ?? [];
    const seenEnglish   = new Set<string>();
    for (const w of [...exactEnglish, ...tokenMatches]) {
      if (!seenEnglish.has(w.id)) {
        seenEnglish.add(w.id);
        if (!germanResults.find(r => r.word.id === w.id)) englishResults.push(w);
      }
    }

    // Apply category + sub-category filter to both result sets
    const filteredGerman  = germanResults.filter(r => matchesCategoryAndSub(r.word));
    const filteredEnglish = englishResults.filter(matchesCategoryAndSub);
    const hasBoth = filteredGerman.length > 0 && filteredEnglish.length > 0;

    const items: ListItem[] = [];
    if (hasBoth) items.push({ kind: 'header', title: 'GERMAN MATCHES' });
    for (const r of filteredGerman)  items.push({ kind: 'word', word: r.word, conjNote: r.conjNote });
    if (hasBoth) items.push({ kind: 'header', title: 'ENGLISH MATCHES' });
    for (const w of filteredEnglish) items.push({ kind: 'word', word: w });

    return items;
  }, [query, category, verbSub, nounSub, prepSub, otherSub, germanIndex, conjugationIndex, englishIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sub-pills for the dropdown — computed each render (fast, no memo needed) ──
  // Words in the current main category (before sub-filter) — for counts
  const allCategoryWords = useMemo(() => ALL_WORDS.filter(w => {
    if (category === 'All')          return true;
    if (category === 'Nouns')        return w.partOfSpeech === 'noun';
    if (category === 'Verbs')        return w.partOfSpeech === 'verb';
    if (category === 'Adjectives')   return w.partOfSpeech === 'adjective';
    if (category === 'Prepositions') return w.partOfSpeech === 'preposition';
    return !['noun', 'verb', 'adjective', 'preposition'].includes(w.partOfSpeech);
  }), [category]);

  type SubPill = { label: string; count: number; isActive: boolean; onPress: () => void };
  let subPills: SubPill[] = [];

  if (category === 'Verbs') {
    subPills = VERB_SUBCATS
      .map(({ label }) => ({
        label, isActive: verbSub === label,
        count: allCategoryWords.filter(w => getVerbSubCategory(w) === label).length,
        onPress: () => { setVerbSub(verbSub === label ? null : label); setDropdownOpen(false); },
      }))
      .filter(p => p.count > 0);
  } else if (category === 'Nouns') {
    subPills = NOUN_SUBCATS
      .map(({ label }) => ({
        label, isActive: nounSub === label,
        count: allCategoryWords.filter(w => w.gender === label).length,
        onPress: () => { setNounSub(nounSub === label ? null : label); setDropdownOpen(false); },
      }))
      .filter(p => p.count > 0);
  } else if (category === 'Prepositions') {
    subPills = PREP_SUBCATS
      .map(({ label }) => ({
        label, isActive: prepSub === label,
        count: allCategoryWords.filter(w => PREPOSITION_CASES[w.german.toLowerCase()] === label).length,
        onPress: () => { setPrepSub(prepSub === label ? null : label); setDropdownOpen(false); },
      }))
      .filter(p => p.count > 0);
  } else if (category === 'Other') {
    subPills = OTHER_SUBCATS
      .map(({ label }) => ({
        label, isActive: otherSub === label,
        count: allCategoryWords.filter(w => w.partOfSpeech === OTHER_POS_MAP[label]).length,
        onPress: () => { setOtherSub(otherSub === label ? null : label); setDropdownOpen(false); },
      }))
      .filter(p => p.count > 0);
  }

  // ── Open / close bottom sheet ──
  function openSheet(word: WordWithLevel) {
    addToRecent(word).then(() => loadRecentIds().then(setRecentIds));
    setActiveWord(word);
    sheetAnim.setValue(1);
    Animated.timing(sheetAnim, { toValue: 0, duration: 260, useNativeDriver: true }).start();
  }

  function closeSheet() {
    Animated.timing(sheetAnim, { toValue: 1, duration: 200, useNativeDriver: true })
      .start(() => setActiveWord(null));
  }

  // ── Handle row tap — verbs go full screen, others open bottom sheet ──
  function handleWordTap(word: WordWithLevel) {
    if (word.partOfSpeech === 'verb') {
      addToRecent(word).then(() => loadRecentIds().then(setRecentIds));
      router.push(`/dictionary-verb?id=${word.id}` as any);
    } else {
      openSheet(word);
    }
  }

  // ── Recently viewed chips (resolved from ids) ──
  const recentWords = useMemo(() =>
    recentIds
      .map(id => ALL_WORDS.find(w => w.id === id))
      .filter(Boolean) as WordWithLevel[],
    [recentIds],
  );

  // ── Active sub-category label (shown on the pill when one is selected) ──
  const activeSubLabel = verbSub ?? nounSub ?? prepSub ?? otherSub ?? null;

  const showNoResults = query.trim().length > 0 && searchItems.length === 0;

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    // containerRef allows measuring pill positions for the dropdown
    <View ref={containerRef} style={styles.screen}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dictionary</Text>
        <Text style={styles.headerSub}>All levels · {ALL_WORDS.length} words</Text>
      </View>

      {/* ── Search bar ── */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search in German or English..."
          placeholderTextColor={colors.textMuted}
          value={rawQuery}
          onChangeText={handleQueryChange}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
        {rawQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={() => { setRawQuery(''); setQuery(''); }}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Filter pills — flexShrink: 0 keeps this row at a fixed height ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillsScroll}
        contentContainerStyle={styles.pillsContent}
      >
        {CATEGORIES.map(cat => {
          const isSelected   = cat === category;
          const hasSub       = SUBCATEGORY_CATS.includes(cat);
          // Show active sub-category label in the count slot when one is selected
          const pillSubLabel = isSelected ? activeSubLabel : null;

          return (
            <TouchableOpacity
              key={cat}
              ref={ref => { if (ref) pillRefs.current[cat] = ref; }}
              style={[styles.pill, isSelected && styles.pillActive]}
              onPress={() => handlePillPress(cat)}
              activeOpacity={0.7}
            >
              <Text style={[styles.pillText, isSelected && styles.pillTextActive]}>
                {cat}{hasSub ? ' ▾' : ''}
              </Text>
              <Text style={[styles.pillCount, isSelected && styles.pillCountActive]}>
                {pillSubLabel ?? CATEGORY_COUNTS[cat]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── List / search results — flex: 1 fills remaining space ── */}
      {query.trim() ? (
        showNoResults ? (
          <View style={[styles.noResults, { flex: 1 }]}>
            <Text style={styles.noResultsText}>No results for "{query}"</Text>
          </View>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={searchItems}
            keyExtractor={(item, i) => item.kind === 'header' ? `hdr-${i}` : item.word.id}
            renderItem={({ item }) => {
              if (item.kind === 'header') {
                return <Text style={styles.searchSectionLabel}>{item.title}</Text>;
              }
              return <WordRow word={item.word} conjNote={item.conjNote} onPress={() => handleWordTap(item.word)} />;
            }}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
        )
      ) : (
        <SectionList
          style={{ flex: 1 }}
          sections={sections}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <WordRow word={item} onPress={() => handleWordTap(item)} />
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.alphaHeader}>
              <Text style={styles.alphaHeaderText}>{section.title}</Text>
            </View>
          )}
          stickySectionHeadersEnabled
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            recentWords.length > 0 ? (
              <View style={styles.recentSection}>
                <Text style={styles.recentLabel}>RECENTLY VIEWED</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.recentRow}
                >
                  {recentWords.map(w => (
                    <TouchableOpacity
                      key={w.id}
                      style={styles.recentChip}
                      onPress={() => handleWordTap(w)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.recentChipText}>{w.german}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : null
          }
        />
      )}

      {/* ── Sub-category dropdown — absolute, never affects layout ── */}
      {dropdownOpen && dropdownAnchor && subPills.length > 0 && (
        <>
          {/* Transparent backdrop: tap outside to close */}
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={() => setDropdownOpen(false)}
            activeOpacity={1}
          />
          {/* Floating card anchored below the tapped pill */}
          <View style={[styles.dropdown, { top: dropdownAnchor.y, left: dropdownAnchor.x }]}>
            {subPills.map(({ label, count, isActive, onPress }) => (
              <TouchableOpacity
                key={label}
                style={[styles.dropdownItem, isActive && styles.dropdownItemActive]}
                onPress={onPress}
              >
                <Text style={[styles.dropdownLabel, isActive && styles.dropdownLabelActive]}>
                  {label}
                </Text>
                <Text style={[styles.dropdownCount, isActive && styles.dropdownCountActive]}>
                  {count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* ── Bottom sheet overlay ── */}
      {activeWord && (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <TouchableOpacity
            style={[StyleSheet.absoluteFill, styles.backdrop]}
            onPress={closeSheet}
            activeOpacity={1}
          />
          <Animated.View
            style={[
              styles.sheet,
              { height: sheetHeight, transform: [{ translateY: sheetTranslateY }] },
            ]}
            pointerEvents="box-none"
          >
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <SheetContent word={activeWord} />
            </ScrollView>
          </Animated.View>
        </View>
      )}

    </View>
  );
}

// ─── Styles ────���───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  screen: {
    flex:            1,
    backgroundColor: colors.background,
  },

  // ── Header ──
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop:        spacing.xl,
    paddingBottom:     spacing.md,
  },
  headerTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:   22,
    color:      colors.textPrimary,
    lineHeight: 28,
  },
  headerSub: {
    fontFamily: 'Inter_400Regular',
    fontSize:   12,
    color:      colors.textSecondary,
    marginTop:  2,
  },

  // ── Search bar ──
  searchContainer: {
    paddingHorizontal: spacing.xxl,
    paddingTop:        spacing.lg,
    paddingBottom:     spacing.sm,
    flexDirection:     'row',
    alignItems:        'center',
    flexShrink:        0,
  },
  searchInput: {
    flex:              1,
    height:            38,
    backgroundColor:   colors.surface,
    borderWidth:       1,
    borderColor:       colors.border,
    borderRadius:      radius.md,
    paddingHorizontal: spacing.lg,
    fontFamily:        font.regular,
    fontSize:          fontSize.sm,
    color:             colors.textPrimary,
    // Remove browser focus outline on web
    outlineWidth: 0,
  } as any,
  clearButton: {
    position: 'absolute',
    right:    spacing.xxl + spacing.md,
    padding:  spacing.sm,
  },
  clearButtonText: {
    fontFamily: font.regular,
    fontSize:   fontSize.xs,
    color:      colors.textMuted,
  },

  // ── Filter pills — explicit height prevents horizontal ScrollView from expanding on web ──
  pillsScroll: {
    flexShrink: 0,
    flexGrow:   0,
    height:     46,  // paddingTop(12) + pill(30) + paddingBottom(4)
  },
  pillsContent: {
    paddingHorizontal: spacing.xl,
    paddingTop:        spacing.md,
    paddingBottom:     spacing.xs,
    gap:               8,
    flexDirection:     'row',
  },
  pill: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               spacing.xs,
    paddingVertical:   spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius:      radius.lg,
    borderWidth:       1,
    borderColor:       colors.border,
    backgroundColor:   colors.background,
    height:            30,
  },
  pillActive: {
    backgroundColor: colors.textPrimary,
    borderColor:     colors.textPrimary,
  },
  pillText: {
    fontFamily: font.semiBold,
    fontSize:   fontSize.sm,
    color:      colors.textSecondary,
  },
  pillTextActive: {
    color: colors.background,
  },
  pillCount: {
    fontFamily: font.regular,
    fontSize:   fontSize.xs,
    color:      colors.textMuted,
  },
  pillCountActive: {
    color: '#888888',
  },

  // ── Sub-category dropdown — floats absolutely over everything ──
  dropdown: {
    position:        'absolute',
    backgroundColor: colors.surface,
    borderWidth:     1,
    borderColor:     colors.border,
    borderRadius:    radius.md,
    minWidth:        160,
    zIndex:          100,
  },
  dropdownItem: {
    flexDirection:     'row',
    justifyContent:    'space-between',
    alignItems:        'center',
    paddingVertical:   spacing.sm,
    paddingHorizontal: spacing.lg,
    gap:               spacing.xl,
  },
  dropdownItemActive: {
    backgroundColor: colors.textPrimary,
  },
  dropdownLabel: {
    fontFamily: font.semiBold,
    fontSize:   fontSize.sm,
    color:      colors.textPrimary,
  },
  dropdownLabelActive: {
    color: colors.background,
  },
  dropdownCount: {
    fontFamily: font.regular,
    fontSize:   fontSize.xs,
    color:      colors.textMuted,
  },
  dropdownCountActive: {
    color: colors.background,
  },

  listContent: {
    paddingBottom: 80,
  },

  // ── Search section label ──
  searchSectionLabel: {
    fontFamily:        'Inter_500Medium',
    fontSize:          10,
    color:             colors.textSecondary,
    textTransform:     'uppercase',
    letterSpacing:     0.9,
    marginTop:         8,
    marginBottom:      4,
    paddingHorizontal: spacing.xl,
  },

  // ── Alphabetical section headers ──
  alphaHeader: {
    backgroundColor:   colors.background,
    paddingVertical:   4,
    paddingHorizontal: 12,
  },
  alphaHeaderText: {
    fontFamily:    'Inter_500Medium',
    fontSize:      11,
    color:         colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ── Word row ──
  row: {
    flexDirection:     'row',
    alignItems:        'center',
    minHeight:         48,
    paddingHorizontal: spacing.xl,
    paddingVertical:   10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor:   colors.surface,
  },
  rowLeft: {
    flex:        1,
    marginRight: spacing.md,
  },
  rowGerman: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize:   14,
    color:      colors.textPrimary,
  },
  rowConjNote: {
    fontFamily: 'Inter_400Regular',
    fontSize:   11,
    color:      colors.textSecondary,
    marginTop:  2,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           6,
  },
  rowType: {
    fontFamily: 'Inter_400Regular',
    fontSize:   10,
    color:      colors.textSecondary,
  },

  // ── Level badge ──
  levelBadge: {
    paddingHorizontal: 6,
    paddingVertical:   2,
    borderRadius:      radius.md,
  },
  levelBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:   10,
    lineHeight: 14,
  },

  // ── Recently viewed ──
  recentSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom:     spacing.md,
  },
  recentLabel: {
    fontFamily:    'Inter_500Medium',
    fontSize:      10,
    color:         colors.textSecondary,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom:  8,
  },
  recentRow: {
    gap:           8,
    flexDirection: 'row',
  },
  recentChip: {
    backgroundColor: colors.surface,
    borderWidth:     1,
    borderColor:     colors.border,
    borderRadius:    radius.md,
    padding:         8,
  },
  recentChipText: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize:   12,
    color:      colors.textPrimary,
  },

  // ── No results ──
  noResults: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    paddingTop:     spacing.xxxl,
  },
  noResultsText: {
    fontFamily: 'Inter_400Regular',
    fontSize:   14,
    color:      colors.textSecondary,
  },

  // ── Bottom sheet backdrop ──
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  // ── Bottom sheet ──
  sheet: {
    position:             'absolute',
    bottom:               0,
    left:                 0,
    right:                0,
    backgroundColor:      colors.surface,
    borderTopLeftRadius:  12,
    borderTopRightRadius: 12,
    overflow:             'hidden',
  },

  // ── Sheet inner ──
  sheetInner: {
    paddingHorizontal: spacing.xl,
    paddingBottom:     spacing.xxxl,
  },
  handle: {
    width:           40,
    height:          4,
    backgroundColor: colors.border,
    borderRadius:    2,
    alignSelf:       'center',
    marginTop:       12,
    marginBottom:    spacing.lg,
  },
  sheetHeader: {
    flexDirection:  'row',
    alignItems:     'flex-start',
    justifyContent: 'space-between',
  },
  sheetHeaderLeft: {
    flexDirection: 'row',
    alignItems:    'baseline',
    flexShrink:    1,
    flexWrap:      'wrap',
  },
  sheetHeaderRight: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing.sm,
    marginLeft:    spacing.md,
  },
  sheetArticle: {
    fontFamily:  'IBMPlexMono_400Regular',
    fontSize:    32,
    color:       colors.textSecondary,
    marginRight: 8,
  },
  sheetWord: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize:   32,
    color:      colors.textPrimary,
  },
  sheetTypeLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize:   13,
    color:      colors.textSecondary,
    marginTop:  4,
  },
  sheetEnglish: {
    fontFamily: 'Inter_400Regular',
    fontSize:   15,
    color:      colors.textSecondary,
    marginTop:  spacing.sm,
  },
  speakerBtn: {
    padding: 4,
  },

  // ── Info card (noun plural, adj comparative) ──
  infoCard: {
    backgroundColor:   colors.surface,
    borderWidth:       1,
    borderColor:       colors.border,
    borderRadius:      radius.md,
    paddingVertical:   spacing.md,
    paddingHorizontal: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing.lg,
  },
  infoLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize:   11,
    color:      colors.textSecondary,
    width:      90,
  },
  infoValue: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize:   13,
    color:      colors.textPrimary,
    flex:       1,
  },

  // ── Blue info box (preposition case) ──
  infoBox: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   colors.accentLight,
    borderRadius:      radius.md,
    paddingVertical:   spacing.sm,
    paddingHorizontal: spacing.md,
  },
  infoBoxText: {
    fontFamily: 'Inter_500Medium',
    fontSize:   13,
    color:      colors.accent,
  },

  // ── Example sentence ──
  sectionLabel: {
    fontFamily:    'Inter_500Medium',
    fontSize:      10,
    color:         colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.9,
    marginBottom:  spacing.sm,
  },
  exampleDe: {
    fontFamily:   'IBMPlexMono_700Bold',
    fontSize:     13,
    color:        colors.textPrimary,
    marginBottom: 4,
  },
  exampleEn: {
    fontFamily: 'Inter_400Regular',
    fontSize:   12,
    color:      colors.textSecondary,
  },
});
