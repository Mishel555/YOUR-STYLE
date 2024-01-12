import { LanguagesType } from '@constants/types/index';

type StatusType = 'available' | 'not available';
type OrderStatusType = 'approved' | 'pending' | 'rejected';

interface ILanguages {
  en: string;
  ru: string;
  am: string;
}

// ==================== USERS TYPES ====================
interface IUser {
  id: number;
  role: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone_number: string;
  accessToken: string;
}

interface IBrand {
  id: number;
  name: string;
  phone: string;
  logo: string;
  address?: IBrandAddress[];
  description: string;
  delivery: boolean;
  delivery_price: number;
}

interface IBrandAddress {
  en: string;
  ru: string;
  am: string;
}

// ==================== PRODUCT TYPES ====================
type GenderType = 'man' | 'woman' | 'unisex' | 'boy' | 'girl';

interface IProduct {
  id: number;
  key?: string; // Available in basket
  top: boolean;
  rent: boolean;
  brand: string;
  brandId: number;
  delivery: boolean;
  price: number;
  discount_price: number;
  outlet: boolean;
  category: string;
  main_image: string;
  images: string[];
  available: boolean;
  category_id: number;
  subcategory: string;
  subcategory_id: number;
  gender: 'man' | 'women';
  colors?: string[];
  size?: string; // Available in basket
  sizes?: string[];
  barcode?: string;
  deliveryPrice?: number;
}

interface ISingleProduct extends IProduct {
  description: ILanguages;
  brandLogo: string;
  brandDescription: ILanguages;
}

// ==================== CATEGORY TYPES ====================
type GroupedCategory = {
  [key in GenderType]: ICategory[];
};

interface ICategory {
  id: number;
  name: string;
  image: string;
  type: GenderType;
  subcategories: ISubcategory[];
}

interface ISubcategory {
  id?: number;
  name: string;
  image: string;
  type: GenderType;
}

// ==================== BASKET TYPES ====================
interface IBasketGroup {
  brand: string;
  products: IProduct[];
}

interface IBasketItem {
  id: number;
  key: string;
  count: number;
  size?: string;
}

interface IBasketProduct {
  id: number;
  key: string;
  name: string;
  count: number;
  price: number;
  image: string;
  size?: string;
  deliveryPrice?: number;
}

// ==================== ORDER TYPES ====================
interface IOrder {
  id: number;
  price: number;
  address: string;
  createdAt: string;
  deliveryDate: string;
  delivery_phone: string;
  status: OrderStatusType;
  orders_to_products: IOrderToProduct[];
  descriptionAdmin?: string;
  descriptionCustomer?: string;
}

interface IOrderToProduct {
  id: number;
  size: string;
  count: number;
  product: IOrderProduct;
}

interface IOrderProduct {
  id: number;
  main_image: string;
  price: number;
  discount_price: number;
  subcategory: {
    name: string;
  };
  brand: {
    name: string;
    logo: string;
  };
}

// ==================== MISC TYPES ====================
interface ICheckbox {
  name: string;
  label: string;
}

interface IFilters {
  addressType?: number[];
  brand_id?: number[];
  order?: [string[]];
  gender?: GenderType;
  category_id?: number;
  subcategory_id?: number;
  sorting?: string;
  price?: number[];
  colors?: string[];
  search?: string;
  outlet?: boolean;
  kids?: boolean;
}

interface ICascade {
  id: number;
  label: string;
  items: {
    id: number;
    label: string;
  }[];
}

interface IRegion {
  id: number;
  label: string;
  items: {
    id: number;
    label: string;
  }[];
}

interface ILanguage {
  label: string;
  image: string;
  value: LanguagesType;
}

export type {
  IUser,
  IOrder,
  IBrand,
  ICascade,
  IFilters,
  ILanguage,
  IOrderProduct,
  IOrderToProduct,
  IProduct,
  IBrandAddress,
  ISingleProduct,
  ICategory,
  ISubcategory,
  IBasketItem,
  IBasketGroup,
  IBasketProduct,
  ICheckbox,
  ILanguages,
  IRegion,
  StatusType,
  GenderType,
  GroupedCategory,
  OrderStatusType,
};
