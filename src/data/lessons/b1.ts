// b1.ts — B1 lesson content (12 lessons)
//
// Each topic string must match exactly what appears in src/data/grammar/b1.ts.

import type { Lesson } from './types';

export const B1_LESSONS: Lesson[] = [

  // ─── 1. Genitiv case ────────────────────────────────────────────────────────
  {
    topic: 'Genitiv case',
    level: 'B1',
    title: 'The Genitive case (Genitiv)',
    explanation:
      'The Genitiv expresses possession or belonging — the equivalent of English "of" or the apostrophe-s ("the teacher\'s book" = "das Buch des Lehrers"). It is the fourth German case and appears less in spoken language but frequently in written German.\n\n' +
      'The Genitiv articles are: des (masculine/neuter), der (feminine/plural). Masculine and neuter nouns also add "-s" or "-es" to the noun itself: der Mann → des Mannes, das Buch → des Buches. Feminine nouns and plurals do not change.\n\n' +
      'Genitiv prepositions are common in formal German: wegen (because of), trotz (despite), während (during), innerhalb (within), außerhalb (outside of), statt/anstatt (instead of).',
    keyPoints: [
      'Genitiv articles: des (m/n), der (f/pl)',
      'Masculine and neuter nouns add -s or -es: des Mannes, des Kindes',
      'Feminine and plural nouns do not change: der Frau, der Kinder',
      'Expresses possession: das Auto meines Vaters (my father\'s car)',
      'Genitiv prepositions: wegen, trotz, während, statt, innerhalb, außerhalb',
    ],
    examples: [
      { german: 'Das ist das Auto meines Vaters.',     english: 'That is my father\'s car.',          note: 'Vater (m) → meines Vaters' },
      { german: 'Die Farbe des Himmels ist blau.',     english: 'The colour of the sky is blue.',     note: 'Himmel (m) → des Himmels' },
      { german: 'Wegen des Regens bleibe ich zu Hause.', english: 'Because of the rain I stay at home.', note: 'wegen + Genitiv' },
      { german: 'Trotz des schlechten Wetters gehen wir spazieren.', english: 'Despite the bad weather we go for a walk.', note: 'trotz + Genitiv' },
      { german: 'Das Zimmer der Kinder ist klein.',    english: 'The children\'s room is small.',      note: 'Kinder (pl) → der Kinder' },
      { german: 'Am Ende des Tages bin ich müde.',     english: 'At the end of the day I am tired.',  note: 'Tag (m) → des Tages' },
    ],
    commonMistake:
      'Wrong: "das Auto von meinem Vater" (informal spoken) vs correct written German: "das Auto meines Vaters". In formal writing and exams, use the Genitiv construction rather than "von + Dativ".',
  },

  // ─── 2. Infinitive constructions: um...zu / ohne...zu / statt...zu ──────────
  {
    topic: 'Infinitive constructions: um...zu / ohne...zu / statt...zu',
    level: 'B1',
    title: 'Infinitive constructions: um…zu, ohne…zu, statt…zu',
    explanation:
      'These three constructions combine a conjunction with "zu + infinitive" to add meaning to a sentence. The infinitive always goes to the end of the construction.\n\n' +
      '"Um…zu" expresses purpose — in order to: "Ich lerne Deutsch, um in Deutschland zu arbeiten." "Ohne…zu" means without doing something: "Er ging raus, ohne sich zu verabschieden." "Statt…zu" (or "anstatt…zu") means instead of doing something: "Sie las ein Buch, statt fernzusehen."\n\n' +
      'Important: the subject of both clauses must be the same person. You cannot use "um…zu" if the subjects differ — in that case use "damit" (so that) with a full subordinate clause instead.',
    keyPoints: [
      'um…zu = in order to (purpose)',
      'ohne…zu = without (doing)',
      'statt…zu / anstatt…zu = instead of (doing)',
      'Infinitive goes to the end; with separable verbs: prefix + zu + stem',
      'Subject of both clauses must be the same — otherwise use damit/ohne dass',
    ],
    examples: [
      { german: 'Ich spare Geld, um ein Auto zu kaufen.',         english: 'I am saving money in order to buy a car.',        note: 'um…zu = purpose' },
      { german: 'Er lernt viel, um die Prüfung zu bestehen.',     english: 'He studies a lot in order to pass the exam.',     note: 'um…zu' },
      { german: 'Sie ging raus, ohne einen Mantel anzuziehen.',   english: 'She went out without putting on a coat.',         note: 'ohne…zu + separable verb' },
      { german: 'Er aß weiter, ohne aufzuhören.',                 english: 'He kept eating without stopping.',                note: 'ohne…zu + separable verb' },
      { german: 'Ich sehe fern, statt zu lernen.',                english: 'I watch TV instead of studying.',                 note: 'statt…zu' },
      { german: 'Sie kaufte ein neues Handy, anstatt das alte zu reparieren.', english: 'She bought a new phone instead of repairing the old one.', note: 'anstatt…zu' },
    ],
    commonMistake:
      'Wrong: "Ich lerne Deutsch, um mein Chef in Deutschland zu arbeiten." Correct: use "damit" when subjects differ — "Ich lerne Deutsch, damit mein Chef mich in Deutschland einsetzen kann." Um…zu requires the same subject in both clauses.',
  },

  // ─── 3. Konjunktiv II: sein / haben / modals ─────────────────────────────────
  {
    topic: 'Konjunktiv II: sein / haben / modals',
    level: 'B1',
    title: 'Konjunktiv II: sein, haben and modals',
    explanation:
      'The Konjunktiv II is the subjunctive mood — used for hypothetical situations, polite requests, and wishes. For "sein", "haben", and the modals, Germans use the direct Konjunktiv II forms rather than "würde + infinitive".\n\n' +
      '"Sein" Konjunktiv II: ich wäre, du wärst, er wäre, wir wären, ihr wärt, sie wären. "Haben": ich hätte, du hättest, er hätte, wir hätten, ihr hättet, sie hätten.\n\n' +
      'Modal Konjunktiv II: restore the umlaut and add Konjunktiv endings. können → könnte, müssen → müsste, dürfen → dürfte, sollen → sollte, wollen → wollte. "Könnte", "müsste", and "dürfte" are especially common for polite requests.',
    keyPoints: [
      'sein K.II: wäre / wärst / wäre / wären / wärt / wären',
      'haben K.II: hätte / hättest / hätte / hätten / hättet / hätten',
      'Modals: add umlaut back + -te endings: könnte, müsste, dürfte, sollte, wollte',
      'Use these forms directly — never "würde sein" or "würde haben"',
      '"Könnten Sie…?" and "Ich hätte gern…" are essential polite phrases',
    ],
    examples: [
      { german: 'Wenn ich reich wäre, würde ich reisen.',   english: 'If I were rich, I would travel.',         note: 'wäre = Konjunktiv II of sein' },
      { german: 'Ich hätte gern einen Kaffee.',             english: 'I would like a coffee.',                  note: 'hätte = polite wish' },
      { german: 'Könnten Sie mir helfen?',                  english: 'Could you help me?',                      note: 'könnte = polite request' },
      { german: 'Das müsste eigentlich funktionieren.',     english: 'That ought to work.',                     note: 'müsste = soft obligation/expectation' },
      { german: 'Dürfte ich kurz fragen?',                  english: 'Might I ask briefly?',                    note: 'dürfte = very polite permission request' },
      { german: 'Wenn er mehr Zeit hätte, käme er mit.',   english: 'If he had more time, he would come along.', note: 'hätte + Konjunktiv II result clause' },
    ],
    commonMistake:
      'Wrong: "Wenn ich reich würde sein…" Correct: "Wenn ich reich wäre…" — never combine "würde" with "sein" or "haben". Use the direct Konjunktiv II forms wäre/hätte.',
  },

  // ─── 4. Konjunktiv II: würden + infinitive ───────────────────────────────────
  {
    topic: 'Konjunktiv II: würden + infinitive',
    level: 'B1',
    title: 'Konjunktiv II: würde + infinitive',
    explanation:
      '"Würde + infinitive" is the most common way to express hypothetical or polite meaning for most regular and irregular verbs in the Konjunktiv II. It works like English "would": "Ich würde gern kommen" = "I would like to come".\n\n' +
      '"Würde" is conjugated: ich würde, du würdest, er würde, wir würden, ihr würdet, sie würden. The main verb goes to the end as a bare infinitive — exactly like a modal verb construction.\n\n' +
      'Use "würde + infinitive" for all regular verbs and for most irregular verbs in everyday speech. Exceptions: sein → wäre, haben → hätte, and the modals (könnte, müsste, etc.) — these always use their own Konjunktiv II forms.',
    keyPoints: [
      'würde + infinitive = "would + verb" for most verbs',
      'ich würde / du würdest / er würde / wir würden / ihr würdet / sie würden',
      'Main verb goes to the end as infinitive',
      'Do NOT use würde + sein/haben/modals — use wäre/hätte/könnte etc. instead',
      'Common in "wenn" (if) conditional sentences',
    ],
    examples: [
      { german: 'Ich würde gern mitkommen.',              english: 'I would like to come along.',         note: 'würde + infinitive' },
      { german: 'Was würdest du in meiner Situation tun?', english: 'What would you do in my situation?', note: 'würdest + infinitive at end' },
      { german: 'Er würde lieber zu Hause bleiben.',      english: 'He would rather stay at home.',       note: 'würde + bleiben' },
      { german: 'Wenn ich Zeit hätte, würde ich mehr lesen.', english: 'If I had time, I would read more.', note: 'conditional: würde in main clause' },
      { german: 'Würden Sie bitte leiser sprechen?',      english: 'Would you please speak more quietly?', note: 'polite request with würden' },
      { german: 'Das würde ich nicht machen.',            english: 'I would not do that.',                note: 'negation with würde' },
    ],
    commonMistake:
      'Wrong: "Ich würde sein müde." Correct: "Ich wäre müde." — do not use "würde" with "sein". And remember the infinitive always goes last: "würde … kaufen" not "würde kaufen es".',
  },

  // ─── 5. Passive voice: Präsens ───────────────────────────────────────────────
  {
    topic: 'Passive voice: Präsens',
    level: 'B1',
    title: 'Passive voice: present tense',
    explanation:
      'The passive voice shifts the focus from who does an action to what is being done. In German the present passive is formed with "werden" (conjugated) + past participle at the end.\n\n' +
      '"Das Haus wird gebaut" — the house is being built. The original subject (the builder) is omitted or introduced with "von + Dativ": "Das Haus wird von den Arbeitern gebaut" (The house is being built by the workers).\n\n' +
      'The object of the active sentence (Akkusativ) becomes the subject (Nominativ) in the passive. This is the key transformation to understand: "Die Arbeiter bauen das Haus" (active) → "Das Haus wird gebaut" (passive).',
    keyPoints: [
      'Structure: werden (conjugated) + past participle (end)',
      'Active object → passive subject',
      '"von + Dativ" to name the agent (optional)',
      'werden conjugation: wird (er/sie/es), werden (wir/sie), werdet (ihr)',
      'The past participle does not change form in the passive',
    ],
    examples: [
      { german: 'Das Haus wird gebaut.',                  english: 'The house is being built.',               note: 'basic passive: wird + participle' },
      { german: 'Die Tür wird geöffnet.',                 english: 'The door is being opened.',               note: 'wird + geöffnet' },
      { german: 'Das Buch wird von vielen Leuten gelesen.', english: 'The book is read by many people.',      note: 'von + Dativ for agent' },
      { german: 'Hier wird Deutsch gesprochen.',          english: 'German is spoken here.',                  note: 'no subject — impersonal passive' },
      { german: 'Die E-Mails werden jeden Tag beantwortet.', english: 'The emails are answered every day.',   note: 'plural subject: werden' },
      { german: 'Der Brief wird geschrieben.',            english: 'The letter is being written.',            note: 'wird + geschrieben' },
    ],
    commonMistake:
      'Wrong: "Das Haus wird gebaut von die Arbeiter." Correct: "Das Haus wird von den Arbeitern gebaut." — "von" takes Dativ (den Arbeitern), and the participle goes to the end.',
  },

  // ─── 6. Passive voice: Präteritum ────────────────────────────────────────────
  {
    topic: 'Passive voice: Präteritum',
    level: 'B1',
    title: 'Passive voice: past tense (Präteritum)',
    explanation:
      'The past passive uses the Präteritum of "werden" + past participle. The Präteritum of "werden" is: wurde (ich/er/sie/es), wurdest (du), wurden (wir/sie), wurdet (ihr).\n\n' +
      '"Das Haus wurde gebaut" — the house was built. This is used to describe passive events in the past, and it is the standard passive past tense in both written and spoken German.\n\n' +
      'Note: the Perfekt passive also exists ("ist gebaut worden") but is less common. At B1, focus on the Präteritum passive ("wurde + participle") as it is by far the most frequent form.',
    keyPoints: [
      'Structure: wurde/wurden + past participle (end)',
      'wurde = ich/er/sie/es; wurdest = du; wurden = wir/sie; wurdet = ihr',
      '"von + Dativ" still used to name the agent',
      'More common than Perfekt passive in both speech and writing',
      'The participle form is identical to the present passive',
    ],
    examples: [
      { german: 'Das Haus wurde 1990 gebaut.',             english: 'The house was built in 1990.',            note: 'wurde + participle' },
      { german: 'Der Brief wurde gestern geschrieben.',    english: 'The letter was written yesterday.',       note: 'wurde + geschrieben' },
      { german: 'Die Stadt wurde im Krieg zerstört.',      english: 'The city was destroyed in the war.',      note: 'wurde + zerstört' },
      { german: 'Die Fenster wurden geputzt.',             english: 'The windows were cleaned.',               note: 'wurden (plural subject)' },
      { german: 'Er wurde vom Arzt untersucht.',           english: 'He was examined by the doctor.',          note: 'von + Dativ agent' },
      { german: 'Das Gesetz wurde 2010 geändert.',         english: 'The law was changed in 2010.',            note: 'wurde + geändert' },
    ],
    commonMistake:
      'Wrong: "Das Haus war gebaut." Correct: "Das Haus wurde gebaut." — use "wurde" (Präteritum of werden) for the past passive, not "war" (Präteritum of sein). "War" is the passive of state (Zustandspassiv), which has a different meaning.',
  },

  // ─── 7. Relative clauses: Dativ ──────────────────────────────────────────────
  {
    topic: 'Relative clauses: Dativ',
    level: 'B1',
    title: 'Relative clauses: Dativ',
    explanation:
      'A relative clause adds information about a noun using a relative pronoun. When the relative pronoun is the indirect object (Dativ) inside the relative clause, it takes Dativ forms: dem (masculine/neuter), der (feminine), denen (plural).\n\n' +
      '"Der Mann, dem ich geholfen habe, heißt Klaus." — "dem" is Dativ because "helfen" takes Dativ. The relative clause is separated by commas, and the verb goes to the end.\n\n' +
      'The relative pronoun must match the gender and number of the noun it refers to (the antecedent) but takes the case required by its role inside the relative clause.',
    keyPoints: [
      'Dativ relative pronouns: dem (m/n), der (f), denen (pl)',
      'Gender/number matches the antecedent; case reflects role in the clause',
      'Verb goes to the end of the relative clause',
      'Relative clause is always set off by commas',
      'Common with Dativ verbs: helfen, danken, gehören, gefallen, folgen',
    ],
    examples: [
      { german: 'Der Mann, dem ich geholfen habe, ist nett.',     english: 'The man whom I helped is nice.',          note: 'dem = Dativ masc (helfen takes Dativ)' },
      { german: 'Die Frau, der ich danke, heißt Anna.',           english: 'The woman I am thanking is called Anna.', note: 'der = Dativ fem' },
      { german: 'Das Kind, dem das Buch gehört, ist mein Sohn.',  english: 'The child the book belongs to is my son.', note: 'dem = Dativ neut (gehören takes Dativ)' },
      { german: 'Die Leute, denen wir geholfen haben, sind dankbar.', english: 'The people we helped are grateful.', note: 'denen = Dativ plural' },
      { german: 'Der Hund, dem sie folgt, läuft schnell.',        english: 'The dog she is following runs fast.',     note: 'dem = Dativ masc (folgen takes Dativ)' },
      { german: 'Das ist der Freund, dem ich vertraue.',          english: 'That is the friend I trust.',             note: 'dem = Dativ masc (vertrauen takes Dativ)' },
    ],
    commonMistake:
      'Wrong: "Der Mann, den ich geholfen habe." Correct: "Der Mann, dem ich geholfen habe." — "helfen" always takes Dativ, so the relative pronoun must be "dem", not "den" (Akkusativ).',
  },

  // ─── 8. Relative clauses: Nominativ / Akkusativ ──────────────────────────────
  {
    topic: 'Relative clauses: Nominativ / Akkusativ',
    level: 'B1',
    title: 'Relative clauses: Nominativ and Akkusativ',
    explanation:
      'A relative clause modifies a noun by adding more information about it. The relative pronoun (der/die/das/die) introduces the clause and takes the gender and number of the noun it refers to, but its case depends on its grammatical role inside the clause.\n\n' +
      'Nominativ forms (the relative pronoun is the subject): der (m), die (f), das (n), die (pl). "Das ist der Mann, der hier wohnt." — "der" is subject of the relative clause.\n\n' +
      'Akkusativ forms (the relative pronoun is the object): den (m), die (f), das (n), die (pl). "Das ist der Mann, den ich kenne." — "den" is the object of "kennen".',
    keyPoints: [
      'Nominativ: der (m) / die (f) / das (n) / die (pl)',
      'Akkusativ: den (m) / die (f) / das (n) / die (pl)',
      'Only masculine changes between Nom and Akk: der → den',
      'Relative pronoun gender/number = antecedent; case = role in clause',
      'Verb always goes to the end; relative clause set off by commas',
    ],
    examples: [
      { german: 'Das ist der Mann, der hier wohnt.',           english: 'That is the man who lives here.',          note: 'der = Nom masc (subject of clause)' },
      { german: 'Die Frau, die singt, ist meine Lehrerin.',    english: 'The woman who is singing is my teacher.',  note: 'die = Nom fem' },
      { german: 'Das Buch, das auf dem Tisch liegt, ist meins.', english: 'The book that is on the table is mine.', note: 'das = Nom neut' },
      { german: 'Das ist der Mann, den ich kenne.',            english: 'That is the man (whom) I know.',           note: 'den = Akk masc (object of kennen)' },
      { german: 'Die Tasche, die ich gekauft habe, ist rot.',  english: 'The bag I bought is red.',                 note: 'die = Akk fem (unchanged)' },
      { german: 'Das sind die Leute, die ich eingeladen habe.', english: 'Those are the people I invited.',         note: 'die = Akk plural (unchanged)' },
    ],
    commonMistake:
      'Wrong: "Das ist der Mann, der ich kenne." Correct: "Das ist der Mann, den ich kenne." — inside the relative clause, "ich kenne ihn" so the pronoun is the object: Akkusativ masculine → "den".',
  },

  // ─── 9. Temporal clauses: als / wenn / während ───────────────────────────────
  {
    topic: 'Temporal clauses: als / wenn / während',
    level: 'B1',
    title: 'Temporal clauses: als, wenn, während',
    explanation:
      '"Als", "wenn", and "während" all relate to time, but they are used differently. "Als" refers to a single completed event in the past: "Als ich jung war, wohnte ich in Hamburg." Use "als" once — it cannot be repeated for recurring events.\n\n' +
      '"Wenn" is used for repeated or habitual events in the past ("Wenn es regnete, blieb ich zu Hause" — whenever it rained), and for all future and present time clauses ("Wenn ich Zeit habe, rufe ich an").\n\n' +
      '"Während" means "while" — two things happening at the same time: "Während er schlief, kochte sie." It implies simultaneity and often uses different subjects.',
    keyPoints: [
      '"als" = when (one single past event)',
      '"wenn" = when/whenever (present, future, or repeated past events)',
      '"während" = while (simultaneous actions)',
      'All three send the verb to the end of the clause',
      'Common error: using "wenn" for a single past event — use "als" instead',
    ],
    examples: [
      { german: 'Als ich Kind war, spielte ich viel draußen.',    english: 'When I was a child, I played outside a lot.',    note: 'als = single past period' },
      { german: 'Als er ankam, war es schon dunkel.',             english: 'When he arrived, it was already dark.',           note: 'als = single past event' },
      { german: 'Wenn es schneit, fahre ich Ski.',                english: 'When it snows, I go skiing.',                     note: 'wenn = repeated/habitual' },
      { german: 'Wenn du kommst, rufe mich an.',                  english: 'When you come, call me.',                         note: 'wenn = future time clause' },
      { german: 'Während ich kochte, hörte er Musik.',            english: 'While I cooked, he listened to music.',           note: 'während = simultaneous past actions' },
      { german: 'Während sie lernt, hört sie Podcasts.',          english: 'While she studies, she listens to podcasts.',     note: 'während = simultaneous present' },
    ],
    commonMistake:
      'Wrong: "Wenn ich jung war, wohnte ich in Berlin." Correct: "Als ich jung war, wohnte ich in Berlin." — a single period or event in the past uses "als", not "wenn".',
  },

  // ─── 10. Temporal clauses: bevor / nachdem / seitdem ─────────────────────────
  {
    topic: 'Temporal clauses: bevor / nachdem / seitdem',
    level: 'B1',
    title: 'Temporal clauses: bevor, nachdem, seitdem',
    explanation:
      '"Bevor" (before), "nachdem" (after), and "seitdem" (since) describe the sequence or duration of events. All three send the verb to the end, like all subordinating conjunctions.\n\n' +
      '"Bevor" is straightforward — same tense in both clauses: "Bevor ich schlafe, lese ich." "Nachdem" requires a tense shift: the nachdem-clause is one tense earlier. If the main clause is Präsens, nachdem uses Perfekt. If the main clause is Präteritum, nachdem uses Plusquamperfekt ("had done").\n\n' +
      '"Seitdem" means "since (a point in time)" or "ever since": "Seitdem er hier wohnt, ist er glücklicher." The action in the seitdem-clause is still ongoing.',
    keyPoints: [
      '"bevor" = before — same tense in both clauses',
      '"nachdem" = after — nachdem clause is one tense back (Perfekt or Plusquamperfekt)',
      '"seitdem" = since — action started in the past and continues',
      'All three send the verb to the end',
      'Plusquamperfekt = hatte/war + past participle (e.g. hatte gegessen)',
    ],
    examples: [
      { german: 'Bevor ich schlafe, putze ich die Zähne.',         english: 'Before I sleep, I brush my teeth.',              note: 'bevor: same tense' },
      { german: 'Bevor sie ging, verabschiedete sie sich.',        english: 'Before she left, she said goodbye.',             note: 'bevor: same past tense' },
      { german: 'Nachdem er gegessen hatte, machte er einen Spaziergang.', english: 'After he had eaten, he went for a walk.', note: 'nachdem + Plusquamperfekt → Präteritum' },
      { german: 'Nachdem sie angekommen ist, rief sie an.',        english: 'After she arrived, she called.',                 note: 'nachdem + Perfekt → Präsens/Perfekt' },
      { german: 'Seitdem er Sport macht, fühlt er sich besser.',  english: 'Since he has been doing sport, he feels better.', note: 'seitdem: ongoing since a point' },
      { german: 'Seitdem sie umgezogen ist, sehe ich sie selten.', english: 'Since she moved, I rarely see her.',             note: 'seitdem: Perfekt in the clause' },
    ],
    commonMistake:
      'Wrong: "Nachdem er aß, machte er einen Spaziergang." Correct: "Nachdem er gegessen hatte, machte er einen Spaziergang." — the nachdem-clause must be one tense earlier. If the main clause is Präteritum, use Plusquamperfekt in the nachdem-clause.',
  },

  // ─── 11. Two-part conjunctions ───────────────────────────────────────────────
  {
    topic: 'Two-part conjunctions',
    level: 'B1',
    title: 'Two-part conjunctions',
    explanation:
      'Two-part conjunctions (zweiteilige Konjunktionen) connect two parallel elements — words, phrases, or whole clauses. The two parts always appear together and frame the connected elements.\n\n' +
      'The main pairs: sowohl…als auch (both…and), weder…noch (neither…nor), entweder…oder (either…or), nicht nur…sondern auch (not only…but also), zwar…aber (it is true that…but).\n\n' +
      'Word order: when connecting two main clauses, the second clause follows normal V2 word order after "sondern auch", "oder", and "aber". After "noch" in "weder…noch", the verb also stays in position 2.',
    keyPoints: [
      'sowohl…als auch = both…and',
      'weder…noch = neither…nor',
      'entweder…oder = either…or',
      'nicht nur…sondern auch = not only…but also',
      'zwar…aber = it is true that…but / admittedly…but',
    ],
    examples: [
      { german: 'Er spricht sowohl Deutsch als auch Englisch.',     english: 'He speaks both German and English.',            note: 'sowohl…als auch' },
      { german: 'Sie ist weder müde noch hungrig.',                 english: 'She is neither tired nor hungry.',              note: 'weder…noch' },
      { german: 'Entweder kommst du mit, oder ich gehe allein.',   english: 'Either you come along or I go alone.',          note: 'entweder…oder (two clauses)' },
      { german: 'Er ist nicht nur klug, sondern auch fleißig.',    english: 'He is not only clever but also hardworking.',   note: 'nicht nur…sondern auch' },
      { german: 'Ich mag zwar Kaffee, aber ich trinke ihn abends nicht.', english: 'I do like coffee, but I don\'t drink it in the evenings.', note: 'zwar…aber' },
      { german: 'Weder das Wetter noch die Stimmung war gut.',     english: 'Neither the weather nor the mood was good.',    note: 'weder…noch with nouns' },
    ],
    commonMistake:
      'Wrong: "Er spricht sowohl Deutsch als Englisch." Correct: "Er spricht sowohl Deutsch als auch Englisch." — "als auch" must appear together; "als" alone is not enough.',
  },

  // ─── 12. Verb + preposition combinations ────────────────────────────────────
  {
    topic: 'Verb + preposition combinations',
    level: 'B1',
    title: 'Verb + preposition combinations',
    explanation:
      'Many German verbs always pair with a specific preposition, and the preposition determines the case of the following noun. These combinations must be memorised — the preposition is part of the verb\'s meaning.\n\n' +
      'Common combinations with Akkusativ: warten auf (to wait for), sich freuen auf (to look forward to), denken an (to think about), sich erinnern an (to remember), sich gewöhnen an (to get used to), bitten um (to ask for).\n\n' +
      'Common combinations with Dativ: sprechen über/von (to talk about), träumen von (to dream of), abhängen von (to depend on), sich beschäftigen mit (to deal with/be occupied with), anfangen mit (to start with).',
    keyPoints: [
      'The preposition is fixed — it belongs to the verb and must be memorised',
      'The preposition determines the case of the noun that follows',
      'With Akkusativ: warten auf, denken an, sich freuen auf, bitten um',
      'With Dativ: sprechen von/über, träumen von, abhängen von, beginnen mit',
      'In questions and subordinate clauses: "worauf / woran / womit" (da-compounds)',
    ],
    examples: [
      { german: 'Ich warte auf den Bus.',                   english: 'I am waiting for the bus.',              note: 'warten auf + Akkusativ' },
      { german: 'Sie freut sich auf den Urlaub.',           english: 'She is looking forward to the holiday.', note: 'sich freuen auf + Akkusativ' },
      { german: 'Denkst du oft an deine Familie?',          english: 'Do you often think about your family?',  note: 'denken an + Akkusativ' },
      { german: 'Wir sprechen oft über das Wetter.',        english: 'We often talk about the weather.',       note: 'sprechen über + Akkusativ' },
      { german: 'Er träumt von einer langen Reise.',        english: 'He dreams of a long journey.',           note: 'träumen von + Dativ' },
      { german: 'Das hängt von der Situation ab.',          english: 'That depends on the situation.',         note: 'abhängen von + Dativ' },
    ],
    commonMistake:
      'Wrong: "Ich warte auf dem Bus." Correct: "Ich warte auf den Bus." — "warten auf" always takes Akkusativ. Do not confuse with two-way preposition rules; the case here is fixed by the verb, not by movement vs. location.',
  },

];
