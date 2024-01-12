import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { addToFavorites, getFavorites, removeFromFavorites } from '@utils';
import { FavoritesContext } from '@contexts';

interface IProps {
  children: ReactNode;
}

const FavoritesProvider = ({ children }: IProps) => {
  const [favorites, setFavorites] = useState<number[] | null>(null);

  const toggle = useCallback(async (id: number) => {
    const temp = favorites ? [...favorites] : [];

    if (temp.includes(id)) {
      await removeFromFavorites(id);
      return setFavorites(temp.filter(item => item !== id));
    }

    await addToFavorites(id);
    setFavorites([...temp, id]);
  }, [favorites]);

  const isFavorite = useCallback((id: number) => (
    !!favorites && favorites.includes(id)
  ), [favorites]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const data = await getFavorites();

      if (data && mounted) {
        setFavorites(data);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const contextValue = useMemo(() => ({
    favorites,
    toggle,
    isFavorite,
  }), [favorites, toggle, isFavorite]);

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
