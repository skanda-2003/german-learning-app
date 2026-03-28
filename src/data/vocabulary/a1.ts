// a1.ts — A1 vocabulary list
// Sourced from the Goethe Institut A1 word list and CEFR A1 curriculum.
// Covers the most essential everyday vocabulary for complete beginners.

import { Word } from './types';

export const A1_WORDS: Word[] = [

  // --- Greetings & Basic Phrases ---
  { id: 'a1_001', german: 'Hallo',         english: 'Hello',           gender: null, partOfSpeech: 'phrase',    exampleDe: 'Hallo, wie geht es dir?',              exampleEn: 'Hello, how are you?' },
  { id: 'a1_002', german: 'Tschüss',       english: 'Bye',             gender: null, partOfSpeech: 'phrase',    exampleDe: 'Tschüss, bis morgen!',                 exampleEn: 'Bye, see you tomorrow!' },
  { id: 'a1_003', german: 'Bitte',         english: 'Please / You\'re welcome', gender: null, partOfSpeech: 'adverb', exampleDe: 'Kannst du mir bitte helfen?',    exampleEn: 'Can you please help me?' },
  { id: 'a1_004', german: 'Danke',         english: 'Thank you',       gender: null, partOfSpeech: 'phrase',    exampleDe: 'Danke für deine Hilfe!',               exampleEn: 'Thank you for your help!' },
  { id: 'a1_005', german: 'Entschuldigung', english: 'Excuse me / Sorry', gender: null, partOfSpeech: 'phrase', exampleDe: 'Entschuldigung, wo ist der Bahnhof?',  exampleEn: 'Excuse me, where is the train station?' },
  { id: 'a1_006', german: 'Ja',            english: 'Yes',             gender: null, partOfSpeech: 'adverb',    exampleDe: 'Ja, ich verstehe.',                    exampleEn: 'Yes, I understand.' },
  { id: 'a1_007', german: 'Nein',          english: 'No',              gender: null, partOfSpeech: 'adverb',    exampleDe: 'Nein, das stimmt nicht.',              exampleEn: 'No, that is not correct.' },

  // --- Common Verbs ---
  { id: 'a1_008', german: 'sein',          english: 'to be',           gender: null, partOfSpeech: 'verb',      exampleDe: 'Ich bin Student.',                     exampleEn: 'I am a student.' },
  { id: 'a1_009', german: 'haben',         english: 'to have',         gender: null, partOfSpeech: 'verb',      exampleDe: 'Ich habe ein Buch.',                   exampleEn: 'I have a book.' },
  { id: 'a1_010', german: 'heißen',        english: 'to be called',    gender: null, partOfSpeech: 'verb',      exampleDe: 'Ich heiße Anna.',                      exampleEn: 'My name is Anna.' },
  { id: 'a1_011', german: 'wohnen',        english: 'to live / reside', gender: null, partOfSpeech: 'verb',     exampleDe: 'Ich wohne in Berlin.',                 exampleEn: 'I live in Berlin.' },
  { id: 'a1_012', german: 'kommen',        english: 'to come',         gender: null, partOfSpeech: 'verb',      exampleDe: 'Ich komme aus Deutschland.',            exampleEn: 'I come from Germany.' },
  { id: 'a1_013', german: 'gehen',         english: 'to go',           gender: null, partOfSpeech: 'verb',      exampleDe: 'Ich gehe in die Schule.',              exampleEn: 'I go to school.' },
  { id: 'a1_014', german: 'arbeiten',      english: 'to work',         gender: null, partOfSpeech: 'verb',      exampleDe: 'Sie arbeitet in einem Büro.',          exampleEn: 'She works in an office.' },
  { id: 'a1_015', german: 'lernen',        english: 'to learn',        gender: null, partOfSpeech: 'verb',      exampleDe: 'Ich lerne Deutsch.',                   exampleEn: 'I am learning German.' },
  { id: 'a1_016', german: 'sprechen',      english: 'to speak',        gender: null, partOfSpeech: 'verb',      exampleDe: 'Er spricht Englisch und Deutsch.',     exampleEn: 'He speaks English and German.' },
  { id: 'a1_017', german: 'essen',         english: 'to eat',          gender: null, partOfSpeech: 'verb',      exampleDe: 'Wir essen zusammen.',                  exampleEn: 'We eat together.' },
  { id: 'a1_018', german: 'trinken',       english: 'to drink',        gender: null, partOfSpeech: 'verb',      exampleDe: 'Sie trinkt Kaffee.',                   exampleEn: 'She is drinking coffee.' },
  { id: 'a1_019', german: 'kaufen',        english: 'to buy',          gender: null, partOfSpeech: 'verb',      exampleDe: 'Ich kaufe Brot im Supermarkt.',        exampleEn: 'I buy bread at the supermarket.' },
  { id: 'a1_020', german: 'schreiben',     english: 'to write',        gender: null, partOfSpeech: 'verb',      exampleDe: 'Er schreibt einen Brief.',             exampleEn: 'He is writing a letter.' },
  { id: 'a1_021', german: 'lesen',         english: 'to read',         gender: null, partOfSpeech: 'verb',      exampleDe: 'Ich lese ein Buch.',                   exampleEn: 'I am reading a book.' },
  { id: 'a1_022', german: 'machen',        english: 'to make / to do', gender: null, partOfSpeech: 'verb',      exampleDe: 'Was machst du heute?',                 exampleEn: 'What are you doing today?' },
  { id: 'a1_023', german: 'fahren',        english: 'to drive / travel', gender: null, partOfSpeech: 'verb',    exampleDe: 'Ich fahre mit dem Bus.',               exampleEn: 'I travel by bus.' },
  { id: 'a1_024', german: 'schlafen',      english: 'to sleep',        gender: null, partOfSpeech: 'verb',      exampleDe: 'Das Kind schläft.',                    exampleEn: 'The child is sleeping.' },
  { id: 'a1_025', german: 'mögen',         english: 'to like',         gender: null, partOfSpeech: 'verb',      exampleDe: 'Ich mag Musik.',                       exampleEn: 'I like music.' },

  // --- Family ---
  { id: 'a1_026', german: 'die Mutter',    english: 'mother',          gender: 'die', partOfSpeech: 'noun',     exampleDe: 'Meine Mutter kocht gut.',              exampleEn: 'My mother cooks well.' },
  { id: 'a1_027', german: 'der Vater',     english: 'father',          gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Mein Vater arbeitet viel.',            exampleEn: 'My father works a lot.' },
  { id: 'a1_028', german: 'das Kind',      english: 'child',           gender: 'das', partOfSpeech: 'noun',     exampleDe: 'Das Kind spielt im Park.',             exampleEn: 'The child is playing in the park.' },
  { id: 'a1_029', german: 'der Mann',      english: 'man / husband',   gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Der Mann liest die Zeitung.',          exampleEn: 'The man is reading the newspaper.' },
  { id: 'a1_030', german: 'die Frau',      english: 'woman / wife',    gender: 'die', partOfSpeech: 'noun',     exampleDe: 'Die Frau arbeitet als Ärztin.',        exampleEn: 'The woman works as a doctor.' },
  { id: 'a1_031', german: 'der Bruder',    english: 'brother',         gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Mein Bruder ist 10 Jahre alt.',        exampleEn: 'My brother is 10 years old.' },
  { id: 'a1_032', german: 'die Schwester', english: 'sister',          gender: 'die', partOfSpeech: 'noun',     exampleDe: 'Meine Schwester wohnt in München.',    exampleEn: 'My sister lives in Munich.' },
  { id: 'a1_033', german: 'die Familie',   english: 'family',          gender: 'die', partOfSpeech: 'noun',     exampleDe: 'Meine Familie ist groß.',              exampleEn: 'My family is big.' },

  // --- Places & Home ---
  { id: 'a1_034', german: 'das Haus',      english: 'house',           gender: 'das', partOfSpeech: 'noun',     exampleDe: 'Das Haus ist sehr groß.',              exampleEn: 'The house is very big.' },
  { id: 'a1_035', german: 'die Wohnung',   english: 'apartment',       gender: 'die', partOfSpeech: 'noun',     exampleDe: 'Ich habe eine kleine Wohnung.',        exampleEn: 'I have a small apartment.' },
  { id: 'a1_036', german: 'die Stadt',     english: 'city / town',     gender: 'die', partOfSpeech: 'noun',     exampleDe: 'Berlin ist eine große Stadt.',         exampleEn: 'Berlin is a big city.' },
  { id: 'a1_037', german: 'die Schule',    english: 'school',          gender: 'die', partOfSpeech: 'noun',     exampleDe: 'Die Kinder gehen in die Schule.',      exampleEn: 'The children go to school.' },
  { id: 'a1_038', german: 'der Supermarkt', english: 'supermarket',    gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Ich kaufe im Supermarkt ein.',         exampleEn: 'I shop at the supermarket.' },
  { id: 'a1_039', german: 'der Bahnhof',   english: 'train station',   gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Der Bahnhof ist in der Stadtmitte.',   exampleEn: 'The train station is in the city centre.' },
  { id: 'a1_040', german: 'das Zimmer',    english: 'room',            gender: 'das', partOfSpeech: 'noun',     exampleDe: 'Mein Zimmer ist klein aber gemütlich.', exampleEn: 'My room is small but cosy.' },

  // --- Food & Drink ---
  { id: 'a1_041', german: 'das Wasser',    english: 'water',           gender: 'das', partOfSpeech: 'noun',     exampleDe: 'Ich trinke gerne Wasser.',             exampleEn: 'I like drinking water.' },
  { id: 'a1_042', german: 'das Brot',      english: 'bread',           gender: 'das', partOfSpeech: 'noun',     exampleDe: 'Ich esse Brot zum Frühstück.',         exampleEn: 'I eat bread for breakfast.' },
  { id: 'a1_043', german: 'der Kaffee',    english: 'coffee',          gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Morgens trinke ich einen Kaffee.',     exampleEn: 'In the morning I drink a coffee.' },
  { id: 'a1_044', german: 'der Tee',       english: 'tea',             gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Möchtest du einen Tee?',               exampleEn: 'Would you like a tea?' },
  { id: 'a1_045', german: 'der Apfel',     english: 'apple',           gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Der Apfel ist rot und süß.',           exampleEn: 'The apple is red and sweet.' },
  { id: 'a1_046', german: 'die Milch',     english: 'milk',            gender: 'die', partOfSpeech: 'noun',     exampleDe: 'Das Kind trinkt Milch.',               exampleEn: 'The child drinks milk.' },

  // --- Transport ---
  { id: 'a1_047', german: 'das Auto',      english: 'car',             gender: 'das', partOfSpeech: 'noun',     exampleDe: 'Das Auto ist neu.',                    exampleEn: 'The car is new.' },
  { id: 'a1_048', german: 'der Bus',       english: 'bus',             gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Ich fahre mit dem Bus zur Arbeit.',    exampleEn: 'I take the bus to work.' },
  { id: 'a1_049', german: 'der Zug',       english: 'train',           gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Der Zug kommt um 9 Uhr an.',           exampleEn: 'The train arrives at 9 o\'clock.' },

  // --- Common Adjectives ---
  { id: 'a1_050', german: 'groß',          english: 'big / tall',      gender: null, partOfSpeech: 'adjective', exampleDe: 'Das Haus ist sehr groß.',              exampleEn: 'The house is very big.' },
  { id: 'a1_051', german: 'klein',         english: 'small / short',   gender: null, partOfSpeech: 'adjective', exampleDe: 'Die Katze ist klein.',                 exampleEn: 'The cat is small.' },
  { id: 'a1_052', german: 'gut',           english: 'good',            gender: null, partOfSpeech: 'adjective', exampleDe: 'Das Essen ist gut.',                   exampleEn: 'The food is good.' },
  { id: 'a1_053', german: 'schlecht',      english: 'bad',             gender: null, partOfSpeech: 'adjective', exampleDe: 'Das Wetter ist heute schlecht.',       exampleEn: 'The weather is bad today.' },
  { id: 'a1_054', german: 'neu',           english: 'new',             gender: null, partOfSpeech: 'adjective', exampleDe: 'Ich habe ein neues Fahrrad.',          exampleEn: 'I have a new bicycle.' },
  { id: 'a1_055', german: 'alt',           english: 'old',             gender: null, partOfSpeech: 'adjective', exampleDe: 'Das Buch ist sehr alt.',               exampleEn: 'The book is very old.' },
  { id: 'a1_056', german: 'teuer',         english: 'expensive',       gender: null, partOfSpeech: 'adjective', exampleDe: 'Das Auto ist sehr teuer.',             exampleEn: 'The car is very expensive.' },
  { id: 'a1_057', german: 'billig',        english: 'cheap',           gender: null, partOfSpeech: 'adjective', exampleDe: 'Das T-Shirt ist billig.',              exampleEn: 'The T-shirt is cheap.' },
  { id: 'a1_058', german: 'schön',         english: 'beautiful / nice', gender: null, partOfSpeech: 'adjective', exampleDe: 'Das Wetter ist heute schön.',         exampleEn: 'The weather is nice today.' },

  // --- Time ---
  { id: 'a1_059', german: 'der Tag',       english: 'day',             gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Heute ist ein schöner Tag.',           exampleEn: 'Today is a beautiful day.' },
  { id: 'a1_060', german: 'die Woche',     english: 'week',            gender: 'die', partOfSpeech: 'noun',     exampleDe: 'Die Woche hat sieben Tage.',           exampleEn: 'The week has seven days.' },
  { id: 'a1_061', german: 'der Monat',     english: 'month',           gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Der Monat Januar ist kalt.',           exampleEn: 'The month of January is cold.' },
  { id: 'a1_062', german: 'das Jahr',      english: 'year',            gender: 'das', partOfSpeech: 'noun',     exampleDe: 'Das Jahr hat zwölf Monate.',           exampleEn: 'The year has twelve months.' },
  { id: 'a1_063', german: 'heute',         english: 'today',           gender: null, partOfSpeech: 'adverb',    exampleDe: 'Heute lerne ich Deutsch.',             exampleEn: 'Today I am learning German.' },
  { id: 'a1_064', german: 'morgen',        english: 'tomorrow',        gender: null, partOfSpeech: 'adverb',    exampleDe: 'Morgen gehe ich einkaufen.',           exampleEn: 'Tomorrow I am going shopping.' },
  { id: 'a1_065', german: 'jetzt',         english: 'now',             gender: null, partOfSpeech: 'adverb',    exampleDe: 'Ich lerne jetzt Deutsch.',             exampleEn: 'I am learning German now.' },

  // --- Money & Numbers concept words ---
  { id: 'a1_066', german: 'das Geld',      english: 'money',           gender: 'das', partOfSpeech: 'noun',     exampleDe: 'Ich habe nicht viel Geld.',            exampleEn: 'I do not have much money.' },
  { id: 'a1_067', german: 'der Preis',     english: 'price',           gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Was ist der Preis?',                   exampleEn: 'What is the price?' },

  // --- Common Objects ---
  { id: 'a1_068', german: 'das Buch',      english: 'book',            gender: 'das', partOfSpeech: 'noun',     exampleDe: 'Ich lese ein interessantes Buch.',     exampleEn: 'I am reading an interesting book.' },
  { id: 'a1_069', german: 'der Tisch',     english: 'table',           gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Das Buch liegt auf dem Tisch.',        exampleEn: 'The book is on the table.' },
  { id: 'a1_070', german: 'der Stuhl',     english: 'chair',           gender: 'der', partOfSpeech: 'noun',     exampleDe: 'Setz dich auf den Stuhl!',             exampleEn: 'Sit down on the chair!' },
];