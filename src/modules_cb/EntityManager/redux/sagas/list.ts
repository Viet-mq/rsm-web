import {EntityListAction, getListChatBotEntityError, getListChatBotEntitySuccess} from "../actions";
import * as apis from '../services/apis';
import {put} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {NotificationError} from "src/components/Notification/Notification";

export function* getListChatBotEntityAsync(action: EntityListAction) {
  try {
    console.log("getListChatBotEntityAsync: params: " + JSON.stringify(action.params));
    const rs = yield apis.getListChatBotEntity(action.params || {});
    if (rs.code !== 0) {
      NotificationError('Lấy danh sách ý định không thành công', "Lỗi: " + rs.message)
    }
    yield put(getListChatBotEntitySuccess(rs.rows, rs.total));
  } catch (e) {
    yield put(getListChatBotEntityError(new AppError(e.message, -1)));
  }
}
