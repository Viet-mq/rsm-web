import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Modal, Radio} from "antd";
import React, {useEffect, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import {changeProcess, showChangeProcessForm} from "../redux/actions";
import {getListRecruitment} from "../../RecruitmentManager/redux/actions";
import {ChangeProcessRequest} from "../types";

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  recruitment: state.recruitmentManager.list
})

const connector = connect(mapStateToProps,
  {
    showChangeProcessForm,
    changeProcess,
    getListRecruitment
  })

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function ChangeProcessForm(props: IProps) {
  const fontWeight = {
    fontWeight: 500
  }
  const [process, setProcess] = useState<any>('')

  useEffect(() => {
    if (props.profileManager.showForm.show_change_process) {
      props.getListRecruitment({id: props.profileManager.showForm.change_process?.recruitmentId})
      setProcess(props.profileManager.showForm.change_process?.statusCVId)
    }
  }, [props.profileManager.showForm.show_change_process])
  const handleCloseForm = (event: any) => {
    event.stopPropagation();
    props.showChangeProcessForm(false)
  }

  function btnChangeProcessClicked() {
    let req: ChangeProcessRequest = ({
        idProfile: props.profileManager.showForm.change_process?.idProfile,
        recruitmentId: props.profileManager.showForm.change_process?.recruitmentId,
        statusCVId: process
      })
    props.changeProcess(req,false)
  }

  function handleChangeProcess(event: any) {
    setProcess(event.target.value)
  }

  return (
    <>
      <Modal
        zIndex={2}
        maskClosable={false}
        visible={props.profileManager.showForm.show_change_process}
        centered={true}
        width="530px"
        className="custom"
        afterClose={() => {
        }}
        onCancel={() => {
          props.showChangeProcessForm(false)
        }}
        footer={""}>
        <div className="schedule-detail">
          <div className="schedule-detail-head">
            <div className="schedule-detail-title">Chuyển vòng</div>
          </div>
          <div className="schedule-detail-content">
            <div style={{...fontWeight}}>Vòng tuyển dụng</div>

            <Radio.Group onChange={handleChangeProcess} value={process}>
              {props.recruitment.rows[0]?.interviewProcess.map((item: any, index: any) => {
                return <Radio key={index} value={item.id} className="flex-items-center">
                  {item.name}
                </Radio>
              })}
            </Radio.Group>

          </div>
        </div>

        <div className="footer-right">
          <Button onClick={handleCloseForm}>Hủy</Button>
          <Button onClick={btnChangeProcessClicked} type={"primary"} className="ml-2">Chuyển</Button>
        </div>
      </Modal>
    </>
  );
}

export default connector(Form.create<IProps>()(ChangeProcessForm));
