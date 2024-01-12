import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ListSkeleton } from '@components/skeletons';

interface IProps {
  count?: number;
  style?: StyleProp<ViewStyle>;
}

const List = ({
  count = 30,
  style,
}: IProps) => (
  <ScrollView style={[styles.root, style]}>
    <ListSkeleton count={count} />
  </ScrollView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default List;
