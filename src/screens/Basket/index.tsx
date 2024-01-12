import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IBasketGroup, IBasketItem, IProduct } from '@types';
import { getBasket, groupProductsByBrand } from '@utils';
import api from '@services/api';
import { EmptyData } from '@components/skeletons';
import { BagLoader } from '@components/loaders';
import GroupList from './GroupList';

const Basket = () => {
  const [items, setItems] = useState<IBasketGroup[] | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const removeBrand = (brand: string) => {
    if (!items) return;

    if (items.length === 1) {
      return setItems(null);
    }

    setItems(prevState => Array.isArray(prevState) ? prevState.filter(group => group?.brand !== brand) : null);
  };

  useEffect(() => {
    let mounted = true;

    getBasket().then(async (data: IBasketItem[]) => {
      const ids: number[] = data?.map((item: IBasketItem) => item.id);

      if (!ids) {
        return setIsLoaded(true);
      }

      const { data: result } = await api.products.getAll({
        ids: JSON.stringify(ids),
        limit: 100,
      });
      const products = result.rows as IProduct[];
      const basket = ids.map((id, index) => {
        const foundedProduct = products.find(product => product.id === id);
        const productFromBasket = data[index];
        if (foundedProduct) {
          return {
            ...foundedProduct,
            ...(productFromBasket?.size && ({ size: productFromBasket.size })),
            ...(productFromBasket?.key && ({ key: productFromBasket.key })),
          };
        }
      }) as IProduct[];
      const groupedBasket = groupProductsByBrand(basket);

      if (mounted) {
        setItems(groupedBasket);
        setIsLoaded(true);
      }
    }).catch(e => console.log(JSON.stringify(e)));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.root}>
      {isLoaded && items && (
        <GroupList data={items} removeBrand={removeBrand} />
      )}

      {isLoaded && !items && (
        <EmptyData />
      )}

      {!isLoaded && <BagLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Basket;
