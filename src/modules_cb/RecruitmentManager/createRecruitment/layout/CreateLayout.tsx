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
  recruitmentManager: state.recruitmentManager

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
  const {createSteps,update}=props.recruitmentManager
  const location = useLocation();
  const menu = (<Menu className='detail-action'>
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
    </Menu>);

  function btnCreateClicked() {
    if (location.pathname.includes("edit")) {
      let req: UpdateRecruitmentRequest = {
        address: update.dataUpdate?.addressId,
        deadLine: update.dataUpdate?.deadLine,
        id: update.dataUpdate?.id,
        interest: update.dataUpdate?.interest,
        interviewProcess: update.dataUpdate?.interviewProcess,
        interviewer: update.dataUpdate?.interviewer?.map((item:any)=>item.username),
        job: update.dataUpdate?.jobId,
        department: update.dataUpdate?.departmentId,
        jobDescription: update.dataUpdate?.jobDescription,
        quantity: update.dataUpdate?.quantity,
        requirementOfJob: update.dataUpdate?.requirementOfJob,
        talentPool: update.dataUpdate?.talentPoolId,
        title: update.dataUpdate?.title,
        typeOfJob: update.dataUpdate?.typeOfJob,
        detailOfSalary: update.dataUpdate?.detailOfSalary,
        from: update.dataUpdate?.from,
        to: update.dataUpdate?.to,
        salaryDescription:update.dataUpdate?.salaryDescription
      }
      props.updateRecruitment(req)
    } else {
      props.createRecruitment(createSteps.request)
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
                                   type={"primary"} className={createSteps.isValidate ? "" : "button-color"}>
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
