import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { EColors } from '@types';
import { useFilters } from '@hooks';
import { Button, Paragraph } from '@components/atoms';
import { IonicIcon } from '@components/icons';

interface IProps {
  id: number;
  name: string;
  logo: string;
}

const BrandCard = ({ id, name, logo }: IProps) => {
  const { changeFilters } = useFilters();
  const { navigate } = useNavigation();

  const redirectToSearch = () => {
    changeFilters({
      brand_id: [id],
    });
    navigate('Search' as never);
  };

  const redirectToInfo = () => {
    navigate('Brand' as never, {
      id,
    } as never);
  };

  return (
    <View style={styles.root}>
      <Button onPress={redirectToSearch} style={styles.container}>
        <FastImage source={{ uri: logo }} style={styles.image} />
        <Paragraph style={styles.text}>
          {name}
        </Paragraph>
      </Button>
      <Button onPress={redirectToInfo}>
        <IonicIcon name="information-circle-outline" size={25} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: EColors.GreyLight,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  image: {
    width: 37,
    height: 37,
    borderRadius: 18.5,
    marginRight: 15,
  },
  text: {
    fontSize: 17,
    fontWeight: '300',
    textTransform: 'capitalize',
  },
});

export default BrandCard;
