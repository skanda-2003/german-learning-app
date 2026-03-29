// passages.ts — Pre-written reading passages for each CEFR level
//
// 15 short A1 passages on everyday topics. Each one is 3–5 simple sentences.
// They shuffle on every session so the user doesn't always see the same one first.
//
// Word lookup: when a user taps a word, the app checks it against the A1
// vocabulary list. Words here are chosen to overlap with that list where
// possible, but conjugated/inflected forms won't always match.

import type { Level } from '../store/useLevelStore';

// ─── Type ──────────────────────────────────────────────────────────────────────

export type Passage = {
  id: string;
  title: string;    // German title shown on screen
  titleEn: string;  // English subtitle for context
  text: string;     // The German passage text
};

// ─── A1 Passages ──────────────────────────────────────────────────────────────
// 15 passages — simple, everyday topics at beginner level.

const A1_PASSAGES: Passage[] = [
  {
    id: 'a1_p01',
    title: 'Sich vorstellen',
    titleEn: 'Introducing yourself',
    text: 'Ich heiße Anna. Ich bin zwanzig Jahre alt. Ich komme aus Deutschland. Ich wohne in Berlin. Ich spreche Deutsch und etwas Englisch.',
  },
  {
    id: 'a1_p02',
    title: 'Meine Familie',
    titleEn: 'My family',
    text: 'Ich habe eine kleine Familie. Meine Mutter heißt Maria. Mein Vater arbeitet in einem Büro. Ich habe einen Bruder. Er ist fünfzehn Jahre alt.',
  },
  {
    id: 'a1_p03',
    title: 'Das Frühstück',
    titleEn: 'Breakfast',
    text: 'Jeden Morgen esse ich Brot mit Butter. Ich trinke eine Tasse Kaffee. Manchmal esse ich auch ein Ei. Das Frühstück ist wichtig. Es gibt mir Energie für den Tag.',
  },
  {
    id: 'a1_p04',
    title: 'Im Café',
    titleEn: 'At the café',
    text: 'Ich gehe gern ins Café. Ich bestelle einen Kaffee und ein Stück Kuchen. Das Café ist schön und ruhig. Ich lese dort ein Buch. Es schmeckt sehr gut.',
  },
  {
    id: 'a1_p05',
    title: 'Das Wetter',
    titleEn: 'The weather',
    text: 'Heute ist das Wetter schön. Die Sonne scheint und es ist warm. Ich gehe in den Park. Die Kinder spielen draußen. Morgen soll es regnen.',
  },
  {
    id: 'a1_p06',
    title: 'Im Supermarkt',
    titleEn: 'At the supermarket',
    text: 'Ich gehe heute in den Supermarkt. Ich kaufe Brot, Milch und Äpfel. Das Brot kostet zwei Euro. Die Milch ist frisch. Ich bezahle an der Kasse.',
  },
  {
    id: 'a1_p07',
    title: 'Mein Zimmer',
    titleEn: 'My room',
    text: 'Mein Zimmer ist klein aber gemütlich. Ich habe ein Bett und einen Schreibtisch. An der Wand hängt ein Bild. Meine Bücher stehen im Regal. Ich lerne hier jeden Tag.',
  },
  {
    id: 'a1_p08',
    title: 'Hobbys',
    titleEn: 'Hobbies',
    text: 'In meiner Freizeit spiele ich gern Fußball. Ich spiele auch Gitarre. Manchmal schwimme ich im See. Am Wochenende gehe ich mit Freunden ins Kino. Sport macht mir viel Spaß.',
  },
  {
    id: 'a1_p09',
    title: 'Die Schule',
    titleEn: 'School',
    text: 'Ich gehe jeden Tag in die Schule. Mein Lieblingsfach ist Mathematik. Der Lehrer erklärt alles sehr gut. In der Pause esse ich ein Brot. Nach der Schule mache ich Hausaufgaben.',
  },
  {
    id: 'a1_p10',
    title: 'Mein Hund',
    titleEn: 'My dog',
    text: 'Ich habe einen Hund. Er heißt Max und ist sehr groß. Max spielt gern im Garten. Wir gehen jeden Abend spazieren. Ich liebe meinen Hund sehr.',
  },
  {
    id: 'a1_p11',
    title: 'Die Stadt',
    titleEn: 'The city',
    text: 'Ich wohne in einer großen Stadt. Es gibt viele Geschäfte und Restaurants. Ich fahre mit dem Bus zur Arbeit. Die Straßen sind breit und sauber. Ich mag meine Stadt sehr.',
  },
  {
    id: 'a1_p12',
    title: 'Der Abend',
    titleEn: 'The evening',
    text: 'Am Abend esse ich mit meiner Familie. Wir kochen zusammen in der Küche. Nach dem Essen schauen wir fern. Um zehn Uhr gehe ich ins Bett. Ich schlafe gut.',
  },
  {
    id: 'a1_p13',
    title: 'Farben',
    titleEn: 'Colours',
    text: 'Meine Lieblingsfarbe ist Blau. Der Himmel ist blau und die Sonne ist gelb. Gras ist grün und Tomaten sind rot. Schnee ist weiß. Farben machen die Welt schön.',
  },
  {
    id: 'a1_p14',
    title: 'Ein Brief',
    titleEn: 'A letter',
    text: 'Liebe Anna, wie geht es dir? Ich bin gesund und glücklich. Die Schule ist interessant. Nächste Woche fahre ich nach München. Ich schreibe dir bald wieder. Viele Grüße, Tom.',
  },
  {
    id: 'a1_p15',
    title: 'Am Wochenende',
    titleEn: 'At the weekend',
    text: 'Am Samstag schlafe ich lange. Dann frühstücke ich in Ruhe. Nachmittags gehe ich einkaufen. Abends besuche ich meine Freunde. Das Wochenende ist meine Lieblingszeit.',
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────
// Keyed by level so the screen can do PASSAGES[level] just like VOCABULARY[level].
// Other levels will get passages in later phases.

export const PASSAGES: Record<Level, Passage[]> = {
  A1: A1_PASSAGES,
  A2: [],
  B1: [],
  B2: [],
};
