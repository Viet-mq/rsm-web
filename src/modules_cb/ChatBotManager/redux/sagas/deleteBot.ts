import {put} from 'redux-saga/effects';
import * as apis from '../services/apis';
import {DeleteChatBotAction, deleteChatBotError, deleteChatBotSuccess, getListChatBots} from "../actions";
import {AppError} from "src/models/common";
import {NotificationError, NotificationSuccess} from 'src/components/Notification/Notification';

export function* deleteChatBot(params: DeleteChatBotAction) {
  try {
    let p = {
      chatbot_id: params.params
    }
    const rs = yield apis.deleteChatBot(p);
    if (rs.code !== 0) {
      NotificationError('Xóa chat bot không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa chat bot thành công");
      yield put(deleteChatBotSuccess(rs));
      yield put(getListChatBots({}));
    }
  } catch (e) {
    yield put(deleteChatBotError(new AppError(e.message)));
    NotificationError('Xóa chat bot không thành công', "Lỗi: " + e.message);
  }
}
