import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Form, Input, InputNumber, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {createView, showViewCreateForm} from "../redux/actions";
import {CreateViewRequest} from "../types";

const mapStateToProps = ({viewManager}: RootState) => ({viewManager});
const connector = connect(mapStateToProps, {showViewCreateForm, createView});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateViewFormProps extends FormComponentProps, ReduxProps {
}

function CreateViewForm(props: CreateViewFormProps) {

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
        let req: CreateViewRequest = {
          icon: values.icon,
          index: values.index,
          path: values.path,
          title: values.title
        }
        props.createView(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showViewCreateForm(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới View"
      visible={props.viewManager.showForm.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showViewCreateForm(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên View" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('title', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên View" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Đường dẫn" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('path', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập đường dẫn',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập đường dẫn" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Index" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('index', {
            initialValue: '1',
            rules: [
              {
                message: 'Vui lòng nhập Index',
                required: true,
              },
            ],
          })(<InputNumber style={{ width: '100%' }} placeholder="Nhập Index" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Icon" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('icon', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập Icon',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập icon menu" className="bg-white text-black"/>)}
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

export default connector(Form.create<CreateViewFormProps>()(CreateViewForm));
