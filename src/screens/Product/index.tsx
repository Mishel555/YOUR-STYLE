import { Fragment, useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EColors, IProduct, ISingleProduct, RootStackParamListType } from '@types';
import api from '@services/api';
import { addToBasket, getDiscountPercent } from '@utils';
import { BrandCard } from '@components/molecules';
import Carousel from './Carousel';
import DetailsSection from './DetailsSection';
import SizeSection from './SizeSection';
import SizeSelector from './SizeSelector';
import Recommendations from './Recommendations';
import BasketSection from './BasketSection';

const Product = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamListType, 'Product'>) => {
  const { params } = route;
  const { navigate } = navigation;
  const { height } = useWindowDimensions();

  const scrollRef = useRef<ScrollView | null>(null);
  const animatedPosition = useRef(new Animated.Value(height)).current;

  const [size, setSize] = useState<string | null>(null);
  const [product, setProduct] = useState<ISingleProduct | null>(null);
  const [recommendations, setRecommendations] = useState<IProduct[] | null>(null);

  const discount = product && Number(product.discount_price) && (
    getDiscountPercent(product.price, Number(product.discount_price))
  );

  const openSelector = () => {
    Animated.timing(animatedPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSelector = () => {
    Animated.timing(animatedPosition, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onSizeSelect = (size: string) => {
    if (size) {
      setSize(size);
    }

    closeSelector();
  };

  const toBasket = async () => {
    try {
      if (!product) return;

      await addToBasket({
        id: product.id,
        count: 1,
        ...(size && ({ size })),
      });

      navigate('Basket');
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  useFocusEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  });

  useEffect(() => {
    let mounted = true;

    const loadProduct = async () => {
      try {
        const { data: product } = await api.products.getSingle(params.id);
        const { data: recommendations } = await api.products.getAll({
          limit: 6,
          category_id: product.category_id,
        });

        if (mounted) {
          setProduct(product);
          setRecommendations(recommendations.rows.filter((item: IProduct) => product.id !== item.id));
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [params]);

  return (
    <View style={styles.root}>
      {product && (
        <Fragment>
          <ScrollView ref={scrollRef} style={styles.wrapper}>
            <Carousel images={product.images} discount={discount} />
            <View style={styles.main}>
              <BrandCard id={product.brandId} name={product.brand} logo={product.brandLogo} />
              <DetailsSection
                id={product.id}
                price={product.price}
                colors={product.colors}
                title={product.subcategory}
                discount={product.discount_price}
                description={product.description}
                brandDescription={product.brandDescription}
              />
              {!!product.sizes?.length && (
                <SizeSection size={size} open={openSelector} />
              )}
              <BasketSection
                delivery={product.delivery}
                deliveryPrice={product.deliveryPrice}
                disabled={!product.delivery || (!!product.sizes?.length && !size)}
                toBasket={toBasket}
              />
              {!!recommendations?.length && (
                <Recommendations products={recommendations} />
              )}
            </View>
          </ScrollView>
          {!!product.sizes?.length && (
            <SizeSelector
              sizes={product.sizes}
              animatedPosition={animatedPosition}
              close={closeSelector}
              onChange={onSizeSelect}
            />
          )}
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: EColors.White,
  },
  wrapper: {
    flex: 1,
  },
  main: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
});

export default Product;
