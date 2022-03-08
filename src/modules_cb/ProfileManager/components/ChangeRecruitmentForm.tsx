import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Modal, Radio, Select} from "antd";
import React, {useEffect, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import {changeProcess, showChangeProcessForm} from "../redux/actions";
import {getListRecruitment} from "../../RecruitmentManager/redux/actions";
import {ChangeProcessRequest, ProcessForm} from "../types";
import {InterviewProcess, RecruitmentEntity} from "../../RecruitmentManager/types";

const {Option} = Select;

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

function ChangeRecruitmentForm(props: IProps) {
  const {showForm} = props.profileManager
  const fontWeight = {fontWeight: 500}
  const [addRecruitment, setAddRecruitment] = useState('')
  const [filterRecruitment, setFilterRecruitment] = useState<RecruitmentEntity[]>([])
  const [process, setProcess] = useState<any>('')
  const [filterProcess, setFilterProcess] = useState<InterviewProcess[] | any>([])
  const [valuesSelect, setValueSelect] = useState('')

  useEffect(() => {
    if (showForm.show_change_recruitment) {
      props.getListRecruitment();
    }
  }, [showForm.show_change_recruitment])

  useEffect(() => {
    if (showForm.show_change_recruitment) {
      setFilterRecruitment(props.recruitment.rows.filter((item: any) => item.id !== showForm?.id_recruitment))
    }
  }, [props.recruitment])

  useEffect(() => {
    setProcess(filterRecruitment[0]?.interviewProcess[0].id)
    setFilterProcess(filterRecruitment[0]?.interviewProcess)
    setValueSelect(filterRecruitment[0]?.id)
  }, [filterRecruitment])

  const handleCloseForm = (event: any) => {
    event.stopPropagation();
    props.showChangeProcessForm(false)
    setAddRecruitment('')
    setFilterRecruitment([])
    setProcess('')
  }

  function btnAddRecruitmentClicked() {
    if (addRecruitment) {
      // const findRecruitment = props.recruitment.rows.find((item: any) => item.id === addRecruitment)
      //
      // let recruitmentForm: ProcessForm = ({
      //   idProfile: showForm.change_process?.idProfile,
      //   recruitmentId: showForm.change_process?.recruitmentId,
      //   statusCVId: process
      // })
      let recruitmentForm: ProcessForm = ({
        idProfile: showForm?.id_detail,
        recruitmentId: addRecruitment,
        statusCVId: process
      })

      let req: ChangeProcessRequest = {
        changeProcess: recruitmentForm,
      }

      props.changeProcess(req,true)
    }
  }

  function handleSelectRecruitment(value: any) {
    setAddRecruitment(value);
  }

  function handleChangeProcess(event: any) {
    setProcess(event.target.value)
  }

  function handleChangeRecruitment(value: any) {
    setValueSelect(value)
    setFilterProcess(filterRecruitment.find((item: any) => item.id === value)?.interviewProcess)
  }

  function btnChangeRecruitmentClicked() {
    let recruitmentForm: ProcessForm = ({
      idProfile: showForm?.id_detail,
      recruitmentId: valuesSelect,
      statusCVId: process,
    })

    let req: ChangeProcessRequest = {
      changeProcess: recruitmentForm,
    }
    props.changeProcess(req, true)
  }

  return (
    <>
      {showForm.id_recruitment ?
        (<Modal
          zIndex={2}
          maskClosable={false}
          visible={showForm.show_change_recruitment}
          centered={true}
          width="530px"
          className="custom"
          afterClose={() => {
          }}
          onCancel={handleCloseForm}
          footer={""}>
          <div className="schedule-detail">
            <div className="schedule-detail-head">
              <div className="schedule-detail-title">Chuyển tin tuyển dụng</div>
            </div>

            <div className="select-option">
            <Select getPopupContainer={(trigger:any) => trigger.parentNode} style={{width: "100%", paddingTop: 15}}
                      value={valuesSelect}
                      onSelect={handleChangeRecruitment}
                      placeholder={"Chọn tin tuyển dụng"}>
                {filterRecruitment?.map((item: any, index: any) => {
                  return <Option key={index} value={item.id}>{item.title}</Option>
                })
                }
              </Select>
            </div>

            <div className="schedule-detail-content">
              <div style={{...fontWeight}}>Vòng tuyển dụng</div>

              <Radio.Group onChange={handleChangeProcess} value={process}>
                {filterProcess?.map((item: any, index: any) => {
                  return <Radio key={index} value={item.id} className="flex-items-center">
                    {item.name}
                  </Radio>
                })}
              </Radio.Group>

            </div>

          </div>

          <div className="footer-right">
            <Button onClick={handleCloseForm}>Hủy</Button>
            <Button onClick={btnChangeRecruitmentClicked} type={"primary"} className="ml-2">Chuyển</Button>
          </div>
        </Modal>)
        :
        (<Modal
          zIndex={2}
          maskClosable={false}
          visible={showForm.show_change_recruitment}
          centered={true}
          width="530px"
          className="custom"
          afterClose={() => {
          }}
          onCancel={handleCloseForm}
          footer={""}>
          <div className="schedule-detail">
            <div className="schedule-detail-head">
              <div className="schedule-detail-title">Chuyển tin tuyển dụng</div>
            </div>

            <div className="select-option">
            <Select getPopupContainer={(trigger:any) => trigger.parentNode} style={{width: "100%", paddingTop: 15}} onSelect={handleSelectRecruitment}
                      placeholder={"Chọn tin tuyển dụng"}>
                {props.recruitment.rows?.map((item: any, index: any) => {
                  return <Option key={index} value={item.id}>{item.title}</Option>
                })}
              </Select>
            </div>
          </div>

          <div className="footer-right">
            <Button onClick={handleCloseForm}>Hủy</Button>
            <Button onClick={btnAddRecruitmentClicked} type={"primary"} className="ml-2">Chuyển</Button>
          </div>
        </Modal>)
      }

    </>
  );
}

export default connector(Form.create<IProps>()(ChangeRecruitmentForm));
