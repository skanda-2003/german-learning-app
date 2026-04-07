// sentenceBuilder.ts — German sentences for the Sentence Builder game.
//
// Organised by CEFR level (A1 / A2) so the game only shows sentences
// appropriate for the currently selected level.
//
// Each entry has:
//   id          — unique string ID
//   words       — correct word order (no end punctuation — keeps tiles clean)
//   english     — English translation shown to the user as the prompt
//   grammarNote — brief explanation shown after the user submits their answer
//   difficulty  — 'simple' | 'medium' | 'complex'
//                   simple  = short SVO, basic sein/haben, ≤5 words
//                   medium  = irregular verbs, separable verbs, negation, Perfekt haben
//                   complex = modal verbs, subordinate clauses, dative prepositions, Perfekt sein

import type { Level } from '../store/useLevelStore';

export type Difficulty = 'simple' | 'medium' | 'complex';

export type SentenceEntry = {
  id: string;
  words: string[];
  english: string;
  grammarNote: string;
  difficulty: Difficulty;
};

// ─── A1 sentences ─────────────────────────────────────────────────────────────

const A1_SENTENCES: SentenceEntry[] = [
  // ── SEIN (to be) ─────────────────────────────────────────────────────────────

  {
    id: 'sb_001',
    words: ['Ich', 'bin', 'müde'],
    english: 'I am tired.',
    grammarNote: '"Bin" is the first-person singular of "sein" (to be).',
    difficulty: 'simple',
  },
  {
    id: 'sb_002',
    words: ['Du', 'bist', 'sehr', 'freundlich'],
    english: 'You are very friendly.',
    grammarNote: '"Bist" is the second-person singular of "sein". "Sehr" = very.',
    difficulty: 'simple',
  },
  {
    id: 'sb_003',
    words: ['Er', 'ist', 'jung', 'und', 'stark'],
    english: 'He is young and strong.',
    grammarNote: '"Ist" is the third-person singular of "sein". "Und" = and.',
    difficulty: 'simple',
  },
  {
    id: 'sb_004',
    words: ['Das', 'Wetter', 'ist', 'schön'],
    english: 'The weather is beautiful.',
    grammarNote: 'Predicate adjectives after "sein" take no extra ending.',
    difficulty: 'simple',
  },
  {
    id: 'sb_005',
    words: ['Wir', 'sind', 'hier'],
    english: 'We are here.',
    grammarNote: '"Sind" is the first-person plural of "sein".',
    difficulty: 'simple',
  },
  {
    id: 'sb_006',
    words: ['Das', 'ist', 'mein', 'Bruder'],
    english: 'This is my brother.',
    grammarNote: '"Mein" = my (masculine/neuter). "Das ist" = this is.',
    difficulty: 'simple',
  },
  {
    id: 'sb_007',
    words: ['Ich', 'bin', 'zwanzig', 'Jahre', 'alt'],
    english: 'I am twenty years old.',
    grammarNote: 'Age in German: "X Jahre alt sein" (literally: to be X years old).',
    difficulty: 'simple',
  },
  {
    id: 'sb_008',
    words: ['Die', 'Äpfel', 'sind', 'frisch'],
    english: 'The apples are fresh.',
    grammarNote: 'Plural "to be" uses "sind". "Die" is also the plural definite article.',
    difficulty: 'simple',
  },
  {
    id: 'sb_009',
    words: ['Er', 'ist', 'Arzt', 'von', 'Beruf'],
    english: 'He is a doctor by profession.',
    grammarNote: 'Professions in German take no article: "Er ist Arzt", not "Er ist ein Arzt".',
    difficulty: 'simple',
  },
  {
    id: 'sb_010',
    words: ['Das', 'Haus', 'ist', 'weiß', 'und', 'groß'],
    english: 'The house is white and big.',
    grammarNote: '"Das" is the neuter definite article. Multiple adjectives are joined with "und".',
    difficulty: 'simple',
  },

  // ── HABEN (to have) ───────────────────────────────────────────────────────────

  {
    id: 'sb_011',
    words: ['Ich', 'habe', 'Hunger'],
    english: 'I am hungry.',
    grammarNote: 'Body states use "haben" in German: "Hunger haben" = to be hungry.',
    difficulty: 'simple',
  },
  {
    id: 'sb_012',
    words: ['Er', 'hat', 'eine', 'Schwester'],
    english: 'He has a sister.',
    grammarNote: '"Eine" is the feminine indefinite article. "Schwester" = sister (feminine).',
    difficulty: 'simple',
  },
  {
    id: 'sb_013',
    words: ['Wir', 'haben', 'einen', 'Hund'],
    english: 'We have a dog.',
    grammarNote: 'Accusative case: masculine "ein" becomes "einen" as a direct object.',
    difficulty: 'medium',
  },
  {
    id: 'sb_014',
    words: ['Sie', 'hat', 'keine', 'Zeit'],
    english: 'She has no time.',
    grammarNote: '"Keine" is the negation of "eine" — means "no" or "not any".',
    difficulty: 'medium',
  },
  {
    id: 'sb_015',
    words: ['Ich', 'habe', 'zwei', 'Bücher'],
    english: 'I have two books.',
    grammarNote: 'Numbers replace articles in German. "Bücher" is the plural of "Buch".',
    difficulty: 'simple',
  },
  {
    id: 'sb_016',
    words: ['Du', 'hast', 'Recht'],
    english: 'You are right.',
    grammarNote: '"Recht haben" is an idiom meaning "to be right". Literally: "to have right".',
    difficulty: 'simple',
  },
  {
    id: 'sb_017',
    words: ['Wir', 'haben', 'heute', 'frei'],
    english: 'We have a day off today.',
    grammarNote: '"Frei haben" = to have time off. "Heute" = today.',
    difficulty: 'medium',
  },
  {
    id: 'sb_018',
    words: ['Er', 'hat', 'Fieber'],
    english: 'He has a fever.',
    grammarNote: 'Body states like having a fever use "haben" in German.',
    difficulty: 'simple',
  },

  // ── REGULAR VERBS ─────────────────────────────────────────────────────────────

  {
    id: 'sb_019',
    words: ['Ich', 'lerne', 'Deutsch'],
    english: 'I am learning German.',
    grammarNote: 'Regular verb: lernen (to learn). First-person: ich lerne.',
    difficulty: 'simple',
  },
  {
    id: 'sb_020',
    words: ['Er', 'trinkt', 'Wasser'],
    english: 'He drinks water.',
    grammarNote: 'Regular verb: trinken. Third-person singular adds -t: trinkt.',
    difficulty: 'simple',
  },
  {
    id: 'sb_021',
    words: ['Wir', 'spielen', 'Fußball'],
    english: 'We play football.',
    grammarNote: 'Regular verb: spielen (to play). "Wir spielen" = we play.',
    difficulty: 'simple',
  },
  {
    id: 'sb_022',
    words: ['Sie', 'kauft', 'Äpfel'],
    english: 'She buys apples.',
    grammarNote: 'Regular verb: kaufen. Third-person "er/sie/es" adds -t: kauft.',
    difficulty: 'simple',
  },
  {
    id: 'sb_023',
    words: ['Ich', 'wohne', 'in', 'Berlin'],
    english: 'I live in Berlin.',
    grammarNote: 'City names take no article in German: "in Berlin", not "in dem Berlin".',
    difficulty: 'medium',
  },
  {
    id: 'sb_024',
    words: ['Du', 'lernst', 'schnell'],
    english: 'You learn quickly.',
    grammarNote: 'Regular verb, second person: du + -st ending. "Schnell" = quickly.',
    difficulty: 'simple',
  },
  {
    id: 'sb_025',
    words: ['Er', 'arbeitet', 'im', 'Büro'],
    english: 'He works in the office.',
    grammarNote: '"Im" = in + dem (dative contraction). Used for location.',
    difficulty: 'medium',
  },
  {
    id: 'sb_026',
    words: ['Wir', 'kochen', 'zusammen'],
    english: 'We cook together.',
    grammarNote: 'Regular verb: kochen (to cook). "Zusammen" = together.',
    difficulty: 'simple',
  },
  {
    id: 'sb_027',
    words: ['Sie', 'tanzt', 'sehr', 'gut'],
    english: 'She dances very well.',
    grammarNote: 'Regular verb: tanzen. The stem ends in -z, so third-person is "tanzt".',
    difficulty: 'simple',
  },
  {
    id: 'sb_028',
    words: ['Ich', 'höre', 'Musik'],
    english: 'I listen to music.',
    grammarNote: '"Hören" = to hear / to listen to. No preposition needed with Musik.',
    difficulty: 'simple',
  },

  // ── IRREGULAR / STRONG VERBS ──────────────────────────────────────────────────

  {
    id: 'sb_029',
    words: ['Sie', 'isst', 'Brot'],
    english: 'She eats bread.',
    grammarNote: 'Irregular: essen → isst (3rd person singular). The vowel changes.',
    difficulty: 'medium',
  },
  {
    id: 'sb_030',
    words: ['Er', 'liest', 'die', 'Zeitung'],
    english: 'He reads the newspaper.',
    grammarNote: 'Irregular: lesen → liest. "Zeitung" = newspaper (feminine, "die").',
    difficulty: 'medium',
  },
  {
    id: 'sb_031',
    words: ['Ich', 'fahre', 'mit', 'dem', 'Bus'],
    english: 'I travel by bus.',
    grammarNote: '"Mit" + dative = by (transport). "Mit dem Bus" = by bus.',
    difficulty: 'complex',
  },
  {
    id: 'sb_032',
    words: ['Sie', 'schläft', 'bis', 'neun'],
    english: 'She sleeps until nine.',
    grammarNote: 'Irregular: schlafen → schläft. "Bis" = until.',
    difficulty: 'medium',
  },
  {
    id: 'sb_033',
    words: ['Er', 'trägt', 'eine', 'Jacke'],
    english: 'He is wearing a jacket.',
    grammarNote: 'Irregular: tragen → trägt. "Tragen" means both "to wear" and "to carry".',
    difficulty: 'medium',
  },
  {
    id: 'sb_034',
    words: ['Das', 'Kind', 'läuft', 'schnell'],
    english: 'The child runs fast.',
    grammarNote: 'Irregular: laufen → läuft. "Das Kind" = the child (neuter).',
    difficulty: 'medium',
  },
  {
    id: 'sb_035',
    words: ['Er', 'gibt', 'mir', 'das', 'Buch'],
    english: 'He gives me the book.',
    grammarNote: 'Irregular: geben → gibt. "Mir" = to me (dative of "ich").',
    difficulty: 'complex',
  },

  // ── SEPARABLE VERBS ───────────────────────────────────────────────────────────

  {
    id: 'sb_036',
    words: ['Ich', 'stehe', 'um', 'sieben', 'auf'],
    english: 'I get up at seven.',
    grammarNote: 'Separable verb: aufstehen (to get up). The prefix "auf" moves to the end.',
    difficulty: 'medium',
  },
  {
    id: 'sb_037',
    words: ['Er', 'ruft', 'seine', 'Mutter', 'an'],
    english: 'He calls his mother.',
    grammarNote: 'Separable verb: anrufen (to call). The prefix "an" moves to the end.',
    difficulty: 'medium',
  },
  {
    id: 'sb_038',
    words: ['Wir', 'sehen', 'abends', 'fern'],
    english: 'We watch TV in the evenings.',
    grammarNote: 'Separable verb: fernsehen. "Abends" = in the evenings.',
    difficulty: 'medium',
  },
  {
    id: 'sb_039',
    words: ['Sie', 'macht', 'die', 'Tür', 'zu'],
    english: 'She closes the door.',
    grammarNote: 'Separable verb: zumachen (to close). Prefix "zu" goes to the end.',
    difficulty: 'medium',
  },
  {
    id: 'sb_040',
    words: ['Ich', 'fange', 'jetzt', 'an'],
    english: 'I start now.',
    grammarNote: 'Separable verb: anfangen (to start). "Jetzt" = now.',
    difficulty: 'medium',
  },
  {
    id: 'sb_041',
    words: ['Er', 'kommt', 'um', 'drei', 'an'],
    english: 'He arrives at three.',
    grammarNote: 'Separable verb: ankommen (to arrive). Prefix "an" goes to the end.',
    difficulty: 'medium',
  },
  {
    id: 'sb_042',
    words: ['Wir', 'räumen', 'das', 'Zimmer', 'auf'],
    english: 'We tidy up the room.',
    grammarNote: 'Separable verb: aufräumen (to tidy up). Prefix "auf" moves to the end.',
    difficulty: 'medium',
  },

  // ── ARTICLES AND GENDER ───────────────────────────────────────────────────────

  {
    id: 'sb_043',
    words: ['Der', 'Hund', 'ist', 'groß'],
    english: 'The dog is big.',
    grammarNote: '"Der" = masculine definite article. "Hund" (dog) is masculine.',
    difficulty: 'simple',
  },
  {
    id: 'sb_044',
    words: ['Die', 'Katze', 'ist', 'klein'],
    english: 'The cat is small.',
    grammarNote: '"Die" = feminine definite article. "Katze" (cat) is feminine.',
    difficulty: 'simple',
  },
  {
    id: 'sb_045',
    words: ['Das', 'Buch', 'ist', 'rot'],
    english: 'The book is red.',
    grammarNote: '"Das" = neuter definite article. "Buch" (book) is neuter.',
    difficulty: 'simple',
  },
  {
    id: 'sb_046',
    words: ['Ein', 'Mann', 'steht', 'dort'],
    english: 'A man stands there.',
    grammarNote: '"Ein" = masculine indefinite article. "Dort" = there.',
    difficulty: 'medium',
  },
  {
    id: 'sb_047',
    words: ['Eine', 'Frau', 'geht', 'vorbei'],
    english: 'A woman walks by.',
    grammarNote: '"Eine" = feminine indefinite article. "Vorbeigehen" = to walk by (separable).',
    difficulty: 'medium',
  },

  // ── PREPOSITIONS ──────────────────────────────────────────────────────────────

  {
    id: 'sb_048',
    words: ['Das', 'Buch', 'liegt', 'auf', 'dem', 'Tisch'],
    english: 'The book is on the table.',
    grammarNote: '"Auf" + dative = on (location). "Dem" is the dative form of "der/das".',
    difficulty: 'complex',
  },
  {
    id: 'sb_049',
    words: ['Die', 'Katze', 'sitzt', 'vor', 'dem', 'Haus'],
    english: 'The cat sits in front of the house.',
    grammarNote: '"Vor" + dative = in front of. "Dem Haus" = the house (dative).',
    difficulty: 'complex',
  },
  {
    id: 'sb_050',
    words: ['Er', 'wohnt', 'neben', 'der', 'Schule'],
    english: 'He lives next to the school.',
    grammarNote: '"Neben" + dative = next to. "Der Schule" = the school (dative feminine).',
    difficulty: 'complex',
  },
  {
    id: 'sb_051',
    words: ['Ich', 'gehe', 'in', 'die', 'Stadt'],
    english: 'I go into the city.',
    grammarNote: '"In" + accusative = movement into. "Die Stadt" = the city (accusative).',
    difficulty: 'complex',
  },
  {
    id: 'sb_052',
    words: ['Sie', 'kommt', 'aus', 'der', 'Schweiz'],
    english: 'She comes from Switzerland.',
    grammarNote: '"Aus" + dative = from. Switzerland is "die Schweiz", so dative is "der Schweiz".',
    difficulty: 'complex',
  },
  {
    id: 'sb_053',
    words: ['Wir', 'gehen', 'zum', 'Supermarkt'],
    english: 'We go to the supermarket.',
    grammarNote: '"Zum" = zu + dem (dative contraction). "Zu" + dative = to (a place).',
    difficulty: 'complex',
  },
  {
    id: 'sb_054',
    words: ['Er', 'fährt', 'nach', 'München'],
    english: 'He travels to Munich.',
    grammarNote: '"Nach" + city/country name = to. No article needed with most city names.',
    difficulty: 'complex',
  },
  {
    id: 'sb_055',
    words: ['Das', 'Kind', 'spielt', 'im', 'Garten'],
    english: 'The child plays in the garden.',
    grammarNote: '"Im" = in + dem (dative). Location (not movement): use dative with "in".',
    difficulty: 'complex',
  },
  {
    id: 'sb_056',
    words: ['Sie', 'steht', 'hinter', 'dem', 'Auto'],
    english: 'She stands behind the car.',
    grammarNote: '"Hinter" + dative = behind (location). "Dem Auto" = the car (dative neuter).',
    difficulty: 'complex',
  },
  {
    id: 'sb_057',
    words: ['Ich', 'warte', 'auf', 'den', 'Zug'],
    english: 'I wait for the train.',
    grammarNote: '"Warten auf" = to wait for. Takes accusative: "auf den Zug".',
    difficulty: 'complex',
  },

  // ── NEGATION ──────────────────────────────────────────────────────────────────

  {
    id: 'sb_058',
    words: ['Ich', 'verstehe', 'das', 'nicht'],
    english: 'I don\'t understand that.',
    grammarNote: '"Nicht" comes at the end when negating a verb (in main clauses without an object modifier).',
    difficulty: 'medium',
  },
  {
    id: 'sb_059',
    words: ['Das', 'ist', 'kein', 'Problem'],
    english: 'That is not a problem.',
    grammarNote: '"Kein" negates a noun. Used instead of "nicht ein". "Kein" = neuter/masc. nominative.',
    difficulty: 'medium',
  },
  {
    id: 'sb_060',
    words: ['Er', 'trinkt', 'keinen', 'Kaffee'],
    english: 'He doesn\'t drink coffee.',
    grammarNote: '"Keinen" = accusative masculine of "kein". Coffee (Kaffee) is masculine.',
    difficulty: 'medium',
  },
  {
    id: 'sb_061',
    words: ['Ich', 'habe', 'keine', 'Geschwister'],
    english: 'I have no siblings.',
    grammarNote: '"Keine" negates plural nouns. "Geschwister" = siblings (always plural).',
    difficulty: 'medium',
  },
  {
    id: 'sb_062',
    words: ['Sie', 'ist', 'nicht', 'müde'],
    english: 'She is not tired.',
    grammarNote: '"Nicht" before an adjective (predicate) negates that adjective.',
    difficulty: 'medium',
  },
  {
    id: 'sb_063',
    words: ['Das', 'Restaurant', 'ist', 'nicht', 'weit'],
    english: 'The restaurant is not far.',
    grammarNote: '"Nicht" before an adjective = not. "Weit" = far.',
    difficulty: 'medium',
  },

  // ── TIME AND DAILY ROUTINE ────────────────────────────────────────────────────

  {
    id: 'sb_064',
    words: ['Ich', 'stehe', 'früh', 'auf'],
    english: 'I get up early.',
    grammarNote: 'Separable verb: aufstehen. "Früh" = early. The prefix goes to the end.',
    difficulty: 'medium',
  },
  {
    id: 'sb_065',
    words: ['Er', 'trinkt', 'jeden', 'Morgen', 'Kaffee'],
    english: 'He drinks coffee every morning.',
    grammarNote: '"Jeden Morgen" = every morning. "Jeden" is accusative masculine of "jeder".',
    difficulty: 'medium',
  },
  {
    id: 'sb_066',
    words: ['Wir', 'essen', 'um', 'zwölf', 'Uhr'],
    english: 'We eat at twelve o\'clock.',
    grammarNote: '"Um" + time = at. "Uhr" = o\'clock. "Zwölf" = twelve.',
    difficulty: 'medium',
  },
  {
    id: 'sb_067',
    words: ['Die', 'Post', 'kommt', 'um', 'zehn'],
    english: 'The post arrives at ten.',
    grammarNote: '"Um" before a number = at (for time). "Post" = post/mail (feminine).',
    difficulty: 'medium',
  },
  {
    id: 'sb_068',
    words: ['Ich', 'gehe', 'abends', 'spazieren'],
    english: 'I go for a walk in the evenings.',
    grammarNote: '"Abends" = in the evenings. "Spazieren gehen" = to go for a walk.',
    difficulty: 'medium',
  },

  // ── MODAL VERBS ───────────────────────────────────────────────────────────────

  {
    id: 'sb_069',
    words: ['Ich', 'kann', 'Deutsch', 'sprechen'],
    english: 'I can speak German.',
    grammarNote: 'Modal verb: können (can). The main verb "sprechen" goes to the end as infinitive.',
    difficulty: 'complex',
  },
  {
    id: 'sb_070',
    words: ['Du', 'musst', 'jetzt', 'gehen'],
    english: 'You must go now.',
    grammarNote: 'Modal verb: müssen (must). Infinitive "gehen" goes to the end.',
    difficulty: 'complex',
  },
  {
    id: 'sb_071',
    words: ['Wir', 'dürfen', 'hier', 'parken'],
    english: 'We are allowed to park here.',
    grammarNote: 'Modal verb: dürfen (to be allowed to). Infinitive goes to the end.',
    difficulty: 'complex',
  },
  {
    id: 'sb_072',
    words: ['Sie', 'will', 'ein', 'Buch', 'kaufen'],
    english: 'She wants to buy a book.',
    grammarNote: 'Modal verb: wollen (to want to). Infinitive "kaufen" goes to the end.',
    difficulty: 'complex',
  },
  {
    id: 'sb_073',
    words: ['Er', 'möchte', 'Wasser', 'trinken'],
    english: 'He would like to drink water.',
    grammarNote: '"Möchte" = would like to (polite form of mögen). Infinitive at end.',
    difficulty: 'complex',
  },

  // ── QUESTION STRUCTURES ───────────────────────────────────────────────────────

  {
    id: 'sb_074',
    words: ['Wie', 'heißt', 'du'],
    english: 'What is your name?',
    grammarNote: '"Wie heißt du?" — in questions the verb comes before the subject.',
    difficulty: 'simple',
  },
  {
    id: 'sb_075',
    words: ['Wo', 'wohnst', 'du'],
    english: 'Where do you live?',
    grammarNote: '"Wo" = where. In questions: question word + verb + subject.',
    difficulty: 'simple',
  },
  {
    id: 'sb_076',
    words: ['Was', 'isst', 'du', 'gern'],
    english: 'What do you like to eat?',
    grammarNote: '"Gern" after a verb = like to do something. "Was" = what.',
    difficulty: 'medium',
  },
  {
    id: 'sb_077',
    words: ['Woher', 'kommst', 'du'],
    english: 'Where are you from?',
    grammarNote: '"Woher" = from where. Used to ask about origin.',
    difficulty: 'simple',
  },
  {
    id: 'sb_078',
    words: ['Wann', 'fährt', 'der', 'Zug'],
    english: 'When does the train leave?',
    grammarNote: '"Wann" = when. In questions: verb comes directly after the question word.',
    difficulty: 'medium',
  },

  // ── MIXED / ADJECTIVES ────────────────────────────────────────────────────────

  {
    id: 'sb_079',
    words: ['Das', 'Essen', 'schmeckt', 'gut'],
    english: 'The food tastes good.',
    grammarNote: '"Schmecken" = to taste. "Das Essen" = the food (neuter noun from the verb essen).',
    difficulty: 'simple',
  },
  {
    id: 'sb_080',
    words: ['Er', 'kommt', 'aus', 'Österreich'],
    english: 'He comes from Austria.',
    grammarNote: '"Aus" + country name = from. Most country names take no article.',
    difficulty: 'simple',
  },
];

