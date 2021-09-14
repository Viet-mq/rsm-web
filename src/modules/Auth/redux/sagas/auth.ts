import {put, take} from 'redux-saga/effects';
import * as apis from './../../services/apis';
import {LoginAction, loginError, loginSuccess, LoginSuccessAction, LOGOUT} from '../actions';
import {AppError} from '../../../../models/common';
import {setToken} from '../../../../helpers/token';
import {LoginResponse2} from '../../types';
import history from 'src/history';
import {NotificationError, NotificationSuccess} from 'src/components/Notification/Notification';

const TOKEN_KEY = 'auth-n-token';

export function* loginAsync(action: LoginAction) {
  try {
    const loginPayload = yield apis.login(action.payload);
    if (loginPayload.code === 0) {
      NotificationSuccess("Thành công", "Đăng nhập thành công");
      localStorage.setItem(TOKEN_KEY, JSON.stringify(loginPayload || {}));
      yield put(loginSuccess(loginPayload));
    } else {
      NotificationError("Đăng nhập không thành công", loginPayload.message);
      yield put(loginError(new AppError(loginPayload.message)));
    }
  } catch (error) {
    yield put(loginError(new AppError(error.message)));
  }
}

export function loginSuccessAsync(action: LoginSuccessAction) {
  console.log("in saga: " + JSON.stringify(action));
  setToken(action.payload?.access_token);
  if (window.location.pathname === '/') {
    history.push('/home/');
  }
}

export function* loginCheckerAsync() {
  while (1) {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken && savedToken !== '{}') {
      const loginResponse: LoginResponse2 = JSON.parse(savedToken);
      yield put(loginSuccess(loginResponse));
    }
    yield take(LOGOUT);
    localStorage.removeItem(TOKEN_KEY);
  }
}
