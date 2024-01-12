import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GenderType, RootStackParamListType } from '@types';
import { TranslationText } from '@components/atoms';
import { SubcategoryCard } from '@components/molecules';

const Subcategories = ({ route }: NativeStackScreenProps<RootStackParamListType, 'Subcategories'>) => {
  const { params } = route;
  const {
    gender,
    category,
    subcategories,
  } = params;

  return (
    <View style={styles.root}>
      <TranslationText name={category.name} style={styles.title} />
      <FlatList
        data={[
          {
            id: undefined,
            name: 'seeAll',
            image: category.image,
            type: '' as GenderType,
          },
          ...subcategories,
        ]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SubcategoryCard categoryId={category.id} subcategory={item} gender={gender} />
        )}
        style={styles.wrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  wrapper: {
    marginTop: 15,
  },
});

export default Subcategories;
