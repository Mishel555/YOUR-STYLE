import { FlatList, StyleSheet } from 'react-native';
import { IOrder } from '@types';
import { OrderGroup } from '@components/molecules';
import { Spacing } from '@components/atoms';

interface IProps {
  orders: IOrder[];
  onEndReached: () => void;
}

const OrdersList = ({
  orders,
  onEndReached,
}: IProps) => (
  <FlatList
    data={orders}
    renderItem={({ item }) => (
      <OrderGroup order={item} />
    )}
    ItemSeparatorComponent={() => <Spacing direction="vertical" size={10} />}
    onEndReached={onEndReached}
    onEndReachedThreshold={0.5}
    style={styles.root}
  />
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default OrdersList;
