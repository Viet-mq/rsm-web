import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {changePassword, showFormChangePassword} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {ChangePasswordAccRequest} from "../types";

const mapState = ({accountManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormChangePassword, changePassword});
type ReduxProps = ConnectedProps<typeof connector>;

interface ChangePasswordFormProps extends FormComponentProps, ReduxProps {
}

function ChangePasswordAccountForm(props: ChangePasswordFormProps) {

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

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: ChangePasswordAccRequest = {
          username: values.username,
          newPassword: values.password,
          oldPassword: values.password,
        }
        props.changePassword(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormChangePassword(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Đổi mật khẩu"
      visible={props.showForm.show_change_password}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormChangePassword(false);
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

        <Form.Item label="Mật khẩu mới" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập mật khẩu',
                required: true,
              },
            ],
          })(
            <Input.Password
              placeholder="Mật khẩu mới"
              className="bg-white text-black"
            />
          )}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnUpdateClicked}>
            Đổi mật khẩu
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  );

}

export default connector(Form.create<ChangePasswordFormProps>()(ChangePasswordAccountForm));
