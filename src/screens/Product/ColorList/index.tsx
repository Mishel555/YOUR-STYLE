import { StyleSheet, View } from 'react-native';
import { EColors } from '@types';

interface IProps {
  colors: string[];
}

const ColorList = ({ colors }: IProps) => (
  <View style={styles.root}>
    {colors.map((hex) => (
      <View key={hex} style={styles.colorWrapper}>
        <View style={[styles.colorItem, { backgroundColor: hex }]} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  colorWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 2.5,
    marginVertical: 2.5,
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: EColors.Grey,
  },
  colorItem: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default ColorList;
