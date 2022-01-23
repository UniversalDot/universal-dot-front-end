import take from 'redux-saga';
import { setAccountSelected, setBalance } from '../slices/accountSlice';
import { setProfile } from '../slices/profileSlice';
import { setStatus } from '../slices/statusSlice';
import { setTasks } from '../slices/tasksSlice';

export default function* () {
  yield take(setAccountSelected.toString());
  yield take(setBalance.toString());
  yield take(setProfile.toString());
  yield take(setStatus.toString());
  yield take(setTasks.toString());
}
