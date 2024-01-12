import { useContext } from 'react';
import { FavoritesContext } from '@contexts';

const useFavorites = () => useContext(FavoritesContext);

export default useFavorites;
