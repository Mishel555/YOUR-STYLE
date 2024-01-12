import { Fragment, memo, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { EColors } from '@types';
import { Tabs, MainHeader, Menu, Filters } from '@components/main';

interface IProps {
  children: ReactNode;
}

const MainTemplate = ({ children }: IProps) => (
  <Fragment>
    <Menu />
    <View style={styles.root} onPointerDown={() => console.log('scroll down')}>
      <MainHeader />
      <View style={styles.content}>
        {children}
      </View>
      <Tabs />
    </View>
    <Filters />
  </Fragment>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 5,
    backgroundColor: EColors.White,
  },
  content: {
    flex: 1,
    marginBottom: 36,
  },
});

export default memo(MainTemplate);
