import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateBlacklist} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {UpdateBlacklistRequest} from "../types";

const mapState = ({blacklistManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormUpdate, updateBlacklist});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateBlacklistFormProps extends FormComponentProps, ReduxProps {
}

function UpdateBlacklistForm(props: UpdateBlacklistFormProps) {

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
        let req: UpdateBlacklistRequest = {
          id: props.showForm.data_update?.id,
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          reason: values.reason,
          ssn: values.ssn
        }
        props.updateBlacklist(req);
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
      title="Cập nhật Blacklist hệ thống"
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

        <Form.Item label="Tên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên ',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên " className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Email" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('email', {
            initialValue: props.showForm.data_update?.email,
            rules: [
              {
                message: 'Vui lòng nhập Email',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập Email" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="SĐT" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('phoneNumber', {
            initialValue: props.showForm.data_update?.phoneNumber,
            rules: [
              {
                message: 'Vui lòng nhập SĐT',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập SĐT" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Lý do" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('reason', {
            initialValue: props.showForm.data_update?.reason,
            rules: [
              {
                message: 'Vui lòng nhập Lý do',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập Lý do" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="SSN" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('ssn', {
            initialValue: props.showForm.data_update?.ssn,
            rules: [
              {
                message: 'Vui lòng nhập SSN',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập SSN" className="bg-white text-black"/>)}
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

export default connector(Form.create<UpdateBlacklistFormProps>()(UpdateBlacklistForm));
