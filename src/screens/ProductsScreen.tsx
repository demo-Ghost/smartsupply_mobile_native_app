import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { listProducts, type Product } from '../api/products';
import type { RootStackParamList } from '../navigation/types';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function ProductsScreen() {
  const navigation = useNavigation<Navigation>();

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['products'],
    queryFn: () => listProducts({ limit: 50 }),
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Couldn’t load products: {(error as Error).message}
        </Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList<Product>
      data={data?.data ?? []}
      keyExtractor={(item) => item.public_id}
      contentContainerStyle={styles.listContent}
      refreshing={isRefetching}
      onRefresh={refetch}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No products yet.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          style={styles.row}
          onPress={() =>
            navigation.navigate('ProductDetail', {
              publicId: item.public_id,
              title: item.title,
            })
          }
        >
          <Text style={styles.rowTitle}>{item.title}</Text>
          {item.brand ? <Text style={styles.rowSubtitle}>{item.brand}</Text> : null}
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  listContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  row: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  rowSubtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
    marginLeft: 16,
  },
  errorText: {
    color: '#b00020',
    textAlign: 'center',
  },
  emptyText: {
    color: '#777',
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#222',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
});
