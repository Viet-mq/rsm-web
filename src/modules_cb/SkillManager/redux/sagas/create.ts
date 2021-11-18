import {
  CreateSkillAction,
  createSkillError,
  createSkillSuccess,
  getListSkill,
  showFormCreate
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createSkillAsync(action: CreateSkillAction) {
  try {
    const rs = yield apis.createSkill(action.request);
    yield put(createSkillSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo kỹ năng công việc không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo kỹ năng công việc thành công");
      yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.skillManager.list.params);
      yield put(getListSkill(params))
    }
  } catch (e) {
    yield put(createSkillError(new AppError(e.message)));
    NotificationError('Tạo kỹ năng công việc không thành công', "Lỗi: " + e.message);
  }
}
