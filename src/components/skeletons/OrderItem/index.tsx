import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { Item } = SkeletonPlaceholder;

const OrderItem = () => (
  <SkeletonPlaceholder borderRadius={4}>
    <Item marginTop={10}>
      <Item flexDirection="row" justifyContent="space-between">
        <Item width={100} height={20} />
        <Item width={20} height={20} borderRadius={10} />
      </Item>
      <Item marginTop={10} flexDirection="row" alignItems="center">
        <Item width={25} height={25} borderRadius={12.5} />
        <Item width={50} height={15} marginLeft={10} />
      </Item>
      <Item marginTop={20} flexDirection="row">
        <Item width={80} height={80} />
        <Item marginLeft={10}>
          <Item width={120} height={20} />
          <Item width={50} height={20} marginTop={6} />
        </Item>
      </Item>
      <Item marginTop={10} alignItems="flex-end">
        <Item width={50} height={20} />
        <Item width={70} height={20} marginTop={6} />
        <Item width={90} height={20} marginTop={6} />
      </Item>
    </Item>
  </SkeletonPlaceholder>
);

export default OrderItem;
