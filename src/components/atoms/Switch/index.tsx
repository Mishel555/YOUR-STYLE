import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import ToggleSwitch from 'toggle-switch-react-native';
import { EColors } from '@types';

interface IProps {
  name: string;
  label: string;
  defaultChecked?: boolean;
  onChange: (name: string, checked: boolean) => void;
}

const Switch = ({
  name,
  label,
  defaultChecked,
  onChange,
}: IProps) => {
  const { t } = useTranslation();

  const [isOn, setIsOn] = useState<boolean>(false);
  const toggle = (isOn: boolean) => {
    setIsOn(isOn);
    onChange(name, isOn);
  };

  useEffect(() => {
    setIsOn(!!defaultChecked);
  }, [defaultChecked]);

  return (
    <View style={styles.root}>
      <ToggleSwitch
        isOn={isOn}
        label={t(label, {
          ns: 'translations',
        }) as string}
        size="medium"
        labelStyle={styles.label}
        thumbOnStyle={[styles.thumb, styles.thumbOn]}
        thumbOffStyle={[styles.thumb, styles.thumbOff]}
        trackOnStyle={[styles.track, styles.trackOn]}
        trackOffStyle={[styles.track, styles.trackOff]}
        onToggle={toggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  thumb: {
    marginLeft: 10,
  },
  thumbOn: {},
  thumbOff: {},
  track: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: EColors.Black,
  },
  trackOn: {
    backgroundColor: EColors.BlueLight,
  },
  trackOff: {},
  label: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15,
    fontWeight: '600',
    color: EColors.GreyDark,
    fontFamily: 'Montserrat',
    textTransform: 'uppercase',
  },
});

export default Switch;
