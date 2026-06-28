import { useQuery } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getProduct } from '../api/products';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route }: Props) {
  const { publicId } = route.params;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', publicId],
    queryFn: () => getProduct(publicId),
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Couldn’t load product: {(error as Error)?.message ?? 'Not found'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>{data.title}</Text>
      {data.brand ? <Field label="Brand" value={data.brand} /> : null}
      {data.barcode ? <Field label="Barcode" value={data.barcode} /> : null}
      {data.description ? <Field label="Description" value={data.description} /> : null}
      <Field label="Published" value={data.is_published ? 'Yes' : 'No'} />
    </ScrollView>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  field: {
    gap: 2,
  },
  fieldLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#888',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: 16,
  },
  errorText: {
    color: '#b00020',
    textAlign: 'center',
  },
});
