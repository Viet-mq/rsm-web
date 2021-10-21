import {
  getListTalentPool,
  showFormUpdate,
  UpdateTalentPoolAction,
  updateTalentPoolError,
  updateTalentPoolSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateTalentPoolAsync(action: UpdateTalentPoolAction) {
  try {
    const rs = yield apis.updateTalentPool(action.request);
    yield put(updateTalentPoolSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật Talent Pool không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật Talent Pool thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.talentPoolManager.list.params);
      yield put(getListTalentPool(params))
    }
  } catch (e) {
    yield put(updateTalentPoolError(new AppError(e.message)));
    NotificationError('Cập nhật Talent Pool không thành công', "Lỗi: " + e.message);
  }
}
