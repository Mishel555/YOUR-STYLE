import { Fragment } from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle, View } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { EColors, InputTypes } from '@types';
import { getKeyboardType } from '@utils';
import { TranslationText } from '@components/atoms';

interface IProps {
  name: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  control: Control<any>;
  type?: InputTypes;
  multiline?: boolean;
  label?: string;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
}

const TextField = ({
  name,
  control,
  type = 'text',
  multiline,
  placeholder,
  label,
  style,
}: IProps) => (
  <View style={styles.root}>
    {!!label && (
      <TranslationText name={label} style={styles.label} />
    )}
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          value,
          onBlur,
          onChange,
        },
        fieldState: { error },
      }) => (
        <Fragment>
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType={getKeyboardType(type)}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            placeholder={placeholder}
            placeholderTextColor="#000"
            style={[styles.input, multiline && styles.area, style]}
          />
          {!!error?.message && (
            <TranslationText name={error.message} style={styles.message} />
          )}
        </Fragment>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    position: 'relative',
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    fontSize: 15,
    color: EColors.Black,
  },
  area: {
  },
  eye: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
  message: {
    fontSize: 12,
    fontWeight: '500',
    color: EColors.Red,
  },
});

export default TextField;
