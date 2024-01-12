import { Fragment, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import moment from 'moment';
import { EColors, IOrder } from '@types';
import { BrandPaige, OrderItem } from '@components/molecules';
import { Button, Paragraph, Spacing, TranslationText } from '@components/atoms';
import { IonicIcon } from '@components/icons';

interface IProps {
  order: IOrder;
}

const OrderGroup = ({ order }: IProps) => {
  const {
    price,
    status,
    address,
    createdAt,
    deliveryDate,
    delivery_phone,
    descriptionAdmin,
    descriptionCustomer,
    orders_to_products,
  } = useMemo(() => order, [order]);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const toggle = () => setIsOpen(prevState => !prevState);

  return (
    <View style={styles.root}>
      <Button onPress={toggle} style={styles.toolbar}>
        <View>
          <Paragraph style={styles.date}>{moment(createdAt).format('YYYY-MM-DD')}</Paragraph>
          <TranslationText name="status" style={[styles.status, styles[`status_${status}`]]}>
            : <TranslationText name={status} style={[styles.status, styles[`status_${status}`]]} />
          </TranslationText>
        </View>
        <IonicIcon name={isOpen ? 'ios-caret-down-outline' : 'ios-caret-forward-outline'} />
      </Button>
      {isOpen && (
        <Fragment>
          <BrandPaige
            size="sm"
            name={orders_to_products[0].product.brand.name}
            logo={orders_to_products[0].product.brand.logo}
            style={styles.brand}
          />
          <FlatList
            data={orders_to_products}
            renderItem={({ item }) => <OrderItem {...item} />}
            ItemSeparatorComponent={() => <Spacing direction="vertical" size={10} />}
            style={styles.list}
          />
          {!!deliveryDate && (
            <TranslationText name="deliveryDate" style={styles.meta}>
              : {moment(deliveryDate).format('DD-MM-YYYY, HH:MM')}
            </TranslationText>
          )}
          {!!descriptionCustomer && (
            <TranslationText name="yourMessage" style={styles.meta}>
              : {descriptionCustomer}
            </TranslationText>
          )}
          {!!descriptionAdmin && (
            <TranslationText name="brandMessage" style={styles.meta}>
              : {descriptionAdmin}
            </TranslationText>
          )}
          <TranslationText name="address" style={styles.address}>
            : {address}
          </TranslationText>
          <TranslationText name="phone" style={styles.address}>
            : {delivery_phone}
          </TranslationText>
        </Fragment>
      )}
      <TranslationText name="total" style={styles.total}>
        : {price}
      </TranslationText>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    marginTop: 10,
  },
  date: {
    fontSize: 17.5,
    fontWeight: '600',
  },
  meta: {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    color: EColors.BlueLight,
  },
  address: {
    fontWeight: '500',
    textAlign: 'right',
    color: EColors.GreyDark,
  },
  phone: {
    fontWeight: '500',
    textAlign: 'right',
    color: EColors.GreyDark,
  },
  list: {
    paddingTop: 15,
  },
  status: {
    fontWeight: '600',
    color: EColors.BlueLight,
  },
  status_approved: {
    color: EColors.Green,
  },
  status_pending: {
    color: EColors.BlueLight,
  },
  status_rejected: {
    color: EColors.Red,
  },
});

export default OrderGroup;
