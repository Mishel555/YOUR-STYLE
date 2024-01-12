import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { EColors, ILanguage, LanguagesType } from '@types';
import { Button, Paragraph, Spacing } from '@components/atoms';
import { IonicIcon } from '@components/icons';

interface IProps extends ILanguage {
  active: boolean;
  onChange: (lang: LanguagesType) => void;
}

const LanguageCard = ({
  value,
  label,
  image,
  active,
  onChange,
}: IProps) => (
  <Button style={[styles.root, active && styles.active]} onPress={() => onChange(value)}>
    <View style={styles.wrapper}>
      <FastImage source={{ uri: image }} resizeMode={FastImage.resizeMode.contain} style={styles.image} />
      <Spacing size={20} />
      <Paragraph style={styles.text}>{label}</Paragraph>
    </View>
    {active && (
      <IonicIcon name="checkmark-done-circle-outline" size={24} color={EColors.BlueLight} />
    )}
  </Button>
);

const styles = StyleSheet.create({
  root: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: EColors.White,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 5,
  },
  active: {
    borderWidth: 2,
    borderColor: EColors.BlueLight,
  },
});

export default LanguageCard;
