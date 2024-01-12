import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AsyncStorageKeys, EncryptedStorageKeys } from '@types';

/*
* ASYNC STORAGE
* IOS limit => no limits (2 GB),
* ANDROID limit => default 6MB
* */
const readAsyncStorage = async (key: AsyncStorageKeys) => {
  const data = await AsyncStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
};

const setAsyncStorage = async (key: AsyncStorageKeys, data: unknown) => await AsyncStorage.setItem(
  key,
  JSON.stringify(data),
);

const removeAsyncStorage = async (key: AsyncStorageKeys) => await AsyncStorage.removeItem(key);

const clearAsyncStorage = async () => await AsyncStorage.clear();

/*
* ENCRYPTED STORAGE
* encrypted storage more secure than Async Storage
* IOS limit => string with length 16,777,110 in the keychain,
* ANDROID limit => not affect Android, API relies on the phone's storage, via XML files
* */
const readEncryptedStorage = async (key: EncryptedStorageKeys) => {
  const data = await EncryptedStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
};

const setEncryptedStorage = async (key: EncryptedStorageKeys, data: unknown) => await EncryptedStorage.setItem(
  key,
  JSON.stringify(data),
);

const removeEncryptedStorage = async (key: EncryptedStorageKeys) => await EncryptedStorage.removeItem(key);

const clearEncryptedStorage = async () => await EncryptedStorage.clear();

export {
  setAsyncStorage,
  readAsyncStorage,
  clearAsyncStorage,
  removeAsyncStorage,
  setEncryptedStorage,
  readEncryptedStorage,
  clearEncryptedStorage,
  removeEncryptedStorage,
};
