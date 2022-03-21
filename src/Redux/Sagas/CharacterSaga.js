// --------------- LIBRARIES ---------------
import { put, call, takeEvery, all } from 'redux-saga/effects';

// --------------- ASSETS ---------------
import { GetCharacters } from '../Types';
import { getCharacters } from '../Actions';
import API from '../Services';

const getEventSaga = function* getEventSaga({ params }) {
    try {
        const response = yield call(API.Characters.GetCharacters, params);
        if (!response?.entries) {
            throw new Error(response);
        }
        yield put(getCharacters.Success(response));
    } catch (error) {
        yield put(getCharacters.Failed(error));
    }
};

function* characterSaga() {
    yield all([
        takeEvery(GetCharacters.REQUEST, getEventSaga),
    ]);
}

export default characterSaga;