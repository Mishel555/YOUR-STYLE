import { ImageBackground, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { EColors } from '@types';
import { Paragraph } from '@components/atoms';

import OrangeBack from '@assets/images/discount-orange-background.png';
import RedBack from '@assets/images/discount-red-background.png';

interface IProps {
  discount: number;
  size?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}

const DiscountPaige = ({
  discount,
  size = 'md',
  style,
}: IProps) => (
  <ImageBackground source={discount > 50 ? RedBack : OrangeBack} style={[styles.root, sizedStyles[size].image, style]}>
    <Paragraph style={[styles.text, sizedStyles[size].text]}>
      {discount} %
    </Paragraph>
  </ImageBackground>
);

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: EColors.White,
    fontWeight: '600',
    transform: [{
      rotate: '-45deg',
    }],
  },
});

const sizedStyles = {
  sm: StyleSheet.create({
    image: {
      width: 55,
      height: 55,
    },
    text: {
      fontSize: 14,
    },
  }),
  md: StyleSheet.create({
    image: {
      width: 80,
      height: 80,
    },
    text: {
      fontSize: 16,
    },
  }),
  lg: {
    image: {
      width: 100,
      height: 100,
    },
    text: {
      fontSize: 24,
    },
  },
};

export default DiscountPaige;
