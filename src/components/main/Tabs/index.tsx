import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { EColors } from '@types';
import { RootTabLinks } from '@constants/navigations';
import { InternalLink } from '@components/atoms';
import { IonicIcon } from '@components/icons';

const Tabs = () => {
  const { name } = useRoute();

  return (
    <View style={styles.root}>
      {RootTabLinks.map(({
        to,
        icon,
      }, index) => (
        <InternalLink key={index} to={to} style={[styles.item, to === name && styles.mark]}>
          <IonicIcon name={icon} size={30} color={EColors.Black} />
        </InternalLink>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,

    borderTopWidth: 1,
    borderColor: EColors.Grey,

    paddingVertical: 10,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: EColors.White,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: EColors.White,
  },
  mark: {
    borderBottomWidth: 2,
  },
});

export default memo(Tabs);
