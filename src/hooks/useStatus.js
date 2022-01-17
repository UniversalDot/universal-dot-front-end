import { useSelector } from 'react-redux';

const useStatus = () => {
  const status = useSelector(state => state.status.status);

  return {
    status,
  };
};

export { useStatus };
