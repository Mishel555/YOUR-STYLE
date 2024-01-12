import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IProduct, RootStackParamListType } from '@types';
import api from '@services/api';
import { useFilters } from '@hooks';
import { ProductList } from '@components/organisms';
import { ProductsLoader } from '@components/loaders';
import { EmptyData } from '@components/skeletons';
import Toolbar from './Toolbar';

const LIMIT = 30;

const Home = ({}: NativeStackScreenProps<RootStackParamListType, 'Home'>) => {
  const { clearFilters } = useFilters();

  const startedMainLoader = useRef<boolean>(false);
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
    startedMainLoader.current = true;
    const params = {
      limit: LIMIT,
      offset: currentPage,
      top: true,
    };

    const getProducts = async () => {
      try {
        if (isRefreshing) {
          setIsRefreshing(false);
        }

        const { data } = await api.products.getAll(params);

        setTotal(data.count);
        setIsLoaded(true);
        setProducts(prevState => (
          Array.isArray(prevState) && currentPage > 0 ? [...prevState, ...data.rows] : data.rows
        ));
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    getProducts();
  }, [isRefreshing, currentPage]);

  useEffect(() => init(), [init]);

  useFocusEffect(useCallback(() => {
    const interval = setInterval(() => {
      if (startedMainLoader.current) {
        clearInterval(interval);
        return;
      }

      setCurrentPage(0);
    }, 2000);

    clearFilters();

    return () => {
      clearInterval(interval);
    };
  }, [clearFilters]));

  return (
    <View style={styles.root}>
      <Toolbar />
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

export default Home;
