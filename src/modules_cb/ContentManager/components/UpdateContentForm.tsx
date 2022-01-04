import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {createChatBotContent, showFormCreateContent} from "../redux/actions";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useState} from "react";
import {CreateContentReq} from "../types";

const {Option} = Select;

const mapState = ({contentManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormCreateContent, createChatBotContent});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateContentFormProps extends FormComponentProps, ReduxProps {
}

function UpdateContentForm(props: UpdateContentFormProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  const formItemStyle = {height: '60px'};
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
        let req: CreateContentReq = {
          username: values.username,
          password: values.password,
          role: values.role,
          fullName: values.full_name,
          dateOfBirth: values.date_of_birth,
        }
        props.createChatBotContent(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormCreateContent(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhât nội dung"
      visible={props.showForm.show_update}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormCreateContent(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên đăng nhập" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('username', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên đăng nhập',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên đăng nhập" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Họ tên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('full_name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập họ tên',
                required: true,
              },
            ],
          })(
            <Input placeholder="Họ tên" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Mật khẩu" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập mật khẩu',
                required: true,
              },
            ],
          })(
            <Input placeholder="Mật khẩu" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Role" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('role', {
            initialValue: '1',
            rules: [
              {
                message: 'Vui lòng chọn role',
                required: true,
              },
            ],
          })(
            <Select
              placeholder="Chọn role"
            >
              <Option value="0">Admin</Option>
              <Option value="1">User</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Ngày sinh" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('date_of_birth', {
            initialValue: '',
            rules: [
              {required: true, message: 'Vui lòng nhập ngày sinh'}
            ],
          })(
            <Input placeholder="Ngày sinh" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
            Cập nhật
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  );

}

export default connector(Form.create<UpdateContentFormProps>()(UpdateContentForm));
