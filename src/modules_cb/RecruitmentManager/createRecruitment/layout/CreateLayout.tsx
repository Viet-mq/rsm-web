import React from 'react';
import {Badge, Button, Dropdown, Form, Layout, Menu} from 'antd';
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {RootState} from "../../../../redux/reducers";
import Header from './Header';
import {ImArrowLeft2} from "react-icons/all";
import Nav from "./Nav";
import InformationForm from "../components/Information";
import Process from "../components/Process";
import Interviewers from "../components/Interviewers";
import {createRecruitment, resetCreateSteps, updateRecruitment} from "../../redux/actions";
import {UpdateRecruitmentRequest} from "../../types";

const {Sider} = Layout;

const mapStateToProps = (state: RootState) => ({
  checkValidate: state.recruitmentManager.createSteps,
  createSteps: state.recruitmentManager.createSteps,
  dataUpdate: state.recruitmentManager.update.dataUpdate

})

const connector = connect(mapStateToProps, {
  resetCreateSteps,
  createRecruitment,
  updateRecruitment
});

type ReduxProps = ConnectedProps<typeof connector>;

interface LayoutProps extends FormComponentProps, ReduxProps {
  path: string;
}

const CreateLayout = (props: LayoutProps) => {
  const location = useLocation();
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
    // console.log("props.createSteps.request:", props.createSteps.request)
    if (location.pathname.includes("edit")) {
      let req: UpdateRecruitmentRequest = {
        address: props.dataUpdate?.addressId,
        deadLine: props.dataUpdate?.deadLine,
        id: props.dataUpdate?.id,
        interest: props.dataUpdate?.interest,
        interviewProcess: props.dataUpdate?.interviewProcess,
        interviewer: props.dataUpdate?.interviewer.map((item:any)=>item.username),
        job: props.dataUpdate?.jobId,
        jobDescription: props.dataUpdate?.jobDescription,
        quantity: props.dataUpdate?.quantity,
        requirementOfJob: props.dataUpdate?.requirementOfJob,
        talentPool: props.dataUpdate?.talentPoolId,
        title: props.dataUpdate?.title,
        typeOfJob: props.dataUpdate?.typeOfJob,
        detailOfSalary: props.dataUpdate?.detailOfSalary,
        from: props.dataUpdate?.from,
        to: props.dataUpdate?.to,
      }
      props.updateRecruitment(req)
    } else {
      props.createRecruitment(props.createSteps.request)
    }
  }

  return (
    <div className="recruitment-container">
      <Layout>
        <Layout>
          <Header>
            <Link to={`/recruitment-manager`} onClick={props.resetCreateSteps}
                  style={{display: "flex", color: "black"}}>
              <ImArrowLeft2 size={20}/>
            </Link>
            <span>{props.path === 'create' ? 'Thêm mới' : "Sửa tin"}</span>
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
                  <Redirect exact from={`/recruitment-manager/${props.path}/`}
                            to={`/recruitment-manager/${props.path}/information`}/>
                </Switch>
                <div className="region-action ">
                  <Dropdown.Button onClick={btnCreateClicked} overlay={menu} style={{marginBottom: 15}} size='large'
                                   type={"primary"} className={props.checkValidate.isValidate ? "" : "button-color"}>
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
