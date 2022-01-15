import take from 'redux-saga';
import { setAccountSelected, setBalance } from '../slices/accountSlice';

export default function* () {
  yield take(setAccountSelected.toString());
  yield take(setBalance.toString());
}
