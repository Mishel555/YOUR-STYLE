import { useContext } from 'react';
import { MenuContext } from '@contexts';

const useMenu = () => useContext(MenuContext);

export default useMenu;
