import {
  getListIntent,
  showFormUpdateIntent,
  updateChatBotIntentError,
  updateChatBotIntentSuccess,
  UpdateIntentAction
} from "../actions";
import * as apis from "../apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateIntentAsync(action: UpdateIntentAction) {
  try {
    const rs = yield apis.updateChatBotIntent(action.request);
    yield put(updateChatBotIntentSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật ý định không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật ý định thành công");
      yield put(showFormUpdateIntent(false));
      const params = yield select((state: RootState) => state.intentManager.list.params);
      yield put(getListIntent(params));
    }
  } catch (e) {
    yield put(updateChatBotIntentError(new AppError(e.message, -1)));
  }
}
