import { useContext } from 'react';
import { FiltersContext } from '@contexts';

const useFilters = () => useContext(FiltersContext);

export default useFilters;
