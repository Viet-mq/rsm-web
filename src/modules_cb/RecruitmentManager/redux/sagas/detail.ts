import {
  RecruitmentListAction,
  getListRecruitmentError,
  getListRecruitmentSuccess,
  DetailRecruitmentAction, getDetailRecruitmentSuccess, getDetailRecruitmentError
} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getDetailRecruitmentAsync(action: DetailRecruitmentAction) {
  try {
    const rs = yield apis.getListRecruitment(action.params);
    if (rs.code !== 0) {
      NotificationError('Lấy chi tiết tin tuyển dụng không thành công', "Lỗi: " + rs.message);

    }
    else {
      yield put(getDetailRecruitmentSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getDetailRecruitmentError(new AppError(e.message)));
    NotificationError('Lấy chi tiết tin tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
