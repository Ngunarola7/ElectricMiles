import { all } from 'redux-saga/effects';

import AuthSaga from './AuthSaga';
import homeSaga from './HomeSaga';
import CharacterSaga from './CharacterSaga';

//Main Root Saga
const rootSaga = function* rootSaga() {
    yield all([AuthSaga(), homeSaga(), CharacterSaga()]);
};
export default rootSaga;
