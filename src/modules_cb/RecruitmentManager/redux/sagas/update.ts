import {getListRecruitment, UpdateRecruitmentAction, updateRecruitmentError, updateRecruitmentSuccess} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import history from 'src/history';

export function* updateRecruitmentAsync(action: UpdateRecruitmentAction) {
  try {
    const rs = yield apis.updateRecruitment(action.request);
    yield put(updateRecruitmentSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật tin tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật tin tuyển dụng thành công");
      // yield put(showFormUpdate(false));
      history.push('/recruitment-manager');

      const params = yield select((state: RootState) => state.recruitmentManager.list.params);
      yield put(getListRecruitment(params))
    }
  } catch (e) {
    yield put(updateRecruitmentError(new AppError(e.message)));
    NotificationError('Cập nhật tin tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
