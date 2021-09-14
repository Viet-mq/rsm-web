import {all, fork, takeLatest} from 'redux-saga/effects';
import {loginAsync, loginCheckerAsync, loginSuccessAsync} from './auth';
import {changePasswordAsync} from './changePassword';
import {CHANGE_PASSWORD_ACTION, LOGIN, LOGIN_SUCCESS} from '../actions';

export default function* root() {
  return all([
    yield takeLatest(LOGIN, loginAsync),
    yield takeLatest(LOGIN_SUCCESS, loginSuccessAsync),
    yield fork(loginCheckerAsync),
    yield takeLatest(CHANGE_PASSWORD_ACTION, changePasswordAsync),
  ]);
}
