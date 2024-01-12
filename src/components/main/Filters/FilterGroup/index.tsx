import { ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TranslationText } from '@components/atoms';
import { IonicIcon } from '@components/icons';
import { EColors } from '@types';

interface IProps {
  label: string;
  children: ReactNode;
}

const FilterGroup = ({
  label,
  children,
}: IProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const toggle = () => setIsOpened(prevState => !prevState);

  return (
    <View style={styles.root}>
      <Button onPress={toggle} style={styles.toolbar}>
        <TranslationText name={label} size={2} style={styles.label} />
        <IonicIcon name={isOpened ? 'caret-down-sharp' : 'caret-forward-sharp'} />
      </Button>
      {isOpened && (
        <View style={styles.container}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: EColors.Grey,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    marginTop: 20,
  },
});

export default FilterGroup;
