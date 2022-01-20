import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {createBooking, showEmailCreateForm} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {CreateBookingRequest, MailForm, MailRequest} from "../types";

const {Option} = Select;
const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  showBooking: state.profileManager.showBooking,
})

const connector = connect(mapStateToProps,
  {
    createBooking,
    showEmailCreateForm,
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
  reqCreate: any
}

function CreateEmailForm(props: IProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const formItemStyle = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
  };
  const [display, setDisplay] = useState(false)
  const [valueEditor, setValueEditor] = useState('<h1>Dear {name},</h1>\n' +
    '<p>{company}<em> ch&uacute;c mừng bạn đ&atilde; vượt qua v&ograve;ng thi tuyển vị tr</em>&iacute; {job} .Ph&ograve;ng nh&acirc;n sự xin mời <strong>bạn tham gia phỏng vấn với chi tiết như sau:&nbsp;</strong></p>\n' +
    '<p style="text-align: right;">&nbsp;-Thời gian: {date} {interview_time}</p>\n' +
    '<p style="text-align: right;">&nbsp;-Địa chỉ: {floor}, {interview_address}</p>\n' +
    '<p style="text-align: right;">&nbsp;-H&igrave;nh thức phỏng vấn: {interview_type}</p>')

  function onBtnCancelClicked() {
    resetFields();
    props.showEmailCreateForm(false);
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

        let mailRequest: MailRequest = {
          candidate: mailFormCandidate,
          recruitmentCouncils: mailFormInterviewers
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

            <div style={{padding: "24px"}}>
              <div className="schedule-detail-title">Email thông báo</div>
            </div>
            <div style={{height: 700, padding: "0 24px 24px", overflow: "auto"}}>
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

                <div className="font-15-bold-500 mt-5 mb-2">Nội dung email gửi cho Hội đồng tuyển dụng</div>

                <div style={{border: "1px solid #dddde4", padding: 15}}>
                  <Form.Item label="Đến" className="form-label" {...formItemStyle}>
                    {getFieldDecorator('name', {
                      initialValue: props.reqCreate?.interviewers || undefined,
                      rules: [
                        {
                          message: 'Vui lòng nhập tên trường',
                          required: false,
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

export default connector(Form.create<IProps>()(CreateEmailForm));

