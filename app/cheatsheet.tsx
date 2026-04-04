// cheatsheet.tsx — Grammar reference (Phase 37)
//
// Web: CSS multi-column masonry (column-count + gap). Native: single-column scroll.
// Sheet level syncs with global level from the header toggle.
// Inter is used here for tabs, card headers, descriptions, and table headers only;
// German examples and table body stay IBM Plex Mono (theme.font).

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import useLevelStore, { type Level } from '../src/store/useLevelStore';
import { CHEATSHEETS } from '../src/data/cheatsheets';
import type {
  CheatSheetBlock,
  CheatSheetSection,
  CheatSheetTableBlock,
  CheatSheetTextBlock,
} from '../src/data/cheatsheets/types';
import { colors, font, radius } from '../src/styles/theme';

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];

// Exact tokens from spec (aligned with theme where they match)
const CARD_BG = colors.surface;
const BORDER = colors.border;
const BORDER_LIGHT = '#f0f0f0';
const DESC_COLOR = '#555555';
const ACCENT = colors.accent;

const INTER_400 = 'Inter_400Regular';
const INTER_500 = 'Inter_500Medium';
const INTER_600 = 'Inter_600SemiBold';

type ColWidth = number | 'flex';

function inferColumnWidths(columns: string[]): ColWidth[] {
  const n = columns.length;
  const c0 = (columns[0] ?? '').trim().toLowerCase();
  const c1 = (columns[1] ?? '').trim().toLowerCase();

  if (n === 3 && c0 === 'word') {
    return [70, 100, 'flex'];
  }
  if (n === 2 && c0 === 'pronoun') {
    return [80, 'flex'];
  }
  if (n === 2 && c0 === 'article') {
    return [120, 'flex'];
  }
  if (n === 3 && c1 === 'ending') {
    return [90, 'flex', 'flex'];
  }
  if (columns.every((c) => c.trim() === '')) {
    return Array(n).fill('flex' as const);
  }
  if (n >= 2 && c0 === '') {
    return [90, ...Array(n - 1).fill('flex' as const)];
  }
  if (n === 2) {
    return [90, 'flex'];
  }
  return Array(n).fill('flex' as const);
}

function widthStyle(w: ColWidth): ViewStyle {
  if (w === 'flex') return { flex: 1, minWidth: 0 };
  return { width: w, maxWidth: w, flexShrink: 0 };
}

function isSeinHabenSection(title: string): boolean {
  // Only match the A1 conjugation card — not A2 "Perfekt — haben vs sein"
  return title.toLowerCase().startsWith('sein and haben');
}

function isPresentRegularSection(title: string): boolean {
  const t = title.toLowerCase();
  return t.includes('present') && t.includes('regular');
}

function parseSeinHabenBlocks(blocks: CheatSheetBlock[]) {
  const leading: CheatSheetTextBlock[] = [];
  let i = 0;
  while (i < blocks.length && blocks[i].type === 'text') {
    leading.push(blocks[i] as CheatSheetTextBlock);
    i++;
  }
  const tables: CheatSheetTableBlock[] = [];
  for (; i < blocks.length; i++) {
    if (blocks[i].type === 'table') {
      tables.push(blocks[i] as CheatSheetTableBlock);
      if (tables.length === 2) {
        i++;
        break;
      }
    }
  }
  return {
    leading,
    seinTable: tables[0]!,
    habenTable: tables[1]!,
    rest: blocks.slice(i),
  };
}

