import { createContext } from 'react';
import { IFavoritesContext } from '@types';

const FavoritesContext = createContext<IFavoritesContext>({
  favorites: null,
  toggle: () => {},
  isFavorite: () => false,
});

export default FavoritesContext;
