/**
 * SmartSupply brand palette — from the mobile design spec.
 * Light, fixed brand theme: cream canvas, white cards, navy text,
 * blue for actions, coral as the single attention accent.
 */
export const colors = {
  cream: '#FAF6ED',
  surface: '#FFFFFF',
  navy: '#1F2937',
  navy60: 'rgba(31,41,55,0.6)',
  navy55: 'rgba(31,41,55,0.55)',
  navy40: 'rgba(31,41,55,0.4)',
  navy10: 'rgba(31,41,55,0.1)',
  navy05: 'rgba(31,41,55,0.05)',
  blue: '#2E72B8',
  coral: '#FF7A4D',
  success: '#2F8A4F',
  warning: '#A07E14',
  mutedTab: '#6B7280',
} as const;

export const radius = {
  pill: 9999,
  card: 16,
  tile: 12,
} as const;

export type ColorToken = keyof typeof colors;
