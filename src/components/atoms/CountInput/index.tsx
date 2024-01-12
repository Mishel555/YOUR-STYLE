import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { EColors } from '@types';
import { Button, Paragraph } from '@components/atoms';
import { IonicIcon } from '@components/icons';

interface IProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange: (count: number) => void;
}

const CountInput = ({
  min,
  max,
  defaultValue = 0,
  onChange,
}: IProps) => {
  const [count, setCount] = useState<number>(min ?? defaultValue);

  const increase = () => {
    if (max !== undefined && count >= max) {
      return;
    }

    const value = count + 1;

    onChange(value);
    setCount(value);
  };

  const decrease = () => {
    if (min !== undefined && count <= min) {
      return;
    }

    const value = count - 1;

    onChange(value);
    setCount(value);
  };

  return (
    <View style={styles.root}>
      <Button onPress={increase} style={[styles.action, styles.increase]}>
        <IonicIcon name="add" size={15} />
      </Button>
      <Paragraph style={styles.number}>
        {count}
      </Paragraph>
      <Button onPress={decrease} style={styles.action}>
        <IonicIcon name="remove" color={EColors.White} size={15} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 100,
    height: 30,
    borderRadius: 12,
    paddingHorizontal: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: EColors.Black,
  },
  action: {
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  increase: {
    borderRadius: 7,
    backgroundColor: EColors.White,
  },
  number: {
    fontSize: 16,
    fontWeight: '700',
    color: EColors.White,
  },
});

export default CountInput;
