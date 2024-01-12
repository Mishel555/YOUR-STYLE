import { View } from 'react-native';

interface IProps {
  size?: number;
  direction?: 'vertical' | 'horizontal';
}

const Spacing = ({
  size = 10,
  direction = 'horizontal',
}: IProps) => (
  <View
    style={{
      [direction === 'horizontal' ? 'width' : 'height']: size,
    }}
  />
);

export default Spacing;
