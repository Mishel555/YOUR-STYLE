import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const { Item } = SkeletonPlaceholder;

const Product = () => (
  <SkeletonPlaceholder borderRadius={4}>
    <Item flex={1}>
      <Item width="100%" height={100} borderRadius={5} />
      <Item marginTop={6} flexDirection="row" justifyContent="space-between">
        <Item paddingHorizontal={5}>
          <Item width={120} height={20} />
          <Item marginTop={6} width={80} height={20} />
        </Item>
        <Item width={20} height={20} borderRadius={10} />
      </Item>
    </Item>
  </SkeletonPlaceholder>
);

export default Product;
