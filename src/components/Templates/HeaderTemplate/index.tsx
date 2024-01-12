import { memo, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { ControlHeader } from '@components/main';
import { EColors } from '@types';

interface IProps {
  children: ReactNode;
}

const HeaderTemplate = ({ children }: IProps) => (
  <View style={styles.root}>
    <ControlHeader />
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EColors.White,
  },
  content: {
    flex: 1,
  },
});

export default memo(HeaderTemplate);
