import {all} from 'redux-saga/effects';
import authSaga from '../modules/Auth/redux/sagas';
import dashboardSaga from '../modules/Dashboard/redux/sagas';
import accountManagerSaga from '../modules_cb/AccountManager/redux/sagas';
import viewManagerSaga from '../modules_cb/ViewManager/redux/sagas';
import apiManagerSaga from '../modules_cb/APIManager/redux/sagas';
import apiGroupManagerSaga from '../modules_cb/ApiRoleGroupManager/redux/sagas';
import jobManagerSaga from '../modules_cb/JobManager/redux/sagas';
import talentPoolManagerSaga from '../modules_cb/TalentPoolManager/redux/sagas';
import departmentManagerSaga from '../modules_cb/DepartmentManager/redux/sagas';
import joblevelManagerSaga from '../modules_cb/JobLevelManager/redux/sagas';
import sourcecvManagerSaga from '../modules_cb/SourceCVManager/redux/sagas';
import statuscvManagerSaga from '../modules_cb/StatusCVManager/redux/sagas';
import blacklistManagerSaga from '../modules_cb/BlacklistManager/redux/sagas';
import schoolManagerSaga from '../modules_cb/SchoolManager/redux/sagas';
import profileManagerSaga from '../modules_cb/ProfileManager/redux/sagas';
import viewGroupManagerSaga from '../modules_cb/ViewGroupManager/redux/sagas'
import groupAPIManagerSaga from '../modules_cb/GroupAPIManager/redux/sagas'
import skillManagerSaga from '../modules_cb/SkillManager/redux/sagas'
import addressManagerSaga from '../modules_cb/AddressManager/redux/sagas'
import reasonRejectManagerSaga from '../modules_cb/ReasonRejectManager/redux/sagas'
import scheduleManagerSaga from '../modules_cb/ScheduleManager/redux/sagas';
import recruitmentManagerSaga from '../modules_cb/RecruitmentManager/redux/sagas';
import * as commonSaga from './common-saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    dashboardSaga(),
    accountManagerSaga(),
    viewManagerSaga(),
    apiManagerSaga(),
    apiGroupManagerSaga(),
    talentPoolManagerSaga(),
    jobManagerSaga(),
    departmentManagerSaga(),
    joblevelManagerSaga(),
    sourcecvManagerSaga(),
    schoolManagerSaga(),
    statuscvManagerSaga(),
    blacklistManagerSaga(),
    profileManagerSaga(),
    viewGroupManagerSaga(),
    groupAPIManagerSaga(),
    skillManagerSaga(),
    addressManagerSaga(),
    reasonRejectManagerSaga(),
    scheduleManagerSaga(),
    recruitmentManagerSaga(),
    commonSaga.checkErrorAsync(),
  ]);
}
