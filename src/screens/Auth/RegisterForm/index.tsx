import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EColors, IClientError, IRegisterForm } from '@types';
import { Button, TranslationText, PasswordField, Spacing, TextField } from '@components/atoms';
import validationScheme from './validation';

const RegisterForm = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const toast = useToast();

  const { control, handleSubmit } = useForm<IRegisterForm>({
    reValidateMode: 'onChange',
    resolver: yupResolver(validationScheme),
  });

  const onFormSuccess = async (values: IRegisterForm) => {
    try {
      navigate('FillDetails' as never, {
        ...values,
      } as never);
    } catch (e) {
      const error = e as IClientError;

      if (error.status === 401) {
        toast.show(t('userAlreadyExists') as string, {
          type: 'danger',
        });
      }
    }
  };

  const submit = handleSubmit(onFormSuccess);

  return (
    <ScrollView style={styles.root}>
      <TextField name="email" control={control} label="email" type="email" />
      <Spacing direction="vertical" size={20} />
      <PasswordField name="password" control={control} label="password" />
      <Spacing direction="vertical" size={20} />
      <PasswordField name="confirm" control={control} label="confirmPassword" />
      <Spacing direction="vertical" size={50} />
      <Button onPress={submit} style={styles.submit}>
        <TranslationText name="next" style={styles.submitText} />
      </Button>
    </ScrollView>
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

export default RegisterForm;
