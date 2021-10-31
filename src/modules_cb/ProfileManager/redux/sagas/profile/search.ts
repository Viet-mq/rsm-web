import * as apis from "../../services/apis";
import {put} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {GetElasticSearchAction, getElasticSearchError, getElasticSearchSuccess} from "../../actions";

export function* searchAsync(action: GetElasticSearchAction) {
  try {
    const rs = yield apis.getElasticSearch(action.request);
    yield put(getElasticSearchSuccess(rs.total, rs.rows));
    if (rs.code !== 0) {
      // NotificationError('Tìm kiếm thông tin không thành công', "Lỗi: " + rs.message)
    } else {
      // NotificationSuccess('Thành công', "Tìm kiếm thông tin thành công");
    }
  } catch (e) {
    yield put(getElasticSearchError(new AppError(e.message)));
    // NotificationError('Tìm kiếm thông tin không thành công', "Lỗi: " + e.message);
  }
}