// ─── A2 sentences ─────────────────────────────────────────────────────────────
// ~50 sentences focusing on: Perfekt (haben + sein), subordinate clauses
// (weil / dass / obwohl / wenn), adjective endings, comparatives.

const A2_SENTENCES: SentenceEntry[] = [

  // ── PERFEKT WITH HABEN ────────────────────────────────────────────────────────

  {
    id: 'a2_sb_001',
    words: ['Ich', 'habe', 'das', 'Buch', 'gelesen'],
    english: 'I have read the book.',
    grammarNote: 'Perfekt with "haben": subject + haben + object + Partizip II at the end. "Lesen" → gelesen.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_002',
    words: ['Er', 'hat', 'Pizza', 'gegessen'],
    english: 'He has eaten pizza.',
    grammarNote: '"Essen" → gegessen (irregular Partizip II). Most Perfekt sentences use "haben".',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_003',
    words: ['Wir', 'haben', 'Deutsch', 'gelernt'],
    english: 'We have learned German.',
    grammarNote: 'Regular Partizip II: ge- + stem + -t. "Lernen" → gelernt.',
    difficulty: 'simple',
  },
  {
    id: 'a2_sb_004',
    words: ['Sie', 'hat', 'einen', 'Brief', 'geschrieben'],
    english: 'She has written a letter.',
    grammarNote: '"Schreiben" → geschrieben (irregular). "Einen Brief" = a letter (accusative masculine).',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_005',
    words: ['Ich', 'habe', 'Kaffee', 'getrunken'],
    english: 'I have drunk coffee.',
    grammarNote: '"Trinken" → getrunken (irregular Partizip II with vowel change).',
    difficulty: 'simple',
  },
  {
    id: 'a2_sb_006',
    words: ['Du', 'hast', 'das', 'Fenster', 'geöffnet'],
    english: 'You have opened the window.',
    grammarNote: 'Regular Partizip II: ge- + stem + -t. "Öffnen" → geöffnet.',
    difficulty: 'simple',
  },
  {
    id: 'a2_sb_007',
    words: ['Er', 'hat', 'sein', 'Auto', 'verkauft'],
    english: 'He has sold his car.',
    grammarNote: 'Verbs with inseparable prefixes (ver-) do NOT add ge-: "verkaufen" → verkauft.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_008',
    words: ['Wir', 'haben', 'die', 'Hausaufgaben', 'gemacht'],
    english: 'We have done the homework.',
    grammarNote: '"Machen" → gemacht (regular). "Die Hausaufgaben" = the homework (always plural).',
    difficulty: 'simple',
  },
  {
    id: 'a2_sb_009',
    words: ['Sie', 'haben', 'Musik', 'gehört'],
    english: 'They have listened to music.',
    grammarNote: '"Hören" → gehört (regular). The Partizip II goes to the very end of the sentence.',
    difficulty: 'simple',
  },
  {
    id: 'a2_sb_010',
    words: ['Ich', 'habe', 'meine', 'Freundin', 'angerufen'],
    english: 'I have called my girlfriend.',
    grammarNote: 'Separable verb: anrufen → angerufen. The "ge-" goes between prefix and stem: an-ge-rufen.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_011',
    words: ['Er', 'hat', 'das', 'Formular', 'ausgefüllt'],
    english: 'He has filled in the form.',
    grammarNote: 'Separable verb: ausfüllen → ausgefüllt. "Ge-" goes between prefix and stem.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_012',
    words: ['Ich', 'habe', 'einen', 'Fehler', 'gemacht'],
    english: 'I have made a mistake.',
    grammarNote: '"Einen Fehler machen" = to make a mistake. "Einen" = accusative of ein (masculine).',
    difficulty: 'medium',
  },

  // ── PERFEKT WITH SEIN ─────────────────────────────────────────────────────────

  {
    id: 'a2_sb_013',
    words: ['Ich', 'bin', 'nach', 'Berlin', 'gefahren'],
    english: 'I have travelled to Berlin.',
    grammarNote: 'Motion verbs use "sein" in Perfekt: fahren → gefahren. "Nach" + city = to.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_014',
    words: ['Sie', 'ist', 'früh', 'aufgestanden'],
    english: 'She got up early.',
    grammarNote: 'Separable verb with sein: aufstehen → aufgestanden. Change-of-state verbs use sein.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_015',
    words: ['Wir', 'sind', 'ins', 'Kino', 'gegangen'],
    english: 'We went to the cinema.',
    grammarNote: '"Gehen" → gegangen. Movement on foot uses "sein". "Ins" = in das.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_016',
    words: ['Er', 'ist', 'um', 'acht', 'Uhr', 'angekommen'],
    english: 'He arrived at eight o\'clock.',
    grammarNote: 'Separable verb with sein: ankommen → angekommen. Arrival = change of state → sein.',
    difficulty: 'complex',
  },
  {
    id: 'a2_sb_017',
    words: ['Die', 'Kinder', 'sind', 'schnell', 'gelaufen'],
    english: 'The children ran quickly.',
    grammarNote: '"Laufen" → gelaufen. Running (movement) uses "sein" in Perfekt.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_018',
    words: ['Ich', 'bin', 'in', 'die', 'Schule', 'gegangen'],
    english: 'I went to school.',
    grammarNote: '"Gehen" always uses "sein". "In die Schule" = to school (accusative, movement).',
    difficulty: 'medium',
  },

  // ── SUBORDINATE CLAUSES: WEIL ─────────────────────────────────────────────────

  {
    id: 'a2_sb_019',
    words: ['Ich', 'bleibe', 'zu', 'Hause', 'weil', 'ich', 'krank', 'bin'],
    english: 'I am staying at home because I am ill.',
    grammarNote: '"Weil" (because) sends the verb to the END of the clause: "...weil ich krank BIN".',
    difficulty: 'complex',
  },
  {
    id: 'a2_sb_020',
    words: ['Er', 'lernt', 'Deutsch', 'weil', 'er', 'in', 'Deutschland', 'arbeiten', 'will'],
    english: 'He is learning German because he wants to work in Germany.',
    grammarNote: 'With a modal verb in a weil-clause, the modal goes last: "...arbeiten WILL".',
    difficulty: 'complex',
  },
  {
    id: 'a2_sb_021',
    words: ['Sie', 'ist', 'müde', 'weil', 'sie', 'wenig', 'geschlafen', 'hat'],
    english: 'She is tired because she slept little.',
    grammarNote: 'Perfekt in a weil-clause: haben/sein goes to the very end after the Partizip II.',
    difficulty: 'complex',
  },
  {
    id: 'a2_sb_022',
    words: ['Wir', 'fahren', 'mit', 'dem', 'Bus', 'weil', 'das', 'Auto', 'kaputt', 'ist'],
    english: 'We are taking the bus because the car is broken.',
    grammarNote: '"Kaputt sein" = to be broken. In the weil-clause the verb "ist" goes to the end.',
    difficulty: 'complex',
  },

  // ── SUBORDINATE CLAUSES: DASS ─────────────────────────────────────────────────

  {
    id: 'a2_sb_023',
    words: ['Ich', 'glaube', 'dass', 'er', 'Recht', 'hat'],
    english: 'I think that he is right.',
    grammarNote: '"Dass" (that) sends the verb to the end: "...dass er Recht HAT". Note the comma before dass.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_024',
    words: ['Er', 'sagt', 'dass', 'er', 'morgen', 'kommt'],
    english: 'He says that he is coming tomorrow.',
    grammarNote: 'After verbs of saying/thinking, "dass" introduces the reported content. Verb goes last.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_025',
    words: ['Ich', 'weiß', 'dass', 'das', 'schwierig', 'ist'],
    english: 'I know that it is difficult.',
    grammarNote: '"Wissen" = to know (a fact). "Dass" clause: verb at the end.',
    difficulty: 'medium',
  },

  // ── SUBORDINATE CLAUSES: OBWOHL / WENN ────────────────────────────────────────

  {
    id: 'a2_sb_026',
    words: ['Er', 'geht', 'spazieren', 'obwohl', 'es', 'regnet'],
    english: 'He goes for a walk although it is raining.',
    grammarNote: '"Obwohl" (although) = concessive conjunction. Verb goes to end of clause.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_027',
    words: ['Wenn', 'es', 'warm', 'ist', 'gehen', 'wir', 'schwimmen'],
    english: 'When it is warm, we go swimming.',
    grammarNote: '"Wenn" (when/if) starts a subordinate clause. After the clause, the main verb comes first: GEHEN wir...',
    difficulty: 'complex',
  },
  {
    id: 'a2_sb_028',
    words: ['Sie', 'kauft', 'das', 'Kleid', 'obwohl', 'es', 'teuer', 'ist'],
    english: 'She buys the dress although it is expensive.',
    grammarNote: '"Obwohl" shows contrast. The fact in the obwohl-clause is true, but it doesn\'t stop the action.',
    difficulty: 'medium',
  },

  // ── COMPARATIVE ───────────────────────────────────────────────────────────────

  {
    id: 'a2_sb_029',
    words: ['Berlin', 'ist', 'größer', 'als', 'Hamburg'],
    english: 'Berlin is bigger than Hamburg.',
    grammarNote: 'Comparative: adjective + -er. "Groß" → "größer" (umlaut change). "Als" = than.',
    difficulty: 'simple',
  },
  {
    id: 'a2_sb_030',
    words: ['Das', 'Buch', 'ist', 'interessanter', 'als', 'der', 'Film'],
    english: 'The book is more interesting than the film.',
    grammarNote: '"Interessant" → "interessanter". All German comparatives use -er, never "mehr + adjective".',
    difficulty: 'simple',
  },
  {
    id: 'a2_sb_031',
    words: ['Sie', 'spricht', 'besser', 'Deutsch', 'als', 'ich'],
    english: 'She speaks German better than I do.',
    grammarNote: '"Gut" → "besser" (irregular comparative). "Als" = than in comparisons.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_032',
    words: ['Der', 'Zug', 'ist', 'schneller', 'als', 'der', 'Bus'],
    english: 'The train is faster than the bus.',
    grammarNote: '"Schnell" → "schneller". Regular comparative: add -er to the adjective stem.',
    difficulty: 'simple',
  },
  {
    id: 'a2_sb_033',
    words: ['Ich', 'trinke', 'lieber', 'Tee', 'als', 'Kaffee'],
    english: 'I prefer to drink tea rather than coffee.',
    grammarNote: '"Gern" → "lieber" (comparative of gern = like to). "Lieber" = prefer / rather.',
    difficulty: 'medium',
  },

  // ── ADJECTIVE ENDINGS ─────────────────────────────────────────────────────────

  {
    id: 'a2_sb_034',
    words: ['Ich', 'habe', 'einen', 'alten', 'Freund', 'besucht'],
    english: 'I visited an old friend.',
    grammarNote: 'Adjective after indefinite article, accusative masculine: einen alt-EN Freund.',
    difficulty: 'complex',
  },
  {
    id: 'a2_sb_035',
    words: ['Sie', 'wohnt', 'in', 'einer', 'kleinen', 'Wohnung'],
    english: 'She lives in a small flat.',
    grammarNote: '"In einer..." = dative feminine. Adjective ending after einer: -en. "Kleinen Wohnung".',
    difficulty: 'complex',
  },
  {
    id: 'a2_sb_036',
    words: ['Er', 'kauft', 'das', 'rote', 'Auto'],
    english: 'He buys the red car.',
    grammarNote: 'Adjective after definite article, accusative neuter: das rot-E Auto.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_037',
    words: ['Die', 'nette', 'Frau', 'hilft', 'mir'],
    english: 'The nice woman helps me.',
    grammarNote: 'Adjective after definite article, nominative feminine: die nett-E Frau.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_038',
    words: ['Wir', 'essen', 'in', 'einem', 'guten', 'Restaurant'],
    english: 'We eat in a good restaurant.',
    grammarNote: '"In einem..." = dative neuter. Adjective after einem: -en. "Einem guten Restaurant".',
    difficulty: 'complex',
  },

  // ── TWO-WAY PREPOSITIONS ──────────────────────────────────────────────────────

  {
    id: 'a2_sb_039',
    words: ['Das', 'Buch', 'liegt', 'auf', 'dem', 'Tisch'],
    english: 'The book is lying on the table.',
    grammarNote: '"Auf dem" = on (location, dative). "Wo?" → Dativ. "Auf den" would mean movement onto.',
    difficulty: 'simple',
  },
  {
    id: 'a2_sb_040',
    words: ['Sie', 'legt', 'das', 'Heft', 'auf', 'den', 'Tisch'],
    english: 'She puts the notebook on the table.',
    grammarNote: '"Auf den" = onto (movement/direction, accusative). "Wohin?" → Akkusativ.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_041',
    words: ['Das', 'Kind', 'sitzt', 'in', 'dem', 'Zimmer'],
    english: 'The child is sitting in the room.',
    grammarNote: '"In dem" (= im) = in (location, dative). "Wo sitzt das Kind?" → Dativ.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_042',
    words: ['Er', 'hängt', 'das', 'Bild', 'an', 'die', 'Wand'],
    english: 'He hangs the picture on the wall.',
    grammarNote: '"An die Wand" = onto the wall (movement, accusative). "Wohin?" → Akkusativ.',
    difficulty: 'complex',
  },

  // ── MODAL VERBS IN PAST (PRÄTERITUM) ─────────────────────────────────────────

  {
    id: 'a2_sb_043',
    words: ['Er', 'musste', 'früh', 'aufstehen'],
    english: 'He had to get up early.',
    grammarNote: 'Modal verbs use Präteritum in speech: müssen → musste. Infinitive still goes to end.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_044',
    words: ['Wir', 'konnten', 'nicht', 'kommen'],
    english: 'We couldn\'t come.',
    grammarNote: '"Können" → konnte/konnten (Präteritum). "Nicht" before the infinitive = couldn\'t.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_045',
    words: ['Sie', 'wollte', 'ein', 'neues', 'Kleid', 'kaufen'],
    english: 'She wanted to buy a new dress.',
    grammarNote: '"Wollen" → wollte (Präteritum). Adjective: ein neu-ES Kleid (neuter, indefinite article).',
    difficulty: 'complex',
  },

  // ── REFLEXIVE VERBS ───────────────────────────────────────────────────────────

  {
    id: 'a2_sb_046',
    words: ['Ich', 'freue', 'mich', 'auf', 'den', 'Urlaub'],
    english: 'I am looking forward to the holiday.',
    grammarNote: '"Sich freuen auf" = to look forward to. "Mich" is the accusative reflexive pronoun for ich.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_047',
    words: ['Er', 'wäscht', 'sich', 'die', 'Hände'],
    english: 'He washes his hands.',
    grammarNote: '"Sich waschen" with a body part uses dative reflexive: "er wäscht sich (dativ) die Hände".',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_048',
    words: ['Wir', 'haben', 'uns', 'gut', 'amüsiert'],
    english: 'We had a good time.',
    grammarNote: '"Sich amüsieren" = to enjoy oneself. Perfekt: haben + uns + amüsiert.',
    difficulty: 'complex',
  },

  // ── FUTURE WITH WERDEN ────────────────────────────────────────────────────────

  {
    id: 'a2_sb_049',
    words: ['Ich', 'werde', 'morgen', 'früh', 'aufstehen'],
    english: 'I will get up early tomorrow.',
    grammarNote: 'Future: werden + infinitive at the end. "Ich werde... aufstehen" — note the infinitive is last.',
    difficulty: 'medium',
  },
  {
    id: 'a2_sb_050',
    words: ['Es', 'wird', 'heute', 'regnen'],
    english: 'It will rain today.',
    grammarNote: '"Werden" + infinitive = future tense. "Regnen" stays as infinitive at the end.',
    difficulty: 'simple',
  },
];

