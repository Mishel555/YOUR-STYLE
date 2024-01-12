import { Animated } from 'react-native';
import { IFilters, IUser, LanguagesType } from '@types';

interface IAuthContext {
  user: IUser | null;
  isLoaded: boolean;
  subscribedToPush: boolean;
  login: (user: IUser) => unknown | Promise<unknown>;
  logout: () => unknown;
  subscribePush: (FCMToken: string) => Promise<unknown> | void;
  unSubscribePush: () => Promise<unknown> | void;
}

interface IMenuContext {
  isOpen: boolean;
  animatedPosition: Animated.ValueXY;
  animatedBlur: Animated.Value;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface IFiltersContext {
  isOpened: boolean;
  filters: IFilters | null;
  animatedPosition: Animated.Value;
  animatedBlur: Animated.Value;
  open: () => void;
  close: () => void;
  clearFilters: () => void;
  changeFilters: (data: IFilters) => void;
  // changeFilters: <T extends keyof IFilters>(name: T, value: IFilters[T]) => void;
}

interface IFavoritesContext {
  favorites: number[] | null;
  toggle: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

interface ILangContext {
  isLoaded: boolean;
  lang: LanguagesType | null;
  changeLang: (lang: LanguagesType) => unknown | Promise<unknown>;
}

export type {
  IAuthContext,
  IMenuContext,
  ILangContext,
  IFiltersContext,
  IFavoritesContext,
};
