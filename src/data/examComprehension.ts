// examComprehension.ts — Exam Prep: Comprehension (newspaper / notice / ad style)
//
// Static German texts in real-world formats. Open tasks are answered in German;
// Gemini evaluates the response. Original practice content (exam-style formats).

import type { Level } from '../store/useLevelStore';

export type ComprehensionItem = {
  id: string;
  /** Shown as small label, e.g. NOTICE, ADVERTISEMENT */
  formatLabel: string;
  title: string;
  /** Authentic-style German text */
  textDe: string;
  /** Open questions — student answers in German */
  tasks: string[];
};

const A1_ITEMS: ComprehensionItem[] = [
  {
    id: 'a1_co_01',
    formatLabel: 'NOTICE',
    title: 'Stadtbibliothek — Öffnungszeiten',
    textDe:
      'Stadtbibliothek Mitte\n\nMontag: geschlossen\nDienstag–Freitag: 10:00–18:00 Uhr\nSamstag: 10:00–14:00 Uhr\nSonntag: geschlossen\n\nAusleihe: maximal 4 Bücher, 4 Wochen.\nRückgabe auch im Buchautomaten vor der Tür.',
    tasks: [
      'Schreibe in zwei oder drei Sätzen auf Deutsch: Wann ist die Bibliothek geöffnet?',
      'Wie viele Bücher kann man ausleihen? Antworte in einem kurzen Satz auf Deutsch.',
    ],
  },
  {
    id: 'a1_co_02',
    formatLabel: 'ADVERTISEMENT',
    title: 'Bäckerei Sonne — Angebot',
    textDe:
      'Bäckerei Sonne, Hauptstraße 12\n\nDiese Woche:\nBrötchen: 0,35 € (statt 0,45 €)\nKuchenstück: 2,50 €\nKaffee klein: 1,80 €\n\nMontag bis Samstag: 7:00–19:00 Uhr',
    tasks: [
      'Fasse das Angebot in zwei Sätzen auf Deutsch zusammen.',
      'Was kostet ein kleiner Kaffee? Schreibe eine kurze Antwort auf Deutsch.',
    ],
  },
  {
    id: 'a1_co_03',
    formatLabel: 'NOTICE',
    title: 'Haus — Briefkästen',
    textDe:
      'Liebe Bewohnerinnen und Bewohner,\n\nbitte schreiben Sie Ihre Namen auf die Briefkästen.\nDer Hausmeister kommt am Freitag.\nWer Fragen hat, kann anrufen: 030 1234567.\n\nVielen Dank!\nHausverwaltung',
    tasks: [
      'Was sollen die Bewohner tun? Antworte in zwei Sätzen auf Deutsch.',
      'Wann kommt der Hausmeister?',
    ],
  },
  {
    id: 'a1_co_04',
    formatLabel: 'SHORT MESSAGE',
    title: 'SMS von Lisa',
    textDe:
      'Hallo! Ich bin heute krank und bleibe zu Hause. Kannst du mir die Hausaufgaben für Mathe schicken? Danke! Bis morgen. Lisa',
    tasks: [
      'Schreibe auf Deutsch: Warum schreibt Lisa? Was möchte sie von dir?',
    ],
  },
  {
    id: 'a1_co_05',
    formatLabel: 'SHOP SIGN',
    title: 'Im Supermarkt',
    textDe:
      'Heute im Angebot:\n\nMilch 1l — 0,99 €\nButter — 1,29 €\nÄpfel (1 kg) — 2,49 €\n\nAn der Kasse nur Barzahlung oder Karte.\nPfandflaschen bitte an der Maschine zurückgeben.',
    tasks: [
      'Schreibe drei Sätze auf Deutsch: Was kostet was? Was muss man mit Pfandflaschen tun?',
    ],
  },
];

