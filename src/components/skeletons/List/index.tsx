import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { Item } = SkeletonPlaceholder;

interface IProps {
  count?: number;
}

const List = ({
  count = 10,
}: IProps) => (
  <SkeletonPlaceholder borderRadius={4}>
    <Item>
      {new Array(count).fill(0).map((_, index) => (
        <Item key={index} flexDirection="row" alignItems="center" marginBottom={20}>
          <Item width={40} height={40} borderRadius={20} />
          <Item width="100%" height={30} marginLeft={20} />
        </Item>
      ))}
    </Item>
  </SkeletonPlaceholder>
);

export default List;
