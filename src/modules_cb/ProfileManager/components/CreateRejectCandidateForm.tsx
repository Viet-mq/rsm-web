import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Input, Modal, Select} from "antd";
import React, {FormEvent, useState} from "react";
import {createRejectCandidate, showFormReasonReject} from "../redux/actions";
import {CreateRejectCandidateRequest, CreateRejectForm, MailForm, MailRequest} from "../types";

import ReactQuill from "react-quill";
import {showFormCreate} from "../../ReasonRejectManager/redux/actions";
import CreateReasonRejectForm from "../../ReasonRejectManager/components/CreateReasonRejectForm";
import Loading from "../../../components/Loading";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  reasonReject: state.reasonRejectManager.list,
  createReasonReject: state.reasonRejectManager.create,
  profileManager: state.profileManager
})

const connector = connect(mapStateToProps, {
  showFormReasonReject,
  createRejectCandidate,
  showFormCreate,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function CreateRejectCandidateForm(props: IProps) {
  const {detail, showForm} = props.profileManager

  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const [display, setDisplay] = useState(false)
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 24},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 24},
    },
  };
  const [valueEditor, setValueEditor] = useState('<h1>Dear {name},</h1>\n' +
    '<p>{company}<em> ch&uacute;c mừng bạn đ&atilde; vượt qua v&ograve;ng thi tuyển vị tr</em>&iacute; {job} .Ph&ograve;ng nh&acirc;n sự xin mời <strong>bạn tham gia phỏng vấn với chi tiết như sau:&nbsp;</strong></p>\n' +
    '<p style="text-align: right;">&nbsp;-Thời gian: {date} {interview_time}</p>\n' +
    '<p style="text-align: right;">&nbsp;-Địa chỉ: {floor}, {interview_address}</p>\n' +
    '<p style="text-align: right;">&nbsp;-H&igrave;nh thức phỏng vấn: {interview_type}</p>')
  const modules = {
    toolbar: [
      [{'header': '1'}, {'header': '2'}],
      ['blockquote', 'code-block'],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'direction': 'rtl'}],                         // text direction
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
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

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let rejectForm: CreateRejectForm = {
          idProfile: detail?.params.idProfile,
          reason: values.reason,
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
                <Select className="bg-white text-black" style={fontWeightStyle}
                        placeholder="Chọn lý do loại"
                >
                  {props.reasonReject.rows?.map((item: any, index: any) => (
                    <Option key={index} value={item.id}>{item.reason}</Option>
                  ))}
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
