import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { EColors, ICascade } from '@types';
import { Button, Spacing, TranslationText } from '@components/atoms';
import { IonicIcon } from '@components/icons';

interface IProps {
  name: string;
  data: ICascade[];
  defaultGroup?: number;
  defaultItem?: number;
  onChange: (name: string, value: number[]) => void;
}

const Cascader = ({
  name,
  data,
  defaultGroup,
  defaultItem,
  onChange,
}: IProps) => {
  const [group, setGroup] = useState<number | null>(defaultGroup || null);
  const [item, setItem] = useState<number | null>(defaultItem || null);
  const childs = data.find(({ id }) => id === group || 0)?.items || [];

  const reset = () => {
    setGroup(null);
    setItem(null);
    onChange(name, []);
  };

  const onGroupSelect = (id: number) => {
    setGroup(id);
    onChange(name, [id]);
  };

  const onItemSelect = (id: number) => {
    setItem(id);

    onChange(name, [group || 0, id]);
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {data.map(({
          id,
          label,
        }) => (
          <Button
            key={id}
            onPress={() => onGroupSelect(id)}
            style={[styles.groupButton, group !== null && group === id && styles.active]}
          >
            <TranslationText name={label} style={styles.label} />
            <Spacing size={10} />
            <IonicIcon name={group !== null && group === id ? 'caret-forward-sharp' : 'caret-down-sharp'} size={15} />
          </Button>
        ))}
      </View>
      <Spacing size={10} />
      {group !== null && (
        <View style={styles.container}>
          {childs.map(({
            id,
            label,
          }) => (
            <Button
              key={id}
              onPress={() => onItemSelect(id)}
              style={[styles.itemButton, item !== null && item === id && styles.active]}
            >
              <TranslationText name={label} style={styles.label} />
            </Button>
          ))}
          {!!group && (
            <Button onPress={reset} style={styles.reset}>
              <TranslationText name="reset" style={styles.resetText} />
            </Button>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  groupButton: {
    padding: 5,
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  itemButton: {
    padding: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  active: {
    backgroundColor: EColors.Grey,
  },
  label: {
    fontWeight: '500',
  },
  reset: {
    alignSelf: 'flex-end',
  },
  resetText: {
    fontWeight: '600',
  },
});

export default Cascader;
