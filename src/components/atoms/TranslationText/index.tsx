import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { EColors } from '@types';
import { ReactNode } from 'react';

interface IProps extends TextProps {
  name: string;
  nameSpace?: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
  numberOfLines?: number;
}

const TranslationText = ({
  name,
  nameSpace = 'translations',
  size,
  children,
  style,
  ...textProps
}: IProps) => {
  const { t } = useTranslation();

  return (
    <Text {...textProps} style={[styles.root, size && styles[size], style]}>
      {t(name, {
        ns: nameSpace,
      })}
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    color: EColors.Black,
    fontFamily: 'Montserrat',
  },
  '1': {
    fontSize: 32,
    fontWeight: '500',
  },
  '2': {
    fontSize: 24,
    fontWeight: '500',
  },
  '3': {
    fontSize: 18.72,
    fontWeight: '500',
  },
  '4': {
    fontSize: 16,
    fontWeight: '500',
  },
  '5': {
    fontSize: 13.28,
    fontWeight: '500',
  },
  '6': {
    fontSize: 10.72,
    fontWeight: '500',
  },
});

export default TranslationText;
