import {
  getListChatBotEntity,
  hideFormUpdateChatBotEntity,
  updateChatBotEntityError,
  updateChatBotEntitySuccess,
  UpdateEntityAction
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* updateEntityAsync(action: UpdateEntityAction) {
  try {
    const rs = yield apis.updateChatBotEntity(action?.params || {});
    yield put(updateChatBotEntitySuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Cập nhật thực thể không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Cập nhật thực thể thành công");
      yield put(hideFormUpdateChatBotEntity());
      const params = yield select((state: RootState) => state.entityManager.list.params);
      yield put(getListChatBotEntity(params));
    }
  } catch (e) {
    yield put(updateChatBotEntityError(new AppError(e.message, -1)));
    NotificationError('Cập nhật thực thể không thành công', "Lỗi: " + e.message)
  }
}
