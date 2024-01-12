import { ImageBackground, StyleSheet, View } from 'react-native';
import { Heading } from '@components/atoms';
import BackgroundImage from '@assets/images/menu-background.jpg';
import { EColors } from '@types';

const Intro = () => (
  <View style={styles.root}>
    <ImageBackground style={styles.image} blurRadius={20} source={BackgroundImage}>
      <Heading style={styles.text}>
        Your Style
      </Heading>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: .3,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  text: {
    fontWeight: '700',
    color: EColors.White,
  },
});

export default Intro;
