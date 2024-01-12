import { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ICheckbox } from '@types';
import { Button, Checkbox, TranslationText } from '@components/atoms';

interface IProps {
  name: string;
  data: ICheckbox[];
  radio?: boolean;
  reset?: boolean;
  defaultValues?: string[] | number[];
  style?: StyleProp<ViewStyle>;
  onChange: (name: string, value: string[]) => void;
}

const CheckboxGroup = ({
  name,
  data,
  radio,
  reset = true,
  defaultValues,
  style,
  onChange,
}: IProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const resetData = () => {
    onChange(name, []);
    setCheckedItems([]);
  };

  const handleChange = (value: string) => {
    const checked = checkedItems.includes(value);
    let temp: string[] | null = null;

    if (checked) {
      temp = checkedItems.filter(item => item !== value);
    }

    if (radio) {
      temp = [value];
    }

    if (!temp) {
      temp = [...checkedItems, value];
    }

    onChange(name, temp);
    setCheckedItems(temp);
  };

  useEffect(() => {
    if (defaultValues) {
      setCheckedItems(defaultValues as string[]);
    }
  }, [defaultValues]);

  return (
    <View style={style}>
      {data.map((item, index) => (
        <Checkbox
          key={index}
          {...item}
          checked={checkedItems.includes(item.name)}
          onChange={handleChange}
          disableBuiltInState
          style={styles.checkbox}
        />
      ))}
      {!!checkedItems.length && reset !== false && (
        <Button onPress={resetData} style={styles.reset}>
          <TranslationText name="reset" style={styles.resetText} />
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginBottom: 10,
  },
  reset: {
    alignSelf: 'flex-end',
  },
  resetText: {
    fontWeight: '600',
  },
});

export default CheckboxGroup;
