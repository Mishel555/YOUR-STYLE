import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { EColors, GenderType, ICategory } from '@types';
import { Button, TranslationText } from '@components/atoms';

interface IProps {
  gender: GenderType;
  category: ICategory;
}

const CategoryCard = ({
  gender,
  category,
}: IProps) => {
  const { navigate } = useNavigation();

  const { id, name, image, subcategories } = category;

  const redirect = () => {
    navigate('Subcategories' as never, {
      category: {
        id,
        name,
        image,
      },
      gender,
      subcategories,
    } as never);
  };

  return (
    <Button onPress={redirect} style={styles.root}>
      <TranslationText name={name} style={styles.text} />
      <FastImage source={{ uri: image }} resizeMode={FastImage.resizeMode.contain} style={styles.image} />
    </Button>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 124,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: EColors.GreyExtra,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  image: {
    width: 100,
    height: '100%',
  },
});

export default CategoryCard;
