import { createContext } from 'react';
import { Animated } from 'react-native';
import { IMenuContext } from '@types';

const MenuContext = createContext<IMenuContext>({
  isOpen: false,
  animatedPosition: new Animated.ValueXY({ x: 0, y: 0 }),
  animatedBlur: new Animated.Value(0),
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export default MenuContext;
