import { memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { EColors, ICheckbox } from '@types';

interface IProps extends ICheckbox {
  checked?: boolean;
  disabled?: boolean;
  disableBuiltInState?: boolean;
  onChange: (name: string, checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

const Checkbox = ({
  name,
  label,
  checked,
  disabled,
  disableBuiltInState,
  onChange,
  style,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <BouncyCheckbox
      size={20}
      text={t(label, {
        ns: 'translations',
      }) as string}
      fillColor={EColors.Black}
      disabled={disabled}
      isChecked={checked}
      disableBuiltInState={disableBuiltInState}
      onPress={(checked) => onChange(name, checked)}
      textStyle={styles.text}
      innerIconStyle={styles.checkbox}
      iconStyle={styles.activeCheckbox}
      style={style}
    />
  );
};

const styles = StyleSheet.create({
  root: {},
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: EColors.Black,
    textDecorationLine: 'none',
    fontFamily: 'Montserrat',
  },
  checkbox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: EColors.Black,
  },
  activeCheckbox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: EColors.Black,
  },
});

export default memo(Checkbox);
