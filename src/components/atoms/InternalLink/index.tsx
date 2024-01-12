import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamListType } from '@types';
import { useMenu } from '@hooks';
import { Button } from '@components/atoms';

interface IProps {
  to: keyof RootStackParamListType;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  params?: unknown;
}

const InternalLink = ({
  to,
  params,
  children,
  style,
}: IProps) => {
  const { isOpen, close } = useMenu();
  const { navigate } = useNavigation();

  const redirect = () => {
    if (isOpen) {
      close();
    }

    navigate(to as never, (params ? params : {}) as never);
  };

  return (
    <Button onPress={redirect} style={style}>
      {children}
    </Button>
  );
};

export default InternalLink;
