import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import api from '@services/api';
import { EColors, IOrder, RootStackParamListType } from '@types';
import OrdersList from './OrdersList';
import { EmptyData } from '@components/skeletons';
import { OrderLoader } from '@components/loaders';

const LIMIT = 10;
const START_DATE = moment().add(-10, 'days').format('YYYY-MM-DD');
const END_DATE = moment().format('YYYY-MM-DD');

const Orders = ({}: NativeStackScreenProps<RootStackParamListType, 'Orders'>) => {
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadMore = () => {
    if (orders && orders.length < total) {
      setCurrentPage(prevState => prevState + LIMIT);
    }
  };

  const init = useCallback(() => {
    let mounted = true;

    const getOrders = async () => {
      try {
        setIsLoading(true);

        const params = {
          limit: LIMIT,
          offset: currentPage,
          startDate: START_DATE,
          endDate: END_DATE,
        };

        const { data } = await api.orders.getAll(params);

        if (mounted) {
          setTotal(data.count);
          setIsLoading(false);
          setOrders(prevState => (
            (Array.isArray(prevState) && currentPage > 0) ? [...prevState, ...data.rows] : data.rows
          ));
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    getOrders();

    return () => {
      mounted = false;
    };
  }, [currentPage]);

  useFocusEffect(init);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {!isLoading && orders && !!orders.length && (
          <OrdersList orders={orders} onEndReached={loadMore} />
        )}

        {isLoading && <OrderLoader />}

        {!isLoading && !orders?.length && <EmptyData />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EColors.White,
  },
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
});

export default Orders;
