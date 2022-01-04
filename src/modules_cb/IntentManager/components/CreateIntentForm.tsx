import {Button, Form, Input, Modal} from "antd";
import {FormComponentProps} from 'antd/lib/form';
import React, {FormEvent, useState} from "react";
import {createChatBotIntent, showFormCreateIntent} from '../redux/actions'
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "src/redux/reducers";
import {CreateChatBotIntentRequest} from "../types";
import TextArea from "antd/lib/input/TextArea";

const mapStateToProps = ({intentManager}: RootState) => ({intentManager});
const connector = connect(mapStateToProps, {showFormCreateIntent, createChatBotIntent});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateIntentFormProps extends FormComponentProps, ReduxProps {
}

function CreateIntentForm(props: CreateIntentFormProps) {

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
        let req: CreateChatBotIntentRequest = {
          chatbot_id: props.intentManager.list?.cb?.chatbot_id || "",
          intent_name: values.intent_name,
          sample_content: values.sample_content
        }
        console.log("values: " + JSON.stringify(req));
        props.createChatBotIntent(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormCreateIntent(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới ý định"
      visible={props.intentManager.showForm.showCreate}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormCreateIntent(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Chat Bot" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('chat_bot_id', {
            initialValue: props.intentManager.list?.cb?.chatbot_name,
            rules: [
              {
                message: 'Chọn chatbot',
                required: true,
              },
            ],
          })(
            <Input placeholder="Chat bot" disabled={true} className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Tên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('intent_name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập ý định',
                required: true,
              },
            ],
          })(
            <Input placeholder="Nhập ý định" className="bg-white text-black"/>
          )}
        </Form.Item>
        <Form.Item label="Câu mẫu" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('sample_content', {
            initialValue: '',
            rules: [
              {required: true, message: 'Vui lòng nhập câu mẫu'}
            ],
          })(<TextArea placeholder="Nhập câu mẫu" rows={4}/>)}
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

export default connector(Form.create<CreateIntentFormProps>()(CreateIntentForm));
