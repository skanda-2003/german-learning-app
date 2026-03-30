// sentenceBuilder.ts — 80 A1 German sentences for the Sentence Builder game.
//
// Each entry has:
//   id          — unique string ID
//   words       — correct word order (no end punctuation — keeps tiles clean)
//   english     — English translation shown to the user as the prompt
//   grammarNote — brief explanation shown after the user submits their answer

export type SentenceEntry = {
  id: string;
  words: string[];
  english: string;
  grammarNote: string;
};

export const SENTENCE_BUILDER_DATA: SentenceEntry[] = [
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