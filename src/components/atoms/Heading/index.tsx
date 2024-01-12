import { ReactNode } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import styles from './style';

interface IProps extends TextProps {
  children: ReactNode;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const Heading = ({
  size = 1,
  style,
  children,
  ...textProps
}: IProps) => (
  <Text {...textProps} style={[styles.root, styles[size], style]}>
    {children}
  </Text>
);

export default Heading;
