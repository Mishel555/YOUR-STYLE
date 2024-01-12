import { readAsyncStorage, removeAsyncStorage, setAsyncStorage } from './storage';

const STORAGE_KEY = 'favorites';

const getFavorites = async () => await readAsyncStorage(STORAGE_KEY);

const clearFavorites = async () => await removeAsyncStorage(STORAGE_KEY);

const addToFavorites = async (id: number) => {
  const prevState = await getFavorites();

  if (prevState) {
    const favorites = [...prevState, id];

    return await setAsyncStorage(STORAGE_KEY, favorites);
  }

  return await setAsyncStorage(STORAGE_KEY, [id]);
};

const removeFromFavorites = async (id: number) => {
  const prevState = await getFavorites();

  if (!prevState) return;

  const favorites = prevState.filter((item: number) => item !== id);

  if (favorites.length) {
    return await setAsyncStorage(STORAGE_KEY, favorites);
  }

  return await clearFavorites();
};

export {
  getFavorites,
  clearFavorites,
  addToFavorites,
  removeFromFavorites,
};
