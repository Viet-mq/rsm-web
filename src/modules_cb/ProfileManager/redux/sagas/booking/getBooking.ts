import {GetBookingAction, getBookingError, getBookingSuccess} from "../../actions";
import * as apis from '../../services/apis'
import {NotificationError} from "../../../../../components/Notification/Notification";
import {put} from "redux-saga/effects";
import {AppError} from "../../../../../models/common";

export function* getBookingAsync(action: GetBookingAction) {
  try {
    const rs = yield apis.getBooking(action.params);
    console.log("rsBooking: ", rs.calendars[0]);
    if (rs.code !== 0) {
      NotificationError('Lập lịch phỏng vấn không thành công', "Lỗi: " + rs.message);
    }
    yield put(getBookingSuccess(rs.calendars[0]))
  } catch (e) {
    yield put(getBookingError(new AppError(e.message)));
    NotificationError('Lập lịch phỏng vấn không thành công', "Lỗi: " + e.message);
  }
}
