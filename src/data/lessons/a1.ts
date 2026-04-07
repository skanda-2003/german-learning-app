// a1.ts — A1 lesson content (19 lessons)
//
// Each topic string must match exactly what appears in src/data/grammar/a1.ts.
// The explanation, keyPoints, examples, and commonMistake fields are written
// to be beginner-friendly — short sentences, no jargon.

import type { Lesson } from './types';

export const A1_LESSONS: Lesson[] = [

  // ─── 1. Verb conjugation: sein ──────────────────────────────────────────────
  {
    topic: 'Verb conjugation: sein',
    level: 'A1',
    title: 'The verb "sein" (to be)',
    explanation:
      '"Sein" means "to be". It is one of the most important German verbs and you will use it constantly — to describe people, places, states, and nationalities.\n\n' +
      'Like English "to be", it is irregular — the ending does not follow a predictable pattern. You simply need to memorise the six forms: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.\n\n' +
      'Notice that "sie" (she) and "Sie" (formal you) share the same form "ist" and "sind" respectively. Context and capitalisation tell them apart in writing.',
    keyPoints: [
      'ich bin — du bist — er/sie/es ist',
      'wir sind — ihr seid — sie/Sie sind',
      '"sein" is irregular — memorise the forms directly',
      'Use "sein" for descriptions, nationalities, and locations',
      '"Sie sind" (capital S) = formal "you are"; "sie sind" = "they are"',
    ],
    examples: [
      { german: 'Ich bin Student.',          english: 'I am a student.',         note: 'ich → bin' },
      { german: 'Du bist sehr nett.',        english: 'You are very nice.',       note: 'du → bist' },
      { german: 'Er ist Arzt.',              english: 'He is a doctor.',          note: 'er → ist' },
      { german: 'Wir sind aus Berlin.',      english: 'We are from Berlin.',      note: 'wir → sind' },
      { german: 'Ihr seid spät.',            english: 'You (all) are late.',      note: 'ihr → seid' },
      { german: 'Sie sind müde.',            english: 'They are tired.',          note: 'sie (they) → sind' },
    ],
    commonMistake:
      'Wrong: "Ich ist müde." Correct: "Ich bin müde." — never use "ist" with "ich". Each pronoun has its own unique form.',
  },

  // ─── 2. Verb conjugation: haben ─────────────────────────────────────────────
  {
    topic: 'Verb conjugation: haben',
    level: 'A1',
    title: 'The verb "haben" (to have)',
    explanation:
      '"Haben" means "to have". Along with "sein", it is one of the two most essential German verbs. You need it to say what you own or possess, and later to form past tenses (Perfekt).\n\n' +
      'The conjugation is mostly regular but with some irregularities in the du and er/sie/es forms: du hast (not "du habst"), er hat (not "er habt").\n\n' +
      'The forms to learn are: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.',
    keyPoints: [
      'ich habe — du hast — er/sie/es hat',
      'wir haben — ihr habt — sie/Sie haben',
      '"du hast" and "er hat" are irregular — no "b" in the stem',
      'Use "haben" for possession, feelings, and body states (hunger, thirst)',
      'You will also need "haben" to form the Perfekt past tense',
    ],
    examples: [
      { german: 'Ich habe ein Buch.',       english: 'I have a book.',           note: 'ich → habe' },
      { german: 'Du hast einen Hund.',      english: 'You have a dog.',           note: 'du → hast (not "habst")' },
      { german: 'Er hat keine Zeit.',       english: 'He has no time.',           note: 'er → hat (not "habt")' },
      { german: 'Wir haben Hunger.',        english: 'We are hungry.',            note: 'wir → haben' },
      { german: 'Ihr habt viele Freunde.', english: 'You (all) have many friends.', note: 'ihr → habt' },
      { german: 'Sie haben Durst.',         english: 'They are thirsty.',         note: 'sie → haben' },
    ],
    commonMistake:
      'Wrong: "Du habst ein Auto." Correct: "Du hast ein Auto." — the "b" disappears in the du and er/sie/es forms.',
  },

  // ─── 3. Regular verb conjugation ────────────────────────────────────────────
  {
    topic: 'Regular verb conjugation',
    level: 'A1',
    title: 'Regular verb conjugation',
    explanation:
      'Most German verbs are regular — they follow a predictable pattern. To conjugate a regular verb, take the infinitive (the dictionary form ending in "-en"), remove the "-en" ending to get the stem, then add the correct suffix for each pronoun.\n\n' +
      'The suffixes are: -e (ich), -st (du), -t (er/sie/es), -en (wir), -t (ihr), -en (sie/Sie).\n\n' +
      'For example: "spielen" (to play) → stem "spiel" → ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen. Once you know this pattern, you can conjugate thousands of German verbs.',
    keyPoints: [
      'Remove "-en" from the infinitive to get the stem',
      'Add: -e / -st / -t / -en / -t / -en for ich/du/er/wir/ihr/sie',
      'wir and sie/Sie always match the infinitive',
      'Stems ending in -t or -d add an extra "e" before the suffix (du arbeitest, not "du arbeitst")',
      'This pattern works for most verbs — irregular ones (sein, haben, fahren) must be memorised',
    ],
    examples: [
      { german: 'Ich spiele Gitarre.',      english: 'I play guitar.',            note: 'spiel + e' },
      { german: 'Du lernst Deutsch.',       english: 'You are learning German.',  note: 'lern + st' },
      { german: 'Er wohnt in Hamburg.',     english: 'He lives in Hamburg.',      note: 'wohn + t' },
      { german: 'Wir kaufen Brot.',         english: 'We buy bread.',             note: 'kauf + en (= infinitive)' },
      { german: 'Ihr kommt morgen.',        english: 'You (all) come tomorrow.',  note: 'komm + t' },
      { german: 'Sie arbeiten viel.',       english: 'They work a lot.',          note: 'arbeit + en' },
    ],
    commonMistake:
      'Wrong: "Du lernst" but "Er lernt" — students often forget that "er/sie/es" uses "-t" not "-st". The du-form is "-st" and the er-form is "-t".',
  },

  // ─── 4. Definite articles: der/die/das ──────────────────────────────────────
  {
    topic: 'Definite articles: der/die/das',
    level: 'A1',
    title: 'Definite articles: der / die / das',
    explanation:
      'In German every noun has a grammatical gender: masculine (der), feminine (die), or neuter (das). These are the definite articles — the equivalent of English "the".\n\n' +
      'Unlike English, the gender is not always logical. "Der Mann" (the man) is masculine — sensible. But "das Mädchen" (the girl) is neuter, and "die Lampe" (the lamp) is feminine. Gender must be memorised together with the noun.\n\n' +
      'A good habit is to always learn new nouns with their article: not "Hund" but "der Hund". The article also changes depending on the grammatical case (Nominativ, Akkusativ, Dativ) — but at A1 you mainly need the Nominativ forms shown here.',
    keyPoints: [
      'der = masculine (der Mann, der Hund, der Tisch)',
      'die = feminine (die Frau, die Schule, die Katze)',
      'das = neuter (das Kind, das Auto, das Buch)',
      'die is also used for ALL plural nouns regardless of gender',
      'Always learn new vocabulary as "der/die/das + noun"',
    ],
    examples: [
      { german: 'Der Mann ist groß.',       english: 'The man is tall.',          note: 'Mann = masculine → der' },
      { german: 'Die Frau arbeitet.',       english: 'The woman works.',          note: 'Frau = feminine → die' },
      { german: 'Das Kind schläft.',        english: 'The child is sleeping.',    note: 'Kind = neuter → das' },
      { german: 'Das Buch ist alt.',        english: 'The book is old.',          note: 'Buch = neuter → das' },
      { german: 'Die Schule ist groß.',     english: 'The school is big.',        note: 'Schule = feminine → die' },
      { german: 'Der Bus kommt.',           english: 'The bus is coming.',        note: 'Bus = masculine → der' },
    ],
    commonMistake:
      'Wrong: treating gender as predictable from meaning. "Das Mädchen" (the girl) is neuter, not feminine. Always check and memorise the article with the noun.',
  },

  // ─── 5. Indefinite articles: ein/eine ───────────────────────────────────────
  {
    topic: 'Indefinite articles: ein/eine',
    level: 'A1',
    title: 'Indefinite articles: ein / eine',
    explanation:
      '"Ein" and "eine" mean "a" or "an" in English. Which one you use depends on the gender of the noun.\n\n' +
      'In the Nominativ case (subject): masculine nouns use "ein" (ein Mann), feminine nouns use "eine" (eine Frau), and neuter nouns use "ein" (ein Kind). So masculine and neuter share "ein", while feminine uses "eine".\n\n' +
      'Important: in the Akkusativ case (direct object), the masculine form changes to "einen" — "Ich sehe einen Mann." The feminine and neuter forms stay the same. This is the first place where case affects the article.',
    keyPoints: [
      'Nominativ: ein Mann, eine Frau, ein Kind',
      'Akkusativ: einen Mann, eine Frau, ein Kind (only masculine changes)',
      '"ein" has no plural — German uses no article for indefinite plural (Kinder spielen)',
      'Feminine "eine" never changes in A1 exercises',
      'Memorise gender to know which article to use',
    ],
    examples: [
      { german: 'Das ist ein Hund.',         english: 'That is a dog.',            note: 'Hund = masculine → ein (Nominativ)' },
      { german: 'Das ist eine Katze.',       english: 'That is a cat.',            note: 'Katze = feminine → eine' },
      { german: 'Das ist ein Auto.',         english: 'That is a car.',            note: 'Auto = neuter → ein' },
      { german: 'Ich habe einen Bruder.',    english: 'I have a brother.',         note: 'Bruder = masculine, Akkusativ → einen' },
      { german: 'Ich habe eine Schwester.',  english: 'I have a sister.',          note: 'Schwester = feminine → eine (unchanged)' },
      { german: 'Ich kaufe ein Buch.',       english: 'I am buying a book.',       note: 'Buch = neuter → ein (unchanged)' },
    ],
    commonMistake:
      'Wrong: "Ich habe ein Bruder." Correct: "Ich habe einen Bruder." — masculine nouns change to "einen" in the Akkusativ. Feminine and neuter stay the same.',
  },

  // ─── 6. Possessive articles ──────────────────────────────────────────────────
  {
    topic: 'Possessive articles',
    level: 'A1',
    title: 'Possessive articles (mein, dein, sein…)',
    explanation:
      'Possessive articles replace the indefinite article "ein/eine" to show ownership. They are: mein (my), dein (your informal), sein (his/its), ihr (her/their), unser (our), euer (your plural), Ihr (your formal).\n\n' +
      'The endings follow the same pattern as "ein/eine": add "-e" for feminine nouns (meine Mutter), add "-en" for masculine Akkusativ (meinen Vater), no ending for masculine Nominativ or neuter (mein Bruder, mein Auto).\n\n' +
      'Think of them as "ein/eine" with a prefix attached: "mein" = m + ein, "dein" = d + ein, "sein" = s + ein. The endings work identically.',
    keyPoints: [
      'mein/dein/sein/ihr/unser/euer/Ihr — one for each person',
      'Endings mirror "ein/eine": -e for feminine, -en for masculine Akkusativ',
      '"sein" = his/its; "ihr" = her/their — context decides which',
      'Add endings even when using unser/euer (unsere, eure for feminine)',
      'Learn them by substituting: "ein Hund" → "mein Hund", "eine Katze" → "meine Katze"',
    ],
    examples: [
      { german: 'Das ist mein Hund.',       english: 'That is my dog.',           note: 'masculine Nominativ → mein (no ending)' },
      { german: 'Wo ist deine Tasche?',     english: 'Where is your bag?',        note: 'feminine → deine' },
      { german: 'Sein Auto ist neu.',       english: 'His car is new.',           note: 'neuter → sein (no ending)' },
      { german: 'Ich liebe meine Familie.', english: 'I love my family.',         note: 'feminine Akkusativ → meine' },
      { german: 'Unser Haus ist groß.',     english: 'Our house is big.',         note: 'neuter → unser (no ending)' },
      { german: 'Habt ihr euren Schlüssel?', english: 'Do you have your key?',   note: 'masculine Akkusativ → euren' },
    ],
    commonMistake:
      'Wrong: "Das ist mein Schwester." Correct: "Das ist meine Schwester." — feminine nouns always need the "-e" ending on the possessive article.',
  },

  // ─── 7. Personal pronouns ────────────────────────────────────────────────────
  {
    topic: 'Personal pronouns',
    level: 'A1',
    title: 'Personal pronouns',
    explanation:
      'Personal pronouns replace nouns so you do not have to repeat the same word. The German Nominativ (subject) pronouns are: ich (I), du (you, informal), er (he), sie (she), es (it), wir (we), ihr (you plural, informal), sie (they), Sie (you, formal).\n\n' +
      'German has two words for "you": "du" for friends and family, "Sie" (always capitalised) for strangers, customers, and formal situations. Using the wrong one can seem rude or overly familiar.\n\n' +
      'In the Akkusativ (object position) the pronouns change: mich, dich, ihn, sie, es, uns, euch, sie, Sie. At A1 you mainly need the Nominativ forms, but "mich" and "dich" appear in reflexive and object sentences.',
    keyPoints: [
      'ich / du / er / sie / es / wir / ihr / sie / Sie',
      '"du" = informal you (friends, children); "Sie" = formal you',
      '"Sie" (formal) always takes the same verb form as "sie" (they)',
      '"er" = he or a masculine noun; "sie" = she or a feminine noun; "es" = it or a neuter noun',
      'The pronoun must agree with the grammatical gender of the noun it replaces',
    ],
    examples: [
      { german: 'Ich lerne Deutsch.',        english: 'I am learning German.',    note: 'ich = I' },
      { german: 'Du sprichst gut.',          english: 'You speak well.',           note: 'du = informal you' },
      { german: 'Er kommt aus Spanien.',     english: 'He comes from Spain.',      note: 'er = he' },
      { german: 'Sie ist meine Lehrerin.',   english: 'She is my teacher.',        note: 'sie (she) = feminine person' },
      { german: 'Wir wohnen in München.',    english: 'We live in Munich.',        note: 'wir = we' },
      { german: 'Sprechen Sie Englisch?',    english: 'Do you speak English?',     note: 'Sie = formal you (capitalised)' },
    ],
    commonMistake:
      'Wrong: referring to "das Mädchen" (the girl, neuter) as "sie" too quickly. The pronoun follows grammatical gender, so a girl can technically be "es" when using the noun — though in practice native speakers usually switch to "sie" for people.',
  },

  // ─── 8. Questions ────────────────────────────────────────────────────────────
  {
    topic: 'Questions',
    level: 'A1',
    title: 'Asking questions in German',
    explanation:
      'German has two main question types. Yes/no questions simply invert the subject and verb: "Du kommst." → "Kommst du?" The verb moves to position 1.\n\n' +
      'W-questions use a question word at the start: wer (who), was (what), wo (where), woher (where from), wohin (where to), wann (when), warum (why), wie (how), wie viel (how much), wie viele (how many). The verb still comes second, right after the question word.\n\n' +
      'Question words are worth memorising early — you will use them in almost every conversation.',
    keyPoints: [
      'Yes/no question: verb first, then subject — "Bist du müde?"',
      'W-question: question word → verb → subject — "Wo wohnst du?"',
      'wer / was / wo / woher / wohin / wann / warum / wie',
      '"wie heißen Sie?" = what is your name? (literally "how are you called?")',
      '"woher" = where from; "wohin" = where to; "wo" = where (static location)',
    ],
    examples: [
      { german: 'Bist du Student?',         english: 'Are you a student?',        note: 'yes/no: verb first' },
      { german: 'Kommst du morgen?',        english: 'Are you coming tomorrow?',  note: 'yes/no: verb first' },
      { german: 'Wo wohnst du?',            english: 'Where do you live?',        note: 'W-question: wo → verb → subject' },
      { german: 'Woher kommst du?',         english: 'Where are you from?',       note: '"woher" = where from' },
      { german: 'Wie heißt du?',            english: 'What is your name?',        note: 'common introductory phrase' },
      { german: 'Wann fährt der Zug?',      english: 'When does the train leave?', note: '"wann" = when' },
    ],
    commonMistake:
      'Wrong: "Wo du wohnst?" Correct: "Wo wohnst du?" — in a W-question the verb must come second (right after the question word), not third.',
  },

  // ─── 9. Negation: nicht / kein ───────────────────────────────────────────────
  {
    topic: 'Negation: nicht / kein',
    level: 'A1',
    title: 'Negation: nicht and kein',
    explanation:
      '"Nicht" and "kein" both mean "not" or "no", but they are used in different situations.\n\n' +
      'Use "kein/keine/keinen" to negate a noun. It replaces the indefinite article "ein/eine": "ein Hund" → "kein Hund". It follows the same endings as "ein": kein (masc. Nom./neut.), keine (fem.), keinen (masc. Akk.).\n\n' +
      'Use "nicht" for everything else: to negate a verb, an adjective, an adverb, or a noun that already has a definite article. "Nicht" usually comes near the end of the sentence or directly before the word it negates.',
    keyPoints: [
      'kein/keine/keinen = negates a noun (replaces ein/eine)',
      'nicht = negates verbs, adjectives, adverbs, or definite-article nouns',
      '"kein" endings: kein (m. Nom./neut.), keine (fem.), keinen (m. Akk.)',
      '"nicht" position: at sentence end, or directly before the negated element',
      'Never use "nicht" where you need "kein": "Ich habe kein Auto" — not "kein ein"',
    ],
    examples: [
      { german: 'Ich habe kein Auto.',       english: 'I do not have a car.',      note: 'kein = negates a neuter noun' },
      { german: 'Er kommt nicht heute.',     english: 'He is not coming today.',   note: 'nicht = negates an adverb' },
      { german: 'Sie hat keine Schwester.',  english: 'She does not have a sister.', note: 'keine = feminine noun' },
      { german: 'Das ist nicht richtig.',    english: 'That is not correct.',      note: 'nicht = negates an adjective' },
      { german: 'Ich trinke keinen Kaffee.', english: 'I do not drink coffee.',    note: 'keinen = masculine Akkusativ' },
      { german: 'Ich mag den Film nicht.',   english: 'I do not like the film.',   note: 'nicht after definite article noun' },
    ],
    commonMistake:
      'Wrong: "Ich habe nicht Auto." Correct: "Ich habe kein Auto." — when there is no article before the noun, use "kein", not "nicht".',
  },

  // ─── 10. Accusative case ─────────────────────────────────────────────────────
  {
    topic: 'Accusative case',
    level: 'A1',
    title: 'The Accusative case (Akkusativ)',
    explanation:
      'German has four grammatical cases. The Akkusativ (Accusative) is the case for the direct object — the thing that receives the action of the verb.\n\n' +
      'In "Ich sehe den Mann", "den Mann" is the direct object (what I see). The key change from Nominativ to Akkusativ only affects the masculine singular: "der" becomes "den", "ein" becomes "einen", and "mein" becomes "meinen". Feminine, neuter, and plural articles stay the same.\n\n' +
      'The personal pronouns also change in the Akkusativ: ich → mich, du → dich, er → ihn, sie → sie, es → es, wir → uns, ihr → euch.',
    keyPoints: [
      'Akkusativ = the direct object (the thing the verb acts on)',
      'Only masculine changes: der → den, ein → einen, mein → meinen',
      'Feminine, neuter, and plural stay the same',
      'Common verbs that take Akkusativ: haben, sehen, kaufen, kennen, lieben, brauchen',
      'Pronouns: mich (me), dich (you), ihn (him), sie (her), uns (us), euch (you pl.)',
    ],
    examples: [
      { german: 'Ich sehe den Mann.',        english: 'I see the man.',            note: 'der Mann → den Mann (Akkusativ)' },
      { german: 'Ich kaufe einen Apfel.',    english: 'I am buying an apple.',     note: 'ein → einen (masculine)' },
      { german: 'Er liebt die Frau.',        english: 'He loves the woman.',       note: 'die Frau stays the same (feminine)' },
      { german: 'Sie liest das Buch.',       english: 'She is reading the book.',  note: 'das Buch stays the same (neuter)' },
      { german: 'Ich brauche meinen Stift.', english: 'I need my pen.',            note: 'mein → meinen (masculine Akkusativ)' },
      { german: 'Er kennt mich.',            english: 'He knows me.',              note: 'ich → mich (pronoun Akkusativ)' },
    ],
    commonMistake:
      'Wrong: "Ich sehe der Mann." Correct: "Ich sehe den Mann." — the direct object in a sentence always uses the Akkusativ; "der" becomes "den" for masculine nouns.',
  },

  // ─── 11. Modal verbs ─────────────────────────────────────────────────────────
  {
    topic: 'Modal verbs',
    level: 'A1',
    title: 'Modal verbs (können, müssen, wollen…)',
    explanation:
      'Modal verbs express ability, necessity, wish, or permission. The six main modals are: können (can/to be able to), müssen (must/to have to), wollen (to want to), sollen (should/to be supposed to), dürfen (may/to be allowed to), mögen/möchten (to like/would like to).\n\n' +
      'Modals are irregular — the ich and er/sie/es forms have no ending (ich kann, er kann). The verb they modify goes to the end of the sentence in infinitive form.\n\n' +
      'This creates a "verb bracket" (Satzklammer): the modal sits in position 2, the infinitive goes to the end: "Ich kann gut Deutsch sprechen."',
    keyPoints: [
      'können / müssen / wollen / sollen / dürfen / möchten',
      'Modal verb goes in position 2; the main verb (infinitive) goes to the end',
      'ich and er/sie/es forms have no ending: ich kann, er kann',
      'möchten = "would like to" — very polite and common in shops and restaurants',
      '"Ich muss morgen arbeiten" = I have to work tomorrow',
    ],
    examples: [
      { german: 'Ich kann Deutsch sprechen.',    english: 'I can speak German.',         note: 'können — sprechen goes to end' },
      { german: 'Er muss jetzt gehen.',          english: 'He must go now.',              note: 'müssen — gehen at the end' },
      { german: 'Sie will Lehrerin werden.',     english: 'She wants to become a teacher.', note: 'wollen — werden at the end' },
      { german: 'Darf ich das Fenster öffnen?',  english: 'May I open the window?',       note: 'dürfen — question form' },
      { german: 'Ich möchte einen Kaffee.',      english: 'I would like a coffee.',       note: 'möchten — no infinitive needed here' },
      { german: 'Du sollst nicht lügen.',        english: 'You shall not lie.',            note: 'sollen — infinitive at the end' },
    ],
    commonMistake:
      'Wrong: "Ich kann sprechen Deutsch." Correct: "Ich kann Deutsch sprechen." — the infinitive always goes to the very end of the sentence, after all other elements.',
  },

  // ─── 12. Prepositions ────────────────────────────────────────────────────────
  {
    topic: 'Prepositions',
    level: 'A1',
    title: 'Prepositions',
    explanation:
      'Prepositions are small words that show relationships between things — location, direction, time, and more. In German, each preposition requires a specific case for the noun that follows it.\n\n' +
      'Accusative prepositions (always take Akkusativ): durch (through), für (for), gegen (against), ohne (without), um (around/at [time]).\n\n' +
      'Dative prepositions (always take Dativ): aus (out of/from), bei (at/near), mit (with), nach (after/to [city]), seit (since), von (from/of), zu (to/at), gegenüber (opposite).\n\n' +
      'Two-way prepositions (Akkusativ for movement, Dativ for location) are covered at A2. At A1 focus on the pure Accusative and Dative groups.',
    keyPoints: [
      'Akkusativ prepositions: durch, für, gegen, ohne, um',
      'Dativ prepositions: aus, bei, mit, nach, seit, von, zu, gegenüber',
      '"mit" = with — always Dativ: "mit dem Bus", "mit meiner Freundin"',
      '"für" = for — always Akkusativ: "ein Geschenk für meinen Vater"',
      'Dativ: der → dem, die → der, das → dem, ein → einem, eine → einer',
    ],
    examples: [
      { german: 'Das Geschenk ist für dich.',   english: 'The gift is for you.',       note: 'für + Akkusativ' },
      { german: 'Ich fahre mit dem Bus.',        english: 'I travel by bus.',           note: 'mit + Dativ: dem (neuter)' },
      { german: 'Er kommt aus Deutschland.',     english: 'He comes from Germany.',     note: 'aus + Dativ' },
      { german: 'Wir gehen ohne ihn.',           english: 'We are going without him.',  note: 'ohne + Akkusativ: ihn' },
      { german: 'Sie wohnt bei ihrer Mutter.',   english: 'She lives with her mother.', note: 'bei + Dativ: ihrer' },
      { german: 'Ich bin seit zwei Jahren hier.', english: 'I have been here for two years.', note: 'seit + Dativ' },
    ],
    commonMistake:
      'Wrong: "Ich fahre mit den Bus." Correct: "Ich fahre mit dem Bus." — "mit" always takes Dativ; "der Bus" becomes "dem Bus" in Dativ.',
  },

  // ─── 13. Word order: verb in 2nd position ────────────────────────────────────
  {
    topic: 'Word order: verb in 2nd position',
    level: 'A1',
    title: 'Word order: verb in 2nd position',
    explanation:
      'One of the most important rules in German: the conjugated verb must always be the second element in a main clause. This is called the V2 rule.\n\n' +
      'The first element can be the subject, a time expression, a place, or even a whole clause — but the verb always occupies the second slot. If something other than the subject starts the sentence, the subject moves to position 3 (after the verb).\n\n' +
      '"Ich gehe heute ins Kino." (Subject first) and "Heute gehe ich ins Kino." (Time first) are both correct. But "Heute ich gehe ins Kino." is wrong — verb is in third position.',
    keyPoints: [
      'The conjugated verb is always in position 2 in a main clause',
      'If time/place starts the sentence, verb comes second, then subject',
      'Subject and verb can swap, but verb never leaves position 2',
      'This applies to all sentence types except yes/no questions (verb = position 1)',
      'With modal verbs: modal = position 2, infinitive = end of sentence',
    ],
    examples: [
      { german: 'Ich gehe morgen ins Kino.',     english: 'I am going to the cinema tomorrow.',   note: 'subject first → verb 2nd' },
      { german: 'Morgen gehe ich ins Kino.',     english: 'Tomorrow I am going to the cinema.',   note: 'time first → verb 2nd, subject 3rd' },
      { german: 'In Berlin wohne ich seit 2020.', english: 'In Berlin I have lived since 2020.',  note: 'place first → verb 2nd, subject 3rd' },
      { german: 'Heute lerne ich Deutsch.',      english: 'Today I am learning German.',           note: 'time first → verb stays 2nd' },
      { german: 'Jetzt esse ich.',               english: 'Now I am eating.',                      note: 'adverb first → verb 2nd' },
      { german: 'Den Apfel esse ich.',           english: 'The apple I am eating.',               note: 'object first → verb 2nd, subject 3rd' },
    ],
    commonMistake:
      'Wrong: "Heute ich gehe zur Schule." Correct: "Heute gehe ich zur Schule." — when "heute" starts the sentence, the verb must immediately follow it in position 2.',
  },

  // ─── 14. Time expressions ────────────────────────────────────────────────────
  {
    topic: 'Time expressions',
    level: 'A1',
    title: 'Time expressions',
    explanation:
      'Time expressions tell you when something happens. German has specific patterns for saying the time of day, the hour, and parts of the day.\n\n' +
      'For clock times: "Es ist drei Uhr" (It is three o\'clock). For half hours, German counts forward to the next hour — "halb drei" = half past two (halfway to three), not half past three! For quarter hours: "Viertel nach zwei" = quarter past two; "Viertel vor drei" = quarter to three.\n\n' +
      'For parts of the day use "am": am Morgen, am Vormittag, am Nachmittag, am Abend. Exception: "in der Nacht" and "mittags" (at noon). "um" introduces the specific clock time: "um drei Uhr".',
    keyPoints: [
      '"Es ist ... Uhr" = It is ... o\'clock',
      '"halb drei" = half past two (not half past three!)',
      '"Viertel nach" = quarter past; "Viertel vor" = quarter to',
      '"am Morgen/Abend/Nachmittag" = in the morning/evening/afternoon',
      '"um" + clock time: "um acht Uhr" = at eight o\'clock',
    ],
    examples: [
      { german: 'Es ist drei Uhr.',          english: 'It is three o\'clock.',     note: 'full hour: number + Uhr' },
      { german: 'Es ist halb vier.',         english: 'It is half past three.',    note: 'halb = halfway to the next hour' },
      { german: 'Es ist Viertel nach fünf.', english: 'It is quarter past five.',  note: 'Viertel nach = quarter past' },
      { german: 'Es ist Viertel vor sechs.', english: 'It is quarter to six.',     note: 'Viertel vor = quarter to' },
      { german: 'Der Kurs beginnt um neun Uhr.', english: 'The course starts at nine o\'clock.', note: '"um" for specific time' },
      { german: 'Am Abend sehe ich fern.',   english: 'In the evening I watch TV.', note: 'am + part of day' },
    ],
    commonMistake:
      'Wrong: "halb drei" = half past three. Correct: "halb drei" = half past two. German "halb" means halfway to the next hour — so "halb drei" is halfway to three = 2:30.',
  },

  // ─── 15. Days, months and seasons ───────────────────────────────────────────
  {
    topic: 'Days, months and seasons',
    level: 'A1',
    title: 'Days, months, and seasons',
    explanation:
      'The days of the week, months, and seasons are all essential for daily communication. In German they all have grammatical gender (all masculine: der Montag, der Januar, der Frühling) but this rarely matters in practice.\n\n' +
      'Use "am" before days and parts of days: "am Montag" (on Monday), "am Wochenende" (at the weekend). Use "im" before months and seasons: "im Januar" (in January), "im Sommer" (in summer).\n\n' +
      '"am" = an + dem (contracted Dativ); "im" = in + dem (contracted Dativ). These contractions are standard — you should always use them.',
    keyPoints: [
      'Days: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag',
      'Months: Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember',
      'Seasons: der Frühling, der Sommer, der Herbst, der Winter',
      '"am" + day: "am Montag", "am Dienstag"',
      '"im" + month or season: "im April", "im Winter"',
    ],
    examples: [
      { german: 'Am Montag habe ich Deutschkurs.',  english: 'On Monday I have German class.',    note: 'am + day of week' },
      { german: 'Am Wochenende schlafe ich lange.', english: 'At the weekend I sleep long.',      note: 'am Wochenende = at the weekend' },
      { german: 'Im Januar ist es kalt.',           english: 'In January it is cold.',            note: 'im + month' },
      { german: 'Mein Geburtstag ist im März.',     english: 'My birthday is in March.',          note: 'im + month' },
      { german: 'Im Sommer fahren wir ans Meer.',   english: 'In summer we go to the sea.',       note: 'im + season' },
      { german: 'Der Herbst beginnt im September.', english: 'Autumn begins in September.',       note: 'im for both' },
    ],
    commonMistake:
      'Wrong: "In Montag habe ich frei." Correct: "Am Montag habe ich frei." — use "am" (not "in") before days of the week.',
  },

  // ─── 16. Plural nouns ────────────────────────────────────────────────────────
  {
    topic: 'Plural nouns',
    level: 'A1',
    title: 'Plural nouns',
    explanation:
      'In German, plurals are not formed by simply adding "-s" as in English. Each noun has its own plural form, and you must memorise it together with the noun and its gender.\n\n' +
      'There are several plural patterns: adding "-e" (der Tisch → die Tische), adding "-er" often with an umlaut (das Kind → die Kinder), adding "-en" or "-n" (die Frau → die Frauen, die Lampe → die Lampen), adding an umlaut only (der Vater → die Väter), and no change (der Lehrer → die Lehrer).\n\n' +
      'All plural nouns use "die" as the definite article regardless of the singular gender. This is a useful rule to remember.',
    keyPoints: [
      'No single rule — each noun has its own plural; learn it when you learn the noun',
      'All plural nouns use "die" as the definite article',
      'Common patterns: -e (Tisch/Tische), -er (Kind/Kinder), -en (Frau/Frauen), -n (Lampe/Lampen)',
      'Some nouns only add an umlaut: Mutter/Mütter, Vater/Väter',
      'Some nouns are the same in singular and plural: Lehrer/Lehrer, Zimmer/Zimmer',
    ],
    examples: [
      { german: 'der Tisch — die Tische',     english: 'the table — the tables',    note: 'adds -e' },
      { german: 'das Kind — die Kinder',      english: 'the child — the children',  note: 'adds -er' },
      { german: 'die Frau — die Frauen',      english: 'the woman — the women',     note: 'adds -en' },
      { german: 'die Lampe — die Lampen',     english: 'the lamp — the lamps',      note: 'adds -n (stem ends in -e)' },
      { german: 'der Vater — die Väter',      english: 'the father — the fathers',  note: 'umlaut only' },
      { german: 'der Lehrer — die Lehrer',    english: 'the teacher — the teachers', note: 'no change' },
    ],
    commonMistake:
      'Wrong: "Die Kinders spielen." Correct: "Die Kinder spielen." — "Kinder" is already the correct plural of "Kind"; never add a second plural marker.',
  },

  // ─── 17. Imperative ──────────────────────────────────────────────────────────
  {
    topic: 'Imperative',
    level: 'A1',
    title: 'The Imperative (commands)',
    explanation:
      'The imperative is used to give commands, instructions, or requests. German has three imperative forms depending on who you are addressing: du (informal singular), ihr (informal plural), and Sie (formal).\n\n' +
      'For "du": take the verb stem and add "-e" (or nothing for many verbs): "Kommen" → "Komm!" or "Komme!". In spoken German the "-e" is often dropped. Strong verbs with an "e→i" stem change keep that change: sprechen → Sprich!\n\n' +
      'For "ihr": use the same form as regular conjugation: "Kommt!" For "Sie": use the infinitive followed by "Sie": "Kommen Sie!" The "Sie" distinguishes it from the infinitive.',
    keyPoints: [
      'du-imperative: verb stem (optional -e): Komm! / Lerne!',
      'ihr-imperative: same as regular ihr-form: Kommt! / Lernt!',
      'Sie-imperative: infinitive + Sie: Kommen Sie! / Lernen Sie!',
      'sein is irregular: du → Sei! / ihr → Seid! / Sie → Seien Sie!',
      'Strong verbs with e→i change keep it in du form: sprechen → Sprich!',
    ],
    examples: [
      { german: 'Komm her!',              english: 'Come here!',                  note: 'du-imperative: komm (no -e)' },
      { german: 'Lerne die Vokabeln!',    english: 'Learn the vocabulary!',       note: 'du-imperative: lerne' },
      { german: 'Sprich langsamer!',      english: 'Speak more slowly!',          note: 'e→i change: sprechen → Sprich' },
      { german: 'Kommt ins Zimmer!',      english: 'Come into the room!',         note: 'ihr-imperative' },
      { german: 'Kommen Sie bitte hier.', english: 'Please come here.',           note: 'Sie-imperative: infinitive + Sie' },
      { german: 'Sei ruhig!',             english: 'Be quiet!',                   note: 'sein is irregular: Sei!' },
    ],
    commonMistake:
      'Wrong: "Sprechen Sie langsamer!" when speaking to a friend. Correct: "Sprich langsamer!" — use the "du" imperative for friends; reserve "Sprechen Sie" for formal situations.',
  },

  // ─── 18. Separable verbs ─────────────────────────────────────────────────────
  {
    topic: 'Separable verbs',
    level: 'A1',
    title: 'Separable verbs (trennbare Verben)',
    explanation:
      'Many German verbs are made of a base verb + a separable prefix (ab-, an-, auf-, aus-, ein-, mit-, vor-, zurück-, and others). In a main clause, the prefix separates from the verb and moves to the very end of the sentence.\n\n' +
      '"Aufstehen" (to get up) → "Ich stehe um 7 Uhr auf." The base verb "stehe" takes position 2, and "auf" goes to the end. This creates the verb bracket just like modal verbs.\n\n' +
      'In infinitive form (with modal verbs) the prefix stays attached: "Ich muss früh aufstehen." In questions the prefix still goes to the end: "Stehst du früh auf?"',
    keyPoints: [
      'Separable prefix moves to the end of the main clause',
      'The base verb stays in position 2 (conjugated normally)',
      'Common prefixes: ab-, an-, auf-, aus-, ein-, mit-, vor-, zurück-, zu-',
      'With modals: prefix stays attached in the infinitive at the end',
      'In spoken German, stress always falls on the prefix: AUFstehen',
    ],
    examples: [
      { german: 'Ich stehe um 7 Uhr auf.',        english: 'I get up at 7 o\'clock.',        note: 'auf- goes to end' },
      { german: 'Sie ruft ihren Freund an.',       english: 'She calls her boyfriend.',       note: 'an- goes to end' },
      { german: 'Wir machen das Licht aus.',       english: 'We turn off the light.',         note: 'aus- goes to end' },
      { german: 'Fährst du heute mit?',            english: 'Are you coming along today?',    note: 'mit- at end in question' },
      { german: 'Ich muss früh aufstehen.',        english: 'I have to get up early.',        note: 'with modal: prefix stays attached' },
      { german: 'Er kommt um 18 Uhr zurück.',     english: 'He returns at 6 p.m.',           note: 'zurück- goes to end' },
    ],
    commonMistake:
      'Wrong: "Ich aufstehe um 7 Uhr." Correct: "Ich stehe um 7 Uhr auf." — the conjugated base verb goes to position 2; the prefix goes to the end.',
  },

  // ─── 19. Reflexive verbs ─────────────────────────────────────────────────────
  {
    topic: 'Reflexive verbs',
    level: 'A1',
    title: 'Reflexive verbs (sich + verb)',
    explanation:
      'A reflexive verb describes an action that the subject does to itself. It uses a reflexive pronoun — in the Akkusativ: mich, dich, sich, uns, euch, sich.\n\n' +
      'Some German verbs are always reflexive (they must have a reflexive pronoun), like "sich vorstellen" (to introduce oneself), "sich fühlen" (to feel), "sich freuen" (to be happy). Others can be used reflexively or non-reflexively depending on meaning.\n\n' +
      'The reflexive pronoun usually comes right after the verb: "Ich wasche mich" (I wash myself). In a subordinate clause or with modals, the pronoun still follows the conjugated verb: "Ich muss mich beeilen."',
    keyPoints: [
      'Reflexive pronouns (Akkusativ): mich / dich / sich / uns / euch / sich',
      'sich is used for er/sie/es, sie (they), and Sie (formal)',
      'Common A1 reflexive verbs: sich vorstellen, sich setzen, sich fühlen, sich freuen',
      'Reflexive pronoun comes right after the conjugated verb',
      'With modals: "Ich muss mich beeilen" — pronoun after modal, infinitive at end',
    ],
    examples: [
      { german: 'Ich stelle mich vor.',        english: 'I introduce myself.',       note: 'mich = reflexive Akkusativ for ich' },
      { german: 'Setz dich bitte!',            english: 'Please sit down!',           note: 'dich = reflexive for du (imperative)' },
      { german: 'Er fühlt sich müde.',         english: 'He feels tired.',            note: 'sich = reflexive for er' },
      { german: 'Wir freuen uns auf den Urlaub.', english: 'We look forward to the holiday.', note: 'uns = reflexive for wir' },
      { german: 'Wie heißt du? Ich heiße Anna und stelle mich vor.',
        english: 'What is your name? My name is Anna and I am introducing myself.',
        note: 'reflexive in context' },
      { german: 'Ich muss mich beeilen.',      english: 'I have to hurry.',           note: 'modal + reflexive: mich after modal' },
    ],
    commonMistake:
      'Wrong: "Ich stelle ich vor." Correct: "Ich stelle mich vor." — the reflexive pronoun must be "mich" (not "ich") because it is the object form.',
  },

];
