import { StyleSheet, View } from 'react-native';
import { IBrandAddress } from '@types';
import { useLang } from '@hooks';
import { Paragraph, TranslationText } from '@components/atoms';

interface IProps {
  addresses: IBrandAddress[];
}

const AddressList = ({ addresses }: IProps) => {
  const { lang } = useLang();

  return (
    <View style={styles.root}>
      <TranslationText name="addresses" size={3} style={styles.label} />
      {addresses.map((address, index) => (
        <Paragraph key={index} style={styles.text}>
          {address[lang || 'en']}
        </Paragraph>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  label: {
    fontWeight: '600',
  },
  text: {
    marginTop: 5,
    fontWeight: '500',
  },
});

export default AddressList;
