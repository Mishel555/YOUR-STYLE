import { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { MenuContext } from '@contexts';

interface IProps {
  children: ReactNode;
}

const MenuProvider = ({ children }: IProps) => {
  const { width } = useWindowDimensions();

  const animatedPosition = useRef(new Animated.ValueXY({ x: -width, y: 0 })).current;
  const animatedBlur = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(animatedPosition, {
        duration: 300,
        useNativeDriver: true,
        toValue: { x: 0, y: 0 },
      }),
      Animated.timing(animatedBlur, {
        duration: 150,
        delay: 300,
        useNativeDriver: true,
        toValue: 1,
      }),
    ]).start();
  }, [animatedPosition, animatedBlur]);

  const closeAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(animatedPosition, {
        duration: 300,
        useNativeDriver: true,
        toValue: { x: -width, y: 0 },
      }),
      Animated.timing(animatedBlur, {
        duration: 1,
        useNativeDriver: true,
        toValue: 0,
      }),
    ]).start();
  }, [width, animatedPosition, animatedBlur]);

  const open = useCallback(() => {
    openAnimation();
    setIsOpen(true);
  }, [openAnimation]);

  const close = useCallback(() => {
    closeAnimation();
    setIsOpen(false);
  }, [closeAnimation]);

  const toggle = useCallback(() => setIsOpen(prevState => !prevState), []);

  const contextValue = useMemo(() => ({
    isOpen,
    animatedBlur,
    animatedPosition,
    open,
    close,
    toggle,
  }), [isOpen, animatedBlur, animatedPosition, open, close, toggle]);

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
