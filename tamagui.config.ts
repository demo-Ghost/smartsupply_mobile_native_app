import { config } from '@tamagui/config';
import { createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui(config);

export type AppConfig = typeof tamaguiConfig;

// TamaguiCustomConfig is declared in @tamagui/web (re-exported by tamagui),
// so the augmentation must target the declaration site to merge correctly.
declare module '@tamagui/web' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
