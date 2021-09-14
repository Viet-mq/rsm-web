import {put} from 'redux-saga/effects';
import * as apis from './../../services/apis';
import {ChangePasswordAction, changePasswordError, changePasswordSuccess, hideChangePasswordForm} from '../actions';
import {AppError} from 'src/models/common';
import {NotificationError, NotificationSuccess} from 'src/components/Notification/Notification';

export function* changePasswordAsync(action: ChangePasswordAction) {
  try {
    const rs = yield apis.changePassword(action.payload);
    yield put(changePasswordSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Đổi mật khẩu không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Đổi mật khẩu thành công");
      yield put(hideChangePasswordForm());
    }
  } catch (error) {
    yield put(changePasswordError(new AppError(error.message)));
  }
}
