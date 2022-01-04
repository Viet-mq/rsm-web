import {SkillListAction, getListSkillError, getListSkillSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListSkillAsync(action: SkillListAction) {
  try {
    const rs = yield apis.getListSkill(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách kỹ năng không thành công', "Lỗi: " + rs.message);

    }
    else {
      localStorage.setItem("list-skill", JSON.stringify(rs || {}));
      yield put(getListSkillSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListSkillError(new AppError(e.message)));
    NotificationError('Lấy danh sách kỹ năng không thành công', "Lỗi: " + e.message);
  }
}
