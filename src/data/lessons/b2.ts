// b2.ts — B2 lesson content (10 lessons)
//
// Each topic string must match exactly what appears in src/data/grammar/b2.ts.

import type { Lesson } from './types';

export const B2_LESSONS: Lesson[] = [
  {
    topic: 'Extended participial phrases',
    level: 'B2',
    title: 'Extended participial phrases',
    explanation:
      'At B2, German often replaces relative clauses with participial phrases to sound more compact and formal. This is especially common in reports, academic writing, and news language.\n\n' +
      'Partizip I (present participle) describes an active ongoing quality: "der in Berlin arbeitende Ingenieur". Partizip II (past participle) describes a completed or passive quality: "die gestern beschlossene Maßnahme".\n\n' +
      'The participle behaves like an adjective, so it takes adjective endings based on article, gender, case, and number. Long prepositional or adverbial groups can stand before the participle.',
    keyPoints: [
      'Partizip I = active quality; Partizip II = completed/passive quality',
      'Participles in this position take normal adjective endings',
      'Used to compress relative clauses in formal writing',
      'Long modifiers can come before the participle',
      'Case and article determine final ending',
    ],
    examples: [
      { german: 'Die im Labor entwickelte Methode spart Zeit.', english: 'The method developed in the lab saves time.', note: 'Partizip II as attribute' },
      { german: 'Der in mehreren Sprachen veröffentlichte Bericht wurde diskutiert.', english: 'The report published in several languages was discussed.', note: 'long modifier before participle' },
      { german: 'Die derzeit an dem Projekt arbeitenden Teams treffen sich morgen.', english: 'The teams currently working on the project will meet tomorrow.', note: 'Partizip I plural ending -en' },
      { german: 'Die von der Kommission vorgeschlagenen Regeln gelten ab sofort.', english: 'The rules proposed by the commission apply immediately.', note: 'formal compressed structure' },
    ],
    commonMistake:
      'Wrong: "die in Berlin arbeitend Frau". Correct: "die in Berlin arbeitende Frau" - participles in attributive position need adjective endings.',
  },
  {
    topic: 'Konjunktiv I',
    level: 'B2',
    title: 'Konjunktiv I in reported speech',
    explanation:
      'Konjunktiv I is the standard form for indirect speech in formal German. It shows distance from a statement and signals that the speaker is reporting, not confirming, information.\n\n' +
      'Core forms include: er sei, sie habe, er werde, man müsse. In journalistic style, these forms help keep statements neutral.\n\n' +
      'If the Konjunktiv I form is identical to the indicative, writers often use Konjunktiv II as a substitute to keep the indirect-speech signal clear.',
    keyPoints: [
      'Main use: neutral indirect speech in reports and formal texts',
      'Typical forms: sei, habe, werde, könne, müsse',
      'Marks distance from quoted content',
      'Used heavily with saying/reporting verbs',
      'Konjunktiv II can replace ambiguous forms',
    ],
    examples: [
      { german: 'Der Minister sagte, die Lage sei stabil.', english: 'The minister said the situation was stable.', note: 'sei marks reported claim' },
      { german: 'Die Zeugin erklärte, sie habe nichts gesehen.', english: 'The witness stated she had seen nothing.', note: 'habe in indirect speech' },
      { german: 'Die Zeitung schreibt, die Kosten würden steigen.', english: 'The newspaper writes that costs would rise.', note: 'substitute form for clarity' },
      { german: 'Er betonte, man müsse schnell handeln.', english: 'He emphasized that one had to act quickly.', note: 'müsse in formal register' },
    ],
    commonMistake:
      'Wrong: "Er sagte, er ist krank." in formal reporting. Better: "Er sagte, er sei krank."',
  },
  {
    topic: 'Modal particles',
    level: 'B2',
    title: 'Modal particles and tone',
    explanation:
      'Modal particles like doch, ja, wohl, mal, halt, and eigentlich do not change core sentence meaning. They modify tone, attitude, and interactional nuance.\n\n' +
      'At B2, the challenge is pragmatic use: choosing a particle that matches intention, relationship, and context. Many errors are not grammatical, but tonal.\n\n' +
      'Particles are frequent in spoken German and informal writing, but some also appear in high-level dialogues and nuanced narrative prose.',
    keyPoints: [
      'Particles shape tone rather than literal meaning',
      'doch often signals correction or encouragement',
      'wohl marks assumption or probability',
      'mal softens imperatives',
      'halt often expresses resigned acceptance',
    ],
    examples: [
      { german: 'Komm doch mit, es wird interessant.', english: 'Come along, it will be interesting.', note: 'friendly encouragement' },
      { german: 'Er ist wohl schon gegangen.', english: 'He has probably already left.', note: 'assumption with wohl' },
      { german: 'Schau mal kurz hier.', english: 'Take a quick look here.', note: 'mal softens command' },
      { german: 'Das ist halt so in dieser Branche.', english: 'That is just how it is in this industry.', note: 'resigned tone with halt' },
    ],
    commonMistake:
      'Wrong usage is often tonal: "Komm halt mit!" can sound annoyed, while "Komm doch mit!" sounds inviting.',
  },
  {
    topic: 'Passive with modal verbs',
    level: 'B2',
    title: 'Passive with modal verbs',
    explanation:
      'Passive with modal verbs is common in rules, processes, and formal instructions where the actor is less important than the required action.\n\n' +
      'Core structure: modal (finite) + Partizip II + werden. Example: "Der Antrag muss bis Freitag eingereicht werden."\n\n' +
      'This pattern appears frequently in workplace German, legal notices, and technical descriptions.',
    keyPoints: [
      'Structure: muss/kann/soll + Partizip II + werden',
      'Focus on action, not actor',
      'Very common in formal procedures',
      'Agent can be added with von + Dativ if needed',
      'Word order must keep Partizip II before werden at end',
    ],
    examples: [
      { german: 'Die Daten müssen sicher gespeichert werden.', english: 'The data must be stored securely.', note: 'formal requirement' },
      { german: 'Der Bericht soll heute fertiggestellt werden.', english: 'The report should be finalized today.', note: 'recommendation/order' },
      { german: 'Die Ergebnisse können später ausgewertet werden.', english: 'The results can be evaluated later.', note: 'possibility in passive' },
      { german: 'Die Unterlagen dürfen nicht weitergegeben werden.', english: 'The documents must not be passed on.', note: 'prohibition' },
    ],
    commonMistake:
      'Wrong: "Der Bericht muss werden geschrieben." Correct: "Der Bericht muss geschrieben werden."',
  },
  {
    topic: 'N-Deklination',
    level: 'B2',
    title: 'N-declension (weak masculine nouns)',
    explanation:
      'Certain masculine nouns take -n or -en in all cases except nominative singular. This pattern is called N-Deklination and is essential for accurate formal grammar.\n\n' +
      'Typical nouns include: der Student, der Kollege, der Kunde, der Mensch, der Journalist, der Präsident. Special case: der Herr -> den Herrn, dem Herrn, des Herrn.\n\n' +
      'Learners often forget these endings in accusative, dative, and genitive, which creates noticeable B2-level errors.',
    keyPoints: [
      'Only nominative singular has no extra ending',
      'Akk/Dativ/Genitiv singular usually take -n or -en',
      'Many nouns ending in -e, -ent, -ant follow pattern',
      'Herr is irregular: Herrn',
      'Apply endings consistently across phrases',
    ],
    examples: [
      { german: 'Ich kenne den Studenten gut.', english: 'I know the student well.', note: 'Akkusativ singular -en' },
      { german: 'Wir helfen dem Kollegen sofort.', english: 'We help the colleague immediately.', note: 'Dativ singular -en' },
      { german: 'Die Meinung des Kunden ist wichtig.', english: 'The customer\'s opinion is important.', note: 'Genitiv singular -en' },
      { german: 'Ich danke dem Herrn für die Information.', english: 'I thank the gentleman for the information.', note: 'special form Herrn' },
    ],
    commonMistake:
      'Wrong: "Ich helfe dem Kollege." Correct: "Ich helfe dem Kollegen."',
  },
  {
    topic: 'Nominalisierung',
    level: 'B2',
    title: 'Nominalization in formal style',
    explanation:
      'Nominalization turns verbs and adjectives into nouns. German uses this heavily in academic, administrative, and technical writing to create dense, abstract style.\n\n' +
      'Verb infinitives become neuter nouns with das: "das Lernen", "das Analysieren". Adjectives often form abstract nouns with -heit or -keit: "Sicherheit", "Genauigkeit".\n\n' +
      'At B2, this helps learners read and produce formal texts that rely on noun-heavy structures.',
    keyPoints: [
      'Infinitive nominalization: das + infinitive (capitalized)',
      'Adjective nominalization often uses -heit/-keit',
      'Nominal style is common in formal written German',
      'Capitalization is mandatory for nouns',
      'Often appears after prepositions and in headings',
    ],
    examples: [
      { german: 'Das regelmäßige Lernen verbessert die Ergebnisse.', english: 'Regular studying improves results.', note: 'nominalized infinitive' },
      { german: 'Nach langer Diskussion traf das Team eine Entscheidung.', english: 'After a long discussion, the team made a decision.', note: 'nominal style' },
      { german: 'Die Genauigkeit der Daten ist entscheidend.', english: 'The accuracy of the data is crucial.', note: 'adjective -> abstract noun' },
      { german: 'Beim Schreiben wissenschaftlicher Texte hilft klare Struktur.', english: 'When writing academic texts, clear structure helps.', note: 'preposition + nominalized verb' },
    ],
    commonMistake:
      'Wrong: "das lernen ist wichtig." Correct: "Das Lernen ist wichtig." - nominalized verbs are capitalized.',
  },
  {
    topic: 'Genitiv prepositions',
    level: 'B2',
    title: 'Genitive prepositions',
    explanation:
      'Several formal prepositions govern genitive, especially in written and institutional German. Core items include: wegen, trotz, während, innerhalb, außerhalb, aufgrund, anstatt/statt.\n\n' +
      'These are high-value at B2 because they appear in notices, contracts, reports, and exam tasks. Spoken language may sometimes replace them with dative, but formal standard keeps genitive.\n\n' +
      'Accuracy with article and noun endings after these prepositions is key.',
    keyPoints: [
      'Common genitive prepositions: wegen, trotz, während, aufgrund',
      'Formal style strongly prefers genitive after these forms',
      'Masculine/neuter often show des + -s/-es',
      'Frequently used in argumentation and written explanation',
      'Avoid dative substitutions in formal contexts',
    ],
    examples: [
      { german: 'Wegen des Sturms wurde das Spiel abgesagt.', english: 'Because of the storm, the game was canceled.', note: 'wegen + Genitiv' },
      { german: 'Trotz der Kritik blieb der Plan bestehen.', english: 'Despite the criticism, the plan remained in place.', note: 'trotz + Genitiv' },
      { german: 'Aufgrund neuer Daten wurde die Studie angepasst.', english: 'Due to new data, the study was adjusted.', note: 'aufgrund + Genitiv' },
      { german: 'Innerhalb eines Monats soll das Projekt starten.', english: 'Within one month, the project should start.', note: 'innerhalb + Genitiv' },
    ],
    commonMistake:
      'Wrong: "trotz dem Problem" in formal writing. Correct: "trotz des Problems."',
  },
  {
    topic: 'Complex connectors',
    level: 'B2',
    title: 'Complex connectors and clause logic',
    explanation:
      'B2 German depends on precise connector choice for logic and text cohesion. Learners must distinguish subordinating conjunctions, coordinating conjunctions, and sentence adverbs.\n\n' +
      'For example: obwohl (subordinate contrast, verb-final), trotzdem (main clause adverb, verb-second), weil (subordinate reason), denn (coordinating reason), als vs wenn for time distinctions.\n\n' +
      'Accurate connector choice improves both correctness and argumentative clarity in writing and speaking.',
    keyPoints: [
      'Subordinate connectors send verb to clause end (obwohl, weil)',
      'Coordinators/adverbs keep main clause V2 (denn, trotzdem)',
      'als = one-time past; wenn = repeated/general/future',
      'Connector choice encodes logic, not just style',
      'Punctuation supports clause boundaries and readability',
    ],
    examples: [
      { german: 'Obwohl es spät war, arbeitete sie weiter.', english: 'Although it was late, she kept working.', note: 'subordinate contrast' },
      { german: 'Es war spät; trotzdem arbeitete sie weiter.', english: 'It was late; nevertheless, she kept working.', note: 'main-clause adverb' },
      { german: 'Ich blieb zu Hause, weil ich krank war.', english: 'I stayed home because I was ill.', note: 'weil + verb-final' },
      { german: 'Ich blieb zu Hause, denn ich war krank.', english: 'I stayed home, for I was ill.', note: 'denn + main clause order' },
    ],
    commonMistake:
      'Wrong: "Trotzdem ich müde bin, lerne ich." Correct: "Obwohl ich müde bin, lerne ich." or "Ich bin müde, trotzdem lerne ich."',
  },
  {
    topic: 'Indirect questions',
    level: 'B2',
    title: 'Indirect questions',
    explanation:
      'Indirect questions embed a question inside a larger sentence. They are common after verbs like wissen, fragen, sagen, erklären, and sich wundern.\n\n' +
      'Yes/no questions are introduced by ob. Information questions keep a W-word (wann, wo, warum, wie, etc.). In both cases, the embedded clause uses verb-final order.\n\n' +
      'This structure is essential for formal communication, polite requests, and complex sentence building.',
    keyPoints: [
      'Yes/no meaning -> use ob',
      'W-questions keep W-word in embedded clause',
      'Embedded clause always has verb-final order',
      'Common after wissen, fragen, sagen, erklären',
      'Useful for polite and precise communication',
    ],
    examples: [
      { german: 'Ich weiß nicht, ob er heute kommt.', english: 'I do not know whether he is coming today.', note: 'ob for yes/no' },
      { german: 'Kannst du mir sagen, wann der Kurs beginnt?', english: 'Can you tell me when the course begins?', note: 'embedded W-question' },
      { german: 'Wir fragen uns, warum das System so langsam ist.', english: 'We are wondering why the system is so slow.', note: 'verb-final in clause' },
      { german: 'Es ist unklar, ob die Daten zuverlässig sind.', english: 'It is unclear whether the data are reliable.', note: 'formal impersonal framing' },
    ],
    commonMistake:
      'Wrong: "Ich weiß nicht, ob kommt er." Correct: "Ich weiß nicht, ob er kommt."',
  },
  {
    topic: 'Relative clauses with was/wo',
    level: 'B2',
    title: 'Relative clauses with was and wo',
    explanation:
      'German uses was in relative clauses after abstract antecedents such as alles, etwas, nichts, and often after das when referring to an entire idea.\n\n' +
      'Wo is frequently used for place references in relative clauses, especially after dort, hier, and nouns indicating location. In many contexts, wo alternates with in dem / an dem style forms.\n\n' +
      'At B2, mastering these patterns improves idiomatic flow and prevents awkward overuse of der/die/das.',
    keyPoints: [
      'Use was after alles, etwas, nichts, vieles, manches',
      'Use wo for many place-based relative references',
      'was can refer to whole preceding statements',
      'These patterns are highly frequent in natural German',
      'Choose based on antecedent type: abstract vs place',
    ],
    examples: [
      { german: 'Alles, was er sagt, klingt logisch.', english: 'Everything he says sounds logical.', note: 'alles + was' },
      { german: 'Nichts, was passiert ist, war zufällig.', english: 'Nothing that happened was random.', note: 'nichts + was' },
      { german: 'Das ist der Ort, wo wir uns getroffen haben.', english: 'That is the place where we met.', note: 'place reference with wo' },
      { german: 'Dort, wo früher ein Kino stand, ist jetzt ein Park.', english: 'Where there used to be a cinema, there is now a park.', note: 'dort ... wo pair' },
    ],
    commonMistake:
      'Wrong: "Alles, das er sagt..." Correct: "Alles, was er sagt..."',
  },
];
