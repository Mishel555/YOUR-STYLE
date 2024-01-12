import { memo } from 'react';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { EColors, IProduct } from '@types';
import { getDiscountPercent } from '@utils';
import { useFavorites } from '@hooks';

import { DiscountPaige } from '@components/molecules';
import { Button, Paragraph, TranslationText } from '@components/atoms';
import { IonicIcon } from '@components/icons';

interface IProps {
  data: IProduct;
  imageSize?: number;
  style?: StyleProp<ViewStyle>;
}

const ProductCard = ({
  data,
  imageSize,
  style,
}: IProps) => {
  const { navigate } = useNavigation();
  const { toggle, isFavorite } = useFavorites();

  const {
    id,
    price,
    images,
    main_image,
    subcategory,
    discount_price,
  } = data;

  const redirect = () => navigate('Product' as never, ({ id }) as never);

  const isLiked = isFavorite(id);

  const like = () => toggle(id);

  return (
    <View style={[styles.root, style]}>
      {discount_price !== price && (
        <DiscountPaige
          size="sm"
          discount={getDiscountPercent(price, Number(discount_price))}
          style={styles.discount}
        />
      )}

      <FlatList
        horizontal
        pagingEnabled
        data={images?.length ? [...images] : [main_image]}
        renderItem={({ item }) => (
          <FastImage
            source={{ uri: item }}
            resizeMode={FastImage.resizeMode.contain}
            onTouchEnd={redirect}
            style={[styles.image, { width: imageSize }]}
          />
        )}
        showsHorizontalScrollIndicator
      />

      <View style={styles.wrapper}>
        <View onTouchEnd={redirect}>
          <Paragraph style={styles.price}>{discount_price} ֏</Paragraph>
          {discount_price !== price && (
            <Paragraph style={styles.oldPrice}>{price} ֏</Paragraph>
          )}
        </View>
        <Button onPress={like} style={styles.likeBtn}>
          <IonicIcon name={isLiked ? 'heart' : 'heart-outline'} />
        </Button>
      </View>
      <TranslationText name={subcategory} size={3} numberOfLines={1} style={styles.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    maxWidth: 300,
  },
  image: {
    height: 220,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 5,
  },
  wrapper: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
  },
  oldPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: EColors.GreyDark,
    textDecorationLine: 'line-through',
  },
  likeBtn: {
    width: 30,
    height: 30,
  },
  discount: {
    position: 'absolute',
    right: 10,
    bottom: 70,
    zIndex: 1500,
  },
});

export default memo(ProductCard);
