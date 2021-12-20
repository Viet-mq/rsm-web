import {CreateRecruitmentAction, createRecruitmentError, createRecruitmentSuccess, getListRecruitment} from "../actions";
import * as apis from "../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createRecruitmentAsync(action: CreateRecruitmentAction) {
  try {
    const rs = yield apis.createRecruitment(action.request);
    yield put(createRecruitmentSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo tin tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo tin tuyển dụng thành công");
      // yield put(showFormCreate(false));
      const params = yield select((state: RootState) => state.recruitmentManager.list.params);
      yield put(getListRecruitment(params))
    }
  } catch (e) {
    yield put(createRecruitmentError(new AppError(e.message)));
    NotificationError('Tạo tin tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
