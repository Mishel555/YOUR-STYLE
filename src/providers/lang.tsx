import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguagesType } from '@types';
import { TRANSLATIONS } from '@constants/translations';
import { LangContext } from '@contexts';
import { readAsyncStorage, setAsyncStorage } from '@utils';
import api from '@services/api';

interface IProps {
  children: ReactNode;
}

const DEFAULT_LANG = 'en';

const initI18n = async (defaultLang: LanguagesType) => i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      ...TRANSLATIONS,
    },
    lng: defaultLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  }).then((data) => data);

const LangProvider = ({ children }: IProps) => {
  const [lang, setLang] = useState<LanguagesType | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadText = useCallback(async (lang: LanguagesType) => {
    try {
      if (!lang) return;

      const { data } = await api.translation.get({ lang });
      return i18n.addResourceBundle(lang, 'translations', data);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }, []);

  const changeLang = useCallback(async (newLang: LanguagesType) => {
    if (lang === newLang) return;

    await loadText(newLang);
    await i18n.changeLanguage(newLang);
    await setAsyncStorage('lang', newLang);
    setLang(newLang);
  }, [lang, loadText]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        if (mounted) {
          let language = await readAsyncStorage('lang');

          if (!language) {
            language = DEFAULT_LANG;
            await setAsyncStorage('lang', DEFAULT_LANG);
          }

          await initI18n(language);
          await loadText(language);
          setLang(language);
          setIsLoaded(true);
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [loadText]);

  const contextValue = useMemo(() => ({
    lang,
    isLoaded,
    changeLang,
  }), [lang, isLoaded, changeLang]);

  return (
    <LangContext.Provider value={contextValue}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
