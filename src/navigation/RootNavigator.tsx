import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/HomeScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { colors } from '../theme/tokens';
import type { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.mutedTab,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.navy10,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Αρχική' }} />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{ title: 'Προϊόντα' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Λογαριασμός' }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.cream },
        headerTintColor: colors.navy,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: colors.cream },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}
