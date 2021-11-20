import {
  CreateBookingAction,
  createBookingError,
  createBookingSuccess,
  getBooking,
  showFormBooking
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createBookingAsync(action: CreateBookingAction) {
  try {
    const rs = yield apis.createBooking(action.request);
    if (rs.code !== 0) {
      yield put(createBookingError(new AppError(rs.message)));
      NotificationError('Lập lịch phỏng vấn không thành công', "Lỗi: " + rs.message)
    } else {
      yield put(createBookingSuccess(rs));
      NotificationSuccess('Thành công', "Lập lịch phỏng vấn thành công");
      yield put(showFormBooking(false));
      const params = yield select((state: RootState) => state.profileManager.getBooking.params);
      yield put(getBooking(params))
    }
  } catch (e) {
    yield put(createBookingError(new AppError(e.message)));
    NotificationError('Lập lịch phỏng vấn không thành công', "Lỗi: " + e.message);
  }
}
