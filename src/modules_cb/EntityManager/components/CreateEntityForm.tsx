import {Button, Form, Input, Modal} from "antd";
import {FormComponentProps} from 'antd/lib/form';
import React, {FormEvent, useState} from "react";
import {hideFormCreateChatBotEntity} from '../redux/actions'
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "src/redux/reducers";
import {createChatBotEntity} from "../redux/actions";
import {CreateEntityRequest} from "../types";

const mapStateToProps = ({entityManager}: RootState) => ({entityManager});
const connector = connect(mapStateToProps, {hideFormCreateChatBotEntity, createChatBotEntity});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateEntityFormProps extends FormComponentProps, ReduxProps {
}

function CreateEntityForm(props: CreateEntityFormProps) {

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
        let req: CreateEntityRequest = {
          chatbot_id: props.entityManager.list?.chatBot?.chatbot_id || "",
          entity_name: values.name,
          keyword: values.description
        }
        props.createChatBotEntity(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.hideFormCreateChatBotEntity();
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới thực thể"
      visible={props.entityManager.form.showCreate}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.hideFormCreateChatBotEntity();
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Chat Bot" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('chat_bot_id', {
            initialValue: props.entityManager.list?.chatBot?.chatbot_name,
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
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên thực thể',
                required: true,
              },
            ],
          })(
            <Input placeholder="Nhập tên thực thể" className="bg-white text-black"/>
          )}
        </Form.Item>
        <Form.Item label="Từ khóa" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('description', {
            initialValue: '',
            rules: [
              {required: true, message: 'Vui lòng nhập từ khóa'}
            ],
          })(<Input placeholder="Từ khóa" className="bg-white text-black"/>)}
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

export default connector(Form.create<CreateEntityFormProps>()(CreateEntityForm));

