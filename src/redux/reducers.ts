import {combineReducers} from 'redux';

import auth, {AuthModuleState} from '../modules/Auth/redux/reducers';
import accountManager, {AccountManagerModuleState} from "../modules_cb/AccountManager/redux/reducers";
import viewManager, {ViewManagerModuleState} from "../modules_cb/ViewManager/redux/reducers";
import apiManager, {APIManagerModuleState} from "../modules_cb/APIManager/redux/reducers";
import jobManager, {JobManagerModuleState} from "../modules_cb/JobManager/redux/reducers";
import departmentManager, {DepartmentManagerModuleState} from "../modules_cb/DepartmentManager/redux/reducers";
import schoolManager, {SchoolManagerModuleState} from "../modules_cb/SchoolManager/redux/reducers";
import joblevelManager, {JobLevelManagerModuleState} from "../modules_cb/JobLevelManager/redux/reducers";
import sourcecvManager, {SourceCVManagerModuleState} from "../modules_cb/SourceCVManager/redux/reducers";
import statuscvManager, {StatusCVManagerModuleState} from "../modules_cb/StatusCVManager/redux/reducers";
import blacklistManager, {BlacklistManagerModuleState} from "../modules_cb/BlacklistManager/redux/reducers";
import profileManager, {ProfileManagerModuleState} from "../modules_cb/ProfileManager/redux/reducers";
import talentPoolManager, {TalentPoolManagerModuleState} from "../modules_cb/TalentPoolManager/redux/reducers";
import skillManager, {SkillManagerModuleState} from "../modules_cb/SkillManager/redux/reducers";
import addressManager, {AddressManagerModuleState} from "../modules_cb/AddressManager/redux/reducers";
import reasonRejectManager, {ReasonRejectManagerModuleState} from "../modules_cb/ReasonRejectManager/redux/reducers";
import scheduleManager, {ScheduleManagerModuleState} from "../modules_cb/ScheduleManager/redux/reducers";
import recruitmentManager, {RecruitmentManagerModuleState} from "../modules_cb/RecruitmentManager/redux/reducers";
import emailManager, {EmailManagerModuleState} from "../modules_cb/EmailManager/redux/reducers";
import reminderManager, {ReminderManagerModuleState} from "../modules_cb/ReminderManager/redux/reducers";
import dashboardManager, {DashBoardModuleState} from "../modules_cb/DashboardManager/redux/reducers";
import apiRolesManager,{APIRolesManagerModuleState} from "../modules_cb/APIRolesManager/redux/reducers";
import viewRolesManager,{ViewRolesManagerModuleState} from "../modules_cb/ViewRolesManager/redux/reducers";

export interface RootState {
  auth: AuthModuleState;
  accountManager: AccountManagerModuleState,
  viewManager: ViewManagerModuleState,
  apiManager: APIManagerModuleState,
  jobManager: JobManagerModuleState,
  talentPoolManager: TalentPoolManagerModuleState,
  departmentManager: DepartmentManagerModuleState,
  schoolManager: SchoolManagerModuleState,
  joblevelManager: JobLevelManagerModuleState,
  sourcecvManager: SourceCVManagerModuleState,
  statuscvManager: StatusCVManagerModuleState,
  blacklistManager: BlacklistManagerModuleState,
  profileManager: ProfileManagerModuleState,
  skillManager: SkillManagerModuleState,
  addressManager: AddressManagerModuleState,
  reasonRejectManager: ReasonRejectManagerModuleState,
  scheduleManager: ScheduleManagerModuleState,
  recruitmentManager: RecruitmentManagerModuleState,
  emailManager: EmailManagerModuleState,
  reminderManager: ReminderManagerModuleState,
  dashboardManager: DashBoardModuleState,
  apiRolesManager: APIRolesManagerModuleState,
  viewRolesManager: ViewRolesManagerModuleState,
}

export default combineReducers<RootState>({
  auth,

  accountManager,
  viewManager,
  apiManager,
  jobManager,
  joblevelManager,
  schoolManager,
  departmentManager,
  sourcecvManager,
  statuscvManager,
  blacklistManager,
  profileManager,
  talentPoolManager,
  skillManager,
  addressManager,
  reasonRejectManager,
  scheduleManager,
  recruitmentManager,
  emailManager,
  reminderManager,
  dashboardManager,
  apiRolesManager,
  viewRolesManager,

});
