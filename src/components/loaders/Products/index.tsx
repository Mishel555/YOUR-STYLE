import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { ProductSkeleton } from '@components/skeletons';

interface IProps {
  refreshing: boolean;
  onRefresh: () => void;
}

const Group = () => (
  <View style={styles.wrapper}>
    <ProductSkeleton />
    <ProductSkeleton />
  </View>
);

const Products = ({ refreshing, onRefresh }: IProps) => (
  <ScrollView style={styles.root} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
    <Group />
    <Group />
    <Group />
  </ScrollView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Products;
