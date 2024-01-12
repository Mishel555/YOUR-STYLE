import { Fragment, useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle, View } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { EColors } from '@types';
import { Button, TranslationText } from '@components/atoms';
import { IonicIcon } from '@components/icons';

interface IProps {
  name: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  control: Control<any>;
  placeholder?: string;
  label?: string;
  style?: StyleProp<TextStyle>;
}

const PasswordField = ({
  name,
  label,
  control,
  placeholder,
  style,
}: IProps) => {
  const [hide, setHide] = useState<boolean>(true);

  const toggle = () => setHide(prevState => !prevState);

  return (
    <View style={styles.root}>
      {!!label && (
        <TranslationText name={label} style={styles.label} />
      )}
      <Controller
        control={control}
        name={name}
        render={({
          field: {
            onBlur,
            onChange,
          },
          fieldState: { error },
        }) => (
          <Fragment>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={hide}
              placeholder={placeholder}
              placeholderTextColor="#000"
              style={[styles.input, style]}
            />
            {!!error?.message && (
              <TranslationText name={error.message} style={styles.message} />
            )}
          </Fragment>
        )}
      />
      <Button onPress={toggle} style={styles.eye}>
        {hide ? <IonicIcon name="eye" /> : <IonicIcon name="eye-off" />}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 50,
    borderBottomWidth: 1,
    position: 'relative',
  },
  input: {
    fontSize: 15,
    color: EColors.Black,
  },
  eye: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
  },
  message: {
    fontSize: 12,
    color: EColors.Red,
  },
});

export default PasswordField;
