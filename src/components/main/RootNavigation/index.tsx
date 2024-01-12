import { useCallback, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { EColors, RootStackParamListType } from '@types';
import { RootNavigations } from '@constants/navigations';
import { screenRenderer } from '@hocs';
import { useAuth, useLang } from '@hooks';
import { getFCMToken, notificationListener, readEncryptedStorage } from '@utils';

const {
  Screen,
  Navigator,
} = createNativeStackNavigator<RootStackParamListType>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureDirection: 'horizontal',
  gestureEnabled: true,
};

const RootNavigation = () => {
  const toast = useToast();
  const { isLoaded: isTextLoaded } = useLang();
  const {
    user,
    subscribePush,
    isLoaded: isUserLoaded,
  } = useAuth();

  const allowPrivate = !!user;
  const isAppReady = isTextLoaded && isUserLoaded;

  const foregroundCallback = useCallback((message: FirebaseMessagingTypes.RemoteMessage) => {
    if (!toast) return;

    toast.show(message.notification?.body || '', {
      type: 'notification',
    });
  }, [toast]);

  useEffect(() => {
    const init = async () => {
      try {
        const subscribedToPush = await readEncryptedStorage('FCMToken');

        if (subscribedToPush) {
          return await notificationListener({
            foregroundCallback,
          });
        }

        const FCMToken = await getFCMToken();
        if (FCMToken) {
          await subscribePush(FCMToken);
        }
      } catch (e) {
        console.log('error => ', JSON.stringify(e));
      }
    };

    if (isAppReady) {
      init();
    }
  }, [isAppReady, foregroundCallback, subscribePush]);

  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer key={isAppReady.toString()}>
        <Navigator initialRouteName={isAppReady ? 'Home' : 'Loading'}>
          {RootNavigations.map(({
            name,
            component,
            template,
            isPrivate,
          }) => {
            if (!isPrivate || allowPrivate) {
              return (
                <Screen
                  key={name}
                  name={name}
                  component={screenRenderer(component, template)}
                  options={screenOptions}
                />
              );
            }

            return;
          })}
        </Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EColors.White,
    ...Platform.select({
      android: {},
      ios: {},
    }),
  },
});

export default RootNavigation;
