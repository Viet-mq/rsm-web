import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {showFormUpdateApi, updateApi} from "../redux/actions";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useState} from "react";
import {UpdateApiRoleRequest} from "../types";

const {Option} = Select;

const mapState = ({apiManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormUpdateApi, updateApi});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateApiFormProps extends FormComponentProps, ReduxProps {
}

function UpdateApiForm(props: UpdateApiFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
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
        let req: UpdateApiRoleRequest = {
          id: props.showForm.entity?.id || "",
          name: values.name
        }
        props.updateApi(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormUpdateApi(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Update API"
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
        props.showFormUpdateApi(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Path" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('path', {
            initialValue: props.showForm.entity?.path,
            rules: [
              {
                message: 'Vui lòng nhập tên api',
                required: true,
              },
            ],
          })(
            <Input disabled={true} placeholder="Tên API" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Phương thức" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('method', {
            initialValue: props.showForm.entity?.method,
            rules: [
              {
                message: 'Vui lòng chọn phương thức',
                required: true,
              },
            ],
          })(
            <Select disabled={true}
                    placeholder="Chọn phương thức"
            >
              <Option value="GET">GET</Option>
              <Option value="POST">POST</Option>
              <Option value="PUT">PUT</Option>
              <Option value="DELETE">DELETE</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Tên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.showForm.entity?.name,
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

  )
}

export default connector(Form.create<UpdateApiFormProps>()(UpdateApiForm));
