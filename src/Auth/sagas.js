import { call, put, takeLatest } from 'redux-saga/effects'

import { Types } from './Actions';
import CognitoService from './CognitoService';


function* register(action) {
  try {
    const result = yield call(CognitoService.register, action);
    yield put({ type: Types.registrationSuccess, user: result.user });
  } catch(error) {
    yield put({ type: Types.registrationFail, error: error.message });
  }
}

function* confirm(action) {
  try {
    yield call(CognitoService.confirm, action);
    yield put({ type: Types.confirmationSuccess });
  } catch (error) {
    yield put({ type: Types.confirmationFail, error: error.message });
  }
}

function* login(action) {
  try {
    const result = yield call(CognitoService.login, action);
    yield put({ type: Types.loginSuccess, user: result });
  } catch (error) {
    yield put({ type: Types.loginFail, error: error.message });
  }
}

function* logout() {
  yield call(CognitoService.logout);
}

function* ensureLoggedIn() {
  try {
    yield put({ type: Types.ensuringLoggedInStatus });
    yield call(CognitoService.isAuthenticated);
    console.log('Logged in status OK');
    yield put({ type: Types.ensureLoggedInSuccess });
  } catch (error) {
    console.log('User not logged in: ' + error);
    yield put({ type: Types.ensureLoggedInFail, error: error });
  }
}

function* authSaga() {
  yield takeLatest(Types.register, register);
  yield takeLatest(Types.confirm, confirm);
  yield takeLatest(Types.login, login);
  yield takeLatest(Types.logout, logout);
  yield takeLatest(Types.ensureLoggedIn, ensureLoggedIn);
}

export default authSaga;
