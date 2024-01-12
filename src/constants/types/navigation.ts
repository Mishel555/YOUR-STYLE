import { ReactElement } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ETemplates, GenderType, IBasketItem, ISubcategory } from '@types';

interface IAuthParams {
  defaultTab?: number;
}

interface IBrandParams {
  id: number;
}

interface IFillDetailsParams {
  email: string;
  password: string;
}

interface ISingleProductParams {
  id: number;
}

interface ISubcategoriesParams {
  category: {
    id: number;
    name: string;
    image: string;
  };
  subcategories: ISubcategory[];
  gender: GenderType;
}

interface IMakeOrderParams {
  total: number;
  brandId: string;
  deliveryPrice: number;
  products: IBasketItem[];
  itemKeys: string[];
}

type RootStackParamListType = {
  Auth: IAuthParams;
  Account: undefined;
  Brand: IBrandParams;
  Brands: undefined;
  Basket: undefined;
  Contact: undefined;
  Categories: undefined;
  FillDetails: IFillDetailsParams;
  MakeOrder: IMakeOrderParams;
  Home: undefined;
  Likes: undefined;
  Orders: undefined;
  Product: ISingleProductParams;
  Loading: undefined;
  Search: undefined;
  Subcategories: ISubcategoriesParams;
  Languages: undefined;
}

interface INavigation {
  name: keyof RootStackParamListType;
  component: (props: NativeStackScreenProps<RootStackParamListType, keyof RootStackParamListType>) => ReactElement;
  template?: ETemplates;
  initialParams?: {};
  title?: string;
  isPrivate?: boolean;
}

interface ILink {
  to: keyof RootStackParamListType;
  icon: string;
}

interface ITabLink extends ILink{
  mark?: boolean;
}

interface IMainMenuLink extends ILink{
  label: string;
  isPrivate?: boolean;
}

interface IExternalLink {
  url: string;
  icon: string;
  label: string;
}

export type {
  ILink,
  ITabLink,
  INavigation,
  IMainMenuLink,
  IExternalLink,
  IAuthParams,
  IBrandParams,
  IFillDetailsParams,
  IMakeOrderParams,
  ISingleProductParams,
  ISubcategoriesParams,
  RootStackParamListType,
};
