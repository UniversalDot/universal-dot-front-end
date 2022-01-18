import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatus as setStatusAction } from '../store/slices/statusSlice';
const useStatus = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.status.status);
  const setStatus = useCallback(
    status => {
      dispatch(setStatusAction(status));
    },
    [dispatch]
  );

  return {
    status,
    setStatus,
  };
};

export { useStatus };