// ─── B1 sentences ─────────────────────────────────────────────────────────────
// 50 sentences: 10 simple / 20 medium / 20 complex

const B1_SENTENCES: SentenceEntry[] = [
  { id: 'b1_sb_001', words: ['Ich', 'würde', 'gern', 'mehr', 'reisen'], english: 'I would like to travel more.', grammarNote: 'Konjunktiv II with würde expresses a polite wish.', difficulty: 'simple' },
  { id: 'b1_sb_002', words: ['Wenn', 'ich', 'frei', 'wäre', 'bliebe', 'ich', 'zu', 'Hause'], english: 'If I were free, I would stay at home.', grammarNote: 'Conditional sentence with wäre and verb in position two in main clause.', difficulty: 'simple' },
  { id: 'b1_sb_003', words: ['Der', 'Brief', 'wurde', 'gestern', 'geschrieben'], english: 'The letter was written yesterday.', grammarNote: 'Passive in Präteritum: wurde + Partizip II.', difficulty: 'simple' },
  { id: 'b1_sb_004', words: ['Das', 'Fenster', 'wird', 'jetzt', 'geöffnet'], english: 'The window is being opened now.', grammarNote: 'Passive in Präsens: wird + Partizip II.', difficulty: 'simple' },
  { id: 'b1_sb_005', words: ['Der', 'Mann', 'der', 'dort', 'steht', 'ist', 'mein', 'Nachbar'], english: 'The man who is standing there is my neighbor.', grammarNote: 'Relative clause in nominative: der Mann, der ...', difficulty: 'simple' },
  { id: 'b1_sb_006', words: ['Ich', 'kenne', 'die', 'Frau', 'die', 'im', 'Café', 'arbeitet'], english: 'I know the woman who works in the cafe.', grammarNote: 'Relative clause in nominative feminine: die Frau, die ...', difficulty: 'simple' },
  { id: 'b1_sb_007', words: ['Sowohl', 'mein', 'Bruder', 'als', 'auch', 'ich', 'kochen', 'gern'], english: 'Both my brother and I like cooking.', grammarNote: 'Two-part conjunction: sowohl ... als auch.', difficulty: 'simple' },
  { id: 'b1_sb_008', words: ['Weder', 'der', 'Bus', 'noch', 'die', 'Bahn', 'fährt', 'heute'], english: 'Neither the bus nor the train is running today.', grammarNote: 'Two-part conjunction: weder ... noch with singular verb here.', difficulty: 'simple' },
  { id: 'b1_sb_009', words: ['Bevor', 'ich', 'schlafe', 'lese', 'ich', 'noch', 'ein', 'Buch'], english: 'Before I sleep, I read another book.', grammarNote: 'Temporal subordinate clause with bevor and verb-final order.', difficulty: 'simple' },
  { id: 'b1_sb_010', words: ['Nachdem', 'der', 'Film', 'begonnen', 'hatte', 'wurde', 'es', 'ruhig'], english: 'After the film had started, it became quiet.', grammarNote: 'Nachdem-clause can use Plusquamperfekt for earlier action.', difficulty: 'simple' },

  { id: 'b1_sb_011', words: ['Die', 'E-Mail', 'die', 'ich', 'gestern', 'geschickt', 'habe', 'war', 'wichtig'], english: 'The email that I sent yesterday was important.', grammarNote: 'Relative clause in accusative: die E-Mail, die ich ...', difficulty: 'medium' },
  { id: 'b1_sb_012', words: ['Der', 'Kollege', 'dem', 'ich', 'helfe', 'arbeitet', 'im', 'Vertrieb'], english: 'The colleague whom I help works in sales.', grammarNote: 'Relative clause in dative: der Kollege, dem ich helfe.', difficulty: 'medium' },
  { id: 'b1_sb_013', words: ['Ich', 'bleibe', 'zu', 'Hause', 'weil', 'ich', 'Fieber', 'habe'], english: 'I stay at home because I have a fever.', grammarNote: 'weil introduces a subordinate clause with verb at the end.', difficulty: 'medium' },
  { id: 'b1_sb_014', words: ['Als', 'ich', 'klein', 'war', 'spielte', 'ich', 'jeden', 'Tag', 'draußen'], english: 'When I was little, I played outside every day.', grammarNote: 'als is used for one-time past situations.', difficulty: 'medium' },
  { id: 'b1_sb_015', words: ['Wenn', 'es', 'regnet', 'nehmen', 'wir', 'immer', 'einen', 'Schirm', 'mit'], english: 'When it rains, we always take an umbrella.', grammarNote: 'wenn is used for repeated present/future conditions.', difficulty: 'medium' },
  { id: 'b1_sb_016', words: ['Während', 'ich', 'koche', 'deckt', 'mein', 'Partner', 'den', 'Tisch'], english: 'While I cook, my partner sets the table.', grammarNote: 'während links simultaneous actions.', difficulty: 'medium' },
  { id: 'b1_sb_017', words: ['Seitdem', 'sie', 'umgezogen', 'ist', 'fährt', 'sie', 'mit', 'dem', 'Rad'], english: 'Since she moved, she goes by bike.', grammarNote: 'seitdem introduces a starting point that continues to now.', difficulty: 'medium' },
  { id: 'b1_sb_018', words: ['Wir', 'arbeiten', 'um', 'das', 'Projekt', 'pünktlich', 'abzugeben'], english: 'We are working in order to submit the project on time.', grammarNote: 'um ... zu expresses purpose with an infinitive.', difficulty: 'medium' },
  { id: 'b1_sb_019', words: ['Er', 'ging', 'aus', 'dem', 'Haus', 'ohne', 'sich', 'zu', 'verabschieden'], english: 'He left the house without saying goodbye.', grammarNote: 'ohne ... zu introduces a negative infinitive clause.', difficulty: 'medium' },
  { id: 'b1_sb_020', words: ['Statt', 'Fernsehen', 'zu', 'schauen', 'gehe', 'ich', 'spazieren'], english: 'Instead of watching TV, I go for a walk.', grammarNote: 'statt ... zu contrasts an alternative action.', difficulty: 'medium' },
  { id: 'b1_sb_021', words: ['Wegen', 'des', 'schlechten', 'Wetters', 'blieb', 'das', 'Konzert', 'leer'], english: 'Because of the bad weather, the concert remained empty.', grammarNote: 'wegen commonly takes genitive in formal usage.', difficulty: 'medium' },
  { id: 'b1_sb_022', words: ['Während', 'des', 'Unterrichts', 'dürfen', 'Handys', 'nicht', 'benutzt', 'werden'], english: 'During class, phones may not be used.', grammarNote: 'Passive with modal verb: dürfen ... benutzt werden.', difficulty: 'medium' },
  { id: 'b1_sb_023', words: ['Der', 'Bericht', 'wird', 'morgen', 'im', 'Team', 'besprochen'], english: 'The report will be discussed in the team tomorrow.', grammarNote: 'Present passive can also refer to arranged future events.', difficulty: 'medium' },
  { id: 'b1_sb_024', words: ['Die', 'Frage', 'wurde', 'vom', 'Lehrer', 'klar', 'erklärt'], english: 'The question was clearly explained by the teacher.', grammarNote: 'Passive in past with agent phrase: von + dative.', difficulty: 'medium' },
  { id: 'b1_sb_025', words: ['Er', 'spricht', 'oft', 'über', 'Politik'], english: 'He often talks about politics.', grammarNote: 'Fixed verb-preposition pair: sprechen über + accusative.', difficulty: 'medium' },
  { id: 'b1_sb_026', words: ['Ich', 'warte', 'seit', 'einer', 'Stunde', 'auf', 'den', 'Arzt'], english: 'I have been waiting for the doctor for an hour.', grammarNote: 'warten auf + accusative is a fixed verb-preposition combination.', difficulty: 'medium' },
  { id: 'b1_sb_027', words: ['Sie', 'interessiert', 'sich', 'sehr', 'für', 'moderne', 'Kunst'], english: 'She is very interested in modern art.', grammarNote: 'sich interessieren für + accusative.', difficulty: 'medium' },
  { id: 'b1_sb_028', words: ['Wir', 'denken', 'oft', 'an', 'unsere', 'Reise'], english: 'We often think about our trip.', grammarNote: 'denken an + accusative.', difficulty: 'medium' },
  { id: 'b1_sb_029', words: ['Nach', 'dem', 'Essen', 'gehen', 'wir', 'eine', 'Runde', 'spazieren'], english: 'After the meal, we go for a walk.', grammarNote: 'nach + dative marks time sequence.', difficulty: 'medium' },
  { id: 'b1_sb_030', words: ['Der', 'Chef', 'mit', 'dessen', 'Entscheidung', 'ich', 'rechne', 'kommt', 'später'], english: 'The boss whose decision I expect is coming later.', grammarNote: 'Relative connection with genitive possessive form dessen.', difficulty: 'medium' },

  { id: 'b1_sb_031', words: ['Wenn', 'ich', 'mehr', 'Zeit', 'hätte', 'würde', 'ich', 'ein', 'Instrument', 'lernen'], english: 'If I had more time, I would learn an instrument.', grammarNote: 'Hypothetical condition: hätte + würde + infinitive.', difficulty: 'complex' },
  { id: 'b1_sb_032', words: ['An', 'deiner', 'Stelle', 'würde', 'ich', 'früher', 'losfahren'], english: 'In your place, I would leave earlier.', grammarNote: 'Advice at B1 is often expressed with würde + infinitive.', difficulty: 'complex' },
  { id: 'b1_sb_033', words: ['Wäre', 'das', 'Ticket', 'günstiger', 'würden', 'wir', 'sofort', 'buchen'], english: 'If the ticket were cheaper, we would book immediately.', grammarNote: 'Inverted conditional clause without wenn is common in formal style.', difficulty: 'complex' },
  { id: 'b1_sb_034', words: ['Hätte', 'ich', 'deine', 'Nummer', 'gehabt', 'hätte', 'ich', 'dich', 'angerufen'], english: 'If I had had your number, I would have called you.', grammarNote: 'Past unreal condition with hätte ... hätte + Partizip II.', difficulty: 'complex' },
  { id: 'b1_sb_035', words: ['Das', 'Paket', 'wird', 'morgen', 'an', 'die', 'Filiale', 'geliefert', 'werden'], english: 'The package will be delivered to the branch tomorrow.', grammarNote: 'Future passive: wird ... geliefert werden.', difficulty: 'complex' },
  { id: 'b1_sb_036', words: ['Die', 'Straße', 'wurde', 'letztes', 'Jahr', 'komplett', 'renoviert'], english: 'The street was completely renovated last year.', grammarNote: 'Präteritum passive with time expression in the middle field.', difficulty: 'complex' },
  { id: 'b1_sb_037', words: ['Nachdem', 'die', 'Anmeldung', 'bestätigt', 'worden', 'war', 'konnten', 'wir', 'starten'], english: 'After the registration had been confirmed, we could start.', grammarNote: 'Plusquamperfekt passive in subordinate clause: worden war.', difficulty: 'complex' },
  { id: 'b1_sb_038', words: ['Der', 'Student', 'dessen', 'Arbeit', 'prämiert', 'wurde', 'hält', 'heute', 'einen', 'Vortrag'], english: 'The student whose work was awarded is giving a presentation today.', grammarNote: 'Genitive relative pronoun dessen plus passive relative clause.', difficulty: 'complex' },
  { id: 'b1_sb_039', words: ['Die', 'Nachbarin', 'der', 'wir', 'oft', 'helfen', 'zieht', 'bald', 'um'], english: 'The neighbor whom we often help is moving soon.', grammarNote: 'Relative clause in dative feminine: die Nachbarin, der wir helfen.', difficulty: 'complex' },
  { id: 'b1_sb_040', words: ['Der', 'Vertrag', 'über', 'dessen', 'Details', 'wir', 'gesprochen', 'haben', 'ist', 'unterschrieben'], english: 'The contract whose details we discussed is signed.', grammarNote: 'Genitive relative pronoun links noun to possessed details.', difficulty: 'complex' },
  { id: 'b1_sb_041', words: ['Sowohl', 'die', 'Bewerbung', 'als', 'auch', 'das', 'Zeugnis', 'müssen', 'heute', 'eingereicht', 'werden'], english: 'Both the application and the certificate must be submitted today.', grammarNote: 'Two-part conjunction with passive modal construction.', difficulty: 'complex' },
  { id: 'b1_sb_042', words: ['Weder', 'die', 'Kundin', 'noch', 'der', 'Lieferant', 'konnte', 'den', 'Fehler', 'erklären'], english: 'Neither the customer nor the supplier could explain the mistake.', grammarNote: 'weder ... noch joins two subjects with one predicate.', difficulty: 'complex' },
  { id: 'b1_sb_043', words: ['Obwohl', 'er', 'müde', 'war', 'arbeitete', 'er', 'weiter', 'um', 'den', 'Bericht', 'fertigzustellen'], english: 'Although he was tired, he kept working to finish the report.', grammarNote: 'Concession with obwohl plus purpose clause with um ... zu.', difficulty: 'complex' },
  { id: 'b1_sb_044', words: ['Bevor', 'wir', 'eine', 'Entscheidung', 'treffen', 'sollten', 'alle', 'Daten', 'geprüft', 'werden'], english: 'Before we make a decision, all data should be checked.', grammarNote: 'Temporal clause plus passive modal in main clause.', difficulty: 'complex' },
  { id: 'b1_sb_045', words: ['Nachdem', 'das', 'Meeting', 'beendet', 'worden', 'war', 'wurden', 'die', 'Ergebnisse', 'verschickt'], english: 'After the meeting had been ended, the results were sent out.', grammarNote: 'Sequence in the past: plusquamperfekt passive then präteritum passive.', difficulty: 'complex' },
  { id: 'b1_sb_046', words: ['Während', 'des', 'Gesprächs', 'auf', 'das', 'ich', 'lange', 'gewartet', 'hatte', 'blieb', 'ich', 'ruhig'], english: 'During the conversation that I had waited for a long time, I stayed calm.', grammarNote: 'Relative clause with preposition: auf das ... warten.', difficulty: 'complex' },
  { id: 'b1_sb_047', words: ['Wegen', 'des', 'Ausfalls', 'des', 'Servers', 'konnten', 'die', 'Dateien', 'nicht', 'hochgeladen', 'werden'], english: 'Because of the server outage, the files could not be uploaded.', grammarNote: 'Stacked genitive phrase plus passive with modal verb.', difficulty: 'complex' },
  { id: 'b1_sb_048', words: ['Anstatt', 'sich', 'zu', 'beschweren', 'versuchte', 'sie', 'das', 'Problem', 'selbst', 'zu', 'lösen'], english: 'Instead of complaining, she tried to solve the problem herself.', grammarNote: 'anstatt + zu-infinitive and main verb with second infinitive.', difficulty: 'complex' },
  { id: 'b1_sb_049', words: ['Ohne', 'die', 'Unterlagen', 'noch', 'einmal', 'zu', 'lesen', 'hätte', 'ich', 'nicht', 'unterschrieben'], english: 'Without reading the documents once more, I would not have signed.', grammarNote: 'ohne ... zu with hypothetical past in main clause.', difficulty: 'complex' },
  { id: 'b1_sb_050', words: ['Seitdem', 'die', 'Regeln', 'geändert', 'worden', 'sind', 'muss', 'jeder', 'Teilnehmer', 'sich', 'neu', 'anmelden'], english: 'Since the rules have been changed, every participant has to register again.', grammarNote: 'seitdem-clause with passive perfect plus modal in main clause.', difficulty: 'complex' },
];

