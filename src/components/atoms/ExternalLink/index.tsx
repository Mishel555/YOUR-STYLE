import { ReactNode } from 'react';
import { Linking, StyleProp, ViewStyle } from 'react-native';
import { useMenu } from '@hooks';
import { Button } from '@components/atoms';

interface IProps {
  url: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ExternalLink = ({
  url,
  children,
  style,
}: IProps) => {
  const {
    isOpen,
    close,
  } = useMenu();

  const redirect = async () => {
    try {
      if (isOpen) {
        close();
      }

      await Linking.openURL(url);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  return (
    <Button onPress={redirect} style={style}>
      {children}
    </Button>
  );
};

export default ExternalLink;
