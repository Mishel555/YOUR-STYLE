import { StyleSheet, View } from 'react-native';
import { EColors } from '@types';
import { Button, Paragraph, TranslationText } from '@components/atoms';
import { IonicIcon } from '@components/icons';

interface IProps {
  size: string | null;
  open: () => void;
}

const SizeSection = ({
  size,
  open,
}: IProps) => (
  <Button onPress={open} style={styles.root}>
    <Paragraph style={styles.text}>
      {size ? size : <TranslationText name="selectSize" style={styles.text} />}
    </Paragraph>
    <View style={styles.arrowSection}>
      <IonicIcon name="chevron-down" color={EColors.GreyLight} />
    </View>
  </Button>
);

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    height: 35,
    borderWidth: 1,
    borderColor: EColors.GreyLight,
    paddingLeft: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowSection: {
    width: 40,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: EColors.GreyLight,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default SizeSection;
