import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStatus as setStatusAction,
  setStatusMessage as setTheStatusMessage,
} from '../store/slices/statusSlice';
const useStatus = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.status.status);
  const setStatus = useCallback(
    status => {
      dispatch(setStatusAction(status));
    },
    [dispatch]
  );
  const setStatusMessage = useCallback(
    statusMessage => {
      dispatch(setTheStatusMessage(statusMessage));
    },
    [dispatch]
  );

  return {
    status,
    setStatus,
    setStatusMessage,
  };
};

export { useStatus };
