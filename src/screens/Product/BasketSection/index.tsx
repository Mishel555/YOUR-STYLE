import { StyleSheet, View } from 'react-native';
import { EColors } from '@types';
import { Button, TranslationText } from '@components/atoms';

interface IProps {
  disabled: boolean;
  delivery: boolean;
  deliveryPrice?: number;
  toBasket: () => void;
}

const BasketSection = ({
  disabled,
  delivery,
  deliveryPrice,
  toBasket,
}: IProps) => (
  <View style={styles.root}>
    <Button onPress={toBasket} disabled={disabled} style={styles.button}>
      <TranslationText name="addToBag" style={styles.text} />
    </Button>
    {delivery && (
      <TranslationText name="deliveryPrice" style={styles.delivery}>
        {deliveryPrice ? `: ${deliveryPrice}` : <TranslationText name="freeShipping" style={styles.delivery} />}
      </TranslationText>
    )}

    {!delivery && (
      <TranslationText name="noDelivery" style={styles.delivery} />
    )}
  </View>
);

const styles = StyleSheet.create({
  root: {},
  button: {
    height: 42,
    marginTop: 25,
    borderRadius: 2,
    justifyContent: 'center',
    backgroundColor: EColors.Black,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: EColors.White,
  },
  delivery: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default BasketSection;
