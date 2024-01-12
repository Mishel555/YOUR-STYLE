import { Fragment, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EColors, IBasketProduct, IProduct } from '@types';
import { copyObject, removeFromBasket } from '@utils';
import { useAuth } from '@hooks';
import { BasketItem } from '@components/molecules';
import { Button, Paragraph, Spacing, TranslationText } from '@components/atoms';
import { IonicIcon } from '@components/icons';

interface IProps {
  brand: string;
  products: IProduct[];
  removeBrand: (brand: string) => void;
}

const BasketGroup = ({
  brand,
  products,
  removeBrand,
}: IProps) => {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [items, setItems] = useState<IBasketProduct[]>([]);

  const total = items.reduce((previousValue, currentValue) => (
    previousValue + (currentValue.count * currentValue.price)
  ), 0);

  const toggle = () => setIsOpen(prevState => !prevState);

  const order = () => {
    if (!user) {
      return navigate('Auth' as never);
    }
    navigate('MakeOrder' as never, {
      total,
      brandId: products[0].brandId,
      deliveryPrice: products[0].deliveryPrice,
      products: items.map(item => ({
        id: item.id,
        price: item.price,
        count: item.count,
        size: item.size,
      })),
      itemKeys: items.map(item => item.key),
    } as never);
  };

  const changeCount = (key: string, count: number) => {
    const data = copyObject(items);
    const foundedIndex = data.findIndex(item => item.key === key);

    if (foundedIndex > -1) {
      data[foundedIndex].count = count;
      setItems([...data]);
    }
  };

  const deleteItem = async (key: string) => {
    try {
      const data = copyObject(items);
      const foundedIndex = data.findIndex(item => item.key === key);

      if (data.length === 1) {
        removeBrand(brand);
        return await removeFromBasket([data[0].key]);
      }

      if (foundedIndex > -1) {
        data.splice(foundedIndex, 1);
        setItems([...data]);

        await removeFromBasket([items[foundedIndex].key]);
      }
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  useEffect(() => {
    const data: IBasketProduct[] = products.map((product) => ({
      count: 1,
      id: product.id,
      key: product.key || '',
      name: product.subcategory,
      price: Number(product.discount_price) || product.price,
      image: product.main_image,
      size: product.size,
      deliveryPrice: product.deliveryPrice,
    }));

    setItems(data);
  }, [products]);

  return (
    <View style={styles.root}>
      <View style={styles.toolbar}>
        <Paragraph style={styles.brand}>{brand}</Paragraph>
        <Button onPress={toggle}>
          <IonicIcon name={isOpen ? 'ios-caret-down-outline' : 'ios-caret-forward-outline'} />
        </Button>
      </View>
      {isOpen && (
        <Fragment>
          <FlatList
            data={items}
            keyExtractor={({ key }) => key}
            renderItem={({ item }) => <BasketItem product={item} onDelete={deleteItem} onCountChange={changeCount} />}
            ItemSeparatorComponent={() => <Spacing direction="vertical" size={10} />}
            showsVerticalScrollIndicator={false}
            style={styles.list}
          />
          <TranslationText name="amount" style={styles.total}>: {total}</TranslationText>
          <TranslationText name="delivery" style={styles.total}>: {items[0]?.deliveryPrice}</TranslationText>
          <TranslationText name="total" style={styles.total}>
            : {Number(items[0]?.deliveryPrice) + total}
          </TranslationText>
          <Button onPress={order} style={styles.order}>
            <TranslationText name="orderNow" style={styles.orderText} />
          </Button>
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: 17.5,
    fontWeight: '600',
  },
  list: {
    marginTop: 10,
    paddingVertical: 10,
  },
  total: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  order: {
    width: 110,
    height: 30,
    marginTop: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: EColors.Black,
  },
  orderText: {
    fontSize: 14,
    fontWeight: '600',
    color: EColors.White,
  },
});

export default BasketGroup;
