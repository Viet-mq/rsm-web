import {
  createChatBotEntityError,
  createChatBotEntitySuccess,
  CreateEntityAction,
  getListChatBotEntity,
  hideFormCreateChatBotEntity
} from "../actions";
import * as apis from "../services/apis";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {put, select} from "redux-saga/effects";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";

export function* createEntityAsync(action: CreateEntityAction) {
  try {
    const rs = yield apis.createChatBotEntity(action?.params || {});
    yield put(createChatBotEntitySuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Tạo thực thể không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo thực thể thành công");
      yield put(hideFormCreateChatBotEntity());
      const params = yield select((state: RootState) => state.entityManager.list.params);
      yield put(getListChatBotEntity(params));
    }
  } catch (e) {
    yield put(createChatBotEntityError(new AppError(e.message, -1)));
  }
}
