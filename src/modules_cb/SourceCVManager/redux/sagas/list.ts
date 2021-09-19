import {SourceCVListAction, getListSourceCVError, getListSourceCVSuccess} from "../actions";
import * as apis from '../services/apis'
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListSourceCVAsync(action: SourceCVListAction) {
  console.log("haah2");
  try {
    const rs = yield apis.getListSourceCV(action.params);
    console.log("rs: " + JSON.stringify(rs));
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách nguồn CV không thành công', "Lỗi: " + rs.message);
    }
    yield put(getListSourceCVSuccess(rs.total, rs.rows))
  } catch (e) {
    yield put(getListSourceCVError(new AppError(e.message)));
    NotificationError('Lấy danh sách nguồn CV không thành công', "Lỗi: " + e.message);
  }
}
