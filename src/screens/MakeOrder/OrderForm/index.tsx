import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EColors, IOrderForm } from '@types';
import { useAuth } from '@hooks';
import { Button, Spacing, TextField, TranslationText } from '@components/atoms';
import validationScheme from './validation';

interface IProps {
  amount: number;
  delivery: number;
  onSubmit: (values: IOrderForm) => void;
}

const OrderForm = ({
  amount,
  delivery,
  onSubmit,
}: IProps) => {
  const total = +amount + +delivery;
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
  } = useForm<IOrderForm>({
    defaultValues: {
      address: user?.address,
      delivery_phone: user?.phone_number,
      descriptionCustomer: '',
    },
    resolver: yupResolver(validationScheme),
  });

  const submit = handleSubmit(onSubmit);

  return (
    <View style={styles.root}>
      <TextField name="address" control={control} label="address" />
      <Spacing direction="vertical" size={10} />
      <TextField name="delivery_phone" control={control} label="phone" />
      <Spacing direction="vertical" size={10} />
      <TextField name="descriptionCustomer" control={control} label="description" multiline />
      <View style={styles.pricing}>
        <TranslationText name="total" style={styles.price}>: {total} ֏</TranslationText>
        <TranslationText name="amount" style={styles.price}>: {amount} ֏</TranslationText>
        <TranslationText name="delivery" style={styles.price}>: {delivery} ֏</TranslationText>
      </View>
      <Button onPress={submit} style={styles.submit}>
        <TranslationText name="submitOrder" style={styles.submitText} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 20,
  },
  submit: {
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: EColors.Black,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: EColors.White,
  },
  pricing: {
    marginTop: 30,
    alignItems: 'flex-end',
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    color: EColors.BlueLight,
  },
  price: {
    fontWeight: '600',
    color: EColors.GreyDark,
  },
});

export default OrderForm;
