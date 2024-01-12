import { StyleSheet, View } from 'react-native';
import { EColors, IOrderToProduct } from '@types';
import { Paragraph, Button, TranslationText } from '@components/atoms';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const OrderItem = ({
  size,
  count,
  product: {
    id,
    main_image,
    subcategory,
  },
}: IOrderToProduct) => {
  const { navigate } = useNavigation();

  const redirectToProduct = () => {
    navigate('Product' as never, { id } as never);
  };

  return (
    <Button onPress={redirectToProduct} style={styles.root}>
      <FastImage source={{ uri: main_image }} resizeMode={FastImage.resizeMode.contain} style={styles.image} />
      <View style={styles.content}>
        <TranslationText name={subcategory.name} style={styles.name} />
        <TranslationText name="count" style={styles.name}>: {count}</TranslationText>
        <Paragraph style={styles.size}>size: {size}</Paragraph>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: .5,
    borderColor: EColors.GreyLight,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  content: {
    marginLeft: 20,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
  },
  size: {
    fontSize: 14,
    fontWeight: '600',
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OrderItem;
