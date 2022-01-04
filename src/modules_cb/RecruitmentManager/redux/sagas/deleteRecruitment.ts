import {DeleteRecruitmentAction, deleteRecruitmentError, deleteRecruitmentSuccess, getListRecruitment} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";

export function* deleteRecruitmentAsync(action: DeleteRecruitmentAction) {
  try {
    const rs = yield apis.deleteRecruitment(action.request);
    yield put(deleteRecruitmentSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa tin tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa tin tuyển dụng thành công");
      const params = yield select((state: RootState) => state.recruitmentManager.list.params);
      yield put(getListRecruitment(params))
    }
  } catch (e) {
    yield put(deleteRecruitmentError(new AppError(e.message)));
    NotificationError('Xóa tin tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
