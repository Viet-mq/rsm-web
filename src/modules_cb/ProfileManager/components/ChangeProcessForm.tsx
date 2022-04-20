import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Form, Modal, Radio} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import {changeProcess, showChangeProcessForm, showEmailCreateForm} from "../redux/actions";
import {ChangeProcessRequest, ProcessForm} from "../types";
import 'react-quill/dist/quill.snow.css';
import {plainOptions} from "../../../helpers/utilsFunc";
import CreateEmailForm from "./CreateEmailForm";
import { getListRecruitment as getListRecruitmentApi } from "src/modules_cb/RecruitmentManager/redux/services/apis";


const CheckboxGroup = Checkbox.Group;

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,

})

const connector = connect(mapStateToProps,
  {
    showChangeProcessForm,
    changeProcess,
    showEmailCreateForm
  })

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function ChangeProcessForm(props: IProps) {
  const fontWeight = {
    fontWeight: 500
  }
  const {showForm} = props.profileManager
  const [process, setProcess] = useState<any>('')
  const [checked, setChecked] = useState<any>({
    candidate: {
      checkedList: 'no',
    },
    members: {
      checkedList: 'no',
    },
    interviewers: {
      checkedList: [],
      indeterminate: false,
      checkAll: false
    },
    presenter: {
      checkedList: 'no',
    }
  })
  const [reqCreate, setReqCreate] = useState<ChangeProcessRequest | any>()
  const [recruitment, setRecruitment] = useState<any>()

  useEffect(() => {
    if (showForm.show_change_process) {
      getListRecruitmentApi({id: showForm.change_process?.recruitmentId}).then((rs: any) => {setRecruitment(rs)})
      setProcess(showForm.change_process?.statusCVId)
    }
  }, [showForm.show_change_process])

  const handleCloseForm = () => {
    props.showChangeProcessForm(false)

  }

  function btnChangeProcessClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let processForm: ProcessForm = ({
          idProfile: showForm.change_process?.idProfile,
          recruitmentId: showForm.change_process?.recruitmentId,
          statusCVId: process
        })

        let req: ChangeProcessRequest = ({
          changeProcess: processForm,
        })
        props.changeProcess(req, false)
        return;
      }
    });

  }

  function onBtnContinueCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let processForm: ProcessForm = ({
          idProfile: showForm.change_process?.idProfile,
          recruitmentId: showForm.change_process?.recruitmentId,
          statusCVId: process
        })
        setReqCreate(processForm)
        props.showEmailCreateForm(true)
        return;
      }
    });

  }

  function handleChangeProcess(event: any) {
    setProcess(event.target.value)
  }

  function onCheckInterviewersChange(checkedList: any) {
    setChecked({
        ...checked,
        interviewers: {
          checkedList: checkedList,
          indeterminate: !!checkedList.length && checkedList.length < plainOptions.interviewers.length,
          checkAll: checkedList.length === plainOptions.interviewers.length,
        }
      }
    );
  };

  function onCheckPresenterChange(event: any) {
    setChecked({
        ...checked,
        presenter: {
          checkedList: event.target.value,
        }
      }
    );
  };

  function onCheckMembersChange(event: any) {
    setChecked({
        ...checked,
        members: {
          checkedList: event.target.value,
        }
      }
    );
  };

  function onCheckCandidateChange(event: any) {
    setChecked({
        ...checked,
        candidate: {
          checkedList: event.target.value,
        }
      }
    );
  };

  function onCheckAllInterviewersChange(e: any) {
    setChecked({
      ...checked,
      interviewers: {
        checkedList: e.target.checked ? plainOptions.interviewers.map((item: any) => item.id) : [],
        indeterminate: false,
        checkAll: e.target.checked,
      }
    });
  };

  return (
    <>
      <Modal
        zIndex={2}
        maskClosable={false}
        visible={showForm.show_change_process}
        centered={true}
        width="700px"
        className="custom"
        afterClose={handleCloseForm}
        onCancel={handleCloseForm}
        footer={""}>
        <div style={{overflow: "auto", height: 555}}>
          <div className="schedule-detail" style={{paddingBottom: 0}}>
            <div className="schedule-detail-head">
              <div className="schedule-detail-title">Chuyển vòng</div>
            </div>
            <div className="schedule-detail-content">
              <div style={{...fontWeight}}>Vòng tuyển dụng</div>

              <Radio.Group onChange={handleChangeProcess} value={process}>
                {recruitment?.rows[0]?.interviewProcess.map((item: any, index: any) => {
                  return <Radio key={index} value={item.id} className="flex-items-center">
                    {item.name}
                  </Radio>
                })}
              </Radio.Group>

            </div>
          </div>

          <div style={{padding: "0 24px 24px"}}>
            <div style={{fontWeight: 500}}>Gửi mail cho hội đồng tuyển dụng</div>
            <div style={{display: "flex"}}>
              <div>
                <Checkbox
                  indeterminate={checked.interviewers.indeterminate}
                  onChange={onCheckAllInterviewersChange}
                  checked={checked.interviewers.checkAll}
                >
                  Tất cả
                </Checkbox>
              </div>
              <CheckboxGroup
                value={checked.interviewers.checkedList}
                onChange={onCheckInterviewersChange}
              >
                {plainOptions.interviewers.map((item: any, index: any) =>
                  <Checkbox key={item.id} value={item.id}>{item.name}</Checkbox>
                )}
              </CheckboxGroup>
            </div>
            <br/>

            <div style={{fontWeight: 500}}>Gửi mail cho người giới thiệu</div>
            <div>
              <Radio.Group
                value={checked.presenter.checkedList}
                onChange={onCheckPresenterChange}
              >
                {plainOptions.members.map((item: any, index: any) =>
                  <Radio key={item.id} value={item.id}>{item.name}</Radio>
                )}
              </Radio.Group>
            </div>
            <br/>

            <div style={{fontWeight: 500}}>Gửi mail cho ứng viên</div>
            <div><Radio.Group
              value={checked.candidate.checkedList}
              onChange={onCheckCandidateChange}
            >
              {plainOptions.candidate.map((item: any, index: any) =>
                <Radio key={item.id} value={item.id}>{item.name}</Radio>
              )}
            </Radio.Group>
            </div>
            <br/>

            <div style={{fontWeight: 500}}>Gửi mail cho cán bộ liên quan</div>
            <div>
              <Radio.Group
                value={checked.members.checkedList}
                onChange={onCheckMembersChange}
              >
                {plainOptions.members.map((item: any, index: any) =>
                  <Radio key={item.id} value={item.id}>{item.name}</Radio>
                )}
              </Radio.Group>
            </div>
            <br/>

          </div>
        </div>

        <div className="footer-right">
          <Button onClick={handleCloseForm}>Hủy</Button>
          {checked.candidate.checkedList === "yes" ||
          checked.members.checkedList === "yes" ||
          checked.interviewers.checkedList.length > 0 ||
          checked.presenter.checkedList === "yes" ?
            <Button type={"primary"} className="ml-2" onClick={onBtnContinueCreateClicked}>Tiếp tục</Button>
            :
            <Button onClick={btnChangeProcessClicked} type={"primary"} className="ml-2">Chuyển</Button>
          }
        </div>
      </Modal>

      {showForm.show_change_process &&
      <CreateEmailForm type={"process"} reqCreate={reqCreate} profile={showForm.data_profile} checked={checked}/>
      }
    </>
  );
}

export default connector(Form.create<IProps>()(ChangeProcessForm));
