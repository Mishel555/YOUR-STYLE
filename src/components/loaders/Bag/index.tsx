import { ScrollView, StyleSheet } from 'react-native';
import { BagSkeleton } from '@components/skeletons';

const Bag = () => (
  <ScrollView style={styles.root}>
    <BagSkeleton />
    <BagSkeleton />
    <BagSkeleton />
  </ScrollView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Bag;
