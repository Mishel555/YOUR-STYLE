import { AxiosError } from 'axios';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

type InputTypes = 'text' | 'email' | 'phone' | 'number';

type AsyncStorageKeys = 'lang' | 'basket' | 'favorites';
type EncryptedStorageKeys = 'accessToken' | 'FCMToken';
type LanguagesType = 'en' | 'ru' | 'am';

interface IClientError extends AxiosError {
  response?: {
    data: {
      message: string;
    };
  };
}

interface INotificationListenerConfig {
  foregroundCallback: (message: FirebaseMessagingTypes.RemoteMessage) => void;
}

export * from './data';
export * from './enums';
export * from './forms';
export * from './context';
export * from './navigation';
export type {
  InputTypes,
  IClientError,
  LanguagesType,
  AsyncStorageKeys,
  EncryptedStorageKeys,
  INotificationListenerConfig,
};
