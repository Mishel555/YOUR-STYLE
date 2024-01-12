import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IProduct } from '@types';
import api from '@services/api';
import { useFavorites } from '@hooks';
import { ProductList } from '@components/organisms';
import { EmptyData } from '@components/skeletons';
import { ProductsLoader } from '@components/loaders';

const LIMIT = 30;

const Likes = () => {
  const { favorites } = useFavorites();
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadMore = () => {
    if (products && products.length < total) {
      setCurrentPage(prevState => prevState + LIMIT);
    }
  };

  const onRefresh = () => {
    setCurrentPage(0);
    setIsRefreshing(true);
  };

  const init = useCallback(() => {
    let mounted = true;

    const getProducts = async () => {
      try {
        if (!isRefreshing && currentPage < 1) {
          setIsLoaded(false);
        }

        const params = {
          limit: LIMIT,
          offset: currentPage,
          ids: JSON.stringify(favorites || []),
        };

        const { data } = await api.products.getAll(params);

        if (mounted) {
          if (isRefreshing) {
            setIsRefreshing(false);
          }

          setTotal(data.count);
          setIsLoaded(true);
          setProducts(prevState => (
            Array.isArray(prevState) && currentPage > 0 ? [...prevState, ...data.rows] : data.rows
          ));
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    getProducts();

    return () => {
      mounted = false;
    };

    // DO NOT REMOVE NEXT LINE
    // eslint-disable-next-line
  }, [isRefreshing, currentPage]);

  useEffect(() => init(), [init]);

  return (
    <View style={styles.root}>
      {isLoaded && !!products?.length && (
        <ProductList
          products={products}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onEndReached={loadMore}
        />
      )}

      {!isLoaded && <ProductsLoader refreshing={isRefreshing} onRefresh={onRefresh} />}

      {isLoaded && !products?.length && <EmptyData />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Likes;
