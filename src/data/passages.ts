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

  // ── Narrative passages (8-9 sentences each) ───────────────────────────────

  {
    id: 'a1_p01',
    title: 'Sich vorstellen',
    titleEn: 'Introducing yourself',
    text: 'Ich heiße Anna. Ich bin zwanzig Jahre alt. Ich komme aus Deutschland. Ich wohne in Berlin. Ich spreche Deutsch und etwas Englisch. Ich studiere an der Universität. Mein Lieblingsfach ist Biologie. In meiner Freizeit lese ich Bücher. Ich bin sehr glücklich hier.',
  },
  {
    id: 'a1_p02',
    title: 'Meine Familie',
    titleEn: 'My family',
    text: 'Ich habe eine kleine Familie. Meine Mutter heißt Maria. Mein Vater arbeitet in einem Büro. Ich habe einen Bruder. Er ist fünfzehn Jahre alt. Meine Schwester ist zehn Jahre alt. Wir wohnen zusammen in einem Haus. Am Abend essen wir zusammen. Meine Familie ist sehr wichtig für mich.',
  },
  {
    id: 'a1_p03',
    title: 'Das Frühstück',
    titleEn: 'Breakfast',
    text: 'Jeden Morgen esse ich Brot mit Butter. Ich trinke eine Tasse Kaffee. Manchmal esse ich auch ein Ei. Das Frühstück ist wichtig. Es gibt mir Energie für den Tag. Am Wochenende frühstücke ich länger. Dann esse ich auch Obst und Joghurt. Meine Mutter macht oft Pfannkuchen. Das schmeckt sehr gut.',
  },
  {
    id: 'a1_p04',
    title: 'Im Café',
    titleEn: 'At the café',
    text: 'Ich gehe gern ins Café. Ich bestelle einen Kaffee und ein Stück Kuchen. Das Café ist schön und ruhig. Ich lese dort ein Buch. Es schmeckt sehr gut. Die Kellnerin ist sehr freundlich. Ein Kaffee kostet zwei Euro. Manchmal komme ich mit einer Freundin. Wir reden und trinken Tee.',
  },
  {
    id: 'a1_p05',
    title: 'Das Wetter',
    titleEn: 'The weather',
    text: 'Heute ist das Wetter schön. Die Sonne scheint und es ist warm. Ich gehe in den Park. Die Kinder spielen draußen. Morgen soll es regnen. Im Winter ist es kalt und oft grau. Ich trage dann eine Jacke und einen Schal. Im Sommer fahre ich gern ans Meer. Das Wetter in Deutschland ist oft wechselhaft.',
  },
  {
    id: 'a1_p06',
    title: 'Im Supermarkt',
    titleEn: 'At the supermarket',
    text: 'Ich gehe heute in den Supermarkt. Ich kaufe Brot, Milch und Äpfel. Das Brot kostet zwei Euro. Die Milch ist frisch. Ich bezahle an der Kasse. Der Supermarkt ist nicht weit von meinem Haus. Ich gehe oft zu Fuß. Die Auswahl ist sehr groß. Manchmal kaufe ich auch Schokolade.',
  },
  {
    id: 'a1_p07',
    title: 'Mein Zimmer',
    titleEn: 'My room',
    text: 'Mein Zimmer ist klein aber gemütlich. Ich habe ein Bett und einen Schreibtisch. An der Wand hängt ein Bild. Meine Bücher stehen im Regal. Ich lerne hier jeden Tag. Das Fenster geht auf den Garten. Ich öffne es oft, weil ich frische Luft mag. Mein Zimmer ist immer ordentlich. Ich fühle mich hier wohl.',
  },
  {
    id: 'a1_p08',
    title: 'Hobbys',
    titleEn: 'Hobbies',
    text: 'In meiner Freizeit spiele ich gern Fußball. Ich spiele auch Gitarre. Manchmal schwimme ich im See. Am Wochenende gehe ich mit Freunden ins Kino. Sport macht mir viel Spaß. Ich höre auch gern Musik. Meine Lieblingsband kommt aus England. Abends lese ich manchmal ein Buch. Ich habe viele Hobbys.',
  },
  {
    id: 'a1_p09',
    title: 'Die Schule',
    titleEn: 'School',
    text: 'Ich gehe jeden Tag in die Schule. Mein Lieblingsfach ist Mathematik. Der Lehrer erklärt alles sehr gut. In der Pause esse ich ein Brot. Nach der Schule mache ich Hausaufgaben. Die Schule beginnt um acht Uhr morgens. Ich fahre mit dem Fahrrad. Meine Freunde sind auch in meiner Klasse. Die Schule ist manchmal schwer, aber ich lerne viel.',
  },
  {
    id: 'a1_p10',
    title: 'Mein Hund',
    titleEn: 'My dog',
    text: 'Ich habe einen Hund. Er heißt Max und ist sehr groß. Max spielt gern im Garten. Wir gehen jeden Abend spazieren. Ich liebe meinen Hund sehr. Max ist braun und hat lange Ohren. Er schläft neben meinem Bett. Jeden Morgen bringt er mir seine Leine. Er ist mein bester Freund.',
  },
  {
    id: 'a1_p11',
    title: 'Die Stadt',
    titleEn: 'The city',
    text: 'Ich wohne in einer großen Stadt. Es gibt viele Geschäfte und Restaurants. Ich fahre mit dem Bus zur Arbeit. Die Straßen sind breit und sauber. Ich mag meine Stadt sehr. Im Zentrum gibt es einen schönen Park. Am Wochenende gehe ich dort spazieren. Es gibt auch ein großes Museum. Die Stadt ist immer lebendig.',
  },
  {
    id: 'a1_p12',
    title: 'Der Abend',
    titleEn: 'The evening',
    text: 'Am Abend esse ich mit meiner Familie. Wir kochen zusammen in der Küche. Nach dem Essen schauen wir fern. Um zehn Uhr gehe ich ins Bett. Ich schlafe gut. Manchmal lese ich noch ein wenig. Ich trinke dann einen Tee. Das Licht mache ich um elf Uhr aus. Der Morgen kommt früh.',
  },
  {
    id: 'a1_p13',
    title: 'Farben',
    titleEn: 'Colours',
    text: 'Meine Lieblingsfarbe ist Blau. Der Himmel ist blau und die Sonne ist gelb. Gras ist grün und Tomaten sind rot. Schnee ist weiß. Farben machen die Welt schön. Mein Zimmer ist hellblau. Ich trage gern blaue Kleidung. Manche Menschen mögen Schwarz oder Grau. Ich finde bunte Farben schöner.',
  },
  {
    id: 'a1_p14',
    title: 'Ein Brief an eine Freundin',
    titleEn: 'A letter to a friend',
    text: 'Liebe Anna, wie geht es dir? Ich bin gesund und glücklich. Die Schule ist interessant. Nächste Woche fahre ich nach München. Ich besuche dort meine Tante. München ist eine schöne Stadt. Es gibt viele Museen und Parks. Ich schreibe dir bald wieder. Viele Grüße, Tom.',
  },
  {
    id: 'a1_p15',
    title: 'Am Wochenende',
    titleEn: 'At the weekend',
    text: 'Am Samstag schlafe ich lange. Dann frühstücke ich in Ruhe. Nachmittags gehe ich einkaufen. Abends besuche ich meine Freunde. Das Wochenende ist meine Lieblingszeit. Am Sonntag gehe ich mit der Familie spazieren. Wir essen danach zusammen Mittag. Am Abend bereite ich mich auf die Woche vor. Das Wochenende ist immer zu kurz.',
  },

  // ── Non-narrative formats (real A1 exam formats) ──────────────────────────

  {
    id: 'a1_p16',
    title: 'Ein Schild: Bäckerei Müller',
    titleEn: 'A sign: Müller Bakery',
    text: 'BÄCKEREI MÜLLER Herzlich willkommen! Montag bis Freitag: 7:00 – 18:00 Uhr Samstag: 7:00 – 14:00 Uhr Sonntag: geschlossen Frisches Brot und Kuchen täglich! Heute im Angebot: Roggenbrot 1,80 Euro Croissants 3 Stück für 2 Euro Wir freuen uns auf Ihren Besuch.',
  },
  {
    id: 'a1_p17',
    title: 'Eine SMS',
    titleEn: 'A text message',
    text: 'Hanna: Hey! Kommst du heute Abend? Wir gehen ins Kino. Tom: Ja, gerne! Um wie viel Uhr? Hanna: Um 19 Uhr. Der Film beginnt um 19:30 Uhr. Tom: Super! Wo treffen wir uns? Hanna: Vor dem Kino. Kaufst du die Karten? Tom: Okay, ich kaufe sie. Bis dann! Hanna: Danke! Tschüss!',
  },
  {
    id: 'a1_p18',
    title: 'Eine E-Mail an die Schule',
    titleEn: 'An email to the school',
    text: 'Betreff: Mein Kind ist krank Sehr geehrte Damen und Herren, mein Sohn Felix ist heute krank. Er hat Fieber und kann nicht in die Schule kommen. Er kommt morgen wieder, wenn es ihm besser geht. Bitte informieren Sie den Lehrer. Vielen Dank. Mit freundlichen Grüßen, Sandra Meier.',
  },
  {
    id: 'a1_p19',
    title: 'Ein Aushang im Haus',
    titleEn: 'A notice in the building',
    text: 'WICHTIGE INFORMATION FÜR ALLE BEWOHNER Liebe Nachbarn, der Aufzug ist von Montag bis Mittwoch außer Betrieb. Bitte benutzen Sie die Treppe. Wir bitten um Entschuldigung. Der Techniker repariert den Aufzug am Donnerstag. Bei Fragen wenden Sie sich an den Hausmeister. Danke für Ihr Verständnis. Die Hausverwaltung.',
  },
  {
    id: 'a1_p20',
    title: 'Eine Anzeige: Wohnung zu vermieten',
    titleEn: 'An advertisement: flat to let',
    text: 'WOHNUNG ZU VERMIETEN 2-Zimmer-Wohnung in der Stadtmitte. Größe: 55 Quadratmeter. Küche und Bad vorhanden. Miete: 650 Euro pro Monat plus Nebenkosten. Verfügbar ab 1. März. Haustiere nicht erlaubt. Kontakt: Frau Klein, Telefon 0176 12345678. Besichtigung nach Vereinbarung möglich.',
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

  // ── Non-narrative formats (real A2 exam formats) ──────────────────────────

  {
    id: 'a2_p13',
    title: 'Eine WhatsApp-Gruppe',
    titleEn: 'A WhatsApp group',
    text: 'Leon: Hallo zusammen! Wir machen nächsten Samstag eine Grillparty. Seid ihr dabei? Sara: Ja, gerne! Soll ich etwas mitbringen? Leon: Bitte bring einen Salat mit. Jonas: Ich kann leider nicht kommen, weil ich arbeiten muss. Tut mir leid! Leon: Schade! Das nächste Mal vielleicht. Sara: Wie viele Leute kommen? Leon: Ungefähr zwanzig Personen. Sara: Super, ich freue mich schon!',
  },
  {
    id: 'a2_p14',
    title: 'Eine formelle E-Mail',
    titleEn: 'A formal email',
    text: 'Betreff: Anfrage Sprachkurs Sehr geehrte Damen und Herren, ich interessiere mich für Ihren Deutschkurs auf A2-Niveau. Könnten Sie mir bitte mehr Informationen schicken? Ich möchte wissen, wann der Kurs beginnt und wie viel er kostet. Außerdem frage ich mich, ob es auch einen Abendkurs gibt, weil ich tagsüber arbeite. Ich freue mich auf Ihre Antwort. Mit freundlichen Grüßen, Maria Santos.',
  },
  {
    id: 'a2_p15',
    title: 'Ein Stellenangebot',
    titleEn: 'A job advertisement',
    text: 'STELLENANGEBOT Café Sonnenblume sucht eine freundliche Servicekraft (m/w/d) in Teilzeit. Arbeitszeiten: Montag bis Freitag von 8 bis 14 Uhr. Aufgaben: Kaffee und Kuchen servieren, Kasse bedienen, Tische abräumen. Voraussetzungen: Berufserfahrung im Service von Vorteil, gute Deutschkenntnisse, freundliches Auftreten. Wir bieten: 13 Euro pro Stunde, nettes Team, flexible Arbeitszeiten. Bewerbung an: info@cafe-sonnenblume.de',
  },
  {
    id: 'a2_p16',
    title: 'Ein Aushang im Büro',
    titleEn: 'A notice at work',
    text: 'AN ALLE MITARBEITER Liebe Kolleginnen und Kollegen, wir möchten Sie daran erinnern, dass nächsten Freitag das Sommerfest stattfindet. Die Veranstaltung beginnt um 15:00 Uhr im Innenhof. Bitte melden Sie sich bis Dienstag an, damit wir genug Essen planen können. Wer nicht kommen kann, sagt bitte kurz Bescheid. Wir freuen uns auf einen schönen gemeinsamen Nachmittag! Das Organisationsteam.',
  },
  {
    id: 'a2_p17',
    title: 'Eine Rezension',
    titleEn: 'An online review',
    text: 'Hotel Bergblick – Bewertung von Stefan K. Ich habe drei Nächte im Hotel Bergblick verbracht und war sehr zufrieden. Das Zimmer war sauber und modern eingerichtet. Die Aussicht auf die Berge war wunderschön. Das Frühstück war reichhaltig, aber der Kaffee hätte besser sein können. Das Personal war immer freundlich und hilfsbereit. Die Lage ist perfekt für Wanderungen. Ich würde dieses Hotel auf jeden Fall weiterempfehlen.',
  },
];

