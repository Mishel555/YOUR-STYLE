import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcon } from '@components/icons';
import { EColors } from '@types';
import { Spacing, TranslationText } from '@components/atoms';

interface IProps {
  text?: string;
  style?: StyleProp<ViewStyle>;
}

const EmptyData = ({
  text = 'nothingToShow',
  style,
}: IProps) => (
  <View style={[styles.root, style]}>
    <MaterialCommunityIcon name="archive-cancel-outline" color={EColors.GreyDark} size={100} />
    <Spacing direction="vertical" size={30} />
    <TranslationText name={text} size={3} style={styles.text} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    color: EColors.GreyDark,
  },
});

export default EmptyData;
