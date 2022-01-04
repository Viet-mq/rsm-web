import {Button, Form, Input, Modal, Select} from "antd";
import {FormComponentProps} from 'antd/lib/form';
import React, {FormEvent, useState} from "react";
import TextArea from "antd/lib/input/TextArea";
import {UpdateChatBotReq} from "../types";

import {hideUpdateChatBotForm, updateChatBot} from '../redux/actions'
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "src/redux/reducers";

const {Option} = Select;

const mapState = ({chatBotManager: {formCreate, createState}}: RootState) => ({formCreate, createState})

const connector = connect(mapState, {updateChatBot, hideUpdateChatBotForm});
type ReduxProps = ConnectedProps<typeof connector>;

interface CreateChatBotFormProps extends FormComponentProps, ReduxProps {
}

function UpdateChatBotForm(props: CreateChatBotFormProps) {

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
        let req: UpdateChatBotReq = {
          chatbot_id: props.formCreate.chatBot?.chatbot_id || '',
          chatbot_name: values.name,
          chatbot_description: values.description,
          chatbot_language_id: values.language
        }
        props.updateChatBot(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.hideUpdateChatBotForm();
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật Chat Bot"
      visible={props.formCreate.visibleUpdate}
      centered={true}
      width="550px"
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.hideUpdateChatBotForm();
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên của chatbot" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.formCreate.chatBot?.chatbot_name,
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
            initialValue: props.formCreate.chatBot?.chatbot_language_id + '',
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
            initialValue: props.formCreate.chatBot?.chatbot_description,
            rules: [
              {required: true, message: 'Vui lòng nhập mô tả'}
            ],
          })(<TextArea placeholder="Nhập mô tả chatbot" rows={4}/>)}
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

export default connector(Form.create<CreateChatBotFormProps>()(UpdateChatBotForm));
