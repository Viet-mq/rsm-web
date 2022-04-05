import {RecruitmentListAction, getListRecruitmentError, getListRecruitmentSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListRecruitmentAsync(action: RecruitmentListAction) {
  try {
    const rs = yield apis.getListRecruitment(action.params);
    if (rs.code !== 0) {
      yield put(getListRecruitmentError(new AppError(rs.message)));
      NotificationError('Lấy danh sách tin tuyển dụng không thành công', "Lỗi: " + rs.message);

    }
    else {
      localStorage.setItem("list-recruitment", JSON.stringify(rs || {}));
      yield put(getListRecruitmentSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getListRecruitmentError(new AppError(e.message)));
    NotificationError('Lấy danh sách tin tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
