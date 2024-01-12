import { createContext } from 'react';
import { IAuthContext } from '@types';

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoaded: true,
  subscribedToPush: false,
  login: () => {
  },
  logout: () => {
  },
  subscribePush: () => {},
  unSubscribePush: () => {},
});

export default AuthContext;
