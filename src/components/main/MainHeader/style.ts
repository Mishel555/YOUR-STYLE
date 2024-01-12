import { StyleSheet } from 'react-native';
import { EColors } from '@types';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 5,
    paddingBottom: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sign: {
    width: 90,
    height: 28,
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: EColors.Black,

    justifyContent: 'center',
  },
  signText: {
    fontSize: 10.5,
    fontWeight: '600',
    textAlign: 'center',
    color: EColors.White,

    textTransform: 'uppercase',
  },
  search: {
    flex: 1,
    height: 35,
    borderRadius: 30,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: EColors.Grey,
  },
});

export default styles;
