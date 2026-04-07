// topicTipMap.ts — Maps grammar topic strings to targeted tip texts.
//
// When the user gets a topic wrong repeatedly, TipsBar surfaces the matching tip
// as a "Focus Tip" so they see a relevant reminder on their next visit.
//
// Keys use the topic constants from grammar/types.ts — if a topic is ever renamed
// there, the reference here will produce a compile-time error instead of silently
// missing the tip.

import type { Level } from '../store/useLevelStore';
import { A1_TOPICS, A2_TOPICS, B1_TOPICS, B2_TOPICS } from './grammar/types';

// Record<topic string, tip text> per level
export const TOPIC_TIP_MAP: Partial<Record<Level, Record<string, string>>> = {
  A1: {
    [A1_TOPICS.VERB_SEIN]:
      '"Sein" (to be): ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.',

    [A1_TOPICS.VERB_HABEN]:
      '"Haben" (to have): ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.',

    [A1_TOPICS.DEFINITE_ARTICLES]:
      '3 genders: der (masculine), die (feminine), das (neuter). Always learn a noun with its article!',

    [A1_TOPICS.NEGATION]:
      '"Nicht" negates verbs/adjectives. "Kein/keine/kein" negates nouns: "Ich habe kein Auto."',

    [A1_TOPICS.WORD_ORDER]:
      'The verb is always the second element — not the second word. "Heute gehe ich..." not "Heute ich gehe..."',

    [A1_TOPICS.INDEFINITE_ARTICLES]:
      'Indefinite articles: ein (m/n), eine (f). Masculine in Akkusativ → einen: "Ich habe einen Bruder."',

    [A1_TOPICS.PERSONAL_PRONOUNS]:
      '"du" is informal (friends, family). "Sie" (capital S) is always formal (strangers, colleagues).',

    [A1_TOPICS.REGULAR_VERBS]:
      'Regular verbs: add endings to the stem — -e, -st, -t, -en, -t, -en. E.g. machen → mache, machst, macht.',

    [A1_TOPICS.MODAL_VERBS]:
      'Modal verbs send the main verb to the end: "Ich kann kommen." können: kann/kannst/kann. müssen: muss/musst/muss. wollen: will/willst/will.',

    [A1_TOPICS.ACCUSATIVE]:
      'In the Accusative, only masculine changes: der → den, ein → einen. Feminine and neuter stay the same.',

    [A1_TOPICS.SEPARABLE_VERBS]:
      'Separable verbs split apart in a sentence: anrufen → "Ich rufe dich an." The prefix goes to the end!',

    [A1_TOPICS.POSSESSIVE_ARTICLES]:
      'Possessives: mein (my), dein (your), sein (his), ihr (her), unser (our), euer (your pl), ihr/Ihr (their/formal).',

    [A1_TOPICS.QUESTIONS]:
      'Yes/no questions: verb comes first — "Kommst du?" W-questions: Wer (who), Was (what), Wo (where), Wann (when), Warum (why), Wie (how).',

    [A1_TOPICS.PLURAL_NOUNS]:
      'The plural article is always "die" regardless of gender: der Mann → die Männer, das Kind → die Kinder.',

    [A1_TOPICS.IMPERATIVE]:
      'Commands: du-form drops -st → "Komm!" Ihr-form → "Kommt!" Formal Sie-form → "Kommen Sie!"',

    [A1_TOPICS.PREPOSITIONS]:
      'Common A1 prepositions: in, auf, an, bei, mit, nach, von, zu, aus. Use Dativ for location, Akkusativ for movement.',

    [A1_TOPICS.TIME_EXPRESSIONS]:
      'Time expressions: um + clock time (um 9 Uhr), halb before the next hour (halb drei = 2:30), am + part of day (am Abend, am Morgen).',

    [A1_TOPICS.REFLEXIVE_VERBS]:
      'Reflexive pronouns: ich→mich, du→dich, er/sie/es→sich, wir→uns, ihr→euch. E.g. Ich freue mich. Er wäscht sich.',

    [A1_TOPICS.DAYS_MONTHS_SEASONS]:
      'Days: am Montag/Dienstag... Months: im Januar/Februar... Seasons: im Frühling, im Sommer, im Herbst, im Winter.',
  },

  A2: {
    [A2_TOPICS.PERFEKT_REGULAR]:
      'Regular past participles: ge- + stem + -t. machen → gemacht, kaufen → gekauft, lernen → gelernt.',

    [A2_TOPICS.PERFEKT_IRREGULAR]:
      'Irregular past participles must be memorised — stem vowel often changes: trinken → getrunken, schreiben → geschrieben, lesen → gelesen.',

    [A2_TOPICS.PERFEKT_HABEN_SEIN]:
      'Motion and change-of-state verbs use "sein": Ich bin gegangen. Er ist gefahren. Wir sind geblieben. Most other verbs use "haben".',

    [A2_TOPICS.PRAETERITUM]:
      '"Sein" and "haben" use Präteritum in speech: ich war, du warst, er war / ich hatte, er hatte. Modals: konnte, musste, wollte.',

    [A2_TOPICS.ADJ_DEFINITE]:
      'After der/die/das, adjective ending is -e in Nominative singular: der alte Mann, die alte Frau, das alte Kind. Otherwise -en.',

    [A2_TOPICS.ADJ_INDEFINITE]:
      'After ein/eine, the adjective shows the gender: ein alter Mann (-er), eine alte Frau (-e), ein altes Haus (-es). Dative always -en.',

    [A2_TOPICS.TWO_WAY_PREPOSITIONS]:
      'Two-way prepositions (in, an, auf, über, unter…): Akkusativ for movement (Wohin?), Dativ for location (Wo?). auf den Tisch vs auf dem Tisch.',

    [A2_TOPICS.REFLEXIVE_VERBS]:
      'Reflexive pronouns: ich→mich, du→dich, er/sie/es→sich, wir→uns, ihr→euch. E.g. Ich freue mich. Er wäscht sich.',

    [A2_TOPICS.SUBORDINATE_CLAUSES]:
      '"Weil" and "dass" send the verb to the end: Ich bleibe zu Hause, weil ich krank bin. Er sagt, dass er morgen kommt.',

    [A2_TOPICS.COMPARATIVE_SUPERLATIVE]:
      'Comparative: + -er, many take umlaut: alt→älter, groß→größer. Irregular: gut→besser, viel→mehr. Superlative: am + adjective + -sten.',

    [A2_TOPICS.INFINITIVE_ZU]:
      'After versuchen, vergessen, anfangen, planen — use zu + infinitive. Separable verbs: aufstehen → aufzustehen (zu goes inside).',

    [A2_TOPICS.FUTURE_WERDEN]:
      'Future: werden + infinitive at the end. ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden. E.g. Ich werde kommen.',
  },

  B1: {
    [B1_TOPICS.KONJUNKTIV_WUERDEN]:
      '"würde + infinitive" = would do. Conjugation: ich würde, du würdest, er würde, wir würden, ihr würdet, sie würden. Infinitive goes to the end.',

    [B1_TOPICS.KONJUNKTIV_FORMS]:
      'Konjunktiv II: sein → wäre, haben → hätte, können → könnte, müssen → müsste, sollen → sollte, dürfen → dürfte. Wenn ich reich wäre...',

    [B1_TOPICS.PASSIVE_PRAESENS]:
      'Passive Präsens: "werden" (conjugated) + past participle at end. Das Auto wird repariert. Plural: werden. Agent: von + Dativ.',

    [B1_TOPICS.PASSIVE_PRAETERITUM]:
      'Passive Präteritum: "wurde/wurden" + past participle. Das Haus wurde gebaut. Plural: wurden. Agent: von + Dativ.',

    [B1_TOPICS.RELATIVE_NOM_AKK]:
      'Nominative relative pronouns: der/die/das/die. Accusative: den/die/das/die — only masculine changes to "den". Verb goes to end.',

    [B1_TOPICS.RELATIVE_DAT]:
      'Dative relative pronouns: dem (m/n), der (f), denen (plural). Used after dative verbs (helfen, glauben, vertrauen): "Der Mann, dem ich helfe..."',

    [B1_TOPICS.GENITIV]:
      'Genitiv articles: des (m/n) + noun -(e)s, der (f/pl). Prepositions: wegen, trotz, während, statt — all take Genitiv.',

    [B1_TOPICS.TEMPORAL_ALS_WENN]:
      '"Als" = single past event. "Wenn" = repeated/future/present. "Während" = simultaneous. All send the verb to the end of their clause.',

    [B1_TOPICS.TEMPORAL_BEVOR]:
      '"Bevor" = before. "Nachdem" = after — the nachdem clause is one tense earlier (Plusquamperfekt + Präteritum). "Seitdem" = since (ongoing).',

    [B1_TOPICS.INFINITIVE_CONSTR]:
      '"um...zu" = in order to, "ohne...zu" = without doing, "statt...zu" = instead of. Separable verbs: zu goes inside — aufzustehen, einzukaufen.',

    [B1_TOPICS.TWO_PART_CONJ]:
      'weder...noch = neither...nor | sowohl...als auch = both...and | entweder...oder = either...or | nicht nur...sondern auch = not only...but also.',

    [B1_TOPICS.VERB_PREPOSITION]:
      'Fixed combos: warten auf, denken an, sich interessieren für, sich ärgern über, sich freuen auf (future), sich freuen über (past), bitten um.',
  },

  B2: {
    [B2_TOPICS.PARTICIPIAL_PHRASES]:
      'Formal B2 style often compresses relative clauses into participial attributes: die in Berlin arbeitende Forscherin.',

    [B2_TOPICS.KONJUNKTIV_I]:
      'Use Konjunktiv I in indirect speech to report claims neutrally: Er sagte, er sei bereit.',

    [B2_TOPICS.MODAL_PARTICLES]:
      'Modal particles (doch, ja, mal, eigentlich, wohl, halt) change tone and stance, not the factual core.',

    [B2_TOPICS.PASSIVE_MODAL]:
      'Passive + modal structure is fixed: modal verb + Partizip II + werden. Example: Das muss heute erledigt werden.',

    [B2_TOPICS.N_DEKLINATION]:
      'Many masculine nouns add -n/-en in accusative, dative, and genitive: der Kunde, den Kunden, dem Kunden, des Kunden.',

    [B2_TOPICS.NOMINALISIERUNG]:
      'Nominalization increases formality: das Lernen, die Entscheidung, die Schnelligkeit. Keep capitalization correct.',

    [B2_TOPICS.GENITIV_PREPOSITIONS]:
      'Key B2 prepositions with genitive: wegen, trotz, während, innerhalb, außerhalb, aufgrund, anstatt, mithilfe.',

    [B2_TOPICS.COMPLEX_CONNECTORS]:
      'Distinguish pairs carefully: obwohl (subordinate) vs trotzdem (main clause), weil (verb final) vs denn (verb second).',

    [B2_TOPICS.INDIRECT_QUESTIONS]:
      'Use ob for yes/no indirect questions and keep verb-final order: Ich weiß nicht, ob er kommt.',

    [B2_TOPICS.RELATIVE_WAS_WO]:
      'Use was after alles/etwas/nichts and wo for place references: Alles, was ... / der Ort, wo ...',
  },
};
