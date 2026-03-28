// a1.ts — Grammar exercises for A1 level.
// Topics covered: sein, haben, articles (der/die/das), negation (nicht/kein), word order,
//   indefinite articles, personal pronouns, regular verbs, modal verbs, Akkusativ,
//   possessive articles, questions, separable verbs, plural nouns, imperative, prepositions.
// Each exercise is one line to keep the file compact.

import { GrammarExercise } from './types';

export const A1_GRAMMAR: GrammarExercise[] = [

  // --- Verb conjugation: sein (to be) ---
  // sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind
  { id: 'a1_gr_001', topic: 'Verb conjugation: sein', type: 'fill-blank',        question: 'Ich ___ Student.',                          answer: 'bin',   explanation: '"Sein" (to be) with "ich" (I) → bin.' },
  { id: 'a1_gr_002', topic: 'Verb conjugation: sein', type: 'fill-blank',        question: 'Du ___ sehr nett.',                          answer: 'bist',  explanation: '"Sein" with "du" (you, informal) → bist.' },
  { id: 'a1_gr_003', topic: 'Verb conjugation: sein', type: 'fill-blank',        question: 'Er ___ Arzt.',                               answer: 'ist',   explanation: '"Sein" with "er" (he) → ist.' },
  { id: 'a1_gr_004', topic: 'Verb conjugation: sein', type: 'fill-blank',        question: 'Sie ___ meine Schwester.',                   answer: 'ist',   explanation: '"Sein" with "sie" (she) → ist.' },
  { id: 'a1_gr_005', topic: 'Verb conjugation: sein', type: 'fill-blank',        question: 'Wir ___ müde.',                              answer: 'sind',  explanation: '"Sein" with "wir" (we) → sind.' },
  { id: 'a1_gr_006', topic: 'Verb conjugation: sein', type: 'fill-blank',        question: 'Ihr ___ spät.',                              answer: 'seid',  explanation: '"Sein" with "ihr" (you all, informal) → seid.' },
  { id: 'a1_gr_007', topic: 'Verb conjugation: sein', type: 'fill-blank',        question: 'Sie ___ aus Deutschland.',                   answer: 'sind',  explanation: '"Sein" with "sie" (they) → sind.' },
  { id: 'a1_gr_008', topic: 'Verb conjugation: sein', type: 'multiple-choice',   question: 'Das Kind ___ krank.',                        options: ['bin', 'bist', 'ist', 'sind'], answer: 'ist', explanation: '"Das Kind" is third person singular (like er/sie/es) → ist.' },

  // --- Verb conjugation: haben (to have) ---
  // haben: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben
  { id: 'a1_gr_009', topic: 'Verb conjugation: haben', type: 'fill-blank',       question: 'Ich ___ ein Buch.',                          answer: 'habe',  explanation: '"Haben" (to have) with "ich" → habe.' },
  { id: 'a1_gr_010', topic: 'Verb conjugation: haben', type: 'fill-blank',       question: 'Du ___ einen Hund.',                         answer: 'hast',  explanation: '"Haben" with "du" → hast.' },
  { id: 'a1_gr_011', topic: 'Verb conjugation: haben', type: 'fill-blank',       question: 'Er ___ keine Zeit.',                         answer: 'hat',   explanation: '"Haben" with "er" → hat.' },
  { id: 'a1_gr_012', topic: 'Verb conjugation: haben', type: 'fill-blank',       question: 'Wir ___ Hunger.',                            answer: 'haben', explanation: '"Haben" with "wir" → haben.' },
  { id: 'a1_gr_013', topic: 'Verb conjugation: haben', type: 'fill-blank',       question: 'Ihr ___ viele Freunde.',                     answer: 'habt',  explanation: '"Haben" with "ihr" → habt.' },
  { id: 'a1_gr_014', topic: 'Verb conjugation: haben', type: 'multiple-choice',  question: 'Die Kinder ___ Durst.',                      options: ['habe', 'hast', 'hat', 'haben'], answer: 'haben', explanation: '"Die Kinder" is third person plural (like sie/they) → haben.' },

  // --- Definite articles: der / die / das ---
  // der = masculine, die = feminine, das = neuter
  { id: 'a1_gr_015', topic: 'Definite articles: der/die/das', type: 'multiple-choice', question: 'Was ist richtig? ___ Mann ist groß.',  options: ['der', 'die', 'das', 'den'], answer: 'der', explanation: '"Mann" (man) is masculine → der.' },
  { id: 'a1_gr_016', topic: 'Definite articles: der/die/das', type: 'multiple-choice', question: 'Was ist richtig? ___ Frau arbeitet.',  options: ['der', 'die', 'das', 'dem'], answer: 'die', explanation: '"Frau" (woman) is feminine → die.' },
  { id: 'a1_gr_017', topic: 'Definite articles: der/die/das', type: 'multiple-choice', question: 'Was ist richtig? ___ Kind schläft.',   options: ['der', 'die', 'das', 'den'], answer: 'das', explanation: '"Kind" (child) is neuter → das.' },
  { id: 'a1_gr_018', topic: 'Definite articles: der/die/das', type: 'multiple-choice', question: 'Was ist richtig? ___ Buch ist alt.',   options: ['der', 'die', 'das', 'dem'], answer: 'das', explanation: '"Buch" (book) is neuter → das.' },
  { id: 'a1_gr_019', topic: 'Definite articles: der/die/das', type: 'multiple-choice', question: 'Was ist richtig? ___ Schule ist groß.', options: ['der', 'die', 'das', 'den'], answer: 'die', explanation: '"Schule" (school) is feminine → die.' },
  { id: 'a1_gr_020', topic: 'Definite articles: der/die/das', type: 'multiple-choice', question: 'Was ist richtig? ___ Bus kommt.',      options: ['der', 'die', 'das', 'dem'], answer: 'der', explanation: '"Bus" is masculine → der.' },

  // --- Negation: nicht vs kein ---
  // "nicht" negates verbs and adjectives. "kein/keine/kein" negates nouns (replaces ein/eine/ein).
  { id: 'a1_gr_021', topic: 'Negation: nicht / kein', type: 'multiple-choice',   question: 'Ich habe ___ Auto.',                         options: ['nicht', 'kein', 'keine', 'keinen'], answer: 'kein', explanation: 'Use "kein" to negate a noun. "Auto" is neuter → kein Auto.' },
  { id: 'a1_gr_022', topic: 'Negation: nicht / kein', type: 'multiple-choice',   question: 'Er kommt ___ heute.',                        options: ['nicht', 'kein', 'keine', 'keinen'], answer: 'nicht', explanation: 'Use "nicht" to negate a verb or adverb, not a noun.' },
  { id: 'a1_gr_023', topic: 'Negation: nicht / kein', type: 'multiple-choice',   question: 'Sie hat ___ Schwester.',                     options: ['nicht', 'kein', 'keine', 'keinen'], answer: 'keine', explanation: 'Use "keine" to negate a feminine noun. "Schwester" is feminine → keine.' },
  { id: 'a1_gr_024', topic: 'Negation: nicht / kein', type: 'multiple-choice',   question: 'Das ist ___ richtig.',                       options: ['nicht', 'kein', 'keine', 'keinen'], answer: 'nicht', explanation: 'Use "nicht" to negate an adjective.' },
  { id: 'a1_gr_025', topic: 'Negation: nicht / kein', type: 'multiple-choice',   question: 'Ich trinke ___ Kaffee.',                     options: ['nicht', 'kein', 'keine', 'keinen'], answer: 'keinen', explanation: '"Kaffee" is masculine, and here it is the object (Akkusativ) → keinen.' },

  // --- Basic word order: verb in second position ---
  // In a German statement the verb ALWAYS comes second, no matter what comes first.
  { id: 'a1_gr_026', topic: 'Word order: verb in 2nd position', type: 'multiple-choice', question: 'Which sentence is correct?', options: ['Heute ich gehe in die Schule.', 'Heute gehe ich in die Schule.', 'Heute in die Schule gehe ich.', 'Ich heute gehe in die Schule.'], answer: 'Heute gehe ich in die Schule.', explanation: 'The verb must always be the second element. "Heute" is first, so "gehe" comes second, then the subject "ich".' },
  { id: 'a1_gr_027', topic: 'Word order: verb in 2nd position', type: 'multiple-choice', question: 'Which sentence is correct?', options: ['Morgen ich arbeite.', 'Morgen arbeite ich.', 'Ich morgen arbeite.', 'Arbeite ich morgen.'], answer: 'Morgen arbeite ich.', explanation: '"Morgen" is first → verb "arbeite" must come second → then subject "ich".' },
  { id: 'a1_gr_028', topic: 'Word order: verb in 2nd position', type: 'fill-blank', question: 'In Berlin ___ ich drei Jahre gewohnt. (wohnen → wohnte)',  answer: 'habe', explanation: 'When a time/place expression starts the sentence, the verb still comes second.' },

  // --- Indefinite articles: ein / eine / ein ---
  { id: 'a1_gr_029', topic: 'Indefinite articles: ein/eine', type: 'multiple-choice', question: 'Ich habe ___ Bruder.',                 options: ['ein', 'eine', 'einen', 'einem'], answer: 'einen', explanation: '"Bruder" is masculine. As the object of "haben" (Akkusativ) → einen.' },
  { id: 'a1_gr_030', topic: 'Indefinite articles: ein/eine', type: 'multiple-choice', question: 'Das ist ___ Schule.',                  options: ['ein', 'eine', 'einen', 'einem'], answer: 'eine', explanation: '"Schule" is feminine → eine.' },
  { id: 'a1_gr_031', topic: 'Indefinite articles: ein/eine', type: 'multiple-choice', question: 'Ich lese ___ Buch.',                   options: ['ein', 'eine', 'einen', 'einem'], answer: 'ein', explanation: '"Buch" is neuter. As the object (Akkusativ) → ein (neuter doesn\'t change).' },

  // --- Personal pronouns ---
  // ich, du, er, sie, es, wir, ihr, sie (they), Sie (formal you)
  // These replace nouns in a sentence — the verb form changes with each pronoun.
  { id: 'a1_gr_032', topic: 'Personal pronouns', type: 'multiple-choice',   question: 'Maria kommt aus Spanien. ___ spricht Spanisch.',             options: ['Er', 'Sie', 'Es', 'Wir'],          answer: 'Sie',  explanation: 'Maria is a woman → replace her name with "sie" (she).' },
  { id: 'a1_gr_033', topic: 'Personal pronouns', type: 'multiple-choice',   question: 'Das Buch ist interessant. ___ ist auf dem Tisch.',           options: ['Er', 'Sie', 'Es', 'Wir'],          answer: 'Es',   explanation: '"Buch" is neuter → replace it with "es" (it).' },
  { id: 'a1_gr_034', topic: 'Personal pronouns', type: 'multiple-choice',   question: 'Tom und ich lernen Deutsch. ___ sind Studenten.',            options: ['Ihr', 'Sie', 'Wir', 'Er'],         answer: 'Wir',  explanation: '"Tom und ich" = two people including yourself → "wir" (we).' },
  { id: 'a1_gr_035', topic: 'Personal pronouns', type: 'multiple-choice',   question: 'Der Mann heißt Klaus. ___ ist Lehrer.',                     options: ['Er', 'Sie', 'Es', 'Ihr'],          answer: 'Er',   explanation: '"Mann" is masculine → replace with "er" (he).' },
  { id: 'a1_gr_036', topic: 'Personal pronouns', type: 'multiple-choice',   question: 'You are talking to a group of friends: "Kommt ___ mit?"',   options: ['ich', 'du', 'ihr', 'Sie'],         answer: 'ihr',  explanation: '"Ihr" is used when addressing a group informally (you all).' },
  { id: 'a1_gr_037', topic: 'Personal pronouns', type: 'multiple-choice',   question: 'You are speaking to your boss formally: "___ sprechen sehr gut Deutsch."', options: ['du', 'ihr', 'Sie', 'er'], answer: 'Sie', explanation: '"Sie" (capital S) is the formal "you" — always use it with strangers and in formal settings.' },
  { id: 'a1_gr_038', topic: 'Personal pronouns', type: 'fill-blank',        question: 'Das sind Anna und Lukas. ___ kommen aus Berlin.',            answer: 'Sie',  explanation: 'Two people = they → "sie" (they). Note: same form as formal "Sie" — context tells you which.' },
  { id: 'a1_gr_039', topic: 'Personal pronouns', type: 'fill-blank',        question: 'Ich heiße Max. ___ bin 25 Jahre alt.',                      answer: 'Ich',  explanation: 'The subject of the sentence is still the speaker → "ich" (I).' },

  // --- Regular verb conjugation ---
  // Pattern: infinitive stem + endings: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en
  // Works for most regular verbs: machen, lernen, wohnen, spielen, kaufen, kochen...
  { id: 'a1_gr_040', topic: 'Regular verb conjugation', type: 'fill-blank',       question: 'Ich ___ Deutsch. (lernen)',                                  answer: 'lerne',   explanation: 'Regular verb "lernen": ich + stem "lern" + -e → lerne.' },
  { id: 'a1_gr_041', topic: 'Regular verb conjugation', type: 'fill-blank',       question: 'Du ___ Fußball. (spielen)',                                  answer: 'spielst', explanation: 'Regular verb "spielen": du + stem "spiel" + -st → spielst.' },
  { id: 'a1_gr_042', topic: 'Regular verb conjugation', type: 'fill-blank',       question: 'Er ___ in Berlin. (wohnen)',                                 answer: 'wohnt',   explanation: 'Regular verb "wohnen": er + stem "wohn" + -t → wohnt.' },
  { id: 'a1_gr_043', topic: 'Regular verb conjugation', type: 'fill-blank',       question: 'Wir ___ ein Haus. (kaufen)',                                 answer: 'kaufen',  explanation: 'Regular verb "kaufen": wir + stem "kauf" + -en → kaufen. (Same as infinitive.)' },
  { id: 'a1_gr_044', topic: 'Regular verb conjugation', type: 'fill-blank',       question: 'Ihr ___ zu Hause. (kochen)',                                 answer: 'kocht',   explanation: 'Regular verb "kochen": ihr + stem "koch" + -t → kocht.' },
  { id: 'a1_gr_045', topic: 'Regular verb conjugation', type: 'multiple-choice',  question: 'Was ist richtig? Sie (formal) ___ sehr gut Englisch. (sprechen)', options: ['spreche', 'sprichst', 'sprecht', 'sprechen'], answer: 'sprechen', explanation: '"Sie" (formal you) takes the same ending as "sie" (they) → -en: sprechen.' },
  { id: 'a1_gr_046', topic: 'Regular verb conjugation', type: 'multiple-choice',  question: 'Was ist richtig? Sie (they) ___ zusammen. (arbeiten)',       options: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten'], answer: 'arbeiten', explanation: 'Verbs with a stem ending in -t add -en for sie/they: arbeiten. (The extra "e" keeps it pronounceable.)' },
  { id: 'a1_gr_047', topic: 'Regular verb conjugation', type: 'multiple-choice',  question: 'Was ist richtig? Das Kind ___ gern. (machen)',               options: ['mache', 'machst', 'macht', 'machen'],          answer: 'macht',    explanation: '"Das Kind" = er/sie/es (third person singular) → -t ending: macht.' },

  // --- Modal verbs: können, müssen, wollen, möchten ---
  // Modal verbs are irregular. The main verb they refer to goes to the END of the sentence.
  // können:  ich kann,  du kannst,  er/sie/es kann,  wir können, ihr könnt,  sie/Sie können
  // müssen:  ich muss,  du musst,   er/sie/es muss,  wir müssen, ihr müsst,  sie/Sie müssen
  // wollen:  ich will,  du willst,  er/sie/es will,  wir wollen, ihr wollt,  sie/Sie wollen
  // möchten: ich möchte, du möchtest, er/sie/es möchte, wir möchten, ihr möchtet, sie/Sie möchten
  { id: 'a1_gr_048', topic: 'Modal verbs', type: 'fill-blank',       question: 'Ich ___ gut Deutsch sprechen. (können)',                    answer: 'kann',    explanation: '"Können" (can) with "ich" → kann. The main verb "sprechen" goes to the end.' },
  { id: 'a1_gr_049', topic: 'Modal verbs', type: 'fill-blank',       question: 'Du ___ mehr Wasser trinken. (müssen)',                      answer: 'musst',   explanation: '"Müssen" (must) with "du" → musst. The main verb goes to the end.' },
  { id: 'a1_gr_050', topic: 'Modal verbs', type: 'fill-blank',       question: 'Er ___ nach Hause gehen. (wollen)',                         answer: 'will',    explanation: '"Wollen" (to want to) with "er" → will. Note: "will" in German ≠ English "will" (future).' },
  { id: 'a1_gr_051', topic: 'Modal verbs', type: 'fill-blank',       question: 'Ich ___ einen Kaffee, bitte. (möchten)',                    answer: 'möchte',  explanation: '"Möchten" (would like) with "ich" → möchte. More polite than "wollen".' },
  { id: 'a1_gr_052', topic: 'Modal verbs', type: 'multiple-choice',  question: 'Wir ___ heute ins Kino gehen. (wollen)',                    options: ['will', 'wollt', 'wollen', 'willst'],            answer: 'wollen',  explanation: '"Wollen" with "wir" → wollen.' },
  { id: 'a1_gr_053', topic: 'Modal verbs', type: 'multiple-choice',  question: 'Ihr ___ um 8 Uhr aufstehen. (müssen)',                      options: ['muss', 'musst', 'müssen', 'müsst'],             answer: 'müsst',   explanation: '"Müssen" with "ihr" → müsst.' },
  { id: 'a1_gr_054', topic: 'Modal verbs', type: 'multiple-choice',  question: 'Which sentence is correct?',                                options: ['Ich kann sprechen Deutsch.', 'Ich Deutsch sprechen kann.', 'Ich kann Deutsch sprechen.', 'Kann ich Deutsch sprechen.'], answer: 'Ich kann Deutsch sprechen.', explanation: 'Modal verb goes in position 2. The infinitive ("sprechen") goes to the very end.' },
  { id: 'a1_gr_055', topic: 'Modal verbs', type: 'multiple-choice',  question: 'Sie ___ hier nicht rauchen. (dürfen — may/allowed to)',     options: ['darf', 'darfst', 'dürfen', 'dürft'],           answer: 'dürfen',  explanation: '"Dürfen" (may/to be allowed) with "sie" (they) → dürfen.' },

  // --- Accusative case (Akkusativ) ---
  // The Akkusativ is used for the direct object — the thing receiving the action.
  // Only the masculine article changes: der → den, ein → einen, kein → keinen.
  // Feminine (die/eine) and neuter (das/ein) stay the same in Akkusativ.
  { id: 'a1_gr_056', topic: 'Accusative case', type: 'multiple-choice',  question: 'Ich sehe ___ Mann. (masculine)',                            options: ['der', 'den', 'die', 'das'],                    answer: 'den',     explanation: '"Mann" is masculine. As the direct object (Akkusativ), "der" → "den".' },
  { id: 'a1_gr_057', topic: 'Accusative case', type: 'multiple-choice',  question: 'Er kauft ___ Buch. (neuter)',                               options: ['der', 'den', 'das', 'dem'],                    answer: 'das',     explanation: '"Buch" is neuter. Neuter article does NOT change in Akkusativ → still "das".' },
  { id: 'a1_gr_058', topic: 'Accusative case', type: 'multiple-choice',  question: 'Sie trinkt ___ Kaffee. (masculine)',                        options: ['der', 'den', 'die', 'ein'],                    answer: 'den',     explanation: '"Kaffee" is masculine. As direct object → "den".' },
  { id: 'a1_gr_059', topic: 'Accusative case', type: 'multiple-choice',  question: 'Ich habe ___ Bruder. (masculine, indefinite)',              options: ['ein', 'eine', 'einen', 'einem'],               answer: 'einen',   explanation: '"Bruder" is masculine. Indefinite article in Akkusativ: "ein" → "einen".' },
  { id: 'a1_gr_060', topic: 'Accusative case', type: 'multiple-choice',  question: 'Wir brauchen ___ Wohnung. (feminine, indefinite)',          options: ['ein', 'eine', 'einen', 'einem'],               answer: 'eine',    explanation: '"Wohnung" is feminine. Feminine article does NOT change in Akkusativ → still "eine".' },
  { id: 'a1_gr_061', topic: 'Accusative case', type: 'fill-blank',       question: 'Er hat kein___ Hund. (masculine)',                          answer: 'keinen',  explanation: '"Hund" is masculine. "Kein" in Akkusativ masculine → "keinen".' },
  { id: 'a1_gr_062', topic: 'Accusative case', type: 'fill-blank',       question: 'Ich lese ___ Roman. (der Roman — masculine, definite)',     answer: 'den',     explanation: '"Roman" is masculine. As direct object → "den".' },
  { id: 'a1_gr_063', topic: 'Accusative case', type: 'multiple-choice',  question: 'Which sentence uses Akkusativ correctly?',                  options: ['Ich sehe der Mann.', 'Ich sehe den Mann.', 'Ich sehe dem Mann.', 'Ich sehe die Mann.'], answer: 'Ich sehe den Mann.', explanation: '"sehen" (to see) takes a direct object. Masculine direct object: der → den.' },

  // --- Possessive articles: mein/meine, dein/deine, sein/seine, ihr/ihre ---
  // Possessive articles follow the same pattern as ein/eine/ein.
  // Masculine & neuter → no ending: mein Bruder, mein Kind
  // Feminine & plural  → add -e:   meine Schwester, meine Eltern
  // In Akkusativ, masculine adds -en: meinen Bruder, deinen Vater
  { id: 'a1_gr_064', topic: 'Possessive articles', type: 'multiple-choice',  question: 'Das ist ___ Bruder. (my — masculine)',                      options: ['meine', 'mein', 'meinen', 'meinem'],           answer: 'mein',    explanation: '"Bruder" is masculine. Nominativ masculine possessive → no ending: mein.' },
  { id: 'a1_gr_065', topic: 'Possessive articles', type: 'multiple-choice',  question: 'Das ist ___ Schwester. (my — feminine)',                    options: ['mein', 'meine', 'meinen', 'meiner'],           answer: 'meine',   explanation: '"Schwester" is feminine → add -e: meine.' },
  { id: 'a1_gr_066', topic: 'Possessive articles', type: 'multiple-choice',  question: 'Wie ist ___ Name? (your — informal, masculine)',            options: ['dein', 'deine', 'deinen', 'deiner'],           answer: 'dein',    explanation: '"Name" is masculine. Nominativ → dein (no ending).' },
  { id: 'a1_gr_067', topic: 'Possessive articles', type: 'multiple-choice',  question: 'Er liebt ___ Mutter. (his — feminine, Akkusativ)',          options: ['sein', 'seine', 'seinen', 'seiner'],           answer: 'seine',   explanation: '"Mutter" is feminine. Feminine does not change in Akkusativ → seine.' },
  { id: 'a1_gr_068', topic: 'Possessive articles', type: 'multiple-choice',  question: 'Sie sucht ___ Schlüssel. (her — masculine, Akkusativ)',     options: ['ihr', 'ihre', 'ihren', 'ihrem'],               answer: 'ihren',   explanation: '"Schlüssel" is masculine. Akkusativ masculine → add -en: ihren.' },
  { id: 'a1_gr_069', topic: 'Possessive articles', type: 'fill-blank',       question: 'Das ist ___ Buch. (my — neuter)',                           answer: 'mein',    explanation: '"Buch" is neuter. Neuter possessive in Nominativ → no ending: mein (same as masculine).' },
  { id: 'a1_gr_070', topic: 'Possessive articles', type: 'fill-blank',       question: 'Wir besuchen ___ Eltern. (our — plural, Akkusativ)',        answer: 'unsere',  explanation: '"Eltern" is plural. Plural possessive → add -e: unsere. (Same in Nominativ and Akkusativ.)' },
  { id: 'a1_gr_071', topic: 'Possessive articles', type: 'multiple-choice',  question: 'Ich habe ___ Handy vergessen. (my — neuter, Akkusativ)',    options: ['mein', 'meine', 'meinen', 'meinem'],           answer: 'mein',    explanation: '"Handy" is neuter. Neuter does not change in Akkusativ → mein.' },

  // --- Questions: W-questions and yes/no questions ---
  // Yes/no questions: verb comes FIRST, then subject. "Kommst du?" (Are you coming?)
  // W-questions: question word first, then verb, then subject. "Wo wohnst du?" (Where do you live?)
  // Key question words: Wer (who), Was (what), Wo (where), Wann (when), Wie (how),
  //                     Woher (where from), Wohin (where to), Warum (why), Wie viel (how much)
  { id: 'a1_gr_072', topic: 'Questions', type: 'multiple-choice',  question: 'Which is a correct yes/no question?',                       options: ['Du kommst heute?', 'Kommst du heute?', 'Heute du kommst?', 'Heute kommst?'],         answer: 'Kommst du heute?',   explanation: 'Yes/no questions: verb goes first, then subject. "Kommst du heute?"' },
  { id: 'a1_gr_073', topic: 'Questions', type: 'multiple-choice',  question: 'Which question word asks about a person?',                  options: ['Was', 'Wo', 'Wer', 'Wann'],                                                         answer: 'Wer',                explanation: '"Wer" = who. Use it to ask about a person: "Wer ist das?" (Who is that?)' },
  { id: 'a1_gr_074', topic: 'Questions', type: 'fill-blank',       question: '___ wohnst du? — Ich wohne in Berlin.',                    answer: 'Wo',    explanation: '"Wo" asks about location (where). "Woher" = where from, "Wohin" = where to.' },
  { id: 'a1_gr_075', topic: 'Questions', type: 'fill-blank',       question: '___ kommst du? — Ich komme aus Japan.',                    answer: 'Woher', explanation: '"Woher" asks where someone comes from. A very common A1 question!' },
  { id: 'a1_gr_076', topic: 'Questions', type: 'fill-blank',       question: '___ fährt der Zug? — Um 10 Uhr.',                         answer: 'Wann',  explanation: '"Wann" asks about time (when). "Um 10 Uhr" = at 10 o\'clock.' },
  { id: 'a1_gr_077', topic: 'Questions', type: 'multiple-choice',  question: '___ heißt du? — Ich heiße Anna.',                          options: ['Wer', 'Was', 'Wie', 'Wo'],                                                          answer: 'Wie',                explanation: '"Wie heißt du?" = What is your name? (literally: How are you called?) "Wie" also used in "Wie geht es dir?"' },
  { id: 'a1_gr_078', topic: 'Questions', type: 'multiple-choice',  question: 'Which W-question word order is correct?',                  options: ['Wo du wohnst?', 'Wo wohnst du?', 'Wohnst wo du?', 'Du wo wohnst?'],                 answer: 'Wo wohnst du?',      explanation: 'W-questions: question word first, then verb, then subject — same as yes/no questions but with a W-word upfront.' },
  { id: 'a1_gr_079', topic: 'Questions', type: 'multiple-choice',  question: '___ kostet das? — Das kostet 5 Euro.',                     options: ['Wie viel', 'Wie', 'Was für', 'Wer'],                                                answer: 'Wie viel',           explanation: '"Wie viel" asks about price or quantity (how much / how many).' },

  // --- Separable verbs ---
  // Many German verbs have a prefix that splits off and jumps to the END of the sentence.
  // The conjugated part stays in position 2; the prefix goes last.
  // e.g. aufstehen → Ich stehe um 7 Uhr auf.  ("auf" goes to the end)
  //      anrufen   → Ich rufe dich an.
  //      mitkommen → Kommst du mit?
  { id: 'a1_gr_080', topic: 'Separable verbs', type: 'multiple-choice',  question: 'Which sentence is correct? (aufstehen — to get up)',        options: ['Ich aufstehe um 7 Uhr.', 'Ich stehe um 7 Uhr auf.', 'Ich stehe auf um 7 Uhr.', 'Aufstehe ich um 7 Uhr.'], answer: 'Ich stehe um 7 Uhr auf.', explanation: 'Separable verb: "stehe" stays in position 2, prefix "auf" goes to the very end.' },
  { id: 'a1_gr_081', topic: 'Separable verbs', type: 'fill-blank',       question: 'Ich rufe dich morgen ___. (anrufen — to call)',             answer: 'an',      explanation: '"Anrufen" separates: "rufe" stays in position 2, prefix "an" goes to the end.' },
  { id: 'a1_gr_082', topic: 'Separable verbs', type: 'fill-blank',       question: 'Wir kaufen im Supermarkt ___. (einkaufen — to shop)',       answer: 'ein',     explanation: '"Einkaufen" separates: "kaufen" stays in position 2, prefix "ein" goes to the end.' },
  { id: 'a1_gr_083', topic: 'Separable verbs', type: 'multiple-choice',  question: 'Kommst du ___? (mitkommen — to come along)',                options: ['mit', 'komme', 'mitkommen', 'kommen'],   answer: 'mit',     explanation: 'Yes/no question with a separable verb: "Kommst" is first (question form), prefix "mit" still goes to the end.' },
  { id: 'a1_gr_084', topic: 'Separable verbs', type: 'multiple-choice',  question: 'Which sentence is correct? (abholen — to pick up)',         options: ['Er abholt mich um 8 Uhr.', 'Er holt mich ab um 8 Uhr.', 'Er holt mich um 8 Uhr ab.', 'Abholt er mich um 8 Uhr.'], answer: 'Er holt mich um 8 Uhr ab.', explanation: 'The prefix "ab" goes at the very end — after all other parts of the sentence.' },
  { id: 'a1_gr_085', topic: 'Separable verbs', type: 'fill-blank',       question: 'Er macht das Licht ___. (anmachen — to turn on)',           answer: 'an',      explanation: '"Anmachen" separates: "macht" stays, prefix "an" goes to the end.' },
  { id: 'a1_gr_086', topic: 'Separable verbs', type: 'fill-blank',       question: 'Wir steigen hier ___. (aussteigen — to get off)',           answer: 'aus',     explanation: '"Aussteigen" separates: "steigen" stays, prefix "aus" goes to the end.' },
  { id: 'a1_gr_087', topic: 'Separable verbs', type: 'multiple-choice',  question: 'What is the infinitive of: "Ich stehe auf"?',               options: ['stehen', 'aufstehen', 'stehauf', 'aufstehe'],   answer: 'aufstehen', explanation: 'The infinitive is always written as one word: "aufstehen". It only splits when conjugated in a sentence.' },

  // --- Basic plural nouns ---
  // German plural forms are irregular — they must be memorised with each noun.
  // BUT one rule always holds: the plural article is ALWAYS "die", regardless of gender.
  // Common patterns:
  //   -e      → der Tag → die Tage, der Beruf → die Berufe
  //   -er     → das Kind → die Kinder, das Buch → die Bücher (often with umlaut)
  //   -en/-n  → die Frau → die Frauen, die Blume → die Blumen
  //   -s      → das Auto → die Autos (mostly foreign/borrowed words)
  //   no change → der Lehrer → die Lehrer, das Zimmer → die Zimmer
  { id: 'a1_gr_088', topic: 'Plural nouns', type: 'multiple-choice',  question: 'What is the plural article for ALL German nouns?',           options: ['der', 'die', 'das', 'den'],                     answer: 'die',         explanation: 'All German nouns use "die" in the plural — der Mann → die Männer, das Kind → die Kinder, die Frau → die Frauen.' },
  { id: 'a1_gr_089', topic: 'Plural nouns', type: 'multiple-choice',  question: 'What is the plural of "das Kind" (child)?',                  options: ['die Kinds', 'die Kindes', 'die Kinder', 'die Kinds'], answer: 'die Kinder', explanation: '"Kind" adds -er in the plural: das Kind → die Kinder. This is a very common pattern for neuter nouns.' },
  { id: 'a1_gr_090', topic: 'Plural nouns', type: 'multiple-choice',  question: 'What is the plural of "die Frau" (woman)?',                  options: ['die Fraus', 'die Frauen', 'die Fräue', 'die Fraue'], answer: 'die Frauen', explanation: 'Feminine nouns ending in a consonant often add -en: die Frau → die Frauen.' },
  { id: 'a1_gr_091', topic: 'Plural nouns', type: 'multiple-choice',  question: 'What is the plural of "das Auto" (car)?',                    options: ['die Auten', 'die Autoen', 'die Autos', 'die Autoes'], answer: 'die Autos', explanation: 'Foreign/borrowed words usually add -s: das Auto → die Autos.' },
  { id: 'a1_gr_092', topic: 'Plural nouns', type: 'multiple-choice',  question: 'What is the plural of "der Lehrer" (teacher)?',              options: ['die Lehrers', 'die Lehreren', 'die Lehrer', 'die Lehrere'], answer: 'die Lehrer', explanation: 'Masculine nouns ending in -er often have no change in the plural: der Lehrer → die Lehrer.' },
  { id: 'a1_gr_093', topic: 'Plural nouns', type: 'multiple-choice',  question: 'What is the plural of "das Buch" (book)?',                   options: ['die Buchs', 'die Bücher', 'die Buchen', 'die Buch'],   answer: 'die Bücher', explanation: '"Buch" adds -er AND takes an umlaut: das Buch → die Bücher. Many neuter nouns follow this pattern.' },
  { id: 'a1_gr_094', topic: 'Plural nouns', type: 'fill-blank',       question: 'Der Mann → ___ Männer.',                                     answer: 'die',         explanation: 'The plural article is always "die" — der Mann → die Männer.' },
  { id: 'a1_gr_095', topic: 'Plural nouns', type: 'multiple-choice',  question: 'What is the plural of "die Blume" (flower)?',                options: ['die Blumes', 'die Blumen', 'die Blümen', 'die Bloomen'], answer: 'die Blumen', explanation: 'Nouns ending in -e usually add -n in the plural: die Blume → die Blumen.' },

  // --- Imperative (commands) ---
  // German has 3 imperative forms depending on who you are addressing:
  //   du (informal singular) → verb stem, often no ending: Komm! Lern! (add -e if stem ends in -t/-d: Arbeite!)
  //   ihr (informal plural)  → same as regular ihr form: Kommt! Lernt!
  //   Sie (formal)           → infinitive + Sie: Kommen Sie! Lernen Sie bitte!
  // Separable verbs: prefix still goes to the end: Ruf mich an! Steh auf!
  { id: 'a1_gr_096', topic: 'Imperative', type: 'multiple-choice',  question: 'You tell a friend (du) to come. Which is correct?',           options: ['Kommen!', 'Kommst!', 'Komm!', 'Komme!'],               answer: 'Komm!',          explanation: 'du-imperative: take the verb stem (drop -en): kommen → Komm!' },
  { id: 'a1_gr_097', topic: 'Imperative', type: 'multiple-choice',  question: 'You tell a group of friends (ihr) to wait. Which is correct?', options: ['Wartet!', 'Warten!', 'Warte!', 'Wartest!'],             answer: 'Wartet!',        explanation: 'ihr-imperative: same as the regular ihr conjugation: ihr wartet → Wartet!' },
  { id: 'a1_gr_098', topic: 'Imperative', type: 'multiple-choice',  question: 'You ask your teacher (Sie) to speak slowly. Which is correct?', options: ['Sprechen langsam!', 'Sprich langsam!', 'Sprechen Sie bitte langsam!', 'Spreche Sie langsam!'], answer: 'Sprechen Sie bitte langsam!', explanation: 'Sie-imperative: infinitive + Sie. "Bitte" makes it polite. Subject "Sie" stays in the sentence.' },
  { id: 'a1_gr_099', topic: 'Imperative', type: 'fill-blank',       question: '___ bitte hier! (warten — du form)',                          answer: 'Warte',          explanation: '"warten" stem ends in -t, so add -e for easier pronunciation: Warte! (not Wart!)' },
  { id: 'a1_gr_100', topic: 'Imperative', type: 'fill-blank',       question: '___ Sie bitte das Formular aus! (ausfüllen — Sie form)',       answer: 'Füllen',         explanation: 'Sie-imperative of "ausfüllen": the verb splits — "Füllen" comes first, "aus" goes to the end.' },
  { id: 'a1_gr_101', topic: 'Imperative', type: 'multiple-choice',  question: 'You tell a friend (du) to get up. (aufstehen)',               options: ['Aufstehen!', 'Stehst auf!', 'Steh auf!', 'Stehe aufst!'], answer: 'Steh auf!',     explanation: 'Separable verb imperative (du): stem goes first, prefix goes to the end: Steh auf!' },
  { id: 'a1_gr_102', topic: 'Imperative', type: 'multiple-choice',  question: 'Which is the correct formal (Sie) command for "öffnen" (to open)?', options: ['Öffne!', 'Öffnet!', 'Öffnen Sie!', 'Öffnen du!'],  answer: 'Öffnen Sie!',    explanation: 'Sie-imperative: always infinitive + Sie: Öffnen Sie! Note: "Sie" must be included.' },
  { id: 'a1_gr_103', topic: 'Imperative', type: 'multiple-choice',  question: 'Which is the correct du-imperative of "lernen" (to learn)?',  options: ['Lernst!', 'Lernen!', 'Lerne!', 'Lernt!'],              answer: 'Lerne!',         explanation: 'du-imperative of "lernen": stem "lern" + optional -e → Lern! or Lerne! Both are correct; Lerne! is more common in writing.' },

  // --- Common prepositions ---
  // These prepositions are essential at A1. Each one takes a specific case:
  //   Always Dativ:     mit (with), zu (to), bei (at/with), nach (to/after), aus (from/out of), von (from/of)
  //   Always Akkusativ: für (for), durch (through)
  //   Two-way (Dativ for location, Akkusativ for movement): in, auf, an, über, unter
  //
  // At A1, focus on recognising the right preposition — deep case rules come later.
  { id: 'a1_gr_104', topic: 'Prepositions', type: 'multiple-choice',  question: 'Ich fahre ___ dem Bus. (by bus)',                            options: ['mit', 'für', 'aus', 'von'],             answer: 'mit',    explanation: '"Mit" = with. Use it for means of transport: mit dem Bus, mit dem Zug, mit dem Auto.' },
  { id: 'a1_gr_105', topic: 'Prepositions', type: 'multiple-choice',  question: 'Ich komme ___ Deutschland. (from Germany)',                  options: ['nach', 'aus', 'von', 'bei'],            answer: 'aus',    explanation: '"Aus" = from (origin/country). Use for countries and cities: aus Deutschland, aus Berlin.' },
  { id: 'a1_gr_106', topic: 'Prepositions', type: 'multiple-choice',  question: 'Ich fahre ___ Berlin. (to Berlin — a city)',                 options: ['zu', 'in', 'nach', 'aus'],              answer: 'nach',   explanation: '"Nach" is used for travel to cities and countries (without an article): nach Berlin, nach Österreich.' },
  { id: 'a1_gr_107', topic: 'Prepositions', type: 'multiple-choice',  question: 'Ich gehe ___ Supermarkt. (to the supermarket)',              options: ['nach', 'aus', 'zum', 'bei'],            answer: 'zum',    explanation: '"Zu" is used for travel to places with an article. "zu + dem" contracts to "zum": zum Supermarkt, zum Bahnhof.' },
  { id: 'a1_gr_108', topic: 'Prepositions', type: 'multiple-choice',  question: 'Das Buch liegt ___ dem Tisch. (on the table — location)',    options: ['in', 'auf', 'für', 'mit'],              answer: 'auf',    explanation: '"Auf" = on (a surface). For location (no movement) → takes Dativ: auf dem Tisch.' },
  { id: 'a1_gr_109', topic: 'Prepositions', type: 'multiple-choice',  question: 'Ich wohne ___ meiner Familie. (with my family)',             options: ['mit', 'bei', 'von', 'nach'],            answer: 'bei',    explanation: '"Bei" = at / with (living situation or someone\'s place): bei meiner Familie, bei meinen Eltern.' },
  { id: 'a1_gr_110', topic: 'Prepositions', type: 'fill-blank',       question: 'Das Geschenk ist ___ dich. (for you)',                      answer: 'für',    explanation: '"Für" = for. It always takes Akkusativ: für dich, für mich, für meinen Bruder.' },
  { id: 'a1_gr_111', topic: 'Prepositions', type: 'multiple-choice',  question: 'Ich gehe ___ die Schule. (into the school — movement)',      options: ['in', 'auf', 'bei', 'aus'],              answer: 'in',     explanation: '"In" is a two-way preposition. Movement (going into) → Akkusativ: in die Schule. Location (being inside) → Dativ: in der Schule.' },

];