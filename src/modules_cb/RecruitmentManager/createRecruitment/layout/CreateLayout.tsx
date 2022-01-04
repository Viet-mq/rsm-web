import React, {useEffect, useState} from 'react';
import {Badge, Button, Dropdown, Form, Layout, Menu} from 'antd';
import env from 'src/configs/env';
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Redirect, Route, Switch, useHistory, Link} from "react-router-dom";
import {RootState} from "../../../../redux/reducers";
import Loading from "../../../../components/Loading";
import Header from './Header';
import {ImArrowLeft2} from "react-icons/all";
import Nav from "./Nav";
import InformationForm from "../components/Information";
import Process from "../components/Process";
import Interviewers from "../components/Interviewers";
import {createRecruitment, resetCreateSteps} from "../../redux/actions";

const {Sider} = Layout;

const mapStateToProps = (state: RootState) => ({
  checkValidate: state.recruitmentManager.createSteps,
  createSteps: state.recruitmentManager.createSteps

})

const connector = connect(mapStateToProps, {
  resetCreateSteps,
  createRecruitment
});

type ReduxProps = ConnectedProps<typeof connector>;

interface LayoutProps extends FormComponentProps, ReduxProps {
  path:string;
}

const CreateLayout = (props: LayoutProps) => {

  const menu = (
    <Menu className='detail-action'>
      <Menu.Item key="1">
        <div>
          <Badge color={"#87d068"}/>
          Công khai
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div>
          <Badge color={"#108ee9"}/>
          Nội bộ
        </div>
      </Menu.Item>
    </Menu>
  );

  function btnCreateClicked() {
    console.log("props.createSteps.request:",props.createSteps.request)
    // props.createRecruitment(props.createSteps.request)
  }

  return (
    <div className="recruitment-container">
      <Layout>
        <Layout>
          <Header>
            <Link to={`/recruitment-manager`} onClick={props.resetCreateSteps} style={{display:"flex", color:"black"}}>
            <ImArrowLeft2 size={20}/>
            </Link>
            <span>Thêm mới</span>
          </Header>
        </Layout>
        <Layout>
          <Sider theme="light" width={200}>
            <Nav/>
          </Sider>
          <div className='content-right'>
            <Layout>
              <div style={{display: "flex", alignItems: "self-start"}}>
                <Switch>
                  <Route path={`/recruitment-manager/${props.path}/information`}>
                    <InformationForm/>
                  </Route>
                  <Route path={`/recruitment-manager/${props.path}/process`}>
                    <Process/>
                  </Route>
                  <Route path={`/recruitment-manager/${props.path}/interviewers`}>
                    <Interviewers/>
                  </Route>
                  <Redirect exact from={`/recruitment-manager/${props.path}/`} to={`/recruitment-manager/${props.path}/information`}/>
                </Switch>
                <div className="region-action ">
                  <Dropdown.Button onClick={btnCreateClicked} overlay={menu} style={{marginBottom: 15}} size='large' type={"primary"} className={props.checkValidate.isValidate ?"":"button-color"}>
                    Lưu và đăng tin
                  </Dropdown.Button>
                  <Button className="btn-save" size='large'>Lưu nháp</Button>
                </div>
              </div>

            </Layout>
          </div>
        </Layout>
      </Layout>

    </div>
  );

};

export default connector(Form.create<LayoutProps>()(CreateLayout));
