import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { EColors, IClientError, ILoginForm } from '@types';
import api from '@services/api';
import { useAuth } from '@hooks';
import { Button, PasswordField, Spacing, TextField, TranslationText } from '@components/atoms';
import validationScheme from './validation';

const LoginForm = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { navigate } = useNavigation();
  const toast = useToast();

  const { control, handleSubmit } = useForm<ILoginForm>({
    reValidateMode: 'onChange',
    resolver: yupResolver(validationScheme),
  });

  const onFormSuccess = async (values: ILoginForm) => {
    try {
      const { data } = await api.auth.login(values);
      await login(data);
      navigate('Home' as never);
    } catch (e) {
      const error = e as IClientError;

      if (error.status === 401) {
        toast.show(t('invalidCredentials') as string, {
          type: 'danger',
        });
      }
    }
  };

  const submit = handleSubmit(onFormSuccess);

  return (
    <View style={styles.root}>
      <TextField name="email" control={control} type="email" label="email" />
      <Spacing direction="vertical" size={20} />
      <PasswordField name="password" control={control} label="password" />
      <Spacing direction="vertical" size={50} />
      <Button onPress={submit} style={styles.submit}>
        <TranslationText name="signIn" style={styles.submitText} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 40,
  },
  submit: {
    height: 40,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: EColors.Black,
  },
  submitText: {
    fontSize: 12,
    fontWeight: '600',
    color: EColors.White,
  },
});

export default LoginForm;
