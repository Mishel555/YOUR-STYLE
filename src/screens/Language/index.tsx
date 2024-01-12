import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { EColors, LanguagesType, RootStackParamListType } from '@types';
import { LANGUAGES } from '@constants/languages';
import { useLang } from '@hooks';
import { LanguageCard } from '@components/molecules';
import { Button, Spacing, TranslationText } from '@components/atoms';

const Language = ({ navigation }: NativeStackScreenProps<RootStackParamListType, 'Languages'>) => {
  const { i18n } = useTranslation();

  const { navigate } = navigation;
  const { lang, changeLang } = useLang();

  const [language, setLanguage] = useState<LanguagesType | null>(lang);

  const onChange = async (lang: LanguagesType) => {
    try {
      setLanguage(lang);
      await changeLang(lang);
      await i18n.changeLanguage(lang);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  const confirm = async () => {
    if (!language) return;

    navigate('Home' as never);
  };

  return (
    <View style={styles.root}>
      <TranslationText name="language" nameSpace="language" size={1} style={styles.title} />
      <TranslationText name="sentence" nameSpace="language" style={styles.text} />
      <FlatList
        data={LANGUAGES}
        renderItem={({ item }) => (
          <LanguageCard {...item} active={language === item.value} onChange={onChange} />
        )}
        ItemSeparatorComponent={() => <Spacing direction="vertical" size={20} />}
        style={styles.wrapper}
      />
      <Button onPress={confirm} style={styles.confirm}>
        <TranslationText name="save" nameSpace="language" style={styles.confirmText} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: EColors.GreyExtra,
  },
  title: {
    fontWeight: '700',
  },
  text: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  confirm: {
    alignSelf: 'flex-end',
    marginTop: 15,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: EColors.Black,
  },
  confirmText: {
    fontWeight: '500',
    color: EColors.White,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    marginTop: 50,
  },
});

export default Language;
