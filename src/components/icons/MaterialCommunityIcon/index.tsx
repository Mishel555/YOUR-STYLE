import { memo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { EColors } from '@types';

interface IProps {
  name: string;
  size?: number;
  color?: EColors;
  style?: StyleProp<TextStyle>;
  onClick?: () => void;
}

const MaterialCommunityIcon = ({
  name,
  size = 20,
  color = EColors.Black,
  style,
  onClick,
}: IProps) => {
  if (onClick) {
    return (
      <Icon.Button
        name={name}
        size={size}
        color={color}
        onPress={onClick}
      />
    );
  }

  return (
    <Icon
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};

export default memo(MaterialCommunityIcon);
