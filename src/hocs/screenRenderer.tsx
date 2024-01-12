import { ComponentType } from 'react';
import { ETemplates, RootStackParamListType } from '@types';
import { HeaderTemplate, MainTemplate, TabTemplate } from '@components/Templates';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ArgsType<P> = [
  ComponentType<P>,
    ETemplates | undefined,
];

const screenRenderer = <P extends NativeStackScreenProps<RootStackParamListType, keyof RootStackParamListType>>(
  ...[Component, template]: ArgsType<P>
) => (props: P) => {
    switch (template) {
      case ETemplates.Main:
        return (
          <MainTemplate>
            <Component {...props} />
          </MainTemplate>
        );
      case ETemplates.Tab:
        return (
          <TabTemplate>
            <Component {...props} />
          </TabTemplate>
        );
      case ETemplates.Header:
        return (
          <HeaderTemplate>
            <Component {...props} />
          </HeaderTemplate>
        );
      default:
        return <Component {...props} />;
    }
  };

export default screenRenderer;
