import { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { IFilters } from '@types';
import { isObjectEmpty } from '@utils';
import { FiltersContext } from '@contexts';

interface IProps {
  children: ReactNode;
}

const FiltersProvider = ({ children }: IProps) => {
  const { width } = useWindowDimensions();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters | null>(null);

  const animatedBlur = useRef(new Animated.Value(0)).current;
  const animatedPosition = useRef(new Animated.Value(width)).current;

  const open = useCallback(() => {
    Animated.parallel([
      Animated.timing(animatedPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedBlur, {
        toValue: 1,
        delay: 300,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setIsOpened(true);
  }, [animatedBlur, animatedPosition]);

  const close = useCallback(() => {
    Animated.parallel([
      Animated.timing(animatedPosition, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedBlur, {
        toValue: 0,
        duration: 1,
        useNativeDriver: true,
      }),
    ]).start();

    setIsOpened(false);
  }, [animatedBlur, animatedPosition, width]);

  const clearFilters = useCallback(() => setFilters(null), []);

  const changeFilters = useCallback((filters: IFilters) => {
    const temp = filters;

    Object.keys(temp).forEach((key) => {
      const filterKey = key as keyof IFilters;
      const value = temp[filterKey];

      if (value === undefined || value === null) {
        delete temp[filterKey];
      }

      if (Array.isArray(value) && !value.length) {
        delete temp[filterKey];
      }
    });

    setFilters(isObjectEmpty(filters) ? null : filters);
  }, []);

  const contextValue = useMemo(() => ({
    isOpened,
    filters,
    animatedBlur,
    animatedPosition,
    open,
    close,
    clearFilters,
    changeFilters,
  }), [isOpened, filters, animatedBlur, animatedPosition, open, close, clearFilters, changeFilters]);

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export default FiltersProvider;
