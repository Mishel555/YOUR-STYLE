import { useMemo } from 'react';
import { RefreshControl, StyleSheet, useWindowDimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { IProduct } from '@types';
import { ProductCard } from '@components/molecules';

interface IProps {
  products: IProduct[];
  refreshing: boolean;
  padding?: number;
  onRefresh: () => void;
  onEndReached: () => void;
}

const ProductList = ({
  products,
  refreshing,
  padding,
  onRefresh,
  onEndReached,
}: IProps) => {
  const { width } = useWindowDimensions();
  const itemSize = useMemo(() => width / 2 - 24 - (padding || 0), [width, padding]);

  return (
    <FlatGrid
      data={products}
      itemDimension={itemSize}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <ProductCard data={item} imageSize={itemSize} />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      style={styles.root}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default ProductList;
