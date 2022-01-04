import {Button, Form, Input, Modal, Select} from "antd";
import {FormComponentProps} from 'antd/lib/form';
import React, {FormEvent, useState} from "react";
import TextArea from "antd/lib/input/TextArea";
import {CreateChatBotReq} from "../types";

import {createChatBot, hideCreateChatBotForm} from '../redux/actions'
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "src/redux/reducers";

const {Option} = Select;

const mapState = ({chatBotManager: {formCreate, createState}}: RootState) => ({formCreate, createState})

const connector = connect(mapState, {createChatBot, hideCreateChatBotForm});
type ReduxProps = ConnectedProps<typeof connector>;

interface CreateChatBotFormProps extends FormComponentProps, ReduxProps {
}

function CreateChatBotForm(props: CreateChatBotFormProps) {

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
        let req: CreateChatBotReq = {
          chatbot_name: values.name,
          chatbot_description: values.description,
          chatbot_language_id: values.language
        }
        props.createChatBot(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.hideCreateChatBotForm();
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới Chat Bot"
      visible={props.formCreate.visible}
      centered={true}
      width="550px"
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.hideCreateChatBotForm();
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên của chatbot" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Nhập tên chatbot',
                required: true,
              },
            ],
          })(
            <Input placeholder="Nhập tên chatbot" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Ngôn ngữ chatbot" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('language', {
            initialValue: '1',
            rules: [
              {
                message: 'Chọn ngôn ngữ chatbot',
                required: true,
              },
            ],
          })(
            <Select
              placeholder="Chọn ngôn ngữ chatbot"
            >
              <Option value="0">Tiếng Anh</Option>
              <Option value="1">Tiếng Việt</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Mô tả" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('description', {
            initialValue: '',
            rules: [
              {required: true, message: 'Vui lòng nhập mô tả'}
            ],
          })(<TextArea placeholder="Nhập mô tả chatbot" rows={4}/>)}
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

export default connector(Form.create<CreateChatBotFormProps>()(CreateChatBotForm));
