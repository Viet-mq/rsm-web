import {DeleteCompanyAction, deleteCompanyError, deleteCompanySuccess, getListCompany} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteCompanyAsync(action: DeleteCompanyAction) {
  try {
    const rs = yield apis.deleteCompany(action.request);
    yield put(deleteCompanySuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa  Công ty không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa  Công ty thành công");

      const params = yield select((state: RootState) => state.viewRolesManager.list.params);
      yield put(getListCompany(params))
    }
  } catch (e) {
    yield put(deleteCompanyError(new AppError(e.message)));
    NotificationError('Xóa  Công ty không thành công', "Lỗi: " + e.message);
  }
}
