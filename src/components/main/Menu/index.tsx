import { memo, useEffect, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useMenu } from '@hooks';
import Intro from './Intro';
import Links from './Links';

import { EColors } from '@types';

const Menu = () => {
  const {
    close,
    isOpen,
    animatedBlur,
    animatedPosition,
  } = useMenu();

  const [mounted, setMounted] = useState(isOpen);

  const animatedStyle = {
    root: {
      transform: [{ translateX: animatedPosition.x }],
    },
    blur: {
      opacity: animatedBlur,
    },
  };

  useEffect(() => {
    if (isOpen) {
      return setMounted(true);
    }

    const timeout = setTimeout(() => setMounted(false), 300);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isOpen]);

  return (
    <Animated.View style={[styles.root, animatedStyle.root, mounted && styles.active]}>
      <View style={styles.main}>
        <Intro />
        <Links />
      </View>
      <Animated.View onTouchEnd={close} style={[styles.blur, animatedStyle.blur]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'none',
    flexDirection: 'row',

    ...StyleSheet.absoluteFillObject,
    zIndex: 1500,
  },
  active: {
    display: 'flex',
  },
  main: {
    flex: .8,
    borderColor: EColors.GreyDark,
    backgroundColor: EColors.White,
  },
  blur: {
    flex: .2,
    backgroundColor: EColors.DarkBlur,
    opacity: .6,
  },
});

export default memo(Menu);
