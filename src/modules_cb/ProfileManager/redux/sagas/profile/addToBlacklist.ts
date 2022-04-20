import {AddToBlacklistAction, addToBlacklistError, addToBlacklistSuccess, getListProfile} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {getListBlacklist} from "../../../../BlacklistManager/redux/actions";

export function* changeBlacklistAsync(action: AddToBlacklistAction) {
  try {
    const rs = yield apis.addToBlacklist(action.request);
    yield put(addToBlacklistSuccess(rs));
    if (rs.code !== 0) {
      yield put(addToBlacklistError(new AppError(rs.message)));
      NotificationError('Thêm vào Blacklist không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm vào Blacklist thành công");
      const params = yield select((state: RootState) => state.profileManager.list.params);
      const paramsBlacklist = yield select((state: RootState) => state.talentPoolManager.list.params);

      yield put(getListProfile(params))
      yield put(getListBlacklist(paramsBlacklist))

    }
  } catch (e) {
    yield put(addToBlacklistError(new AppError(e.message)));
    NotificationError('Thêm vào Blacklist không thành công', "Lỗi: " + e.message);
  }
}
