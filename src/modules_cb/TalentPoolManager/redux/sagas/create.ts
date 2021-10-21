import {
  CreateTalentPoolAction,
  createTalentPoolError,
  createTalentPoolSuccess,
  getListTalentPool,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createTalentPoolAsync(action: CreateTalentPoolAction) {
  try {
    const rs = yield apis.createTalentPool(action.request);
    yield put(createTalentPoolSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo Talent Pool không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo Talent Pool thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.talentPoolManager.list.params);
      yield put(getListTalentPool(params))
    }
  } catch (e) {
    yield put(createTalentPoolError(new AppError(e.message)));
    NotificationError('Tạo Talent Pool không thành công', "Lỗi: " + e.message);
  }
}
