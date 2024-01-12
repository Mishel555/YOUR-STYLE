import { ScrollView, StyleSheet } from 'react-native';
import { OrderSkeleton } from '@components/skeletons';

const Orders = () => (
  <ScrollView style={styles.root}>
    <OrderSkeleton />
    <OrderSkeleton />
    <OrderSkeleton />
    <OrderSkeleton />
  </ScrollView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Orders;
