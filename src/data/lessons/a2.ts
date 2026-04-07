// a2.ts — A2 lesson content (12 lessons)
//
// Each topic string must match exactly what appears in src/data/grammar/a2.ts.
// "Reflexive verbs" uses the buildingOn field — it builds on A1 but focuses
// on what is new at A2: dative reflexive pronouns and meaning-changing reflexives.

import type { Lesson } from './types';

export const A2_LESSONS: Lesson[] = [

  // ─── 1. Adjective endings: definite articles ────────────────────────────────
  {
    topic: 'Adjective endings: definite articles',
    level: 'A2',
    title: 'Adjective endings: definite articles',
    explanation:
      'When an adjective comes before a noun in German, it must take an ending. The ending depends on three things: the gender of the noun, the case (Nominativ, Akkusativ, Dativ), and whether you use a definite article (der/die/das) or an indefinite article.\n\n' +
      'After a definite article, the pattern is simple: most endings are "-e" or "-en". The "-e" ending appears in the Nominativ singular (der alte Mann, die alte Frau, das alte Haus) and Akkusativ singular feminine and neuter. Almost everything else takes "-en".\n\n' +
      'A useful shortcut: if the article already shows the gender clearly (der, die, das), the adjective just adds "-e". If the article form is less informative (den, dem, des), the adjective adds "-en".',
    keyPoints: [
      'Nominativ: der alte Mann / die alte Frau / das alte Haus / die alten Männer',
      'Akkusativ: den alten Mann / die alte Frau / das alte Haus / die alten Männer',
      'Dativ: dem alten Mann / der alten Frau / dem alten Haus / den alten Männern',
      'After the article shows gender clearly → adjective takes "-e"',
      'Most other slots → adjective takes "-en"',
    ],
    examples: [
      { german: 'Der alte Mann wohnt hier.',       english: 'The old man lives here.',         note: 'Nominativ masc → -e' },
      { german: 'Ich sehe die kleine Katze.',       english: 'I see the small cat.',            note: 'Akkusativ fem → -e' },
      { german: 'Er kauft das rote Auto.',          english: 'He buys the red car.',            note: 'Akkusativ neut → -e' },
      { german: 'Sie gibt dem alten Mann Brot.',    english: 'She gives the old man bread.',    note: 'Dativ masc → -en' },
      { german: 'Wir sprechen mit der netten Frau.', english: 'We speak with the nice woman.', note: 'Dativ fem → -en' },
      { german: 'Die kleinen Kinder spielen.',      english: 'The small children play.',        note: 'Nominativ plural → -en' },
    ],
    commonMistake:
      'Wrong: "Ich sehe den alten Mann" ✓ but "Ich sehe der alte Mann" ✗ — in the Akkusativ, masculine nouns use "den" and the adjective takes "-en". Only the Nominativ masculine uses "der … -e".',
  },

  // ─── 2. Adjective endings: indefinite articles ──────────────────────────────
  {
    topic: 'Adjective endings: indefinite articles',
    level: 'A2',
    title: 'Adjective endings: indefinite articles',
    explanation:
      'After indefinite articles (ein/eine/kein/mein etc.), adjective endings follow a slightly different pattern from the definite article table.\n\n' +
      'The key difference is in the Nominativ: where "ein" gives no gender signal (ein = masculine or neuter), the adjective must carry the gender ending itself. So: "ein alter Mann" (adjective shows masculine -er), "ein altes Haus" (adjective shows neuter -es). "Eine alte Frau" still takes "-e" because "eine" already marks feminine.\n\n' +
      'In the Akkusativ, only the masculine changes: "einen alten Mann" — both the article and adjective show masculine Akkusativ. All other slots in Akkusativ, Dativ behave the same as the definite article table (mostly "-en").',
    keyPoints: [
      'Nominativ masc: ein alter Mann (adjective carries -er)',
      'Nominativ neut: ein altes Haus (adjective carries -es)',
      'Nominativ fem: eine alte Frau (adjective takes -e, "eine" shows gender)',
      'Akkusativ masc: einen alten Mann (both article and adjective change)',
      'Dativ all genders: einem alten Mann / einer alten Frau / einem alten Haus',
    ],
    examples: [
      { german: 'Das ist ein alter Wein.',           english: 'That is an old wine.',            note: 'Nominativ masc → adjective -er' },
      { german: 'Ich habe ein kleines Problem.',     english: 'I have a small problem.',         note: 'Nominativ neut → adjective -es' },
      { german: 'Sie hat eine nette Mutter.',        english: 'She has a nice mother.',          note: 'Nominativ fem → adjective -e' },
      { german: 'Er kauft einen neuen Laptop.',      english: 'He buys a new laptop.',           note: 'Akkusativ masc → -en on both' },
      { german: 'Ich helfe einem alten Mann.',       english: 'I help an old man.',              note: 'Dativ masc → adjective -en' },
      { german: 'Sie wohnt in einer kleinen Stadt.', english: 'She lives in a small town.',      note: 'Dativ fem → adjective -en' },
    ],
    commonMistake:
      'Wrong: "Das ist ein alte Mann." Correct: "Das ist ein alter Mann." — after "ein" in the Nominativ masculine, the adjective must add "-er" to show the masculine gender that "ein" does not mark.',
  },

  // ─── 3. Comparative and superlative ─────────────────────────────────────────
  {
    topic: 'Comparative and superlative',
    level: 'A2',
    title: 'Comparative and superlative',
    explanation:
      'To compare things in German, add "-er" to the adjective for the comparative (like English "-er" or "more"): schnell → schneller. To say something is the most, use "am …-sten" for predicative use (Das Auto fährt am schnellsten) or "der/die/das …-ste" before a noun (der schnellste Zug).\n\n' +
      'Many common adjectives have an umlaut in the comparative: alt → älter, groß → größer, jung → jünger, kalt → kälter, warm → wärmer, lang → länger. These must be memorised.\n\n' +
      'A few are completely irregular: gut → besser → am besten; viel → mehr → am meisten; gern → lieber → am liebsten. These are extremely common and worth learning early.',
    keyPoints: [
      'Comparative: adjective + -er (schnell → schneller)',
      'Superlative predicative: am + adjective + -sten (am schnellsten)',
      'Superlative attributive: der/die/das + adjective + -ste/-sten',
      'Common umlaut forms: alt→älter, groß→größer, jung→jünger, kalt→kälter',
      'Irregular: gut→besser→am besten; viel→mehr→am meisten; gern→lieber→am liebsten',
    ],
    examples: [
      { german: 'Berlin ist größer als Hamburg.',     english: 'Berlin is bigger than Hamburg.',   note: 'comparative + als (than)' },
      { german: 'Dieses Buch ist interessanter.',     english: 'This book is more interesting.',   note: 'comparative predicative' },
      { german: 'Er läuft am schnellsten.',           english: 'He runs the fastest.',             note: 'superlative predicative: am …-sten' },
      { german: 'Sie nimmt den kürzesten Weg.',       english: 'She takes the shortest route.',    note: 'superlative attributive before noun' },
      { german: 'Dieser Kaffee schmeckt besser.',     english: 'This coffee tastes better.',       note: 'irregular: gut → besser' },
      { german: 'Ich esse am liebsten Pizza.',        english: 'I like eating pizza the most.',    note: 'irregular: gern → am liebsten' },
    ],
    commonMistake:
      'Wrong: "Berlin ist mehr groß als Hamburg." Correct: "Berlin ist größer als Hamburg." — German does not use "mehr" to form comparatives. Always add "-er" directly to the adjective.',
  },

  // ─── 4. Future tense: werden ─────────────────────────────────────────────────
  {
    topic: 'Future tense: werden',
    level: 'A2',
    title: 'Future tense: werden',
    explanation:
      'German often uses the present tense with a time expression to talk about the future ("Morgen gehe ich ins Kino"). But the future tense with "werden" is used to make predictions, promises, or to emphasise that something will definitely happen.\n\n' +
      '"Werden" works like a modal verb: it is conjugated in position 2, and the main verb goes to the end of the sentence as an infinitive. "Ich werde morgen kommen" — werden in position 2, kommen at the end.\n\n' +
      '"Werden" is also used to express assumptions about the present: "Er wird jetzt schlafen" (He is probably sleeping now). Context distinguishes future prediction from present assumption.',
    keyPoints: [
      'ich werde / du wirst / er wird / wir werden / ihr werdet / sie werden',
      'Structure: werden (position 2) + … + infinitive (end)',
      'Used for predictions, promises, intentions, assumptions',
      'Present tense + time word is more common in everyday speech',
      '"werden" also means "to become": Er wird Arzt. (He is becoming a doctor.)',
    ],
    examples: [
      { german: 'Ich werde morgen anrufen.',          english: 'I will call tomorrow.',           note: 'werden + infinitive at end' },
      { german: 'Es wird regnen.',                    english: 'It is going to rain.',            note: 'weather prediction' },
      { german: 'Du wirst das schaffen!',             english: 'You will manage it!',             note: 'encouragement / promise' },
      { german: 'Wir werden nächstes Jahr heiraten.', english: 'We will get married next year.',  note: 'future plan' },
      { german: 'Er wird jetzt zu Hause sein.',       english: 'He is probably at home now.',     note: 'present assumption with werden' },
      { german: 'Sie wird Ärztin.',                   english: 'She is becoming a doctor.',       note: '"werden" = to become (no infinitive)' },
    ],
    commonMistake:
      'Wrong: "Ich werde morgen kommen werden." Correct: "Ich werde morgen kommen." — the main verb goes to the end as a bare infinitive; never add a second "werden".',
  },

  // ─── 5. Infinitive with zu ───────────────────────────────────────────────────
  {
    topic: 'Infinitive with zu',
    level: 'A2',
    title: 'Infinitive with zu',
    explanation:
      '"Zu" + infinitive is the German equivalent of the English "to + verb" in phrases like "I try to learn" or "It is important to practise". The infinitive with "zu" goes to the end of the sentence.\n\n' +
      'With separable verbs, "zu" is inserted between the prefix and the base verb: "aufmachen" → "aufzumachen". The whole thing is written as one word.\n\n' +
      'Common structures that use "zu + infinitive": versuchen zu (to try to), vergessen zu (to forget to), anfangen zu (to start to), aufhören zu (to stop), hoffen zu (to hope to), Es ist wichtig/schwer/leicht/möglich zu (It is important/hard/easy/possible to).',
    keyPoints: [
      '"zu" + infinitive goes to the end of the clause',
      'With separable verbs: prefix + zu + base verb as one word (aufzumachen)',
      'Common verbs: versuchen, vergessen, anfangen, aufhören, hoffen + zu',
      '"Es ist … zu + infinitiv" = "It is … to …" (important, hard, easy)',
      'No "zu" after modal verbs — modals take a bare infinitive',
    ],
    examples: [
      { german: 'Ich versuche, Deutsch zu lernen.',    english: 'I am trying to learn German.',     note: 'versuchen + zu + infinitive' },
      { german: 'Er vergisst immer, die Tür zuzumachen.', english: 'He always forgets to close the door.', note: 'separable: zu between prefix and verb' },
      { german: 'Sie fängt an, Sport zu machen.',     english: 'She is starting to do sport.',     note: 'anfangen + zu' },
      { german: 'Es ist wichtig, jeden Tag zu üben.', english: 'It is important to practise every day.', note: 'Es ist wichtig zu' },
      { german: 'Hör auf zu rauchen!',                english: 'Stop smoking!',                    note: 'aufhören + zu' },
      { german: 'Ich habe keine Zeit, das zu lesen.', english: 'I have no time to read that.',     note: 'keine Zeit + zu' },
    ],
    commonMistake:
      'Wrong: "Er vergisst, die Tür zu zumachen." Correct: "Er vergisst, die Tür zuzumachen." — with separable verbs, "zu" goes inside the verb (prefix + zu + stem), written as one word.',
  },

  // ─── 6. Perfekt: haben vs sein ───────────────────────────────────────────────
  {
    topic: 'Perfekt: haben vs sein',
    level: 'A2',
    title: 'Perfekt: haben vs sein',
    explanation:
      'The Perfekt is the main past tense in spoken German. It is formed with an auxiliary verb (haben or sein) + the past participle. The key challenge is knowing which auxiliary to use.\n\n' +
      'Use "sein" with verbs that describe movement from A to B (gehen, fahren, fliegen, laufen, kommen, reisen) or a change of state (aufwachen, einschlafen, werden, sterben). Also: bleiben (to stay) and sein itself use "sein".\n\n' +
      'Use "haben" with everything else — most transitive verbs (those that take a direct object) and many intransitive ones. When in doubt, "haben" is the more common choice.',
    keyPoints: [
      'sein: movement verbs (gehen, fahren, kommen, fliegen) + change of state',
      'sein: bleiben, sein, werden, aufwachen, einschlafen, sterben',
      'haben: most other verbs, including all transitive verbs',
      'Structure: auxiliary in position 2 + participle at the end',
      'When unsure, check — it is best memorised with each new verb',
    ],
    examples: [
      { german: 'Ich bin nach Berlin gefahren.',    english: 'I drove to Berlin.',                note: 'fahren = movement → sein' },
      { german: 'Er ist um 7 Uhr aufgewacht.',      english: 'He woke up at 7 o\'clock.',        note: 'aufwachen = change of state → sein' },
      { german: 'Wir sind lange geblieben.',        english: 'We stayed for a long time.',        note: 'bleiben → sein' },
      { german: 'Sie hat das Buch gelesen.',        english: 'She read the book.',                note: 'lesen = transitive → haben' },
      { german: 'Ich habe gestern gearbeitet.',     english: 'I worked yesterday.',               note: 'arbeiten → haben' },
      { german: 'Hast du Kaffee getrunken?',        english: 'Did you drink coffee?',             note: 'trinken → haben' },
    ],
    commonMistake:
      'Wrong: "Ich habe nach Berlin gefahren." Correct: "Ich bin nach Berlin gefahren." — "fahren" describes movement to a destination, so it takes "sein" in the Perfekt.',
  },

  // ─── 7. Perfekt: irregular verbs ────────────────────────────────────────────
  {
    topic: 'Perfekt: irregular verbs',
    level: 'A2',
    title: 'Perfekt: irregular verbs',
    explanation:
      'Irregular (strong) verbs do not form their past participle with "ge-...-t". Instead they use "ge-...-en" and often change the vowel in the stem: schreiben → geschrieben, fahren → gefahren, sehen → gesehen.\n\n' +
      'The stem vowel change is unpredictable — each verb must be memorised. Common patterns: ei→ie (schreiben→geschrieben, bleiben→geblieben), i→u (trinken→getrunken, singen→gesungen), e→o (sprechen→gesprochen, helfen→geholfen).\n\n' +
      'Some of the most common verbs in German are irregular, so it is worth learning their participles early: sein→gewesen, haben→gehabt, gehen→gegangen, kommen→gekommen, sehen→gesehen, geben→gegeben, nehmen→genommen.',
    keyPoints: [
      'Irregular participle pattern: ge- + changed stem + -en',
      'Common stem changes: ei→ie, i→u, e→o, a→u, ie→o',
      'Always learn irregular verbs with their participle form',
      'Auxiliary (haben/sein) rules are the same as for regular Perfekt',
      'Must-know: gegangen, gekommen, gewesen, gehabt, gesehen, genommen, gegeben',
    ],
    examples: [
      { german: 'Er hat das Lied gesungen.',        english: 'He sang the song.',                note: 'singen → gesungen (i→u)' },
      { german: 'Wir haben viel geschrieben.',      english: 'We wrote a lot.',                   note: 'schreiben → geschrieben (ei→ie)' },
      { german: 'Sie hat einen Apfel genommen.',    english: 'She took an apple.',                note: 'nehmen → genommen' },
      { german: 'Ich habe ihn gesehen.',            english: 'I saw him.',                        note: 'sehen → gesehen (e→e, irregular)' },
      { german: 'Wir sind gegangen.',               english: 'We went.',                          note: 'gehen → gegangen (irregular + sein)' },
      { german: 'Habt ihr gut geschlafen?',         english: 'Did you sleep well?',               note: 'schlafen → geschlafen (a→a, irregular)' },
    ],
    commonMistake:
      'Wrong: "Ich habe das Buch gelesst." Correct: "Ich habe das Buch gelesen." — irregular verbs end in "-en" (not "-t") in the participle. "Lesen" → "gelesen".',
  },

  // ─── 8. Perfekt: regular verbs ───────────────────────────────────────────────
  {
    topic: 'Perfekt: regular verbs',
    level: 'A2',
    title: 'Perfekt: regular verbs',
    explanation:
      'Regular (weak) verbs form the past participle by adding "ge-" to the front and "-t" to the end of the stem: lernen → gelernt, kaufen → gekauft, spielen → gespielt.\n\n' +
      'If the stem ends in "-t" or "-d", add "-et" to make it pronounceable: arbeiten → gearbeitet, reden → geredet.\n\n' +
      'Verbs with inseparable prefixes (be-, er-, ver-, ent-, ge-, miss-) do NOT add "ge-": besuchen → besucht, erzählen → erzählt, vergessen → vergessen (note: vergessen has an irregular participle, but the rule still shows no ge-). Verbs ending in "-ieren" also take no "ge-": studieren → studiert, telefonieren → telefoniert.',
    keyPoints: [
      'Regular pattern: ge- + stem + -t (lernen → gelernt)',
      'Stems ending in -t/-d: ge- + stem + -et (arbeiten → gearbeitet)',
      'No "ge-" with inseparable prefixes: besucht, erzählt, erklärt',
      'No "ge-" with -ieren verbs: studiert, telefoniert, fotografiert',
      'Separable verbs: ge- goes between prefix and stem: eingekauft, aufgemacht',
    ],
    examples: [
      { german: 'Ich habe Deutsch gelernt.',          english: 'I learned German.',               note: 'lernen → gelernt (regular)' },
      { german: 'Sie hat gestern gearbeitet.',        english: 'She worked yesterday.',            note: 'arbeiten → gearbeitet (-et ending)' },
      { german: 'Er hat seine Oma besucht.',          english: 'He visited his grandmother.',     note: 'besuchen → besucht (no ge-, insep. prefix)' },
      { german: 'Wir haben an der Uni studiert.',     english: 'We studied at university.',       note: 'studieren → studiert (no ge-, -ieren verb)' },
      { german: 'Hast du eingekauft?',                english: 'Did you go shopping?',            note: 'einkaufen → eingekauft (separable: ge- inside)' },
      { german: 'Sie hat das Fenster aufgemacht.',    english: 'She opened the window.',          note: 'aufmachen → aufgemacht (separable)' },
    ],
    commonMistake:
      'Wrong: "Ich habe gestudiert." Correct: "Ich habe studiert." — verbs ending in "-ieren" never add "ge-" in the participle.',
  },

  // ─── 9. Präteritum: sein / haben / modals ────────────────────────────────────
  {
    topic: 'Präteritum: sein / haben / modals',
    level: 'A2',
    title: 'Präteritum: sein, haben and modals',
    explanation:
      'While the Perfekt is the normal past tense in spoken German, "sein", "haben", and the modal verbs are almost always used in the Präteritum (simple past) instead — even in conversation. Saying "Ich hatte Hunger" sounds natural; "Ich habe Hunger gehabt" sounds clunky.\n\n' +
      'Sein Präteritum: ich war, du warst, er war, wir waren, ihr wart, sie waren.\n' +
      'Haben Präteritum: ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten.\n\n' +
      'Modal Präteritum: remove the umlaut from the infinitive and add the Präteritum endings (-te, -test, -te, -ten, -tet, -ten). Examples: können → konnte, müssen → musste, wollen → wollte, dürfen → durfte, sollen → sollte.',
    keyPoints: [
      'sein: war / warst / war / waren / wart / waren',
      'haben: hatte / hattest / hatte / hatten / hattet / hatten',
      'Modal pattern: remove umlaut + add -te endings (konnte, musste, wollte)',
      'Use these in Präteritum even in casual speech — Perfekt sounds unnatural here',
      'Other verbs use Perfekt in speech — Präteritum is mainly written/formal for them',
    ],
    examples: [
      { german: 'Ich war gestern krank.',             english: 'I was ill yesterday.',            note: 'sein Präteritum: war' },
      { german: 'Das Wetter war schön.',              english: 'The weather was nice.',           note: 'sein Präteritum: war' },
      { german: 'Er hatte keine Zeit.',               english: 'He had no time.',                 note: 'haben Präteritum: hatte' },
      { german: 'Wir konnten nicht kommen.',          english: 'We couldn\'t come.',              note: 'können → konnte' },
      { german: 'Sie musste früh aufstehen.',         english: 'She had to get up early.',        note: 'müssen → musste' },
      { german: 'Ich wollte dich anrufen.',           english: 'I wanted to call you.',           note: 'wollen → wollte' },
    ],
    commonMistake:
      'Wrong: "Ich habe gestern krank gewesen." Correct: "Ich war gestern krank." — always use the Präteritum form for "sein" in the past. Using Perfekt here sounds unnatural.',
  },

  // ─── 10. Reflexive verbs ─────────────────────────────────────────────────────
  {
    topic: 'Reflexive verbs',
    level: 'A2',
    title: 'Reflexive verbs — A2 patterns',
    buildingOn: 'A1 reflexive verbs (sich vorstellen, sich fühlen, sich freuen) using Akkusativ reflexive pronouns',
    explanation:
      'At A2, reflexive verbs expand in two directions. First, some verbs take a Dativ reflexive pronoun instead of Akkusativ — this happens when there is already a direct object in the sentence. Compare: "Ich wasche mich" (Akkusativ, no other object) vs "Ich wasche mir die Hände" (Dativ, because "die Hände" is the direct object).\n\n' +
      'The Dativ reflexive pronouns are: mir, dir, sich, uns, euch, sich — same as Akkusativ except ich → mir and du → dir.\n\n' +
      'Second, some verbs change meaning depending on whether they are used reflexively or not: sich erinnern (to remember) vs erinnern (to remind someone); sich vorstellen (to introduce oneself / to imagine) vs vorstellen (to introduce someone else).',
    keyPoints: [
      'Dativ reflexive: mir / dir / sich / uns / euch / sich',
      'Use Dativ reflexive when there is already a direct object: mir die Hände waschen',
      'Use Akkusativ when the reflexive pronoun IS the direct object: ich wasche mich',
      'Meaning-changing pairs: sich erinnern (remember) vs erinnern (remind)',
      'sich vorstellen = introduce oneself OR imagine; vorstellen = introduce s.o. else',
    ],
    examples: [
      { german: 'Ich wasche mir die Hände.',           english: 'I wash my hands.',                note: 'Dativ: mir (die Hände = direct object)' },
      { german: 'Er putzt sich die Zähne.',            english: 'He brushes his teeth.',           note: 'Dativ: sich (die Zähne = direct object)' },
      { german: 'Ich wasche mich.',                    english: 'I wash myself.',                  note: 'Akkusativ: mich (no other object)' },
      { german: 'Kannst du dich an ihn erinnern?',    english: 'Can you remember him?',            note: 'sich erinnern an = to remember' },
      { german: 'Ich kann mir das nicht vorstellen.', english: 'I cannot imagine that.',           note: 'sich vorstellen = to imagine (Dativ)' },
      { german: 'Sie hat sich die Haare gekämmt.',    english: 'She combed her hair.',             note: 'Dativ reflexive in Perfekt' },
    ],
    commonMistake:
      'Wrong: "Ich wasche mich die Hände." Correct: "Ich wasche mir die Hände." — when there is a direct object (die Hände), the reflexive pronoun must be Dativ (mir), not Akkusativ (mich).',
  },

  // ─── 11. Subordinate clauses: weil / dass ────────────────────────────────────
  {
    topic: 'Subordinate clauses: weil / dass',
    level: 'A2',
    title: 'Subordinate clauses: weil and dass',
    explanation:
      'Subordinate clauses are introduced by conjunctions like "weil" (because) and "dass" (that). The crucial rule: in a subordinate clause, the conjugated verb moves to the very end.\n\n' +
      '"Weil" explains a reason: "Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte." "Möchte" is at the end. "Dass" introduces a statement or fact: "Ich glaube, dass er krank ist." "Ist" is at the end.\n\n' +
      'Two clauses are separated by a comma in German — always. The main clause and subordinate clause are also structurally independent: a subordinate clause cannot stand alone as a sentence.',
    keyPoints: [
      'Verb goes to the END in subordinate clauses (weil, dass, ob, wenn, obwohl…)',
      'Always separate the subordinate clause with a comma',
      '"weil" = because (gives a reason)',
      '"dass" = that (introduces a statement, opinion, or fact)',
      'With modal verbs at the end: modal goes last, infinitive just before it',
    ],
    examples: [
      { german: 'Ich lerne Deutsch, weil ich Deutschland liebe.',    english: 'I learn German because I love Germany.',       note: 'weil → verb at end' },
      { german: 'Er bleibt zu Hause, weil er krank ist.',           english: 'He stays at home because he is ill.',          note: 'weil → ist at end' },
      { german: 'Ich denke, dass sie Recht hat.',                   english: 'I think that she is right.',                   note: 'dass → hat at end' },
      { german: 'Er sagt, dass er morgen kommen wird.',             english: 'He says that he will come tomorrow.',          note: 'dass + modal: wird at very end' },
      { german: 'Ich weiß nicht, ob er kommt.',                    english: 'I don\'t know if he is coming.',               note: 'ob (whether) = same rule' },
      { german: 'Sie ist traurig, weil ihr Hund krank ist.',       english: 'She is sad because her dog is ill.',           note: 'weil → verb at end' },
    ],
    commonMistake:
      'Wrong: "Ich lerne Deutsch, weil ich liebe Deutschland." Correct: "Ich lerne Deutsch, weil ich Deutschland liebe." — after "weil", the verb must go to the end of the clause.',
  },

  // ─── 12. Two-way prepositions ────────────────────────────────────────────────
  {
    topic: 'Two-way prepositions',
    level: 'A2',
    title: 'Two-way prepositions',
    explanation:
      'Nine prepositions can take either Akkusativ or Dativ depending on meaning: an, auf, hinter, in, neben, über, unter, vor, zwischen.\n\n' +
      'The rule: use Akkusativ for movement towards a destination (answering "Wohin?"), and Dativ for a static location (answering "Wo?"). "Ich lege das Buch auf den Tisch" (Akkusativ — I\'m putting it there, movement). "Das Buch liegt auf dem Tisch" (Dativ — it is already there, static).\n\n' +
      'A quick memory trick: movement = Akkusativ (think: A for Action); static location = Dativ (think: D for Dwelling). Two very common contracted forms: in + dem = im, in + das = ins; an + dem = am, an + das = ans.',
    keyPoints: [
      'Two-way prepositions: an, auf, hinter, in, neben, über, unter, vor, zwischen',
      'Wohin? (where to?) → Akkusativ: Ich gehe in den Park.',
      'Wo? (where?) → Dativ: Ich bin im Park.',
      'Common contractions: in+dem=im, in+das=ins, an+dem=am, an+das=ans',
      'Verbs of placing (legen, stellen, hängen) → Akkusativ; verbs of being (liegen, stehen, hängen) → Dativ',
    ],
    examples: [
      { german: 'Ich lege das Buch auf den Tisch.',    english: 'I put the book on the table.',     note: 'Wohin? → Akkusativ: den Tisch' },
      { german: 'Das Buch liegt auf dem Tisch.',       english: 'The book is on the table.',        note: 'Wo? → Dativ: dem Tisch' },
      { german: 'Wir gehen ins Kino.',                 english: 'We are going to the cinema.',      note: 'in + das = ins (Akkusativ)' },
      { german: 'Wir sind im Kino.',                   english: 'We are at the cinema.',            note: 'in + dem = im (Dativ)' },
      { german: 'Er hängt das Bild an die Wand.',      english: 'He hangs the picture on the wall.', note: 'Wohin? → Akkusativ: die Wand' },
      { german: 'Das Bild hängt an der Wand.',         english: 'The picture is hanging on the wall.', note: 'Wo? → Dativ: der Wand' },
    ],
    commonMistake:
      'Wrong: "Ich gehe in dem Park." Correct: "Ich gehe in den Park." — going somewhere is movement (Wohin?), so use Akkusativ. "In dem" (Dativ) would only be correct if you were already there.',
  },

];
