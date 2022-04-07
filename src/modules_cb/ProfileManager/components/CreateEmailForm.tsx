import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {createBooking, showEmailCreateForm} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {CreateBookingRequest, MailForm, MailRequest} from "../types";
import {EmailEntity} from "../../EmailManager/types";
import {getListEmail, searchListEmail} from "../../EmailManager/redux/actions";
import {createSchedule} from "../../ScheduleManager/redux/actions";
import ReactQuill from "react-quill";
import {getSearchAccount} from "../../AccountManager/redux/actions";
import {UserAccount} from "../../AccountManager/types";
import {formats, modules} from "../../../helpers/utilsFunc";

const {Option} = Select;
const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  showBooking: state.profileManager.showBooking,
  listEmail: state.emailManager.list,

})

const connector = connect(mapStateToProps,
  {
    createBooking,
    showEmailCreateForm,
    getListEmail,
    createSchedule,
    getSearchAccount,
    searchListEmail
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
  reqCreate?: any,
  profile?: any,
}

function CreateEmailForm(props: IProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const formItemStyle = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
  };
  const [account, setAccount] = useState<UserAccount[] | any>([]);
  const [display, setDisplay] = useState(false)
  const [emailTemp, setEmailTemp] = useState<EmailEntity[]>([])
  const [valueEditor, setValueEditor] = useState("")
  const inputFile = useRef<any>(null)
  const [fileAttach, setFileAttach] = useState<any>([]);
  const [trigger, setTrigger] = useState({
    email: false,
    account: false,
  })

  useEffect(() => {
    if (props.showBooking.show_email_create) {
      props.getListEmail({page: 1, size: 92});
    }
  }, [props.showBooking])


  useEffect(() => {
    if (props.showBooking && props.listEmail) {
      setEmailTemp(props.listEmail.rows)
      setValueEditor(props.listEmail.rows[0]?.content)
    }
  }, [props.listEmail])

  function onBtnCancelClicked() {
    resetFields();
    props.showEmailCreateForm(false);
    setValueEditor("")
    setEmailTemp([])
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
          file: fileAttach
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

        let req: CreateBookingRequest = {
          createBookingForm: props.reqCreate,
          mailRequest: mailRequest,
        }
        props.createBooking(req)

        return;
      }
    });
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

  function handleSelectMailTemplate(value: any) {
    const selectEmail = props.listEmail.rows.find((item: any) => item.id === value)
    setEmailTemp([selectEmail])
    setValueEditor(selectEmail.content)
  }

  const onOpenFileClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  function onFileChange(e: any) {
    const newFile = fileAttach.concat(e.target.files[0])
    setFileAttach(newFile);
  }

  function handleDeleteFile(item: any, index: any) {
    const newFile = Array.from(fileAttach);
    newFile.splice(index, 1)
    setFileAttach(newFile)
  }

  function onSearchAccount(value: any) {
    props.getSearchAccount({name: value})
    setTrigger({...trigger, account: true})
  }

  function onFocusAccount() {
    setAccount(props.listAccount.rows)
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
      <div>
        <div>
          <Modal
            zIndex={2}
            maskClosable={false}
            visible={props.showBooking.show_email_create}
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

                {/*File attachment*/}
                <div className="mt-2">
                  <input type="file" ref={inputFile} onChange={onFileChange} id={"tags"} style={{display: "none"}}/>
                  <div className="font-14-bold-500">Attachment file</div>
                  {fileAttach ? fileAttach?.map((item: any, index: any) => {
                    return <div key={index} className="flex-space-between">
                      <div className='pl-2' style={{color: "#1890ff", fontStyle: "italic"}}> {item?.name}</div>
                      <div className="cursor-default" onClick={() => handleDeleteFile(item, index)}><Icon type="delete"
                                                                                                          style={{color: "#f5222d"}}/>
                      </div>
                    </div>
                  }) : null}
                  <div className="cursor-default" style={{color: "#969C9D"}} onClick={onOpenFileClick}><Icon
                    type="tag"/> Click to add file
                  </div>
                </div>

                <div className="font-15-bold-500 mt-5 mb-2">Nội dung email gửi cho Hội đồng tuyển dụng</div>
                <div style={{border: "1px solid #dddde4", padding: 15}}>
                  <Form.Item label="Đến" className="form-label" {...formItemStyle}>
                    {getFieldDecorator('name', {
                      initialValue: props.reqCreate?.interviewers,
                      rules: [
                        {
                          message: 'Vui lòng chọn nhà tuyển dụng',
                          required: true,
                        },
                      ],
                    })(<Select
                      getPopupContainer={(trigger: any) => trigger.parentNode}
                      className="bg-white text-black"
                      style={{...fontWeightStyle, width: "100%"}}
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
                      initialValue: emailTemp[0]?.subject,
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

                <div className="font-15-bold-500 mt-5 mb-2">Nội dung email gửi cho người giới thiệu</div>
                <div style={{border: "1px solid #dddde4", padding: 15}}>
                  <Form.Item label="Đến" className="form-label" {...formItemStyle}>
                    {getFieldDecorator('username', {
                      initialValue: props.profile?.username || undefined,
                      rules: [
                        {
                          message: 'Vui lòng nhập tên trường',
                          required: false,
                        },
                      ],
                    })(<Select
                      getPopupContainer={(trigger: any) => trigger.parentNode}
                      className="bg-white text-black"
                      style={{...fontWeightStyle, width: "100%"}}
                      mode="multiple"

                    >
                      {props.listAccount.rows?.map((item: any, index: any) => (
                        <Option key={index} value={item.username}>{item.fullName}</Option>
                      ))}
                    </Select>)}
                  </Form.Item>

                  <Form.Item label="Tiêu đề" className="form-label" {...formItemStyle}>
                    {getFieldDecorator('subjectPresenter', {
                      initialValue: emailTemp[0]?.subject,
                      rules: [
                        {
                          message: 'Vui lòng nhập tên trường',
                          required: false,
                        },
                      ],
                    })(<Input placeholder="Nhập tiêu đề" disabled className="bg-white text-black"/>)}
                  </Form.Item>

                  <Form.Item label="Mô tả" className="form-label" {...formItemStyle}>
                    {getFieldDecorator('contentPresenter', {
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

export default connector(Form.create<IProps>()(CreateEmailForm));

