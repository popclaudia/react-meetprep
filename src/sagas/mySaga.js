import { call, put, takeEvery, } from 'redux-saga/effects'
import { saveContacts, TYPES } from '../actions';
import { APIRequester2 } from '../service/apiRequester';

function* fetchContacts() {
    try {
        const { getContacts } = APIRequester2();
        const response = yield call(getContacts);
        yield put(saveContacts(response.data.items));
    } catch (e) {
        // yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

export default function* mySaga() {
    yield takeEvery(TYPES.GET_CONTACTS, fetchContacts);
}