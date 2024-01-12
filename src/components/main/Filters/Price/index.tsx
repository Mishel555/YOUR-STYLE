import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { EColors } from '@types';
import { Spacing, TranslationText } from '@components/atoms';

interface IProps {
  onChange: (name: string, range: unknown[]) => void;
}

interface IState {
  to?: number;
  from?: number;
}

const Price = ({ onChange }:IProps) => {
  const [range, setRange] = useState<IState>({ from: 0 });

  const onRangeChange = (name: keyof IState, value: string) => {
    const temp = {
      ...range,
      [name]: +value,
    };

    if (!value && name === 'to') {
      delete temp[name];
    }

    setRange(temp);
    onChange('price', Object.values(temp));
  };

  return (
    <View style={styles.root}>
      <View style={styles.item}>
        <TranslationText name="from" style={styles.label} />
        <TextInput onChangeText={(text) => onRangeChange('from', text)} keyboardType="numeric" style={styles.input} />
      </View>
      <Spacing size={20} />
      <View style={styles.item}>
        <TranslationText name="to" style={styles.label} />
        <TextInput onChangeText={(text) => onRangeChange('to', text)} keyboardType="numeric" style={styles.input} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
  },
  label: {
    fontWeight: '500',
  },
  input: {
    height: 30,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    color: EColors.Black,
    borderColor: EColors.Black,
  },
});

export default Price;
