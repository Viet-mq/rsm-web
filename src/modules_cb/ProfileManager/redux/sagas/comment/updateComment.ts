import {getListComment, showFormUpdateComment, UpdateCommentAction, updateCommentError, updateCommentSuccess} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateCommentAsync(action: UpdateCommentAction) {
  try {
    const rs = yield apis.updateComment(action.request);
    yield put(updateCommentSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật ghi chú không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật ghi chú thành công");
      yield put(showFormUpdateComment(false));
      const params = yield select((state: RootState) => state.profileManager.getListComment.params);
      yield put(getListComment(params))
    }
  } catch (e) {
    yield put(updateCommentError(new AppError(e.message)));
    NotificationError('Cập nhật ghi chú không thành công', "Lỗi: " + e.message);
  }
}
