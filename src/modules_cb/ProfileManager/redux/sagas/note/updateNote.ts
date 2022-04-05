import {getListNote, showFormUpdateNote, UpdateNoteAction, updateNoteError, updateNoteSuccess} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateNoteAsync(action: UpdateNoteAction) {
  try {
    const rs = yield apis.updateNote(action.request);
    yield put(updateNoteSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateNoteError(new AppError(rs.message)));
      NotificationError('Cập nhật đánh giá không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật đánh giá thành công");
      yield put(showFormUpdateNote(false));
      const params = yield select((state: RootState) => state.profileManager.getListNote.params);
      yield put(getListNote(params))
    }
  } catch (e) {
    yield put(updateNoteError(new AppError(e.message)));
    NotificationError('Cập nhật đánh giá không thành công', "Lỗi: " + e.message);
  }
}
