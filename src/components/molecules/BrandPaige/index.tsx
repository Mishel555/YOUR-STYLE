import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { EColors } from '@types';
import { Paragraph, Spacing } from '@components/atoms';

interface IProps {
  name: string;
  logo: string;
  size?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}

const BrandPaige = ({
  name,
  logo,
  size = 'md',
  style,
}: IProps) => (
  <View style={[styles.root, style]}>
    <FastImage source={{ uri: logo }} style={sizedStyles[size].image} />
    <Spacing size={10} />
    <Paragraph style={[styles.text, sizedStyles[size].text]}>
      {name}
    </Paragraph>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    color: EColors.Black,
  },
});

const sizedStyles = {
  sm: StyleSheet.create({
    image: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    text: {
      fontSize: 14,
    },
  }),
  md: StyleSheet.create({
    image: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
    },
    text: {
      fontSize: 16,
    },
  }),
  lg: {
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    text: {
      fontSize: 24,
    },
  },
};

export default BrandPaige;
