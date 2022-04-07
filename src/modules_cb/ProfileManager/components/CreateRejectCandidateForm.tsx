import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createRejectCandidate, showFormReasonReject} from "../redux/actions";
import {CreateRejectCandidateRequest, CreateRejectForm, MailForm, MailRequest} from "../types";

import ReactQuill from "react-quill";
import {searchListReasonReject, showFormCreate} from "../../ReasonRejectManager/redux/actions";
import CreateReasonRejectForm from "../../ReasonRejectManager/components/CreateReasonRejectForm";
import Loading from "../../../components/Loading";
import {EmailEntity} from "../../EmailManager/types";
import {getListEmail, searchListEmail} from "../../EmailManager/redux/actions";
import {ReasonRejectEntity} from "../../ReasonRejectManager/types";
import {formats, formItemLayout, modules} from "../../../helpers/utilsFunc";

const {Option} = Select;
const {TextArea} = Input;

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
  getListEmail,
  searchListReasonReject,
  searchListEmail
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function CreateRejectCandidateForm(props: IProps) {
  const {detail, showForm} = props.profileManager
  const [emailTemp, setEmailTemp] = useState<EmailEntity[]>([])
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const [display, setDisplay] = useState(false)
  const [valueEditor, setValueEditor] = useState("")
   const [otherReason, setOtherReason] = useState(false)
  const [trigger, setTrigger] = useState({
    reasonReject: false,
    email: false,
  })
  const [reasonReject, setReasonReject] = useState<ReasonRejectEntity[]>([]);

  useEffect(() => {
    if (showForm.show_reason_reject && props.listEmail) {
      setEmailTemp(props.listEmail.rows)
      setValueEditor(props.listEmail.rows[0]?.content)
    }
  }, [props.listEmail])

  useEffect(() => {
    if (showForm.show_reason_reject) {
      props.getListEmail({page: 1, size: 92});
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

        let mailFormCandidate: MailForm = {
          subject: values.subjectCandidate,
          content: valueEditor,
        }

        let mailRequest: MailRequest = {
          candidate: mailFormCandidate,
        }

        let req: CreateRejectCandidateRequest = {
          createReject: rejectForm,
          mailRequest: mailRequest,
        }
        props.createRejectCandidate(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormReasonReject(false);
  }

  function handleChangeMailContent(content: any) {
    if (content === "<p><br></p>") {
      setDisplay(true)
      setValueEditor("")
    } else {
      setDisplay(false)
      setValueEditor(content)
    }
  }

  function handleCreateResonReject(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormCreate(true);
  }

  function handleSelectMailTemplate(value: any) {
    const selectEmail = props.listEmail.rows.find((item: any) => item.id === value)
    setEmailTemp([selectEmail])
    setValueEditor(selectEmail.content)
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

  function onSearchEmail(value: any) {
    props.searchListEmail({name: value})
    setTrigger({...trigger, email: true})
  }

  function onFocusEmail() {
    setEmailTemp(props.listEmail.rows)
  }

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

          <div className="font-15-bold-500 mt-5 mb-2">Nội dung email</div>
          <div style={{border: "1px solid #dddde4", padding: 15}}>

            <Form.Item className="form-label" label="Tên mẫu mail" labelCol={{span: 24}}
                       wrapperCol={{span: 24}}>
              {getFieldDecorator('title', {
                initialValue: emailTemp[0]?.id,
                rules: [
                  {
                    message: 'Vui lòng nhập tên mẫu',
                    required: true,
                  },
                ],
              })(
                <Select
                  getPopupContainer={(trigger: any) => trigger.parentNode}
                  onSelect={handleSelectMailTemplate}
                  style={fontWeightStyle}
                  placeholder="Nhập tên mẫu"

                  onSearch={onSearchEmail}
                  onFocus={onFocusEmail}
                  filterOption={(input, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  optionFilterProp="children"
                  showSearch
                  className="bg-white text-black form-label"
                >
                  {emailTemp?.map((item: any, index: any) => {
                    return <Option key={index} value={item.id}>{item.name}</Option>
                  })}
                </Select>
              )}
            </Form.Item>

            <Form.Item className="form-label" label="Tiêu đề mail" labelCol={{span: 24}}
                       wrapperCol={{span: 24}}>
              {getFieldDecorator('subjectCandidate', {
                initialValue: emailTemp[0]?.subject,
                rules: [
                  {
                    message: 'Vui lòng nhập tiêu đề mail',
                    required: true,
                  },
                ],
              })(
                <Input placeholder="Nhập tiêu đề" className="bg-white text-black"/>
              )}
            </Form.Item>


            <div className="form-label">
              <div className="mb-2">Nội dung <span className="value-required">*</span></div>
              <ReactQuill
                style={fontWeightStyle}
                className="ql-custom"
                onChange={handleChangeMailContent}
                value={valueEditor || ""}

                theme={'snow'}
                modules={modules}
                formats={formats}
                bounds={'.app'}
                placeholder="Mô tả công việc"
              />

              <div className={display ? "value-required show" : "value-required hide"}>Vui lòng nhập nội dung</div>
            </div>
          </div>

          <div className="footer-right">
            <Button onClick={onBtnCancelClicked} type={"link"}
                    style={{color: "black", marginRight: 15}}>Hủy</Button>
            <Button type="danger" onClick={onBtnCreateClicked}>Loại</Button>
          </div>

        </Form>

      </Modal>

      <CreateReasonRejectForm/>

      {props.createReasonReject.loading ?
        <Loading/> : null}
    </>

  );

}

export default connector(Form.create<IProps>()(CreateRejectCandidateForm));
