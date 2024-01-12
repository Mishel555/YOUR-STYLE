import { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { EColors } from '@types';

import { Button, TranslationText } from '@components/atoms';

interface IProps {
  style?: StyleProp<ViewStyle>;
  onSearch: (value: string) => void;
}

const Searchbar = ({
  style,
  onSearch,
}: IProps) => {
  const [value, setValue] = useState<string>('');

  const onChange = (value: string) => setValue(value);

  const search = () => {
    onSearch(value);
  };

  return (
    <View style={[styles.root, style]}>
      <TextInput value={value} onChangeText={onChange} style={styles.input} />
      <Button onPress={search} style={styles.btn}>
        <TranslationText name="search" style={styles.btnText} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  input: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 0,
    paddingHorizontal: 5,
    color: EColors.Black,
  },
  btn: {
    marginLeft: 10,
    borderRadius: 3,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: EColors.Black,
  },
  btnText: {
    color: EColors.White,
  },
});

export default Searchbar;
