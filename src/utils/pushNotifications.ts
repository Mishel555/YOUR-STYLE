import messaging from '@react-native-firebase/messaging';
import { INotificationListenerConfig } from '@types';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
};

const getFCMToken = async () => {
  const enabled = await requestUserPermission();

  if (enabled) {
    return await messaging().getToken();
  }

  return null;
};

const notificationListener = (config: INotificationListenerConfig) => {
  const { foregroundCallback } = config;

  messaging().onNotificationOpenedApp(message => {
    console.log('Notification caused app to open from background state', message);
  });

  messaging().getInitialNotification().then(message => {
    if (message) {
      console.log('Notification caused app to open from quit state', message);
    }
  });

  messaging().setBackgroundMessageHandler(async message => {
    if (message) {
      console.log('Notification from background state', message);
    }
  });

  return messaging().onMessage(async message => {
    foregroundCallback(message);
  });
};

export {
  getFCMToken,
  requestUserPermission,
  notificationListener,
};
