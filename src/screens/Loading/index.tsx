import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { EColors } from '@types';
import AppIcon from '@assets/images/appIcon.png';

const Loading = () => {
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const animatedTransform = useRef(new Animated.Value(.5)).current;

  const animatedStyle = {
    opacity: animatedOpacity,
    transform: [{
      scale: animatedTransform,
    }],
  };

  const runAnimation = () => {
    animatedOpacity.setValue(1);
    animatedTransform.setValue(.5);

    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: .2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTransform, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(runAnimation);
  };

  useEffect(() => runAnimation());

  return (
    <View style={styles.root}>
      <Animated.Image source={AppIcon} style={[styles.appIcon, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: EColors.White,
  },
  appIcon: {
    width: 150,
    height: 150,
    transform: [{
      scale: .5,
    }],
  },
});

export default Loading;
