import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EColors } from '@types';
import { getRouteTitle } from '@utils';
import { Button, TranslationText } from '@components/atoms';
import { IonicIcon } from '@components/icons';

interface IProps {
  title?: string;
}

const ControlHeader = ({ title }: IProps) => {
  const { goBack } = useNavigation();
  const { name } = useRoute();

  const routeTitle = getRouteTitle(name);

  return (
    <View style={styles.root}>
      <Button onPress={goBack}>
        <IonicIcon name="arrow-back" size={32} />
      </Button>
      {!!routeTitle && (
        <TranslationText name={routeTitle} size={2} style={styles.text} />
      )}
      {!!title && (
        <TranslationText name={title} size={2} style={styles.text} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: .5,
    borderBottomColor: EColors.GreyLight,
  },
  text: {
    marginLeft: 15,
    paddingRight: 30,
    fontWeight: '600',
  },
});

export default memo(ControlHeader);
