import {
  getBooking,
  showFormBooking,
  UpdateBookingAction,
  updateBookingError,
  updateBookingSuccess
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateBookingAsync(action: UpdateBookingAction) {
  try {
    console.log("Action.request:", action.request)
    const rs = yield apis.updateBooking(action.request);
    yield put(updateBookingSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật lịch phỏng vấn không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật lịch phỏng vấn thành công");
      yield put(showFormBooking(false));
      const params = yield select((state: RootState) => state.profileManager.getBooking.params);
      yield put(getBooking(params))
    }
  } catch (e) {
    yield put(updateBookingError(new AppError(e.message)));
    NotificationError('Cập nhật Booking không thành công', "Lỗi: " + e.message);
  }
}
