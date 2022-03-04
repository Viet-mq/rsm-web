import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createNote} from "../redux/actions";
import {CreateNoteRequest} from "../types";
import {showFormCreateNote} from "../../ProfileManager/redux/actions/note/showNote";
import {getListAccount} from "../../AccountManager/redux/actions";

const {Option} = Select;
const { TextArea } = Input;

const mapStateToProps = (state: RootState) => ({
  showNote: state.profileManager.showNote,
  listAccount: state.accountManager.list,
})

const connector = connect(mapStateToProps,
  {
    showFormCreateNote,
    createNote,
    getListAccount,

  });

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateProfileFormProps extends FormComponentProps, ReduxProps {
}

function CreateProfileForm(props: CreateProfileFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const [file, setFile] = useState(null);

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12},
    },
  };
  useEffect(() => {
    if (props.showNote.show_note_create) {
      props.getListAccount({page: 1, size: 100});
    }

  }, [props.showNote.show_note_create])

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateNoteRequest = {
          idProfile: props.showNote.idProfile,
          username: values.username,
          comment: values.comment,
          evaluation: values.evaluation,
          file: file,
        }
        props.createNote(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreateNote(false);
  }

  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
    console.log("file:", e.target.files[0]);
  }

  return (
    <div>
      <Modal
        zIndex={2}
        maskClosable={false}
        title="Tạo mới Đánh giá"
        visible={props.showNote.show_note_create}
        centered={true}
        width="550px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
          props.showFormCreateNote(false);
        }}
        footer={""}>

        <Form {...formItemLayout}>

          <Form.Item label="Người phỏng vấn" className="mb-0" style={{height:50}}>
            {getFieldDecorator('username', {
              initialValue: '',
              rules: [
                {
                  message: 'Vui lòng chọn người phỏng vấn',
                  required: true,
                },
              ],
            })(
            <Select getPopupContainer={(trigger:any) => trigger.parentNode} className="bg-white text-black"
              >
                {props.listAccount.rows?.map((item: any) => (
                  <Option key={item.username} value={item.username}>{item.fullName}</Option>
                ))}
              </Select>)}
          </Form.Item>

          <Form.Item label="Nhận xét" className="mb-0" style={{height:110}}>
            {getFieldDecorator('comment', {
              initialValue: '',
              rules: [
                {
                  message: 'Vui lòng nhập Nhận xét',
                  required: true,
                },
              ],
            })(
              <TextArea placeholder="Nhận xét" style={{height:"100px"}} className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label="Đánh giá" className="mb-0" style={{height:50}}>
            {getFieldDecorator('evaluation', {
              initialValue: '',
              rules: [
                {
                  message: 'Vui lòng nhập Đánh giá',
                  required: true,
                },
              ],
            })(
              <Input placeholder="Đánh giá" className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label="File đính kèm" className="mb-0" style={{height:50}}>
            {getFieldDecorator('file', {
              initialValue: '',
              rules: [
                {
                  message: 'Vui lòng chọn file đính kèm',
                  required: false,
                },
              ],
            })(
              <Input placeholder="File đính kèm" type="file" className="bg-white text-black" onChange={onFileChange}/>
            )}
          </Form.Item>

          <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
            <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
              Tạo mới
            </Button>
            <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
              Hủy
            </Button>
          </Form.Item>

        </Form>

      </Modal>

    </div>
  );

}

export default connector(Form.create<CreateProfileFormProps>()(CreateProfileForm));