function CheatTable({ block }: { block: CheatSheetTableBlock }) {
  const colWidths = inferColumnWidths(block.columns);
  const rowCount = block.rows.length;

  return (
    <View style={tableStyles.tableWrap}>
      <View style={tableStyles.table}>
        <View style={tableStyles.tr}>
          {block.columns.map((h, ci) => (
            <View
              key={`h-${ci}`}
              style={[tableStyles.thCell, widthStyle(colWidths[ci] ?? 'flex')]}
            >
              <Text style={tableStyles.thText}>{h}</Text>
            </View>
          ))}
        </View>
        {block.rows.map((row, ri) => {
          const isLast = ri === rowCount - 1;
          return (
            <View key={ri} style={tableStyles.tr}>
              {row.map((cell, ci) => (
                <View
                  key={ci}
                  style={[
                    tableStyles.tdCell,
                    widthStyle(colWidths[ci] ?? 'flex'),
                    isLast && tableStyles.tdLastRow,
                  ]}
                >
                  <Text style={tableStyles.tdText}>{cell}</Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
}

function CardChrome({
  title,
  wide,
  columnCount,
  children,
}: {
  title: string;
  wide: boolean;
  columnCount: number;
  children: React.ReactNode;
}) {
  const spanAll = wide && columnCount >= 2;
  const webMasonryCard: ViewStyle =
    Platform.OS === 'web' && spanAll ? ({ columnSpan: 'all' } as ViewStyle) : {};

  return (
    <View style={[styles.card, webMasonryCard]}>
      <View style={styles.cardHeaderAccent}>
        <Text style={styles.cardHeaderText}>{title.toUpperCase()}</Text>
      </View>
      {children}
    </View>
  );
}

function BlockContent({ block }: { block: CheatSheetBlock }) {
  switch (block.type) {
    case 'text':
      return <Text style={styles.cardDescription}>{block.body}</Text>;
    case 'subheading':
      return <Text style={styles.subheading}>{block.text}</Text>;
    case 'example':
      return (
        <View style={styles.exampleBlock}>
          <Text style={styles.exampleDe}>{block.de}</Text>
          <Text style={styles.exampleEn}>{block.en}</Text>
        </View>
      );
    case 'table':
      return <CheatTable block={block} />;
    default:
      return null;
  }
}

function SeinHabenWideCard({
  section,
  columnCount,
  windowWidth,
}: {
  section: CheatSheetSection;
  columnCount: number;
  windowWidth: number;
}) {
  const { leading, seinTable, habenTable, rest } = parseSeinHabenBlocks(section.blocks);
  const stack = windowWidth < 768;

  return (
    <CardChrome title={section.title} wide columnCount={columnCount}>
      {leading.map((b, i) => (
        <View key={i} style={i > 0 ? styles.blockSpacing : undefined}>
          <Text style={styles.cardDescription}>{b.body}</Text>
        </View>
      ))}
      <View style={[styles.seinHabenRow, stack && styles.seinHabenStack]}>
        <View style={styles.seinHabenHalf}>
          <Text style={styles.miniLabel}>sein</Text>
          <CheatTable block={seinTable} />
        </View>
        <View style={[styles.seinHabenDivider, stack && styles.seinHabenDividerH]} />
        <View style={styles.seinHabenHalf}>
          <Text style={styles.miniLabel}>haben</Text>
          <CheatTable block={habenTable} />
        </View>
      </View>
      {rest.map((block, bi) => (
        <View key={bi} style={styles.blockSpacing}>
          <BlockContent block={block} />
        </View>
      ))}
    </CardChrome>
  );
}

function NormalSectionCard({
  section,
  wide,
  columnCount,
}: {
  section: CheatSheetSection;
  wide: boolean;
  columnCount: number;
}) {
  return (
    <CardChrome title={section.title} wide={wide} columnCount={columnCount}>
      {section.blocks.map((block, bi) => (
        <View key={bi} style={bi > 0 ? styles.blockSpacing : undefined}>
          <BlockContent block={block} />
        </View>
      ))}
    </CardChrome>
  );
}

export default function CheatSheetScreen() {
  const globalLevel = useLevelStore((s) => s.level);
  const [sheetLevel, setSheetLevel] = useState<Level>(globalLevel);
  const { width } = useWindowDimensions();

  useEffect(() => {
    setSheetLevel(globalLevel);
  }, [globalLevel]);

  const sections = CHEATSHEETS[sheetLevel];

  const columnCount = width > 1200 ? 3 : width >= 768 ? 2 : 1;

  const masonryStyle = useMemo((): ViewStyle => {
    if (Platform.OS !== 'web') {
      return styles.masonryNative;
    }
    return {
      columnGap: 12,
      columnCount,
    } as ViewStyle;
  }, [columnCount]);

  return (
    <View style={styles.screenRoot}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tabBar}>
          {LEVELS.map((l) => {
            const active = l === sheetLevel;
            return (
              <TouchableOpacity
                key={l}
                style={[styles.levelTab, active ? styles.levelTabSelected : styles.levelTabIdle]}
                onPress={() => setSheetLevel(l)}
                activeOpacity={0.75}
              >
                <Text style={[styles.levelTabText, active && styles.levelTabTextSelected]}>
                  {l}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.masonry, masonryStyle]}>
          {sections.map((section, si) => {
            const key = `${sheetLevel}-${section.title}-${si}`;
            if (isSeinHabenSection(section.title)) {
              return (
                <View key={key} style={styles.cardMargin}>
                  <SeinHabenWideCard
                    section={section}
                    columnCount={columnCount}
                    windowWidth={width}
                  />
                </View>
              );
            }
            const wide = isPresentRegularSection(section.title);
            return (
              <View key={key} style={styles.cardMargin}>
                <NormalSectionCard section={section} wide={wide} columnCount={columnCount} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
  tabBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    ...(Platform.OS === 'web'
      ? ({
          position: 'sticky',
          top: 0,
          zIndex: 20,
          backgroundColor: colors.background,
        } as unknown as ViewStyle)
      : {}),
  },
  levelTab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.md,
  },
  levelTabIdle: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
  },
  levelTabSelected: {
    backgroundColor: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.textPrimary,
  },
  levelTabText: {
    fontFamily: INTER_500,
    fontSize: 12,
    color: colors.textSecondary,
  },
  levelTabTextSelected: {
    color: colors.surface,
  },
  masonry: {
    width: '100%',
  },
  masonryNative: {
    flexDirection: 'column',
  },
  cardMargin: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    ...(Platform.OS === 'web'
      ? ({
          breakInside: 'avoid',
        } as ViewStyle)
      : {}),
  },
  cardHeaderAccent: {
    borderLeftWidth: 2,
    borderLeftColor: ACCENT,
    paddingLeft: 6,
    marginBottom: 8,
  },
  cardHeaderText: {
    fontFamily: INTER_600,
    fontSize: 10,
    letterSpacing: 0.8,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  cardDescription: {
    fontFamily: INTER_400,
    fontSize: 12,
    color: DESC_COLOR,
    lineHeight: 12 * 1.4,
    marginBottom: 8,
  },
  subheading: {
    fontFamily: INTER_600,
    fontSize: 10,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  blockSpacing: {
    marginTop: 8,
  },
  exampleBlock: {
    marginTop: 6,
    marginBottom: 4,
  },
  exampleDe: {
    fontFamily: font.semiBold,
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  exampleEn: {
    fontFamily: INTER_400,
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
    marginTop: 2,
    marginBottom: 4,
  },
  seinHabenRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 0,
    marginBottom: 8,
  },
  seinHabenStack: {
    flexDirection: 'column',
  },
  seinHabenHalf: {
    flex: 1,
    minWidth: 0,
  },
  seinHabenDivider: {
    width: 1,
    backgroundColor: BORDER,
    marginHorizontal: 10,
    alignSelf: 'stretch',
  },
  seinHabenDividerH: {
    width: '100%',
    height: 1,
    marginHorizontal: 0,
    marginVertical: 10,
  },
  miniLabel: {
    fontFamily: INTER_600,
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});

const tableStyles = StyleSheet.create({
  tableWrap: {
    width: '100%',
    marginBottom: 4,
  },
  table: {
    width: '100%',
    ...(Platform.OS === 'web'
      ? ({ display: 'table', borderCollapse: 'collapse' } as unknown as ViewStyle)
      : {}),
  },
  tr: {
    width: '100%',
    ...(Platform.OS === 'web'
      ? ({ display: 'table-row' } as unknown as ViewStyle)
      : { flexDirection: 'row', alignItems: 'flex-start' }),
  },
  thCell: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    ...(Platform.OS === 'web'
      ? ({ display: 'table-cell', verticalAlign: 'top' } as unknown as ViewStyle)
      : {}),
  },
  thText: {
    fontFamily: INTER_600,
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'left',
  } as TextStyle,
  tdCell: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
    justifyContent: 'flex-start',
    ...(Platform.OS === 'web'
      ? ({ display: 'table-cell', verticalAlign: 'top' } as unknown as ViewStyle)
      : {}),
  },
  tdLastRow: {
    borderBottomWidth: 0,
  },
  tdText: {
    fontFamily: font.regular,
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 16,
    textAlign: 'left',
  } as TextStyle,
});
