// a1.ts — Grammar exercises for A1 level.
// Topics covered: sein, haben, articles (der/die/das), negation (nicht/kein), word order.
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

];