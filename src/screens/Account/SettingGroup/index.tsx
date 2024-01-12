import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { TranslationText } from '@components/atoms';

interface IProps {
  label: string;
  children: ReactNode;
}

const SettingGroup = ({
  label,
  children,
}: IProps) => (
  <View style={styles.root}>
    <TranslationText name={label} size={2} style={styles.title} />
    <View style={styles.container}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    marginVertical: 20,
  },
  title: {
    fontWeight: '600',
  },
  container: {
    marginTop: 10,
  },
});

export default SettingGroup;
