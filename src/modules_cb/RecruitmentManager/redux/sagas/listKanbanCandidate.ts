import * as apis from '../../../ProfileManager/redux/services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";
import {getListKanbanCandidateError, getListKanbanCandidateSuccess, ListKanbanCandidateAction} from "../actions";

export function* getListKanbanCandidateAsync(action: ListKanbanCandidateAction) {
  try {
    const rs = yield apis.getListProfile(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách ứng viên không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListKanbanCandidateSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListKanbanCandidateError(new AppError(e.message)));
    NotificationError('Lấy danh sách ứng viên không thành công', "Lỗi: " + e.message);
  }
}
