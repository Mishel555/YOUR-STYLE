import { Fragment, useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';
import { GenderType, EColors } from '@types';
import { Button, TranslationText } from '@components/atoms';

interface IProps {
  tabs: {
    label: string;
    value: GenderType;
  }[];
  activeTab: number;
  changeTab: (index: number) => void;
}

const TabSelector = ({
  tabs,
  activeTab,
  changeTab,
}: IProps) => {
  const { width } = useWindowDimensions();

  const animatedX = useRef(new Animated.Value(10)).current;
  const animatedStyle = {
    transform: [{
      translateX: animatedX,
    }],
  };

  const moveLine = useCallback(() => {
    Animated.timing(animatedX, {
      duration: 300,
      useNativeDriver: true,
      toValue: activeTab * Math.floor((width - 25) / tabs.length),
    }).start();
  }, [activeTab, animatedX, tabs, width]);

  useEffect(() => moveLine(), [moveLine]);

  return (
    <Fragment>
      <View style={styles.root}>
        {tabs.map(({ label }, index) => (
          <Button
            key={index}
            onPress={() => changeTab(index)}
            style={styles.button}
          >
            <TranslationText name={label} style={styles.buttonText} />
          </Button>
        ))}
      </View>
      <Animated.View style={[styles.line, animatedStyle]} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    // marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    // fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  line: {
    width: '33%',
    height: 3,
    backgroundColor: EColors.Black,
  },
});

export default TabSelector;
