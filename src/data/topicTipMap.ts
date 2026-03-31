// topicTipMap.ts — Maps grammar topic strings to targeted tip texts.
//
// When the user gets a topic wrong repeatedly, TipsBar surfaces the matching tip
// as a "Focus Tip" so they see a relevant reminder on their next visit.
//
// Keys must match the `topic` field on GrammarExercise exactly.
// Add entries for A2/B1/B2 when those levels are built out.

import type { Level } from '../store/useLevelStore';

// Record<topic string, tip text> per level
export const TOPIC_TIP_MAP: Partial<Record<Level, Record<string, string>>> = {
  A1: {
    'Verb conjugation: sein':
      '"Sein" (to be): ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.',

    'Verb conjugation: haben':
      '"Haben" (to have): ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.',

    'Definite articles: der/die/das':
      '3 genders: der (masculine), die (feminine), das (neuter). Always learn a noun with its article!',

    'Negation: nicht / kein':
      '"Nicht" negates verbs/adjectives. "Kein/keine/kein" negates nouns: "Ich habe kein Auto."',

    'Word order: verb in 2nd position':
      'The verb is always the second element — not the second word. "Heute gehe ich..." not "Heute ich gehe..."',

    'Indefinite articles: ein/eine':
      'Indefinite articles: ein (m/n), eine (f). Masculine in Akkusativ → einen: "Ich habe einen Bruder."',

    'Personal pronouns':
      '"du" is informal (friends, family). "Sie" (capital S) is always formal (strangers, colleagues).',

    'Regular verb conjugation':
      'Regular verbs: add endings to the stem — -e, -st, -t, -en, -t, -en. E.g. machen → mache, machst, macht.',

    'Modal verbs: können':
      '"Können" (can): ich kann, du kannst, er kann. Modal verbs send the main verb to the end: "Ich kann kommen."',

    'Modal verbs: müssen':
      '"Müssen" (must): ich muss, du musst, er muss, wir müssen, ihr müsst, sie müssen.',

    'Modal verbs: wollen':
      '"Wollen" (want to): ich will, du willst, er will, wir wollen, ihr wollt, sie wollen.',

    'Modal verbs: dürfen':
      '"Dürfen" (may/allowed to): ich darf, du darfst, er darf, wir dürfen, ihr dürft, sie dürfen.',

    'Akkusativ case':
      'In the Akkusativ, only masculine changes: der → den, ein → einen. Feminine and neuter stay the same.',

    'Separable verbs':
      'Separable verbs split apart in a sentence: anrufen → "Ich rufe dich an." The prefix goes to the end!',

    'Possessive articles':
      'Possessives: mein (my), dein (your), sein (his), ihr (her), unser (our), euer (your pl), ihr/Ihr (their/formal).',

    'Question formation':
      'Yes/no questions: verb comes first — "Kommst du?" W-questions use Wer, Was, Wo, Wann, Warum, Wie.',

    'W-questions':
      'W-question words: Wer (who), Was (what), Wo (where), Wann (when), Warum (why), Wie (how), Woher (from where).',

    'Plural nouns':
      'The plural article is always "die" regardless of gender: der Mann → die Männer, das Kind → die Kinder.',

    'Imperative':
      'Commands: du-form drops -st → "Komm!" Ihr-form → "Kommt!" Formal Sie-form → "Kommen Sie!"',

    'Prepositions':
      'Common A1 prepositions: in, auf, an, bei, mit, nach, von, zu, aus. Use Dativ for location, Akkusativ for movement.',

    'Dativ case':
      'In the Dativ: der/ein → dem/einem, die/eine → der/einer, das/ein → dem/einem. Used after: mit, bei, von, zu.',
  },
};