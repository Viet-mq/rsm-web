import {put, select, take} from 'redux-saga/effects';
import * as apis from './../../services/apis';
import {LoginAction, loginError, loginSuccess, LoginSuccessAction, LOGOUT} from '../actions';
import {AppError} from '../../../../models/common';
import {setToken} from '../../../../helpers/token';
import {LoginResponse2} from '../../types';
import history from 'src/history';
import {NotificationError, NotificationSuccess} from 'src/components/Notification/Notification';
import {RootState} from "../../../../redux/reducers";
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

const TOKEN_KEY = 'auth-n-token';

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


    } else {
      NotificationError("Đăng nhập không thành công", loginPayload.message);
      yield put(loginError(new AppError(loginPayload.message)));
    }
  } catch (error) {
    yield put(loginError(new AppError(error.message)));
  }
}

export function loginSuccessAsync(action: LoginSuccessAction) {
  console.log("in saga: " + JSON.stringify(action));
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
    localStorage.removeItem("list-school");
    localStorage.removeItem("list-job-level");
    localStorage.removeItem("list-source-cv");
    localStorage.removeItem("list-department");
    localStorage.removeItem("list-job");
    localStorage.removeItem("list-status-cv");
    localStorage.removeItem("list-talent-pool");
    localStorage.removeItem("list-talent-pool");
    localStorage.removeItem("list-account");

  }
}
