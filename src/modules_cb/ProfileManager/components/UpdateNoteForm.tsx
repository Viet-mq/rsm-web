import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {updateNote} from "../redux/actions";
import {UpdateNoteRequest} from "../types";
import {showFormUpdateNote} from "../../ProfileManager/redux/actions/note/showNote";
import {getListAccount} from "../../AccountManager/redux/actions";

const {Option} = Select;
const { TextArea } = Input;

const mapStateToProps = (state: RootState) => ({
  showNote: state.profileManager.showNote,
  listAccount: state.accountManager.list,
})

const connector = connect(mapStateToProps,
  {
    showFormUpdateNote,
    updateNote,
    getListAccount,

  });

type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateProfileFormProps extends FormComponentProps, ReduxProps {
}

function UpdateProfileForm(props: UpdateProfileFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '60px'};
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
    if (props.showNote.show_note_update) {
      props.getListAccount({page: 1, size: 100});
    }

  }, [props.showNote.show_note_update])

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateNoteRequest = {
          id: props.showNote.data_update?.id,
          username: values.username,
          comment: values.comment,
          evaluation: values.evaluation,
          file: file,
        }
        props.updateNote(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdateNote(false);
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
        title="Sửa đánh giá"
        visible={props.showNote.show_note_update}
        centered={true}
        width="550px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
          props.showFormUpdateNote(false);
        }}
        footer={""}>

        <Form {...formItemLayout}>

          <Form.Item label="Người phỏng vấn" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('username', {
              initialValue: props.showNote.data_update?.username,
              rules: [
                {
                  message: 'Vui lòng chọn người phỏng vấn',
                  required: true,
                },
              ],
            })(
              <Select className="bg-white text-black"
              >
                {props.listAccount.rows?.map((item: any) => (
                  <Option key={item.username} value={item.username}>{item.fullName}</Option>
                ))}
              </Select>)}
          </Form.Item>

          <Form.Item label="Nhận xét" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('comment', {
              initialValue: props.showNote.data_update?.comment,
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

          <Form.Item label="Đánh giá" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('evaluation', {
              initialValue: props.showNote.data_update?.evaluation,
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

          <Form.Item label="File đính kèm" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('file', {
              initialValue: "",
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
            <Button className="mr-3 Update-btn" htmlType="submit" onClick={onBtnUpdateClicked}>
              Cập nhật
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

export default connector(Form.create<UpdateProfileFormProps>()(UpdateProfileForm));
