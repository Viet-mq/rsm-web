import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Form, Icon, Input, Modal, Radio, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createRejectCandidate, showEmailCreateForm, showFormReasonReject} from "../redux/actions";
import {ChangeProcessRequest, CreateRejectCandidateRequest, CreateRejectForm} from "../types";
import {searchListReasonReject, showFormCreate} from "../../ReasonRejectManager/redux/actions";
import {ReasonRejectEntity} from "../../ReasonRejectManager/types";
import {formItemLayout, plainOptions} from "../../../helpers/utilsFunc";
import CreateEmailForm from "./CreateEmailForm";

const {Option} = Select;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

const mapStateToProps = (state: RootState) => ({
  listReasonReject: state.reasonRejectManager.list,
  createReasonReject: state.reasonRejectManager.create,
  profileManager: state.profileManager,
  listEmail: state.emailManager.list,
})

const connector = connect(mapStateToProps, {
  showFormReasonReject,
  createRejectCandidate,
  showFormCreate,
  searchListReasonReject,
  showEmailCreateForm
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function CreateRejectCandidateForm(props: IProps) {
  const {detail, showForm} = props.profileManager
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const [otherReason, setOtherReason] = useState(false)
  const [trigger, setTrigger] = useState({
    reasonReject: false,
    email: false,
  })
  const [reasonReject, setReasonReject] = useState<ReasonRejectEntity[]>([]);
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

  useEffect(() => {
    if (showForm.show_reason_reject) {
      setReasonReject(props.listReasonReject.rows)
    }
  }, [showForm.show_reason_reject])

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let rejectForm: CreateRejectForm = {
          idProfile: detail?.params.idProfile,
          reason: otherReason ? values.otherReason : values.reason,
          recruitmentId: detail?.result?.recruitmentId,
        }


        let req: CreateRejectCandidateRequest = {
          createReject: rejectForm,
        }
        props.createRejectCandidate(req);
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
        let req: CreateRejectForm = {
          idProfile: detail?.params.idProfile,
          reason: otherReason ? values.otherReason : values.reason,
          recruitmentId: detail?.result?.recruitmentId,
        }
        setReqCreate({...req})
        props.showEmailCreateForm(true);
        return;
      }
    });
  }


  function onBtnCancelClicked() {
    resetFields();
    props.showFormReasonReject(false);
  }

  function handleCreateResonReject(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormCreate(true);
  }

  function onSelectReason(value: any) {
    if (value === 'other') {
      setOtherReason(true)
    }
  }

  function onSearchReasonReject(value: any) {
    props.searchListReasonReject({name: value})
    setTrigger({...trigger, reasonReject: true})
  }

  function onFocusReasonReject() {
    setReasonReject(props.listReasonReject.rows)
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
        title="Lý do loại ứng viên"
        visible={showForm.show_reason_reject}
        centered={true}
        width="700px"
        afterClose={onBtnCancelClicked}
        onCancel={onBtnCancelClicked}
        footer={""}>

        <Form>

          <Form.Item label="Lý do" className="form-label"  {...formItemLayout}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('reason', {
                initialValue: undefined,
                rules: [
                  {
                    message: 'Vui lòng chọn lý do loại',
                    required: true,
                  },
                ],
              })(
                <Select
                  getPopupContainer={(trigger: any) => trigger.parentNode}
                  className="bg-white text-black"
                  style={fontWeightStyle}
                  onSelect={onSelectReason}
                  placeholder="Chọn lý do loại"

                  onSearch={onSearchReasonReject}
                  onFocus={onFocusReasonReject}
                  filterOption={(input, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  optionFilterProp="children"
                  showSearch
                >
                  {reasonReject?.map((item: any, index: any) => (
                    <Option key={index} value={item.id}>{item.reason}</Option>
                  ))}
                  <Option key={"other"} value={"other"}>&lt;Khác&gt;</Option>
                </Select>
              )}
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                style={{height: '32px'}}
                onClick={handleCreateResonReject}
              >
                <Icon type="plus"/>
              </Button>
            </div>

          </Form.Item>

          {otherReason ? <Form.Item className="form-label" label="Lý do khác" labelCol={{span: 24}}
                                    wrapperCol={{span: 24}}>
            {getFieldDecorator('otherReason', {
              initialValue: "",
              rules: [
                {
                  message: 'Vui lòng nhập số điện thoại',
                  required: true,
                },
              ],
            })(<TextArea
              placeholder={"Nội dung"} rows={4}/>)}
          </Form.Item> : null}

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

          <div className="footer-right">
            <Button onClick={onBtnCancelClicked} type={"link"}
                    style={{color: "black", marginRight: 15}}>Hủy</Button>
            {checked.candidate.checkedList === "yes" ||
            checked.members.checkedList === "yes" ||
            checked.interviewers.checkedList.length > 0 ||
            checked.presenter.checkedList === "yes" ?
              <Button type={"primary"} className="ml-2"
                      onClick={onBtnContinueCreateClicked}
              >Tiếp tục</Button>
              :
              <Button type="danger" onClick={onBtnCreateClicked}>Loại</Button>

            }
          </div>

        </Form>

      </Modal>
      {showForm.show_reason_reject &&
      <CreateEmailForm type={"reject"} reqCreate={reqCreate} profile={detail.result} checked={checked}/>
      }
    </>
  );
}

export default connector(Form.create <IProps>()(CreateRejectCandidateForm));
