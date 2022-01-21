import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Radio, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import {changeProcess, showChangeProcessForm} from "../redux/actions";
import {getListRecruitment} from "../../RecruitmentManager/redux/actions";
import {ChangeProcessRequest, MailForm, MailRequest, ProcessForm} from "../types";
import {Editor} from "@tinymce/tinymce-react";

const {Option} = Select;
const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  recruitment: state.recruitmentManager.list,
  listAccount: state.accountManager.list,

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
  const {getFieldDecorator, resetFields} = props.form;
  const [display, setDisplay] = useState(false)
  const fontWeightStyle = {fontWeight: 400};
  const formItemStyle = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
  };
  const [valueEditor, setValueEditor] = useState('<h1>Dear {name},</h1>\n' +
    '<p>{company}<em> ch&uacute;c mừng bạn đ&atilde; vượt qua v&ograve;ng thi tuyển vị tr</em>&iacute; {job} .Ph&ograve;ng nh&acirc;n sự xin mời <strong>bạn tham gia phỏng vấn với chi tiết như sau:&nbsp;</strong></p>\n' +
    '<p style="text-align: right;">&nbsp;-Thời gian: {date} {interview_time}</p>\n' +
    '<p style="text-align: right;">&nbsp;-Địa chỉ: {floor}, {interview_address}</p>\n' +
    '<p style="text-align: right;">&nbsp;-H&igrave;nh thức phỏng vấn: {interview_type}</p>')

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

  function btnChangeProcessClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
    let mailFormCandidate: MailForm = {
      subject: values.subjectCandidate,
      content: valueEditor,
    }

    let mailFormPresenter: MailForm = {
      subject: values.subjectPresenter,
      content: values.contentPresenter,
    }

    let mailRequest: MailRequest = {
      candidate: mailFormCandidate,
      presenters:mailFormPresenter
    }

    let processForm: ProcessForm = ({
        idProfile: props.profileManager.showForm.change_process?.idProfile,
        recruitmentId: props.profileManager.showForm.change_process?.recruitmentId,
        statusCVId: process
      })

    let req: ChangeProcessRequest = ({
      changeProcess: processForm,
      mailRequest: mailRequest,
      })
    props.changeProcess(req,false)
        return;
      }
    });

  }

  function handleChangeProcess(event: any) {
    setProcess(event.target.value)
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

  return (
    <>
      <Modal
        zIndex={2}
        maskClosable={false}
        visible={props.profileManager.showForm.show_change_process}
        centered={true}
        width="700px"
        className="custom"
        afterClose={() => {
        }}
        onCancel={() => {
          props.showChangeProcessForm(false)
        }}
        footer={""}>
        <div style={{overflow:"auto",height:700}}>
          <div className="schedule-detail" style={{paddingBottom:0}}>
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

          <div style={{padding: "0 24px 24px 24px"}}>
            <div className="schedule-detail-title">Email thông báo</div>
          </div>
          <div style={{padding: "0 24px 24px"}}>
            <div className="font-15-bold-500">Nội dung email gửi cho ứng viên</div>
            <Form>
              <Form.Item className="form-label" label="Tên mẫu mail" labelCol={{span: 24}}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('title', {
                  initialValue: 'Thư xác nhận',
                  rules: [
                    {
                      message: 'Vui lòng nhập tên mẫu',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Nhập tên mẫu" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item className="form-label" label="Tiêu đề mail" labelCol={{span: 24}}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('subjectCandidate', {
                  initialValue: "Thư mời phỏng vấn vị trí {job}",
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

              <div className="font-15-bold-500 mt-5 mb-2">Nội dung email gửi cho người giới thiệu</div>
              <div style={{border: "1px solid #dddde4", padding: 15}}>
                <Form.Item label="Đến" className="form-label" {...formItemStyle}>
                  {getFieldDecorator('username', {
                    initialValue: undefined,
                    rules: [
                      {
                        message: 'Vui lòng nhập tên trường',
                        required: false,
                      },
                    ],
                  })(<Select className="bg-white text-black" style={{...fontWeightStyle, width: "100%"}}
                             showSearch
                             disabled
                             showArrow={false}
                  >
                    {props.listAccount.rows?.map((item: any, index: any) => (
                      <Option key={index} value={item.username}>{item.fullName}</Option>
                    ))}
                  </Select>)}
                </Form.Item>

                <Form.Item label="Tiêu đề" className="form-label" {...formItemStyle}>
                  {getFieldDecorator('subjectPresenter', {
                    initialValue: 'Lịch phỏng vấn vị trí {job}',
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
