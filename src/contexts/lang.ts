import { createContext } from 'react';
import { ILangContext } from '@types';

const LangContext = createContext<ILangContext>({
  lang: 'en',
  isLoaded: false,
  changeLang: () => {},
});

export default LangContext;
