import {
  DeleteTalentPoolAction,
  deleteTalentPoolError,
  deleteTalentPoolSuccess,
  getListTalentPool,
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteTalentPoolAsync(action: DeleteTalentPoolAction) {
  try {
    const rs = yield apis.deleteTalentPool(action.request);
    yield put(deleteTalentPoolSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteTalentPoolError(new AppError(rs.message)));
      NotificationError('Xóa Talent Pool không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa Talent Pool thành công");
      const params = yield select((state: RootState) => state.talentPoolManager.list.params);
      yield put(getListTalentPool(params))
    }
  } catch (e) {
    yield put(deleteTalentPoolError(new AppError(e.message)));
    NotificationError('Xóa Talent Pool không thành công', "Lỗi: " + e.message);
  }
}
