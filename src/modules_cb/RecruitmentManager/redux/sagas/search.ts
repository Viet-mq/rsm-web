import {getSearchRecruitmentError, getSearchRecruitmentSuccess, SearchRecruitmentAction} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getSearchRecruitmentAsync(action: SearchRecruitmentAction) {
  try {
    const rs = yield apis.getListRecruitment(action.params);
    if (rs.code !== 0) {
      yield put(getSearchRecruitmentError(new AppError(rs.message)));
      NotificationError('Lấy danh sách tin tuyển dụng không thành công', "Lỗi: " + rs.message);

    } else {
      yield put(getSearchRecruitmentSuccess(rs.total, rs.rows))
    }
  } catch (e) {
    yield put(getSearchRecruitmentError(new AppError(e.message)));
    NotificationError('Lấy danh sách tin tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
