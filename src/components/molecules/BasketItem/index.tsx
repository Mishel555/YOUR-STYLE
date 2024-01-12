import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { EColors, IBasketProduct } from '@types';
import { IonicIcon } from '@components/icons';
import { Button, CountInput, Paragraph, Spacing, TranslationText } from '@components/atoms';

interface IProps {
  product: IBasketProduct;
  onDelete: (key: string) => void;
  onCountChange: (key:string, count: number) => void;
}

const BasketItem = ({
  product,
  onDelete,
  onCountChange,
}: IProps) => {
  const {
    key,
    name,
    image,
    price,
    count,
    size,
  } = useMemo(() => product, [product]);

  const countChange = (count:number) => {
    onCountChange(key, count);
  };

  return (
    <View style={styles.root}>
      <View style={styles.wrapper}>
        <FastImage source={{ uri: image }} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
        <Spacing direction="horizontal" size={20} />
        <View>
          <TranslationText name={name} style={styles.name} />
          <Paragraph style={styles.price}>{price}֏</Paragraph>
          {!!size && (
            <TranslationText name="size" style={styles.size}>: {size}</TranslationText>
          )}
        </View>
      </View>
      <View style={styles.actions}>
        <Button onPress={() => onDelete(key)} style={styles.like}>
          <IonicIcon name="ios-remove-circle-outline" />
        </Button>
        <CountInput min={1} defaultValue={count} onChange={countChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
  },
  size: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 10,
    color: EColors.BlueLight,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 3,
  },
  actions: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  like: {
    height: 24,
  },
});

export default BasketItem;
