import {GetListNoteAction, getNoteError, getNoteSuccess} from "../../actions";
import * as apis from '../../services/apis'
import {NotificationError} from "../../../../../components/Notification/Notification";
import {put} from "redux-saga/effects";
import {AppError} from "../../../../../models/common";

export function* getListNoteAsync(action: GetListNoteAction) {
  try {
    const rs = yield apis.getListNote(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách đánh giá không thành công', "Lỗi: " + rs.message);
    }
    yield put(getNoteSuccess(rs))
  } catch (e) {
    yield put(getNoteError(new AppError(e.message)));
    NotificationError('Lấy danh sách đánh giá không thành công', "Lỗi: " + e.message);
  }
}
