import {combineReducers} from 'redux';

import auth, {AuthModuleState} from '../modules/Auth/redux/reducers';
import dashboard, {DashboardModuleState} from '../modules/Dashboard/redux/reducers';
import chatBotManager, {ChatBotModuleState} from '../modules_cb/ChatBotManager/redux/reducers';
import intentManager, {IntentManagerModuleState} from '../modules_cb/IntentManager/redux/reducers';
import entityManager, {EntityChatBotModuleState} from '../modules_cb/EntityManager/redux/reducers';
import contentManager, {ContentManagerModuleState} from "../modules_cb/ContentManager/redux/reducers";
import accountManager, {AccountManagerModuleState} from "../modules_cb/AccountManager/redux/reducers";
import viewManager, {ViewManagerModuleState} from "../modules_cb/ViewManager/redux/reducers";
import apiManager, {APIManagerModuleState} from "../modules_cb/APIManager/redux/reducers";
import apiRoleGroupManager, {ApiRoleGroupModuleState} from "../modules_cb/ApiRoleGroupManager/redux/reducers";
import scriptManager, {ScriptManagerModuleState} from "../modules_cb/ScriptManager/redux/reducers";

export interface RootState {
  auth: AuthModuleState;
  dashboard: DashboardModuleState;
  chatBotManager: ChatBotModuleState;
  intentManager: IntentManagerModuleState,
  entityManager: EntityChatBotModuleState,
  contentManager: ContentManagerModuleState,
  accountManager: AccountManagerModuleState,
  viewManager: ViewManagerModuleState,
  apiManager: APIManagerModuleState,
  apiRoleGroupManager: ApiRoleGroupModuleState,
  scriptManager: ScriptManagerModuleState,
}

export default combineReducers<RootState>({
  auth,
  dashboard,
  chatBotManager,
  intentManager,
  entityManager,
  contentManager,
  accountManager,
  viewManager,
  apiManager,
  apiRoleGroupManager,
  scriptManager
});
