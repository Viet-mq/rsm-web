import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {createBlacklist, showFormCreate} from "../redux/actions";
import {CreateBlacklistRequest} from "../types";

const mapStateToProps = ({blacklistManager}: RootState) => ({blacklistManager});
const connector = connect(mapStateToProps, {createBlacklist, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateBlacklistFormProps extends FormComponentProps, ReduxProps {
}

function CreateBlacklistForm(props: CreateBlacklistFormProps) {

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

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateBlacklistRequest = {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          reason: values.reason,
          ssn: values.ssn
        }
        props.createBlacklist(req);
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
      title="Tạo mới Blacklist"
      visible={props.blacklistManager.showForm.show_create}
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

        <Form.Item label="Tên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Email" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('email', {
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập SSN',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập SSN" className="bg-white text-black"/>)}
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

  );

}

export default connector(Form.create<CreateBlacklistFormProps>()(CreateBlacklistForm));
