import { Button } from '@components/atoms';
import { StyleSheet, View } from 'react-native';
import { EColors } from '@types';

interface IProps {
  hex: string;
  active: boolean;
  onPick: (hex: string) => void;
}

const ColorItem = ({
  hex,
  active,
  onPick,
}: IProps) => {
  const backgroundStyle = StyleSheet.create({
    background: {
      backgroundColor: hex,
    },
  });

  return (
    <Button onPress={() => onPick(hex)} style={[styles.root, active && styles.active]}>
      <View style={[styles.color, backgroundStyle.background]} />
    </Button>
  );
};

const styles = StyleSheet.create({
  root: {
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
  color: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  active: {
    opacity: .6,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
});

export default ColorItem;
