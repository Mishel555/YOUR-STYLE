import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EColors, RootStackParamListType } from '@types';
import { Button, TranslationText } from '@components/atoms';

const Toolbar = () => {
  const { navigate } = useNavigation<NativeStackScreenProps<RootStackParamListType, 'Home'>['navigation']>();

  const seeAll = () => navigate('Categories' as never);

  return (
    <View style={styles.root}>
      <TranslationText name="popular" style={styles.title} />
      <Button onPress={seeAll}>
        <TranslationText name="seeAll" style={styles.text} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginHorizontal: -13,

    borderBottomWidth: 1,
    borderColor: EColors.Grey,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: EColors.Black,
  },
});

export default Toolbar;
