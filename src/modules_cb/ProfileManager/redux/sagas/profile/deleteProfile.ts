import {DeleteProfileAction, deleteProfileError, deleteProfileSuccess, getListProfile} from "../../actions";
import * as apis from "../../services/apis";
import {put, select} from "redux-saga/effects";
import {NotificationError, NotificationSuccess} from "src/components/Notification/Notification";
import {RootState} from "src/redux/reducers";
import {AppError} from "src/models/common";
import {useLocation} from "react-router-dom";
import {getDetailRecruitment} from "../../../../RecruitmentManager/redux/actions";


export function* deleteProfileAsync(action: DeleteProfileAction) {
  // const location = useLocation();
  try {
    const rs = yield apis.deleteProfile(action.request);
    yield put(deleteProfileSuccess(rs));
    if (rs.code !== 0) {
      NotificationError('Xóa Profile không thành công', "Lỗi: " + rs.message)
    } else {
      NotificationSuccess('Thành công', "Xóa Profile thành công");
      const params = yield select((state: RootState) => state.profileManager.list.params);
      yield put(getListProfile(params))
      // if (location.pathname.includes("recruitment-manager")) {
        const paramsDetailRecruitment = yield select((state: RootState) => state.recruitmentManager.detailRecruitment.params);
        yield put(getDetailRecruitment(paramsDetailRecruitment))
      // }
    }
  } catch (e) {
    yield put(deleteProfileError(new AppError(e.message)));
    NotificationError('Xóa Profile không thành công', "Lỗi: " + e.message);
  }
}
