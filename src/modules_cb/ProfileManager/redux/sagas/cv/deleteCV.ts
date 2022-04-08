import {DeleteCVAction, deleteCVError, deleteCVSuccess, getDetailProfile, getListProfile} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteCVAsync(action: DeleteCVAction) {
  try {
    const rs = yield apis.deleteCV(action.request);
    yield put(deleteCVSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteCVError(new AppError(rs.message)));
      NotificationError('Xóa CV không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa CV thành công");
      const params = yield select((state: RootState) => state.profileManager.list.params);
      yield put(getListProfile(params))
      const paramsDetail = yield select((state: RootState) => state.profileManager.detail.params)
      if (paramsDetail?.idProfile) {
        yield put(getDetailProfile(paramsDetail))
      }
    }
  } catch (e) {
    yield put(deleteCVError(new AppError(e.message)));
    NotificationError('Xóa CV không thành công', "Lỗi: " + e.message);
  }
}
