// tips.ts — Static tip/hint content shown in the TipsBar at the bottom of every screen.
// Each level has its own array of tips.
// A1 tips are fully written (25 tips). A2/B1/B2 to be expanded in Phase 10.

import { Level } from '../store/useLevelStore';

// A Record<Level, string[]> means: an object where each key is a Level and the value is a string array.
export const TIPS: Record<Level, string[]> = {
  A1: [
    // --- Nouns & Gender ---
    'All nouns in German are always capitalized — e.g. das Haus (the house), die Frau (the woman).',
    'There are 3 genders in German: der (masculine), die (feminine), das (neuter). Every noun has one!',
    'Always learn a noun together with its article — not just "Haus" but "das Haus". Gender must be memorised.',
    'The plural article is always "die", no matter the gender — der Mann → die Männer, das Kind → die Kinder.',

    // --- Essential Verbs ---
    '"Sein" means "to be": ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.',
    '"Haben" means "to have": ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.',
    '"Es gibt" means "there is / there are" — e.g. Es gibt einen Park. (There is a park.) Very useful!',

    // --- Sentence Structure ---
    'The verb always goes in second position in a German sentence — not necessarily the second word.',
    'Yes/no questions: put the verb first. "Kommst du?" = "Are you coming?" "Haben Sie Zeit?" = "Do you have time?"',
    'W-questions use: Wer (who), Was (what), Wo (where), Wann (when), Warum (why), Wie (how).',
    'Time expressions usually come before place — "Ich fahre morgen nach Berlin." (I am going to Berlin tomorrow.)',

    // --- Negation ---
    'Use "nicht" to negate verbs and adjectives: "Ich komme nicht." (I am not coming.)',
    'Use "kein" to negate nouns — it means "no" or "not a": "Ich habe kein Auto." (I have no car.)',

    // --- Formality ---
    '"du" is informal — use it with friends and family. "Sie" (always capital S) is formal — use it with strangers.',
    '"Wie geht es Ihnen?" is formal (how are you?). "Wie geht es dir?" is informal. Reply: "Gut, danke!"',

    // --- Modal Verbs ---
    'Modal verbs send the main verb to the end: "Ich kann Deutsch sprechen." (I can speak German.)',
    'The key modal verbs at A1: können (can), müssen (must), wollen (want to), dürfen (may/allowed to).',
    '"Ich möchte..." means "I would like..." — polite and essential for ordering food, shopping, and requests.',

    // --- Separable Verbs ---
    'Separable verbs split in a sentence — the prefix jumps to the end: "anrufen" → "Ich rufe dich an." (I call you.)',

    // --- Cases ---
    'German has 4 cases. At A1, focus on Nominativ (subject) and Akkusativ (direct object).',
    'In the Akkusativ, only "der" changes — it becomes "den": "Ich sehe den Mann." (I see the man.)',

    // --- Pronunciation & Spelling ---
    'German has umlauts: ä, ö, ü. These are completely different sounds from a, o, u — practise them!',
    '"ß" (Eszett) sounds like a double "s". It appears in common words like Straße (street) and heißen (to be called).',

    // --- Useful Expressions ---
    '"Gern" means "gladly / like to". Add it after a verb: "Ich trinke gern Kaffee." = "I like drinking coffee."',
    'German time: "halb elf" means 10:30 — literally "half to eleven". Watch out — it\'s easy to get caught out!',
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
