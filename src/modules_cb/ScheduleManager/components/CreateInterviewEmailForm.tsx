import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {MailForm, MailRequest} from "../../ProfileManager/types";
import {EmailEntity} from "../../EmailManager/types";
import {getListEmail} from "../../EmailManager/redux/actions";
import {CreateScheduleRequest} from "../types";
import {createSchedule} from "../redux/actions";
import {createBooking, showInterviewEmailCreateForm} from "../../ProfileManager/redux/actions";

const {Option} = Select;
const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  showBooking: state.profileManager.showBooking,
  emailManager: state.emailManager.list,

})

const connector = connect(mapStateToProps,
  {
    createBooking,
    showInterviewEmailCreateForm,
    getListEmail,
    createSchedule
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
  reqCreateSchedule?: any
}

function CreateInterviewEmailForm(props: IProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const formItemStyle = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
  };
  const [display, setDisplay] = useState(false)
  const [emailTemp, setEmailTemp] = useState<EmailEntity>()
  const [valueEditor, setValueEditor] = useState("")

  useEffect(() => {
    if (props.showBooking) {
      props.getListEmail({page: 1, size: 100});
    }
  }, [props.showBooking])


  useEffect(() => {
    if (props.showBooking && props.emailManager) {
      setEmailTemp(props.emailManager.rows[0])
      setValueEditor(props.emailManager.rows[0]?.content)
    }
  }, [props.emailManager])

  function onBtnCancelClicked() {
    resetFields();
    props.showInterviewEmailCreateForm(false);
    setValueEditor("")
    setEmailTemp(undefined)
  }

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let mailFormCandidate: MailForm = {
          subject: values.subjectCandidate,
          content: valueEditor,
        }

        let mailFormInterviewers: MailForm = {
          subject: values.subjectRecruitmentCouncil,
          content: values.contentRecruitmentCouncil,
        }

        let mailFormPresenter: MailForm = {
          subject: values.subjectPresenter,
          content: values.contentPresenter,
        }

        let mailRequest: MailRequest = {
          candidate: mailFormCandidate,
          recruitmentCouncils: mailFormInterviewers,
          presenters: mailFormPresenter
        }

        let req: CreateScheduleRequest = {
          createScheduleForm: props.reqCreateSchedule,
          mailRequest: mailRequest,
        }
        props.createSchedule(req);

        return;
      }
    });
  }

  function handleChangeMailContent(content: any, editor: any) {
    if (content === "") {
      setDisplay(true)
      setValueEditor("")
    } else {
      setDisplay(false)
      setValueEditor(content)
    }
  }

  function handleSelectMailTemplate(value: any) {
    const selectEmail = props.emailManager.rows.find((item: any) => item.id === value)
    setEmailTemp(selectEmail)
    setValueEditor(selectEmail.content)
  }

  console.log("Pvan hang loat:", props.reqCreateSchedule)
  console.log("Interviewers:", props.reqCreateSchedule?.interviewers)

  return (
    <>
      <div>
        <div>
          <Modal
            zIndex={2}
            maskClosable={false}
            visible={props.showBooking.show_interview_email_create}
            centered={true}
            width="700px"
            className="custom"
            afterClose={onBtnCancelClicked}
            onCancel={onBtnCancelClicked}
            footer={""}>

            {/*email ứng viên*/}
            <div style={{padding: "24px"}}>
              <div className="schedule-detail-title">Email thông báo</div>
            </div>
            <div style={{height: 700, padding: "0 24px 24px", overflow: "auto"}}>
              <div className="font-15-bold-500">Nội dung email gửi cho ứng viên</div>
              <Form>
                <Form.Item className="form-label" label="Tên mẫu mail" labelCol={{span: 24}}
                           wrapperCol={{span: 24}}>
                  {getFieldDecorator('title', {
                    initialValue: emailTemp?.id,
                    rules: [
                      {
                        message: 'Vui lòng nhập tên mẫu',
                        required: true,
                      },
                    ],
                  })(
                    <Select onSelect={handleSelectMailTemplate} style={fontWeightStyle}
                            placeholder="Nhập tên mẫu">
                      {props.emailManager.rows?.map((item: any, index: any) => {
                        return <Option key={index} value={item.id}>{item.name}</Option>
                      })}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item className="form-label" label="Tiêu đề mail" labelCol={{span: 24}}
                           wrapperCol={{span: 24}}>
                  {getFieldDecorator('subjectCandidate', {
                    initialValue: emailTemp?.subject,
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
                  <Editor
                    onEditorChange={handleChangeMailContent}
                    value={valueEditor}
                    init={{
                      menu: {
                        tc: {
                          title: 'Comments',
                          items: 'addcomment showcomments deleteallconversations'
                        }
                      },
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help '
                      ],
                      height: 330,
                      menubar: true,
                      toolbar: 'undo redo | bold italic underline strikethrough |alignleft aligncenter alignright alignjustify | outdent indent |fontselect fontsizeselect formatselect |    numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                      quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                      toolbar_mode: 'sliding',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />
                  <div className={display ? "value-required show" : "value-required hide"}>Vui lòng nhập nội dung</div>
                </div>

                <div className="font-15-bold-500 mt-5 mb-2">Nội dung email gửi cho Hội đồng tuyển dụng</div>
                <div style={{border: "1px solid #dddde4", padding: 15}}>
                  <Form.Item label="Đến" className="form-label" {...formItemStyle}>
                    {getFieldDecorator('name', {
                      initialValue: props.reqCreateSchedule?.interviewers || undefined,
                      rules: [
                        {
                          message: 'Vui lòng chọn nhà tuyển dụng',
                          required: true,
                        },
                      ],
                    })(<Select className="bg-white text-black" style={{...fontWeightStyle, width: "100%"}}
                               mode="multiple"
                               placeholder="Chọn thành viên"
                    >
                      {props.listAccount.rows?.map((item: any, index: any) => (
                        <Option key={index} value={item.username}>{item.fullName}</Option>
                      ))}
                    </Select>)}
                  </Form.Item>

                  <Form.Item label="Tiêu đề" className="form-label" {...formItemStyle}>
                    {getFieldDecorator('subjectRecruitmentCouncil', {
                      initialValue: emailTemp?.subject,
                      rules: [
                        {
                          message: 'Vui lòng nhập tên trường',
                          required: false,
                        },
                      ],
                    })(<Input placeholder="Nhập tiêu đề" disabled className="bg-white text-black"/>)}
                  </Form.Item>

                  <Form.Item label="Mô tả" className="form-label" {...formItemStyle}>
                    {getFieldDecorator('contentRecruitmentCouncil', {
                      initialValue: '',
                      rules: [
                        {
                          message: 'Vui lòng nhập tên trường',
                          required: false,
                        },
                      ],
                    })(<TextArea placeholder="Nhập nội dung" style={{height: 120}} className="bg-white text-black"/>
                    )}
                  </Form.Item>
                </div>

              </Form>
            </div>

            <div className="footer-right">
              <Button onClick={onBtnCancelClicked} type={"link"}
                      style={{color: "black", marginRight: 15}}>Hủy</Button>
              <Button type={"primary"} onClick={handleSubmitForm}>Đặt lịch và gửi mail</Button>
            </div>
          </Modal>
        </div>

      </div>
    </>
  );
}

export default connector(Form.create<IProps>()(CreateInterviewEmailForm));

