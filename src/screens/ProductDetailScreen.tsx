import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Spinner, Text, YStack } from 'tamagui';

import { getProduct, productImageUrl } from '../api/products';
import type { RootStackParamList } from '../navigation/types';
import { colors, radius } from '../theme/tokens';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route }: Props) {
  const { publicId } = route.params;
  const [imageFailed, setImageFailed] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', publicId],
    queryFn: () => getProduct(publicId),
  });

  if (isLoading) {
    return (
      <YStack flex={1} ai="center" jc="center" backgroundColor={colors.cream}>
        <Spinner size="large" color={colors.blue} />
      </YStack>
    );
  }

  if (isError || !data) {
    return (
      <YStack
        flex={1}
        ai="center"
        jc="center"
        padding="$5"
        backgroundColor={colors.cream}
      >
        <Text fontSize={14} color={colors.navy60} ta="center">
          Δεν ήταν δυνατή η φόρτωση του προϊόντος: {(error as Error)?.message ?? 'Δεν βρέθηκε'}
        </Text>
      </YStack>
    );
  }

  const uri = productImageUrl(data.image_path);
  const showImage = uri && !imageFailed;

  return (
    <ScrollView style={{ backgroundColor: colors.cream }} contentContainerStyle={styles.content}>
      <YStack
        height={220}
        borderRadius={radius.card}
        borderWidth={1}
        borderColor={colors.navy10}
        backgroundColor={colors.surface}
        ai="center"
        jc="center"
        overflow="hidden"
      >
        {showImage ? (
          <Image
            source={{ uri }}
            style={styles.image}
            resizeMode="contain"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Text fontSize={48} fontWeight="700" color={colors.navy40}>
            {data.title?.trim().charAt(0).toUpperCase() || '•'}
          </Text>
        )}
      </YStack>

      <Text fontSize={22} lineHeight={28} fontWeight="700" color={colors.navy}>
        {data.title}
      </Text>

      {data.brand ? <Field label="Μάρκα" value={data.brand} /> : null}
      {data.barcode ? <Field label="Γραμμωτός κώδικας" value={data.barcode} /> : null}
      {data.description ? <Field label="Περιγραφή" value={data.description} /> : null}
      <Field label="Ζυγιζόμενο" value={data.is_weighted ? 'Ναι' : 'Όχι'} />
      <Field label="Διαθέσιμο" value={data.is_published ? 'Ναι' : 'Όχι'} />
    </ScrollView>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <YStack gap="$1">
      <Text
        fontSize={12}
        fontWeight="600"
        color={colors.navy60}
        textTransform="uppercase"
        letterSpacing={0.5}
      >
        {label}
      </Text>
      <Text fontSize={15} lineHeight={21} color={colors.navy}>
        {value}
      </Text>
    </YStack>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
