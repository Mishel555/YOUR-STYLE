import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { GenderType, ICategory } from '@types';
import { CategoryCard } from '@components/molecules';
import { Spacing } from '@components/atoms';

interface IProps {
  gender: GenderType;
  categories: ICategory[];
}

const { width } = Dimensions.get('screen');

const CategoryList = ({
  gender,
  categories,
}: IProps) => (
  <FlatList
    data={categories}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => <CategoryCard gender={gender} category={item} />}
    ItemSeparatorComponent={() => <Spacing size={15} direction="vertical" />}
    style={styles.root}
  />
);

const styles = StyleSheet.create({
  root: {
    width: width - 11.5 - 6,
  },
});

export default CategoryList;
