import {CreateNoteAction, createNoteError, createNoteSuccess, getListNote, showFormCreateNote,} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createNoteAsync(action: CreateNoteAction) {
  try {
    const rs = yield apis.createNote(action.request);
    yield put(createNoteSuccess(rs));
    if (rs.code !== 0) {
      yield put(createNoteError(new AppError(rs.message)));
      NotificationError('Tạo đánh giá không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo đánh giá thành công");
      yield put(showFormCreateNote(false));
      const params = yield select((state: RootState) => state.profileManager.getListNote.params);
      yield put(getListNote(params))
    }
  } catch (e) {
    yield put(createNoteError(new AppError(e.message)));
    NotificationError('Tạo đánh giá không thành công', "Lỗi: " + e.message);
  }
}
