import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {createApi, showFormCreateApi} from "../redux/actions";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent} from "react";
import {CreateApiRequest} from "../types";

const {Option} = Select;

const mapState = ({apiManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormCreateApi, createApi});
type ReduxProps = ConnectedProps<typeof connector>;

interface CreateApiFormProps extends FormComponentProps, ReduxProps {
}

function CreateApiForm(props: CreateApiFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '40px'};
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
        let req: CreateApiRequest = {
          path: values.path,
          method: values.method,
          name: values.name
        };
        props.createApi(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreateApi(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Thêm mới API"
      visible={props.showForm.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showFormCreateApi(false);
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
          })(
            <Input placeholder="Tên" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Phương thức" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('method', {
            initialValue: 'POST',
            rules: [
              {
                message: 'Vui lòng chọn phương thức',
                required: true,
              },
            ],
          })(
            <Select getPopupContainer={(trigger:any) => trigger.parentNode}
                    placeholder="Chọn phương thức"
            >
              <Option value="GET">GET</Option>
              <Option value="POST">POST</Option>
              <Option value="PUT">PUT</Option>
              <Option value="DELETE">DELETE</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Path" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('path', {
            initialValue: '/',
            rules: [
              {
                message: 'Vui lòng nhập tên API',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên API" className="bg-white text-black"/>
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

export default connector(Form.create<CreateApiFormProps>()(CreateApiForm));
