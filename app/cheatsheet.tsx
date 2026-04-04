// cheatsheet.tsx — Static grammar reference per level (Phase 37)
//
// Level picker chooses which static sheet to show; it does not change the
// global level (header toggle). Initial sheet matches global level on first mount.

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import useLevelStore, { type Level } from '../src/store/useLevelStore';
import { CHEATSHEETS } from '../src/data/cheatsheets';
import type { CheatSheetBlock } from '../src/data/cheatsheets/types';
import {
  colors,
  font,
  fontSize,
  spacing,
  radius,
  cardStyle,
  labelStyle,
} from '../src/styles/theme';

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];

function BlockView({ block }: { block: CheatSheetBlock }) {
  switch (block.type) {
    case 'text':
      return <Text style={styles.bodyText}>{block.body}</Text>;
    case 'subheading':
      return <Text style={styles.subheading}>{block.text}</Text>;
    case 'example':
      return (
        <View style={styles.exampleBox}>
          <Text style={styles.exampleDe}>{block.de}</Text>
          <Text style={styles.exampleEn}>{block.en}</Text>
        </View>
      );
    case 'table': {
      const colCount = block.columns.length;
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          style={styles.tableScroll}
          contentContainerStyle={styles.tableScrollContent}
        >
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {block.columns.map((h, i) => (
                <Text
                  key={`h-${i}`}
                  style={[styles.tableHeaderCell, { minWidth: colCount > 3 ? 120 : 140 }]}
                >
                  {h}
                </Text>
              ))}
            </View>
            {block.rows.map((row, ri) => (
              <View
                key={ri}
                style={[styles.tableRow, ri % 2 === 1 && styles.tableRowAlt]}
              >
                {row.map((cell, ci) => (
                  <Text
                    key={ci}
                    style={[styles.tableCell, { minWidth: colCount > 3 ? 120 : 140 }]}
                  >
                    {cell}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      );
    }
    default:
      return null;
  }
}

export default function CheatSheetScreen() {
  const [sheetLevel, setSheetLevel] = useState<Level>(() => useLevelStore.getState().level);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const sections = CHEATSHEETS[sheetLevel];

  function sectionKey(index: number) {
    return `${sheetLevel}-${index}`;
  }

  function toggleSection(index: number) {
    const key = sectionKey(index);
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={labelStyle}>REFERENCE</Text>
      <Text style={styles.title}>Cheat Sheet</Text>
      <Text style={styles.blurb}>
        Quick grammar tables and examples for each level. Does not change your global level — use the header toggle for flashcards and exercises.
      </Text>

      <Text style={[labelStyle, styles.pickerLabel]}>Sheet level</Text>
      <View style={styles.levelRow}>
        {LEVELS.map((l) => {
          const active = l === sheetLevel;
          return (
            <TouchableOpacity
              key={l}
              style={[styles.levelPill, active && styles.levelPillActive]}
              onPress={() => {
                setSheetLevel(l);
                setExpanded({});
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.levelPillText, active && styles.levelPillTextActive]}>
                {l}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {sections.map((section, index) => {
        const key = sectionKey(index);
        const isOpen = expanded[key] === true;
        return (
          <View key={key} style={[cardStyle, styles.sectionCard]}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(index)}
              activeOpacity={0.7}
            >
              <Text style={styles.sectionTitle} numberOfLines={2}>
                {section.title}
              </Text>
              <Feather
                name={isOpen ? 'chevron-down' : 'chevron-right'}
                size={18}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            {isOpen && (
              <View style={styles.sectionBody}>
                {section.blocks.map((block, bi) => (
                  <View key={bi} style={styles.blockWrap}>
                    <BlockView block={block} />
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  title: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  blurb: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  pickerLabel: {
    marginBottom: spacing.sm,
  },
  levelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  levelPill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  levelPillActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  levelPillText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  levelPillTextActive: {
    color: colors.accent,
  },
  sectionCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  sectionTitle: {
    flex: 1,
    fontFamily: font.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  sectionBody: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  blockWrap: {
    marginBottom: spacing.md,
  },
  bodyText: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  subheading: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  exampleBox: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exampleDe: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  exampleEn: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  tableScroll: {
    marginVertical: spacing.xs,
  },
  tableScrollContent: {
    paddingBottom: spacing.xs,
  },
  table: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableRowAlt: {
    backgroundColor: colors.surfaceAlt,
  },
  tableHeaderCell: {
    flex: 1,
    padding: spacing.sm,
    fontFamily: font.semiBold,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  tableCell: {
    flex: 1,
    padding: spacing.sm,
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 18,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
});
