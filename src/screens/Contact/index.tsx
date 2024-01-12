import { StyleSheet, View } from 'react-native';
import { ExternalLink, Paragraph, TranslationText } from '@components/atoms';

const Contact = () => (
  <View style={styles.root}>
    <TranslationText name="contactUs" style={styles.title} />
    <TranslationText name="phone" style={styles.label} />
    <ExternalLink url="tel:+37494257754">
      <Paragraph style={styles.text}>+374 94 25 77 54</Paragraph>
    </ExternalLink>
    <TranslationText name="email" style={styles.label} />
    <ExternalLink url="mailto:help@yourstyle.co">
      <Paragraph style={styles.text}>yourstyle@gmail.com</Paragraph>
    </ExternalLink>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Contact;
