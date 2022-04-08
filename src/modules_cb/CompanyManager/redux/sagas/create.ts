import {
  CreateCompanyAction,
  createCompanyError,
  createCompanySuccess,
  getListCompany,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createCompanyAsync(action: CreateCompanyAction) {
  try {
    const rs = yield apis.createCompany(action.request);
    yield put(createCompanySuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo Công ty không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo  Công ty thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.viewRolesManager.list.params);
      yield put(getListCompany(params))
    }
  } catch (e) {
    yield put(createCompanyError(new AppError(e.message)));
    NotificationError('Tạo Công ty không thành công', "Lỗi: " + e.message);
  }
}
