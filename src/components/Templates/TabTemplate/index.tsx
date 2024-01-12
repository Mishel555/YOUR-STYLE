import { memo, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { ControlHeader, Tabs } from '@components/main';
import { EColors } from '@types';

interface IProps {
  children: ReactNode;
}

const TabTemplate = ({ children }: IProps) => (
  <View style={styles.root}>
    <ControlHeader />
    <View style={styles.content}>
      {children}
    </View>
    <Tabs />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EColors.White,
  },
  content: {
    flex: 1,
    marginBottom: 50,
  },
});

export default memo(TabTemplate);
