import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {
  changeProcess,
  createBooking,
  createRejectCandidate,
  showEmailCreateForm,
  updateBooking
} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Input, Modal, Popconfirm, Select} from "antd";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {getListEmail as getListEmailTemp} from "../../EmailManager/redux/actions";
import ReactQuill from "react-quill";
import {formats, formItemLayout, modules} from "../../../helpers/utilsFunc";
import {getListEmail} from "../../EmailManager/redux/services/apis";
import {
  ChangeProcessRequest,
  CreateBookingRequest,
  CreateRejectCandidateRequest,
  MailForm,
  MailRequest,
  UpdateBookingRequest
} from "../types";
import {getListAccount} from "../../AccountManager/redux/services/apis";
import {CreateScheduleRequest} from "../../ScheduleManager/types";
import {createSchedule} from "../../ScheduleManager/redux/actions";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  showBooking: state.profileManager.showBooking,
  listEmail: state.emailManager.list,
})

const connector = connect(mapStateToProps,
  {
    createBooking,
    showEmailCreateForm,
    getListEmailTemp,
    createRejectCandidate,
    changeProcess,
    updateBooking,
    createSchedule
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
  reqCreate?: any,
  profile?: any,
  checked?: any,
  type?: any,
  isUpdate?: any,
}

function CreateEmailForm(props: IProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const [account, setAccount] = useState<any>({
    members: [],
    interviewers: [],
    presenter: [],
  });
  const [display, setDisplay] = useState({
    candidate: false,
    members: false,
    interviewers: false,
    presenter: false,
  })
  const [emailTemp, setEmailTemp] = useState<any>({
    candidate: [],
    members: [],
    interviewers: [],
    presenter: [],
  })
  const [valueEditor, setValueEditor] = useState<any>({
    candidate: "",
    members: "",
    interviewers: "",
    presenter: "",
  })
  const [subject, setSubject] = useState<any>({
    candidate: "",
    members: "",
    interviewers: "",
    presenter: "",
  })
  const [fileAttach, setFileAttach] = useState<any>({
    candidate: [],
    members: [],
    interviewers: [],
    presenter: [],
  });
  const inputFileCandidate = useRef<any>(null)
  const inputFileInterviewers = useRef<any>(null)
  const inputFileMembers = useRef<any>(null)
  const inputFilePresenter = useRef<any>(null)

  useEffect(() => {
    if (props.showBooking.show_email_create) {
      props.getListEmailTemp({page: 1, size: 100});
    }
  }, [props.showBooking])

  useEffect(() => {
    if (props.showBooking.show_email_create && props.listEmail) {
      setEmailTemp({
        ...emailTemp,
        candidate: props.listEmail.rows,
        members: props.listEmail.rows,
        interviewers: props.listEmail.rows,
        presenter: props.listEmail.rows,
      })

      setValueEditor({
        ...valueEditor,
        candidate: props.listEmail.rows[0]?.content,
        members: props.listEmail.rows[0]?.content,
        interviewers: props.listEmail.rows[0]?.content,
        presenter: props.listEmail.rows[0]?.content,
      })

      setSubject({
        ...subject,
        candidate: props.listEmail.rows[0]?.subject,
        members: props.listEmail.rows[0]?.subject,
        interviewers: props.listEmail.rows[0]?.subject,
        presenter: props.listEmail.rows[0]?.subject,
      })
    }
  }, [props.listEmail])

  function onBtnCancelClicked() {
    resetFields();
    props.showEmailCreateForm(false);
    setValueEditor({
      candidate: "",
      members: "",
      interviewers: "",
      presenter: "",
    })
    setSubject({
      candidate: "",
      members: "",
      interviewers: "",
      presenter: "",
    })
    setEmailTemp({
      candidate: [],
      members: [],
      interviewers: [],
      presenter: [],
    })
    setAccount({
      members: [],
      interviewers: [],
      presenter: [],
    })
    setDisplay({
      candidate: false,
      members: false,
      interviewers: false,
      presenter: false,
    })
    setFileAttach({
      candidate: [],
      members: [],
      interviewers: [],
      presenter: [],
    })
  }

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let mailFormCandidate: MailForm = {
          subject: values.subjectCandidate,
          content: valueEditor.candidate,
          file: fileAttach.candidate
        }

        let mailFormMembers: MailForm = {
          subject: values.subjectRelatedPeople,
          content: valueEditor.members,
          file: fileAttach.members,
          username: values.usernameMember,
        }

        let mailFormInterviewers: MailForm = {
          subject: values.subjectRecruitmentCouncil,
          content: valueEditor.interviewers,
          file: fileAttach.interviewers,
          username: values.usernameInterviewers,
          email: values.emailInterviewers
        }

        let mailFormPresenter: MailForm = {
          subject: values.subjectPresenter,
          content: valueEditor.presenter,
          file: fileAttach.presenter,
          username: values.usernamePresenter,
          email: values.emailPresenter
        }

        let mailRequest: MailRequest = {
          candidate: mailFormCandidate,
          interviewers: mailFormInterviewers,
          presenters: mailFormPresenter,
          members: mailFormMembers
        }

        if (props.type === "booking") {
          if (props.isUpdate) {
            let reqUpdateBooking: UpdateBookingRequest = {
              updateBookingForm: props.reqCreate,
              mailRequest: mailRequest,
            }
            props.updateBooking(reqUpdateBooking)
          } else {
            let req: CreateBookingRequest = {
              createBookingForm: props.reqCreate,
              mailRequest: mailRequest,
            }
            props.createBooking(req)
          }
        } else if (props.type === "reject") {
          let req: CreateRejectCandidateRequest = {
            createReject: props.reqCreate,
            mailRequest: mailRequest,
          }
          props.createRejectCandidate(req);
        } else if (props.type === "process") {
          let req: ChangeProcessRequest = ({
            changeProcess: props.reqCreate,
            mailRequest: mailRequest,
          })
          props.changeProcess(req, false)
        } else if (props.type==="schedule"){
          let reqCreateSchedule: CreateScheduleRequest = {
            createScheduleForm: props.reqCreate,
            mailRequest: mailRequest,

          }
          props.createSchedule(reqCreateSchedule);
        }
        return;
      }
    });
  }

  // Ứng viên------------------------------------------------
  function onChangeContentCandidate(content: any) {
    if (content === "<p><br></p>") {
      const newDisplay = display
      newDisplay.candidate = true
      setDisplay(newDisplay)
      setValueEditor({...valueEditor, candidate: ""})

    } else {
      const newDisplay = display
      newDisplay.candidate = false
      setDisplay(newDisplay)
      setValueEditor({...valueEditor, candidate: content})
    }
  }

  const onOpenFileCandidate = () => {
    // `current` points to the mounted file input element
    inputFileCandidate.current.click();
  };

  function onFileCandidateChange(e: any) {
    setFileAttach({...fileAttach, candidate: fileAttach.candidate.concat(e.target.files[0])});
  }

  function onDeleteFileCandidate(item: any, index: any) {
    const newFile = Array.from(fileAttach.candidate);
    newFile.splice(index, 1)
    setFileAttach({...fileAttach, candidate: newFile})
  }

  function onSearchEmailCandidate(value: any) {
    getListEmail({name: value}).then((rs: any) => {
      setEmailTemp({...emailTemp, candidate: rs.rows})
    })
  }

  function onFocusEmailCandidate() {
    setEmailTemp({
      ...emailTemp,
      candidate: props.listEmail.rows,
    })
  }

  function onSelectMailCandidate(value: any) {
    if (value) {
      setSubject({...subject, candidate: JSON.parse(value).subject})
      setValueEditor({...valueEditor, candidate: JSON.parse(value).content})
    } else {
      setSubject({...subject, candidate: ""})
      setValueEditor({...valueEditor, candidate: ""})
    }
  }

  // ----------------------------------------------------------------
  // Hội đồng tuyển dụng------------------------------------------------
  function onChangeContentInterviewer(content: any) {
    if (content === "<p><br></p>") {
      const newDisplay = display
      newDisplay.interviewers = true
      setDisplay(newDisplay)
      setValueEditor({...valueEditor, interviewers: ""})
    } else {
      const newDisplay = display
      newDisplay.interviewers = false
      setDisplay(newDisplay)
      setValueEditor({...valueEditor, interviewers: content})
    }
  }

  const onOpenFileInterviewer = () => {
    // `current` points to the mounted file input element
    inputFileInterviewers.current.click();
  };

  function onFileInterviewerChange(e: any) {
    setFileAttach({...fileAttach, interviewers: fileAttach.interviewers.concat(e.target.files[0])});
  }

  function onDeleteFileInterviewer(item: any, index: any) {
    const newFile = Array.from(fileAttach.interviewers);
    newFile.splice(index, 1)
    setFileAttach({...fileAttach, interviewers: newFile})
  }

  function onSearchEmailInterviewer(value: any) {
    getListEmail({name: value}).then((rs: any) => {
      setEmailTemp({...emailTemp, interviewers: rs.rows})
    })
  }

  function onFocusEmailInterviewer() {
    setEmailTemp({
      ...emailTemp,
      interviewers: props.listEmail.rows,
    })
  }

  function onSearchInterviewer(value: any) {
    getListAccount({name: value}).then((rs: any) => {
      setAccount({...account, interviewers: rs.rows})
    })
  }

  function onFocusInterviewer() {
    setAccount({
      ...account,
      interviewers: props.listAccount.rows,
    })
  }

  function onSelectMailInterviewer(value: any) {
    if (value) {
      setSubject({...subject, interviewer: JSON.parse(value).subject})
      setValueEditor({...valueEditor, interviewers: JSON.parse(value).content})
    } else {
      setSubject({...subject, interviewers: ""})
      setValueEditor({...valueEditor, interviewers: ""})
    }
  }

  // ----------------------------------------------------------------

  // Người giới thiệu------------------------------------------------
  function onChangeContentPresenter(content: any) {
    if (content === "<p><br></p>") {
      const newDisplay = display
      newDisplay.presenter = true
      setDisplay(newDisplay)
      setValueEditor({...valueEditor, presenter: ""})

    } else {
      const newDisplay = display
      newDisplay.presenter = false
      setDisplay(newDisplay)
      setValueEditor({...valueEditor, presenter: content})
    }
  }

  const onOpenFilePresenter = () => {
    // `current` points to the mounted file input element
    inputFilePresenter.current.click();
  };

  function onFilePresenterChange(e: any) {
    setFileAttach({...fileAttach, presenter: fileAttach.presenter.concat(e.target.files[0])});
  }

  function onDeleteFilePresenter(item: any, index: any) {
    const newFile = Array.from(fileAttach.presenter);
    newFile.splice(index, 1)
    setFileAttach({...fileAttach, presenter: newFile})
  }

  function onSearchEmailPresenter(value: any) {
    getListEmail({name: value}).then((rs: any) => {
      setEmailTemp({...emailTemp, presenter: rs.rows})
    })
  }

  function onSelectMailPresenter(value: any) {
    if (value) {
      setSubject({...subject, presenter: JSON.parse(value).subject})
      setValueEditor({...valueEditor, presenter: JSON.parse(value).content})
    } else {
      setSubject({...subject, presenter: ""})
      setValueEditor({...valueEditor, presenter: ""})
    }
  }

  function onFocusEmailPresenter() {
    setEmailTemp({
      ...emailTemp,
      presenter: props.listEmail.rows,
    })
  }

  function onSearchPresenter(value: any) {
    getListAccount({name: value}).then((rs: any) => {
      setAccount({...account, presenter: rs.rows})
    })
  }

  function onFocusPresenter() {
    setAccount({
      ...account,
      presenter: props.listAccount.rows,
    })
  }

  // ----------------------------------------------------------------

  // Cán bộ liên quan------------------------------------------------
  function onChangeContentMember(content: any) {
    if (content === "<p><br></p>") {
      const newDisplay = display
      newDisplay.members = true
      setDisplay(newDisplay)
      setValueEditor({...valueEditor, members: ""})

    } else {
      const newDisplay = display
      newDisplay.members = false
      setDisplay(newDisplay)
      setValueEditor({...valueEditor, members: content})
    }
  }

  const onOpenFileMember = () => {
    // `current` points to the mounted file input element
    inputFileMembers.current.click();
  };

  function onFileMemberChange(e: any) {
    setFileAttach({...fileAttach, members: fileAttach.members.concat(e.target.files[0])});
  }

  function onDeleteFileMember(item: any, index: any) {
    const newFile = Array.from(fileAttach.members);
    newFile.splice(index, 1)
    setFileAttach({...fileAttach, members: newFile})
  }

  function onSearchEmailMember(value: any) {
    getListEmail({name: value}).then((rs: any) => {
      setEmailTemp({...emailTemp, members: rs.rows})
    })
  }

  function onFocusEmailMember() {
    setEmailTemp({
      ...emailTemp,
      members: props.listEmail.rows,
    })
  }

  function onSearchMember(value: any) {
    getListAccount({name: value}).then((rs: any) => {
      setAccount({...account, members: rs.rows})
    })
  }

  function onFocusMember() {
    setAccount({
      ...account,
      members: props.listAccount.rows,
    })
  }

  function onSelectMailMember(value: any) {
    if (value) {
      setSubject({...subject, members: JSON.parse(value).subject})
      setValueEditor({...valueEditor, members: JSON.parse(value).content})
    } else {
      setSubject({...subject, members: ""})
      setValueEditor({...valueEditor, members: ""})
    }
  }

  // ----------------------------------------------------------------

  return (
    <>
      <div>
        <div>
          <Modal
            zIndex={11}
            maskClosable={false}
            visible={props.showBooking.show_email_create}
            centered={true}
            width="700px"
            className="custom"
            afterClose={onBtnCancelClicked}
            onCancel={onBtnCancelClicked}
            footer={""}>

            <div style={{padding: "24px"}}>
              <div className="schedule-detail-title">Email thông báo</div>
            </div>

            <div style={{height: 700, padding: "0 24px 24px", overflow: "auto"}}>
              <Form>
                {/*email ứng viên*/}
                {props.checked.candidate.checkedList === "yes"
                &&
                <>
                  <div className="font-15-bold-500 mt-5 mb-2" style={{color: "red"}}>Nội dung email gửi cho ứng viên
                  </div>
                  <div style={{border: "1px solid #dddde4", padding: 15}}>
                    <Form.Item label="Tên mẫu mail" className="form-label mb-0" {...formItemLayout}>
                      {getFieldDecorator('titleCandidate', {
                        initialValue: JSON.stringify(emailTemp.candidate[0]),
                        rules: [
                          {
                            message: 'Vui lòng nhập tên email mẫu',
                            required: false,
                          },
                        ],
                      })(<Select
                        getPopupContainer={(trigger: any) => trigger.parentNode}
                        style={fontWeightStyle}
                        placeholder="Nhập tên email mẫu"
                        onSearch={onSearchEmailCandidate}
                        onFocus={onFocusEmailCandidate}
                        onSelect={onSelectMailCandidate}
                        filterOption={false}
                        showSearch
                        className="bg-white text-black form-label"
                      >
                        <Option key={"none"} value={""} label={"<None>"}>
                          <div>&lt;None&gt;</div>
                        </Option>
                        {emailTemp.candidate?.map((item: any, index: any) => {
                          return <Option key={index} value={JSON.stringify(item)}>{item.name}</Option>
                        })}
                      </Select>)}
                    </Form.Item>

                    <Form.Item label="Tiêu đề mail" className="form-label" {...formItemLayout}>
                      {getFieldDecorator('subjectCandidate', {
                        initialValue: subject.candidate,
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
                        className={display.candidate ? "ql-custom ql-required" : "ql-custom "}
                        onChange={onChangeContentCandidate}
                        value={valueEditor.candidate || ""}

                        theme={'snow'}
                        modules={modules}
                        formats={formats}
                        bounds={'.app'}
                        placeholder="Nội dung email"
                      />
                      <div className={display.candidate ? "value-required show" : "value-required hide"}>Vui lòng nhập
                        nội
                        dung
                      </div>
                    </div>

                    {/*File attachment*/}
                    <div className="mt-2">
                      <input type="file" ref={inputFileCandidate} onChange={onFileCandidateChange} id={"tags"}
                             style={{display: "none"}}/>
                      <div className="font-14-bold-500">Attachment file</div>
                      {fileAttach.candidate ? fileAttach.candidate?.map((item: any, index: any) => {
                        return <div key={index} className="flex-space-between">
                          <div className='pl-2' style={{color: "#1890ff", fontStyle: "italic"}}> {item?.name}</div>
                          <Popconfirm
                            title="Bạn muốn xóa file này chứ ?"
                            okText="Xóa"
                            onCancel={event => {
                              event?.stopPropagation();
                            }}
                            onConfirm={() => onDeleteFileCandidate(item, index)}
                          >
                            <div className="cursor-default"><Icon
                              type="delete"
                              style={{color: "#f5222d"}}/>
                            </div>
                          </Popconfirm>
                        </div>
                      }) : null}
                      <div className="cursor-default" style={{color: "#969C9D"}} onClick={onOpenFileCandidate}><Icon
                        type="tag"/> Click to add file
                      </div>
                    </div>
                  </div>
                </>}

                {/*email hội đồng tuyển dụng*/}
                {props.checked.interviewers.checkedList.length > 0
                &&
                <>
                  <div className="font-15-bold-500 mt-5 mb-2" style={{color: "red"}}>
                    Nội dung email gửi cho hội đồng tuyển dụng
                  </div>
                  <div style={{border: "1px solid #dddde4", padding: 15}}>
                    {props.checked.interviewers.checkedList.includes("system") &&
                    <Form.Item label="Đến" className="form-label mb-0" {...formItemLayout}>
                      {getFieldDecorator('usernameInterviewers', {
                        initialValue: undefined,
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
                        onSearch={onSearchInterviewer}
                        onFocus={onFocusInterviewer}
                        filterOption={false}
                        showSearch
                        placeholder="Chọn nhà tuyển dụng"
                      >
                        {account.interviewers?.map((item: any, index: any) => (
                          <Option key={index} value={item.username}>{item.fullName}</Option>
                        ))}
                      </Select>)}
                    </Form.Item>
                    }
                    {props.checked.interviewers.checkedList.includes("outSide") &&
                    <Form.Item label="Đến email nhà tuyển dụng ngoài hệ thống"
                               className="form-label mb-0" {...formItemLayout}>
                      {getFieldDecorator('emailInterviewers', {
                        initialValue: "",
                        rules: [
                          {
                            message: 'Vui lòng nhập nhà tuyển dụng ngoài hệ thống',
                            required: true,
                          },
                        ],
                      })(<Input placeholder={`Các email cách nhau bởi dấu ";"`} className="bg-white text-black"/>)}
                    </Form.Item>
                    }

                    <Form.Item label="Tên mẫu mail" className="form-label mb-0" {...formItemLayout}>
                      {getFieldDecorator('titleInterviewers', {
                        initialValue: JSON.stringify(emailTemp.interviewers[0]),
                        rules: [
                          {
                            message: 'Vui lòng nhập tên email mẫu',
                            required: false,
                          },
                        ],
                      })(<Select
                        getPopupContainer={(trigger: any) => trigger.parentNode}
                        onSearch={onSearchEmailInterviewer}
                        onFocus={onFocusEmailInterviewer}
                        onSelect={onSelectMailInterviewer}
                        filterOption={false}
                        showSearch
                        style={fontWeightStyle}
                        placeholder="Nhập tên email mẫu"
                        className="bg-white text-black form-label"
                      >
                        <Option key={"none"} value={""} label={"<None>"}>
                          <div>&lt;None&gt;</div>
                        </Option>
                        {emailTemp.interviewers?.map((item: any, index: any) => {
                          return <Option key={index} value={JSON.stringify(item)}>{item.name}</Option>
                        })}
                      </Select>)}
                    </Form.Item>

                    <Form.Item label="Tiêu đề mail" className="form-label" {...formItemLayout}>
                      {getFieldDecorator('subjectRecruitmentCouncil', {
                        initialValue: subject.interviewers,
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
                        className={display.interviewers ? "ql-custom ql-required" : "ql-custom "}
                        onChange={onChangeContentInterviewer}
                        value={valueEditor.interviewers || ""}

                        theme={'snow'}
                        modules={modules}
                        formats={formats}
                        bounds={'.app'}
                        placeholder="Nội dung email"
                      />
                      <div className={display.interviewers ? "value-required show" : "value-required hide"}>Vui lòng
                        nhập
                        nội dung
                      </div>
                    </div>

                    {/*File attachment*/}
                    <div className="mt-2">
                      <input type="file" ref={inputFileInterviewers} onChange={onFileInterviewerChange} id={"tags"}
                             style={{display: "none"}}/>
                      <div className="font-14-bold-500">Attachment file</div>
                      {fileAttach.interviewers ? fileAttach.interviewers?.map((item: any, index: any) => {
                        return <div key={index} className="flex-space-between">
                          <div className='pl-2' style={{color: "#1890ff", fontStyle: "italic"}}> {item?.name}</div>
                          <Popconfirm
                            title="Bạn muốn xóa file này chứ ?"
                            okText="Xóa"
                            onCancel={event => {
                              event?.stopPropagation();
                            }}
                            onConfirm={() => onDeleteFileInterviewer(item, index)}
                          >
                            <div className="cursor-default"><Icon
                              type="delete"
                              style={{color: "#f5222d"}}/>
                            </div>
                          </Popconfirm>
                        </div>
                      }) : null}

                      <div className="cursor-default" style={{color: "#969C9D"}} onClick={onOpenFileInterviewer}><Icon
                        type="tag"/> Click to add file
                      </div>
                    </div>
                  </div>
                </>
                }

                {/*email người giới thiệu*/}
                {props.checked.presenter.checkedList === "yes"
                &&
                <>
                  {/*-----------------------------*/}
                  {props.type==="schedule"&&
                  <>
                    <div className="font-15-bold-500 mt-5 mb-2" style={{color: "red"}}>
                      Nội dung email gửi cho người giới thiệu
                    </div>
                    <div style={{border: "1px solid #dddde4", padding: 15}}>

                      <Form.Item label="Đến" className="form-label mb-0" {...formItemLayout}>
                        {getFieldDecorator('usernamePresenter', {
                          initialValue: undefined,
                          rules: [
                            {
                              message: 'Vui lòng chọn người giới thiệu',
                              required: true,
                            },
                          ],
                        })(<Select
                          getPopupContainer={(trigger: any) => trigger.parentNode}
                          className="bg-white text-black"
                          style={{...fontWeightStyle, width: "100%"}}
                          onSearch={onSearchPresenter}
                          onFocus={onFocusPresenter}
                          filterOption={false}
                          showSearch
                          placeholder="Chọn người giới thiệu"
                        >
                          {account.presenter?.map((item: any, index: any) => (
                            <Option key={index} value={item.username}>{item.fullName}</Option>
                          ))}
                        </Select>)}
                      </Form.Item>

                      <Form.Item label="Đến email người giới thiệu ngoài hệ thống"
                                 className="form-label mb-0" {...formItemLayout}>
                        {getFieldDecorator('emailPresenter', {
                          initialValue: props.profile?.mailRef2,
                          rules: [
                            {
                              message: 'Vui lòng nhập email người giới thiệu ngoài hệ thống',
                              required: true,
                            },
                          ],
                        })(<Input placeholder="Nhập email " className="bg-white text-black"/>)}
                      </Form.Item>

                      <Form.Item label="Tên mẫu mail" className="form-label mb-0" {...formItemLayout}>
                        {getFieldDecorator('titlePresenter', {
                          initialValue: JSON.stringify(emailTemp.presenter[0]),
                          rules: [
                            {
                              message: 'Vui lòng nhập tên email mẫu',
                              required: false,
                            },
                          ],
                        })(<Select
                          getPopupContainer={(trigger: any) => trigger.parentNode}
                          style={fontWeightStyle}
                          placeholder="Nhập tên email mẫu"
                          onSearch={onSearchEmailPresenter}
                          onFocus={onFocusEmailPresenter}
                          onSelect={onSelectMailPresenter}
                          filterOption={false}
                          showSearch
                          className="bg-white text-black form-label"
                        >
                          <Option key={"none"} value={""} label={"<None>"}>
                            <div>&lt;None&gt;</div>
                          </Option>
                          {emailTemp.presenter?.map((item: any, index: any) => {
                            return <Option key={index} value={JSON.stringify(item)}>{item.name}</Option>
                          })}
                        </Select>)}
                      </Form.Item>

                      <Form.Item label="Tiêu đề mail" className="form-label" {...formItemLayout}>
                        {getFieldDecorator('subjectPresenter', {
                          initialValue: subject.presenter,
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
                          className={display.presenter ? "ql-custom ql-required" : "ql-custom "}
                          onChange={onChangeContentPresenter}
                          value={valueEditor.presenter || ""}

                          theme={'snow'}
                          modules={modules}
                          formats={formats}
                          bounds={'.app'}
                          placeholder="Nội dung email"
                        />
                        <div className={display.presenter ? "value-required show" : "value-required hide"}>Vui lòng
                          nhập
                          nội dung
                        </div>
                      </div>

                      {/*File attachment*/}
                      <div className="mt-2">
                        <input type="file" ref={inputFilePresenter} onChange={onFilePresenterChange} id={"tags"}
                               style={{display: "none"}}/>
                        <div className="font-14-bold-500">Attachment file</div>
                        {fileAttach.presenter ? fileAttach.presenter?.map((item: any, index: any) => {
                          return <div key={index} className="flex-space-between">
                            <div className='pl-2' style={{color: "#1890ff", fontStyle: "italic"}}> {item?.name}</div>
                            <Popconfirm
                              title="Bạn muốn xóa file này chứ ?"
                              okText="Xóa"
                              onCancel={event => {
                                event?.stopPropagation();
                              }}
                              onConfirm={() => onDeleteFilePresenter(item, index)}
                            >
                              <div className="cursor-default"><Icon
                                type="delete"
                                style={{color: "#f5222d"}}/>
                              </div>
                            </Popconfirm>
                          </div>
                        }) : null}

                        <div className="cursor-default" style={{color: "#969C9D"}} onClick={onOpenFilePresenter}><Icon
                          type="tag"/> Click to add file
                        </div>
                      </div>
                    </div>
                  </>
                  }
                  {/*-------------------------*/}
                  {props.profile?.hrRef || props.profile?.mailRef2 ?
                    <>
                      <div className="font-15-bold-500 mt-5 mb-2" style={{color: "red"}}>
                        Nội dung email gửi cho người giới thiệu
                      </div>
                      <div style={{border: "1px solid #dddde4", padding: 15}}>
                        {props.profile?.hrRef &&
                        <Form.Item label="Đến" className="form-label mb-0" {...formItemLayout}>
                          {getFieldDecorator('usernamePresenter', {
                            initialValue: props.profile?.hrRef,
                            rules: [
                              {
                                message: 'Vui lòng chọn người giới thiệu',
                                required: true,
                              },
                            ],
                          })(<Select
                            getPopupContainer={(trigger: any) => trigger.parentNode}
                            className="bg-white text-black"
                            style={{...fontWeightStyle, width: "100%"}}
                            onSearch={onSearchPresenter}
                            onFocus={onFocusPresenter}
                            filterOption={false}
                            showSearch
                            placeholder="Chọn người giới thiệu"
                          >
                            {account.presenter?.map((item: any, index: any) => (
                              <Option key={index} value={item.username}>{item.fullName}</Option>
                            ))}
                          </Select>)}
                        </Form.Item>
                        }

                        {props.profile?.mailRef2
                        &&
                        <Form.Item label="Đến email người giới thiệu ngoài hệ thống"
                                   className="form-label mb-0" {...formItemLayout}>
                          {getFieldDecorator('emailPresenter', {
                            initialValue: props.profile?.mailRef2,
                            rules: [
                              {
                                message: 'Vui lòng nhập email người giới thiệu ngoài hệ thống',
                                required: true,
                              },
                            ],
                          })(<Input placeholder="Nhập email " className="bg-white text-black"/>)}
                        </Form.Item>
                        }

                        <Form.Item label="Tên mẫu mail" className="form-label mb-0" {...formItemLayout}>
                          {getFieldDecorator('titlePresenter', {
                            initialValue: JSON.stringify(emailTemp.presenter[0]),
                            rules: [
                              {
                                message: 'Vui lòng nhập tên email mẫu',
                                required: false,
                              },
                            ],
                          })(<Select
                            getPopupContainer={(trigger: any) => trigger.parentNode}
                            style={fontWeightStyle}
                            placeholder="Nhập tên email mẫu"
                            onSearch={onSearchEmailPresenter}
                            onFocus={onFocusEmailPresenter}
                            onSelect={onSelectMailPresenter}
                            filterOption={false}
                            showSearch
                            className="bg-white text-black form-label"
                          >
                            <Option key={"none"} value={""} label={"<None>"}>
                              <div>&lt;None&gt;</div>
                            </Option>
                            {emailTemp.presenter?.map((item: any, index: any) => {
                              return <Option key={index} value={JSON.stringify(item)}>{item.name}</Option>
                            })}
                          </Select>)}
                        </Form.Item>

                        <Form.Item label="Tiêu đề mail" className="form-label" {...formItemLayout}>
                          {getFieldDecorator('subjectPresenter', {
                            initialValue: subject.presenter,
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
                            className={display.presenter ? "ql-custom ql-required" : "ql-custom "}
                            onChange={onChangeContentPresenter}
                            value={valueEditor.presenter || ""}

                            theme={'snow'}
                            modules={modules}
                            formats={formats}
                            bounds={'.app'}
                            placeholder="Nội dung email"
                          />
                          <div className={display.presenter ? "value-required show" : "value-required hide"}>Vui lòng
                            nhập
                            nội dung
                          </div>
                        </div>

                        {/*File attachment*/}
                        <div className="mt-2">
                          <input type="file" ref={inputFilePresenter} onChange={onFilePresenterChange} id={"tags"}
                                 style={{display: "none"}}/>
                          <div className="font-14-bold-500">Attachment file</div>
                          {fileAttach.presenter ? fileAttach.presenter?.map((item: any, index: any) => {
                            return <div key={index} className="flex-space-between">
                              <div className='pl-2' style={{color: "#1890ff", fontStyle: "italic"}}> {item?.name}</div>
                              <Popconfirm
                                title="Bạn muốn xóa file này chứ ?"
                                okText="Xóa"
                                onCancel={event => {
                                  event?.stopPropagation();
                                }}
                                onConfirm={() => onDeleteFilePresenter(item, index)}
                              >
                                <div className="cursor-default"><Icon
                                  type="delete"
                                  style={{color: "#f5222d"}}/>
                                </div>
                              </Popconfirm>
                            </div>
                          }) : null}

                          <div className="cursor-default" style={{color: "#969C9D"}} onClick={onOpenFilePresenter}><Icon
                            type="tag"/> Click to add file
                          </div>
                        </div>
                      </div>
                    </>
                    : null}

                </>
                }

                {/*Cán bộ liên quan*/}
                {props.checked.members.checkedList === "yes" &&
                <>
                  <div className="font-15-bold-500 mt-5 mb-2" style={{color: "red"}}>Nội dung email gửi cho cán bộ liên
                    quan
                  </div>
                  <div style={{border: "1px solid #dddde4", padding: 15}}>
                    <Form.Item label="Đến" className="form-label mb-0" {...formItemLayout}>
                      {getFieldDecorator('usernameMember', {
                        initialValue: undefined,
                        rules: [
                          {
                            message: 'Vui lòng chọn cán bộ liên quan',
                            required: true,
                          },
                        ],
                      })(<Select
                        getPopupContainer={(trigger: any) => trigger.parentNode}
                        className="bg-white text-black"
                        style={{...fontWeightStyle, width: "100%"}}
                        mode="multiple"
                        onSearch={onSearchMember}
                        onFocus={onFocusMember}
                        filterOption={false}
                        showSearch
                        placeholder="Chọn cán bộ liên quan"
                      >
                        {account.members?.map((item: any, index: any) => (
                          <Option key={index} value={item.username}>{item.fullName}</Option>
                        ))}
                      </Select>)}
                    </Form.Item>

                    <Form.Item label="Tên mẫu mail" className="form-label mb-0" {...formItemLayout}>
                      {getFieldDecorator('titleMember', {
                        initialValue: JSON.stringify(emailTemp.members[0]),
                        rules: [
                          {
                            message: 'Vui lòng nhập tên email mẫu',
                            required: false,
                          },
                        ],
                      })(<Select
                        getPopupContainer={(trigger: any) => trigger.parentNode}
                        style={fontWeightStyle}
                        placeholder="Nhập tên email mẫu"
                        onSearch={onSearchEmailMember}
                        onFocus={onFocusEmailMember}
                        filterOption={false}
                        showSearch
                        onSelect={onSelectMailMember}
                        className="bg-white text-black form-label"
                      >
                        <Option key={"none"} value={""} label={"<None>"}>
                          <div>&lt;None&gt;</div>
                        </Option>
                        {emailTemp.members?.map((item: any, index: any) => {
                          return <Option key={index} value={JSON.stringify(item)}>{item.name}</Option>
                        })}
                      </Select>)}
                    </Form.Item>

                    <Form.Item label="Tiêu đề mail" className="form-label" {...formItemLayout}>
                      {getFieldDecorator('subjectRelatedPeople', {
                        initialValue: subject.members,
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
                        className={display.members ? "ql-custom ql-required" : "ql-custom "}
                        onChange={onChangeContentMember}
                        value={valueEditor.members || ""}
                        theme={'snow'}
                        modules={modules}
                        formats={formats}
                        bounds={'.app'}
                        placeholder="Nội dung email"
                      />
                      <div className={display.members ? "value-required show" : "value-required hide"}>Vui lòng nhập
                        nội dung
                      </div>
                    </div>

                    {/*File attachment*/}
                    <div className="mt-2">
                      <input type="file" ref={inputFileMembers} onChange={onFileMemberChange} id={"tags"}
                             style={{display: "none"}}/>
                      <div className="font-14-bold-500">Attachment file</div>
                      {fileAttach.members ? fileAttach.members?.map((item: any, index: any) => {
                        return <div key={index} className="flex-space-between">
                          <div className='pl-2' style={{color: "#1890ff", fontStyle: "italic"}}> {item?.name}</div>
                          <Popconfirm
                            title="Bạn muốn xóa file này chứ ?"
                            okText="Xóa"
                            onCancel={event => {
                              event?.stopPropagation();
                            }}
                            onConfirm={() => onDeleteFileMember(item, index)}
                          >
                            <div className="cursor-default"><Icon
                              type="delete"
                              style={{color: "#f5222d"}}/>
                            </div>
                          </Popconfirm>
                        </div>
                      }) : null}

                      <div className="cursor-default" style={{color: "#969C9D"}} onClick={onOpenFileMember}><Icon
                        type="tag"/> Click to add file
                      </div>
                    </div>
                  </div>
                </>
                }

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

