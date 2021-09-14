import * as apis from '../services/apis';

import {
  getListChatBots,
  hideUpdateChatBotForm,
  UpdateChatBotAction,
  updateChatBotError,
  updateChatBotSuccess
} from "../actions";
import {put} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";

export function* updateChatBotAsync(action: UpdateChatBotAction) {

  try {
    const rs = yield apis.updateChatBot(action.params);
    yield put(updateChatBotSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật chat bot không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật mới chat bot thành công");
      yield put(hideUpdateChatBotForm());
      yield put(getListChatBots({}));
    }
  } catch (e) {
    yield put(updateChatBotError(new AppError(e.message)));
    NotificationError('Cập nhật chat bot không thành công', "Lỗi: " + e.message)
  }

}
