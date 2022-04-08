import {SearchSkillAction, searchListSkillError, searchListSkillSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* searchListSkillAsync(action: SearchSkillAction) {
  try {
    const rs = yield apis.getListSkill(action.params);
    if (rs.code !== 0) {
      yield put(searchListSkillError(new AppError(rs.message)));
      NotificationError('Lấy danh sách kỹ năng không thành công', "Lỗi: " + rs.message);

    }
    else {
      yield put(searchListSkillSuccess(rs.total, rs.rows))

    }
  } catch (e) {
    yield put(searchListSkillError(new AppError(e.message)));
    NotificationError('Lấy danh sách kỹ năng không thành công', "Lỗi: " + e.message);
  }
}
