import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useToast } from 'react-native-toast-notifications';
import { EColors, IClientError, IOrderForm, RootStackParamListType } from '@types';
import api from '@services/api';
import { removeFromBasket } from '@utils';
import OrderForm from './OrderForm';

const MakeOrder = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamListType, 'MakeOrder'>) => {
  const toast = useToast();
  const { navigate } = navigation;
  const { params } = route;
  const {
    total,
    products,
    brandId,
    deliveryPrice,
    itemKeys,
  } = params;

  const submit = async (values: IOrderForm) => {
    try {
      const order = {
        ...values,
        brandId,
        products,
      };

      await api.orders.createOrder(order);
      await removeFromBasket(itemKeys);
      navigate('Home' as never);
    } catch (e) {
      const error = e as IClientError;

      toast.show(error.response?.data.message || error.message, {
        type: 'danger',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      <OrderForm amount={total} delivery={deliveryPrice} onSubmit={submit} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    backgroundColor: EColors.White,
  },
});

export default MakeOrder;
