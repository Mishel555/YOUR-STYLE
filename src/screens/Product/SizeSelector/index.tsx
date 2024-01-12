import { Animated, FlatList, StyleSheet, View } from 'react-native';
import { EColors } from '@types';
import { Button, Paragraph } from '@components/atoms';

interface IProps {
  sizes: string[];
  animatedPosition: Animated.Value;
  close: () => void;
  onChange: (size: string) => void;
}

const SizeSelector = ({
  sizes,
  animatedPosition,
  close,
  onChange,
}: IProps) => {
  const animatedStyle = {
    transform: [{
      translateY: animatedPosition,
    }],
  };

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      <View style={styles.wrapper}>
        <View style={styles.blur} onTouchEnd={close} />
        <FlatList
          data={sizes}
          renderItem={({ item }) => (
            <Button
              onPress={() => onChange(item)}
              style={styles.button}
            >
              <Paragraph style={styles.text}>{item}</Paragraph>
            </Button>
          )}
          style={styles.container}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    zIndex: 1500,
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {
    flex: 1,
  },
  container: {
    width: '100%',
    maxHeight: 200,
    padding: 15,

    position: 'relative',
    bottom: 15,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    alignSelf: 'flex-end',
    backgroundColor: EColors.White,
  },
  blur: {
    flex: .7,
    backgroundColor: EColors.DarkBlur,
  },
  list: {
    flex: 1,
  },
  button: {
    marginVertical: 7.5,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SizeSelector;
