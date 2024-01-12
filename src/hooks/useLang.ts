import { useContext } from 'react';
import { LangContext } from '@contexts';

const useLang = () => useContext(LangContext);

export default useLang;
