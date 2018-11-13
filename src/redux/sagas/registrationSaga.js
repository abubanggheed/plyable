import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });
    
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({type: 'SET_TO_LOGIN_MODE'});
  } catch (error) {
      console.log('Error with user registration:', error);
      yield put({type: 'REGISTRATION_FAILED'});
  }
}

function* registerInvited(action) {

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  try {
    yield axios.post('api/user/invite', action.payload, config);
    yield put({ type: 'REGISTRATION_ACTIVE' });
    //logs in the user and allow them to continue to set their
    //password as something of their own choosing by dispatching 'REGISTRATION_ACTIVE'
  } catch (error) {
    console.log(error);
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('FETCH_NEW_USER', registerInvited);
}

export default registrationSaga;
