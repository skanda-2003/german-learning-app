// a2.ts — A2 grammar cheat sheet (static reference)

import type { CheatSheetSection } from './types';

export const A2_CHEAT_SHEET: CheatSheetSection[] = [
  {
    title: 'Nominativ vs Akkusativ',
    blocks: [
      {
        type: 'text',
        body:
          'Nominativ marks the subject (who/what does the action). Akkusativ marks the direct object (what is “acted on”). After many prepositions (durch, für, gegen, ohne, um…) and with “es gibt” the object is accusative.',
      },
      {
        type: 'table',
        columns: ['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
        rows: [
          ['Nominativ', 'der', 'die', 'das', 'die'],
          ['Akkusativ', 'den', 'die', 'das', 'die'],
        ],
      },
      {
        type: 'example',
        de: 'Der Mann kauft den Apfel.',
        en: 'The man buys the apple. (Mann = nom., Apfel = acc.)',
      },
      {
        type: 'example',
        de: 'Ich sehe die Frau. Wir haben das Buch.',
        en: 'I see the woman. We have the book.',
      },
    ],
  },
  {
    title: 'Dativ',
    blocks: [
      {
        type: 'text',
        body:
          'Dativ often marks the indirect object (to/for someone) and is used after certain verbs and many prepositions (mit, nach, zu, aus, bei…).',
      },
      {
        type: 'table',
        columns: ['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
        rows: [
          ['Dativ', 'dem', 'der', 'dem', 'den + n'],
        ],
      },
      {
        type: 'subheading',
        text: 'Common verbs + Dativ',
      },
      {
        type: 'table',
        columns: ['Verb', 'Example'],
        rows: [
          ['helfen', 'Ich helfe dem Kind.'],
          ['danken', 'Wir danken der Lehrerin.'],
          ['gefallen', 'Das Lied gefällt mir.'],
          ['gehören', 'Das Auto gehört ihm.'],
        ],
      },
      {
        type: 'example',
        de: 'Kannst du mir helfen? Das gefällt uns sehr.',
        en: 'Can you help me? We really like that.',
      },
    ],
  },
  {
    title: 'Perfekt — haben vs sein',
    blocks: [
      {
        type: 'text',
        body:
          'Perfekt = auxiliary (haben or sein) + Partizip II. Use “sein” with most intransitive verbs of motion/change of place (gehen, kommen, fahren…) and “sein” (bleiben, werden in some patterns). Most other verbs use “haben”.',
      },
      {
        type: 'subheading',
        text: 'Regular Partizip II',
      },
      {
        type: 'text',
        body: 'ge- + stem + -t (e.g. machen → gemacht). Verbs with stem ending -eln, -ieren often have no ge- (studieren → studiert).',
      },
      {
        type: 'subheading',
        text: 'Many strong verbs',
      },
      {
        type: 'text',
        body: 'ge- + changed stem + -en (e.g. sehen → gesehen, gehen → gegangen).',
      },
      {
        type: 'example',
        de: 'Ich habe Deutsch gelernt. Er ist nach Hause gegangen.',
        en: 'I learned German. He went home.',
      },
      {
        type: 'example',
        de: 'Wir sind gefahren. Sie hat Pizza gekocht.',
        en: 'We drove/travelled. She cooked pizza.',
      },
    ],
  },
  {
    title: 'Separable verbs',
    blocks: [
      {
        type: 'text',
        body:
          'Prefix separates and goes to the end of the clause in present/main clauses; it sticks to the verb in infinitives/subordinate clauses with zu.',
      },
      {
        type: 'table',
        columns: ['Infinitive', 'Present'],
        rows: [
          ['anrufen', 'Ich rufe dich an.'],
          ['aufstehen', 'Er steht früh auf.'],
          ['mitkommen', 'Kommst du mit?'],
          ['zurückkommen', 'Wir kommen morgen zurück.'],
          ['einsteigen', 'Sie steigt in den Bus ein.'],
        ],
      },
      {
        type: 'example',
        de: 'Ich möchte heute früh aufstehen.',
        en: 'I want to get up early today. (prefix stays with verb in zu-infinitive)',
      },
    ],
  },
  {
    title: 'Two-way prepositions (Wechselpräpositionen)',
    blocks: [
      {
        type: 'text',
        body:
          'an, auf, hinter, in, neben, über, unter, vor, zwischen: Akkusativ for movement into/toward a place (Wohin?); Dativ for static location (Wo?).',
      },
      {
        type: 'example',
        de: 'Ich lege das Buch auf den Tisch. Das Buch liegt auf dem Tisch.',
        en: 'I put the book on the table (motion → acc.). The book is on the table (place → dat.).',
      },
      {
        type: 'example',
        de: 'Sie geht in die Schule. Sie ist in der Schule.',
        en: 'She goes into the school. She is at school.',
      },
    ],
  },
  {
    title: 'Modal verbs (present)',
    blocks: [
      {
        type: 'text',
        body:
          'Modal + infinitive at the end of the main clause. Meanings: können (can), müssen (must), wollen (want), dürfen (may), sollen (should/supposed to), möchten (would like).',
      },
      {
        type: 'table',
        columns: ['', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'möchten'],
        rows: [
          ['ich', 'kann', 'muss', 'will', 'darf', 'soll', 'möchte'],
          ['du', 'kannst', 'musst', 'willst', 'darfst', 'sollst', 'möchtest'],
          ['er/sie/es', 'kann', 'muss', 'will', 'darf', 'soll', 'möchte'],
          ['wir', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'möchten'],
          ['ihr', 'könnt', 'müsst', 'wollt', 'dürft', 'sollt', 'möchtet'],
          ['sie/Sie', 'können', 'müssen', 'wollen', 'dürfen', 'sollen', 'möchten'],
        ],
      },
      {
        type: 'example',
        de: 'Ich möchte heute ins Kino gehen.',
        en: 'I would like to go to the cinema today.',
      },
    ],
  },
  {
    title: 'Comparative and superlative',
    blocks: [
      {
        type: 'text',
        body:
          'Comparative: adjective + -er (often umlaut on stem vowel). Superlative: am + adjective + -sten. Use “als” in comparisons, “wie” for equality.',
      },
      {
        type: 'table',
        columns: ['Positive', 'Comparative', 'Superlative'],
        rows: [
          ['schnell', 'schneller', 'am schnellsten'],
          ['gut', 'besser', 'am besten'],
          ['viel', 'mehr', 'am meisten'],
          ['gern', 'lieber', 'am liebsten'],
        ],
      },
      {
        type: 'example',
        de: 'Berlin ist größer als Hamburg. Dieses Buch ist am interessantesten.',
        en: 'Berlin is bigger than Hamburg. This book is the most interesting.',
      },
    ],
  },
];
