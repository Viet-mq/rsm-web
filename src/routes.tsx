import React, {useEffect} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import Dashboard from './modules/Dashboard/index';

import {RootState} from './redux/reducers';

import AccountManagerPages from "./modules_cb/AccountManager/pages/AccountManagerPages";
import ViewManagerPage from "./modules_cb/ViewManager/pages/ViewManagerPage";
import APIManagerPage from "./modules_cb/APIManager/pages/APIManagerPage";
import JobManagerPages from "./modules_cb/JobManager/pages/JobManagerPages";
import DepartmentManagerPages from "./modules_cb/DepartmentManager/pages/DepartmentManagerPages";
import JobLevelManagerPages from "./modules_cb/JobLevelManager/pages/JobLevelManagerPages";
import SchoolManagerPages from "./modules_cb/SchoolManager/pages/SchoolManagerPages";
import SourceCVManagerPages from "./modules_cb/SourceCVManager/pages/SourceCVManagerPages";
import StatusCVManagerPages from "./modules_cb/StatusCVManager/pages/StatusCVManagerPages";
import BlacklistManagerPages from "./modules_cb/BlacklistManager/pages/BlacklistManagerPages";
import ProfileManagerPages from "./modules_cb/ProfileManager/pages/ProfileManagerPages";
import {showFormDetail} from "./modules_cb/ProfileManager/redux/actions";
import {DetailCV} from "./modules_cb/ProfileManager/types";
import ViewGroupManagerPage from './modules_cb/ViewGroupManager/pages/ViewGroupManagerPage';
import GroupAPIManagerPage from "./modules_cb/GroupAPIManager/pages/GroupAPIManagerPage";
import TalentPoolManagerPages from "./modules_cb/TalentPoolManager/pages/TalentPoolManagerPages";
import ScheduleManagerPages from "./modules_cb/ScheduleManager/pages/ScheduleManagerPages";
import SkillManagerPages from "./modules_cb/SkillManager/pages/SkillManagerPages";
import AddressManagerPages from "./modules_cb/AddressManager/pages/AddressManagerPages";
import ReasonRejectManagerPages from "./modules_cb/ReasonRejectManager/pages/ReasonRejectManagerPages";
import RecruitmentManagerPages from "./modules_cb/RecruitmentManager/pages/RecruitmentManagerPages";
import CreateLayout from "./modules_cb/RecruitmentManager/createRecruitment/layout/CreateLayout";
import DetailRecruitment from "./modules_cb/RecruitmentManager/components/DetailRecruitment";
import EmailManagerPages from "./modules_cb/EmailManager/pages/EmailManagerPages";
import UpdateEmailForm from "./modules_cb/EmailManager/components/UpdateEmailForm";
import CreateEmailForm from "./modules_cb/EmailManager/components/CreateEmailForm";

const mapStateToProps = (state: RootState) => {
  return {
    isLogin: !!state.auth.auth.data?.access_token,
    auth: state.auth.auth.data,
  };
};

const connector = connect(mapStateToProps, {
  showFormDetail
});
type PropsFromRedux = ConnectedProps<typeof connector>;

const Routes = (props: PropsFromRedux) => {
  const location = useLocation();

  useEffect(() => {
    let req: DetailCV = {
      show_detail: false,
      general: 24,
      detail: 0,
    }
    props.showFormDetail(req);
  }, [location]);

  return (
    <div>
      <Switch>
        <Route path="/home/:selectedTime/:employeeId?" component={Dashboard} isLogin={props.isLogin}/>
        <Route path="/account-manager" component={AccountManagerPages} isLogin={props.isLogin}/>
        <Route path="/view-manager" component={ViewManagerPage} isLogin={props.isLogin}/>
        <Route path="/api-manager" component={APIManagerPage} isLogin={props.isLogin}/>
        <Route path="/job-manager" component={JobManagerPages} isLogin={props.isLogin}/>
        <Route path="/department-manager" component={DepartmentManagerPages} isLogin={props.isLogin}/>
        <Route path="/joblevel-manager" component={JobLevelManagerPages} isLogin={props.isLogin}/>
        <Route path="/sourcecv-manager" component={SourceCVManagerPages} isLogin={props.isLogin}/>
        <Route path="/statuscv-manager" component={StatusCVManagerPages} isLogin={props.isLogin}/>
        <Route path="/blacklist-manager" component={BlacklistManagerPages} isLogin={props.isLogin}/>
        <Route path="/school-manager" component={SchoolManagerPages} isLogin={props.isLogin}/>
        <Route path="/profile-manager" component={ProfileManagerPages} isLogin={props.isLogin}/>
        <Route path="/view-group-manager" component={ViewGroupManagerPage} isLogin={props.isLogin}/>
        <Route path="/group-api-manager" component={GroupAPIManagerPage} isLogin={props.isLogin}/>
        <Route path="/talent-pool-manager" exact={true} component={TalentPoolManagerPages} isLogin={props.isLogin}/>
        <Route path="/schedule" component={ScheduleManagerPages} isLogin={props.isLogin}/>
        <Route path="/skill-manager" component={SkillManagerPages} isLogin={props.isLogin}/>
        <Route path="/reason-reject-manager" component={ReasonRejectManagerPages} isLogin={props.isLogin}/>
        <Route path="/address-manager" component={AddressManagerPages} isLogin={props.isLogin}/>
        <Route path="/email-manager" exact component={EmailManagerPages} isLogin={props.isLogin}/>
        <Route path="/email-manager/detail"  component={UpdateEmailForm} isLogin={props.isLogin}/>
        <Route path="/email-manager/create"  component={CreateEmailForm} isLogin={props.isLogin}/>
        <Route path="/recruitment-manager" exact component={RecruitmentManagerPages} isLogin={props.isLogin}/>
        <Route path="/recruitment-manager/create" isLogin={props.isLogin}
               render={(props: any) => (<CreateLayout path={"create"}/>)}/>
        <Route path="/recruitment-manager/edit" render={(props: any) => (<CreateLayout path={"edit"}/>)}
               isLogin={props.isLogin}/>
        <Route path={`/recruitment-manager/detail/:idRecruitment`} exact={true}
               render={(props: any) => (<DetailRecruitment {...props}/>)}
               isLogin={props.isLogin}/>
        <Route path={`/talent-pool-manager/:idTalentPool`} exact={true}
               render={(props: any) => (<ProfileManagerPages {...props}/>)}
               isLogin={props.isLogin}/>
        <Redirect exact from="/*" to={'/home'}/>
      </Switch>
    </div>
  );
};

export default connector(Routes);
