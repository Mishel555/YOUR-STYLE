import { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { Spacing, TranslationText } from '@components/atoms';
import { EColors } from '@types';

interface IProps {
  style?: StyleProp<ViewStyle>;
  errorMessage?: string;
  onDateChange: (value: string | null) => void;
}

interface IDateState {
  day: string;
  month: string;
  year: string;
}

const DateField = ({
  style,
  errorMessage,
  onDateChange,
}: IProps) => {
  const [date, setDate] = useState<IDateState>({
    day: '',
    month: '',
    year: '',
  });

  const onChange = (name: keyof IDateState, data: string) => {
    const temp = { ...date };
    const value = +data;

    if (name === 'day' && value > 31) return;

    if (name === 'month' && value > 12) return;

    temp[name] = data;

    if (temp.day && temp.month && temp.year) {
      const date = new Date(`${temp.year}-${temp.month}-${temp.day}`).toISOString();
      onDateChange(date);
    } else {
      onDateChange(null);
    }

    setDate(temp);
  };

  return (
    <View style={[styles.root, style]}>
      <TranslationText name="dateOfBirth" style={styles.label} />
      <View style={styles.wrapper}>
        <TextInput
          keyboardType="numeric"
          placeholder="DD"
          value={date.day}
          onChangeText={value => onChange('day', value)}
          style={[styles.input, styles.smInput]}
        />
        <Spacing size={15} />
        <TextInput
          keyboardType="numeric"
          placeholder="MM"
          value={date.month}
          onChangeText={value => onChange('month', value)}
          style={[styles.input, styles.smInput]}
        />
        <Spacing size={15} />
        <TextInput
          keyboardType="numeric"
          placeholder="YYYY"
          value={date.year}
          onChangeText={value => onChange('year', value)}
          style={[styles.input, styles.lgInput]}
        />
      </View>
      {!!errorMessage && (
        <TranslationText name={errorMessage} style={styles.errorMessage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  wrapper: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  input: {
    height: 30,
    borderBottomWidth: 1,
    padding: 5,

    fontSize: 16,
    textAlign: 'center',
  },
  smInput: {
    flex: .7,
    maxWidth: 45,
  },
  lgInput: {
    flex: 1,
    maxWidth: 60,
  },
  errorMessage: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
    color: EColors.Red,
  },
});

export default DateField;
