import {put, take} from 'redux-saga/effects';
import * as apis from './../../services/apis';
import {LoginAction, loginError, loginSuccess, LoginSuccessAction, LOGOUT} from '../actions';
import {AppError} from '../../../../models/common';
import {setToken} from '../../../../helpers/token';
import {LoginResponse2} from '../../types';
import history from 'src/history';
import {NotificationError, NotificationSuccess} from 'src/components/Notification/Notification';
import {getListJob} from "../../../../modules_cb/JobManager/redux/actions";
import {getListJobLevel} from "../../../../modules_cb/JobLevelManager/redux/actions";
import {getListDepartment} from "../../../../modules_cb/DepartmentManager/redux/actions";
import {getListSourceCV} from "../../../../modules_cb/SourceCVManager/redux/actions";
import {getListTalentPool} from "../../../../modules_cb/TalentPoolManager/redux/actions";
import {getListStatusCV} from "../../../../modules_cb/StatusCVManager/redux/actions";
import {getListSchool} from "../../../../modules_cb/SchoolManager/redux/actions";
import {getListAccount} from "../../../../modules_cb/AccountManager/redux/actions";
import {getListSkill} from "../../../../modules_cb/SkillManager/redux/actions";
import {getListAddress} from "../../../../modules_cb/AddressManager/redux/actions";
import {getListReasonReject} from "../../../../modules_cb/ReasonRejectManager/redux/actions";
import {getListRecruitment} from "../../../../modules_cb/RecruitmentManager/redux/actions";
import {getKeyPoint} from "../../../../modules_cb/EmailManager/redux/actions";
import {getListApi} from "../../../../modules_cb/APIManager/redux/actions";
import {getListAPIRoles} from "../../../../modules_cb/APIRolesManager/redux/actions";
import {getListViewRoles} from "../../../../modules_cb/ViewRolesManager/redux/actions";
import {getListView} from "../../../../modules_cb/ViewManager/redux/actions";

const TOKEN_KEY = 'auth-n-token';
const SCHOOL ="list-school";
const JOB_LEVEL ="list-job-level";
const SOURCE_CV ="list-source-cv";
const DEPARTMENT ="list-department";
const JOB ="list-job";
const STATUS_CV ="list-status-cv";
const TALENT_POOL ="list-talent-pool";
const REASON_REJECT ="list-reason-reject";
const SKILL ="list-skill";
const RECRUITMENT ="list-recruitment";
const ACCOUNT ="list-account";
const ADDRESS ="list-address";
const KEY_POINT ="list-key-point";
const API ="list-api";
const API_ROLES ="list-api-roles";
const VIEW_ROLES ="list-view-roles";
const VIEW ="list-view";

export function* loginAsync(action: LoginAction) {
  try {
    const loginPayload = yield apis.login(action.payload);
    if (loginPayload.code === 0) {
      NotificationSuccess("Thành công", "Đăng nhập thành công");
      localStorage.setItem(TOKEN_KEY, JSON.stringify(loginPayload || {}));
      yield put(loginSuccess(loginPayload));
      // const paramsJob = yield select((state: RootState) => state.jobManager.list.params);
      // const paramsJobLevel = yield select((state: RootState) => state.joblevelManager.list.params);
      // const paramsDepartment = yield select((state: RootState) => state.departmentManager.list.params);
      // const paramsSourceCV = yield select((state: RootState) => state.sourcecvManager.list.params);
      // const paramsTalentPool = yield select((state: RootState) => state.talentPoolManager.list.params);
      // const paramsStatusCV = yield select((state: RootState) => state.statuscvManager.list.params);
      // const paramsSchool = yield select((state: RootState) => state.schoolManager.list.params);
      // const paramsAccount = yield select((state: RootState) => state.accountManager.list.params);

      yield put(getListJob({page: 1, size: 100}))
      yield put(getListJobLevel({page: 1, size: 100}))
      yield put(getListDepartment({page: 1, size: 100}))
      yield put(getListSourceCV({page: 1, size: 100}))
      yield put(getListTalentPool({page: 1, size: 100}))
      yield put(getListStatusCV({page: 1, size: 100}))
      yield put(getListSchool({page: 1, size: 100}))
      yield put(getListAccount({page: 1, size: 100}))
      yield put(getListSkill({page: 1, size: 100}))
      yield put(getListAddress({page: 1, size: 100}))
      yield put(getListReasonReject({page: 1, size: 100}))
      yield put(getListRecruitment({page: 1, size: 100}))
      yield put(getListApi({page: 1, size: 0}))
      yield put(getListAPIRoles({page: 1, size: 100}))
      yield put(getListViewRoles({page: 1, size: 100}))
      yield put(getListView({page: 1, size: 100}))
      yield put(getKeyPoint())


    } else {
      NotificationError("Đăng nhập không thành công", loginPayload.message);
      yield put(loginError(new AppError(loginPayload.message)));
    }
  } catch (error) {
    yield put(loginError(new AppError(error.message)));
  }
}

export function loginSuccessAsync(action: LoginSuccessAction) {
  setToken(action.payload?.access_token);
  if (window.location.pathname === '/') {
    history.push('/home/');
  }
}

export function* loginCheckerAsync() {
  while (1) {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken && savedToken !== '{}') {
      const loginResponse: LoginResponse2 = JSON.parse(savedToken);
      yield put(loginSuccess(loginResponse));
    }
    yield take(LOGOUT);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(SCHOOL);
    localStorage.removeItem(JOB_LEVEL);
    localStorage.removeItem(SOURCE_CV);
    localStorage.removeItem(DEPARTMENT);
    localStorage.removeItem(JOB);
    localStorage.removeItem(STATUS_CV);
    localStorage.removeItem(TALENT_POOL);
    localStorage.removeItem(REASON_REJECT);
    localStorage.removeItem(SKILL);
    localStorage.removeItem(RECRUITMENT);
    localStorage.removeItem(ACCOUNT);
    localStorage.removeItem(ADDRESS);
    localStorage.removeItem(KEY_POINT);
    localStorage.removeItem(API);
    localStorage.removeItem(API_ROLES);
    localStorage.removeItem(VIEW_ROLES);
    localStorage.removeItem(VIEW);

  }
}
