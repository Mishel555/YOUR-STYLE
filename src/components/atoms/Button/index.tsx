import { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Paragraph } from '@components/atoms';

interface IProps {
  children: ReactNode | string;
  onPress: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  children,
  onPress,
  style,
  disabled,
}: IProps) => (
  <TouchableOpacity onPress={onPress} disabled={disabled} style={[style, disabled && styles.disabled]}>
    {typeof children === 'string' ? <Paragraph>{children}</Paragraph> : children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  disabled: {
    opacity: .7,
  },
});

export default Button;
