import { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';
import styles from './style';

interface IProps extends TextProps {
  children: ReactNode;
}

const Paragraph = ({
  children,
  style,
  ...textProps
}: IProps) => (
  <Text {...textProps} style={[styles.root, style]}>
    {children}
  </Text>
);

export default Paragraph;
