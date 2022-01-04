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
import {getDetailRecruitment, getListRecruitment} from "../../../../RecruitmentManager/redux/actions";

export function* changeProcessAsync(action: ChangeProcessAction) {
  try {
    const rs = yield apis.changeProcess(action.request);
    yield put(changeProcessSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Chuyển vòng tuyển dụng không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Chuyển vòng tuyển dụng thành công");
      const params = yield select((state: RootState) => state.profileManager.list.params);
      const paramsRecruitment = yield select((state: RootState) => state.recruitmentManager.list.params);
      const paramsDetailRecruitment = yield select((state: RootState) => state.recruitmentManager.detailRecruitment.params);
      const paramsDetail=yield select((state:RootState)=>state.profileManager.detail.params)

      if(action.isChangeRecruitment){
        yield put(showChangeRecruitmentForm(false));
        yield put(getListProfile(params))
        yield put(getListRecruitment(paramsRecruitment))
      }
      else{
        yield put(showChangeProcessForm(false));

        if(paramsDetail?.idProfile){
          yield put(getDetailProfile(paramsDetail))
        }
        yield put(getDetailRecruitment(paramsDetailRecruitment))
      }


    }
  } catch (e) {
    yield put(changeProcessError(new AppError(e.message)));
    NotificationError('Chuyển vòng tuyển dụng không thành công', "Lỗi: " + e.message);
  }
}
