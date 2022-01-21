import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {FormEvent, useRef, useState} from "react";
import {Button, Col, Form, Input, Row} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {Editor} from "@tinymce/tinymce-react";
import {Link} from "react-router-dom";
import {CreateEmailRequest} from "../types";
import {createEmail} from "../redux/actions";

const mapStateToProps = (state: RootState) => ({})

const connector = connect(mapStateToProps,
  {
    createEmail
  })
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {
}

function CreateEmailForm(props: IProps) {
  const {getFieldDecorator} = props.form;
  const [display, setDisplay] = useState(false)
  const [valueEditor, setValueEditor] = useState('<h1>Dear {name},</h1>\n' +
    '<p>{company}<em> ch&uacute;c mừng bạn đ&atilde; vượt qua v&ograve;ng thi tuyển vị tr</em>&iacute; {job} .Ph&ograve;ng nh&acirc;n sự xin mời <strong>bạn tham gia phỏng vấn với chi tiết như sau:&nbsp;</strong></p>\n' +
    '<p style="text-align: right;">&nbsp;-Thời gian: {date} {interview_time}</p>\n' +
    '<p style="text-align: right;">&nbsp;-Địa chỉ: {floor}, {interview_address}</p>\n' +
    '<p style="text-align: right;">&nbsp;-H&igrave;nh thức phỏng vấn: {interview_type}</p>')


  const inputEl = useRef<any>(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();

  };

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateEmailRequest = {
          content: valueEditor,
          name: values.name,
          subject: values.subject,
          type: values.type
        };
        props.createEmail(req);
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
    <div className="page-container">
      <Row style={{display: "flex"}}>
        <Col span={18} className='mail-content grid-left'>
          <div>
            <Form>
              <Form.Item className="form-label" label="Loại email" labelCol={{span: 24}}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('type', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Vui lòng chọn loại email',
                      required: false,
                    },
                  ],
                })(
                  <Input placeholder="Nhập tên mẫu" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item className="form-label" label="Tên mẫu mail" labelCol={{span: 24}}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('name', {
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
                {getFieldDecorator('subject', {
                  initialValue: "Bạn vừa ứng tuyển vào  [ Tên công ty ]",
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

            </Form>
          </div>
        </Col>
        <Col span={6} className="email-option-variable grid-left">
          <div>
            <div className="form-label mb-3">Biến mẫu</div>
            <div className="mb-2">
              <span style={{color: "red"}}>[ </span><span>Vị trí tuyển dụng</span><span style={{color: "red"}}> ]</span>
            </div>
            <div>
              <span style={{color: "red"}}>[ </span><span>Vị trí tuyển dụng</span><span style={{color: "red"}}> ]</span>
            </div>
          </div>
          <Button onClick={onButtonClick}>Haaha</Button>
        </Col>
      </Row>
      <div className="footer-right">

        <Link to={`/email-manager`}>
          <Button>Hủy</Button>
        </Link>
        <Button onClick={onBtnCreateClicked} type={"primary"} className="ml-2">Lưu</Button>
      </div>
    </div>
  );

}

export default connector(Form.create<IProps>()(CreateEmailForm));
