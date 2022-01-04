import React, {FormEvent, useState} from "react";
import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreateIntent, updateChatBotIntent} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import {UpdateChatBotIntentRequest} from "../types";
import TextArea from "antd/lib/input/TextArea";

const mapStateToProps = ({intentManager}: RootState) => ({intentManager});
const connector = connect(mapStateToProps, {showFormCreateIntent, updateChatBotIntent});

type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateIntentFormProps extends FormComponentProps, ReduxProps {

}

function UpdateIntentForm(props: UpdateIntentFormProps) {

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
        let req: UpdateChatBotIntentRequest = {
          intent_id: props.intentManager.showForm?.entity?.intent_id || "",
          chatbot_id: props.intentManager.showForm?.entity?.chatbot_id || "",
          intent_name: values.intent_name,
          sample_content: values.sample_content
        }
        props.updateChatBotIntent(req);
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
      title="Cập nhật mới ý định"
      visible={props.intentManager.showForm.showUpdate}
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
            initialValue: props.intentManager.showForm?.entity?.chatbot_name,
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
            initialValue: props.intentManager.showForm?.entity?.intent_name,
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
            initialValue: props.intentManager.showForm?.entity?.sample_content,
            rules: [
              {required: true, message: 'Vui lòng nhập câu mẫu'}
            ],
          })(<TextArea placeholder="Nhập câu mẫu" rows={4}/>)}
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

  );
}

export default connector(Form.create<UpdateIntentFormProps>()(UpdateIntentForm));
