import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TranslationText, Spacing } from '@components/atoms';

interface IProps {
  tabs: string[];
  activeTab: number;
  changeTab: (index: number) => void;
}

const Toolbar = ({
  tabs,
  activeTab,
  changeTab,
}: IProps) => (
  <View style={styles.root}>
    {tabs.map((tab, index) => (
      <Fragment key={tab}>
        <Button onPress={() => changeTab(index)} style={[styles.button, activeTab === index && styles.active]}>
          <TranslationText name={tab} style={styles.buttonText} />
        </Button>
        <Spacing size={20} />
      </Fragment>
    ))}
  </View>
);

const styles = StyleSheet.create({
  root: {
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  active: {
    borderBottomWidth: 2,
  },
});

export default Toolbar;
