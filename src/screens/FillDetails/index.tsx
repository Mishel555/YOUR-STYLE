import { ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EColors, IClientError, IFillDetails, RootStackParamListType } from '@types';
import api from '@services/api';
import { useAuth } from '@hooks';
import { GenderField } from '@components/molecules';
import { Button, Spacing, TextField, DateField, TranslationText } from '@components/atoms';
import validationScheme from './validation';

const FillDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamListType, 'FillDetails'>) => {
  const { login } = useAuth();
  const { params } = route;
  const { navigate } = navigation;

  const {
    control,
    setError,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IFillDetails>({
    resolver: yupResolver(validationScheme),
    reValidateMode: 'onChange',
    defaultValues: {
      gender: 'man',
    },
  });

  const onDateChange = (date: string | null) => {
    if (date) {
      setValue('dateOfBirth', date);
    } else {
      setValue('dateOfBirth', '');
    }
  };

  const onGenderChange = (gender: string) => {
    setValue('gender', gender);
  };

  const onFormSuccess = async (values: IFillDetails) => {
    try {
      const { data } = await api.auth.register({ ...params, ...values });

      await login(data);
      navigate('Home' as never);
    } catch (e) {
      const error = e as IClientError;

      if (error.response?.data) {
        console.log(JSON.stringify(e));
        setError('phone_number', { message: error.response.data.message });
      }
    }
  };

  const submit = handleSubmit(onFormSuccess);

  return (
    <ScrollView style={styles.root}>
      <TextField name="firstName" control={control} label="firstName" />
      <Spacing direction="vertical" size={20} />
      <TextField name="lastName" control={control} label="lastName" />
      <Spacing direction="vertical" size={20} />
      <TextField name="address" control={control} label="address" />
      <Spacing direction="vertical" size={20} />
      <TextField name="phone_number" control={control} type="phone" label="phone" />
      <Spacing direction="vertical" size={20} />
      <DateField errorMessage={errors.dateOfBirth?.message} onDateChange={onDateChange} />
      <Spacing direction="vertical" size={20} />
      <GenderField onChange={onGenderChange} />
      <Spacing direction="vertical" size={50} />
      <Button onPress={submit} style={styles.submit}>
        <TranslationText name="signUp" style={styles.submitText} />
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  submit: {
    height: 40,
    marginBottom: 20,
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

export default FillDetails;
