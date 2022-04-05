import {
  CreateProfileAction,
  createProfileError,
  createProfileSuccess,
  getListProfile,
  showFormCreate
} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {AppError} from "src/models/common";
import {RootState} from "src/redux/reducers";
import {getDetailRecruitment} from "../../../../RecruitmentManager/redux/actions";
import {getListTalentPool} from "../../../../TalentPoolManager/redux/actions";

export function* createProfileAsync(action: CreateProfileAction) {
  try {
    const rs = yield apis.createProfile(action.request);
    yield put(createProfileSuccess(rs));
    if (rs.code !== 0) {
      yield put(createProfileError(new AppError(rs.message)));
      NotificationError('Tạo ứng viên không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Tạo ứng viên thành công");
      const params = yield select((state: RootState) => state.profileManager);
      yield put(showFormCreate(false,params.showForm.recruitment_talentpool));
      yield put(getListProfile(params.list.params));
      if(params.showForm.recruitment_talentpool?.recruitment){
        yield put(getDetailRecruitment({id:params.showForm.recruitment_talentpool.recruitment}))
      }
      if(params.showForm.recruitment_talentpool?.talentPool){
        yield put(getListTalentPool(params.showForm.recruitment_talentpool.talentPool))      }

    }
  } catch (e) {
    yield put(createProfileError(new AppError(e.message)));
    NotificationError('Tạo ứng viên không thành công', "Lỗi: " + e.message);
  }
}
