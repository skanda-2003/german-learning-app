// types.ts — Static cheat sheet sections (Phase 37). No exercises, no API.

export type CheatSheetLevel = 'A1' | 'A2' | 'B1' | 'B2';

/** Plain English rule or note */
export type CheatSheetTextBlock = {
  type: 'text';
  body: string;
};

/** Simple grid — all strings, first row can act as headers via columns */
export type CheatSheetTableBlock = {
  type: 'table';
  columns: string[];
  rows: string[][];
};

export type CheatSheetExampleBlock = {
  type: 'example';
  de: string;
  en: string;
};

export type CheatSheetSubheadingBlock = {
  type: 'subheading';
  text: string;
};

export type CheatSheetBlock =
  | CheatSheetTextBlock
  | CheatSheetTableBlock
  | CheatSheetExampleBlock
  | CheatSheetSubheadingBlock;

export type CheatSheetSection = {
  title: string;
  blocks: CheatSheetBlock[];
};
