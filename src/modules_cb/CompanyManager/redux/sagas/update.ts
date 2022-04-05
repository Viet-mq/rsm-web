import {
  getListCompany,
  showFormUpdate,
  UpdateCompanyAction,
  updateCompanyError,
  updateCompanySuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateCompanyAsync(action: UpdateCompanyAction) {
  try {
    const rs = yield apis.updateCompany(action.request);
    yield put(updateCompanySuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật  Công ty không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật  Công ty thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.viewRolesManager.list.params);
      yield put(getListCompany(params))
    }
  } catch (e) {
    yield put(updateCompanyError(new AppError(e.message)));
    NotificationError('Cập nhật  Công ty không thành công', "Lỗi: " + e.message);
  }
}
