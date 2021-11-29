import {combineReducers} from 'redux';

import auth, {AuthModuleState} from '../modules/Auth/redux/reducers';
import dashboard, {DashboardModuleState} from '../modules/Dashboard/redux/reducers';
import accountManager, {AccountManagerModuleState} from "../modules_cb/AccountManager/redux/reducers";
import viewManager, {ViewManagerModuleState} from "../modules_cb/ViewManager/redux/reducers";
import apiManager, {APIManagerModuleState} from "../modules_cb/APIManager/redux/reducers";
import apiRoleGroupManager, {ApiRoleGroupModuleState} from "../modules_cb/ApiRoleGroupManager/redux/reducers";
import jobManager,{JobManagerModuleState} from "../modules_cb/JobManager/redux/reducers";
import departmentManager,{DepartmentManagerModuleState} from "../modules_cb/DepartmentManager/redux/reducers";
import schoolManager,{SchoolManagerModuleState} from "../modules_cb/SchoolManager/redux/reducers";
import joblevelManager,{JobLevelManagerModuleState} from "../modules_cb/JobLevelManager/redux/reducers";
import sourcecvManager,{SourceCVManagerModuleState} from "../modules_cb/SourceCVManager/redux/reducers";
import statuscvManager,{StatusCVManagerModuleState} from "../modules_cb/StatusCVManager/redux/reducers";
import blacklistManager,{BlacklistManagerModuleState} from "../modules_cb/BlacklistManager/redux/reducers";
import profileManager,{ProfileManagerModuleState} from "../modules_cb/ProfileManager/redux/reducers";
import viewGroupManager, {ViewGroupManagerModuleState} from "../modules_cb/ViewGroupManager/redux/reducers";
import groupAPIManager,{GroupAPIModuleState} from "../modules_cb/GroupAPIManager/redux/reducers";
import talentPoolManager,{TalentPoolManagerModuleState} from "../modules_cb/TalentPoolManager/redux/reducers";
import skillManager,{SkillManagerModuleState} from "../modules_cb/SkillManager/redux/reducers";
import addressManager,{AddressManagerModuleState} from "../modules_cb/AddressManager/redux/reducers";
import reasonRejectManager,{ReasonRejectManagerModuleState} from "../modules_cb/ReasonRejectManager/redux/reducers";
import scheduleManager,{ScheduleManagerModuleState} from "../modules_cb/ScheduleManager/redux/reducers";
import recruitmentManager,{RecruitmentManagerModuleState} from "../modules_cb/RecruitmentManager/redux/reducers";

export interface RootState {
  auth: AuthModuleState;
  dashboard: DashboardModuleState;
  accountManager: AccountManagerModuleState,
  viewManager: ViewManagerModuleState,
  apiManager: APIManagerModuleState,
  apiRoleGroupManager: ApiRoleGroupModuleState,
  jobManager:JobManagerModuleState,
  talentPoolManager:TalentPoolManagerModuleState,
  departmentManager:DepartmentManagerModuleState,
  schoolManager:SchoolManagerModuleState,
  joblevelManager:JobLevelManagerModuleState,
  sourcecvManager: SourceCVManagerModuleState,
  statuscvManager: StatusCVManagerModuleState,
  blacklistManager: BlacklistManagerModuleState,
  profileManager: ProfileManagerModuleState,
  viewGroupManager:ViewGroupManagerModuleState,
  groupAPIManager:GroupAPIModuleState,
  skillManager:SkillManagerModuleState,
  addressManager:AddressManagerModuleState,
  reasonRejectManager:ReasonRejectManagerModuleState,
  scheduleManager: ScheduleManagerModuleState,
  recruitmentManager:RecruitmentManagerModuleState
}

export default combineReducers<RootState>({
  auth,
  dashboard,
  accountManager,
  viewManager,
  apiManager,
  apiRoleGroupManager,
  jobManager,
  joblevelManager,
  schoolManager,
  departmentManager,
  sourcecvManager,
  statuscvManager,
  blacklistManager,
  profileManager,
  viewGroupManager,
  groupAPIManager,
  talentPoolManager,
  skillManager,
  addressManager,
  reasonRejectManager,
  scheduleManager,
  recruitmentManager

});
