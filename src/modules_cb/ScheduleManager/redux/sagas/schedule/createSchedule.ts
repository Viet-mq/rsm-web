import {
  CreateScheduleAction,
  createScheduleError,
  createScheduleSuccess,
  getAllSchedule,
  showFormSchedule
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createScheduleAsync(action: CreateScheduleAction) {
  try {
    const rs = yield apis.createSchedule(action.request);
    if (rs.code !== 0) {
      yield put(createScheduleError(new AppError(rs.message)));
      NotificationError('Lập lịch phỏng vấn không thành công', "Lỗi: " + rs.message)
    } else {
      yield put(createScheduleSuccess(rs));
      NotificationSuccess('Thành công', "Lập lịch phỏng vấn thành công");
      yield put(showFormSchedule(false));
      const params = yield select((state: RootState) => state.scheduleManager.getSchedule.params);
      yield put(getAllSchedule(params))
    }
  } catch (e) {
    yield put(createScheduleError(new AppError(e.message)));
    NotificationError('Lập lịch phỏng vấn không thành công', "Lỗi: " + e.message);
  }
}
