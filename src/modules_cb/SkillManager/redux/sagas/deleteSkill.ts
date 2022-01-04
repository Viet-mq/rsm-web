import {DeleteSkillAction, deleteSkillError, deleteSkillSuccess, getListSkill} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteSkillAsync(action: DeleteSkillAction) {
  try {
    const rs = yield apis.deleteSkill(action.request);
    yield put(deleteSkillSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa kỹ năng công việc không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa kỹ năng công việc thành công");
      const params = yield select((state: RootState) => state.skillManager.list.params);
      yield put(getListSkill(params))
    }
  } catch (e) {
    yield put(deleteSkillError(new AppError(e.message)));
    NotificationError('Xóa kỹ năng công việc không thành công', "Lỗi: " + e.message);
  }
}
