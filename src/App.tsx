import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ToastProvider } from 'react-native-toast-notifications';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { combinedProviders } from '@providers';
import { RootNavigation } from '@components/main';
import { CustomToast } from '@components/atoms';

const MasterProvider = combinedProviders.master();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <MasterProvider>
      <ToastProvider
        placement="top"
        duration={5000}
        animationType="slide-in"
        animationDuration={250}
        renderType={{
          success: (toast) => <CustomToast type="success" message={toast.message as string} />,
          danger: (toast) => <CustomToast type="danger" message={toast.message as string} />,
          notification: (toast) => <CustomToast type="notification" message={toast.message as string} />,
        }}
      >
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <RootNavigation />
      </ToastProvider>
    </MasterProvider>
  );
};

export default gestureHandlerRootHOC(App);
