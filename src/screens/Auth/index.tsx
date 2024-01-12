import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EColors, RootStackParamListType } from '@types';
import Toolbar from './Toolbar';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const TABS = [
  'signIn',
  'createAccount',
];

const AuthScreen = ({ route }: NativeStackScreenProps<RootStackParamListType, 'Auth'>) => {
  const { params } = route;
  const [tab, setTab] = useState<number>(params?.defaultTab || 0);

  const selectTab = (index: number) => setTab(index);

  return (
    <View style={styles.root}>
      <Toolbar tabs={TABS} activeTab={tab} changeTab={selectTab} />
      <View style={styles.wrapper}>
        {tab === 0 ? <LoginForm /> : <RegisterForm />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EColors.White,
  },
  wrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default AuthScreen;
