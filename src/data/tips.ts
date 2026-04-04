// tips.ts — Static tip/hint content shown in the TipsBar at the bottom of every screen.
// Each level has its own array of tips.
// A1: 25 tips. A2: 20 tips. B1/B2: placeholder tips (coming soon).

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
    // --- Perfekt tense ---
    'Perfekt is the spoken past tense. Use haben/sein + past participle at the end: Ich habe gegessen. (I ate.)',
    'Regular past participles: ge- + stem + -t. Examples: machen → gemacht, kaufen → gekauft, lernen → gelernt.',
    'Irregular past participles must be memorised — the stem vowel often changes: trinken → getrunken, schreiben → geschrieben.',
    'Movement and change-of-state verbs use "sein" in the Perfekt: Ich bin gegangen. Er ist gefahren. Wir sind geblieben.',
    // --- Präteritum ---
    '"Sein" and "haben" are usually used in Präteritum, not Perfekt: ich war (I was), ich hatte (I had), not "ich bin gewesen".',
    'Modal verbs in Präteritum: können → konnte, müssen → musste, wollen → wollte. No umlaut in these forms!',
    // --- Adjective endings ---
    'After der/die/das, adjective endings are mostly -en — except Nominative singular: der alte Mann, die alte Frau, das alte Kind.',
    'After ein/eine, the adjective must show the gender "ein" hides: ein alter Mann (-er), eine alte Frau (-e), ein altes Haus (-es).',
    // --- Two-way prepositions ---
    'Two-way prepositions (in, an, auf, über, unter…): use Akkusativ for movement (Wohin?) and Dativ for location (Wo?).',
    '"Ich lege das Buch auf den Tisch." (movement → Akk) vs "Das Buch liegt auf dem Tisch." (location → Dat).',
    // --- Reflexive verbs ---
    'Reflexive verbs use a reflexive pronoun: ich → mich, du → dich, er/sie/es → sich, wir → uns, ihr → euch.',
    'Common reflexive verbs: sich waschen (to wash), sich freuen auf (to look forward to), sich vorstellen (to introduce oneself).',
    // --- Subordinate clauses ---
    '"Weil" (because) and "dass" (that) are subordinating conjunctions — the verb goes to the end of the clause.',
    '"Ich bleibe zu Hause, weil ich krank bin." — the verb "bin" is at the end, not in second position.',
    'With a modal in a weil/dass clause, the infinitive comes before the modal: "...weil er arbeiten muss."',
    // --- Comparative & superlative ---
    'Comparative: adjective + -er. Many take an umlaut: alt → älter, groß → größer, warm → wärmer.',
    'Irregular comparatives: gut → besser, viel → mehr, hoch → höher. Superlatives: gut → am besten, viel → am meisten.',
    // --- Infinitive with zu ---
    'After versuchen, vergessen, anfangen, planen — use zu + infinitive: Ich versuche, früh aufzustehen.',
    'Separable verbs: "zu" goes inside — aufstehen → aufzustehen, einkaufen → einzukaufen.',
    // --- Future with werden ---
    'Future tense: werden + infinitive at the end. Conjugation: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden.',
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
