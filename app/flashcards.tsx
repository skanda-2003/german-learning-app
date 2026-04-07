// flashcards.tsx — Flashcards screen
//
// Phase 10c additions:
//   - THREE mastery states: Known (green) / Shaky (amber) / Unknown (red)
//   - Shaky words re-insert 8–12 cards ahead; Unknown re-inserts 3–5 cards ahead
//   - Word search bar — filters the deck by German word or English translation
//   - Session summary screen shows known / shaky / unknown counts
//   - "Study Again" now restarts with all words in the category (not just unstudied)
//   - Category pills show word counts
//   - Mastery persists to Supabase using the new 3-state mastery column

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import useLevelStore from '../src/store/useLevelStore';
import { VOCABULARY, Word } from '../src/data/vocabulary';
import {
  VerbSubCategory,
  NounSubCategory,
  PrepositionSubCategory,
  OtherSubCategory,
} from '../src/data/vocabulary/types';
import FlashCard from '../src/components/FlashCard';
import { useSpacedRepetition } from '../src/hooks/useSpacedRepetition';
import { loadMastery, saveMastery, MasteryMap } from '../src/lib/masteryService';
import { logActivity } from '../src/lib/activityService';
import {
  colors, font, fontSize, spacing, radius,
  cardStyle, labelStyle,
} from '../src/styles/theme';

// ─── Category definitions ──────────────────────────────────────────────────────

type CategoryId = 'All' | 'Nouns' | 'Verbs' | 'Adjectives' | 'Prepositions' | 'Other';

function filterByCategory(words: Word[], category: CategoryId): Word[] {
  switch (category) {
    case 'All':          return words;
    case 'Nouns':        return words.filter(w => w.partOfSpeech === 'noun');
    case 'Verbs':        return words.filter(w => w.partOfSpeech === 'verb');
    case 'Adjectives':   return words.filter(w => w.partOfSpeech === 'adjective');
    case 'Prepositions': return words.filter(w => w.partOfSpeech === 'preposition');
    case 'Other':
      return words.filter(w =>
        !['noun', 'verb', 'adjective', 'preposition'].includes(w.partOfSpeech)
      );
  }
}

const CATEGORIES: CategoryId[] = ['All', 'Nouns', 'Verbs', 'Adjectives', 'Prepositions', 'Other'];

// ─── Sub-category detection ────────────────────────────────────────────────────

// Fixed list of modal verbs — same across all levels
const MODAL_VERBS = ['können', 'müssen', 'wollen', 'möchten', 'dürfen', 'sollen'];

// A verb is irregular if its er/sie/es form doesn't match the expected regular pattern.
// Regular verbs follow: stem + 't' (spielen → spielt) or stem + 'et' (arbeiten → arbeitet).
// Vowel-change verbs (fahren → fährt) and strong verbs will fail both checks → irregular.
function isIrregular(word: Word): boolean {
  const stem = word.german.replace(/en$|n$/, '');
  const er = word.conjugations?.er ?? '';
  return er !== stem + 't' && er !== stem + 'et';
}

function getVerbSubCategory(word: Word): VerbSubCategory {
  if (MODAL_VERBS.includes(word.german)) return 'Modal';
  if (word.german.startsWith('sich ')) return 'Reflexive';
  // Separable verbs have a space in their ich-form (e.g. "fahre ab")
  if (word.conjugations?.ich?.includes(' ')) return 'Separable';
  // Needs conjugation data to detect irregular — fall back to Regular if missing
  if (word.conjugations && isIrregular(word)) return 'Irregular';
  return 'Regular';
}

// Hardcoded case map — covers the most common German prepositions across all levels
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

// Sub-category pill definitions per main category (label + detection function)
const VERB_SUBCATS: { label: VerbSubCategory }[] = [
  { label: 'Modal' },
  { label: 'Separable' },
  { label: 'Reflexive' },
  { label: 'Irregular' },
  { label: 'Regular' },
];

const NOUN_SUBCATS: { label: NounSubCategory }[] = [
  { label: 'der' },
  { label: 'die' },
  { label: 'das' },
];

const PREPOSITION_SUBCATS: { label: PrepositionSubCategory }[] = [
  { label: 'Accusative' },
  { label: 'Dative' },
  { label: 'Two-way' },
  { label: 'Genitive' },
];

const OTHER_SUBCATS: { label: OtherSubCategory }[] = [
  { label: 'Adverbs' },
  { label: 'Conjunctions' },
  { label: 'Pronouns' },
  { label: 'Phrases' },
];

