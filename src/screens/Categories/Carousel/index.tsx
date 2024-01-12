import { forwardRef, Fragment, useEffect, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native';
import { GenderType, GroupedCategory } from '@types';
import { Spacing } from '@components/atoms';
import CategoryList from '../CategoryList';
import KidsSwitch from '../KidsSwitch';

interface IProps {
  activeTab: number;
  categories: GroupedCategory;
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const KEYS: GenderType[] = ['man', 'woman', 'boy'];

const Carousel = forwardRef<FlatList, IProps>(({
  activeTab,
  categories,
  onScroll,
}, forwardedRef) => {
  const [gender, setGender] = useState<GenderType>('man');

  const onKidGenderChange = (gender: GenderType) => {
    setGender(gender);
  };

  useEffect(() => {
    setGender(KEYS[activeTab]);
  }, [activeTab]);

  return (
    <Fragment>
      {activeTab > 1 && (
        <KidsSwitch onChange={onKidGenderChange} />
      )}
      <FlatList
        ref={forwardedRef}
        data={KEYS}
        horizontal
        pagingEnabled
        onScrollEndDrag={onScroll}
        initialScrollIndex={activeTab}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Spacing size={10} />}
        renderItem={({ item }) => (
          <CategoryList gender={gender} categories={categories[gender === 'girl' ? 'girl' : item]} />
        )}
        style={styles.root}
      />
    </Fragment>
  );
});

const styles = StyleSheet.create({
  root: {
    marginTop: 15,
  },
});

export default Carousel;
