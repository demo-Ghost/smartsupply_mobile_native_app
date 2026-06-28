import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';
import { Button, Spinner, Text, YStack } from 'tamagui';

import { listProducts, type Product } from '../api/products';
import { ProductCard } from '../components/ProductCard';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/tokens';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function ProductsScreen() {
  const navigation = useNavigation<Navigation>();

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['products'],
    queryFn: () => listProducts({ limit: 50 }),
  });

  if (isLoading) {
    return (
      <YStack flex={1} ai="center" jc="center" gap="$3" backgroundColor={colors.cream}>
        <Spinner size="large" color={colors.blue} />
        <Text fontSize={13} color={colors.navy60}>
          Φόρτωση προϊόντων…
        </Text>
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack
        flex={1}
        ai="center"
        jc="center"
        gap="$3"
        padding="$5"
        backgroundColor={colors.cream}
      >
        <Text fontSize={15} fontWeight="600" color={colors.navy} ta="center">
          Δεν ήταν δυνατή η φόρτωση των προϊόντων
        </Text>
        <Text fontSize={13} color={colors.navy60} ta="center">
          {(error as Error).message}
        </Text>
        <Button
          backgroundColor={colors.blue}
          color={colors.surface}
          borderRadius={16}
          pressStyle={{ opacity: 0.9, scale: 0.98 }}
          onPress={() => refetch()}
        >
          Δοκιμάστε ξανά
        </Button>
      </YStack>
    );
  }

  return (
    <FlatList<Product>
      data={data?.data ?? []}
      keyExtractor={(item) => item.public_id}
      style={{ backgroundColor: colors.cream }}
      contentContainerStyle={{ padding: 16, gap: 12, flexGrow: 1 }}
      refreshing={isRefetching}
      onRefresh={refetch}
      ListEmptyComponent={
        <YStack flex={1} ai="center" jc="center" padding="$6">
          <Text fontSize={14} color={colors.navy60}>
            Δεν υπάρχουν προϊόντα ακόμη.
          </Text>
        </YStack>
      }
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() =>
            navigation.navigate('ProductDetail', {
              publicId: item.public_id,
              title: item.title,
            })
          }
        />
      )}
    />
  );
}
