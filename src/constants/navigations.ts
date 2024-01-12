import { ETemplates, IExternalLink, IMainMenuLink, INavigation, ITabLink } from '@types';
import {
  AccountScreen,
  AuthScreen,
  BasketScreen,
  BrandScreen,
  BrandsScreen,
  CategoriesScreen,
  FillDetailsScreen,
  HomeScreen,
  LikesScreen,
  LoadingScreen,
  MakeOrderScreen,
  OrdersScreen,
  ProductScreen,
  SearchScreen,
  SubcategoriesScreen,
  LanguageScreen,
  ContactScreen,
} from '@screens';

export const RootNavigations: INavigation[] = [
  {
    name: 'Auth',
    component: AuthScreen,
    template: ETemplates.Header,
  },
  {
    name: 'Account',
    component: AccountScreen,
    template: ETemplates.Tab,
  },
  {
    name: 'Basket',
    component: BasketScreen,
    template: ETemplates.Main,
  },
  {
    name: 'Brand',
    component: BrandScreen,
    template: ETemplates.Header,
  },
  {
    name: 'Brands',
    component: BrandsScreen,
    template: ETemplates.Header,
    title: 'findYourBrand',
  },
  {
    name: 'Categories',
    component: CategoriesScreen,
    template: ETemplates.Main,
  },
  {
    name: 'FillDetails',
    component: FillDetailsScreen,
    template: ETemplates.Header,
    title: 'fillDetails',
  },
  {
    name: 'Home',
    component: HomeScreen,
    template: ETemplates.Main,
  },
  {
    name: 'MakeOrder',
    component: MakeOrderScreen,
    template: ETemplates.Header,
  },
  {
    name: 'Likes',
    component: LikesScreen,
    template: ETemplates.Header,
    title: 'savedItems',
  },
  {
    name: 'Orders',
    component: OrdersScreen,
    template: ETemplates.Header,
    title: 'myOrders',
    isPrivate: true,
  },
  {
    name: 'Search',
    component: SearchScreen,
    template: ETemplates.Main,
  },
  {
    name: 'Subcategories',
    component: SubcategoriesScreen,
    template: ETemplates.Main,
  },
  {
    name: 'Product',
    component: ProductScreen,
    template: ETemplates.Header,
  },
  {
    name: 'Loading',
    component: LoadingScreen,
  },
  {
    name: 'Languages',
    component: LanguageScreen,
  },
  {
    name: 'Contact',
    component: ContactScreen,
    template: ETemplates.Tab,
  },
];

export const MainMenuLinks: IMainMenuLink[] = [
  {
    to: 'Home',
    icon: 'compass-outline',
    label: 'home',
  },
  {
    to: 'Categories',
    icon: 'ios-options',
    label: 'search',
  },
  {
    to: 'Basket',
    icon: 'cart-outline',
    label: 'bag',
  },
  {
    to: 'Likes',
    icon: 'heart-outline',
    label: 'savedItems',
  },
  {
    to: 'Orders',
    icon: 'albums-outline',
    label: 'myOrders',
    isPrivate: true,
  },
  {
    to: 'Brands',
    icon: 'shirt-outline',
    label: 'brands',
  },
  {
    to: 'Account',
    icon: 'ios-person',
    label: 'account',
  },
  {
    to: 'Languages',
    icon: 'ios-language',
    label: 'languages',
  },
  {
    to: 'Contact',
    icon: 'ios-chatbubbles-outline',
    label: 'contactUs',
  },
];

export const MainMenuExternalLinks: IExternalLink[] = [
  {
    url: 'https://your-style.co/privacy-policy',
    icon: 'shield-alert-outline',
    label: 'privacyPolicy',
  },
];

export const RootTabLinks: ITabLink[] = [
  {
    to: 'Home',
    icon: 'compass-outline',
  },
  {
    to: 'Categories',
    icon: 'ios-options',
  },
  {
    to: 'Basket',
    icon: 'cart-outline',
    mark: true,
  },
  {
    to: 'Likes',
    icon: 'heart-outline',
  },
  {
    to: 'Account',
    icon: 'ios-person',
  },
];
