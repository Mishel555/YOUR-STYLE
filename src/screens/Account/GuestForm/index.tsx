import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Spacing, TranslationText } from '@components/atoms';
import { EColors } from '@types';

const GuestForm = () => {
  const { navigate } = useNavigation();

  const redirectToSignIn = () => navigate('Auth' as never, {
    defaultTab: 0,
  } as never);

  const redirectToSignUp = () => navigate('Auth' as never, {
    defaultTab: 1,
  } as never);

  return (
    <View style={styles.root}>
      <Button onPress={redirectToSignUp} style={[styles.button, styles.signUp]}>
        <TranslationText name="createAccount" style={[styles.text, styles.dark]} />
      </Button>
      <Spacing size={10} />
      <Button onPress={redirectToSignIn} style={[styles.button, styles.signIn]}>
        <TranslationText name="signIn" style={[styles.text, styles.light]} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: EColors.Black,
    paddingVertical: 12,
    backgroundColor: EColors.Black,
  },
  signIn: {
    backgroundColor: EColors.Black,
  },
  signUp: {
    backgroundColor: EColors.White,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  dark: {
    color: EColors.Black,
  },
  light: {
    color: EColors.White,
  },
});

export default GuestForm;
