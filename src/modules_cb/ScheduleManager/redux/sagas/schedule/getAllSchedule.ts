import {GetScheduleAction, getScheduleError, getScheduleSuccess} from "../../actions";
import * as apis from '../../services/apis'
import {NotificationError} from "../../../../../components/Notification/Notification";
import {put} from "redux-saga/effects";
import {AppError} from "../../../../../models/common";

export function* getAllScheduleAsync(action: GetScheduleAction) {
  try {
    const rs = yield apis.getAllSchedule(action.params);
    if (rs.code !== 0) {
      NotificationError('Lập lịch phỏng vấn không thành công', "Lỗi: " + rs.message);
    }
    yield put(getScheduleSuccess(rs.calendars))
  } catch (e) {
    yield put(getScheduleError(new AppError(e.message)));
    NotificationError('Lập lịch phỏng vấn không thành công', "Lỗi: " + e.message);
  }
}
