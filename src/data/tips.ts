// tips.ts — Static tip/hint content shown in the TipsBar at the bottom of every screen.
// Each level has its own array of tips.
// In Phase 2 we'll expand each list to 20-30 tips. For now, a few placeholders per level.

import { Level } from '../store/useLevelStore';

// A Record<Level, string[]> means: an object where each key is a Level and the value is a string array.
export const TIPS: Record<Level, string[]> = {
  A1: [
    'All nouns in German are always capitalized — e.g. das Haus (the house).',
    'There are 3 genders in German: der (masculine), die (feminine), das (neuter).',
    '"Sein" means "to be". Ich bin, du bist, er/sie/es ist.',
    '"Haben" means "to have". Ich habe, du hast, er/sie/es hat.',
    'The verb always goes in the second position in a German sentence.',
  ],
  A2: [
    'The Perfekt tense is used in spoken German for past events: Ich habe gegessen (I ate).',
    'Regular verbs form the past participle with ge- + stem + -t: machen → gemacht.',
    'Irregular verbs have unpredictable past participles — these must be memorised.',
    'Modal verbs (können, müssen, wollen) push the main verb to the end of the sentence.',
    'Adjective endings change depending on the gender and case of the noun they describe.',
  ],
  B1: [
    'The Konjunktiv II is used for polite requests and hypothetical situations: Ich würde gern... (I would like to...).',
    'Relative clauses use a relative pronoun (der, die, das) that matches the noun\'s gender.',
    'Separable verbs split apart in a sentence: anrufen → Ich rufe dich an.',
    'The Genitiv case shows possession: das Auto meines Vaters (my father\'s car).',
    'Weil (because) and dass (that) are subordinating conjunctions — verb goes to the end.',
  ],
  B2: [
    'The Konjunktiv I is used for indirect speech in formal writing: Er sagte, er habe keine Zeit.',
    'Extended participial phrases replace relative clauses in formal German writing.',
    'German has many two-way prepositions (in, an, auf) that take Akkusativ for movement and Dativ for location.',
    'Nominalisations (turning verbs into nouns) are very common in formal German: beschließen → der Beschluss.',
    'The double infinitive construction is used with modal verbs in the Perfekt: Er hat kommen müssen.',
  ],
};
