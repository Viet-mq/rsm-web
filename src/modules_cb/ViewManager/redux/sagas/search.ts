import {SearchListViewAction, searchListViewError, searchListViewSuccess} from "../actions";
import * as apis from '../services/apis'
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";
import {RootState} from "../../../../redux/reducers";
import {getListAccount} from "../../../AccountManager/redux/actions";

export function* searchListViewAsync(action: SearchListViewAction) {
  try {
    const rs = yield apis.getListView(action.params);
    if (rs.code !== 0) {
      yield put(searchListViewError(new AppError(rs.message)));
      NotificationError('Lấy danh sách view không thành công', "Lỗi: " + rs.message);
    } else {
      yield put(searchListViewSuccess(rs.total, rs.rows))


    }
  } catch (e) {
    yield put(searchListViewError(new AppError(e.message)));
    NotificationError('Lấy danh sách view không thành công', "Lỗi: " + e.message);
  }
}
