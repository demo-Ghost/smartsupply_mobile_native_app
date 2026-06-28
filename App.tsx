import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';

import { RootNavigator } from './src/navigation/RootNavigator';
import { queryClient } from './src/lib/queryClient';
import tamaguiConfig from './tamagui.config';

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="dark" />
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
