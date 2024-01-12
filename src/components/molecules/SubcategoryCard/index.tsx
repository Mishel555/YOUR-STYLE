import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { EColors, GenderType, ISubcategory } from '@types';
import { useFilters } from '@hooks';
import { Button, TranslationText } from '@components/atoms';

interface IProps {
  categoryId: number;
  subcategory: ISubcategory;
  gender: GenderType;
}

const SubcategoryCard = ({ categoryId, subcategory, gender }: IProps) => {
  const { navigate } = useNavigation();
  const { changeFilters } = useFilters();

  const redirect = () => {
    changeFilters({
      category_id: categoryId,
      subcategory_id: subcategory.id,
      ...(() => {
        let data: GenderType | null = null;

        if (gender === 'boy') {
          data = 'man';
        }

        if (gender === 'girl') {
          data = 'woman';
        }

        return {
          gender: data || gender,
        };
      })(),
      ...(gender !== 'man' && gender !== 'woman' && ({
        kids: true,
      })),
    });

    navigate('Search' as never);
  };

  return (
    <Button onPress={redirect} style={styles.root}>
      <FastImage source={{ uri: subcategory.image }} resizeMode={FastImage.resizeMode.contain} style={styles.image} />
      <TranslationText name={subcategory.name} style={styles.text} />
    </Button>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: EColors.GreyLight,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 18.5,
    marginRight: 15,
  },
  text: {
    fontSize: 17,
    fontWeight: '300',
    textTransform: 'capitalize',
  },
});

export default SubcategoryCard;
