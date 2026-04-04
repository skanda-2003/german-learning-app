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

import type { Level } from '../store/useLevelStore';

export type SentenceEntry = {
  id: string;
  words: string[];
  english: string;
  grammarNote: string;
};

// ─── A1 sentences ─────────────────────────────────────────────────────────────

const A1_SENTENCES: SentenceEntry[] = [
  // ── SEIN (to be) ─────────────────────────────────────────────────────────────

  {
    id: 'sb_001',
    words: ['Ich', 'bin', 'müde'],
    english: 'I am tired.',
    grammarNote: '"Bin" is the first-person singular of "sein" (to be).',
  },
  {
    id: 'sb_002',
    words: ['Du', 'bist', 'sehr', 'freundlich'],
    english: 'You are very friendly.',
    grammarNote: '"Bist" is the second-person singular of "sein". "Sehr" = very.',
  },
  {
    id: 'sb_003',
    words: ['Er', 'ist', 'jung', 'und', 'stark'],
    english: 'He is young and strong.',
    grammarNote: '"Ist" is the third-person singular of "sein". "Und" = and.',
  },
  {
    id: 'sb_004',
    words: ['Das', 'Wetter', 'ist', 'schön'],
    english: 'The weather is beautiful.',
    grammarNote: 'Predicate adjectives after "sein" take no extra ending.',
  },
  {
    id: 'sb_005',
    words: ['Wir', 'sind', 'hier'],
    english: 'We are here.',
    grammarNote: '"Sind" is the first-person plural of "sein".',
  },
  {
    id: 'sb_006',
    words: ['Das', 'ist', 'mein', 'Bruder'],
    english: 'This is my brother.',
    grammarNote: '"Mein" = my (masculine/neuter). "Das ist" = this is.',
  },
  {
    id: 'sb_007',
    words: ['Ich', 'bin', 'zwanzig', 'Jahre', 'alt'],
    english: 'I am twenty years old.',
    grammarNote: 'Age in German: "X Jahre alt sein" (literally: to be X years old).',
  },
  {
    id: 'sb_008',
    words: ['Die', 'Äpfel', 'sind', 'frisch'],
    english: 'The apples are fresh.',
    grammarNote: 'Plural "to be" uses "sind". "Die" is also the plural definite article.',
  },
  {
    id: 'sb_009',
    words: ['Er', 'ist', 'Arzt', 'von', 'Beruf'],
    english: 'He is a doctor by profession.',
    grammarNote: 'Professions in German take no article: "Er ist Arzt", not "Er ist ein Arzt".',
  },
  {
    id: 'sb_010',
    words: ['Das', 'Haus', 'ist', 'weiß', 'und', 'groß'],
    english: 'The house is white and big.',
    grammarNote: '"Das" is the neuter definite article. Multiple adjectives are joined with "und".',
  },

  // ── HABEN (to have) ───────────────────────────────────────────────────────────

  {
    id: 'sb_011',
    words: ['Ich', 'habe', 'Hunger'],
    english: 'I am hungry.',
    grammarNote: 'Body states use "haben" in German: "Hunger haben" = to be hungry.',
  },
  {
    id: 'sb_012',
    words: ['Er', 'hat', 'eine', 'Schwester'],
    english: 'He has a sister.',
    grammarNote: '"Eine" is the feminine indefinite article. "Schwester" = sister (feminine).',
  },
  {
    id: 'sb_013',
    words: ['Wir', 'haben', 'einen', 'Hund'],
    english: 'We have a dog.',
    grammarNote: 'Accusative case: masculine "ein" becomes "einen" as a direct object.',
  },
  {
    id: 'sb_014',
    words: ['Sie', 'hat', 'keine', 'Zeit'],
    english: 'She has no time.',
    grammarNote: '"Keine" is the negation of "eine" — means "no" or "not any".',
  },
  {
    id: 'sb_015',
    words: ['Ich', 'habe', 'zwei', 'Bücher'],
    english: 'I have two books.',
    grammarNote: 'Numbers replace articles in German. "Bücher" is the plural of "Buch".',
  },
  {
    id: 'sb_016',
    words: ['Du', 'hast', 'Recht'],
    english: 'You are right.',
    grammarNote: '"Recht haben" is an idiom meaning "to be right". Literally: "to have right".',
  },
  {
    id: 'sb_017',
    words: ['Wir', 'haben', 'heute', 'frei'],
    english: 'We have a day off today.',
    grammarNote: '"Frei haben" = to have time off. "Heute" = today.',
  },
  {
    id: 'sb_018',
    words: ['Er', 'hat', 'Fieber'],
    english: 'He has a fever.',
    grammarNote: 'Body states like having a fever use "haben" in German.',
  },

  // ── REGULAR VERBS ─────────────────────────────────────────────────────────────

  {
    id: 'sb_019',
    words: ['Ich', 'lerne', 'Deutsch'],
    english: 'I am learning German.',
    grammarNote: 'Regular verb: lernen (to learn). First-person: ich lerne.',
  },
  {
    id: 'sb_020',
    words: ['Er', 'trinkt', 'Wasser'],
    english: 'He drinks water.',
    grammarNote: 'Regular verb: trinken. Third-person singular adds -t: trinkt.',
  },
  {
    id: 'sb_021',
    words: ['Wir', 'spielen', 'Fußball'],
    english: 'We play football.',
    grammarNote: 'Regular verb: spielen (to play). "Wir spielen" = we play.',
  },
  {
    id: 'sb_022',
    words: ['Sie', 'kauft', 'Äpfel'],
    english: 'She buys apples.',
    grammarNote: 'Regular verb: kaufen. Third-person "er/sie/es" adds -t: kauft.',
  },
  {
    id: 'sb_023',
    words: ['Ich', 'wohne', 'in', 'Berlin'],
    english: 'I live in Berlin.',
    grammarNote: 'City names take no article in German: "in Berlin", not "in dem Berlin".',
  },
  {
    id: 'sb_024',
    words: ['Du', 'lernst', 'schnell'],
    english: 'You learn quickly.',
    grammarNote: 'Regular verb, second person: du + -st ending. "Schnell" = quickly.',
  },
  {
    id: 'sb_025',
    words: ['Er', 'arbeitet', 'im', 'Büro'],
    english: 'He works in the office.',
    grammarNote: '"Im" = in + dem (dative contraction). Used for location.',
  },
  {
    id: 'sb_026',
    words: ['Wir', 'kochen', 'zusammen'],
    english: 'We cook together.',
    grammarNote: 'Regular verb: kochen (to cook). "Zusammen" = together.',
  },
  {
    id: 'sb_027',
    words: ['Sie', 'tanzt', 'sehr', 'gut'],
    english: 'She dances very well.',
    grammarNote: 'Regular verb: tanzen. The stem ends in -z, so third-person is "tanzt".',
  },
  {
    id: 'sb_028',
    words: ['Ich', 'höre', 'Musik'],
    english: 'I listen to music.',
    grammarNote: '"Hören" = to hear / to listen to. No preposition needed with Musik.',
  },

  // ── IRREGULAR / STRONG VERBS ──────────────────────────────────────────────────

  {
    id: 'sb_029',
    words: ['Sie', 'isst', 'Brot'],
    english: 'She eats bread.',
    grammarNote: 'Irregular: essen → isst (3rd person singular). The vowel changes.',
  },
  {
    id: 'sb_030',
    words: ['Er', 'liest', 'die', 'Zeitung'],
    english: 'He reads the newspaper.',
    grammarNote: 'Irregular: lesen → liest. "Zeitung" = newspaper (feminine, "die").',
  },
  {
    id: 'sb_031',
    words: ['Ich', 'fahre', 'mit', 'dem', 'Bus'],
    english: 'I travel by bus.',
    grammarNote: '"Mit" + dative = by (transport). "Mit dem Bus" = by bus.',
  },
  {
    id: 'sb_032',
    words: ['Sie', 'schläft', 'bis', 'neun'],
    english: 'She sleeps until nine.',
    grammarNote: 'Irregular: schlafen → schläft. "Bis" = until.',
  },
  {
    id: 'sb_033',
    words: ['Er', 'trägt', 'eine', 'Jacke'],
    english: 'He is wearing a jacket.',
    grammarNote: 'Irregular: tragen → trägt. "Tragen" means both "to wear" and "to carry".',
  },
  {
    id: 'sb_034',
    words: ['Das', 'Kind', 'läuft', 'schnell'],
    english: 'The child runs fast.',
    grammarNote: 'Irregular: laufen → läuft. "Das Kind" = the child (neuter).',
  },
  {
    id: 'sb_035',
    words: ['Er', 'gibt', 'mir', 'das', 'Buch'],
    english: 'He gives me the book.',
    grammarNote: 'Irregular: geben → gibt. "Mir" = to me (dative of "ich").',
  },

  // ── SEPARABLE VERBS ───────────────────────────────────────────────────────────

  {
    id: 'sb_036',
    words: ['Ich', 'stehe', 'um', 'sieben', 'auf'],
    english: 'I get up at seven.',
    grammarNote: 'Separable verb: aufstehen (to get up). The prefix "auf" moves to the end.',
  },
  {
    id: 'sb_037',
    words: ['Er', 'ruft', 'seine', 'Mutter', 'an'],
    english: 'He calls his mother.',
    grammarNote: 'Separable verb: anrufen (to call). The prefix "an" moves to the end.',
  },
  {
    id: 'sb_038',
    words: ['Wir', 'sehen', 'abends', 'fern'],
    english: 'We watch TV in the evenings.',
    grammarNote: 'Separable verb: fernsehen. "Abends" = in the evenings.',
  },
  {
    id: 'sb_039',
    words: ['Sie', 'macht', 'die', 'Tür', 'zu'],
    english: 'She closes the door.',
    grammarNote: 'Separable verb: zumachen (to close). Prefix "zu" goes to the end.',
  },
  {
    id: 'sb_040',
    words: ['Ich', 'fange', 'jetzt', 'an'],
    english: 'I start now.',
    grammarNote: 'Separable verb: anfangen (to start). "Jetzt" = now.',
  },
  {
    id: 'sb_041',
    words: ['Er', 'kommt', 'um', 'drei', 'an'],
    english: 'He arrives at three.',
    grammarNote: 'Separable verb: ankommen (to arrive). Prefix "an" goes to the end.',
  },
  {
    id: 'sb_042',
    words: ['Wir', 'räumen', 'das', 'Zimmer', 'auf'],
    english: 'We tidy up the room.',
    grammarNote: 'Separable verb: aufräumen (to tidy up). Prefix "auf" moves to the end.',
  },

  // ── ARTICLES AND GENDER ───────────────────────────────────────────────────────

  {
    id: 'sb_043',
    words: ['Der', 'Hund', 'ist', 'groß'],
    english: 'The dog is big.',
    grammarNote: '"Der" = masculine definite article. "Hund" (dog) is masculine.',
  },
  {
    id: 'sb_044',
    words: ['Die', 'Katze', 'ist', 'klein'],
    english: 'The cat is small.',
    grammarNote: '"Die" = feminine definite article. "Katze" (cat) is feminine.',
  },
  {
    id: 'sb_045',
    words: ['Das', 'Buch', 'ist', 'rot'],
    english: 'The book is red.',
    grammarNote: '"Das" = neuter definite article. "Buch" (book) is neuter.',
  },
  {
    id: 'sb_046',
    words: ['Ein', 'Mann', 'steht', 'dort'],
    english: 'A man stands there.',
    grammarNote: '"Ein" = masculine indefinite article. "Dort" = there.',
  },
  {
    id: 'sb_047',
    words: ['Eine', 'Frau', 'geht', 'vorbei'],
    english: 'A woman walks by.',
    grammarNote: '"Eine" = feminine indefinite article. "Vorbeigehen" = to walk by (separable).',
  },

  // ── PREPOSITIONS ──────────────────────────────────────────────────────────────

  {
    id: 'sb_048',
    words: ['Das', 'Buch', 'liegt', 'auf', 'dem', 'Tisch'],
    english: 'The book is on the table.',
    grammarNote: '"Auf" + dative = on (location). "Dem" is the dative form of "der/das".',
  },
  {
    id: 'sb_049',
    words: ['Die', 'Katze', 'sitzt', 'vor', 'dem', 'Haus'],
    english: 'The cat sits in front of the house.',
    grammarNote: '"Vor" + dative = in front of. "Dem Haus" = the house (dative).',
  },
  {
    id: 'sb_050',
    words: ['Er', 'wohnt', 'neben', 'der', 'Schule'],
    english: 'He lives next to the school.',
    grammarNote: '"Neben" + dative = next to. "Der Schule" = the school (dative feminine).',
  },
  {
    id: 'sb_051',
    words: ['Ich', 'gehe', 'in', 'die', 'Stadt'],
    english: 'I go into the city.',
    grammarNote: '"In" + accusative = movement into. "Die Stadt" = the city (accusative).',
  },
  {
    id: 'sb_052',
    words: ['Sie', 'kommt', 'aus', 'der', 'Schweiz'],
    english: 'She comes from Switzerland.',
    grammarNote: '"Aus" + dative = from. Switzerland is "die Schweiz", so dative is "der Schweiz".',
  },
  {
    id: 'sb_053',
    words: ['Wir', 'gehen', 'zum', 'Supermarkt'],
    english: 'We go to the supermarket.',
    grammarNote: '"Zum" = zu + dem (dative contraction). "Zu" + dative = to (a place).',
  },
  {
    id: 'sb_054',
    words: ['Er', 'fährt', 'nach', 'München'],
    english: 'He travels to Munich.',
    grammarNote: '"Nach" + city/country name = to. No article needed with most city names.',
  },
  {
    id: 'sb_055',
    words: ['Das', 'Kind', 'spielt', 'im', 'Garten'],
    english: 'The child plays in the garden.',
    grammarNote: '"Im" = in + dem (dative). Location (not movement): use dative with "in".',
  },
  {
    id: 'sb_056',
    words: ['Sie', 'steht', 'hinter', 'dem', 'Auto'],
    english: 'She stands behind the car.',
    grammarNote: '"Hinter" + dative = behind (location). "Dem Auto" = the car (dative neuter).',
  },
  {
    id: 'sb_057',
    words: ['Ich', 'warte', 'auf', 'den', 'Zug'],
    english: 'I wait for the train.',
    grammarNote: '"Warten auf" = to wait for. Takes accusative: "auf den Zug".',
  },

  // ── NEGATION ──────────────────────────────────────────────────────────────────

  {
    id: 'sb_058',
    words: ['Ich', 'verstehe', 'das', 'nicht'],
    english: 'I don\'t understand that.',
    grammarNote: '"Nicht" comes at the end when negating a verb (in main clauses without an object modifier).',
  },
  {
    id: 'sb_059',
    words: ['Das', 'ist', 'kein', 'Problem'],
    english: 'That is not a problem.',
    grammarNote: '"Kein" negates a noun. Used instead of "nicht ein". "Kein" = neuter/masc. nominative.',
  },
  {
    id: 'sb_060',
    words: ['Er', 'trinkt', 'keinen', 'Kaffee'],
    english: 'He doesn\'t drink coffee.',
    grammarNote: '"Keinen" = accusative masculine of "kein". Coffee (Kaffee) is masculine.',
  },
  {
    id: 'sb_061',
    words: ['Ich', 'habe', 'keine', 'Geschwister'],
    english: 'I have no siblings.',
    grammarNote: '"Keine" negates plural nouns. "Geschwister" = siblings (always plural).',
  },
  {
    id: 'sb_062',
    words: ['Sie', 'ist', 'nicht', 'müde'],
    english: 'She is not tired.',
    grammarNote: '"Nicht" before an adjective (predicate) negates that adjective.',
  },
  {
    id: 'sb_063',
    words: ['Das', 'Restaurant', 'ist', 'nicht', 'weit'],
    english: 'The restaurant is not far.',
    grammarNote: '"Nicht" before an adjective = not. "Weit" = far.',
  },

  // ── TIME AND DAILY ROUTINE ────────────────────────────────────────────────────

  {
    id: 'sb_064',
    words: ['Ich', 'stehe', 'früh', 'auf'],
    english: 'I get up early.',
    grammarNote: 'Separable verb: aufstehen. "Früh" = early. The prefix goes to the end.',
  },
  {
    id: 'sb_065',
    words: ['Er', 'trinkt', 'jeden', 'Morgen', 'Kaffee'],
    english: 'He drinks coffee every morning.',
    grammarNote: '"Jeden Morgen" = every morning. "Jeden" is accusative masculine of "jeder".',
  },
  {
    id: 'sb_066',
    words: ['Wir', 'essen', 'um', 'zwölf', 'Uhr'],
    english: 'We eat at twelve o\'clock.',
    grammarNote: '"Um" + time = at. "Uhr" = o\'clock. "Zwölf" = twelve.',
  },
  {
    id: 'sb_067',
    words: ['Die', 'Post', 'kommt', 'um', 'zehn'],
    english: 'The post arrives at ten.',
    grammarNote: '"Um" before a number = at (for time). "Post" = post/mail (feminine).',
  },
  {
    id: 'sb_068',
    words: ['Ich', 'gehe', 'abends', 'spazieren'],
    english: 'I go for a walk in the evenings.',
    grammarNote: '"Abends" = in the evenings. "Spazieren gehen" = to go for a walk.',
  },

  // ── MODAL VERBS ───────────────────────────────────────────────────────────────

  {
    id: 'sb_069',
    words: ['Ich', 'kann', 'Deutsch', 'sprechen'],
    english: 'I can speak German.',
    grammarNote: 'Modal verb: können (can). The main verb "sprechen" goes to the end as infinitive.',
  },
  {
    id: 'sb_070',
    words: ['Du', 'musst', 'jetzt', 'gehen'],
    english: 'You must go now.',
    grammarNote: 'Modal verb: müssen (must). Infinitive "gehen" goes to the end.',
  },
  {
    id: 'sb_071',
    words: ['Wir', 'dürfen', 'hier', 'parken'],
    english: 'We are allowed to park here.',
    grammarNote: 'Modal verb: dürfen (to be allowed to). Infinitive goes to the end.',
  },
  {
    id: 'sb_072',
    words: ['Sie', 'will', 'ein', 'Buch', 'kaufen'],
    english: 'She wants to buy a book.',
    grammarNote: 'Modal verb: wollen (to want to). Infinitive "kaufen" goes to the end.',
  },
  {
    id: 'sb_073',
    words: ['Er', 'möchte', 'Wasser', 'trinken'],
    english: 'He would like to drink water.',
    grammarNote: '"Möchte" = would like to (polite form of mögen). Infinitive at end.',
  },

  // ── QUESTION STRUCTURES ───────────────────────────────────────────────────────

  {
    id: 'sb_074',
    words: ['Wie', 'heißt', 'du'],
    english: 'What is your name?',
    grammarNote: '"Wie heißt du?" — in questions the verb comes before the subject.',
  },
  {
    id: 'sb_075',
    words: ['Wo', 'wohnst', 'du'],
    english: 'Where do you live?',
    grammarNote: '"Wo" = where. In questions: question word + verb + subject.',
  },
  {
    id: 'sb_076',
    words: ['Was', 'isst', 'du', 'gern'],
    english: 'What do you like to eat?',
    grammarNote: '"Gern" after a verb = like to do something. "Was" = what.',
  },
  {
    id: 'sb_077',
    words: ['Woher', 'kommst', 'du'],
    english: 'Where are you from?',
    grammarNote: '"Woher" = from where. Used to ask about origin.',
  },
  {
    id: 'sb_078',
    words: ['Wann', 'fährt', 'der', 'Zug'],
    english: 'When does the train leave?',
    grammarNote: '"Wann" = when. In questions: verb comes directly after the question word.',
  },

  // ── MIXED / ADJECTIVES ────────────────────────────────────────────────────────

  {
    id: 'sb_079',
    words: ['Das', 'Essen', 'schmeckt', 'gut'],
    english: 'The food tastes good.',
    grammarNote: '"Schmecken" = to taste. "Das Essen" = the food (neuter noun from the verb essen).',
  },
  {
    id: 'sb_080',
    words: ['Er', 'kommt', 'aus', 'Österreich'],
    english: 'He comes from Austria.',
    grammarNote: '"Aus" + country name = from. Most country names take no article.',
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
  },
  {
    id: 'a2_sb_002',
    words: ['Er', 'hat', 'Pizza', 'gegessen'],
    english: 'He has eaten pizza.',
    grammarNote: '"Essen" → gegessen (irregular Partizip II). Most Perfekt sentences use "haben".',
  },
  {
    id: 'a2_sb_003',
    words: ['Wir', 'haben', 'Deutsch', 'gelernt'],
    english: 'We have learned German.',
    grammarNote: 'Regular Partizip II: ge- + stem + -t. "Lernen" → gelernt.',
  },
  {
    id: 'a2_sb_004',
    words: ['Sie', 'hat', 'einen', 'Brief', 'geschrieben'],
    english: 'She has written a letter.',
    grammarNote: '"Schreiben" → geschrieben (irregular). "Einen Brief" = a letter (accusative masculine).',
  },
  {
    id: 'a2_sb_005',
    words: ['Ich', 'habe', 'Kaffee', 'getrunken'],
    english: 'I have drunk coffee.',
    grammarNote: '"Trinken" → getrunken (irregular Partizip II with vowel change).',
  },
  {
    id: 'a2_sb_006',
    words: ['Du', 'hast', 'das', 'Fenster', 'geöffnet'],
    english: 'You have opened the window.',
    grammarNote: 'Regular Partizip II: ge- + stem + -t. "Öffnen" → geöffnet.',
  },
  {
    id: 'a2_sb_007',
    words: ['Er', 'hat', 'sein', 'Auto', 'verkauft'],
    english: 'He has sold his car.',
    grammarNote: 'Verbs with inseparable prefixes (ver-) do NOT add ge-: "verkaufen" → verkauft.',
  },
  {
    id: 'a2_sb_008',
    words: ['Wir', 'haben', 'die', 'Hausaufgaben', 'gemacht'],
    english: 'We have done the homework.',
    grammarNote: '"Machen" → gemacht (regular). "Die Hausaufgaben" = the homework (always plural).',
  },
  {
    id: 'a2_sb_009',
    words: ['Sie', 'haben', 'Musik', 'gehört'],
    english: 'They have listened to music.',
    grammarNote: '"Hören" → gehört (regular). The Partizip II goes to the very end of the sentence.',
  },
  {
    id: 'a2_sb_010',
    words: ['Ich', 'habe', 'meine', 'Freundin', 'angerufen'],
    english: 'I have called my girlfriend.',
    grammarNote: 'Separable verb: anrufen → angerufen. The "ge-" goes between prefix and stem: an-ge-rufen.',
  },
  {
    id: 'a2_sb_011',
    words: ['Er', 'hat', 'das', 'Formular', 'ausgefüllt'],
    english: 'He has filled in the form.',
    grammarNote: 'Separable verb: ausfüllen → ausgefüllt. "Ge-" goes between prefix and stem.',
  },
  {
    id: 'a2_sb_012',
    words: ['Ich', 'habe', 'einen', 'Fehler', 'gemacht'],
    english: 'I have made a mistake.',
    grammarNote: '"Einen Fehler machen" = to make a mistake. "Einen" = accusative of ein (masculine).',
  },

  // ── PERFEKT WITH SEIN ─────────────────────────────────────────────────────────

  {
    id: 'a2_sb_013',
    words: ['Ich', 'bin', 'nach', 'Berlin', 'gefahren'],
    english: 'I have travelled to Berlin.',
    grammarNote: 'Motion verbs use "sein" in Perfekt: fahren → gefahren. "Nach" + city = to.',
  },
  {
    id: 'a2_sb_014',
    words: ['Sie', 'ist', 'früh', 'aufgestanden'],
    english: 'She got up early.',
    grammarNote: 'Separable verb with sein: aufstehen → aufgestanden. Change-of-state verbs use sein.',
  },
  {
    id: 'a2_sb_015',
    words: ['Wir', 'sind', 'ins', 'Kino', 'gegangen'],
    english: 'We went to the cinema.',
    grammarNote: '"Gehen" → gegangen. Movement on foot uses "sein". "Ins" = in das.',
  },
  {
    id: 'a2_sb_016',
    words: ['Er', 'ist', 'um', 'acht', 'Uhr', 'angekommen'],
    english: 'He arrived at eight o\'clock.',
    grammarNote: 'Separable verb with sein: ankommen → angekommen. Arrival = change of state → sein.',
  },
  {
    id: 'a2_sb_017',
    words: ['Die', 'Kinder', 'sind', 'schnell', 'gelaufen'],
    english: 'The children ran quickly.',
    grammarNote: '"Laufen" → gelaufen. Running (movement) uses "sein" in Perfekt.',
  },
  {
    id: 'a2_sb_018',
    words: ['Ich', 'bin', 'in', 'die', 'Schule', 'gegangen'],
    english: 'I went to school.',
    grammarNote: '"Gehen" always uses "sein". "In die Schule" = to school (accusative, movement).',
  },

  // ── SUBORDINATE CLAUSES: WEIL ─────────────────────────────────────────────────

  {
    id: 'a2_sb_019',
    words: ['Ich', 'bleibe', 'zu', 'Hause', 'weil', 'ich', 'krank', 'bin'],
    english: 'I am staying at home because I am ill.',
    grammarNote: '"Weil" (because) sends the verb to the END of the clause: "...weil ich krank BIN".',
  },
  {
    id: 'a2_sb_020',
    words: ['Er', 'lernt', 'Deutsch', 'weil', 'er', 'in', 'Deutschland', 'arbeiten', 'will'],
    english: 'He is learning German because he wants to work in Germany.',
    grammarNote: 'With a modal verb in a weil-clause, the modal goes last: "...arbeiten WILL".',
  },
  {
    id: 'a2_sb_021',
    words: ['Sie', 'ist', 'müde', 'weil', 'sie', 'wenig', 'geschlafen', 'hat'],
    english: 'She is tired because she slept little.',
    grammarNote: 'Perfekt in a weil-clause: haben/sein goes to the very end after the Partizip II.',
  },
  {
    id: 'a2_sb_022',
    words: ['Wir', 'fahren', 'mit', 'dem', 'Bus', 'weil', 'das', 'Auto', 'kaputt', 'ist'],
    english: 'We are taking the bus because the car is broken.',
    grammarNote: '"Kaputt sein" = to be broken. In the weil-clause the verb "ist" goes to the end.',
  },

  // ── SUBORDINATE CLAUSES: DASS ─────────────────────────────────────────────────

  {
    id: 'a2_sb_023',
    words: ['Ich', 'glaube', 'dass', 'er', 'Recht', 'hat'],
    english: 'I think that he is right.',
    grammarNote: '"Dass" (that) sends the verb to the end: "...dass er Recht HAT". Note the comma before dass.',
  },
  {
    id: 'a2_sb_024',
    words: ['Er', 'sagt', 'dass', 'er', 'morgen', 'kommt'],
    english: 'He says that he is coming tomorrow.',
    grammarNote: 'After verbs of saying/thinking, "dass" introduces the reported content. Verb goes last.',
  },
  {
    id: 'a2_sb_025',
    words: ['Ich', 'weiß', 'dass', 'das', 'schwierig', 'ist'],
    english: 'I know that it is difficult.',
    grammarNote: '"Wissen" = to know (a fact). "Dass" clause: verb at the end.',
  },

  // ── SUBORDINATE CLAUSES: OBWOHL / WENN ────────────────────────────────────────

  {
    id: 'a2_sb_026',
    words: ['Er', 'geht', 'spazieren', 'obwohl', 'es', 'regnet'],
    english: 'He goes for a walk although it is raining.',
    grammarNote: '"Obwohl" (although) = concessive conjunction. Verb goes to end of clause.',
  },
  {
    id: 'a2_sb_027',
    words: ['Wenn', 'es', 'warm', 'ist', 'gehen', 'wir', 'schwimmen'],
    english: 'When it is warm, we go swimming.',
    grammarNote: '"Wenn" (when/if) starts a subordinate clause. After the clause, the main verb comes first: GEHEN wir...',
  },
  {
    id: 'a2_sb_028',
    words: ['Sie', 'kauft', 'das', 'Kleid', 'obwohl', 'es', 'teuer', 'ist'],
    english: 'She buys the dress although it is expensive.',
    grammarNote: '"Obwohl" shows contrast. The fact in the obwohl-clause is true, but it doesn\'t stop the action.',
  },

  // ── COMPARATIVE ───────────────────────────────────────────────────────────────

  {
    id: 'a2_sb_029',
    words: ['Berlin', 'ist', 'größer', 'als', 'Hamburg'],
    english: 'Berlin is bigger than Hamburg.',
    grammarNote: 'Comparative: adjective + -er. "Groß" → "größer" (umlaut change). "Als" = than.',
  },
  {
    id: 'a2_sb_030',
    words: ['Das', 'Buch', 'ist', 'interessanter', 'als', 'der', 'Film'],
    english: 'The book is more interesting than the film.',
    grammarNote: '"Interessant" → "interessanter". All German comparatives use -er, never "mehr + adjective".',
  },
  {
    id: 'a2_sb_031',
    words: ['Sie', 'spricht', 'besser', 'Deutsch', 'als', 'ich'],
    english: 'She speaks German better than I do.',
    grammarNote: '"Gut" → "besser" (irregular comparative). "Als" = than in comparisons.',
  },
  {
    id: 'a2_sb_032',
    words: ['Der', 'Zug', 'ist', 'schneller', 'als', 'der', 'Bus'],
    english: 'The train is faster than the bus.',
    grammarNote: '"Schnell" → "schneller". Regular comparative: add -er to the adjective stem.',
  },
  {
    id: 'a2_sb_033',
    words: ['Ich', 'trinke', 'lieber', 'Tee', 'als', 'Kaffee'],
    english: 'I prefer to drink tea rather than coffee.',
    grammarNote: '"Gern" → "lieber" (comparative of gern = like to). "Lieber" = prefer / rather.',
  },

  // ── ADJECTIVE ENDINGS ─────────────────────────────────────────────────────────

  {
    id: 'a2_sb_034',
    words: ['Ich', 'habe', 'einen', 'alten', 'Freund', 'besucht'],
    english: 'I visited an old friend.',
    grammarNote: 'Adjective after indefinite article, accusative masculine: einen alt-EN Freund.',
  },
  {
    id: 'a2_sb_035',
    words: ['Sie', 'wohnt', 'in', 'einer', 'kleinen', 'Wohnung'],
    english: 'She lives in a small flat.',
    grammarNote: '"In einer..." = dative feminine. Adjective ending after einer: -en. "Kleinen Wohnung".',
  },
  {
    id: 'a2_sb_036',
    words: ['Er', 'kauft', 'das', 'rote', 'Auto'],
    english: 'He buys the red car.',
    grammarNote: 'Adjective after definite article, accusative neuter: das rot-E Auto.',
  },
  {
    id: 'a2_sb_037',
    words: ['Die', 'nette', 'Frau', 'hilft', 'mir'],
    english: 'The nice woman helps me.',
    grammarNote: 'Adjective after definite article, nominative feminine: die nett-E Frau.',
  },
  {
    id: 'a2_sb_038',
    words: ['Wir', 'essen', 'in', 'einem', 'guten', 'Restaurant'],
    english: 'We eat in a good restaurant.',
    grammarNote: '"In einem..." = dative neuter. Adjective after einem: -en. "Einem guten Restaurant".',
  },

  // ── TWO-WAY PREPOSITIONS ──────────────────────────────────────────────────────

  {
    id: 'a2_sb_039',
    words: ['Das', 'Buch', 'liegt', 'auf', 'dem', 'Tisch'],
    english: 'The book is lying on the table.',
    grammarNote: '"Auf dem" = on (location, dative). "Wo?" → Dativ. "Auf den" would mean movement onto.',
  },
  {
    id: 'a2_sb_040',
    words: ['Sie', 'legt', 'das', 'Heft', 'auf', 'den', 'Tisch'],
    english: 'She puts the notebook on the table.',
    grammarNote: '"Auf den" = onto (movement/direction, accusative). "Wohin?" → Akkusativ.',
  },
  {
    id: 'a2_sb_041',
    words: ['Das', 'Kind', 'sitzt', 'in', 'dem', 'Zimmer'],
    english: 'The child is sitting in the room.',
    grammarNote: '"In dem" (= im) = in (location, dative). "Wo sitzt das Kind?" → Dativ.',
  },
  {
    id: 'a2_sb_042',
    words: ['Er', 'hängt', 'das', 'Bild', 'an', 'die', 'Wand'],
    english: 'He hangs the picture on the wall.',
    grammarNote: '"An die Wand" = onto the wall (movement, accusative). "Wohin?" → Akkusativ.',
  },

  // ── MODAL VERBS IN PAST (PRÄTERITUM) ─────────────────────────────────────────

  {
    id: 'a2_sb_043',
    words: ['Er', 'musste', 'früh', 'aufstehen'],
    english: 'He had to get up early.',
    grammarNote: 'Modal verbs use Präteritum in speech: müssen → musste. Infinitive still goes to end.',
  },
  {
    id: 'a2_sb_044',
    words: ['Wir', 'konnten', 'nicht', 'kommen'],
    english: 'We couldn\'t come.',
    grammarNote: '"Können" → konnte/konnten (Präteritum). "Nicht" before the infinitive = couldn\'t.',
  },
  {
    id: 'a2_sb_045',
    words: ['Sie', 'wollte', 'ein', 'neues', 'Kleid', 'kaufen'],
    english: 'She wanted to buy a new dress.',
    grammarNote: '"Wollen" → wollte (Präteritum). Adjective: ein neu-ES Kleid (neuter, indefinite article).',
  },

  // ── REFLEXIVE VERBS ───────────────────────────────────────────────────────────

  {
    id: 'a2_sb_046',
    words: ['Ich', 'freue', 'mich', 'auf', 'den', 'Urlaub'],
    english: 'I am looking forward to the holiday.',
    grammarNote: '"Sich freuen auf" = to look forward to. "Mich" is the accusative reflexive pronoun for ich.',
  },
  {
    id: 'a2_sb_047',
    words: ['Er', 'wäscht', 'sich', 'die', 'Hände'],
    english: 'He washes his hands.',
    grammarNote: '"Sich waschen" with a body part uses dative reflexive: "er wäscht sich (dativ) die Hände".',
  },
  {
    id: 'a2_sb_048',
    words: ['Wir', 'haben', 'uns', 'gut', 'amüsiert'],
    english: 'We had a good time.',
    grammarNote: '"Sich amüsieren" = to enjoy oneself. Perfekt: haben + uns + amüsiert.',
  },

  // ── FUTURE WITH WERDEN ────────────────────────────────────────────────────────

  {
    id: 'a2_sb_049',
    words: ['Ich', 'werde', 'morgen', 'früh', 'aufstehen'],
    english: 'I will get up early tomorrow.',
    grammarNote: 'Future: werden + infinitive at the end. "Ich werde... aufstehen" — note the infinitive is last.',
  },
  {
    id: 'a2_sb_050',
    words: ['Es', 'wird', 'heute', 'regnen'],
    english: 'It will rain today.',
    grammarNote: '"Werden" + infinitive = future tense. "Regnen" stays as infinitive at the end.',
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────
// Keyed by level so the game can do SENTENCE_BUILDER_DATA[level].

export const SENTENCE_BUILDER_DATA: Record<Level, SentenceEntry[]> = {
  A1: A1_SENTENCES,
  A2: A2_SENTENCES,
  B1: [],
  B2: [],
};