import {
  getListSkill,
  showFormUpdate,
  UpdateSkillAction,
  updateSkillError,
  updateSkillSuccess
} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateSkillAsync(action: UpdateSkillAction) {
  try {
    const rs = yield apis.updateSkill(action.request);
    yield put(updateSkillSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateSkillError(new AppError(rs.message)));
      NotificationError('Cập nhật kỹ năng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật kỹ năng thành công");
      yield put(showFormUpdate(false));
      const params = yield select((state: RootState) => state.skillManager.list.params);
      yield put(getListSkill(params))
    }
  } catch (e) {
    yield put(updateSkillError(new AppError(e.message)));
    NotificationError('Cập nhật kỹ năng không thành công', "Lỗi: " + e.message);
  }
}
