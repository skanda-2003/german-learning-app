// b2.ts — B2 grammar cheat sheet (static reference)

import type { CheatSheetSection } from './types';

export const B2_CHEAT_SHEET: CheatSheetSection[] = [
  {
    title: 'Extended participial phrases',
    blocks: [
      {
        type: 'text',
        body:
          'A participial attribute replaces a relative clause and sits before the noun: “der Mann, der schläft” → “der schlafende Mann”. Present participle: infinitive + -d (lachend). Past participle often used like an adjective with ge- pattern dropped in attributive use per standard rules (der geschlossene Laden).',
      },
      {
        type: 'example',
        de: 'Der Mann, der die Zeitung liest, ist mein Onkel. → Der die Zeitung lesende Mann ist mein Onkel.',
        en: 'The man who is reading the newspaper is my uncle.',
      },
      {
        type: 'example',
        de: 'Das von der Firma gebaute Haus steht am See.',
        en: 'The house built by the company stands by the lake.',
      },
    ],
  },
  {
    title: 'Konjunktiv I (reported speech)',
    blocks: [
      {
        type: 'text',
        body:
          'Used in formal reported speech (especially journalism) instead of repeating someone’s exact words. Often identical to present indicative for many persons; “sei / habe / werde” etc. mark Konjunktiv I when distinct. If a form is ambiguous, Konjunktiv II may replace it.',
      },
      {
        type: 'example',
        de: 'Er sagt, er sei krank. Sie behauptet, sie habe keine Zeit.',
        en: 'He says he is (reportedly) sick. She claims she has no time.',
      },
      {
        type: 'example',
        de: 'Der Minister erklärte, die Zahlen stimmten.',
        en: 'The minister stated that the figures were correct (reported).',
      },
    ],
  },
  {
    title: 'Modal particles',
    blocks: [
      {
        type: 'text',
        body:
          'Small words that shade tone — hard to translate one-to-one. They soften, emphasize, express resignation, or mark shared knowledge.',
      },
      {
        type: 'table',
        columns: ['Particle', 'Typical nuance', 'Example'],
        rows: [
          ['doch', 'insistence / contradiction', 'Komm doch mit! (Come along!)'],
          ['ja', 'known fact / reassurance', 'Das ist ja einfach.'],
          ['mal', 'casual soften', 'Sag mal, was meinst du?'],
          ['eigentlich', 'hedge / “actually”', 'Eigentlich wollte ich früher gehen.'],
          ['wohl', 'probability / mild', 'Er wird wohl recht haben.'],
          ['halt', 'resignation / “just how it is”', 'So ist das halt.'],
        ],
      },
      {
        type: 'example',
        de: 'Das ist doch nicht dein Ernst!',
        en: 'You cannot be serious! (doch adds emotional force)',
      },
    ],
  },
  {
    title: 'Complex connectors',
    blocks: [
      {
        type: 'text',
        body:
          'obwohl + verb at end in the clause; “trotzdem” is an adverb in the main clause (not a subordinator). weil/denn: “weil” subordinates with V-end; “denn” is coordinating with normal word order. als = single past event when; wenn = whenever/if in present/future; wann only in questions.',
      },
      {
        type: 'example',
        de: 'Obwohl es regnete, sind wir gegangen. Es regnete, trotzdem gingen wir.',
        en: 'Although it rained, we went. It rained; nevertheless we went.',
      },
      {
        type: 'example',
        de: 'Ich bleibe, denn ich bin müde. Ich bleibe, weil ich müde bin.',
        en: 'I am staying because I am tired. (denn vs weil word order)',
      },
      {
        type: 'example',
        de: 'Als ich jung war, wohnte ich hier. Wenn ich Zeit habe, lese ich.',
        en: 'When I was young, I lived here. Whenever I have time, I read.',
      },
    ],
  },
  {
    title: 'Nominalisierung',
    blocks: [
      {
        type: 'text',
        body:
          'Turn verbs/adjectives into nouns for formal style. Verb → das + capitalized infinitive (often neuter): lernen → das Lernen. Adjective → abstract noun with -keit, -heit, -nis, -schaft, etc.: müde → die Müdigkeit; schnell → die Schnelligkeit.',
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
  {
    title: 'Genitiv prepositions (fuller set)',
    blocks: [
      {
        type: 'text',
        body:
          'These prepositions take the genitive object (in formal German). Spoken German sometimes uses Dativ instead, but exams and formal writing expect Genitiv.',
      },
      {
        type: 'table',
        columns: ['Preposition', 'Example'],
        rows: [
          ['wegen', 'wegen des Sturms'],
          ['trotz', 'trotz des Regens'],
          ['während', 'während des Meetings'],
          ['innerhalb', 'innerhalb der Frist'],
          ['außerhalb', 'außerhalb der Stadt'],
          ['anstatt / statt', 'anstatt des Busses'],
          ['aufgrund', 'aufgrund der Nachfrage'],
          ['mithilfe / mit Hilfe', 'mithilfe des Lehrers'],
        ],
      },
      {
        type: 'example',
        de: 'Aufgrund des Wetters wurde das Spiel abgesagt.',
        en: 'The match was cancelled due to the weather.',
      },
    ],
  },
];
