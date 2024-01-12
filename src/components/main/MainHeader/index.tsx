import { memo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth, useFilters, useMenu } from '@hooks';
import { Avatar } from '@components/molecules';
import { IonicIcon } from '@components/icons';
import { Button, Spacing, TranslationText } from '@components/atoms';
import styles from './style';

const MainHeader = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const { open: openMenu } = useMenu();
  const { open: openFilters } = useFilters();

  const redirectSignIn = () => navigate('Auth' as never);
  const redirectToAccount = () => navigate('Account' as never);

  return (
    <View style={styles.root}>
      <Button onPress={openMenu}>
        <IonicIcon name="md-menu-outline" size={30} />
      </Button>
      <Spacing />
      <Button onPress={openFilters} style={styles.search}>
        <IonicIcon name="search" />
        <TranslationText name="search" />
      </Button>
      <Spacing />
      {user ? (
        <Button onPress={redirectToAccount}>
          <Avatar firstName={user.firstName} lastName={user.lastName} />
        </Button>
      ) : (
        <Button onPress={redirectSignIn} style={styles.sign}>
          <TranslationText name="signIn" style={styles.signText} />
        </Button>
      )}
    </View>
  );
};

export default memo(MainHeader);
