import { StyleSheet, View } from 'react-native';
import { Paragraph, TranslationText } from '@components/atoms';

interface IProps {
  label: string;
  content: string;
}

const InfoGroup = ({
  label,
  content,
}: IProps) => (
  <View style={styles.root}>
    <TranslationText name={label} size={3} style={styles.label} />
    <Paragraph style={styles.text}>{content}</Paragraph>
  </View>
);

const styles = StyleSheet.create({
  root: {
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default InfoGroup;
