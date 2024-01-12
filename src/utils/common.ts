import { IBasketGroup, InputTypes, IProduct } from '@types';
import { RootNavigations } from '@constants/navigations';

export const getKeyboardType = (inputType: InputTypes) => {
  switch (inputType) {
    case 'text':
      return 'default';
    case 'email':
      return 'email-address';
    case 'phone':
      return 'phone-pad';
    case 'number':
      return 'numeric';
    default:
      return 'default';
  }
};

export const groupProductsByBrand = (products: IProduct[]): IBasketGroup[] => {
  const map = new Map();
  const result: IBasketGroup[] = [];

  products.forEach(product => {
    if (map.get(product.brand)) {
      return map.set(product.brand, [...map.get(product.brand), product]);
    }

    map.set(product.brand, [product]);
  });

  Array.from(map.keys()).forEach(key => {
    result.push({
      brand: key,
      products: map.get(key),
    });
  });

  return result;
};

export const getDiscountPercent = (price: number, discountPrice:number): number => (
  Math.round(100 - discountPrice / price * 100)
);

export const getRouteTitle = (name: string) => {
  const foundedLink = RootNavigations.find((route) => route.name === name);

  if (!foundedLink) return null;

  return foundedLink.title;
};
