import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { EColors, IProduct } from '@types';
import { ProductCard } from '@components/molecules';
import { Spacing, TranslationText } from '@components/atoms';

interface IProps {
  products: IProduct[];
}

const Recommendations = ({ products }: IProps) => {
  const { width } = useWindowDimensions();
  const itemWidth = (width - 45) / 2;

  return (
    <View style={styles.root}>
      <TranslationText name="recommendedProducts" size={3} style={styles.title} />
      <FlatList
        data={products}
        horizontal
        pagingEnabled
        ItemSeparatorComponent={() => <Spacing size={10} />}
        renderItem={({ item }) => (
          <ProductCard data={item} style={[styles.item, { width: itemWidth }]} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 15,
  },
  title: {
    marginBottom: 15,
    fontWeight: '600',
  },
  item: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: EColors.GreyExtra,
  },
});

export default Recommendations;
