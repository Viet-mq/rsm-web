import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateAccount} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select, TreeSelect} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {UpdateAccountRequest} from "../types";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  accountManager: state.accountManager,
  listRole: state.rolesManager.list,
  listCompany: state.companyManager.list
});

const connector = connect(mapStateToProps, {showFormUpdate, updateAccount});
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
  const fontWeightStyle = {fontWeight: 400};
  const {showForm} = props.accountManager
  const [company, setCompany] = useState<any>([]);

  useEffect(() => {
    setCompany(recursiveCompany(props.listCompany.rows))
  }, [props.listCompany.rows])

  function recursiveCompany(data: any) {
    return data?.map((item: any) => ({
      title: item.name,
      value: item.id,
      key: item.id,
      children: recursiveCompany(item.children),
    }))
  }

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
          email: values.email,
          organizations: values.organization,
          roles: values.roles,

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
      visible={showForm.show_update}
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

        <Form.Item label="Họ tên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('full_name', {
            initialValue: showForm.data_update?.fullName,
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
            initialValue: showForm.data_update?.email,
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
            initialValue: showForm.data_update?.username,
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

        <Form.Item label="Roles" className="mb-0 " style={{...formItemStyle}}>
          {getFieldDecorator('roles', {
            initialValue: showForm.data_update?.roles?.map((item: any) => item.id),
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
            initialValue: showForm.data_update?.organizations,
            rules: [
              {
                message: 'Vui lòng chọn công ty',
                required: true,
              },
            ],
          })(
            // <Select  getPopupContainer={(trigger: any) => trigger.parentNode}
            //          placeholder="Chọn công ty"
            //          filterOption={(input, option: any) =>
            //            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            //          }
            //          optionFilterProp="children"
            //          showSearch
            //          style={fontWeightStyle}
            //          className="bg-white text-black form-label"
            // >
            //   {props.listCompany.rows?.map((item: any) => (
            //     <Option key={item.id} value={item.id}>{item.name}</Option>
            //   ))}
            //
            // </Select>

            <TreeSelect
              treeData={company}
              treeCheckable={true}
              showCheckedStrategy={"SHOW_PARENT"}
              searchPlaceholder='Chọn công ty'
              style={fontWeightStyle}
            />
            ,
          )}
        </Form.Item>

        <Form.Item label="Ngày sinh" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('date_of_birth', {
            initialValue: showForm.data_update?.dateOfBirth,
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
