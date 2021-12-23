import {
  ChangeProcessAction,
  changeProcessError,
  changeProcessSuccess, getDetailProfile,
  getListProfile, showChangeProcessForm, showChangeRecruitmentForm,
  showFormCreate
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {getListRecruitment} from "../../../../RecruitmentManager/redux/actions";

export function* changeProcessAsync(action: ChangeProcessAction) {
  try {
    const rs = yield apis.changeProcess(action.request);
    yield put(changeProcessSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Chuyển vòng tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Chuyển vòng tuyển dụng thành công");
      yield put(showChangeProcessForm(false));
      yield put(showChangeRecruitmentForm(false));
      const params = yield select((state: RootState) => state.profileManager.list.params);
      const paramsRecruitment = yield select((state: RootState) => state.recruitmentManager.list.params);
      const paramsDetail=yield select((state:RootState)=>state.profileManager.detail.params)
      yield put(getListProfile(params))
      yield put(getListRecruitment(paramsRecruitment))
      yield put(getDetailProfile(paramsDetail))
    }
  } catch (e) {
    yield put(changeProcessError(new AppError(e.message)));
    NotificationError('Chuyển vòng tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
