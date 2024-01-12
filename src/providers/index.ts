import { combineProviders } from 'react-combine-providers';

import MenuProvider from './menu';
import AuthProvider from './auth';
import FiltersProvider from './filters';
import FavoritesProvider from './favorites';
import LangProvider from './lang';

const providers = [
  AuthProvider,
  MenuProvider,
  LangProvider,
  FiltersProvider,
  FavoritesProvider,
];

const combinedProviders = combineProviders();
providers.forEach(provider => combinedProviders.push(provider));

export { combinedProviders };
