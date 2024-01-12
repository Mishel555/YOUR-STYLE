import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Control } from 'react-hook-form';
import { EColors, IAccountDetailsForm } from '@types';
import { useAuth } from '@hooks';
import { Button, TranslationText, Spacing, TextField, Paragraph } from '@components/atoms';

interface IProps {
  control: Control<IAccountDetailsForm>;
}

const PrivateForm = ({ control }: IProps) => {
  const {
    user,
    logout,
  } = useAuth();
  const { navigate } = useNavigation();

  const signOut = () => {
    logout();
    navigate('Auth' as never);
  };

  return (
    <View style={styles.root}>
      <View style={styles.wrapper}>
        <Paragraph style={styles.name}>{user?.firstName}</Paragraph>
        <Spacing size={10} />
        <Paragraph style={styles.name}>{user?.lastName}</Paragraph>
      </View>
      <Spacing direction="vertical" size={30} />
      <TextField name="phone_number" control={control} placeholder="+374 00 00 00" type="phone" />
      <Spacing direction="vertical" size={20} />
      <TextField name="address" control={control} placeholder="Armenia, Yerevan" type="text" />
      <Spacing direction="vertical" size={20} />
      <Button onPress={signOut} style={styles.signOut}>
        <TranslationText name="signOut" style={styles.signOutText} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  signOut: {
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,

    alignSelf: 'flex-end',
    backgroundColor: EColors.Black,
  },
  signOutText: {
    fontWeight: '600',
    color: EColors.White,
  },
});

export default PrivateForm;