// ─── B2 sentences ─────────────────────────────────────────────────────────────
// 50 sentences: 10 simple / 20 medium / 20 complex

const B2_SENTENCES: SentenceEntry[] = [
  { id: 'b2_sb_001', words: ['Der', 'Bericht', 'sei', 'bereits', 'abgeschlossen'], english: 'The report is said to already be finished.', grammarNote: 'Konjunktiv I (sei) is used in indirect speech.', difficulty: 'simple' },
  { id: 'b2_sb_002', words: ['Alles', 'was', 'er', 'sagt', 'klingt', 'plausibel'], english: 'Everything he says sounds plausible.', grammarNote: 'After alles, use was in the relative clause.', difficulty: 'simple' },
  { id: 'b2_sb_003', words: ['Der', 'Kollege', 'hilft', 'dem', 'Kunden'], english: 'The colleague helps the customer.', grammarNote: 'N-declension noun in dative: dem Kunden.', difficulty: 'simple' },
  { id: 'b2_sb_004', words: ['Das', 'muss', 'heute', 'erledigt', 'werden'], english: 'That must be done today.', grammarNote: 'Passive with modal verb: muss + Partizip II + werden.', difficulty: 'simple' },
  { id: 'b2_sb_005', words: ['Wegen', 'des', 'Wetters', 'bleiben', 'wir', 'drinnen'], english: 'Because of the weather, we stay inside.', grammarNote: 'wegen takes genitive in formal standard German.', difficulty: 'simple' },
  { id: 'b2_sb_006', words: ['Ich', 'weiß', 'nicht', 'ob', 'sie', 'kommt'], english: 'I do not know whether she is coming.', grammarNote: 'Indirect yes/no question with ob and verb-final order.', difficulty: 'simple' },
  { id: 'b2_sb_007', words: ['Der', 'Ort', 'wo', 'wir', 'wohnen', 'ist', 'ruhig'], english: 'The place where we live is quiet.', grammarNote: 'wo introduces a place-related relative clause.', difficulty: 'simple' },
  { id: 'b2_sb_008', words: ['Das', 'Lernen', 'fällt', 'mir', 'heute', 'leicht'], english: 'Learning feels easy for me today.', grammarNote: 'Nominalized infinitive takes das and is capitalized.', difficulty: 'simple' },
  { id: 'b2_sb_009', words: ['Obwohl', 'es', 'regnet', 'gehen', 'wir', 'raus'], english: 'Although it is raining, we go outside.', grammarNote: 'obwohl introduces a subordinate clause with verb at the end.', difficulty: 'simple' },
  { id: 'b2_sb_010', words: ['Die', 'Aussage', 'sei', 'falsch', 'gewesen'], english: 'The statement is said to have been false.', grammarNote: 'Reported speech can combine Konjunktiv I with perfect meaning.', difficulty: 'simple' },

  { id: 'b2_sb_011', words: ['Die', 'von', 'Experten', 'entwickelte', 'Strategie', 'wird', 'umgesetzt'], english: 'The strategy developed by experts is being implemented.', grammarNote: 'Expanded participial attribute replaces a relative clause.', difficulty: 'medium' },
  { id: 'b2_sb_012', words: ['Der', 'Kunde', 'dessen', 'Vertrag', 'ausläuft', 'meldete', 'sich'], english: 'The customer whose contract is expiring got in touch.', grammarNote: 'Genitive relative relation marks possession.', difficulty: 'medium' },
  { id: 'b2_sb_013', words: ['Trotzdem', 'blieb', 'die', 'Stimmung', 'im', 'Team', 'stabil'], english: 'Nevertheless, the mood in the team remained stable.', grammarNote: 'trotzdem is a main-clause connector; verb stays in position 2.', difficulty: 'medium' },
  { id: 'b2_sb_014', words: ['Der', 'Minister', 'sagte', 'man', 'müsse', 'sofort', 'handeln'], english: 'The minister said action had to be taken immediately.', grammarNote: 'Reported speech with modal verb in Konjunktiv I: müsse.', difficulty: 'medium' },
  { id: 'b2_sb_015', words: ['Die', 'Daten', 'können', 'nicht', 'mehr', 'verändert', 'werden'], english: 'The data can no longer be changed.', grammarNote: 'Passive with modal and negation follows fixed order.', difficulty: 'medium' },
  { id: 'b2_sb_016', words: ['Wir', 'fragten', 'uns', 'warum', 'die', 'Frist', 'verkürzt', 'wurde'], english: 'We wondered why the deadline was shortened.', grammarNote: 'Embedded question plus passive in a subordinate clause.', difficulty: 'medium' },
  { id: 'b2_sb_017', words: ['Innerhalb', 'eines', 'Monats', 'soll', 'der', 'Bericht', 'vorliegen'], english: 'The report should be available within one month.', grammarNote: 'innerhalb governs genitive phrase: eines Monats.', difficulty: 'medium' },
  { id: 'b2_sb_018', words: ['Der', 'Präsident', 'dem', 'wir', 'folgten', 'trat', 'zurück'], english: 'The president we followed stepped down.', grammarNote: 'Relative clause with dative pronoun dem.', difficulty: 'medium' },
  { id: 'b2_sb_019', words: ['Anstatt', 'einer', 'E-Mail', 'schrieb', 'sie', 'einen', 'Brief'], english: 'Instead of an email, she wrote a letter.', grammarNote: 'anstatt + genitive phrase is formal and concise.', difficulty: 'medium' },
  { id: 'b2_sb_020', words: ['Die', 'ständig', 'unterbrochenen', 'Sitzungen', 'waren', 'ineffizient'], english: 'The constantly interrupted meetings were inefficient.', grammarNote: 'Partizip II adjective with plural ending -en.', difficulty: 'medium' },
  { id: 'b2_sb_021', words: ['Er', 'erklärte', 'wie', 'der', 'Antrag', 'ausgefüllt', 'werden', 'müsse'], english: 'He explained how the application had to be filled out.', grammarNote: 'Indirect question with passive modal construction.', difficulty: 'medium' },
  { id: 'b2_sb_022', words: ['Die', 'Analyse', 'der', 'Daten', 'dauerte', 'länger', 'als', 'erwartet'], english: 'The analysis of the data took longer than expected.', grammarNote: 'Nominal style is common in formal reporting.', difficulty: 'medium' },
  { id: 'b2_sb_023', words: ['Der', 'Herr', 'bat', 'den', 'Studenten', 'um', 'Geduld'], english: 'The gentleman asked the student for patience.', grammarNote: 'N-declension: den Studenten in accusative.', difficulty: 'medium' },
  { id: 'b2_sb_024', words: ['Alles', 'was', 'gestern', 'beschlossen', 'wurde', 'gilt', 'ab', 'sofort'], english: 'Everything decided yesterday applies immediately.', grammarNote: 'was-clause plus passive perfective meaning.', difficulty: 'medium' },
  { id: 'b2_sb_025', words: ['Sie', 'meinte', 'die', 'Lage', 'werde', 'sich', 'bald', 'beruhigen'], english: 'She said the situation would calm down soon.', grammarNote: 'Reported future with Konjunktiv I werde.', difficulty: 'medium' },
  { id: 'b2_sb_026', words: ['Ob', 'der', 'Plan', 'funktioniert', 'bleibt', 'noch', 'offen'], english: 'Whether the plan works remains open.', grammarNote: 'Initial ob-clause forms a dependent question.', difficulty: 'medium' },
  { id: 'b2_sb_027', words: ['Die', 'Müdigkeit', 'nach', 'dem', 'langen', 'Tag', 'war', 'spürbar'], english: 'The tiredness after the long day was noticeable.', grammarNote: 'Abstract noun Müdigkeit is a nominalization.', difficulty: 'medium' },
  { id: 'b2_sb_028', words: ['Der', 'Kunde', 'dessen', 'Daten', 'fehlten', 'rief', 'erneut', 'an'], english: 'The customer whose data were missing called again.', grammarNote: 'dessen links masculine antecedent to possessed noun.', difficulty: 'medium' },
  { id: 'b2_sb_029', words: ['Während', 'der', 'Sitzung', 'wurden', 'mehrere', 'Vorschläge', 'notiert'], english: 'Several proposals were noted during the meeting.', grammarNote: 'während + genitive phrase in formal register.', difficulty: 'medium' },
  { id: 'b2_sb_030', words: ['Die', 'eigentlich', 'einfache', 'Frage', 'blieb', 'unbeantwortet'], english: 'The actually simple question remained unanswered.', grammarNote: 'eigentlich as an adverb modifies an adjective, meaning "actually" or "in reality".', difficulty: 'medium' },

  { id: 'b2_sb_031', words: ['Die', 'im', 'Ausschuss', 'mehrfach', 'überarbeitete', 'Vorlage', 'konnte', 'endlich', 'verabschiedet', 'werden'], english: 'The draft revised several times in committee could finally be adopted.', grammarNote: 'Complex participial attribute plus passive with modal in one sentence.', difficulty: 'complex' },
  { id: 'b2_sb_032', words: ['Der', 'Sprecher', 'betonte', 'man', 'habe', 'alle', 'relevanten', 'Daten', 'bereits', 'übermittelt'], english: 'The speaker emphasized that all relevant data had already been transmitted.', grammarNote: 'Konjunktiv I perfect with habe in indirect speech.', difficulty: 'complex' },
  { id: 'b2_sb_033', words: ['Obwohl', 'die', 'Kosten', 'gestiegen', 'sind', 'wurde', 'das', 'Projekt', 'nicht', 'gestoppt'], english: 'Although costs have risen, the project was not stopped.', grammarNote: 'Concessive subordinate clause + passive main clause.', difficulty: 'complex' },
  { id: 'b2_sb_034', words: ['Die', 'Frage', 'ob', 'die', 'Maßnahme', 'langfristig', 'wirkt', 'konnte', 'nicht', 'abschließend', 'beantwortet', 'werden'], english: 'The question whether the measure works in the long term could not be conclusively answered.', grammarNote: 'Embedded ob-clause as noun phrase + passive modal.', difficulty: 'complex' },
  { id: 'b2_sb_035', words: ['Anstatt', 'kurzfristiger', 'Sparmaßnahmen', 'forderte', 'die', 'Kommission', 'eine', 'strukturelle', 'Neuordnung'], english: 'Instead of short-term savings measures, the commission demanded structural reorganization.', grammarNote: 'Formal genitive prepositional phrase with anstatt.', difficulty: 'complex' },
  { id: 'b2_sb_036', words: ['Der', 'Kollege', 'dem', 'wir', 'die', 'Leitung', 'übertragen', 'hatten', 'kündigte', 'überraschend'], english: 'The colleague to whom we had assigned leadership resigned unexpectedly.', grammarNote: 'Relative clause with dative pronoun and plusquamperfekt.', difficulty: 'complex' },
  { id: 'b2_sb_037', words: ['Trotz', 'der', 'heftig', 'geführten', 'Debatte', 'wurde', 'ein', 'gemeinsamer', 'Beschluss', 'erzielt'], english: 'Despite the heated debate, a joint decision was achieved.', grammarNote: 'Participle adjective + passive result statement.', difficulty: 'complex' },
  { id: 'b2_sb_038', words: ['Die', 'seit', 'Jahren', 'gesammelten', 'Messwerte', 'lassen', 'kaum', 'noch', 'Zweifel', 'zu'], english: 'The measurement values collected for years leave hardly any doubt.', grammarNote: 'Expanded participial phrase with temporal complement.', difficulty: 'complex' },
  { id: 'b2_sb_039', words: ['Die', 'Journalistin', 'fragte', 'warum', 'die', 'Warnungen', 'so', 'lange', 'ignoriert', 'worden', 'seien'], english: 'The journalist asked why the warnings had been ignored for so long.', grammarNote: 'Indirect question with passive perfect and Konjunktiv I plural seien.', difficulty: 'complex' },
  { id: 'b2_sb_040', words: ['Was', 'zunächst', 'wie', 'ein', 'Einzelfall', 'wirkte', 'erwies', 'sich', 'als', 'systemisches', 'Problem'], english: 'What initially seemed like an isolated case turned out to be a systemic problem.', grammarNote: 'Initial was-clause as subject-like element in formal argumentation.', difficulty: 'complex' },
  { id: 'b2_sb_041', words: ['Die', 'Behörde', 'erklärte', 'die', 'neuen', 'Regeln', 'würden', 'erst', 'nach', 'einer', 'Testphase', 'gelten'], english: 'The authority stated that the new rules would only apply after a test phase.', grammarNote: 'Reported future often appears with würden in practice.', difficulty: 'complex' },
  { id: 'b2_sb_042', words: ['Innerhalb', 'dessen', 'was', 'rechtlich', 'zulässig', 'ist', 'müssen', 'alle', 'Optionen', 'geprüft', 'werden'], english: 'Within what is legally permissible, all options must be examined.', grammarNote: 'Nested was-clause plus passive modal at clause end.', difficulty: 'complex' },
  { id: 'b2_sb_043', words: ['Die', 'Effizienz', 'des', 'Verfahrens', 'hängt', 'davon', 'ab', 'ob', 'die', 'Daten', 'vollständig', 'erfasst', 'wurden'], english: 'The efficiency of the procedure depends on whether the data were recorded completely.', grammarNote: 'Fixed expression hängt davon ab, ob ... with passive clause.', difficulty: 'complex' },
  { id: 'b2_sb_044', words: ['Wäre', 'die', 'Dokumentation', 'früher', 'aktualisiert', 'worden', 'hätte', 'man', 'den', 'Fehler', 'vermeiden', 'können'], english: 'If the documentation had been updated earlier, the error could have been avoided.', grammarNote: 'Conditional with passive perfect in subordinate part and modal perfect in main clause.', difficulty: 'complex' },
  { id: 'b2_sb_045', words: ['Die', 'aufgrund', 'mehrerer', 'Beschwerden', 'eingeleitete', 'Prüfung', 'dauert', 'noch', 'an'], english: 'The review initiated due to multiple complaints is still ongoing.', grammarNote: 'aufgrund-phrase embedded in participial attribute.', difficulty: 'complex' },
  { id: 'b2_sb_046', words: ['Der', 'Mensch', 'dessen', 'Antrag', 'abgelehnt', 'wurde', 'legte', 'fristgerecht', 'Widerspruch', 'ein'], english: 'The person whose application was rejected filed an objection in time.', grammarNote: 'Relative possession plus passive in relative clause.', difficulty: 'complex' },
  { id: 'b2_sb_047', words: ['Ob', 'die', 'vorgeschlagene', 'Lösung', 'finanzierbar', 'sei', 'müsse', 'noch', 'geklärt', 'werden'], english: 'Whether the proposed solution is financially viable still has to be clarified.', grammarNote: 'Double Konjunktiv-I style in reported policy language.', difficulty: 'complex' },
  { id: 'b2_sb_048', words: ['Die', 'aus', 'mehreren', 'Quellen', 'stammenden', 'Informationen', 'ließen', 'sich', 'nicht', 'eindeutig', 'zuordnen'], english: 'The information coming from multiple sources could not be clearly assigned.', grammarNote: 'Partizip I attribute with complement phrase.', difficulty: 'complex' },
  { id: 'b2_sb_049', words: ['Obwohl', 'manche', 'Details', 'unklar', 'blieben', 'wurde', 'die', 'Vereinbarung', 'unterzeichnet'], english: 'Although some details remained unclear, the agreement was signed.', grammarNote: 'obwohl introduces a subordinate concessive clause with verb-final order.', difficulty: 'complex' },
  { id: 'b2_sb_050', words: ['Die', 'Schnelligkeit', 'mit', 'der', 'auf', 'die', 'Krise', 'reagiert', 'wurde', 'gilt', 'als', 'entscheidend'], english: 'The speed with which the crisis was responded to is considered crucial.', grammarNote: 'Nominalization plus prepositional relative structure and passive.', difficulty: 'complex' },
];

// ─── Export ───────────────────────────────────────────────────────────────────
// Keyed by level so the game can do SENTENCE_BUILDER_DATA[level].

export const SENTENCE_BUILDER_DATA: Record<Level, SentenceEntry[]> = {
  A1: A1_SENTENCES,
  A2: A2_SENTENCES,
  B1: B1_SENTENCES,
  B2: B2_SENTENCES,
};
