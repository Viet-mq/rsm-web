import {DeleteNoteAction, deleteNoteError, deleteNoteSuccess, getListNote} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteNoteAsync(action: DeleteNoteAction) {
  try {
    const rs = yield apis.deleteNote(action.request);
    yield put(deleteNoteSuccess(rs));
    if (rs.code !== 0) {
      yield put(deleteNoteError(new AppError(rs.message)));
      NotificationError('Xóa đánh giá không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa đánh giá thành công");
      const params = yield select((state: RootState) => state.profileManager.getListNote.params);
      yield put(getListNote(params))
    }
  } catch (e) {
    yield put(deleteNoteError(new AppError(e.message)));
    NotificationError('Xóa đánh giá không thành công', "Lỗi: " + e.message);
  }
}
