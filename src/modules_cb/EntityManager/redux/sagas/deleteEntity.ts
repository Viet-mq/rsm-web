import {
  deleteChatBotEntityError,
  deleteChatBotEntitySuccess,
  DeleteEntityAction,
  getListChatBotEntity
} from "../actions";
import * as apis from '../services/apis'
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";

export function* deleteEntityAsync(action: DeleteEntityAction) {
  try {
    let req = {"entity_id": action.entityId};
    const rs = yield apis.deleteChatBotEntity(req);
    yield put(deleteChatBotEntitySuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa thực thể không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa thực thể thành công");
      const params = yield select((state: RootState) => state.entityManager.list.params);
      yield put(getListChatBotEntity(params));
    }
  } catch (e) {
    yield put(deleteChatBotEntityError(new AppError(e.message, -1)));
  }
}