// Apply the active sub-category filter on top of the already main-category-filtered words.
// Returns filtered words, or the original list if no sub-category is active.
function applySubFilter(
  words: Word[],
  category: CategoryId,
  verbSub: VerbSubCategory | null,
  nounSub: NounSubCategory | null,
  prepSub: PrepositionSubCategory | null,
  otherSub: OtherSubCategory | null,
): Word[] {
  if (category === 'Verbs' && verbSub) {
    return words.filter(w => getVerbSubCategory(w) === verbSub);
  }
  if (category === 'Nouns' && nounSub) {
    return words.filter(w => w.gender === nounSub);
  }
  if (category === 'Prepositions' && prepSub) {
    return words.filter(w => PREPOSITION_CASES[w.german] === prepSub);
  }
  if (category === 'Other' && otherSub) {
    const posMap: Record<OtherSubCategory, string> = {
      Adverbs: 'adverb',
      Conjunctions: 'conjunction',
      Pronouns: 'pronoun',
      Phrases: 'phrase',
    };
    return words.filter(w => w.partOfSpeech === posMap[otherSub]);
  }
  return words;
}

// ─── FlashcardDeck sub-component ──────────────────────────────────────────────
// Remounted via key= when the category or search query changes.

type DeckProps = {
  studyWords: Word[];      // words to study this session (mastery-filtered + search-filtered)
  allCategoryWords: Word[]; // all words in this category — used for "Study Again"
};

