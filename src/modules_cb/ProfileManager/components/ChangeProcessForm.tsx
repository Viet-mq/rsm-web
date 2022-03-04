import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Input, Modal, Radio, Select} from "antd";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import {changeProcess, showChangeProcessForm} from "../redux/actions";
import {getListRecruitment} from "../../RecruitmentManager/redux/actions";
import {ChangeProcessRequest, MailForm, MailRequest, ProcessForm} from "../types";
import 'react-quill/dist/quill.snow.css';
import {getListEmail} from "../../EmailManager/redux/actions";
import {EmailEntity} from "../../EmailManager/types";
import ReactQuill from "react-quill";

const {Option} = Select;
const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  recruitment: state.recruitmentManager.list,
  listAccount: state.accountManager.list,
  emailManager: state.emailManager.list,
})

const connector = connect(mapStateToProps,
  {
    showChangeProcessForm,
    changeProcess,
    getListRecruitment,
    getListEmail
  })

type ReduxProps = ConnectedProps<typeof connector>;
interface IProps extends FormComponentProps, ReduxProps {}

function ChangeProcessForm(props: IProps) {
  const fontWeight = {
    fontWeight: 500
  }
  const {showForm} = props.profileManager
  const [process, setProcess] = useState<any>('')
  const {getFieldDecorator, resetFields} = props.form;
  const [display, setDisplay] = useState(false)
  const fontWeightStyle = {fontWeight: 400};
  const formItemStyle = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
  };
  const [emailTemp, setEmailTemp] = useState<EmailEntity>()
  const [valueEditor, setValueEditor] = useState("")
  const inputFile = useRef<any>(null)
  const [fileAttach, setFileAttach] = useState<any>([]);
  const modules = {
    toolbar: [
      [{'header': '1'}, {'header': '2'}],
      ['blockquote', 'code-block'],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
    ],

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  useEffect(() => {
    if (showForm.show_change_process) {
      props.getListRecruitment({id: showForm.change_process?.recruitmentId})
      setProcess(showForm.change_process?.statusCVId)

      props.getListEmail({page: 1, size: 91});
    }
  }, [showForm.show_change_process])


  useEffect(() => {
    if (showForm.show_change_process && props.emailManager) {
      setEmailTemp(props.emailManager.rows[0])
      setValueEditor(props.emailManager.rows[0]?.content)
    }
  }, [props.emailManager])


  const handleCloseForm = () => {
    resetFields()
    props.showChangeProcessForm(false)
    setValueEditor("")
    setEmailTemp(undefined)
  }

  function btnChangeProcessClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let mailFormCandidate: MailForm = {
          subject: values.subjectCandidate,
          content: valueEditor,
          file:fileAttach
        }

        let mailFormPresenter: MailForm = {
          subject: values.subjectPresenter,
          content: values.contentPresenter,
        }

        let mailRequest: MailRequest = {
          candidate: mailFormCandidate,
          presenters: mailFormPresenter
        }

        let processForm: ProcessForm = ({
          idProfile: showForm.change_process?.idProfile,
          recruitmentId: showForm.change_process?.recruitmentId,
          statusCVId: process
        })

        let req: ChangeProcessRequest = ({
          changeProcess: processForm,
          mailRequest: mailRequest,
        })
        props.changeProcess(req, false)
        return;
      }
    });

  }

  function handleChangeProcess(event: any) {
    setProcess(event.target.value)
  }

  function handleChangeMailContent(content: string) {
    if (content === "<p><br></p>") {
      setDisplay(true)
      setValueEditor("")
    } else {
      setDisplay(false)
      setValueEditor(content)
    }
  }

  function handleSelectMailTemplate(value: any) {
    const selectEmail= props.emailManager.rows.find((item:any)=>item.id===value)
    setEmailTemp(selectEmail)
    setValueEditor(selectEmail.content)
  }

  function onFileChange(e: any) {
    const newFile = fileAttach.concat(e.target.files[0])
    setFileAttach(newFile);
  }

  function handleDeleteFile(item:any,index:any) {
    const newFile = Array.from(fileAttach);
    newFile.splice(index,1)
    setFileAttach(newFile)
  }

  const onOpenFileClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
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
        <div style={{overflow: "auto", height: 700}}>
          <div className="schedule-detail" style={{paddingBottom: 0}}>
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

          {/*email ứng viên*/}
          <div style={{padding: "0 24px 24px 24px"}}>
            <div className="schedule-detail-title">Email thông báo</div>
          </div>
          <div style={{padding: "0 24px 24px"}}>
            <div className="font-15-bold-500">Nội dung email gửi cho ứng viên</div>
            <Form>
              <Form.Item className="form-label" label="Tên mẫu mail" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                {getFieldDecorator('title', {
                  initialValue: emailTemp?.id,
                  rules: [
                    {
                      message: 'Vui lòng nhập tên mẫu',
                      required: true,
                    },
                  ],
                })(
                <Select getPopupContainer={(trigger:any) => trigger.parentNode} onSelect={handleSelectMailTemplate} style={fontWeightStyle}
                          placeholder="Nhập tên mẫu">
                    {props.emailManager.rows?.map((item: any, index: any) => {
                      return <Option key={index} value={item.id}>{item.name}</Option>
                    })}
                  </Select>
                )}
              </Form.Item>

              <Form.Item className="form-label" label="Tiêu đề mail" labelCol={{span: 24}} wrapperCol={{span: 24}}>
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
                
                <ReactQuill
                  style={fontWeightStyle}
                  className="ql-custom"
                  onChange={handleChangeMailContent}
                  value={valueEditor||""}
                  theme={'snow'}
                  modules={modules}
                  formats={formats}
                  // bounds={'.app'}
                  placeholder="Mô tả công việc"
                />
                <div className={display ? "value-required show" : "value-required hide"}>Vui lòng nhập nội dung</div>
              </div>

              {/*File attachment*/}
              <div className="mt-2">
                <input type="file" ref={inputFile} onChange={onFileChange} id={"tags"} style={{display: "none"}}/>
                <div className="font-14-bold-500">Attachment file</div>
                {fileAttach ? fileAttach?.map((item: any,index:any) => {
                  return <div key={index} className="flex-space-between">
                    <div className='pl-2' style={{color: "#1890ff",fontStyle:"italic"}}> {item?.name}</div>
                    <div className="cursor-default" onClick={()=>handleDeleteFile(item,index)}><Icon type="delete" style={{color: "#f5222d"}}/></div>
                  </div>
                }) : null}
                <div className="cursor-default" style={{color: "#969C9D"}} onClick={onOpenFileClick}><Icon type="tag"/> Click to add file</div>
              </div>

              {/*email người giới thiệu */}
              <div className="font-15-bold-500 mt-5 mb-2">Nội dung email gửi cho người giới thiệu</div>
              <div style={{border: "1px solid #dddde4", padding: 15}}>
                <Form.Item label="Đến" className="form-label" {...formItemStyle}>
                  {getFieldDecorator('username', {
                    initialValue: showForm.change_process?.username || undefined,
                    rules: [
                      {
                        message: 'Vui lòng nhập tên trường',
                        required: false,
                      },
                    ],
                  })(<Select className="bg-white text-black" style={{...fontWeightStyle, width: "100%"}}
                             mode="multiple"
                  >
                    {props.listAccount.rows?.map((item: any, index: any) => (
                      <Option key={index} value={item.username}>{item.fullName}</Option>
                    ))}
                  </Select>)}
                </Form.Item>

                <Form.Item label="Tiêu đề" className="form-label" {...formItemStyle}>
                  {getFieldDecorator('subjectPresenter', {
                    initialValue: emailTemp?.subject,
                    rules: [
                      {
                        message: 'Vui lòng nhập tên trường',
                        required: false,
                      },
                    ],
                  })(<Input placeholder="Nhập tiêu đề" className="bg-white text-black"/>)}
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
