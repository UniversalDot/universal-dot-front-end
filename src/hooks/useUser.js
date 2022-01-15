import { useSelector } from 'react-redux';

const useUser = () => {
  const selectedAccountUsername = useSelector(
    state => state.account.selectedAccountUsername
  );
  const selectedAccountKey = useSelector(
    state => state.account.selectedAccountKey
  );
  const selectedAccountBalance = useSelector(
    state => state.account.selectedAccountBalance
  );

  return {
    selectedAccountUsername,
    selectedAccountKey,
    selectedAccountBalance,
  };
};

export { useUser };
