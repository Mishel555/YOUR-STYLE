import { StyleSheet, View } from 'react-native';
import { TranslationText } from '@components/atoms';
import { EColors } from '@types';

interface IProps {
  message: string;
  type: 'success' | 'danger' | 'notification';
}

const CustomToast = ({ message, type }: IProps) => (
  <View style={[styles.root, styles[type]]}>
    <TranslationText name={message} style={styles.text} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    width: '85%',
    marginVertical: 4,

    borderRadius: 8,
    borderLeftWidth: 6,

    justifyContent: 'center',

    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingLeft: 16,

    backgroundColor: '#fff',
  },
  text: {
    marginTop: 2,
    color: '#a3a3a3',
  },
  success: {
    borderLeftColor: EColors.Green,
  },
  danger: {
    borderLeftColor: EColors.Red,
  },
  notification: {
    borderLeftColor: EColors.BlueLight,
  },
});

export default CustomToast;
