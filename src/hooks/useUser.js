import { useSelector } from 'react-redux';

const useUser = () => {
  const username = useSelector(state => state.user.username);

  return {
    username,
  };
};

export { useUser };
