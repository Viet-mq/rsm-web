import {put} from 'redux-saga/effects';
import * as apis from '../services/apis';
import {
  CreateChatBotAction,
  createChatBotError,
  createChatBotSuccess,
  getListChatBots,
  hideCreateChatBotForm,
} from "../actions";
import {AppError} from 'src/models/common';
import {NotificationError, NotificationSuccess} from 'src/components/Notification/Notification';

export function* createChatBotAsync(action: CreateChatBotAction) {
  try {
    const rs = yield apis.createChatBot(action.params);
    yield put(createChatBotSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo chat bot không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo mới chat bot thành công");
      yield put(hideCreateChatBotForm());
      yield put(getListChatBots({}))
    }

  } catch (e) {
    yield put(createChatBotError(new AppError(e.message)));
    NotificationError('Tạo chat bot không thành công', "Lỗi: " + e.message);
  }

}
