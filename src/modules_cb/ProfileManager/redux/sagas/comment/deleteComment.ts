import {DeleteCommentAction, deleteCommentError, deleteCommentSuccess, getListComment} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteCommentAsync(action: DeleteCommentAction) {
  try {
    const rs = yield apis.deleteComment(action.request);
    yield put(deleteCommentSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa ghi chú không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa ghi chú thành công");
      const params = yield select((state: RootState) => state.profileManager.getListComment.params);
      yield put(getListComment(params))
    }
  } catch (e) {
    yield put(deleteCommentError(new AppError(e.message)));
    NotificationError('Xóa ghi chú không thành công', "Lỗi: " + e.message);
  }
}
