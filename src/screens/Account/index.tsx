import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from 'react-native-toast-notifications';
import ToggleSwitch from 'toggle-switch-react-native';
import { EColors, IAccountDetailsForm, IClientError, RootStackParamListType } from '@types';
import api from '@services/api';
import { useAuth } from '@hooks';
import { getFCMToken } from '@utils';

import { Button, TranslationText } from '@components/atoms';

import GuestForm from './GuestForm';
import PrivateForm from './PrivateForm';
import SettingGroup from './SettingGroup';
import validationSchema from './validation';

const Account = ({}: NativeStackScreenProps<RootStackParamListType, 'Account'>) => {
  const toast = useToast();
  const {
    user,
    subscribedToPush,
    login,
    subscribePush,
    unSubscribePush,
  } = useAuth();

  const {
    control,
    handleSubmit,
  } = useForm<IAccountDetailsForm>({
    defaultValues: {
      address: user?.address,
      phone_number: user?.phone_number,
    },
    resolver: yupResolver(validationSchema),
  });

  const [subscribed, setSubscribed] = useState<boolean>(subscribedToPush);

  const toggleNotification = () => {
    setSubscribed(prevState => !prevState);
  };

  const onFormSuccess = async (values: IAccountDetailsForm) => {
    if (!user) return;

    const { data } = await api.auth.updateMe(values);
    await login({
      ...data,
      accessToken: user.accessToken,
    });
  };

  const save = async () => {
    try {
      if (user) {
        await handleSubmit(onFormSuccess)();
      }

      // if (subscribed === subscribedToPush) return;

      if (subscribed) {
        const FCMToken = await getFCMToken();

        if (FCMToken) {
          await subscribePush(FCMToken);
        }

        return toast.show('success', {
          type: 'success',
        });
      }

      await unSubscribePush();

      toast.show('success', {
        type: 'success',
      });
    } catch (e) {
      const error = e as IClientError;

      toast.show(error.response?.data.message || error.message, {
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.container}>
        <SettingGroup label="accountDetails">
          {user && (
            <PrivateForm control={control} />
          )}

          {!user && (
            <GuestForm />
          )}
        </SettingGroup>
        <SettingGroup label="notifications">
          <ToggleSwitch isOn={subscribed} onToggle={toggleNotification} />
        </SettingGroup>
      </ScrollView>
      <Button onPress={save} style={styles.save}>
        <TranslationText name="saveSettings" style={styles.saveText} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: EColors.White,
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  save: {
    marginVertical: 15,
    marginHorizontal: 20,
    borderRadius: 3,
    paddingVertical: 10,
    backgroundColor: EColors.Black,
  },
  saveText: {
    fontWeight: '600',
    textAlign: 'center',
    color: EColors.White,
  },
});

export default Account;
