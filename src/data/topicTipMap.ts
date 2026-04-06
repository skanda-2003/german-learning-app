// topicTipMap.ts — Maps grammar topic strings to targeted tip texts.
//
// When the user gets a topic wrong repeatedly, TipsBar surfaces the matching tip
// as a "Focus Tip" so they see a relevant reminder on their next visit.
//
// Keys must match the `topic` field on GrammarExercise exactly.

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

    'Modal verbs':
      'Modal verbs send the main verb to the end: "Ich kann kommen." können: kann/kannst/kann. müssen: muss/musst/muss. wollen: will/willst/will.',

    'Accusative case':
      'In the Accusative, only masculine changes: der → den, ein → einen. Feminine and neuter stay the same.',

    'Separable verbs':
      'Separable verbs split apart in a sentence: anrufen → "Ich rufe dich an." The prefix goes to the end!',

    'Possessive articles':
      'Possessives: mein (my), dein (your), sein (his), ihr (her), unser (our), euer (your pl), ihr/Ihr (their/formal).',

    'Questions':
      'Yes/no questions: verb comes first — "Kommst du?" W-questions: Wer (who), Was (what), Wo (where), Wann (when), Warum (why), Wie (how).',

    'Plural nouns':
      'The plural article is always "die" regardless of gender: der Mann → die Männer, das Kind → die Kinder.',

    'Imperative':
      'Commands: du-form drops -st → "Komm!" Ihr-form → "Kommt!" Formal Sie-form → "Kommen Sie!"',

    'Prepositions':
      'Common A1 prepositions: in, auf, an, bei, mit, nach, von, zu, aus. Use Dativ for location, Akkusativ for movement.',

    'Dativ case':
      'In the Dativ: der/ein → dem/einem, die/eine → der/einer, das/ein → dem/einem. Used after: mit, bei, von, zu.',
  },

  A2: {
    'Perfekt: regular verbs':
      'Regular past participles: ge- + stem + -t. machen → gemacht, kaufen → gekauft, lernen → gelernt.',

    'Perfekt: irregular verbs':
      'Irregular past participles must be memorised — stem vowel often changes: trinken → getrunken, schreiben → geschrieben, lesen → gelesen.',

    'Perfekt: haben vs sein':
      'Motion and change-of-state verbs use "sein": Ich bin gegangen. Er ist gefahren. Wir sind geblieben. Most other verbs use "haben".',

    'Präteritum: sein / haben / modals':
      '"Sein" and "haben" use Präteritum in speech: ich war, du warst, er war / ich hatte, er hatte. Modals: konnte, musste, wollte.',

    'Adjective endings: definite articles':
      'After der/die/das, adjective ending is -e in Nominative singular: der alte Mann, die alte Frau, das alte Kind. Otherwise -en.',

    'Adjective endings: indefinite articles':
      'After ein/eine, the adjective shows the gender: ein alter Mann (-er), eine alte Frau (-e), ein altes Haus (-es). Dative always -en.',

    'Two-way prepositions':
      'Two-way prepositions (in, an, auf, über, unter…): Akkusativ for movement (Wohin?), Dativ for location (Wo?). auf den Tisch vs auf dem Tisch.',

    'Reflexive verbs':
      'Reflexive pronouns: ich→mich, du→dich, er/sie/es→sich, wir→uns, ihr→euch. E.g. Ich freue mich. Er wäscht sich.',

    'Subordinate clauses: weil / dass':
      '"Weil" and "dass" send the verb to the end: Ich bleibe zu Hause, weil ich krank bin. Er sagt, dass er morgen kommt.',

    'Comparative and superlative':
      'Comparative: + -er, many take umlaut: alt→älter, groß→größer. Irregular: gut→besser, viel→mehr. Superlative: am + adjective + -sten.',

    'Infinitive with zu':
      'After versuchen, vergessen, anfangen, planen — use zu + infinitive. Separable verbs: aufstehen → aufzustehen (zu goes inside).',

    'Future tense: werden':
      'Future: werden + infinitive at the end. ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden. E.g. Ich werde kommen.',
  },

  B1: {
    'Konjunktiv II: würden + infinitive':
      '"würde + infinitive" = would do. Conjugation: ich würde, du würdest, er würde, wir würden, ihr würdet, sie würden. Infinitive goes to the end.',

    'Konjunktiv II: sein / haben / modals':
      'Konjunktiv II: sein → wäre, haben → hätte, können → könnte, müssen → müsste, sollen → sollte, dürfen → dürfte. Wenn ich reich wäre...',

    'Passive voice: Präsens':
      'Passive Präsens: "werden" (conjugated) + past participle at end. Das Auto wird repariert. Plural: werden. Agent: von + Dativ.',

    'Passive voice: Präteritum':
      'Passive Präteritum: "wurde/wurden" + past participle. Das Haus wurde gebaut. Plural: wurden. Agent: von + Dativ.',

    'Relative clauses: Nominativ / Akkusativ':
      'Nominative relative pronouns: der/die/das/die. Accusative: den/die/das/die — only masculine changes to "den". Verb goes to end.',

    'Relative clauses: Dativ':
      'Dative relative pronouns: dem (m/n), der (f), denen (plural). Used after dative verbs (helfen, glauben, vertrauen): "Der Mann, dem ich helfe..."',

    'Genitiv case':
      'Genitiv articles: des (m/n) + noun -(e)s, der (f/pl). Prepositions: wegen, trotz, während, statt — all take Genitiv.',

    'Temporal clauses: als / wenn / während':
      '"Als" = single past event. "Wenn" = repeated/future/present. "Während" = simultaneous. All send the verb to the end of their clause.',

    'Temporal clauses: bevor / nachdem / seitdem':
      '"Bevor" = before. "Nachdem" = after — the nachdem clause is one tense earlier (Plusquamperfekt + Präteritum). "Seitdem" = since (ongoing).',

    'Infinitive constructions: um...zu / ohne...zu / statt...zu':
      '"um...zu" = in order to, "ohne...zu" = without doing, "statt...zu" = instead of. Separable verbs: zu goes inside — aufzustehen, einzukaufen.',

    'Two-part conjunctions':
      'weder...noch = neither...nor | sowohl...als auch = both...and | entweder...oder = either...or | nicht nur...sondern auch = not only...but also.',

    'Verb + preposition combinations':
      'Fixed combos: warten auf, denken an, sich interessieren für, sich ärgern über, sich freuen auf (future), sich freuen über (past), bitten um.',
  },
};