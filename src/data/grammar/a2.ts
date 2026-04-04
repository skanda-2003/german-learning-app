// a2.ts — Grammar exercises for A2 level.
// Topics covered: Perfekt (regular verbs), Perfekt (irregular verbs), Perfekt (haben vs sein),
//   Präteritum (sein/haben/modals), adjective endings after definite articles,
//   adjective endings after indefinite articles, two-way prepositions,
//   reflexive verbs, subordinate clauses (weil/dass), comparative & superlative,
//   infinitive with zu, future tense with werden.
// Each exercise is one line to keep the file compact.

import { GrammarExercise } from './types';

export const A2_GRAMMAR: GrammarExercise[] = [

  // --- Perfekt: regular verbs (haben + ge...t) ---
  // Regular past participle: ge- + verb stem + -t  (machen → gemacht, kaufen → gekauft)
  { id: 'a2_gr_001', topic: 'Perfekt: regular verbs', type: 'fill-blank',       question: 'Ich ___ gestern Fußball gespielt.',                                   answer: 'habe',     explanation: 'Perfekt uses haben/sein + past participle. With "ich" → habe. "spielen" is regular → gespielt.' },
  { id: 'a2_gr_002', topic: 'Perfekt: regular verbs', type: 'fill-blank',       question: 'Er ___ ein Buch gekauft.',                                            answer: 'hat',      explanation: '"kaufen" is regular → gekauft. With "er" the auxiliary is hat.' },
  { id: 'a2_gr_003', topic: 'Perfekt: regular verbs', type: 'fill-blank',       question: 'Wir ___ zusammen gekocht.',                                           answer: 'haben',    explanation: '"kochen" is regular → gekocht. With "wir" → haben.' },
  { id: 'a2_gr_004', topic: 'Perfekt: regular verbs', type: 'fill-blank',       question: 'Das Partizip II von "machen" ist ___.',                               answer: 'gemacht',  explanation: 'Regular verbs form the past participle: ge- + stem + -t → ge-mach-t = gemacht.' },
  { id: 'a2_gr_005', topic: 'Perfekt: regular verbs', type: 'fill-blank',       question: 'Das Partizip II von "lernen" ist ___.',                               answer: 'gelernt',  explanation: 'ge- + lern + -t = gelernt.' },
  { id: 'a2_gr_006', topic: 'Perfekt: regular verbs', type: 'multiple-choice',  question: 'Welches Partizip II ist korrekt für "arbeiten"?',                     options: ['gearbeit', 'gearbeitet', 'gearbeitt', 'arbeitet'], answer: 'gearbeitet', explanation: 'Stems ending in -t or -d add -et: arbeit + -et = gearbeitet.' },
  { id: 'a2_gr_007', topic: 'Perfekt: regular verbs', type: 'multiple-choice',  question: 'Sie ___ die Frage gestellt.',                                         options: ['habe', 'hast', 'hat', 'haben'], answer: 'hat', explanation: '"stellen" is regular → gestellt. "Sie" (she) → hat.' },
  { id: 'a2_gr_008', topic: 'Perfekt: regular verbs', type: 'multiple-choice',  question: 'Welches ist das richtige Partizip II von "kochen"?',                  options: ['gekochen', 'hat gekocht', 'gekocht', 'kochte'], answer: 'gekocht', explanation: 'Past participle only: ge- + koch + -t = gekocht. The auxiliary (hat) is separate.' },

  // --- Perfekt: irregular verbs (strong verbs, haben + ge...en) ---
  // Irregular past participles must be memorised — they often end in -en and change the stem vowel.
  { id: 'a2_gr_009', topic: 'Perfekt: irregular verbs', type: 'fill-blank',      question: 'Er hat den Brief ___. (schreiben)',                                  answer: 'geschrieben', explanation: '"schreiben" is irregular: ge- + schrieb + -en = geschrieben.' },
  { id: 'a2_gr_010', topic: 'Perfekt: irregular verbs', type: 'fill-blank',      question: 'Sie hat das Buch ___. (lesen)',                                      answer: 'gelesen',  explanation: '"lesen" is irregular: ge- + les + -en = gelesen.' },
  { id: 'a2_gr_011', topic: 'Perfekt: irregular verbs', type: 'fill-blank',      question: 'Ich habe Wasser ___. (trinken)',                                     answer: 'getrunken', explanation: '"trinken" is irregular: ge- + trunk + -en = getrunken (vowel change i → u).' },
  { id: 'a2_gr_012', topic: 'Perfekt: irregular verbs', type: 'fill-blank',      question: 'Wir haben Pizza ___. (essen)',                                       answer: 'gegessen', explanation: '"essen" is irregular: ge- + gess + -en = gegessen.' },
  { id: 'a2_gr_013', topic: 'Perfekt: irregular verbs', type: 'multiple-choice', question: 'Partizip II von "sehen"?',                                           options: ['gesehen', 'geseht', 'gesahen', 'sieht'], answer: 'gesehen', explanation: '"sehen" → gesehen (irregular, -ehen verbs keep the vowel pattern).' },
  { id: 'a2_gr_014', topic: 'Perfekt: irregular verbs', type: 'multiple-choice', question: 'Partizip II von "nehmen"?',                                          options: ['genommen', 'genehmigt', 'genehmt', 'genimmt'], answer: 'genommen', explanation: '"nehmen" → genommen (vowel change e → o).' },
  { id: 'a2_gr_015', topic: 'Perfekt: irregular verbs', type: 'fill-blank',      question: 'Er hat mir ___. (helfen)',                                           answer: 'geholfen', explanation: '"helfen" → geholfen (vowel change e → o).' },
  { id: 'a2_gr_016', topic: 'Perfekt: irregular verbs', type: 'multiple-choice', question: '"sprechen" im Perfekt mit "er":',                                    options: ['hat gesprochen', 'hat gespricht', 'hat gesprachen', 'ist gesprochen'], answer: 'hat gesprochen', explanation: '"sprechen" → gesprochen (vowel change e → o). Uses haben.' },

  // --- Perfekt: haben vs sein ---
  // Verbs of motion or change of state (gehen, fahren, kommen, laufen, fliegen, fallen, werden, bleiben) use SEIN.
  // Most other verbs use HABEN.
  { id: 'a2_gr_017', topic: 'Perfekt: haben vs sein', type: 'fill-blank',        question: 'Ich ___ nach Hause gegangen.',                                       answer: 'bin',      explanation: '"gehen" = movement with no destination object → uses sein. Ich → bin.' },
  { id: 'a2_gr_018', topic: 'Perfekt: haben vs sein', type: 'fill-blank',        question: 'Er ___ nach Berlin gefahren.',                                       answer: 'ist',      explanation: '"fahren" as intransitive movement → uses sein. Er → ist.' },
  { id: 'a2_gr_019', topic: 'Perfekt: haben vs sein', type: 'fill-blank',        question: 'Wir ___ um 8 Uhr angekommen.',                                       answer: 'sind',     explanation: '"ankommen" (to arrive) = change of state → uses sein. Wir → sind.' },
  { id: 'a2_gr_020', topic: 'Perfekt: haben vs sein', type: 'fill-blank',        question: 'Das Kind ___ hingefallen.',                                          answer: 'ist',      explanation: '"fallen" = change of state → uses sein. Das Kind → ist.' },
  { id: 'a2_gr_021', topic: 'Perfekt: haben vs sein', type: 'multiple-choice',   question: '"kommen" im Perfekt mit "wir":',                                     options: ['wir sind gekommen', 'wir haben gekommen', 'wir sind gekommt', 'wir haben gekommt'], answer: 'wir sind gekommen', explanation: '"kommen" = movement verb → uses sein. "kommen" is irregular → gekommen.' },
  { id: 'a2_gr_022', topic: 'Perfekt: haben vs sein', type: 'multiple-choice',   question: 'Welches Verb benutzt "sein" im Perfekt?',                            options: ['bleiben', 'essen', 'lesen', 'machen'], answer: 'bleiben', explanation: '"bleiben" (to stay) = change of state → uses sein: ich bin geblieben.' },
  { id: 'a2_gr_023', topic: 'Perfekt: haben vs sein', type: 'multiple-choice',   question: 'Er ___ in Berlin geblieben.',                                        options: ['ist', 'hat', 'war', 'sein'], answer: 'ist', explanation: '"bleiben" uses sein in the Perfekt.' },
  { id: 'a2_gr_024', topic: 'Perfekt: haben vs sein', type: 'multiple-choice',   question: 'Sie ___ das Fenster geöffnet.',                                      options: ['hat', 'ist', 'bin', 'sind'], answer: 'hat', explanation: '"öffnen" (to open) = action verb with object → uses haben.' },

  // --- Präteritum: sein, haben, modal verbs ---
  // In spoken German, sein and haben are usually used in Präteritum (not Perfekt).
  // Modals too: ich konnte, ich musste, ich wollte, ich durfte, ich sollte.
  // sein: ich war, du warst, er/sie/es war, wir waren, ihr wart, sie/Sie waren
  // haben: ich hatte, du hattest, er/sie/es hatte, wir hatten, ihr hattet, sie/Sie hatten
  { id: 'a2_gr_025', topic: 'Präteritum: sein / haben / modals', type: 'fill-blank',      question: 'Ich ___ gestern sehr müde. (sein)',                         answer: 'war',      explanation: 'Sein in Präteritum: ich war, du warst, er/sie/es war, wir waren, ihr wart, sie waren.' },
  { id: 'a2_gr_026', topic: 'Präteritum: sein / haben / modals', type: 'fill-blank',      question: 'Er ___ kein Geld. (haben)',                                 answer: 'hatte',    explanation: 'Haben in Präteritum: ich hatte, du hattest, er/sie/es hatte, wir hatten, ihr hattet, sie hatten.' },
  { id: 'a2_gr_027', topic: 'Präteritum: sein / haben / modals', type: 'fill-blank',      question: 'Wir ___ in Berlin. (sein)',                                 answer: 'waren',    explanation: '"wir" + sein → waren.' },
  { id: 'a2_gr_028', topic: 'Präteritum: sein / haben / modals', type: 'fill-blank',      question: 'Sie ___ keine Zeit. (haben, she)',                          answer: 'hatte',    explanation: '"sie" (she) + haben → hatte.' },
  { id: 'a2_gr_029', topic: 'Präteritum: sein / haben / modals', type: 'multiple-choice', question: '"ich konnte" ist das Präteritum von:',                       options: ['können', 'kommen', 'kennen', 'kochen'], answer: 'können', explanation: 'Können in Präteritum: ich konnte, du konntest, er konnte, wir konnten.' },
  { id: 'a2_gr_030', topic: 'Präteritum: sein / haben / modals', type: 'fill-blank',      question: 'Ich ___ nicht schlafen. (können, Präteritum)',               answer: 'konnte',   explanation: 'können → konnte (Präteritum, 1st person singular).' },
  { id: 'a2_gr_031', topic: 'Präteritum: sein / haben / modals', type: 'fill-blank',      question: 'Er ___ früh aufstehen. (müssen, Präteritum)',                answer: 'musste',   explanation: 'müssen → musste (Präteritum). Note: no umlaut in Präteritum forms.' },
  { id: 'a2_gr_032', topic: 'Präteritum: sein / haben / modals', type: 'multiple-choice', question: '"wir hatten" — welches Verb ist das?',                       options: ['haben', 'sein', 'halten', 'hassen'], answer: 'haben', explanation: '"hatten" is the Präteritum of "haben" (wir-form). "halten" would be "hielten".' },

  // --- Adjective endings: after definite articles (weak declension) ---
  // After der/die/das/die (def. article), use mostly -en endings.
  // Exceptions: Nominative singular and Accusative f/n singular → -e
  // Pattern: m/f/n Nom → -e  |  m Akk → -en  |  all Dat/Gen and plurals → -en
  { id: 'a2_gr_033', topic: 'Adjective endings: definite articles', type: 'multiple-choice', question: 'Der ___ Mann kommt. (alt)',               options: ['alte', 'alten', 'altem', 'alter'], answer: 'alte',   explanation: 'After "der" (Nom, masculine) the adjective ends in -e: der alte Mann.' },
  { id: 'a2_gr_034', topic: 'Adjective endings: definite articles', type: 'multiple-choice', question: 'Die ___ Frau lächelt. (jung)',             options: ['junge', 'jungen', 'junger', 'jungem'], answer: 'junge', explanation: 'After "die" (Nom, feminine) the adjective ends in -e: die junge Frau.' },
  { id: 'a2_gr_035', topic: 'Adjective endings: definite articles', type: 'multiple-choice', question: 'Das ___ Kind schläft. (klein)',            options: ['kleine', 'kleines', 'kleinen', 'kleinem'], answer: 'kleine', explanation: 'After "das" (Nom, neuter) the adjective ends in -e: das kleine Kind.' },
  { id: 'a2_gr_036', topic: 'Adjective endings: definite articles', type: 'fill-blank',       question: 'Ich sehe den alt___ Mann.',               answer: 'en',     explanation: 'After "den" (Akk, masculine) the adjective ends in -en: den alten Mann.' },
  { id: 'a2_gr_037', topic: 'Adjective endings: definite articles', type: 'fill-blank',       question: 'Er wohnt in der groß___ Stadt.',          answer: 'en',     explanation: 'After "der" (Dat, feminine) the adjective ends in -en: in der großen Stadt.' },
  { id: 'a2_gr_038', topic: 'Adjective endings: definite articles', type: 'multiple-choice',  question: 'Die ___ Kinder spielen. (klein)',         options: ['kleinen', 'kleine', 'kleiner', 'kleines'], answer: 'kleinen', explanation: 'Plural always takes -en after the definite article: die kleinen Kinder.' },
  { id: 'a2_gr_039', topic: 'Adjective endings: definite articles', type: 'fill-blank',       question: 'Mit dem jung___ Mann habe ich gesprochen.', answer: 'en',   explanation: 'After "dem" (Dat, masculine) the adjective ends in -en.' },
  { id: 'a2_gr_040', topic: 'Adjective endings: definite articles', type: 'multiple-choice',  question: 'Das ist das neu___ Modell. (neu)',        options: ['neue', 'neues', 'neuen', 'neuem'], answer: 'neue', explanation: 'After "das" (Nom/Akk, neuter) the adjective ends in -e: das neue Modell.' },

  // --- Adjective endings: after indefinite articles (mixed declension) ---
  // After ein/eine/ein, the adjective must show the gender that ein doesn't show itself.
  // m Nom → -er (ein alter Mann)  |  n Nom/Akk → -es (ein altes Haus)
  // f Nom/Akk → -e (eine alte Frau)  |  m Akk → -en (einen alten Mann)
  // All Dativ forms → -en
  { id: 'a2_gr_041', topic: 'Adjective endings: indefinite articles', type: 'multiple-choice', question: 'Das ist ein alt___ Mann.',               options: ['alter', 'alte', 'alten', 'altem'], answer: 'alter',  explanation: 'After "ein" (Nom, masculine) the adjective shows the gender: -er. Ein alter Mann.' },
  { id: 'a2_gr_042', topic: 'Adjective endings: indefinite articles', type: 'multiple-choice', question: 'Das ist eine alt___ Frau.',              options: ['alte', 'alter', 'alten', 'altem'], answer: 'alte',   explanation: 'After "eine" (Nom, feminine) the adjective ends in -e: eine alte Frau.' },
  { id: 'a2_gr_043', topic: 'Adjective endings: indefinite articles', type: 'multiple-choice', question: 'Das ist ein alt___ Haus.',               options: ['altes', 'alte', 'alten', 'altem'], answer: 'altes',  explanation: 'After "ein" (Nom, neuter) the adjective shows the gender: -es. Ein altes Haus.' },
  { id: 'a2_gr_044', topic: 'Adjective endings: indefinite articles', type: 'fill-blank',       question: 'Ich habe einen neu___ Computer gekauft.', answer: 'en',  explanation: 'After "einen" (Akk, masculine) the adjective ends in -en: einen neuen Computer.' },
  { id: 'a2_gr_045', topic: 'Adjective endings: indefinite articles', type: 'fill-blank',       question: 'Sie hat eine klein___ Wohnung.',          answer: 'e',   explanation: 'After "eine" (Akk, feminine) the adjective ends in -e: eine kleine Wohnung.' },
  { id: 'a2_gr_046', topic: 'Adjective endings: indefinite articles', type: 'fill-blank',       question: 'Er kauft ein gut___ Buch.',               answer: 'es',  explanation: 'After "ein" (Akk, neuter) the adjective ends in -es: ein gutes Buch.' },
  { id: 'a2_gr_047', topic: 'Adjective endings: indefinite articles', type: 'multiple-choice',  question: 'Ich helfe einem alt___ Mann.',            options: ['alten', 'alter', 'alte', 'altem'], answer: 'alten', explanation: 'After "einem" (Dativ, masculine) the adjective always ends in -en.' },
  { id: 'a2_gr_048', topic: 'Adjective endings: indefinite articles', type: 'multiple-choice',  question: 'Er wohnt in einer schön___ Wohnung.',    options: ['schönen', 'schöne', 'schöner', 'schönem'], answer: 'schönen', explanation: 'After "einer" (Dativ, feminine) the adjective ends in -en.' },

  // --- Two-way prepositions (Wechselpräpositionen) ---
  // in, an, auf, über, unter, neben, hinter, vor, zwischen
  // Movement (Wohin? = where to?) → Akkusativ
  // Location (Wo? = where?) → Dativ
  { id: 'a2_gr_049', topic: 'Two-way prepositions', type: 'multiple-choice',  question: 'Ich lege das Buch auf ___ Tisch. (Wohin? → Akkusativ)',                options: ['den', 'dem', 'der', 'das'], answer: 'den', explanation: '"auf" + Akkusativ (movement/placement). "der Tisch" is masculine → Akk: den Tisch.' },
  { id: 'a2_gr_050', topic: 'Two-way prepositions', type: 'multiple-choice',  question: 'Das Buch liegt auf ___ Tisch. (Wo? → Dativ)',                          options: ['dem', 'den', 'der', 'das'], answer: 'dem', explanation: '"auf" + Dativ (location). "der Tisch" is masculine → Dat: dem Tisch.' },
  { id: 'a2_gr_051', topic: 'Two-way prepositions', type: 'fill-blank',        question: 'Er geht in ___ Küche. (die Küche, Wohin? → Akkusativ)',               answer: 'die',  explanation: '"in" + Akkusativ (movement). "die Küche" is feminine → Akk: die Küche (no change for die).' },
  { id: 'a2_gr_052', topic: 'Two-way prepositions', type: 'fill-blank',        question: 'Er ist in ___ Küche. (die Küche, Wo? → Dativ)',                       answer: 'der',  explanation: '"in" + Dativ (location). "die Küche" is feminine → Dat: der Küche.' },
  { id: 'a2_gr_053', topic: 'Two-way prepositions', type: 'multiple-choice',   question: 'Sie hängt das Bild an ___ Wand. (die Wand, Wohin? → Akkusativ)',      options: ['die', 'der', 'das', 'dem'], answer: 'die', explanation: '"an" + Akkusativ (putting it there). "die Wand" is feminine → Akk: die Wand.' },
  { id: 'a2_gr_054', topic: 'Two-way prepositions', type: 'multiple-choice',   question: 'Das Bild hängt an ___ Wand. (die Wand, Wo? → Dativ)',                 options: ['der', 'die', 'das', 'dem'], answer: 'der', explanation: '"an" + Dativ (location). "die Wand" → Dat: der Wand.' },
  { id: 'a2_gr_055', topic: 'Two-way prepositions', type: 'fill-blank',        question: 'Das Kind sitzt unter ___ Tisch. (der Tisch, Wo? → Dativ)',            answer: 'dem',  explanation: '"unter" + Dativ (location). "der Tisch" → Dat: dem Tisch.' },
  { id: 'a2_gr_056', topic: 'Two-way prepositions', type: 'multiple-choice',   question: '"Das Buch liegt auf dem Tisch." — Wo oder Wohin?',                    options: ['Wo (location)', 'Wohin (movement)', 'Woher (origin)', 'Wie (how)'], answer: 'Wo (location)', explanation: '"liegt" describes a static location (Wo?) → Dativ: auf dem Tisch.' },

  // --- Reflexive verbs ---
  // Reflexive verbs use a reflexive pronoun (mich, dich, sich, uns, euch, sich).
  // Common reflexive verbs: sich waschen, sich freuen, sich ärgern, sich vorstellen, sich erinnern, sich setzen.
  { id: 'a2_gr_057', topic: 'Reflexive verbs', type: 'fill-blank',       question: 'Ich wasche ___ jeden Morgen.',                                              answer: 'mich',  explanation: 'The reflexive pronoun for "ich" is "mich".' },
  { id: 'a2_gr_058', topic: 'Reflexive verbs', type: 'fill-blank',       question: 'Du wäschst ___ jeden Abend.',                                               answer: 'dich',  explanation: 'The reflexive pronoun for "du" is "dich".' },
  { id: 'a2_gr_059', topic: 'Reflexive verbs', type: 'fill-blank',       question: 'Er wäscht ___.',                                                            answer: 'sich',  explanation: 'The reflexive pronoun for "er/sie/es" is "sich".' },
  { id: 'a2_gr_060', topic: 'Reflexive verbs', type: 'fill-blank',       question: 'Wir setzen ___ auf die Bank.',                                              answer: 'uns',   explanation: 'The reflexive pronoun for "wir" is "uns".' },
  { id: 'a2_gr_061', topic: 'Reflexive verbs', type: 'multiple-choice',  question: '"Sich vorstellen" bedeutet (in a social context):',                        options: ['to introduce oneself', 'to stand up', 'to sit down', 'to remember'], answer: 'to introduce oneself', explanation: '"Sich vorstellen" = to introduce oneself. "Ich stelle mich vor." (I introduce myself.)' },
  { id: 'a2_gr_062', topic: 'Reflexive verbs', type: 'fill-blank',       question: 'Ich freue ___ auf den Urlaub.',                                             answer: 'mich',  explanation: '"sich freuen auf" = to look forward to. With "ich" → mich.' },
  { id: 'a2_gr_063', topic: 'Reflexive verbs', type: 'multiple-choice',  question: 'Das richtige Reflexivpronomen für "wir":',                                 options: ['uns', 'euch', 'sich', 'mich'], answer: 'uns', explanation: 'Reflexive pronouns: ich→mich, du→dich, er/sie/es→sich, wir→uns, ihr→euch, sie/Sie→sich.' },
  { id: 'a2_gr_064', topic: 'Reflexive verbs', type: 'fill-blank',       question: 'Sie ärgert ___ über das Wetter.',                                           answer: 'sich',  explanation: '"sich ärgern über" = to be annoyed about. "Sie" (she) → sich.' },

  // --- Subordinate clauses: weil and dass ---
  // "weil" (because) and "dass" (that) are subordinating conjunctions.
  // In a subordinate clause the VERB goes to the END.
  // With a modal verb + infinitive: both go to the end, infinitive before modal → "weil er kommen kann"
  { id: 'a2_gr_065', topic: 'Subordinate clauses: weil / dass', type: 'multiple-choice',  question: 'Welcher Satz ist korrekt?',   options: ['Ich bleibe zu Hause, weil ich krank bin.', 'Ich bleibe zu Hause, weil ich bin krank.', 'Ich bleibe zu Hause, weil bin ich krank.', 'Ich bleibe zu Hause, weil krank bin ich.'], answer: 'Ich bleibe zu Hause, weil ich krank bin.', explanation: 'After "weil" the verb goes to the end of the clause: ...weil ich krank BIN.' },
  { id: 'a2_gr_066', topic: 'Subordinate clauses: weil / dass', type: 'multiple-choice',  question: 'Welcher Satz ist korrekt?',   options: ['Er sagt, dass er morgen kommt.', 'Er sagt, dass er kommt morgen.', 'Er sagt, dass morgen kommt er.', 'Er sagt, er kommt dass morgen.'], answer: 'Er sagt, dass er morgen kommt.', explanation: 'After "dass" the verb goes to the end: ...dass er morgen KOMMT.' },
  { id: 'a2_gr_067', topic: 'Subordinate clauses: weil / dass', type: 'fill-blank',        question: 'Ich lerne Deutsch, weil ich nach Deutschland fahren ___.',   answer: 'will',  explanation: 'Modal verb "wollen" goes to the end: ...fahren will. (infinitive + modal at the end)' },
  { id: 'a2_gr_068', topic: 'Subordinate clauses: weil / dass', type: 'fill-blank',        question: 'Sie weiß, dass er krank ___.',                               answer: 'ist',   explanation: 'After "dass" the verb goes to the end: ...dass er krank ist.' },
  { id: 'a2_gr_069', topic: 'Subordinate clauses: weil / dass', type: 'multiple-choice',   question: '"Ich glaube, dass..." — das Verb in diesem Satz steht am:',  options: ['Ende des Satzes', 'Anfang', 'zweite Stelle', 'dritte Stelle'], answer: 'Ende des Satzes', explanation: 'In any subordinate clause (after dass, weil, wenn, obwohl, etc.) the verb goes to the end.' },
  { id: 'a2_gr_070', topic: 'Subordinate clauses: weil / dass', type: 'multiple-choice',   question: 'Welche Konjunktion schickt das Verb ans Ende?',               options: ['weil', 'und', 'aber', 'denn'], answer: 'weil', explanation: '"weil" is subordinating → verb to the end. "und", "aber", "denn" are coordinating → verb stays in 2nd position.' },
  { id: 'a2_gr_071', topic: 'Subordinate clauses: weil / dass', type: 'fill-blank',        question: 'Er kommt nicht, weil er arbeiten ___.',                      answer: 'muss',  explanation: 'With a modal: infinitive + modal at the end: ...weil er arbeiten muss.' },
  { id: 'a2_gr_072', topic: 'Subordinate clauses: weil / dass', type: 'multiple-choice',   question: '"Ich weiß, ___ du Recht hast."',                             options: ['dass', 'weil', 'aber', 'wenn'], answer: 'dass', explanation: '"Ich weiß, dass..." = I know that... Use "dass" to introduce a fact or thought.' },

  // --- Comparative and superlative ---
  // Comparative: adjective + -er (schnell → schneller). Irregular: gut → besser, viel → mehr, hoch → höher.
  // Superlative (predicative): am + adjective + -sten (schnell → am schnellsten). Irregular: gut → am besten.
  // Superlative (attributive): definite article + adjective + -ste/-sten: der schnellste Zug, das beste Restaurant.
  { id: 'a2_gr_073', topic: 'Comparative and superlative', type: 'fill-blank',       question: 'Berlin ist ___ als München. (groß → Komparativ)',                answer: 'größer', explanation: 'Komparativ: groß → größer (umlaut change o → ö, + -er).' },
  { id: 'a2_gr_074', topic: 'Comparative and superlative', type: 'fill-blank',       question: 'Er ist ___ als ich. (alt → Komparativ)',                         answer: 'älter',  explanation: 'Komparativ: alt → älter (umlaut a → ä, + -er).' },
  { id: 'a2_gr_075', topic: 'Comparative and superlative', type: 'fill-blank',       question: 'Heute ist es ___ als gestern. (warm → Komparativ)',               answer: 'wärmer', explanation: 'Komparativ: warm → wärmer (umlaut a → ä, + -er).' },
  { id: 'a2_gr_076', topic: 'Comparative and superlative', type: 'fill-blank',       question: 'Der Zug ist ___ als das Auto. (schnell → Komparativ)',            answer: 'schneller', explanation: 'Komparativ: schnell → schneller (no umlaut needed, just add -er).' },
  { id: 'a2_gr_077', topic: 'Comparative and superlative', type: 'multiple-choice',  question: 'Komparativ von "gut":',                                          options: ['besser', 'guter', 'mehr gut', 'güter'], answer: 'besser', explanation: '"gut" → "besser" is irregular. Must be memorised.' },
  { id: 'a2_gr_078', topic: 'Comparative and superlative', type: 'multiple-choice',  question: 'Superlativ von "viel":',                                         options: ['am meisten', 'am vielsten', 'am vielsten', 'am mehrsten'], answer: 'am meisten', explanation: '"viel" → "am meisten" is irregular. Must be memorised.' },
  { id: 'a2_gr_079', topic: 'Comparative and superlative', type: 'multiple-choice',  question: 'Das ist das ___ Restaurant in der Stadt. (gut → Superlativ)',    options: ['beste', 'besser', 'gut', 'guten'], answer: 'beste', explanation: 'Attributive superlative: das beste Restaurant. (gut → best- + adjective ending -e after "das")' },
  { id: 'a2_gr_080', topic: 'Comparative and superlative', type: 'fill-blank',       question: 'Er spricht ___ Deutsch als ich. (gut → Komparativ)',              answer: 'besser', explanation: '"gut" → "besser" in the comparative. Irregular.' },

  // --- Infinitive with zu ---
  // After many verbs (versuchen, vergessen, anfangen, planen, vorhaben, empfehlen) and
  // adjective phrases (es ist wichtig/schön/leicht/schwer) use zu + infinitive.
  // Separable verbs: zu goes between prefix and stem → auf-zu-stehen = aufzustehen.
  { id: 'a2_gr_081', topic: 'Infinitive with zu', type: 'fill-blank',       question: 'Ich versuche, Deutsch ___ lernen.',                                       answer: 'zu',        explanation: 'After "versuchen" use zu + infinitive: ...Deutsch zu lernen.' },
  { id: 'a2_gr_082', topic: 'Infinitive with zu', type: 'fill-blank',       question: 'Es ist wichtig, gesund ___ essen.',                                       answer: 'zu',        explanation: 'After "es ist wichtig" use zu + infinitive: ...gesund zu essen.' },
  { id: 'a2_gr_083', topic: 'Infinitive with zu', type: 'fill-blank',       question: 'Ich vergesse oft, meine Hausaufgaben ___ machen.',                        answer: 'zu',        explanation: 'After "vergessen" use zu + infinitive: ...Hausaufgaben zu machen.' },
  { id: 'a2_gr_084', topic: 'Infinitive with zu', type: 'multiple-choice',  question: '"aufstehen" mit "zu" — welche Form ist korrekt?',                        options: ['aufzustehen', 'zu aufstehen', 'aufstehen zu', 'zu stehen auf'], answer: 'aufzustehen', explanation: 'Separable verbs: "zu" goes between prefix and stem → auf-zu-stehen = aufzustehen.' },
  { id: 'a2_gr_085', topic: 'Infinitive with zu', type: 'fill-blank',       question: 'Ich habe keine Zeit, heute ___ kommen.',                                  answer: 'zu',        explanation: 'After "keine Zeit haben" use zu + infinitive: ...zu kommen.' },
  { id: 'a2_gr_086', topic: 'Infinitive with zu', type: 'multiple-choice',  question: 'Welcher Satz ist korrekt? ("einkaufen" ist trennbar)',                    options: ['Ich plane, morgen einzukaufen.', 'Ich plane, morgen zu einkaufen.', 'Ich plane, einzukaufen morgen.', 'Ich plane morgen einkaufen.'], answer: 'Ich plane, morgen einzukaufen.', explanation: '"einkaufen" is separable → ein-zu-kaufen = einzukaufen. The zu sits inside the verb.' },
  { id: 'a2_gr_087', topic: 'Infinitive with zu', type: 'fill-blank',       question: 'Es macht Spaß, Musik ___ hören.',                                         answer: 'zu',        explanation: 'After "es macht Spaß" use zu + infinitive: ...Musik zu hören.' },
  { id: 'a2_gr_088', topic: 'Infinitive with zu', type: 'multiple-choice',  question: 'Nach "versuchen", "vergessen", "anfangen" benutzt man:',                  options: ['zu + Infinitiv', 'würde + Infinitiv', 'Infinitiv allein', 'ge- + Verb'], answer: 'zu + Infinitiv', explanation: 'These verbs require zu + infinitive: Ich versuche zu schlafen. Ich fange an zu lernen.' },

  // --- Future tense: werden ---
  // werden + Infinitiv (at the end of the clause)
  // Conjugation: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden
  { id: 'a2_gr_089', topic: 'Future tense: werden', type: 'fill-blank',       question: 'Ich ___ morgen kommen.',                                                answer: 'werde',   explanation: 'Future with werden: ich werde + infinitive at end. Conjugation: ich werde.' },
  { id: 'a2_gr_090', topic: 'Future tense: werden', type: 'fill-blank',       question: 'Er ___ nächste Woche arbeiten.',                                         answer: 'wird',    explanation: '"werden" with "er/sie/es" → wird.' },
  { id: 'a2_gr_091', topic: 'Future tense: werden', type: 'fill-blank',       question: 'Wir ___ in den Urlaub fahren.',                                          answer: 'werden',  explanation: '"werden" with "wir" → werden.' },
  { id: 'a2_gr_092', topic: 'Future tense: werden', type: 'fill-blank',       question: 'Du ___ das verstehen.',                                                  answer: 'wirst',   explanation: '"werden" with "du" → wirst.' },
  { id: 'a2_gr_093', topic: 'Future tense: werden', type: 'multiple-choice',  question: '"werden" mit "sie" (they):',                                            options: ['werden', 'wird', 'werdet', 'werde'], answer: 'werden', explanation: '"werden" full conjugation: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden.' },
  { id: 'a2_gr_094', topic: 'Future tense: werden', type: 'multiple-choice',  question: '"Morgen ___ es regnen."',                                               options: ['wird', 'werde', 'werden', 'wirst'], answer: 'wird', explanation: '"es" (weather subject) → wird: Morgen wird es regnen.' },
  { id: 'a2_gr_095', topic: 'Future tense: werden', type: 'fill-blank',       question: 'Ich ___ nächstes Jahr mehr Deutsch lernen.',                             answer: 'werde',   explanation: '"werden" with "ich" → werde. Infinitive "lernen" stays at the end.' },
  { id: 'a2_gr_096', topic: 'Future tense: werden', type: 'multiple-choice',  question: 'In "Ich werde kommen" — wo steht "kommen"?',                           options: ['am Ende des Satzes', 'am Anfang', 'an zweiter Stelle', 'nach "ich"'], answer: 'am Ende des Satzes', explanation: 'werden acts as the auxiliary in 2nd position; the infinitive goes to the end: Ich werde ... kommen.' },

];