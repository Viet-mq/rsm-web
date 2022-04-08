import {
  getAllSchedule,
  showFormSchedule,
  UpdateScheduleAction,
  updateScheduleError,
  updateScheduleSuccess
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateScheduleAsync(action: UpdateScheduleAction) {
  try {
    const rs = yield apis.updateSchedule(action.request);
    yield put(updateScheduleSuccess(rs));
    if (rs.code !== 0) {
      yield put(updateScheduleError(new AppError(rs.message)));
      NotificationError('Cập nhật lịch phỏng vấn không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật lịch phỏng vấn thành công");
      yield put(showFormSchedule(false));
      const params = yield select((state: RootState) => state.scheduleManager.getSchedule.params);
      yield put(getAllSchedule(params))
    }
  } catch (e) {
    yield put(updateScheduleError(new AppError(e.message)));
    NotificationError('Cập nhật lịch phỏng vấn không thành công', "Lỗi: " + e.message);
  }
}
