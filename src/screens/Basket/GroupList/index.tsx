import { StyleSheet, FlatList } from 'react-native';
import { BasketGroup } from '@components/molecules';
import { Spacing } from '@components/atoms';
import { IBasketGroup } from '@types';

interface IProps {
  data: IBasketGroup[];
  removeBrand: (brand: string) => void;
}

const GroupList = ({
  data,
  removeBrand,
}: IProps) => (
  <FlatList
    data={data}
    keyExtractor={({ brand }, index) => `${brand}_${index}`}
    renderItem={({ item }) => <BasketGroup {...item} removeBrand={removeBrand} />}
    ItemSeparatorComponent={() => <Spacing direction="vertical" size={30} />}
    showsVerticalScrollIndicator={false}
    style={styles.root}
  />
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 15,
  },
});

export default GroupList;
