import type { NavigatorScreenParams } from '@react-navigation/native';

/** Screens inside the bottom tab navigator. */
export type TabParamList = {
  Home: undefined;
  Products: undefined;
  Settings: undefined;
};

/** Root stack: tabs plus screens that should cover the tab bar. */
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProductDetail: { publicId: string; title: string };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
