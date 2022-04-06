import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {createAccount, showFormCreate} from "../redux/actions";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent} from "react";
import {CreateAccountRequest} from "../types";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  accountManager: state.accountManager,
  listRole: state.rolesManager.list,
  listCompany:state.companyManager.list
});

const connector = connect(mapStateToProps, {showFormCreate, createAccount});
type ReduxProps = ConnectedProps<typeof connector>;

interface CreateAccountFormProps extends FormComponentProps, ReduxProps {
}

function CreateAccountForm(props: CreateAccountFormProps) {
  const {showForm} = props.accountManager
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
  const fontWeightStyle = {fontWeight: 400};

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateAccountRequest = {
          username: values.username,
          password: values.password,
          roles: values.role,
          email: values.email,
          fullName: values.fullName,
          dateOfBirth: values.dateOfBirth,
          organizations: values.organization,
        }
        props.createAccount(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo tài khoản hệ thống"
      visible={showForm.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showFormCreate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Họ tên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('fullName', {
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

        <Form.Item label="Email" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('email', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập email',
                required: true,
              },
            ],
          })(
            <Input placeholder="Email" className="bg-white text-black"/>
          )}
        </Form.Item>

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
            <Input.Password placeholder="Mật khẩu" type={'password'} className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Role" className="mb-0 " style={{...formItemStyle}}>
          {getFieldDecorator('role', {
            initialValue: undefined,
            rules: [
              {
                message: 'Vui lòng chọn role',
                required: true,
              },
            ],
          })(
            <Select mode="multiple" getPopupContainer={(trigger: any) => trigger.parentNode}
                    placeholder="Chọn role"
                    filterOption={(input, option: any) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    optionFilterProp="children"
                    showSearch
                    style={fontWeightStyle}

                    className="bg-white text-black form-label"
            >
              {props.listRole.rows?.map((item: any) => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}

            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Thuộc công ty" className="mb-0 " style={{...formItemStyle}}>
          {getFieldDecorator('organization', {
            initialValue: undefined,
            rules: [
              {
                message: 'Vui lòng chọn công ty',
                required: true,
              },
            ],
          })(
            <Select  getPopupContainer={(trigger: any) => trigger.parentNode}
                    placeholder="Chọn công ty"
                    filterOption={(input, option: any) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    optionFilterProp="children"
                    showSearch
                    style={fontWeightStyle}
                    className="bg-white text-black form-label"
            >
              {props.listCompany.rows?.map((item: any) => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}

            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Ngày sinh" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('dateOfBirth', {
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
            Tạo mới
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  )
}

export default connector(Form.create<CreateAccountFormProps>()(CreateAccountForm));
