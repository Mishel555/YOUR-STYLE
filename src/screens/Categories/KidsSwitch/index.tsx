import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import ToggleSwitch from 'toggle-switch-react-native';
import { GenderType, EColors } from '@types';
import { IonicIcon } from '@components/icons';

interface IProps {
  onChange: (gender: GenderType) => void;
}

const KidsSwitch = ({ onChange }: IProps) => {
  const { t } = useTranslation();

  const [isOn, setIsOn] = useState<boolean>(false);

  const toggle = (isOn: boolean) => {
    if (isOn) {
      onChange('girl');
    } else {
      onChange('boy');
    }

    setIsOn(isOn);
  };

  return (
    <View style={styles.root}>
      <ToggleSwitch
        isOn={isOn}
        label={t(isOn ? 'girl' : 'boy', {
          ns: 'translations',
        }) as string}
        size="medium"
        labelStyle={styles.label}
        thumbOnStyle={[styles.thumb, styles.thumbOn]}
        thumbOffStyle={[styles.thumb, styles.thumbOff]}
        trackOnStyle={[styles.track, styles.trackOn]}
        trackOffStyle={[styles.track, styles.trackOff]}
        icon={<IonicIcon name={isOn ? 'ios-woman-outline' : 'ios-man-outline'} size={15} />}
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
  trackOn: {},
  trackOff: {},
  label: {
    // width: 50,
    fontSize: 15,
    fontWeight: '600',
    color: EColors.GreyDark,
    fontFamily: 'Montserrat',
    textTransform: 'uppercase',
  },
});

export default KidsSwitch;
