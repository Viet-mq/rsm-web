import {deleteChatBotIntentError, deleteChatBotIntentSuccess, DeleteIntentAction, getListIntent} from "../actions";
import * as apis from "../apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* deleteIntentAsync(action: DeleteIntentAction) {
  try {
    const rs = yield apis.deleteChatBotIntent(action.request);
    yield put(deleteChatBotIntentSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa ý định không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa ý định thành công");
      const params = yield select((state: RootState) => state.intentManager.list.params);
      yield put(getListIntent(params));
    }
  } catch (e) {
    yield put(deleteChatBotIntentError(new AppError(e.message, -1)));
    NotificationError('Xóa ý định không thành công', "Lỗi: " + e.message)
  }
}
