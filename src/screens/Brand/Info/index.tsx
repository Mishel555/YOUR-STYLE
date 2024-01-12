import { StyleSheet, View } from 'react-native';
import { Paragraph } from '@components/atoms';
import InfoGroup from '../InfoGroup';

interface IProps {
  name: string;
  phone: string;
}

const Info = ({
  name,
  phone,
}: IProps) => (
  <View style={styles.root}>
    <Paragraph style={styles.title}>{name}</Paragraph>
    <View style={styles.container}>
      <InfoGroup label="phone" content={phone} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    marginVertical: 20,
  },
  title: {
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    marginTop: 30,
  },
  name: {
    marginTop: 5,
  },
});

export default Info;
