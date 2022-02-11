import {GetListCommentAction, getCommentError, getCommentSuccess} from "../../actions";
import * as apis from '../../services/apis'
import {NotificationError} from "../../../../../components/Notification/Notification";
import {put} from "redux-saga/effects";
import {AppError} from "../../../../../models/common";

export function* getListCommentAsync(action: GetListCommentAction) {
  try {
    const rs = yield apis.getListComment(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách ghi chú không thành công', "Lỗi: " + rs.message);
    }
    yield put(getCommentSuccess(rs))
  } catch (e) {
    yield put(getCommentError(new AppError(e.message)));
    NotificationError('Lấy danh sách ghi chú không thành công', "Lỗi: " + e.message);
  }
}
