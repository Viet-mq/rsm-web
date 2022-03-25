import {DeleteScheduleAction, deleteScheduleError, deleteScheduleSuccess} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";
import {getAllSchedule} from "../../actions";
import {getBooking, getDetailProfile} from "../../../../ProfileManager/redux/actions";

export function* deleteScheduleAsync(action: DeleteScheduleAction) {
  try {
    const rs = yield apis.deleteSchedule(action.request);
    yield put(deleteScheduleSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa lịch phỏng vấn không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa lịch phỏng vấn thành công");

      const params = yield select((state: RootState) => state.scheduleManager.getSchedule.params);
      const paramsBooking = yield select((state: RootState) => state.profileManager.getBooking.params);

      yield put(getAllSchedule(params))
      if(paramsBooking){
        yield put(getBooking(paramsBooking))
      }
    }
  } catch (e) {
    yield put(deleteScheduleError(new AppError(e.message)));
    NotificationError('Xóa lịch phỏng vấn không thành công', "Lỗi: " + e.message);
  }
}
