import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { EColors, ILanguages } from '@types';
import { useFavorites, useLang } from '@hooks';
import { IonicIcon } from '@components/icons';
import { Button, Paragraph, TranslationText } from '@components/atoms';
import ColorList from '../ColorList';

interface IProps {
  id: number;
  price: number;
  title: string;
  colors?: string[];
  discount?: number;
  description?: ILanguages;
  brandDescription: ILanguages;
}

const DetailsSection = ({
  id,
  title,
  price,
  colors,
  discount,
  description,
  brandDescription,
}: IProps) => {
  const { lang } = useLang();
  const {
    toggle,
    isFavorite,
  } = useFavorites();
  const isLiked = isFavorite(id);

  // const share = async () => {
  //   const action = await Share.share({
  //     message: 'test share',
  //   });
  //   console.log(action);
  // };

  const like = () => {
    toggle(id);
  };

  return (
    <Fragment>
      <View style={styles.root}>
        <View style={styles.wrapper}>
          <TranslationText name={title} style={styles.title} />
          {discount !== price && (
            <Paragraph style={styles.price}>
              {Number(discount)} ֏
            </Paragraph>
          )}
          <Paragraph style={[styles.price, discount !== price && styles.oldPrice]}>
            {price} ֏
          </Paragraph>
        </View>
        <View style={styles.actions}>
          {/* <Button onPress={share}> */}
          {/*   <IonicIcon name="share-social" size={30} /> */}
          {/* </Button> */}
          <Button onPress={like} style={styles.likeBtn}>
            <IonicIcon name={isLiked ? 'heart' : 'heart-outline'} size={30} />
          </Button>
        </View>
      </View>
      {!!colors?.length && (
        <View>
          <TranslationText name="colors" style={styles.descTitle} />
          <ColorList colors={colors} />
        </View>
      )}
      <View>
        <TranslationText name="description" style={styles.descTitle} />
        {description && (
          <Paragraph style={styles.description}>{description[lang || 'en']}</Paragraph>
        )}
        <Paragraph style={styles.description}>{brandDescription[lang || 'en']}</Paragraph>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 8,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
  price: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '600',
  },
  oldPrice: {
    color: EColors.GreyDark,
    textDecorationLine: 'line-through',
  },
  wrapper: {
    flex: .7,
  },
  actions: {
    flex: .3,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  likeBtn: {
    marginLeft: 10,
  },
  descTitle: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  description: {},
});

export default DetailsSection;
