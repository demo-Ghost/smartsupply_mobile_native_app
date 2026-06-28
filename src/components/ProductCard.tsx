import { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, Text, XStack, YStack } from 'tamagui';

import { productImageUrl, type Product } from '../api/products';
import { colors, radius } from '../theme/tokens';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

/**
 * A single product row: image thumbnail, title + brand, optional weighted
 * pill, and a subtle chevron. Falls back to the product's initial when no
 * image is available or it fails to load.
 */
export function ProductCard({ product, onPress }: ProductCardProps) {
  const [failed, setFailed] = useState(false);
  const uri = productImageUrl(product.image_path);
  const showImage = uri && !failed;
  const initial = product.title?.trim().charAt(0).toUpperCase() || '•';

  return (
    <Card
      backgroundColor={colors.surface}
      borderColor={colors.navy10}
      borderWidth={1}
      borderRadius={radius.card}
      padding="$3"
      shadowColor={colors.navy}
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.06}
      shadowRadius={6}
      transition="quick"
      pressStyle={{ scale: 0.97, opacity: 0.95 }}
      onPress={onPress}
    >
      <XStack ai="center" gap="$3">
        <YStack
          width={60}
          height={60}
          borderRadius={radius.tile}
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
              onError={() => setFailed(true)}
            />
          ) : (
            <Text fontSize={22} fontWeight="700" color={colors.navy40}>
              {initial}
            </Text>
          )}
        </YStack>

        <YStack flex={1} gap="$1.5">
          <Text
            fontSize={15}
            lineHeight={19}
            fontWeight="600"
            color={colors.navy}
            numberOfLines={2}
          >
            {product.title}
          </Text>

          <XStack ai="center" gap="$2" flexWrap="wrap">
            {product.brand ? (
              <Text fontSize={12} fontWeight="500" color={colors.navy60}>
                {product.brand}
              </Text>
            ) : null}
            {product.is_weighted ? (
              <YStack
                backgroundColor={colors.navy05}
                paddingHorizontal="$2"
                paddingVertical="$1"
                borderRadius={radius.pill}
              >
                <Text fontSize={11} fontWeight="600" color={colors.navy}>
                  Ζυγιζόμενο
                </Text>
              </YStack>
            ) : null}
          </XStack>
        </YStack>

        <Text fontSize={22} color={colors.navy40} marginLeft="$1">
          ›
        </Text>
      </XStack>
    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
