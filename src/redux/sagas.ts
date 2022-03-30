import {all} from 'redux-saga/effects';
import authSaga from '../modules/Auth/redux/sagas';
import accountManagerSaga from '../modules_cb/AccountManager/redux/sagas';
import viewManagerSaga from '../modules_cb/ViewManager/redux/sagas';
import apiManagerSaga from '../modules_cb/APIManager/redux/sagas';
import jobManagerSaga from '../modules_cb/JobManager/redux/sagas';
import talentPoolManagerSaga from '../modules_cb/TalentPoolManager/redux/sagas';
import departmentManagerSaga from '../modules_cb/DepartmentManager/redux/sagas';
import joblevelManagerSaga from '../modules_cb/JobLevelManager/redux/sagas';
import sourcecvManagerSaga from '../modules_cb/SourceCVManager/redux/sagas';
import statuscvManagerSaga from '../modules_cb/StatusCVManager/redux/sagas';
import blacklistManagerSaga from '../modules_cb/BlacklistManager/redux/sagas';
import schoolManagerSaga from '../modules_cb/SchoolManager/redux/sagas';
import profileManagerSaga from '../modules_cb/ProfileManager/redux/sagas';
import skillManagerSaga from '../modules_cb/SkillManager/redux/sagas'
import addressManagerSaga from '../modules_cb/AddressManager/redux/sagas'
import reasonRejectManagerSaga from '../modules_cb/ReasonRejectManager/redux/sagas'
import scheduleManagerSaga from '../modules_cb/ScheduleManager/redux/sagas';
import recruitmentManagerSaga from '../modules_cb/RecruitmentManager/redux/sagas';
import emailManagerSaga from '../modules_cb/EmailManager/redux/sagas';
import reminderManagerSaga from '../modules_cb/ReminderManager/redux/sagas';
import dashboardManagerSaga from '../modules_cb/DashboardManager/redux/sagas';
import apiRolesManagerSaga from '../modules_cb/APIRolesManager/redux/sagas';
import rolesManagerSaga from '../modules_cb/RolesManager/redux/sagas';
import viewRolesManagerSaga from '../modules_cb/ViewRolesManager/redux/sagas';
import * as commonSaga from './common-saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    accountManagerSaga(),
    viewManagerSaga(),
    apiManagerSaga(),
    talentPoolManagerSaga(),
    jobManagerSaga(),
    departmentManagerSaga(),
    joblevelManagerSaga(),
    sourcecvManagerSaga(),
    schoolManagerSaga(),
    statuscvManagerSaga(),
    blacklistManagerSaga(),
    profileManagerSaga(),
    skillManagerSaga(),
    addressManagerSaga(),
    reasonRejectManagerSaga(),
    scheduleManagerSaga(),
    recruitmentManagerSaga(),
    emailManagerSaga(),
    reminderManagerSaga(),
    dashboardManagerSaga(),
    rolesManagerSaga(),
    apiRolesManagerSaga(),
    viewRolesManagerSaga(),
    commonSaga.checkErrorAsync(),
  ]);
}
