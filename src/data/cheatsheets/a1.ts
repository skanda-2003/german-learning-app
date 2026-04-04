// a1.ts — A1 grammar cheat sheet (static reference)

import type { CheatSheetSection } from './types';

export const A1_CHEAT_SHEET: CheatSheetSection[] = [
  {
    title: 'Articles (der / die / das)',
    blocks: [
      {
        type: 'text',
        body:
          'German nouns have grammatical gender. The article in the dictionary is part of the word — learn der, die, or das with every noun.',
      },
      {
        type: 'table',
        columns: ['Article', 'Example nouns'],
        rows: [
          ['der (masculine)', 'der Mann, der Vater, der Tisch, der Tag, der Apfel, der Park'],
          ['die (feminine)', 'die Frau, die Mutter, die Tür, die Zeit, die Stadt, die Blume'],
          ['das (neuter)', 'das Kind, das Haus, das Buch, das Wasser, das Auto, das Fenster'],
        ],
      },
      {
        type: 'example',
        de: 'Der Mann liest das Buch.',
        en: 'The man is reading the book.',
      },
      {
        type: 'example',
        de: 'Die Frau und das Kind gehen in die Stadt.',
        en: 'The woman and the child are going into the city.',
      },
    ],
  },
  {
    title: 'Personal pronouns',
    blocks: [
      {
        type: 'text',
        body:
          'Subject pronouns replace the person or thing doing the action. “sie” (lowercase) = they or she depending on context; “Sie” (capital) = formal you.',
      },
      {
        type: 'table',
        columns: ['Pronoun', 'Meaning'],
        rows: [
          ['ich', 'I'],
          ['du', 'you (informal, singular)'],
          ['er', 'he / it (masc.)'],
          ['sie', 'she / it (fem.) / they (context)'],
          ['es', 'it (neut.)'],
          ['wir', 'we'],
          ['ihr', 'you (informal, plural)'],
          ['Sie', 'you (formal, always capital S)'],
        ],
      },
      {
        type: 'example',
        de: 'Wir lernen Deutsch. Sie (formal) sprechen gut.',
        en: 'We learn German. You (formal) speak well.',
      },
    ],
  },
  {
    title: 'sein and haben (present)',
    blocks: [
      {
        type: 'text',
        body: 'Two essential irregular verbs: “sein” (to be) and “haben” (to have).',
      },
      {
        type: 'subheading',
        text: 'sein',
      },
      {
        type: 'table',
        columns: ['Pronoun', 'Form'],
        rows: [
          ['ich', 'bin'],
          ['du', 'bist'],
          ['er/sie/es', 'ist'],
          ['wir', 'sind'],
          ['ihr', 'seid'],
          ['sie/Sie', 'sind'],
        ],
      },
      {
        type: 'subheading',
        text: 'haben',
      },
      {
        type: 'table',
        columns: ['Pronoun', 'Form'],
        rows: [
          ['ich', 'habe'],
          ['du', 'hast'],
          ['er/sie/es', 'hat'],
          ['wir', 'haben'],
          ['ihr', 'habt'],
          ['sie/Sie', 'haben'],
        ],
      },
      {
        type: 'example',
        de: 'Ich bin müde. Du hast Zeit.',
        en: 'I am tired. You have time.',
      },
    ],
  },
  {
    title: 'Present tense — regular verbs',
    blocks: [
      {
        type: 'text',
        body:
          'Remove the -en from the infinitive to get the stem, then add the endings below. Verbs whose stem ends in -d, -t, -m, -n often need an extra -e- before -st / -t (e.g. arbeiten → du arbeitest).',
      },
      {
        type: 'table',
        columns: ['Pronoun', 'Ending', 'lernen'],
        rows: [
          ['ich', '-e', 'lerne'],
          ['du', '-st', 'lernst'],
          ['er/sie/es', '-t', 'lernt'],
          ['wir', '-en', 'lernen'],
          ['ihr', '-t', 'lernt'],
          ['sie/Sie', '-en', 'lernen'],
        ],
      },
      {
        type: 'example',
        de: 'Ich lerne jeden Tag. Er kauft Brot.',
        en: 'I learn every day. He buys bread.',
      },
    ],
  },
  {
    title: 'Numbers 1–100 (quick reference)',
    blocks: [
      {
        type: 'table',
        columns: ['', ''],
        rows: [
          ['1–12', 'eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf'],
          ['13–19', 'dreizehn … neunzehn (number + zehn)'],
          ['20, 30…', 'zwanzig, dreißig, vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig'],
          ['21, 22…', 'einundzwanzig, zweiundzwanzig (ones + und + tens)'],
          ['100', 'hundert (einhundert)'],
        ],
      },
      {
        type: 'example',
        de: 'Ich bin dreißig Jahre alt. Es kostet neunzehn Euro.',
        en: 'I am thirty years old. It costs nineteen euros.',
      },
    ],
  },
  {
    title: 'Question words',
    blocks: [
      {
        type: 'text',
        body: 'These words start questions. The verb often comes next in yes/no style, or after the question word in W-questions.',
      },
      {
        type: 'table',
        columns: ['Word', 'Meaning', 'Example'],
        rows: [
          ['wer', 'who', 'Wer ist das?'],
          ['was', 'what', 'Was machst du?'],
          ['wo', 'where', 'Wo wohnst du?'],
          ['wann', 'when', 'Wann kommst du?'],
          ['wie', 'how', 'Wie geht es dir?'],
          ['warum', 'why', 'Warum lernst du Deutsch?'],
        ],
      },
      {
        type: 'example',
        de: 'Wo ist der Bahnhof? Wann fährt der Zug?',
        en: 'Where is the station? When does the train leave?',
      },
    ],
  },
  {
    title: 'Negation — nicht vs kein',
    blocks: [
      {
        type: 'text',
        body:
          'Use “nicht” to negate verbs, adjectives, or whole ideas. Use “kein” (no/not any) before nouns without a definite article — like “a” in negative sense.',
      },
      {
        type: 'subheading',
        text: 'nicht',
      },
      {
        type: 'example',
        de: 'Ich verstehe nicht.',
        en: 'I do not understand.',
      },
      {
        type: 'example',
        de: 'Das ist nicht teuer.',
        en: 'That is not expensive.',
      },
      {
        type: 'example',
        de: 'Er kommt heute nicht.',
        en: 'He is not coming today.',
      },
      {
        type: 'subheading',
        text: 'kein',
      },
      {
        type: 'example',
        de: 'Ich habe kein Auto.',
        en: 'I do not have a car.',
      },
      {
        type: 'example',
        de: 'Wir haben keine Zeit.',
        en: 'We do not have (any) time.',
      },
      {
        type: 'example',
        de: 'Das ist kein Problem.',
        en: 'That is not a problem.',
      },
    ],
  },
  {
    title: 'Basic word order (statement)',
    blocks: [
      {
        type: 'text',
        body:
          'In a simple main clause, the verb is usually in second position: Subject — Verb — Object (or other details). Time/manner/place often come after the object in practice, but start with S–V–O.',
      },
      {
        type: 'example',
        de: 'Der Mann kauft den Apfel.',
        en: 'The man buys the apple. (Subject — Verb — Object)',
      },
      {
        type: 'example',
        de: 'Ich trinke Wasser.',
        en: 'I drink water.',
      },
      {
        type: 'example',
        de: 'Wir lernen heute Deutsch.',
        en: 'We are learning German today.',
      },
    ],
  },
];
