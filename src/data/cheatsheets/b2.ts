// b2.ts — B2 grammar cheat sheet (static reference)
// 10 sections covering all B2 grammar topics:
// Extended participial phrases, Konjunktiv I, Modal particles,
// Passive with modal verbs, N-Deklination, Nominalisierung,
// Genitiv prepositions, Complex connectors, Indirect questions,
// Relative clauses with was/wo

import type { CheatSheetSection } from './types';

export const B2_CHEAT_SHEET: CheatSheetSection[] = [
  // ─────────────────────────────────────────────
  // 1. Extended participial phrases
  // ─────────────────────────────────────────────
  {
    title: 'Extended participial phrases',
    blocks: [
      {
        type: 'text',
        body:
          'Participial phrases replace relative clauses in formal written German. The participle acts like an adjective and takes normal adjective endings based on gender, case, and article. Modifiers (time, place, agent) sit between the article and the participle.',
      },
      {
        type: 'table',
        columns: ['Type', 'Formation', 'Meaning', 'Example'],
        rows: [
          ['Partizip I', 'infinitive + -d + adj. ending', 'active / ongoing', 'die lesende Frau'],
          ['Partizip II', 'ge- + stem + -(e)t/en + adj. ending', 'completed / passive', 'der geschlossene Laden'],
        ],
      },
      {
        type: 'example',
        de: 'Der Mann, der die Zeitung liest, ist mein Onkel. → Der die Zeitung lesende Mann ist mein Onkel.',
        en: 'The man reading the newspaper is my uncle. (Partizip I replaces relative clause)',
      },
      {
        type: 'example',
        de: 'Das von der Firma gebaute Haus steht am See.',
        en: 'The house built by the company stands by the lake. (Partizip II with agent phrase)',
      },
      {
        type: 'example',
        de: 'Die seit Jahren gesammelten Daten wurden neu ausgewertet.',
        en: 'The data collected for years was re-evaluated. (temporal phrase embedded before participle)',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Konjunktiv I (reported speech)
  // ─────────────────────────────────────────────
  {
    title: 'Konjunktiv I (reported speech)',
    blocks: [
      {
        type: 'text',
        body:
          'Konjunktiv I signals that you are reporting someone else\'s words, not confirming them as true. It is standard in journalism and formal writing. If a Konjunktiv I form looks identical to the indicative, use Konjunktiv II (würde…) instead to keep the signal clear.',
      },
      {
        type: 'table',
        columns: ['Verb', 'Indicative (er/sie)', 'Konjunktiv I'],
        rows: [
          ['sein', 'ist', 'sei'],
          ['haben', 'hat', 'habe'],
          ['werden', 'wird', 'werde'],
          ['können', 'kann', 'könne'],
          ['müssen', 'muss', 'müsse'],
          ['wollen', 'will', 'wolle'],
          ['kommen', 'kommt', 'komme'],
          ['gehen', 'geht', 'gehe'],
        ],
      },
      {
        type: 'example',
        de: 'Er sagt, er sei krank. Sie behauptet, sie habe keine Zeit.',
        en: 'He says he is (reportedly) sick. She claims she has no time.',
      },
      {
        type: 'example',
        de: 'Der Minister erklärte, die Zahlen stimmten. (Konjunktiv II used — stimmten = ambiguous K I form)',
        en: 'The minister stated that the figures were correct.',
      },
      {
        type: 'example',
        de: 'Die Zeitung schreibt, die Kosten würden steigen.',
        en: 'The newspaper writes that costs would rise. (würden replaces ambiguous K I form)',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Modal particles
  // ─────────────────────────────────────────────
  {
    title: 'Modal particles',
    blocks: [
      {
        type: 'text',
        body:
          'Modal particles (Modalpartikeln) are small words that colour tone and attitude. They are unstressed, cannot be negated, and cannot stand alone. They are central to sounding natural in German conversation.',
      },
      {
        type: 'table',
        columns: ['Particle', 'Core nuance', 'Example'],
        rows: [
          ['doch', 'contradiction / encouragement', 'Komm doch mit! — Das stimmt doch nicht!'],
          ['ja', 'shared knowledge / reassurance', 'Das ist ja einfach. — Du weißt ja, wie das ist.'],
          ['mal', 'soften a request / imperative', 'Sag mal, was meinst du? — Schau mal!'],
          ['eigentlich', '"actually" / curious probe', 'Was machst du eigentlich? — Eigentlich wollte ich früher gehen.'],
          ['wohl', 'probability / assumption', 'Er wird wohl recht haben. — Das dürfte wohl schwer sein.'],
          ['halt', 'resignation / "just how it is"', 'So ist das halt. — Das klappt halt nicht immer.'],
          ['denn', 'curiosity / polite question', 'Was machen Sie denn hier? — Ist das denn nötig?'],
          ['eben', 'logical conclusion / acceptance', 'Das ist eben so. — Das ist eben das Problem.'],
        ],
      },
      {
        type: 'example',
        de: 'Das ist doch nicht dein Ernst!',
        en: 'You cannot be serious! (doch adds emotional force / contradiction)',
      },
      {
        type: 'example',
        de: 'Er wird wohl noch schlafen.',
        en: 'He is probably still sleeping. (wohl = speaker assumption, not certainty)',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Passive with modal verbs
  // ─────────────────────────────────────────────
  {
    title: 'Passive with modal verbs',
    blocks: [
      {
        type: 'text',
        body:
          'Combine a modal verb with the passive to express obligation, permission, or possibility applied to a process rather than a person. Structure: modal (finite) + Partizip II + werden (infinitive). In subordinate clauses: Partizip II + werden + modal at end.',
      },
      {
        type: 'table',
        columns: ['Modal', 'Meaning in passive', 'Example'],
        rows: [
          ['muss … werden', 'must be done (obligation)', 'Das Formular muss ausgefüllt werden.'],
          ['kann … werden', 'can be done (possibility)', 'Der Fehler kann korrigiert werden.'],
          ['soll … werden', 'is supposed to be done', 'Der Bericht soll bis Freitag abgegeben werden.'],
          ['darf nicht … werden', 'must not be done (prohibition)', 'Die Daten dürfen nicht geteilt werden.'],
          ['sollte … werden', 'should be done (recommendation)', 'Das Protokoll sollte sofort verschickt werden.'],
          ['konnte … werden', 'could be done (past ability)', 'Das Problem konnte nicht gelöst werden.'],
        ],
      },
      {
        type: 'example',
        de: 'Der Vertrag muss bis Montag unterschrieben werden.',
        en: 'The contract must be signed by Monday.',
      },
      {
        type: 'example',
        de: 'Ich glaube, dass das Problem schnell gelöst werden kann.',
        en: 'I think that the problem can be solved quickly. (subordinate clause: Partizip II + werden + kann at end)',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. N-Deklination (weak masculine nouns)
  // ─────────────────────────────────────────────
  {
    title: 'N-Deklination (weak nouns)',
    blocks: [
      {
        type: 'text',
        body:
          'A group of masculine nouns (and one neuter: das Herz) add -(e)n in every case except nominative singular. These are called weak nouns. Most refer to people, animals, or nationalities. Forgetting the -n ending is a very common B2 mistake.',
      },
      {
        type: 'table',
        columns: ['Case', 'der Mensch', 'der Herr', 'der Student', 'der Kollege'],
        rows: [
          ['Nominativ', 'der Mensch', 'der Herr', 'der Student', 'der Kollege'],
          ['Akkusativ', 'den Menschen', 'den Herrn', 'den Studenten', 'den Kollegen'],
          ['Dativ', 'dem Menschen', 'dem Herrn', 'dem Studenten', 'dem Kollegen'],
          ['Genitiv', 'des Menschen', 'des Herrn', 'des Studenten', 'des Kollegen'],
          ['Plural (all cases)', 'die Menschen', 'die Herren', 'die Studenten', 'die Kollegen'],
        ],
      },
      {
        type: 'subheading',
        text: 'Common weak nouns',
      },
      {
        type: 'table',
        columns: ['Noun', 'Meaning', 'Noun', 'Meaning'],
        rows: [
          ['der Mensch -en', 'person/human', 'der Kunde -n', 'customer'],
          ['der Herr -n', 'gentleman/Mr', 'der Kollege -n', 'colleague'],
          ['der Student -en', 'student', 'der Journalist -en', 'journalist'],
          ['der Polizist -en', 'police officer', 'der Präsident -en', 'president'],
          ['der Junge -n', 'boy', 'der Zeuge -n', 'witness'],
          ['der Nachbar -n', 'neighbour', 'der Experte -n', 'expert'],
        ],
      },
      {
        type: 'example',
        de: 'Ich habe den Kollegen angerufen. — Das ist das Büro des Studenten.',
        en: 'I called the colleague. — That is the student\'s office. (-(e)n in Akkusativ and Genitiv)',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Nominalisierung
  // ─────────────────────────────────────────────
  {
    title: 'Nominalisierung',
    blocks: [
      {
        type: 'text',
        body:
          'Formal German converts verbs and adjectives into nouns. This is very common in written and academic German. The resulting nouns take articles and can be declined like any noun.',
      },
      {
        type: 'subheading',
        text: 'Verb → noun (infinitive as neuter noun)',
      },
      {
        type: 'table',
        columns: ['Verb', '→ Noun', 'Example'],
        rows: [
          ['lernen', 'das Lernen', 'Das Lernen einer Sprache braucht Zeit.'],
          ['schreiben', 'das Schreiben', 'Das Schreiben fällt ihm schwer.'],
          ['arbeiten', 'das Arbeiten', 'Das Arbeiten im Team ist wichtig.'],
        ],
      },
      {
        type: 'subheading',
        text: 'Adjective / verb → noun via suffix',
      },
      {
        type: 'table',
        columns: ['Suffix', 'Gender', 'Source', 'Example'],
        rows: [
          ['-keit', 'die', 'adjective', 'müde → die Müdigkeit, schnell → die Schnelligkeit'],
          ['-heit', 'die', 'adjective', 'frei → die Freiheit, gesund → die Gesundheit'],
          ['-ung', 'die', 'verb', 'lösen → die Lösung, bilden → die Bildung'],
          ['-schaft', 'die', 'noun/adj', 'Freund → die Freundschaft, Wissen → die Wissenschaft'],
          ['-nis', 'das/die', 'verb/adj', 'ergebnis (das), Kenntnis (die)'],
          ['-tum', 'das', 'noun/adj', 'reich → der Reichtum, Eigentum (das)'],
        ],
      },
      {
        type: 'example',
        de: 'Das tägliche Üben hilft beim Lernen der Sprache.',
        en: 'Daily practice helps with learning the language.',
      },
      {
        type: 'example',
        de: 'Die Schnelligkeit der Antwort war beeindruckend.',
        en: 'The speed of the answer was impressive.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. Genitiv prepositions (fuller set)
  // ─────────────────────────────────────────────
  {
    title: 'Genitiv prepositions',
    blocks: [
      {
        type: 'text',
        body:
          'These prepositions take a genitive object in formal written German. In everyday speech, many speakers use dative instead — but exams and formal writing expect genitive.',
      },
      {
        type: 'table',
        columns: ['Preposition', 'Meaning', 'Example'],
        rows: [
          ['wegen', 'because of', 'wegen des Sturms — because of the storm'],
          ['trotz', 'despite', 'trotz des Regens — despite the rain'],
          ['während', 'during', 'während des Meetings — during the meeting'],
          ['innerhalb', 'within / inside', 'innerhalb der Frist — within the deadline'],
          ['außerhalb', 'outside of', 'außerhalb der Stadt — outside the city'],
          ['anstatt / statt', 'instead of', 'anstatt des Busses — instead of the bus'],
          ['aufgrund', 'due to / on account of', 'aufgrund der Nachfrage — due to demand'],
          ['mithilfe', 'with the help of', 'mithilfe des Lehrers — with the teacher\'s help'],
          ['unweit', 'not far from', 'unweit des Bahnhofs — not far from the station'],
          ['infolge', 'as a result of', 'infolge des Unfalls — as a result of the accident'],
        ],
      },
      {
        type: 'example',
        de: 'Aufgrund des Wetters wurde das Spiel abgesagt.',
        en: 'The match was cancelled due to the weather.',
      },
      {
        type: 'example',
        de: 'Trotz des starken Regens kamen viele Besucher.',
        en: 'Despite the heavy rain, many visitors came.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. Complex connectors
  // ─────────────────────────────────────────────
  {
    title: 'Complex connectors',
    blocks: [
      {
        type: 'text',
        body:
          'German connectors fall into three types: subordinating conjunctions (verb moves to end of clause), coordinating conjunctions (normal word order), and adverbs (invert subject + verb in the second clause).',
      },
      {
        type: 'table',
        columns: ['Connector', 'Type', 'Meaning', 'Key rule'],
        rows: [
          ['weil', 'subordinating', 'because', 'verb at end: …weil ich müde bin.'],
          ['denn', 'coordinating', 'because', 'normal order: …denn ich bin müde.'],
          ['obwohl', 'subordinating', 'although', 'verb at end: …obwohl es regnete.'],
          ['trotzdem', 'adverb', 'nevertheless', 'inverts: Trotzdem gingen wir.'],
          ['als', 'subordinating', 'when (single past event)', 'Als ich jung war, …'],
          ['wenn', 'subordinating', 'when / whenever / if', 'Wenn ich Zeit habe, …'],
          ['wann', 'question word only', 'when (question)', 'Ich weiß nicht, wann er kommt.'],
          ['damit', 'subordinating', 'so that (different subject)', '…damit sie es versteht.'],
          ['um … zu', 'infinitive construction', 'in order to (same subject)', '…um zu lernen.'],
          ['sodass', 'subordinating', 'so that (result)', '…sodass niemand versteht.'],
          ['nachdem', 'subordinating', 'after', 'Nachdem er gegessen hatte, …'],
          ['bevor', 'subordinating', 'before', 'Bevor wir gehen, …'],
          ['seitdem', 'subordinating', 'since (time)', 'Seitdem er weg ist, …'],
        ],
      },
      {
        type: 'example',
        de: 'Obwohl es regnete, sind wir gegangen. Es regnete, trotzdem gingen wir.',
        en: 'Although it rained, we went. — It rained; nevertheless we went.',
      },
      {
        type: 'example',
        de: 'Ich bleibe, denn ich bin müde. Ich bleibe, weil ich müde bin.',
        en: 'I am staying because I am tired. (denn = normal order; weil = verb at end)',
      },
      {
        type: 'example',
        de: 'Als ich jung war, wohnte ich hier. Wenn ich Zeit habe, lese ich.',
        en: 'When I was young, I lived here. — Whenever I have time, I read.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. Indirect questions
  // ─────────────────────────────────────────────
  {
    title: 'Indirect questions',
    blocks: [
      {
        type: 'text',
        body:
          'Indirect questions embed a question inside a statement or another question. The verb moves to the end of the embedded clause. Use "ob" for yes/no questions (no question word in the original), and keep the original question word (wer, was, wo, wann, warum, wie) for W-questions.',
      },
      {
        type: 'table',
        columns: ['Direct question', 'Indirect question', 'Connector'],
        rows: [
          ['Kommt er?', 'Ich weiß nicht, ob er kommt.', 'ob (yes/no)'],
          ['Wann kommt er?', 'Ich frage mich, wann er kommt.', 'wann'],
          ['Wo wohnt sie?', 'Er fragt, wo sie wohnt.', 'wo'],
          ['Warum bist du müde?', 'Sie möchte wissen, warum ich müde bin.', 'warum'],
          ['Was hat er gesagt?', 'Ich verstehe nicht, was er gesagt hat.', 'was'],
          ['Wie viel kostet das?', 'Kannst du sagen, wie viel das kostet?', 'wie viel'],
          ['Wer ist das?', 'Ich weiß nicht, wer das ist.', 'wer'],
        ],
      },
      {
        type: 'example',
        de: 'Ich weiß nicht, ob er morgen kommt.',
        en: 'I do not know whether he is coming tomorrow. (ob = yes/no, verb at end)',
      },
      {
        type: 'example',
        de: 'Kannst du mir sagen, warum das Projekt verschoben wurde?',
        en: 'Can you tell me why the project was postponed? (warum keeps its position, verb at end)',
      },
      {
        type: 'example',
        de: 'Sie fragte mich, wie lange ich schon Deutsch lerne.',
        en: 'She asked me how long I had been learning German.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. Relative clauses with was and wo
  // ─────────────────────────────────────────────
  {
    title: 'Relative clauses with was and wo',
    blocks: [
      {
        type: 'text',
        body:
          'Standard relative clauses use der/die/das. Two special relative pronouns appear in specific situations: "was" when the antecedent is a neuter indefinite pronoun or a whole clause, and "wo" when the antecedent is a place or when a preposition + relative pronoun combination is replaced.',
      },
      {
        type: 'subheading',
        text: 'Use "was" after:',
      },
      {
        type: 'table',
        columns: ['Antecedent type', 'Trigger words / pattern', 'Example'],
        rows: [
          ['neuter indefinite pronoun', 'alles, etwas, nichts, vieles', 'Alles, was er sagte, stimmte.'],
          ['nominalised adjective (neuter)', 'das Beste, das Schlimmste, das Einzige', 'Das Beste, was ich je gegessen habe.'],
          ['whole previous clause', '— (the entire idea)', 'Er kam pünktlich, was mich überraschte.'],
          ['das as demonstrative', '"das" referring to a thing', 'Das ist das, was ich meinte.'],
        ],
      },
      {
        type: 'subheading',
        text: 'Use "wo" after:',
      },
      {
        type: 'table',
        columns: ['Antecedent type', 'Example'],
        rows: [
          ['place nouns (Stadt, Land, Ort, Stelle)', 'Die Stadt, wo ich aufgewachsen bin, heißt Köln.'],
          ['preposition + relative pronoun (informal replacement)', 'Das Thema, worüber wir sprachen. (= über das)'],
        ],
      },
      {
        type: 'example',
        de: 'Alles, was er gesagt hat, war falsch.',
        en: 'Everything (that) he said was wrong. (was after alles)',
      },
      {
        type: 'example',
        de: 'Er hat die Prüfung bestanden, was uns alle gefreut hat.',
        en: 'He passed the exam, which made us all happy. (was refers to entire clause)',
      },
      {
        type: 'example',
        de: 'Das ist das Einzige, was ich noch tun kann.',
        en: 'That is the only thing I can still do. (was after das Einzige)',
      },
      {
        type: 'example',
        de: 'Das ist ein Thema, worüber man viel diskutieren kann.',
        en: 'That is a topic about which one can discuss a lot. (wo- compound replaces preposition + das)',
      },
    ],
  },
];
