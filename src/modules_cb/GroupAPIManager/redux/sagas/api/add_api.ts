import * as apis from "../../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {AddAPIAction, addAPIError, addAPISuccess, getListGroupAPI, showAddAPIForm} from "../../actions";

export function* addAPIAsync(action: AddAPIAction) {
  try {
    const rs = yield apis.addAPI(action.request);
    yield put(addAPISuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Thêm api không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm api thành công");
      yield put(showAddAPIForm(false));
      const params = yield select((state: RootState) => state.groupAPIManager.list.params);
      yield put(getListGroupAPI(params));
    }
  } catch (e) {
    yield put(addAPIError(new AppError(e.message, -1)));
  }
}
