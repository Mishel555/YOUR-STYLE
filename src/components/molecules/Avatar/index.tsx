import { StyleSheet, View } from 'react-native';
import { EColors } from '@types';
import { Paragraph } from '@components/atoms';

interface IProps {
  firstName: string;
  lastName: string;
}

const Avatar = ({
  lastName,
  firstName,
}: IProps) => (
  <View style={styles.root}>
    <Paragraph style={styles.text}>
      {firstName[0]}
      {lastName[0]}
    </Paragraph>
  </View>
);

const styles = StyleSheet.create({
  root: {
    width: 36,
    height: 36,
    borderRadius: 18,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: EColors.Black,
  },
  text: {
    fontWeight: '500',
    color: EColors.White,
  },
});

export default Avatar;