function FlashcardDeck({ studyWords, allCategoryWords }: DeckProps) {
  const {
    currentWord,
    remaining,
    knownCount,
    shakyCount,
    unknownCount,
    isDone,
    weakWords,
    markKnown,
    markShaky,
    markUnknown,
    restart,
    restartWeak,
  } = useSpacedRepetition(studyWords, allCategoryWords);

  // Log today's activity when the deck is finished so the Insights heatmap reflects flashcard sessions
  useEffect(() => {
    if (isDone) logActivity();
  }, [isDone]);

  // Keyboard shortcut: 1 = Unknown, 2 = Shaky, 3 = Known (works regardless of flip state)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === '1') handleUnknown();
      else if (e.key === '2') handleShaky();
      else if (e.key === '3') handleKnown();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [currentWord]); // re-bind when word changes so handlers close over fresh word

  function handleKnown() {
    if (!currentWord) return;
    saveMastery(currentWord.id, 'known');
    markKnown();
  }

  function handleShaky() {
    if (!currentWord) return;
    saveMastery(currentWord.id, 'shaky');
    markShaky();
  }

  function handleUnknown() {
    if (!currentWord) return;
    saveMastery(currentWord.id, 'unknown');
    markUnknown();
  }


  // Total cards reviewed = known + shaky + all unknown actions
  // (unknownCount can exceed word count since a card can be marked unknown multiple times)
  const totalReviewed = knownCount + shakyCount;

  // ── Done state — session summary ──
  if (isDone) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.doneTitle}>Session Complete</Text>
        <Text style={styles.doneSubtitle}>
          {totalReviewed} {totalReviewed === 1 ? 'word' : 'words'} reviewed
        </Text>

        {/* Three summary boxes */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryBox, styles.knownBox]}>
            <Text style={styles.summaryCount}>{knownCount}</Text>
            <Text style={[styles.summaryLabel, { color: colors.success }]}>KNOWN</Text>
          </View>
          <View style={[styles.summaryBox, styles.shakyBox]}>
            <Text style={styles.summaryCount}>{shakyCount}</Text>
            <Text style={[styles.summaryLabel, { color: colors.amber }]}>SHAKY</Text>
          </View>
          <View style={[styles.summaryBox, styles.unknownBox]}>
            <Text style={styles.summaryCount}>{unknownCount}</Text>
            <Text style={[styles.summaryLabel, { color: colors.error }]}>UNKNOWN</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={restart}>
          <Text style={styles.primaryButtonText}>Study Again</Text>
        </TouchableOpacity>

        {/* Only show Study Weak if there were any shaky/unknown words this session */}
        {weakWords.length > 0 && (
          <TouchableOpacity style={styles.weakButton} onPress={restartWeak}>
            <Text style={styles.weakButtonText}>
              Study Weak ({weakWords.length})
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Progress: based on how many words have been marked known or shaky
  // (they won't appear again until restart)
  const progressPct = allCategoryWords.length > 0
    ? ((knownCount + shakyCount) / allCategoryWords.length) * 100
    : 0;

  // ── Study view ──
  return (
    <ScrollView contentContainerStyle={styles.deckContainer}>

      {/* Progress counters */}
      <View style={styles.progressBlock}>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>{remaining} remaining</Text>
          <Text style={styles.progressLabel}>{knownCount} cleared</Text>
        </View>
      </View>

      {/* Card */}
      <View style={styles.cardContainer}>
        {currentWord && <FlashCard key={currentWord.id} word={currentWord} />}
      </View>

      {/* Always-visible info panel — shows plural / conjugations / comparative */}
      {currentWord && (currentWord.plural || currentWord.conjugations || currentWord.comparative) && (
        <View style={styles.infoPanel}>

          {/* Noun: plural form */}
          {currentWord.plural && (
            <View style={styles.infoRow}>
              <Text style={styles.infoPanelLabel}>PLURAL</Text>
              <Text style={styles.infoPanelValue}>{currentWord.plural}</Text>
            </View>
          )}

          {/* Adjective: comparative form */}
          {currentWord.comparative && (
            <View style={styles.infoRow}>
              <Text style={styles.infoPanelLabel}>COMPARATIVE</Text>
              <Text style={styles.infoPanelValue}>{currentWord.comparative}</Text>
            </View>
          )}

          {/* Verb: conjugation table in a compact 2-column grid */}
          {currentWord.conjugations && (
            <>
              <Text style={styles.infoPanelLabel}>CONJUGATION</Text>
              <View style={styles.conjGrid}>
                {(
                  [
                    ['ich', currentWord.conjugations.ich],
                    ['du',  currentWord.conjugations.du],
                    ['er/sie/es', currentWord.conjugations.er],
                    ['wir', currentWord.conjugations.wir],
                    ['ihr', currentWord.conjugations.ihr],
                    ['sie/Sie', currentWord.conjugations.sie],
                  ] as [string, string][]
                ).map(([pronoun, form]) => (
                  <View key={pronoun} style={styles.conjRow}>
                    <Text style={styles.conjPronoun}>{pronoun}</Text>
                    <Text style={styles.conjForm}>{form}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

        </View>
      )}

      {/* Three action buttons: Unknown / Shaky / Known */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.actionButton, styles.unknownButton]} onPress={handleUnknown}>
          <Text style={styles.unknownButtonText}>Unknown</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.shakyButton]} onPress={handleShaky}>
          <Text style={styles.shakyButtonText}>Shaky</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.knownButton]} onPress={handleKnown}>
          <Text style={styles.knownButtonText}>Known</Text>
        </TouchableOpacity>
      </View>

      {/* Small tally below buttons */}
      <Text style={styles.tallyText}>
        {knownCount} known · {shakyCount} shaky · {unknownCount} unknown
      </Text>

    </ScrollView>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function FlashcardsScreen() {
  const level = useLevelStore((state) => state.level);
  const words = VOCABULARY[level];

  const [masteryMap, setMasteryMap]       = useState<MasteryMap>(new Map());
  const [masteryLoading, setMasteryLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('All');
  const [searchQuery, setSearchQuery]     = useState('');

  // Sub-category selections — one per supported main category, all start null (= show all)
  const [verbSub,  setVerbSub]  = useState<VerbSubCategory | null>(null);
  const [nounSub,  setNounSub]  = useState<NounSubCategory | null>(null);
  const [prepSub,  setPrepSub]  = useState<PrepositionSubCategory | null>(null);
  const [otherSub, setOtherSub] = useState<OtherSubCategory | null>(null);

  // Dropdown state — position is relative to outerContainer
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState<{ x: number; y: number } | null>(null);

  // Refs for measuring positions
  const containerRef = useRef<View>(null);
  const pillRefs = useRef<Partial<Record<CategoryId, typeof TouchableOpacity.prototype>>>({});

  // Categories that have sub-category dropdowns
  const SUBCATEGORY_CATS: CategoryId[] = ['Verbs', 'Nouns', 'Prepositions', 'Other'];

  // Resets all sub-category state when main category changes
  function handleCategorySelect(cat: CategoryId) {
    setSelectedCategory(cat);
    setVerbSub(null);
    setNounSub(null);
    setPrepSub(null);
    setOtherSub(null);
  }

  // Handles pressing a main category pill
  function handlePillPress(cat: CategoryId) {
    const isAlreadySelected = cat === selectedCategory;
    handleCategorySelect(cat);

    if (!SUBCATEGORY_CATS.includes(cat)) {
      // No sub-categories for this pill — close any open dropdown
      setDropdownOpen(false);
      return;
    }

    if (isAlreadySelected && dropdownOpen) {
      // Same pill tapped again: toggle closed
      setDropdownOpen(false);
      return;
    }

    // Measure the pill and the container to get pill position relative to outerContainer
    const pillRef = pillRefs.current[cat];
    if (!pillRef || !containerRef.current) return;

    containerRef.current.measureInWindow((cx, cy) => {
      (pillRef as any).measureInWindow((px: number, py: number, _pw: number, ph: number) => {
        setDropdownAnchor({ x: px - cx, y: py - cy + ph + 6 });
        setDropdownOpen(true);
      });
    });
  }

  // Load mastery from Supabase when the level changes
  useEffect(() => {
    setMasteryLoading(true);
    loadMastery().then((map) => {
      setMasteryMap(map);
      setMasteryLoading(false);
    });
  }, [level]);

  // All words in the selected main category (before sub-filter — used for pill counts)
  const allCategoryWords = filterByCategory(words, selectedCategory);

  // Apply the active sub-category filter to get the effective word pool
  const subFilteredWords = applySubFilter(
    allCategoryWords,
    selectedCategory,
    verbSub,
    nounSub,
    prepSub,
    otherSub,
  );

  // Words due for review today — excludes words whose next_review_date is in the future.
  // If a word has never been studied (not in masteryMap), it is always due.
  // If no words are due (all reviewed recently), fall back to the full sub-filtered set.
  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
  const dueWords = subFilteredWords.filter((w) => {
    const data = masteryMap.get(w.id);
    if (!data) return true; // never studied — always include
    if (data.nextReviewDate && data.nextReviewDate > today) return false; // not due yet
    return true; // due today or overdue
  });
  const wordsForSession = dueWords.length > 0 ? dueWords : subFilteredWords;

  // Apply search filter on top (searches German word and English translation)
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const studyWords = trimmedQuery
    ? wordsForSession.filter(
        (w) =>
          w.german.toLowerCase().includes(trimmedQuery) ||
          w.english.toLowerCase().includes(trimmedQuery)
      )
    : wordsForSession;

  // Key for the deck — remounts when category, sub-category, or search query changes
  const activeSub = verbSub ?? nounSub ?? prepSub ?? otherSub ?? '';
  const deckKey = `${selectedCategory}:${activeSub}:${trimmedQuery}`;

  // Compute sub-pills as a plain variable so the ScrollView always renders
  // (same layout tree every render — prevents the deck from shifting position)
  const otherPosMap: Record<OtherSubCategory, string> = {
    Adverbs: 'adverb', Conjunctions: 'conjunction', Pronouns: 'pronoun', Phrases: 'phrase',
  };
  type SubPill = { label: string; count: number; isActive: boolean; onPress: () => void };
  let subPills: SubPill[] = [];

  if (selectedCategory === 'Verbs') {
    subPills = VERB_SUBCATS
      .map(({ label }) => ({
        label,
        count: allCategoryWords.filter(w => getVerbSubCategory(w) === label).length,
        isActive: verbSub === label,
        onPress: () => setVerbSub(verbSub === label ? null : label),
      }))
      .filter(p => p.count > 0);
  } else if (selectedCategory === 'Nouns') {
    subPills = NOUN_SUBCATS
      .map(({ label }) => ({
        label,
        count: allCategoryWords.filter(w => w.gender === label).length,
        isActive: nounSub === label,
        onPress: () => setNounSub(nounSub === label ? null : label),
      }))
      .filter(p => p.count > 0);
  } else if (selectedCategory === 'Prepositions') {
    subPills = PREPOSITION_SUBCATS
      .map(({ label }) => ({
        label,
        count: allCategoryWords.filter(w => PREPOSITION_CASES[w.german] === label).length,
        isActive: prepSub === label,
        onPress: () => setPrepSub(prepSub === label ? null : label),
      }))
      .filter(p => p.count > 0);
  } else if (selectedCategory === 'Other') {
    subPills = OTHER_SUBCATS
      .map(({ label }) => ({
        label,
        count: allCategoryWords.filter(w => w.partOfSpeech === otherPosMap[label]).length,
        isActive: otherSub === label,
        onPress: () => setOtherSub(otherSub === label ? null : label),
      }))
      .filter(p => p.count > 0);
  }

  // ── Loading state ──
  if (masteryLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="small" color={colors.accent} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // ── Empty level state ──
  if (words.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyTitle}>{level} vocabulary coming soon.</Text>
        <Text style={styles.emptySubtitle}>Switch to A1 to start practising.</Text>
      </View>
    );
  }

  return (
    <View ref={containerRef} style={styles.outerContainer}>

      {/* ── Search bar ── */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search words..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery('')}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Category pills ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillScrollView}
        contentContainerStyle={styles.pillRow}
      >
        {CATEGORIES.map((cat) => {
          const count = filterByCategory(words, cat).length;
          const isSelected = cat === selectedCategory;
          const hasSub = SUBCATEGORY_CATS.includes(cat);
          // Show active sub-category label on the pill when one is selected
          const activeSubLabel = isSelected
            ? (verbSub ?? nounSub ?? prepSub ?? otherSub ?? null)
            : null;
          return (
            <TouchableOpacity
              key={cat}
              ref={ref => { if (ref) pillRefs.current[cat] = ref; }}
              style={[styles.pill, isSelected && styles.pillSelected]}
              onPress={() => handlePillPress(cat)}
            >
              <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                {cat}{hasSub ? ' ▾' : ''}
              </Text>
              <Text style={[styles.pillCount, isSelected && styles.pillCountSelected]}>
                {activeSubLabel ?? count}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Deck — remounts on category, sub-category, or search change ── */}
      <FlashcardDeck
        key={deckKey}
        studyWords={studyWords}
        allCategoryWords={subFilteredWords}
      />

      {/* ── Sub-category dropdown — floats absolutely, never affects layout ── */}
      {dropdownOpen && dropdownAnchor && subPills.length > 0 && (
        <>
          {/* Transparent backdrop: closes dropdown on outside tap */}
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
                onPress={() => { onPress(); setDropdownOpen(false); }}
              >
                <Text style={[styles.dropdownItemLabel, isActive && styles.dropdownItemLabelActive]}>
                  {label}
                </Text>
                <Text style={[styles.dropdownItemCount, isActive && styles.dropdownItemCountActive]}>
                  {count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ── Search bar ──
  searchContainer: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    height: 38,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  clearButton: {
    position: 'absolute',
    right: spacing.xxl + spacing.md,
    padding: spacing.sm,
  },
  clearButtonText: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },

  // ── Category pills ──
  // flexShrink: 0 — never let the flex column compress this row
  pillScrollView: {
    flexShrink: 0,
  },
  pillRow: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
    gap: spacing.sm,
    flexDirection: 'row',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    height: 30,
  },
  pillSelected: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
  pillText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  pillTextSelected: {
    color: colors.background,
  },
  pillCount: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  pillCountSelected: {
    color: '#888888',
  },

  // ── Sub-category dropdown ──
  // position: absolute — floats over content, zero layout impact
  dropdown: {
    position: 'absolute',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    minWidth: 160,
    zIndex: 100,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    gap: spacing.xl,
  },
  dropdownItemActive: {
    backgroundColor: colors.textPrimary,
  },
  dropdownItemLabel: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  dropdownItemLabelActive: {
    color: colors.background,
  },
  dropdownItemCount: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  dropdownItemCountActive: {
    color: colors.background,
  },

  // ── Deck ──
  deckContainer: {
    flexGrow: 1,
    padding: spacing.xxl,
    backgroundColor: colors.background,
    alignItems: 'center',
  },

  // ── Progress ──
  progressBlock: {
    width: '100%',
    maxWidth: 480,
    marginBottom: spacing.xxxl,
    alignItems: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 480,
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  // ── Card ──
  cardContainer: {
    width: '100%',
    maxWidth: 380,
    height: 260,
    marginBottom: spacing.lg,
  },

  // ── Always-visible info panel (below card) ──
  infoPanel: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoPanelLabel: {
    fontFamily: font.semiBold,
    fontSize: 10,
    letterSpacing: 0.08 * 10,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  infoPanelValue: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  conjGrid: {
    width: '100%',
    marginTop: spacing.xs,
  },
  conjRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  conjPronoun: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    width: 72,
  },
  conjForm: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },

  // ── Three action buttons ──
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    width: '100%',
    maxWidth: 380,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  unknownButton: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  shakyButton: {
    borderColor: colors.amber,
    backgroundColor: colors.amberLight,
  },
  knownButton: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  unknownButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.error,
  },
  shakyButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.amber,
  },
  knownButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.success,
  },

  // ── Tally ──
  tallyText: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },

  // ── Done / session summary ──
  doneTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  doneSubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xxxl,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xxxl,
  },
  summaryBox: {
    ...cardStyle,
    width: 90,
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  knownBox: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  shakyBox: {
    borderColor: colors.amber,
    backgroundColor: colors.amberLight,
  },
  unknownBox: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  summaryCount: {
    fontFamily: font.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    ...labelStyle,
  },
  primaryButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.hero,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.background,
  },
  weakButton: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.amber,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.hero,
    alignItems: 'center',
    backgroundColor: colors.amberLight,
  },
  weakButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.amber,
  },

  // ── Shared centered states ──
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
    backgroundColor: colors.background,
  },
  loadingText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  emptyTitle: {
    fontFamily: font.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});