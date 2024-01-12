import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { EColors } from '@types';
import { DiscountPaige } from '@components/molecules';

interface IProps {
  images: string[];
  discount?: number | null;
}

const Carousels = ({
  images,
  discount,
}: IProps) => {
  const { width } = Dimensions.get('screen');

  return (
    <View style={styles.root}>
      {!!discount && (
        <DiscountPaige discount={discount} size="lg" style={styles.discount} />
      )}
      <FlatList
        horizontal
        pagingEnabled
        data={images}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <FastImage
              source={{ uri: item }}
              resizeMode={FastImage.resizeMode.contain}
              style={[styles.image, { width: width - 20 }]}
            />
          </View>
        )}
        showsHorizontalScrollIndicator
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  item: {
    paddingHorizontal: 10,
    backgroundColor: EColors.White,
  },
  image: {
    height: 535,
  },
  discount: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: 1500,
  },
});

export default Carousels;
