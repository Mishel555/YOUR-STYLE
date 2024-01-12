import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CheckboxGroup } from '@components/molecules';
import { TranslationText } from '@components/atoms';

interface IProps {
  onChange: (gender: string) => void;
  style?: StyleProp<ViewStyle>;
}

const GENDER = [
  {
    name: 'man',
    label: 'man',
  },
  {
    name: 'woman',
    label: 'woman',
  },
  {
    name: 'other',
    label: 'other',
  },
];

const GenderField = ({
  onChange,
  style,
}: IProps) => {
  const onGenderChange = (name: string, value: string[]) => {
    onChange(value[0]);
  };

  return (
    <View style={[styles.root, style]}>
      <TranslationText name="gender" style={styles.label} />
      <CheckboxGroup
        name="gender"
        data={GENDER}
        onChange={onGenderChange}
        reset={false}
        defaultValues={[GENDER[0].name]}
        radio
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default GenderField;
