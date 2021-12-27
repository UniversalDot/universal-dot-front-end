import take from 'redux-saga';
import { changeUsername } from '../slices/userSlice';

export default function* () {
  yield take(changeUsername.toString());
  console.log('This is the root saga.');
}
