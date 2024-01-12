import { createContext } from 'react';
import { Animated } from 'react-native';
import { IFiltersContext } from '@types';

const FiltersContext = createContext<IFiltersContext>({
  filters: null,
  isOpened: false,
  animatedBlur: new Animated.Value(0),
  animatedPosition: new Animated.Value(0),
  open: () => {},
  close: () => {},
  clearFilters: () => {},
  changeFilters: () => {},
});

export default FiltersContext;
