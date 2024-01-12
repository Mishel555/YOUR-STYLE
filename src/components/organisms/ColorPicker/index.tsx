import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '@constants/colors';
import ColorItem from './ColorItem';
import { Button, TranslationText } from '@components/atoms';

interface IProps {
  name: string;
  defaultColors?: string[];
  onChange: (name: string, data: string[]) => void;
}

const ColorPicker = ({
  name,
  defaultColors,
  onChange,
}: IProps) => {
  const [selectedColors, setSelectedColors] = useState<string[]>(defaultColors || []);

  const onPick = (hex: string) => {
    let temp = [...selectedColors];

    if (temp.includes(hex)) {
      temp = temp.filter(color => color !== hex);
    } else {
      temp.push(hex);
    }

    onChange(name, temp);
    setSelectedColors(temp);
  };

  const reset = () => {
    onChange(name, []);
    setSelectedColors([]);
  };

  return (
    <View style={styles.root}>
      <View style={styles.wrapper}>
        {COLORS.map((hex, index) => (
          <ColorItem key={index} hex={hex} onPick={onPick} active={selectedColors.includes(hex)} />
        ))}
      </View>
      {!!selectedColors.length && (
        <Button onPress={reset} style={styles.reset}>
          <TranslationText name="reset" style={styles.resetText} />
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  reset: {
    alignSelf: 'flex-end',
  },
  resetText: {
    fontWeight: '600',
  },
});

export default ColorPicker;
