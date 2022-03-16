import { useSelector } from 'react-redux';

const useGeneral = () => {
  const sidebarWidth = useSelector(state => state.general.sidebarWidth);

  return {
    sidebarWidth,
  };
};

export { useGeneral };