const A2_ITEMS: ComprehensionItem[] = [
  {
    id: 'a2_co_01',
    formatLabel: 'JOB AD',
    title: 'Teilzeit in der Buchhandlung',
    textDe:
      'Buchhandlung am Markt sucht ab sofort eine Verkäuferin / einen Verkäufer (m/w/d) in Teilzeit (20 Stunden/Woche).\n\nSie haben Spaß am Umgang mit Kunden und Interesse an Büchern. Erfahrung im Einzelhandel ist von Vorteil, aber nicht zwingend.\n\nArbeitszeiten: Dienstag bis Samstag, auch samstags bis 18 Uhr.\nBewerbungen per E-Mail an: jobs@buchhandlung-am-markt.de',
    tasks: [
      'Fasse die Stellenanzeige in vier bis fünf Sätzen auf Deutsch zusammen.',
      'Welche Aufgaben und welche Zeiten werden erwähnt?',
    ],
  },
  {
    id: 'a2_co_02',
    formatLabel: 'NOTICE',
    title: 'Treppenhaus — Reinigung',
    textDe:
      'Hinweis für alle Mieter\n\nAm Mittwoch, 15. Mai, wird das Treppenhaus von 8 bis 12 Uhr gründlich gereinigt. Bitte stellen Sie in dieser Zeit keine Fahrräder und keine Kinderwagen in den Flur.\n\nDie Hausverwaltung bittet um Verständnis.',
    tasks: [
      'Erkläre auf Deutsch, was am genannten Tag passiert und was die Mieter beachten sollen.',
    ],
  },
  {
    id: 'a2_co_03',
    formatLabel: 'EVENT',
    title: 'Sommerfest im Stadtpark',
    textDe:
      'Sommerfest „Musik & Freunde“\nSamstag, 22. Juni, 14–22 Uhr, Stadtpark West (bei der großen Eiche)\n\nLive-Musik, Kinderprogramm, Imbiss und Getränke. Eintritt frei — Spenden für den Spielplatz sind willkommen.\nBei Regen findet das Fest in der benachbarten Turnhalle statt.',
    tasks: [
      'Schreibe eine kurze Einladung an einen Freund auf Deutsch (4–5 Sätze) mit den wichtigsten Informationen.',
      'Was passiert bei Regen?',
    ],
  },
  {
    id: 'a2_co_04',
    formatLabel: 'NEWS BRIEF',
    title: 'Lokalnachrichten',
    textDe:
      'Neue Fahrradstraße in der Innenstadt\n\nAb nächstem Monat gilt auf der Langen Straße Tempo 20 für Autos. Radfahrerinnen und Radfahrer haben Vorrang. Die Stadt hofft auf weniger Unfälle und ruhigeren Verkehr. Anwohner können weiterhin mit dem Auto zu den Garagen fahren.',
    tasks: [
      'Fasse den Text in eigenen Worten auf Deutsch zusammen (mindestens drei Sätze).',
      'Was bedeutet das für Autofahrer und Radfahrer?',
    ],
  },
  {
    id: 'a2_co_05',
    formatLabel: 'SERVICE',
    title: 'Internetanbieter — Kündigung',
    textDe:
      'Sehr geehrte Kundin, sehr geehrter Kunde,\n\nIhr Vertrag läuft monatlich. Eine Kündigung ist jederzeit zum Monatsende möglich. Bitte senden Sie die Kündigung schriftlich oder über Ihr Online-Konto mindestens 14 Tage vor Monatsende.\n\nMit freundlichen Grüßen\nIhr NetCom-Team',
    tasks: [
      'Erkläre auf Deutsch in drei oder vier Sätzen, wie man den Vertrag kündigen kann.',
    ],
  },
];

/** Comprehension texts by CEFR level. B1/B2 can be filled later. */
export const COMPREHENSION_BY_LEVEL: Record<Level, ComprehensionItem[]> = {
  A1: A1_ITEMS,
  A2: A2_ITEMS,
  B1: [],
  B2: [],
};
