import React,{useEffect} from 'react';
import {Redirect, Route, Switch,useLocation} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import Dashboard from './modules/Dashboard/index';

import {RootState} from './redux/reducers';

import ChatBotManagerPage from './modules_cb/ChatBotManager/pages/ChatBotManagerPage'
import EntityManagerPage from "./modules_cb/EntityManager/pages/EntityManagerPage";
import IntentManagerPage from "./modules_cb/IntentManager/pages/IntentManagerPage";
import ContentManagerPage from "./modules_cb/ContentManager/pages/ContentManagerPage";
import AccountManagerPages from "./modules_cb/AccountManager/pages/AccountManagerPages";
import ViewManagerPage from "./modules_cb/ViewManager/pages/ViewManagerPage";
import APIManagerPage from "./modules_cb/APIManager/pages/APIManagerPage";
import ScriptManagerPage from "./modules_cb/ScriptManager/pages/ScriptManagerPage";
import JobManagerPages from "./modules_cb/JobManager/pages/JobManagerPages";
import DepartmentManagerPages from "./modules_cb/DepartmentManager/pages/DepartmentManagerPages";
import JobLevelManagerPages from "./modules_cb/JobLevelManager/pages/JobLevelManagerPages";
import SchoolManagerPages from "./modules_cb/SchoolManager/pages/SchoolManagerPages";
import SourceCVManagerPages from "./modules_cb/SourceCVManager/pages/SourceCVManagerPages";
import StatusCVManagerPages from "./modules_cb/StatusCVManager/pages/StatusCVManagerPages";
import ProfileManagerPages from "./modules_cb/ProfileManager/pages/ProfileManagerPages";
import {showFormDetail} from "./modules_cb/ProfileManager/redux/actions";
import {DetailCV} from "./modules_cb/ProfileManager/types";

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
        <Route path="/chatbot-manager" component={ChatBotManagerPage} isLogin={props.isLogin}/>
        <Route path="/statistic" component={ChatBotManagerPage} isLogin={props.isLogin}/>
        <Route path="/history" component={ChatBotManagerPage} isLogin={props.isLogin}/>
        <Route path="/support" component={ChatBotManagerPage} isLogin={props.isLogin}/>
        <Route path="/account-manager" component={AccountManagerPages} isLogin={props.isLogin}/>
        <Route path="/content-manager" component={ContentManagerPage} isLogin={props.isLogin}/>
        <Route path="/intent-manager" component={IntentManagerPage} isLogin={props.isLogin}/>
        <Route path="/entity-manager" component={EntityManagerPage} isLogin={props.isLogin}/>
        <Route path="/follow-manager" component={ScriptManagerPage} isLogin={props.isLogin}/>
        <Route path="/view-manager" component={ViewManagerPage} isLogin={props.isLogin}/>
        <Route path="/api-manager" component={APIManagerPage} isLogin={props.isLogin}/>
        <Route path="/job-manager" component={JobManagerPages} isLogin={props.isLogin}/>
        <Route path="/department-manager" component={DepartmentManagerPages} isLogin={props.isLogin}/>
        <Route path="/joblevel-manager" component={JobLevelManagerPages} isLogin={props.isLogin}/>
        <Route path="/sourcecv-manager" component={SourceCVManagerPages} isLogin={props.isLogin}/>
        <Route path="/statuscv-manager" component={StatusCVManagerPages} isLogin={props.isLogin}/>
        <Route path="/school-manager" component={SchoolManagerPages} isLogin={props.isLogin}/>
        <Route path="/profile-manager" component={ProfileManagerPages} isLogin={props.isLogin}/>
        <Redirect exact from="/*" to={'/home'}/>
      </Switch>
    </div>
  );
};

export default connector(Routes);
