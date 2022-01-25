import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useState} from "react";
import {createRejectCandidate, showFormReasonReject} from "../redux/actions";
import {CreateRejectCandidateRequest, CreateRejectForm, MailForm, MailRequest} from "../types";
import {Editor} from "@tinymce/tinymce-react";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  reasonReject: state.reasonRejectManager.list,
  profileManager: state.profileManager
})

const connector = connect(mapStateToProps, {
  showFormReasonReject,
  createRejectCandidate
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function CreateRejectCandidateForm(props: IProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const [display, setDisplay] = useState(false)
  const [valueEditor, setValueEditor] = useState('<h1>Dear {name},</h1>\n' +
    '<p>{company}<em> ch&uacute;c mừng bạn đ&atilde; vượt qua v&ograve;ng thi tuyển vị tr</em>&iacute; {job} .Ph&ograve;ng nh&acirc;n sự xin mời <strong>bạn tham gia phỏng vấn với chi tiết như sau:&nbsp;</strong></p>\n' +
    '<p style="text-align: right;">&nbsp;-Thời gian: {date} {interview_time}</p>\n' +
    '<p style="text-align: right;">&nbsp;-Địa chỉ: {floor}, {interview_address}</p>\n' +
    '<p style="text-align: right;">&nbsp;-H&igrave;nh thức phỏng vấn: {interview_type}</p>')

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let rejectForm: CreateRejectForm = {
          idProfile: props.profileManager.detail?.params.idProfile,
          reason: values.reason,
          recruitmentId: props.profileManager.detail?.result?.recruitmentId,
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

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Lý do loại ứng viên"
      visible={props.profileManager.showForm.show_reason_reject}
      centered={true}
      width="700px"
      afterClose={onBtnCancelClicked}
      onCancel={onBtnCancelClicked}
      footer={""}>

      <Form>
        <Form.Item className="form-label" label="Lý do" labelCol={{span: 24}}
                   wrapperCol={{span: 24}}>
          {getFieldDecorator('reason', {
            initialValue: undefined,
            rules: [
              {
                message: 'Vui lòng chọn lý do loại',
                required: true,
              },
            ],
          })(
            <Select className="bg-white text-black" style={fontWeightStyle}
                    placeholder="Chọn lý do loại"
            >
              {props.reasonReject.rows?.map((item: any, index: any) => (
                <Option key={index} value={item.id}>{item.reason}</Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <div className="font-15-bold-500 mt-5 mb-2">Nội dung email</div>
        <div style={{border: "1px solid #dddde4", padding: 15}}>


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
              initialValue: "Thư mời phỏng vấn vị trí1 {job}",
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
                menubar: false,
                toolbar: 'undo redo | bold italic underline strikethrough |alignleft aligncenter alignright alignjustify | outdent indent |fontselect fontsizeselect formatselect |    numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                toolbar_mode: 'sliding',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
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

  );

}

export default connector(Form.create<IProps>()(CreateRejectCandidateForm));
