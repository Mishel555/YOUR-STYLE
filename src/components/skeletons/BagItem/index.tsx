import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { Item } = SkeletonPlaceholder;

const BagItem = () => (
  <SkeletonPlaceholder borderRadius={4}>
    <Item marginTop={10}>
      <Item flexDirection="row" justifyContent="space-between">
        <Item width={100} height={20} />
        <Item width={20} height={20} borderRadius={10} />
      </Item>
      <Item marginTop={30}>
        <Item flexDirection="row" justifyContent="space-between">
          <Item flexDirection="row">
            <Item width={80} height={80} />
            <Item marginLeft={10}>
              <Item width={120} height={20} />
              <Item width={50} height={20} marginTop={6} />
            </Item>
          </Item>
          <Item flexDirection="column" justifyContent="space-between" alignItems="flex-end">
            <Item width={20} height={20} borderRadius={10} />
            <Item width={80} height={30} marginTop={12} />
          </Item>
        </Item>
      </Item>
      <Item marginTop={10}>
        <Item width={50} height={20} />
        <Item width={70} height={20} marginTop={6} />
        <Item width={90} height={20} marginTop={6} />
        <Item width={80} height={30} marginTop={15} />
      </Item>
    </Item>
  </SkeletonPlaceholder>
);

export default BagItem;
