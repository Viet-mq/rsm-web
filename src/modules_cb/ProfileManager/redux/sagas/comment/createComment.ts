import {CreateCommentAction, createCommentError, createCommentSuccess, getListComment, showFormCreateComment,} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createCommentAsync(action: CreateCommentAction) {
  try {
    const rs = yield apis.createComment(action.request);
    yield put(createCommentSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo ghi chú không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo ghi chú thành công");
      yield put(showFormCreateComment(false));
      const params = yield select((state: RootState) => state.profileManager.getListComment.params);
      yield put(getListComment(params))
    }
  } catch (e) {
    yield put(createCommentError(new AppError(e.message)));
    NotificationError('Tạo ghi chú không thành công', "Lỗi: " + e.message);
  }
}
