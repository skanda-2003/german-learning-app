// b1.ts — B1 grammar cheat sheet (static reference)

import type { CheatSheetSection } from './types';

export const B1_CHEAT_SHEET: CheatSheetSection[] = [
  {
    title: 'Konjunktiv II (present-style)',
    blocks: [
      {
        type: 'text',
        body:
          'Used for polite requests, hypothetical situations, and wishes. Often formed with “würde” + infinitive. Many common verbs have irregular Konjunktiv II stems (wäre, hätte, könnte…).',
      },
      {
        type: 'table',
        columns: ['Form', 'Meaning / use'],
        rows: [
          ['würde + Inf.', 'Ich würde gern kommen. (I would like to come.)'],
          ['wäre', 'Wenn ich reich wäre… (If I were rich… )'],
          ['hätte', 'Ich hätte Zeit. (I would have time.)'],
          ['könnte / müsste / dürfte / sollte', 'modal Konjunktiv II forms'],
        ],
      },
      {
        type: 'example',
        de: 'Könnten Sie mir bitte helfen?',
        en: 'Could you please help me? (polite)',
      },
      {
        type: 'example',
        de: 'Wenn ich mehr Geld hätte, würde ich verreisen.',
        en: 'If I had more money, I would travel away.',
      },
    ],
  },
  {
    title: 'Passive voice',
    blocks: [
      {
        type: 'text',
        body:
          'Process passive: werden + Partizip II. Present passive: wird/werden + Partizip II. Past: wurde(n) / sind geworden patterns with passive of transitive verbs. Agent optional: von + Dativ (colloquial) or formal “durch”.',
      },
      {
        type: 'example',
        de: 'Das Haus wird gebaut. Der Brief wurde geschrieben.',
        en: 'The house is being built. The letter was written.',
      },
      {
        type: 'example',
        de: 'Das Buch wird von vielen Studenten gelesen.',
        en: 'The book is read by many students.',
      },
    ],
  },
  {
    title: 'Subordinate clauses (verb at the end)',
    blocks: [
      {
        type: 'text',
        body:
          'After subordinating conjunctions, the finite verb goes to the end of the clause.',
      },
      {
        type: 'table',
        columns: ['Conjunction', 'Example'],
        rows: [
          ['weil', 'Ich bleibe, weil ich müde bin.'],
          ['dass', 'Er sagt, dass er kommt.'],
          ['obwohl', 'Obwohl es regnet, gehen wir spazieren.'],
          ['wenn', 'Wenn ich Zeit habe, lese ich.'],
          ['als', 'Als ich klein war, wohnte ich in Berlin.'],
          ['ob', 'Ich weiß nicht, ob er kommt.'],
          ['damit', 'Ich lerne, damit ich die Prüfung bestehe.'],
          ['bevor / nachdem', 'Ruf mich an, bevor du kommst. Nachdem er gegessen hatte, schlief er.'],
        ],
      },
      {
        type: 'example',
        de: 'Sie macht die Tür zu, damit es nicht kalt wird.',
        en: 'She closes the door so that it does not get cold.',
      },
    ],
  },
  {
    title: 'Genitiv (basics)',
    blocks: [
      {
        type: 'text',
        body:
          'Shows possession or relation. Articles: des (masc./neut.), der (fem.), der (plural). In spoken German, often replaced by von + Dativ, but Genitiv stays common in writing and set phrases.',
      },
      {
        type: 'table',
        columns: ['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
        rows: [
          ['Genitiv', 'des', 'der', 'des', 'der'],
        ],
      },
      {
        type: 'subheading',
        text: 'Common Genitiv prepositions',
      },
      {
        type: 'table',
        columns: ['Preposition', 'Example'],
        rows: [
          ['wegen', 'wegen des Wetters'],
          ['trotz', 'trotz der Kälte'],
          ['während', 'während der Ferien'],
          ['innerhalb', 'innerhalb der Stadt'],
          ['außerhalb', 'außerhalb des Zentrums'],
        ],
      },
      {
        type: 'example',
        de: 'Das ist das Auto meines Bruders.',
        en: 'That is my brother’s car.',
      },
    ],
  },
  {
    title: 'Reflexive verbs',
    blocks: [
      {
        type: 'text',
        body:
          'Reflexive pronoun “sich” matches person. Accusative reflexive when it is the direct object; dative when another accusative object is present (Ich wasche mir die Hände).',
      },
      {
        type: 'table',
        columns: ['Verb', 'Example'],
        rows: [
          ['sich freuen', 'Ich freue mich auf das Wochenende.'],
          ['sich erinnern', 'Er erinnert sich an den Tag.'],
          ['sich waschen', 'Sie wäscht sich. / Ich wasche mir die Hände.'],
          ['sich vorstellen', 'Darf ich mich vorstellen?'],
          ['sich fühlen', 'Wir fühlen uns wohl.'],
        ],
      },
      {
        type: 'example',
        de: 'Ich habe mich erkältet. Sie legt sich hin.',
        en: 'I caught a cold. She lies down.',
      },
    ],
  },
  {
    title: 'da- compounds',
    blocks: [
      {
        type: 'text',
        body:
          'Replace preposition + pronoun when referring back to a whole idea or thing: darauf (on it), damit (with it), dafür (for it), darüber (about it), davon (of/from it). “Da(r)-” fuses with prepositions starting with vowel as “dar-” (an → daran).',
      },
      {
        type: 'example',
        de: 'Ich warte auf den Bus. Darauf warte ich schon lange.',
        en: 'I am waiting for the bus. I have been waiting for it a long time.',
      },
      {
        type: 'example',
        de: 'Sie spricht von dem Problem. Er weiß nichts davon.',
        en: 'She talks about the problem. He knows nothing about it.',
      },
    ],
  },
];
