import { useEffect, useState } from 'react';
import { Animated, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { REGIONS } from '@constants/regions';
import { EColors, GenderType, IBrand, ICascade, ICategory, ICheckbox, IFilters } from '@types';
import api from '@services/api';
import { useFilters } from '@hooks';
import { isObjectEmpty } from '@utils';

import { ColorPicker } from '@components/organisms';
import { Cascader, CheckboxGroup } from '@components/molecules';
import { Button, Switch, TranslationText } from '@components/atoms';

import FilterGroup from './FilterGroup';
import Price from './Price';
import Search from './Search';

interface IFilterState {
  gender: ICheckbox[];
  sorting: ICheckbox[];
  regions: ICascade[];
  brands?: ICheckbox[] | null;
  categories?: ICascade[] | null;
}

const GENDERS = [
  {
    name: 'man',
    label: 'man',
  },
  {
    name: 'woman',
    label: 'woman',
  },
];

const SORTING = [
  {
    name: 'ASC',
    label: 'priceLowToHigh',
  },
  {
    name: 'DESC',
    label: 'priceHighToLow',
  },
];

const Filters = () => {
  const { navigate } = useNavigation();
  const {
    close,
    isOpened,
    animatedBlur,
    animatedPosition,
    filters: defaultFilters,
    changeFilters,
  } = useFilters();

  const [filters, setFilters] = useState<IFilters | null>(defaultFilters);
  const [options, setOptions] = useState<IFilterState>({
    gender: GENDERS,
    sorting: SORTING,
    brands: null,
    categories: null,
    regions: REGIONS,
  });

  const onGroupChange = (name: string, value: unknown[]) => {
    const temp: IFilters = filters ? { ...filters } : {};
    delete temp.search;

    if (name === 'price') {
      if (!value.length) return;

      temp.price = value as number[];
      return setFilters(temp);
    }

    if (name === 'brands') {
      temp.brand_id = value as number[];
      return setFilters(temp);
    }

    if (name === 'gender') {
      temp.gender = value[0] as GenderType;
      return setFilters(temp);
    }

    if (name === 'sort') {
      if (value[0]) {
        temp.order = [['discount_price', value[0] as string]];
        return setFilters(temp);
      }

      delete temp.order;
      return setFilters(temp);
    }

    if (name === 'regions') {
      temp.addressType = value as number[];
      return setFilters(temp);
    }

    if (name === 'categories') {
      temp.category_id = value[0] as number;
      delete temp.subcategory_id;

      if (value[1] !== undefined) {
        temp.subcategory_id = value[1] as number;
      }

      return setFilters(temp);
    }

    if (name === 'colors') {
      temp.colors = value as string[];

      return setFilters(temp);
    }
  };

  const onSwitchChange = (name: string, checked: boolean) => {
    const filterName = name as 'kids' | 'outlet';

    const temp: IFilters = filters ? { ...filters } : {};
    delete temp.search;

    if (checked) {
      temp[filterName] = true;
      return setFilters(temp);
    }

    delete temp[filterName];
    return setFilters(temp);
  };

  const viewItems = () => {
    close();
    Keyboard.dismiss();
    changeFilters(filters || {});
    navigate('Search' as never);
  };

  const clearAll = () => {
    close();
    setFilters(null);
    changeFilters({});
  };

  useEffect(() => {
    setFilters(defaultFilters);
  }, [defaultFilters]);

  useEffect(() => {
    let mounted = true;

    const loadFilters = async () => {
      try {
        const { data: categories } = await api.categories.getAll();
        const { data: brands } = await api.brands.getAll({ limit: 10000 });

        if (!mounted) return;

        setOptions(prevState => ({
          ...prevState,
          ...(categories.length && ({
            categories: categories.map((category: ICategory) => ({
              id: category.id,
              label: category.name,
              items: category.subcategories.map(subcategory => ({
                id: subcategory.id,
                label: subcategory.name,
              })),
            })),
          })),
          ...(brands.rows.length && ({
            brands: brands.rows.map((brand: IBrand) => ({
              name: brand.id,
              label: brand.name,
            })),
          })),
        }));
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    loadFilters();

    return () => {
      mounted = false;
    };
  }, []);

  const animatedStyles = {
    root: { transform: [{ translateX: animatedPosition }] },
    blur: { opacity: animatedBlur },
  };

  return (
    <Animated.View style={[styles.root, animatedStyles.root]}>
      <Animated.View onTouchEnd={close} style={[styles.blur, animatedStyles.blur]} />
      <View style={styles.container} key={isOpened.toString()}>
        <ScrollView style={styles.wrapper}>
          <FilterGroup label="search">
            <Search />
          </FilterGroup>
          <FilterGroup label="price">
            <Price onChange={onGroupChange} />
            <Switch name="outlet" label="outlet" defaultChecked={filters?.outlet} onChange={onSwitchChange} />
          </FilterGroup>
          <FilterGroup label="sort">
            <CheckboxGroup
              name="sort"
              radio
              data={options.sorting}
              {...filters?.order && {
                defaultValues: [filters.order[0][1]],
              }}
              onChange={onGroupChange}
            />
          </FilterGroup>
          <FilterGroup label="gender">
            <CheckboxGroup
              name="gender"
              radio
              data={options.gender}
              {...filters?.gender && {
                defaultValues: [filters.gender],
              }}
              onChange={onGroupChange}
            />
            <Switch name="kids" label="kids" defaultChecked={filters?.kids} onChange={onSwitchChange} />
          </FilterGroup>
          {options.brands && (
            <FilterGroup label="brands">
              <CheckboxGroup
                name="brands"
                data={options.brands}
                defaultValues={filters?.brand_id}
                onChange={onGroupChange}
              />
            </FilterGroup>
          )}
          {options.categories && (
            <FilterGroup label="categories">
              <Cascader
                name="categories"
                data={options.categories}
                defaultGroup={filters?.category_id}
                defaultItem={filters?.subcategory_id}
                onChange={onGroupChange}
              />
            </FilterGroup>
          )}
          <FilterGroup label="colors">
            <ColorPicker name="colors" defaultColors={filters?.colors} onChange={onGroupChange} />
          </FilterGroup>
          <FilterGroup label="regions">
            <Cascader
              name="regions"
              data={options.regions}
              {...filters?.addressType && ({
                defaultGroup: filters.addressType[0],
                defaultItem: filters.addressType[1],
              })}
              onChange={onGroupChange}
            />
          </FilterGroup>
          {!!filters && !isObjectEmpty(filters) && (
            <Button onPress={clearAll} style={styles.clear}>
              <TranslationText name="clearAll" style={styles.clearText} />
            </Button>
          )}
        </ScrollView>
        <Button onPress={viewItems} disabled={!filters} style={styles.submit}>
          <TranslationText name="viewItems" style={styles.submitText} />
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    ...StyleSheet.absoluteFillObject,
  },
  blur: {
    flex: .2,
    width: '100%',
    backgroundColor: EColors.DarkBlur,
  },
  container: {
    flex: .8,
    paddingHorizontal: 15,
    paddingBottom: 25,
    backgroundColor: EColors.White,
  },
  wrapper: {
    flex: 1,
    marginTop: 20,
  },
  submit: {
    borderRadius: 3,
    paddingVertical: 10,
    backgroundColor: EColors.Black,
  },
  clear: {
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  clearText: {
    fontWeight: '600',
    textAlign: 'right',
  },
  submitText: {
    fontWeight: '600',
    textAlign: 'center',
    color: EColors.White,
  },
});

export default Filters;
