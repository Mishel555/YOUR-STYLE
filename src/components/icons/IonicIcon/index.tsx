import { memo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { EColors } from '@types';

interface IProps {
  name: string;
  size?: number;
  color?: EColors;
  style?: StyleProp<TextStyle>;
}

const IonicIcon = ({
  name,
  size = 20,
  color = EColors.Black,
  style,
}: IProps) => (
  <Icon
    name={name}
    size={size}
    color={color}
    style={style}
  />
);

export default memo(IonicIcon);
