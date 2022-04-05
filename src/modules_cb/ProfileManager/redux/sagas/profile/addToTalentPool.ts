import {
  AddToTalentPoolAction,
  addToTalentPoolError,
  addToTalentPoolSuccess,
  getListProfile,
  showAddToTalentPoolForm
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {getListTalentPool} from "../../../../TalentPoolManager/redux/actions";

export function* changeTalentPoolAsync(action: AddToTalentPoolAction) {
  try {
    const rs = yield apis.addToTalentPool(action.request);
    yield put(addToTalentPoolSuccess(rs));
    if (rs.code !== 0) {
      yield put(addToTalentPoolError(new AppError(rs.message)));
      NotificationError('Thêm vào  kho tiềm năng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Thêm vào  kho tiềm năng thành công");
      const params = yield select((state: RootState) => state.profileManager.list.params);
      const paramsTalentPool = yield select((state: RootState) => state.talentPoolManager.list.params);

      yield put(showAddToTalentPoolForm(false));
      yield put(getListProfile(params))
      yield put(getListTalentPool(paramsTalentPool))

    }
  } catch (e) {
    yield put(addToTalentPoolError(new AppError(e.message)));
    NotificationError('Thêm vào  kho tiềm năng không thành công', "Lỗi: " + e.message);
  }
}
