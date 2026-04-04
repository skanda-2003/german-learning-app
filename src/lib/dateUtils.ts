// dateUtils.ts — Shared date helpers used across daily.tsx, streakService.ts, and insights.tsx.
//
// Centralised here to prevent subtle mismatches between screens (e.g. streak counting
// vs heatmap vs "come back tomorrow" message all agreeing on what day it is).
//
// All functions use local time — this app is for personal use in one timezone.

// Returns a Date as a YYYY-MM-DD string in local time.
export function toDateString(d: Date): string {
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Returns today's date as a YYYY-MM-DD string.
export function getTodayString(): string {
  return toDateString(new Date());
}

// Returns tomorrow's date as a YYYY-MM-DD string.
// Uses setDate() instead of adding 86,400,000ms to avoid DST edge cases.
export function getTomorrowString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toDateString(d);
}

// Formats a YYYY-MM-DD string as a human-readable date, e.g. "4 April 2026".
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${dd} ${months[mm - 1]} ${yyyy}`;
}