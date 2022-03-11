import { useSelector, useDispatch } from 'react-redux';
import {
  setKeyringOptionsAction,
  setSelectedKeyringAction,
} from '../store/slices/accountSlice';

const useUser = () => {
  const dispatch = useDispatch();

  const selectedKeyring = useSelector(state => state.account.selectedKeyring);
  const selectedAccountBalance = useSelector(
    state => state.account.selectedAccountBalance
  );
  const keyringOptions = useSelector(state => state.account.keyringOptions);

  const setKeyringOptions = keyringOptionsArray => {
    dispatch(setKeyringOptionsAction(keyringOptionsArray));
    dispatch(
      setSelectedKeyringAction({
        key: keyringOptionsArray[0].text,
        value: keyringOptionsArray[0].value,
        text: keyringOptionsArray[0].text,
      })
    );
  };

  const setSelectedKeyring = keyring => {
    dispatch(setSelectedKeyringAction(keyring));
  };

  return {
    selectedKeyring,
    selectedAccountBalance,
    setKeyringOptions,
    keyringOptions,
    setSelectedKeyring,
  };
};

export { useUser };
