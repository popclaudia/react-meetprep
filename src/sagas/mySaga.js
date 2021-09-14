import { call, put, takeEvery, } from 'redux-saga/effects'
import { saveContacts, TYPES } from '../actions';
import { APIRequester2 } from '../service/apiRequester';


// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchContacts(action) {
    console.log('gbyvjgh')
    const { getContacts } = APIRequester2();
    try {
        const response = yield call(getContacts);
        console.log(response)
        yield put(saveContacts(response.data.items));
    } catch (e) {
        // yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export default function* mySaga() {
    yield takeEvery(TYPES.GET_CONTACTS, fetchContacts);
}