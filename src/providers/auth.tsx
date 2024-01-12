import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '@contexts';
import { IUser } from '@types';
import { readEncryptedStorage, removeEncryptedStorage, setEncryptedStorage } from '@utils';
import api from '@services/api';

interface IProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [subscribedToPush, setSubscribedToPush] = useState<boolean>(false);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const login = useCallback(async (user: IUser) => {
    setUser(user);
    await setEncryptedStorage('accessToken', user.accessToken);
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await removeEncryptedStorage('accessToken');
  }, []);

  const subscribePush = useCallback(async (FCMToken: string) => {
    await api.push.subscribe({
      deviceId: FCMToken,
      ...(user && ({
        userId: user.id,
      })),
    });

    await setEncryptedStorage('FCMToken', FCMToken);
    setSubscribedToPush(true);
  }, [user]);

  const unSubscribePush = useCallback(async () => {
    const FCMToken = await readEncryptedStorage('FCMToken');
    if (FCMToken) {
      await api.push.unsubscribe({
        deviceId: FCMToken,
      });

      await removeEncryptedStorage('FCMToken');
    }

    setSubscribedToPush(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        setIsLoaded(false);

        const FCMToken = await readEncryptedStorage('FCMToken');
        const accessToken = await readEncryptedStorage('accessToken');

        if (FCMToken) {
          setSubscribedToPush(true);
        }

        if (accessToken) {
          const { data } = await api.auth.getMe();

          if (mounted) {
            setUser(data);
            setIsLoaded(true);

            return;
          }
        }

        setIsLoaded(true);
      } catch (e) {
        console.log(JSON.stringify(e));
        removeEncryptedStorage('accessToken');
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const contextValue = useMemo(() => ({
    user,
    isLoaded,
    subscribedToPush,
    login,
    logout,
    subscribePush,
    unSubscribePush,
  }), [
    user,
    isLoaded,
    subscribedToPush,
    login,
    logout,
    subscribePush,
    unSubscribePush,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
