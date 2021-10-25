import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateAccount} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {UpdateAccountRequest} from "../types";

const mapState = ({accountManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormUpdate, updateAccount});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateAccountFormProps extends FormComponentProps, ReduxProps {
}

function UpdateAccountForm(props: UpdateAccountFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
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

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateAccountRequest = {
          username: values.username,
          fullName: values.full_name,
          dateOfBirth: values.date_of_birth,
        }
        props.updateAccount(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdate(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật tài khoản hệ thống"
      visible={props.showForm.show_update}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showFormUpdate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên đăng nhập" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('username', {
            initialValue: props.showForm.data_update?.username,
            rules: [
              {
                message: 'Vui lòng nhập tên đăng nhập',
                required: true,
              },
            ],
          })(
            <Input disabled placeholder="Tên đăng nhập" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Họ tên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('full_name', {
            initialValue: props.showForm.data_update?.fullName,
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

        <Form.Item label="Ngày sinh" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('date_of_birth', {
            initialValue: props.showForm.data_update?.dateOfBirth,
            rules: [
              {required: true, message: 'Vui lòng nhập ngày sinh'}
            ],
          })(
            <Input placeholder="Ngày sinh" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnUpdateClicked}>
            Cập nhật
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  )
}

export default connector(Form.create<UpdateAccountFormProps>()(UpdateAccountForm));
