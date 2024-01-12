import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IBrand, RootStackParamListType } from '@types';
import api from '@services/api';
import ImageContainer from './ImageContainer';
import Info from './Info';
import AddressList from './AddressList';

const Brand = ({ route }: NativeStackScreenProps<RootStackParamListType, 'Brand'>) => {
  const { params } = route;

  const [brand, setBrand] = useState<IBrand | null>(null);

  useEffect(() => {
    let mounted = true;

    api.brands.getSingle(params.id).then(({ data }) => {
      if (mounted) {
        setBrand(data);
      }
    }).catch(e => console.log(JSON.stringify(e)));

    return () => {
      mounted = false;
    };
  }, [params]);

  return (
    <View style={styles.root}>
      {brand && (
        <ScrollView style={styles.container}>
          <ImageContainer src={brand.logo} />
          <Info name={brand.name} phone={brand.phone} />
          <AddressList addresses={brand.address} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
  },
});

export default Brand;