// ─── B1 Passages ──────────────────────────────────────────────────────────────
// 12 passages — intermediate topics, 8-10 sentences with core B1 structures.

const B1_PASSAGES: Passage[] = [
  {
    id: 'b1_p01',
    title: 'Neuer Job im Büro',
    titleEn: 'New job at the office',
    text: 'Seit zwei Monaten arbeite ich in einer Marketingagentur, die in der Innenstadt liegt. Am Anfang war ich unsicher, weil ich die Abläufe noch nicht kannte. Meine Kollegin, die mir alles erklärt hat, ist sehr geduldig. Jeden Montag besprechen wir, welche Aufgaben bis Freitag erledigt werden müssen. Während ich morgens E-Mails beantworte, bereitet mein Team die Kundentermine vor. Letzte Woche wurde ein wichtiges Projekt früher abgeschlossen, als wir erwartet hatten. Wenn ich mehr Erfahrung hätte, würde ich noch selbstständiger arbeiten. Trotzdem bin ich zufrieden, weil ich jeden Tag etwas Neues lerne.',
  },
  {
    id: 'b1_p02',
    title: 'Reise mit Hindernissen',
    titleEn: 'Trip with obstacles',
    text: 'Letzten Sommer wollten wir nach Prag fahren, obwohl der Wetterbericht starken Regen gemeldet hatte. Als wir am Bahnhof ankamen, erfuhren wir, dass unser Zug ausfiel. Bevor wir eine Alternative fanden, mussten wir fast eine Stunde warten. Wir entschieden uns für einen späteren Zug, der über Dresden fuhr. Während der Fahrt las ich einen Reiseführer, damit wir den ersten Tag gut planen konnten. Nachdem wir endlich angekommen waren, waren alle Hotels in der Altstadt fast ausgebucht. Wir fanden trotzdem ein kleines Zimmer, das günstiger war als erwartet. Wenn wir früher gebucht hätten, wäre die Anreise viel entspannter gewesen.',
  },
  {
    id: 'b1_p03',
    title: 'Ein grünes Viertel',
    titleEn: 'A greener district',
    text: 'In unserem Stadtteil wird seit einem Jahr über neue Umweltmaßnahmen diskutiert. Die Straße, die früher immer voller Autos war, ist jetzt teilweise für Fahrräder reserviert. Viele Nachbarn unterstützen das Projekt, obwohl einige Geschäftsleute skeptisch sind. Seitdem mehr Bäume gepflanzt wurden, ist die Luft im Sommer spürbar besser. Plastikbecher, die früher überall herumlagen, werden in den Cafés kaum noch benutzt. Nachdem die Mülltrennung in allen Wohnhäusern eingeführt worden war, sank die Restmüllmenge deutlich. Wenn die Stadt zusätzliche Ladestationen bauen würde, könnten noch mehr Menschen auf E-Autos umsteigen. Sowohl Schulen als auch Vereine organisieren inzwischen Aktionen, bei denen gemeinsam aufgeräumt wird.',
  },
  {
    id: 'b1_p04',
    title: 'Theaterabend mit Diskussion',
    titleEn: 'Theatre evening with discussion',
    text: 'Gestern besuchten wir ein Theaterstück, das auf einem bekannten Roman basiert. Die Schauspielerin, deren Rolle besonders anspruchsvoll war, spielte sehr überzeugend. Während der Pause sprachen wir darüber, warum das Ende so offen geblieben war. Obwohl manche Zuschauer ungeduldig wurden, blieb die Stimmung freundlich. Nach der Vorstellung wurde eine Diskussion angeboten, an der auch der Regisseur teilnahm. Er erklärte, dass einige Szenen bewusst gekürzt worden seien, um den Konflikt klarer zu zeigen. Wenn ich mehr Zeit hätte, würde ich mir das Stück ein zweites Mal ansehen. Sowohl die Musik als auch das Bühnenbild haben mich beeindruckt.',
  },
  {
    id: 'b1_p05',
    title: 'Freundschaft unter Zeitdruck',
    titleEn: 'Friendship under time pressure',
    text: 'Meine beste Freundin und ich sehen uns seltener, seitdem wir in verschiedenen Städten wohnen. Wenn wir telefonieren, merken wir trotzdem sofort, wie gut wir uns verstehen. Letzten Monat hatten wir einen Streit, weil ich ein Treffen kurzfristig abgesagt hatte. Nachdem wir offen darüber gesprochen hatten, war die Situation schnell besser. Sie ist eine Person, auf die ich mich immer verlassen kann. Weder sie noch ich erwarten, dass alles perfekt läuft. Bevor wir Entscheidungen treffen, fragen wir einander oft um Rat. Wenn wir näher beieinander wohnen würden, könnten wir uns natürlich häufiger sehen.',
  },
  {
    id: 'b1_p06',
    title: 'Nachrichten im Alltag',
    titleEn: 'News in everyday life',
    text: 'Viele Menschen informieren sich heute über Apps, die ständig neue Meldungen schicken. Ich lese morgens zuerst die Zusammenfassung, bevor ich zur Arbeit gehe. Während der Mittagspause höre ich oft einen Podcast, in dem aktuelle Themen erklärt werden. Artikel, die nur Schlagzeilen bieten, finde ich selten hilfreich. Wenn eine Nachricht besonders wichtig ist, recherchiere ich in mehreren Quellen. Letzte Woche wurde ein Bericht veröffentlicht, der die Folgen von Falschinformationen untersucht hat. Sowohl Fernsehen als auch soziale Medien können nützlich sein, wenn man sie kritisch nutzt. Ohne diese Gewohnheit wäre es schwer, den Überblick zu behalten.',
  },
  {
    id: 'b1_p07',
    title: 'Gesünder leben im Alltag',
    titleEn: 'Living healthier day to day',
    text: 'Seit meinem letzten Arztbesuch achte ich stärker auf meinen Tagesrhythmus. Der Arzt, zu dem ich seit Jahren gehe, hat mir regelmäßige Bewegung empfohlen. Obwohl ich wenig Zeit habe, gehe ich dreimal pro Woche spazieren. Bevor ich abends esse, trinke ich zuerst ein großes Glas Wasser. Letztes Jahr wurde bei mir ein leichter Vitaminmangel festgestellt, der aber schnell behandelt werden konnte. Wenn ich weniger Stress hätte, würde ich auch besser schlafen. Sowohl meine Ernährung als auch mein Energielevel haben sich inzwischen verbessert. Auf Kaffee, ohne den ich früher nicht arbeiten konnte, verzichte ich inzwischen am Nachmittag.',
  },
  {
    id: 'b1_p08',
    title: 'Wohnen in der Innenstadt',
    titleEn: 'Living in the city center',
    text: 'Unsere Wohnung liegt in einem Viertel, das tagsüber sehr lebendig ist. Das Haus, in dem wir wohnen, wurde vor drei Jahren renoviert. Während unten viele Cafés geöffnet sind, bleibt es in den oberen Stockwerken ruhig. Obwohl die Miete hoch ist, sparen wir Zeit, weil alles zu Fuß erreichbar ist. Nachdem die Straßenbahnlinie verlängert worden war, wurde die Verbindung zum Bahnhof viel besser. Wenn wir mehr Platz hätten, würden wir ein Arbeitszimmer einrichten. Weder mein Partner noch ich möchten im Moment aufs Land ziehen. Die Nachbarn, mit denen wir oft sprechen, fühlen sich hier ebenfalls wohl.',
  },
  {
    id: 'b1_p09',
    title: 'Beschwerde an den Kundenservice',
    titleEn: 'Complaint to customer service',
    text: 'Sehr geehrte Damen und Herren, letzte Woche habe ich bei Ihnen ein Tablet bestellt, das gestern geliefert wurde. Leider funktioniert der Akku nicht richtig, obwohl das Gerät neu ist. Nachdem ich es vollständig geladen hatte, schaltete es sich nach kurzer Zeit wieder aus. Auf Ihrer Website steht, dass solche Fälle innerhalb von vierzehn Tagen gemeldet werden sollen. Ich bitte Sie daher um einen Austausch, damit ich das Gerät wie geplant nutzen kann. Wenn Sie zusätzliche Informationen benötigen, sende ich Ihnen gern Fotos und die Rechnung. Das Produkt, für das ich viel bezahlt habe, sollte einwandfrei sein. Mit freundlichen Grüßen, Lara Neumann.',
  },
  {
    id: 'b1_p10',
    title: 'Praktikum in einem Museum',
    titleEn: 'Internship in a museum',
    text: 'Im Frühjahr habe ich ein Praktikum in einem Museum gemacht, das moderne Kunst zeigt. Meine Betreuerin, die früher selbst Kuratorin war, gab mir viele hilfreiche Aufgaben. Bevor eine neue Ausstellung eröffnet wird, müssen Texte geschrieben und Räume vorbereitet werden. Während der ersten Woche durfte ich Besuchergruppen begleiten. Nachdem ein Raum neu beleuchtet worden war, wirkten mehrere Bilder ganz anders. Wenn ich nach dem Studium die Chance hätte, würde ich gern dort arbeiten. Sowohl die kreative Arbeit als auch der Kontakt mit dem Publikum haben mir gefallen. Die Erfahrung, von der ich lange geträumt hatte, war noch spannender als erwartet.',
  },
  {
    id: 'b1_p11',
    title: 'Lernen in einer Lerngruppe',
    titleEn: 'Studying in a study group',
    text: 'Für die B1-Prüfung lerne ich mit drei Personen, die ich im Sprachkurs kennengelernt habe. Wir treffen uns jeden Mittwoch, nachdem alle von der Arbeit gekommen sind. Themen, die im Unterricht unklar bleiben, besprechen wir dann gemeinsam. Während eine Person Grammatik erklärt, schreiben die anderen Beispiele auf. Wenn jemand eine Aufgabe falsch löst, wird die Regel noch einmal in einfachen Schritten erklärt. Letzte Woche wurde ein Probetest geschrieben, damit wir unseren Stand prüfen konnten. Sowohl die regelmäßigen Treffen als auch das gegenseitige Feedback helfen mir sehr. Ohne die Gruppe hätte ich deutlich weniger Motivation.',
  },
  {
    id: 'b1_p12',
    title: 'Bewerbungsgespräch',
    titleEn: 'Job interview',
    text: 'Heute hatte ich ein Bewerbungsgespräch bei einer Firma, die internationale Projekte betreut. Als ich den Konferenzraum betrat, war ich nervös, aber gut vorbereitet. Die Personalchefin stellte Fragen, auf die ich mich in den letzten Tagen intensiv vorbereitet hatte. Nachdem wir über meinen Lebenslauf gesprochen hatten, ging es um meine Sprachkenntnisse. Es wurde auch gefragt, ob ich bereit wäre, regelmäßig zu reisen. Wenn ich die Stelle bekommen würde, könnte ich viel praktische Erfahrung sammeln. Sowohl meine bisherigen Projekte als auch mein Studium passen gut zu den Anforderungen. Bevor ich ging, wurde mir gesagt, dass ich nächste Woche eine Rückmeldung erhalte.',
  },

  // ── Hard passages (b1_p13–b1_p15) — upper B1 / B1–B2 boundary ──────────────

  {
    id: 'b1_p13',
    title: 'Bürgerinitiative gegen Stadtumbau',
    titleEn: 'Citizens\' initiative against urban redevelopment',
    text: 'In einem Stadtteil, dessen historische Bebauung seit Jahrzehnten unverändert geblieben war, soll ein großes Einkaufszentrum gebaut werden. Nachdem der Stadtrat den Bebauungsplan verabschiedet hatte, bildete sich innerhalb weniger Wochen eine Bürgerinitiative, der sich über tausend Anwohner anschlossen. Die Gründerin der Initiative, deren Engagement bereits bei früheren Projekten bemerkt worden war, erklärte in einem Interview, dass die Interessen der Bewohner bei der Planung nicht ausreichend berücksichtigt worden seien. Wenn die Stadt die Bürger früher einbezogen hätte, wäre es wahrscheinlich nicht zu diesem Konflikt gekommen. Besonders kritisiert wurde, dass der Bauträger, dessen Pläne erst spät veröffentlicht wurden, keine öffentliche Informationsveranstaltung abgehalten hatte. Bevor eine endgültige Entscheidung getroffen wird, fordert die Initiative eine unabhängige Umweltprüfung, auf deren Ergebnis alle Seiten warten. Weder die geschätzten Arbeitsplätze noch die erwarteten Steuereinnahmen rechtfertigten aus Sicht der Initiative den Verlust von Grünflächen. Während die Befürworter des Projekts wirtschaftliche Vorteile betonen, sehen Kritiker darin einen Rückschritt für die Lebensqualität im Viertel. Da die rechtlichen Möglichkeiten zum Einspruch beschränkt sind, plant die Initiative außerdem eine Demonstration, für die eine Genehmigung bereits beantragt worden ist. Ob das Projekt in seiner jetzigen Form umgesetzt wird, hängt nun davon ab, ob die zuständige Behörde einen Kompromissvorschlag annimmt.',
  },
  {
    id: 'b1_p14',
    title: 'Arbeitszeit und Überstunden — was ist erlaubt?',
    titleEn: 'Working hours and overtime — what is permitted?',
    text: 'Viele Arbeitnehmerinnen und Arbeitnehmer wissen nicht genau, welche Rechte ihnen bei Überstunden zustehen, obwohl das Arbeitszeitgesetz klare Grenzen vorschreibt. Grundsätzlich darf die tägliche Arbeitszeit acht Stunden nicht überschreiten, wobei eine Verlängerung auf bis zu zehn Stunden zulässig ist, wenn die zusätzliche Zeit innerhalb von sechs Monaten ausgeglichen wird. Nachdem in einem Unternehmen, für das ich früher gearbeitet hatte, ein Mitarbeiter wegen Überstunden geklagt hatte, wurde die Zeiterfassung dort sofort verpflichtend eingeführt. Der Europäische Gerichtshof hatte zuvor geurteilt, dass alle Mitgliedstaaten eine objektive, verlässliche und zugängliche Arbeitszeiterfassung sicherstellen müssten. Arbeitgeber, deren Systeme diesen Anforderungen nicht genügen, riskieren Bußgelder, die je nach Verstoß erheblich ausfallen können. Wäre die gesetzliche Regelung bekannter, würden sich deutlich mehr Beschäftigte auf ihre Rechte berufen. Besonders in Branchen, in denen lange Arbeitszeiten als normal gelten, werden Überstunden häufig nicht erfasst oder erst gar nicht als solche bezeichnet. Bevor Beschäftigte rechtliche Schritte einleiten, sollten sie ihre Arbeitszeiten schriftlich dokumentieren und sich von einer Gewerkschaft oder einem Rechtsanwalt beraten lassen, damit ihre Ansprüche klar belegt werden können. Ein Betriebsrat, sofern ein solcher vorhanden ist, kann ebenfalls einbezogen werden, da ihm Mitbestimmungsrechte bei der Arbeitszeitgestaltung zustehen. Das Thema ist komplex, weil nationale Gesetze und EU-Richtlinien ineinandergreifen, weshalb Betroffene nicht selten professionelle Unterstützung benötigen.',
  },
  {
    id: 'b1_p15',
    title: 'Solarenergie im Wohngebiet',
    titleEn: 'Solar energy in residential areas',
    text: 'Seitdem die Strompreise deutlich gestiegen sind, interessieren sich immer mehr Hausbesitzer dafür, eigenen Strom durch Solaranlagen zu erzeugen. Eine Anlage, die auf einem Einfamilienhaus installiert wird, kann je nach Größe und Ausrichtung einen erheblichen Teil des jährlichen Strombedarfs decken. Bevor eine solche Anlage in Betrieb genommen werden darf, müssen verschiedene Genehmigungen eingeholt werden, deren Bearbeitungszeit von Gemeinde zu Gemeinde unterschiedlich ist. Nachdem ein Bekannter, dessen Antrag wegen fehlender Unterlagen zunächst abgelehnt worden war, alle Dokumente nachgereicht hatte, dauerte es noch weitere sechs Wochen, bis die Genehmigung erteilt wurde. Wäre das Verfahren einfacher gestaltet, würden sich wahrscheinlich noch mehr Haushalte für eine eigene Anlage entscheiden. Überschüssiger Strom, der nicht selbst verbraucht wird, kann in das öffentliche Netz eingespeist werden, wofür Betreiber eine gesetzlich geregelte Vergütung erhalten. Während die Anfangsinvestition erheblich ist, amortisiert sich eine gut geplante Anlage in der Regel innerhalb von zehn bis fünfzehn Jahren. Kritiker weisen darauf hin, dass die Produktion von Solarmodulen selbst Energie verbraucht und Rohstoffe benötigt, die nicht immer unter fairen Bedingungen abgebaut werden. Dennoch gilt die Photovoltaik als eine der am schnellsten wachsenden Technologien im Bereich der erneuerbaren Energien, und Experten gehen davon aus, dass ihr Anteil am Energiemix in den nächsten Jahrzehnten weiter steigen wird. Wer die Investition plant, sollte vorher mehrere Angebote vergleichen und staatliche Fördermittel prüfen, da diese die Gesamtkosten erheblich senken können.',
  },
];

