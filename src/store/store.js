import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import accountReducer from './slices/accountSlice';
import profileReducer from './slices/profileSlice';
import statusReducer from './slices/statusSlice';
import rootSaga from './saga/index';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    account: accountReducer,
    profile: profileReducer,
    status: statusReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
