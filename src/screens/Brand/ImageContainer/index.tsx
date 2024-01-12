import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface IProps {
  src: string;
}

const ImageContainer = ({ src }: IProps) => (
  <View style={styles.root}>
    <FastImage source={{ uri: src }} resizeMode={FastImage.resizeMode.contain} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 300,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  imageContainer: {},
});

export default ImageContainer;
