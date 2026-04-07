// types.ts — Shared type definitions for grammar exercises across all levels.

// The two exercise formats we support
export type ExerciseType = 'fill-blank' | 'multiple-choice';

// The shape of a single grammar exercise
export type GrammarExercise = {
  id: string;           // unique identifier, e.g. "a1_gr_001"
  topic: string;        // the grammar topic, e.g. "Verb conjugation: sein"
  type: ExerciseType;
  question: string;     // for fill-blank: sentence with ___ | for multiple-choice: the question
  options?: string[];   // only for multiple-choice — the 4 answer choices
  answer: string;       // the correct answer
  explanation: string;  // brief explanation of the grammar rule behind this exercise
};

// ─── Topic name constants ──────────────────────────────────────────────────────
//
// These must match the `topic` field on every GrammarExercise in the data files.
// Import these constants everywhere a topic string is referenced (lessons,
// topicTipMap, grammarTopicService) so that renaming a topic causes a
// compile-time error instead of a silent mismatch.

export const A1_TOPICS = {
  VERB_SEIN:           'Verb conjugation: sein',
  VERB_HABEN:          'Verb conjugation: haben',
  DEFINITE_ARTICLES:   'Definite articles: der/die/das',
  NEGATION:            'Negation: nicht / kein',
  WORD_ORDER:          'Word order: verb in 2nd position',
  INDEFINITE_ARTICLES: 'Indefinite articles: ein/eine',
  PERSONAL_PRONOUNS:   'Personal pronouns',
  REGULAR_VERBS:       'Regular verb conjugation',
  MODAL_VERBS:         'Modal verbs',
  ACCUSATIVE:          'Accusative case',
  POSSESSIVE_ARTICLES: 'Possessive articles',
  QUESTIONS:           'Questions',
  SEPARABLE_VERBS:     'Separable verbs',
  PLURAL_NOUNS:        'Plural nouns',
  IMPERATIVE:          'Imperative',
  PREPOSITIONS:        'Prepositions',
  TIME_EXPRESSIONS:    'Time expressions',
  REFLEXIVE_VERBS:     'Reflexive verbs',
  DAYS_MONTHS_SEASONS: 'Days, months and seasons',
} as const;

export const A2_TOPICS = {
  PERFEKT_REGULAR:        'Perfekt: regular verbs',
  PERFEKT_IRREGULAR:      'Perfekt: irregular verbs',
  PERFEKT_HABEN_SEIN:     'Perfekt: haben vs sein',
  PRAETERITUM:            'Präteritum: sein / haben / modals',
  ADJ_DEFINITE:           'Adjective endings: definite articles',
  ADJ_INDEFINITE:         'Adjective endings: indefinite articles',
  TWO_WAY_PREPOSITIONS:   'Two-way prepositions',
  REFLEXIVE_VERBS:        'Reflexive verbs',
  SUBORDINATE_CLAUSES:    'Subordinate clauses: weil / dass',
  COMPARATIVE_SUPERLATIVE:'Comparative and superlative',
  INFINITIVE_ZU:          'Infinitive with zu',
  FUTURE_WERDEN:          'Future tense: werden',
} as const;

export const B1_TOPICS = {
  KONJUNKTIV_WUERDEN:  'Konjunktiv II: würden + infinitive',
  KONJUNKTIV_FORMS:    'Konjunktiv II: sein / haben / modals',
  PASSIVE_PRAESENS:    'Passive voice: Präsens',
  PASSIVE_PRAETERITUM: 'Passive voice: Präteritum',
  RELATIVE_NOM_AKK:    'Relative clauses: Nominativ / Akkusativ',
  RELATIVE_DAT:        'Relative clauses: Dativ',
  GENITIV:             'Genitiv case',
  TEMPORAL_ALS_WENN:   'Temporal clauses: als / wenn / während',
  TEMPORAL_BEVOR:      'Temporal clauses: bevor / nachdem / seitdem',
  INFINITIVE_CONSTR:   'Infinitive constructions: um...zu / ohne...zu / statt...zu',
  TWO_PART_CONJ:       'Two-part conjunctions',
  VERB_PREPOSITION:    'Verb + preposition combinations',
} as const;

export const B2_TOPICS = {
  PARTICIPIAL_PHRASES: 'Extended participial phrases',
  KONJUNKTIV_I:        'Konjunktiv I',
  MODAL_PARTICLES:     'Modal particles',
  PASSIVE_MODAL:       'Passive with modal verbs',
  N_DEKLINATION:       'N-Deklination',
  NOMINALISIERUNG:     'Nominalisierung',
  GENITIV_PREPOSITIONS:'Genitiv prepositions',
  COMPLEX_CONNECTORS:  'Complex connectors',
  INDIRECT_QUESTIONS:  'Indirect questions',
  RELATIVE_WAS_WO:     'Relative clauses with was/wo',
} as const;
