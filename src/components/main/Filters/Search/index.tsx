import { useNavigation } from '@react-navigation/native';
import { useFilters } from '@hooks';
import { Searchbar } from '@components/molecules';

const Search = () => {
  const { navigate } = useNavigation();
  const { changeFilters, close } = useFilters();

  const onSearch = (value: string) => {
    changeFilters({ search: value });
    close();
    navigate('Search' as never);
  };

  return (
    <Searchbar onSearch={onSearch} />
  );
};

export default Search;