// ─── B2 Passages ──────────────────────────────────────────────────────────────
// 10 passages — advanced topics, 10-14 sentences, formal structures and abstract vocabulary.

const B2_PASSAGES: Passage[] = [
  {
    id: 'b2_p01',
    title: 'Stadtrat beschließt neue Verkehrsstrategie',
    titleEn: 'City council adopts a new transport strategy',
    text: 'In der gestrigen Sitzung hat der Stadtrat ein Maßnahmenpaket beschlossen, das den öffentlichen Verkehr deutlich stärken soll. Nach Angaben der Verwaltung werden in den kommenden drei Jahren mehrere Buslinien verdichtet und neue Fahrradachsen eingerichtet. Die von externen Fachleuten entwickelte Planung sieht außerdem vor, den Lieferverkehr in der Innenstadt zeitlich zu begrenzen. Obwohl einzelne Händler vor Umsatzeinbußen warnen, bewerten Umweltverbände die Reform als längst überfällig. Der Bürgermeister erklärte, man wolle Mobilität neu denken, ohne die wirtschaftliche Dynamik der Innenstadt zu gefährden. Kritisiert wurde jedoch, dass die Finanzierung nur teilweise gesichert sei. Aufgrund steigender Baukosten müsse der Haushalt erneut geprüft werden. Während der Debatte wurde mehrfach betont, dass soziale Ausgleichsmaßnahmen notwendig seien. Ob die geplanten Parkgebühren tatsächlich den gewünschten Lenkungseffekt haben, bleibt umstritten. Fest steht lediglich, dass bereits im nächsten Quartal erste Pilotprojekte starten sollen.',
  },
  {
    id: 'b2_p02',
    title: 'Warum Homeoffice kein Allheilmittel ist',
    titleEn: 'Why working from home is not a cure-all',
    text: 'In vielen Unternehmen gilt Homeoffice inzwischen als selbstverständlich, doch die Euphorie der ersten Jahre ist deutlich abgeklungen. Zwar berichten Beschäftigte von größerer zeitlicher Flexibilität, zugleich nehmen Klagen über soziale Isolation zu. Was in Präsentationen als Effizienzgewinn erscheint, führt im Alltag oft zu einer Entgrenzung der Arbeitszeit. Wer ständig erreichbar sein soll, arbeitet häufig länger, ohne es bewusst zu merken. Führungskräfte betonen, dass Vertrauen die zentrale Voraussetzung für dezentrale Teams sei. Trotzdem greifen manche Abteilungen wieder zu strengen Präsenzregeln, sobald die Produktivität sinkt. Dabei wird übersehen, dass schlechte Prozesse nicht dadurch besser werden, dass man Menschen ins Büro zurückholt. Entscheidender wäre, interne Abläufe zu vereinfachen und Verantwortlichkeiten klar zu definieren. Die Frage, ob hybride Modelle langfristig stabil sind, lässt sich daher nicht pauschal beantworten. Vieles spricht dafür, dass flexible Regelungen funktionieren können, sofern sie transparent kommuniziert und regelmäßig überprüft werden.',
  },
  {
    id: 'b2_p03',
    title: 'Formeller Einspruch gegen Nebenkostenabrechnung',
    titleEn: 'Formal objection to utility bill statement',
    text: 'Sehr geehrte Damen und Herren, hiermit lege ich fristgerecht Einspruch gegen die mir am 2. März zugestellte Nebenkostenabrechnung ein. Nach sorgfältiger Prüfung der aufgeführten Positionen bin ich zu dem Ergebnis gekommen, dass mehrere Beträge nicht nachvollziehbar sind. Insbesondere die Kosten für Hausreinigung und Gartenpflege liegen deutlich über den Vergleichswerten der Vorjahre. Auf meine telefonische Nachfrage hin wurde mir mitgeteilt, die Erhöhung sei auf gestiegene Dienstleisterpreise zurückzuführen. Eine detaillierte Aufschlüsselung der Einzelrechnungen wurde jedoch bislang nicht vorgelegt. Da mir ohne diese Unterlagen keine sachgerechte Kontrolle möglich ist, bitte ich um Übersendung sämtlicher Belege bis zum 20. April. Sollte die Frist ohne Rückmeldung verstreichen, sehe ich mich veranlasst, den Mieterverein einzuschalten. Unabhängig davon werde ich den strittigen Betrag zunächst nur unter Vorbehalt zahlen. Ich bitte um schriftliche Bestätigung des Eingangs dieses Schreibens.',
  },
  {
    id: 'b2_p04',
    title: 'Konflikt im Projektteam',
    titleEn: 'Conflict within a project team',
    text: 'Das Softwareprojekt galt lange als Vorzeigevorhaben, bis kurz vor dem Rollout erhebliche Spannungen im Team sichtbar wurden. Während die Entwicklungsabteilung auf technische Stabilität pochte, drängte das Management auf einen frühen Marktstart. Die unter Zeitdruck getroffenen Entscheidungen führten dazu, dass notwendige Tests mehrfach verschoben wurden. In den täglichen Meetings wiederholten sich dieselben Diskussionen, ohne dass verbindliche Beschlüsse gefasst wurden. Mehrere Mitarbeitende beklagten, ihre Hinweise seien zwar angehört, aber nicht ernsthaft berücksichtigt worden. Als ein externer Auditbericht kritische Sicherheitslücken bestätigte, musste die Veröffentlichung kurzfristig gestoppt werden. Der Bereichsleiter erklärte anschließend, man habe die Risiken unterschätzt. Trotzdem sei das Projekt nicht gescheitert, sondern lediglich neu priorisiert worden. Inzwischen wurde ein überarbeiteter Zeitplan erstellt, der klare Verantwortlichkeiten festlegt. Ob das verloren gegangene Vertrauen im Team wiederhergestellt werden kann, hängt nun vor allem von transparenter Kommunikation ab.',
  },
  {
    id: 'b2_p05',
    title: 'Wasserknappheit als politisches Risiko',
    titleEn: 'Water scarcity as a political risk',
    text: 'Lange wurde Wasserknappheit in Europa als regionales Problem betrachtet, doch die aktuellen Entwicklungen zeigen ein anderes Bild. In mehreren Ländern sind Grundwasserspiegel so stark gesunken, dass Gemeinden bereits Nutzungsbeschränkungen erlassen haben. Von Landwirten geforderte Ausnahmeregelungen stoßen dabei auf wachsenden Widerstand der Bevölkerung. Wissenschaftler warnen, dass ohne strukturelle Anpassungen Konflikte zwischen Landwirtschaft, Industrie und privaten Haushalten zunehmen werden. Besonders kritisch ist die Lage in Regionen, in denen zugleich hohe Temperaturen und geringe Niederschläge auftreten. Während kurzfristige Notmaßnahmen notwendig bleiben, reicht deren Wirkung allein nicht aus. Gefordert werden langfristige Investitionen in Speichertechnik, effizientere Bewässerung und eine modernisierte Infrastruktur. Trotz der Dringlichkeit verlaufen politische Abstimmungsprozesse oft schleppend. Das liegt unter anderem daran, dass Zuständigkeiten zwischen Kommunen, Ländern und Bund verteilt sind. Je länger Entscheidungen vertagt werden, desto teurer wird eine spätere Korrektur.',
  },
  {
    id: 'b2_p06',
    title: 'Festival zwischen Tradition und Experiment',
    titleEn: 'A festival between tradition and experimentation',
    text: 'Das diesjährige Kulturfestival stand unter dem Motto, vertraute Formen neu zu interpretieren. Neben klassischen Konzerten wurden interaktive Installationen gezeigt, bei denen Besucher selbst Teil der Aufführung wurden. Die von jungen Kuratorinnen zusammengestellte Programmlinie setzte bewusst auf Kontraste. So folgte auf ein Barockensemble eine multimediale Performance, in der historische Texte elektronisch verfremdet wurden. Manche Kritiker bezeichneten diese Kombination als beliebig, andere lobten den Mut zur Öffnung. Besonders stark diskutiert wurde ein Beitrag, der koloniale Bildarchive mit zeitgenössischer Tanzkunst verband. Obwohl die Inszenierung provozierte, blieb die Debatte überraschend sachlich. Viele Gäste betonten, dass kulturelle Institutionen nur dann relevant bleiben, wenn sie gesellschaftliche Konflikte nicht ausklammern. Die Festivalleitung kündigte an, den partizipativen Ansatz im kommenden Jahr auszubauen. Offen ist bislang, ob die öffentliche Förderung in gleicher Höhe fortgeführt wird.',
  },
  {
    id: 'b2_p07',
    title: 'Warum Batterien an Kapazität verlieren',
    titleEn: 'Why batteries lose capacity',
    text: 'Lithium-Ionen-Batterien gelten als Schlüsseltechnologie der Energiewende, dennoch unterliegen sie physikalischen Grenzen. Bei jedem Lade- und Entladevorgang verändern sich die chemischen Strukturen der Elektroden geringfügig. Diese kaum sichtbaren Prozesse führen langfristig dazu, dass weniger Energie gespeichert werden kann. Besonders stark fällt der Effekt aus, wenn Akkus regelmäßig vollständig entladen oder bei hohen Temperaturen betrieben werden. Forschungsgruppen arbeiten daher an Materialien, die mechanisch stabiler sind und geringere Nebenreaktionen erzeugen. Ein weiterer Ansatz besteht darin, Ladealgorithmen so anzupassen, dass kritische Spannungsbereiche seltener erreicht werden. Was zunächst nach einem kleinen Softwareproblem klingt, hat große wirtschaftliche Folgen. Langlebigere Speicher könnten nicht nur Elektromobilität günstiger machen, sondern auch den Netzausbau entlasten. Gleichzeitig steigt der Bedarf an Recyclingverfahren, mit deren Hilfe wertvolle Rohstoffe zurückgewonnen werden. Ohne geschlossene Materialkreisläufe bleibt der ökologische Vorteil moderner Batterien begrenzt.',
  },
  {
    id: 'b2_p08',
    title: 'Debatte um Klarnamen in sozialen Netzwerken',
    titleEn: 'Debate about real-name policies on social networks',
    text: 'Die Forderung nach einer Klarnamenpflicht in sozialen Netzwerken taucht regelmäßig nach Fällen digitaler Hetze auf. Befürworter argumentieren, dass anonyme Kommunikation aggressives Verhalten begünstige und strafrechtliche Verfolgung erschwere. Bürgerrechtsorganisationen halten dagegen, dass Pseudonyme für gefährdete Gruppen oft den einzigen Schutzraum darstellen. In autoritären Kontexten könne eine vollständige Identifizierbarkeit sogar lebensgefährlich sein. Plattformbetreiber verweisen darauf, dass bereits heute umfangreiche Moderationsmechanismen eingesetzt würden. Dennoch bleibt die Frage offen, ob technische Filter allein ausreichen, um systematische Desinformation einzudämmen. Juristinnen schlagen vor, zwischen öffentlicher Sichtbarkeit und behördlicher Nachvollziehbarkeit zu unterscheiden. Danach könnten Nutzende unter Pseudonym auftreten, müssten sich gegenüber der Plattform aber verifizieren. Dieser Ansatz wird als möglicher Kompromiss diskutiert, ist jedoch rechtlich und organisatorisch komplex. Ein Konsens scheint derzeit nicht in Sicht, obwohl der politische Handlungsdruck wächst.',
  },
  {
    id: 'b2_p09',
    title: 'Motivationsschreiben für eine Projektstelle',
    titleEn: 'Motivation letter for a project role',
    text: 'Sehr geehrte Frau Kramer, mit großem Interesse habe ich Ihre Ausschreibung für die Position als Projektkoordinator gelesen. Die Verbindung aus strategischer Planung und operativer Umsetzung entspricht genau meinem bisherigen Tätigkeitsprofil. In den vergangenen vier Jahren habe ich in einem interdisziplinären Team mehrere Digitalprojekte begleitet, darunter die Einführung eines standortübergreifenden Wissensportals. Zu meinen Aufgaben gehörten die Abstimmung mit externen Dienstleistern, die Priorisierung von Arbeitspaketen sowie das laufende Risikomanagement. Besonders motiviert mich die Aussicht, in einem Umfeld zu arbeiten, in dem nachhaltige Prozesse nicht nur angekündigt, sondern konsequent umgesetzt werden. Kolleginnen beschreiben meine Arbeitsweise als strukturiert, lösungsorientiert und verbindlich in der Kommunikation. Neben verhandlungssicheren Deutschkenntnissen verfüge ich über sehr gutes Englisch und Erfahrung in agilen Methoden. Gern möchte ich meine Kompetenzen in Ihre Organisation einbringen und weiterentwickeln. Über die Einladung zu einem persönlichen Gespräch freue ich mich sehr.',
  },
  {
    id: 'b2_p10',
    title: 'Nachhaltig reisen ohne Verzicht',
    titleEn: 'Sustainable travel without giving everything up',
    text: 'Wer nachhaltig reisen möchte, muss nicht auf Komfort verzichten, sollte aber bewusster planen. Eine zentrale Rolle spielt die Wahl des Verkehrsmittels, denn bei mittleren Distanzen verursacht die Bahn oft deutlich weniger Emissionen als das Flugzeug. Auch am Zielort lassen sich Umweltwirkungen reduzieren, etwa durch die Nutzung öffentlicher Verkehrsmittel und regionaler Angebote. Viele Reiseportale werben inzwischen mit grünen Labels, deren Kriterien jedoch nicht immer transparent sind. Es lohnt sich daher, genauer hinzusehen und nicht nur auf Schlagworte zu vertrauen. Unterkünfte, die Energieverbrauch offenlegen und lokale Lieferketten nutzen, sind häufig verlässlicher als pauschale Werbeversprechen. Gleichzeitig sollten Reisende akzeptieren, dass vollkommen emissionsfreies Reisen derzeit kaum möglich ist. Entscheidend ist, welche Prioritäten gesetzt und welche Kompromisse bewusst eingegangen werden. Wer seltener, dafür länger unterwegs ist, reduziert oft den Gesamtaufwand pro Reise erheblich. Nachhaltigkeit bedeutet in diesem Zusammenhang nicht Perfektion, sondern informierte Entscheidungen.',
  },
  {
    id: 'b2_p11',
    title: 'Leserbriefe: Sollte Wählen Pflicht sein?',
    titleEn: 'Letters to the editor: Should voting be compulsory?',
    text: 'In der jüngsten Ausgabe unserer Zeitung haben wir gefragt, ob eine Wahlpflicht sinnvoll wäre, um die sinkende Wahlbeteiligung umzukehren. Die Reaktionen der Leserinnen und Leser fielen erwartungsgemäß gespalten aus. Mehrere Zuschriften betonten, dass das Recht zu wählen untrennbar mit der Freiheit verbunden sei, es auch nicht zu tun. Eine Wahlpflicht greife in die persönliche Autonomie ein und könne erzwungene, unreflektierte Stimmabgaben begünstigen. Andere Leser argumentierten hingegen, dass eine niedrige Beteiligung die demokratische Legitimität gesetzgebender Organe untergrabe. Wenn nur vierzig Prozent der Berechtigten abstimmten, spiegelten die Ergebnisse nicht die tatsächliche Mehrheitsmeinung wider. Befürworter einer Pflicht verweisen auf Belgien und Australien, wo die Beteiligung konstant über neunzig Prozent liege und sich das politische Klima dennoch pluralistisch zeige. Kritiker halten dem entgegen, dass eine hohe Beteiligung allein keine informiertere Wählerschaft erzeuge. Entscheidender sei, politische Bildung von Schulbeginn an zu fördern und Vertrauen in demokratische Institutionen langfristig aufzubauen. Ob gesetzlicher Zwang oder strukturelle Reform der richtige Weg ist, bleibt eine der zentralen Debatten moderner Demokratien.',
  },
  {
    id: 'b2_p12',
    title: 'Kündigung wegen Krankheit — was gilt rechtlich?',
    titleEn: 'Dismissal due to illness — what does the law say?',
    text: 'Viele Arbeitnehmerinnen und Arbeitnehmer fragen sich, ob eine häufige Erkrankung den Verlust des Arbeitsplatzes nach sich ziehen kann. Die kurze Antwort lautet: unter bestimmten Umständen ja, aber nur unter strengen Voraussetzungen. Das Bundesarbeitsgericht hat in mehreren Urteilen klargestellt, dass eine krankheitsbedingte Kündigung sozial gerechtfertigt sein muss. Zunächst ist zu prüfen, ob eine negative Zukunftsprognose vorliegt, das heißt, ob mit weiteren erheblichen Fehlzeiten zu rechnen ist. Lässt sich das bejahen, muss im zweiten Schritt untersucht werden, ob die betrieblichen Interessen des Arbeitgebers durch die Ausfälle unzumutbar beeinträchtigt werden. Dabei spielen sowohl wirtschaftliche Folgen als auch Störungen im Betriebsablauf eine Rolle. Im dritten Schritt ist eine umfassende Interessenabwägung vorzunehmen, bei der auch soziale Gesichtspunkte wie Betriebszugehörigkeit und Unterhaltspflichten berücksichtigt werden müssen. Arbeitgeberinnen, die diese dreistufige Prüfung nicht nachweisbar einhalten, riskieren, dass die Kündigung vor dem Arbeitsgericht für unwirksam erklärt wird. Betroffene sollten daher unbedingt innerhalb von drei Wochen nach Erhalt der Kündigung Klage erheben, da andernfalls die Kündigung als rechtswirksam gilt. Im Zweifel empfiehlt sich eine frühzeitige Beratung durch einen auf Arbeitsrecht spezialisierten Anwalt.',
  },
  {
    id: 'b2_p13',
    title: 'Kommentar: Warum Sparen allein nicht reicht',
    titleEn: 'Commentary: Why saving alone is not enough',
    text: 'In Zeiten hoher Inflation und niedriger Zinsen verliert das klassische Sparbuch seinen Reiz. Zwar galt es lange als sichere und überschaubare Form der Geldanlage, doch angesichts von Preissteigerungen, die über dem Zinsniveau lagen, wurde reales Vermögen faktisch abgebaut. Wer sein Erspartes dauerhaft erhalten oder mehren möchte, kommt um eine breitere Anlagestrategie nicht herum. Investitionen in Aktien oder Indexfonds gelten dabei als eine der wirkungsvollsten Möglichkeiten, langfristig Vermögen aufzubauen — vorausgesetzt, man akzeptiert kurzfristige Schwankungen. Kritiker weisen darauf hin, dass viele Menschen schlicht nicht über das nötige Kapital verfügen, um nennenswert in Wertpapiere zu investieren. Aufgrund steigender Miet- und Energiekosten fehle am Monatsende schlicht die finanzielle Luft. Diese Kritik ist berechtigt, verändert jedoch nicht die grundlegende Logik: Wer kann, sollte früh anfangen, auch mit kleinen Beträgen. Die sogenannten ETF-Sparpläne ermöglichen es, bereits ab zwanzig Euro monatlich an der Börsenentwicklung teilzuhaben. Was entscheidend bleibt, ist der Faktor Zeit: Je früher ein Sparplan begonnen wird, desto stärker wirkt der Zinseszinseffekt. Eine Gesellschaft, in der breite Bevölkerungsschichten vom Kapitalmarkt ausgeschlossen bleiben, wird strukturelle Ungleichheiten langfristig kaum überwinden können.',
  },
  {
    id: 'b2_p14',
    title: 'Sprache im Wandel: Gendern in der Öffentlichkeit',
    titleEn: 'Language in flux: gendering in public discourse',
    text: 'Kaum ein sprachliches Thema polarisiert die deutschsprachige Öffentlichkeit so stark wie die Frage, ob und wie geschlechtergerechte Sprache verwendet werden sollte. Befürworterinnen argumentieren, dass Sprache Realität forme und die Sichtbarkeit aller Geschlechter im Sprachgebrauch ein Zeichen gesellschaftlicher Anerkennung sei. Der sogenannte generische Maskulin, also die Verwendung männlicher Formen als vermeintlich neutrale Bezeichnung, schließe Frauen und nichtbinäre Personen sprachlich aus. Demgegenüber betonen Kritikerinnen und Kritiker, dass Sprache historisch gewachsen sei und ein verordneter Wandel auf Widerstand stoße. Einige Linguisten weisen darauf hin, dass bisherige Studien zur kognitiven Wirkung des Genderns widersprüchliche Ergebnisse geliefert haben. In Bayern wurde per Erlass entschieden, dass Sonderzeichen wie Genderstern oder Doppelpunkt in Behördensprache und Schulen nicht verwendet werden dürfen. Andere Bundesländer hingegen empfehlen oder fördern aktiv geschlechtersensible Formulierungen. Diese föderale Uneinheitlichkeit spiegelt wider, wie tief die gesellschaftliche Spaltung in dieser Frage reicht. Sprachliche Normen haben sich zu allen Zeiten verändert — ob die Gegenwart einen erzwungenen oder natürlichen Wandel erlebt, darüber streiten Expertinnen und Experten weiterhin. Einig ist man sich lediglich darin, dass die Debatte noch lange nicht abgeschlossen ist.',
  },
  {
    id: 'b2_p15',
    title: 'Bericht: Fachkräftemangel im Gesundheitswesen',
    titleEn: 'Report: skills shortage in the healthcare sector',
    text: 'Der Fachkräftemangel im deutschen Gesundheitswesen hat ein Ausmaß erreicht, das Expertinnen schon seit Jahren als strukturelle Krise beschreiben. Insbesondere in der Pflege fehlen nach aktuellen Schätzungen bis zu hunderttausend Vollzeitstellen, Tendenz steigend. Ursächlich dafür ist ein Zusammenspiel mehrerer Faktoren: Die geburtenstarken Jahrgänge der Babyboomer-Generation treten in den Ruhestand, während gleichzeitig zu wenige Nachwuchskräfte ausgebildet werden. Hinzu kommt eine hohe Berufsabbruchquote — viele Pflegefachleute verlassen das Berufsfeld bereits nach wenigen Jahren, weil Arbeitsbelastung und Entlohnung in keinem vertretbaren Verhältnis zueinander stehen. Verschiedene politische Maßnahmen wurden in den vergangenen Jahren ergriffen, darunter eine Pflegepersonaluntergrenze in stationären Einrichtungen sowie eine Reform der Pflegeausbildung. Ob diese Schritte ausreichen, wird von Fachverbänden bezweifelt. Die verstärkte Anwerbung von Fachkräften aus dem Ausland gilt als notwendige Ergänzung, stößt jedoch auf bürokratische Hindernisse bei der Anerkennung ausländischer Berufsabschlüsse. Eine internationale Lösung könne zudem nicht darüber hinwegtäuschen, dass sie in den Herkunftsländern ähnliche Engpässe verschärfe. Gefordert wird daher ein umfassendes Konzept, das Ausbildung, Arbeitsbedingungen, Entlohnung und internationale Kooperation gleichermaßen in den Blick nimmt. Ohne substanzielle Verbesserungen droht das System spätestens in einem Jahrzehnt an seine Grenzen zu stoßen.',
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────
// Keyed by level so the screen can do PASSAGES[level] just like VOCABULARY[level].

export const PASSAGES: Record<Level, Passage[]> = {
  A1: A1_PASSAGES,
  A2: A2_PASSAGES,
  B1: B1_PASSAGES,
  B2: B2_PASSAGES,
};
