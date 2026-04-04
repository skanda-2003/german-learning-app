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

// ─── A2 Passages ──────────────────────────────────────────────────────────────
// 12 passages — everyday topics at elementary level, 6-8 sentences each.
// Uses A2 grammar: Perfekt, modal verbs, adjective endings, comparatives,
// subordinate clauses with weil/dass/wenn.

const A2_PASSAGES: Passage[] = [
  {
    id: 'a2_p01',
    title: 'Eine Reise nach Wien',
    titleEn: 'A trip to Vienna',
    text: 'Letzten Sommer bin ich nach Wien gefahren. Die Stadt ist sehr schön und alt. Ich habe das Schloss Schönbrunn besucht. Es war beeindruckend und sehr groß. Am Abend habe ich in einem Restaurant gegessen. Das Essen war lecker, aber ein bisschen teuer. Nächstes Jahr möchte ich wieder nach Wien fahren.',
  },
  {
    id: 'a2_p02',
    title: 'Einkaufen in der Stadt',
    titleEn: 'Shopping in the city',
    text: 'Am Samstag bin ich in die Stadt gefahren, weil ich neue Schuhe kaufen wollte. Zuerst habe ich mehrere Geschäfte besucht. In einem Laden habe ich ein schönes Paar gefunden. Die Schuhe waren bequem und nicht zu teuer. Ich habe auch ein Hemd für meinen Bruder gekauft. Danach bin ich in ein Café gegangen und habe einen Cappuccino getrunken. Es war ein schöner Tag.',
  },
  {
    id: 'a2_p03',
    title: 'Mein neuer Job',
    titleEn: 'My new job',
    text: 'Seit drei Monaten arbeite ich in einem kleinen Büro. Meine Kollegen sind sehr nett und hilfsbereit. Jeden Tag beginne ich um neun Uhr. Ich muss viele E-Mails schreiben und Telefongespräche führen. Die Arbeit ist manchmal stressig, aber ich lerne viel. Nach der Arbeit bin ich oft müde. Trotzdem macht mir der Job Spaß.',
  },
  {
    id: 'a2_p04',
    title: 'Ein Abend mit Freunden',
    titleEn: 'An evening with friends',
    text: 'Gestern Abend habe ich meine Freunde besucht. Wir haben zusammen gekocht und Pasta gemacht. Das Essen hat sehr gut geschmeckt. Nach dem Essen haben wir Karten gespielt. Mein Freund Jonas hat gewonnen, weil er sehr gut spielt. Wir haben viel gelacht und geredet. Ich bin erst um Mitternacht nach Hause gegangen.',
  },
  {
    id: 'a2_p05',
    title: 'Sport und Gesundheit',
    titleEn: 'Sport and health',
    text: 'Ich treibe dreimal pro Woche Sport, weil es gesund ist. Meistens gehe ich joggen oder ins Fitnessstudio. Joggen macht mir mehr Spaß als Fitnessstudio. Im Sommer schwimme ich auch gern im See. Mein Arzt hat gesagt, dass ich mich gut um meine Gesundheit kümmere. Ich schlafe auch ausreichend und esse viel Obst und Gemüse. Ich fühle mich fit und energiereich.',
  },
  {
    id: 'a2_p06',
    title: 'Eine Wohnungssuche',
    titleEn: 'Flat hunting',
    text: 'Seit zwei Monaten suche ich eine neue Wohnung. Ich möchte näher an meiner Arbeit wohnen. Die Mieten in der Stadt sind leider sehr hoch. Letzte Woche habe ich drei Wohnungen besichtigt. Die erste war zu klein, die zweite war zu laut. Die dritte Wohnung hat mir gut gefallen, weil sie hell und ruhig ist. Ich hoffe, dass ich sie bald mieten kann.',
  },
  {
    id: 'a2_p07',
    title: 'Kochen lernen',
    titleEn: 'Learning to cook',
    text: 'Früher konnte ich nicht kochen. Dann habe ich einen Kochkurs gemacht. Der Kurs hat vier Wochen gedauert und hat viel Spaß gemacht. Ich habe gelernt, dass man für gutes Essen frische Zutaten braucht. Jetzt koche ich zweimal pro Woche selbst. Mein Lieblingsrezept ist Risotto mit Gemüse. Meine Familie findet mein Essen sehr lecker.',
  },
  {
    id: 'a2_p08',
    title: 'Ein Wochenendausflug',
    titleEn: 'A weekend trip',
    text: 'Am letzten Wochenende sind wir in die Berge gefahren. Wir sind früh aufgestanden und um sechs Uhr losgefahren. Die Fahrt hat zwei Stunden gedauert. In den Bergen haben wir eine lange Wanderung gemacht. Das Wetter war sonnig und angenehm. Wir haben oben auf dem Berg eine Pause gemacht und Brot gegessen. Am Abend sind wir glücklich aber erschöpft nach Hause gefahren.',
  },
  {
    id: 'a2_p09',
    title: 'Beim Arzt',
    titleEn: 'At the doctor',
    text: 'Letzte Woche war ich beim Arzt, weil ich Halsschmerzen hatte. Der Arzt hat mich untersucht und gesagt, dass ich eine leichte Erkältung habe. Er hat mir Medikamente verschrieben. Ich musste drei Tage zu Hause bleiben und viel Tee trinken. Jetzt geht es mir viel besser. Ich habe gelernt, dass man bei schlechtem Wetter warme Kleidung tragen sollte. Nächste Woche kann ich wieder arbeiten.',
  },
  {
    id: 'a2_p10',
    title: 'Deutsch lernen',
    titleEn: 'Learning German',
    text: 'Ich lerne seit einem Jahr Deutsch. Am Anfang war es sehr schwer, weil die Grammatik kompliziert ist. Jetzt kann ich schon einfache Gespräche führen. Ich gehe zweimal pro Woche in einen Sprachkurs. Mein Lehrer sagt, dass ich gute Fortschritte mache. Zu Hause schaue ich deutsche Filme und lese kurze Texte. Deutsch zu lernen macht mir viel Freude.',
  },
  {
    id: 'a2_p11',
    title: 'Das neue Restaurant',
    titleEn: 'The new restaurant',
    text: 'In unserer Straße hat ein neues Restaurant aufgemacht. Es ist ein italienisches Restaurant mit moderner Einrichtung. Gestern bin ich mit meiner Freundin hingegangen. Wir haben Pizza und Pasta bestellt. Die Pizza war die beste, die ich je gegessen habe. Der Service war freundlich und schnell. Obwohl das Restaurant noch neu ist, war es sehr voll. Ich werde sicher wieder hingehen.',
  },
  {
    id: 'a2_p12',
    title: 'Urlaub planen',
    titleEn: 'Planning a holiday',
    text: 'Im Sommer möchte ich nach Spanien fahren, weil es dort warm und sonnig ist. Ich habe schon ein Hotel in Barcelona gebucht. Der Flug war günstiger als ich gedacht hatte. Ich plane, die Stadt zu erkunden und ans Meer zu fahren. Meine Freundin kommt auch mit, weil sie Spanien noch nicht kennt. Wir freuen uns sehr auf den Urlaub. Es sind noch drei Monate bis dahin.',
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────
// Keyed by level so the screen can do PASSAGES[level] just like VOCABULARY[level].

export const PASSAGES: Record<Level, Passage[]> = {
  A1: A1_PASSAGES,
  A2: A2_PASSAGES,
  B1: [],
  B2: [],
};
