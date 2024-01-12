import { IBasketItem } from '@types';
import { readAsyncStorage, removeAsyncStorage, setAsyncStorage } from './storage';

const STORAGE_KEY = 'basket';

interface IAddToBasket {
  id: number;
  count: number;
  size?: string;
}

const getBasket = async () => await readAsyncStorage(STORAGE_KEY);

const clearBasket = async () => await removeAsyncStorage(STORAGE_KEY);

const addToBasket = async (item: IAddToBasket) => {
  const prevState = await getBasket();

  if (prevState) {
    const basket = [...prevState, {
      ...item,
      key: `${prevState.length}_${item.id}`,
    }];

    return await setAsyncStorage(STORAGE_KEY, basket);
  }

  return await setAsyncStorage(STORAGE_KEY, [{ ...item, key: `0_${item.id}` }]);
};

const removeFromBasket = async (itemsKey: string[]) => {
  const prevState = await getBasket();

  if (!prevState) return;

  const basket = prevState.filter((item: IBasketItem) => !itemsKey.includes(item.key));

  if (basket.length) {
    return await setAsyncStorage(STORAGE_KEY, basket);
  }

  return await clearBasket();
};

export {
  getBasket,
  clearBasket,
  addToBasket,
  removeFromBasket,
};
