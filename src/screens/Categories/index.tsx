import { useEffect, useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { GenderType, GroupedCategory } from '@types';
import api from '@services/api';
import TabSelector from './TabSelector';
import Carousel from './Carousel';

interface ITab {
  label: string;
  value: GenderType;
}

const TABS: ITab[] = [
  {
    label: 'man',
    value: 'man',
  },
  {
    label: 'woman',
    value: 'woman',
  },
  {
    label: 'kids',
    value: 'boy',
  },
];

const Categories = () => {
  const carouselRef = useRef<FlatList | null>(null);

  const [tab, setTab] = useState<number>(0);
  const [categories, setCategories] = useState<GroupedCategory | null>(null);

  const scrollCarousel = (index: number) => {
    carouselRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const changeTab = (index: number) => {
    setTab(index);

    scrollCarousel(index);
  };

  const onCarouselScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const approximateIndex = event.nativeEvent.contentOffset.x / slideSize;
    const index = Math.round(approximateIndex);

    changeTab(index);
  };

  useEffect(() => {
    let mounted = true;

    const getCategories = async () => {
      try {
        const { data } = await api.categories.getAll({
          grouped: true,
        });

        if (mounted) {
          setCategories(data);
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    getCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.root}>
      <TabSelector tabs={TABS} activeTab={tab} changeTab={changeTab} />
      {categories && (
        <Carousel
          ref={carouselRef}
          activeTab={tab}
          categories={categories}
          onScroll={onCarouselScroll}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Categories;
