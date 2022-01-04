import {
  createChatBotIntentError,
  createChatBotIntentSuccess,
  CreateIntentAction,
  getListIntent,
  showFormCreateIntent
} from "../actions";
import * as apis from "../apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createIntentAsync(action: CreateIntentAction) {
  try {
    const rs = yield apis.createChatBotIntent(action.request);
    yield put(createChatBotIntentSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo ý định không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo ý định thành công");
      yield put(showFormCreateIntent(false));
      const params = yield select((state: RootState) => state.intentManager.list.params);
      yield put(getListIntent(params));
    }
  } catch (e) {
    yield put(createChatBotIntentError(new AppError(e.message, -1)));
  }
}
