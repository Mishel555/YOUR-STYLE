import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IBrand, RootStackParamListType } from '@types';
import api from '@services/api';
import { BrandCard } from '@components/molecules';
import { EmptyData } from '@components/skeletons';
import { ListLoader } from '@components/loaders';

const LIMIT = 20;

const Brands = ({}: NativeStackScreenProps<RootStackParamListType, 'Brands'>) => {
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [data, setData] = useState<IBrand[] | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadMore = () => {
    if (data && data.length < total) {
      setCurrentPage(prevState => prevState + LIMIT);
    }
  };

  const onRefresh = () => {
    setCurrentPage(0);
    setIsRefreshing(true);
  };

  const init = useCallback(() => {
    let mounted = true;

    const getBrands = async () => {
      try {
        const params = {
          limit: LIMIT,
          offset: currentPage,
          top: true,
        };

        if (!isRefreshing && currentPage < 1) {
          setIsLoaded(false);
        }

        const { data } = await api.brands.getAll(params);

        if (mounted) {
          if (isRefreshing) {
            setIsRefreshing(false);
          }

          setTotal(data.count);
          setIsLoaded(true);
          setData(prevState => (
            Array.isArray(prevState) && currentPage > 0 ? [...prevState, ...data.rows] : data.rows
          ));
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    getBrands();

    return () => {
      mounted = false;
    };
  }, [isRefreshing, currentPage]);

  useEffect(() => init(), [init]);

  return (
    <View style={styles.root}>
      {isLoaded && data && !!data.length && (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <BrandCard id={item.id} name={item.name} logo={item.logo} />}
          onEndReached={loadMore}
          refreshControl={(
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          )}
          style={styles.wrapper}
        />
      )}

      {!isLoaded && <ListLoader style={styles.wrapper} />}

      {isLoaded && !data?.length && <EmptyData />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {
    marginTop: 15,
  },
});

export default Brands;
