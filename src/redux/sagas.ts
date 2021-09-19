import {all} from 'redux-saga/effects';
import authSaga from '../modules/Auth/redux/sagas';
import dashboardSaga from '../modules/Dashboard/redux/sagas';
import chatBotManagerSaga from '../modules_cb/ChatBotManager/redux/sagas';
import intentManagerSaga from '../modules_cb/IntentManager/redux/sagas';
import entityManagerSaga from '../modules_cb/EntityManager/redux/sagas';
import contentManagerSaga from '../modules_cb/ContentManager/redux/sagas';
import accountManagerSaga from '../modules_cb/AccountManager/redux/sagas';
import viewManagerSaga from '../modules_cb/ViewManager/redux/sagas';
import apiManagerSaga from '../modules_cb/APIManager/redux/sagas';
import apiGroupManagerSaga from '../modules_cb/ApiRoleGroupManager/redux/sagas';
import scriptManagerSaga from '../modules_cb/ScriptManager/redux/sagas';
import jobManagerSaga from '../modules_cb/JobManager/redux/sagas';
import departmentManagerSaga from '../modules_cb/DepartmentManager/redux/sagas';
import joblevelManagerSaga from '../modules_cb/JobLevelManager/redux/sagas';
import sourcecvManagerSaga from '../modules_cb/SourceCVManager/redux/sagas';

import * as commonSaga from './common-saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    dashboardSaga(),
    chatBotManagerSaga(),
    intentManagerSaga(),
    entityManagerSaga(),
    contentManagerSaga(),
    accountManagerSaga(),
    viewManagerSaga(),
    apiManagerSaga(),
    apiGroupManagerSaga(),
    scriptManagerSaga(),
    jobManagerSaga(),
    departmentManagerSaga(),
    joblevelManagerSaga(),
    sourcecvManagerSaga(),
    commonSaga.checkErrorAsync(),
  ]);
}
