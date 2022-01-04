import {Button, Form, Input, Modal} from "antd";
import {FormComponentProps} from 'antd/lib/form';
import React, {FormEvent, useEffect, useState} from "react";
import {hideFormUpdateChatBotEntity, updateChatBotEntity} from '../redux/actions'
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "src/redux/reducers";
import {UpdateEntityRequest} from "../types";
import EditableTagGroup from "./EditableTagGroup";

const mapStateToProps = ({entityManager}: RootState) => ({entityManager});
const connector = connect(mapStateToProps, {hideFormUpdateChatBotEntity, updateChatBotEntity});

type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateEntityFormProps extends FormComponentProps, ReduxProps {
}

function UpdateEntityForm(props: UpdateEntityFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  const formItemStyle = {height: '60px'};
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (props.entityManager.form.showUpdate) {
      let k = props.entityManager.form.entity;
      if (k !== undefined && k !== null) {
        setTags(k.synonymsOfKeyword);
      }
    }
  }, [props.entityManager.form.showUpdate]);

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
        let req: UpdateEntityRequest = {
          entity_id: props.entityManager.form.entity?.entity_id || "",
          chatbot_id: props.entityManager.form.entity?.chatbot_id || "",
          entity_name: values.name,
          keyword: values.description,
          synonyms_of_keyword: []
        }
        props.updateChatBotEntity(req);
        return;
      }
    });
  }

  const resetForm = () => {
    setTags([]);
    resetFields();
    setCompensatoryDataSource([]);
  }

  function onBtnCancelClicked() {
    resetForm();
    props.hideFormUpdateChatBotEntity();
  }

  return (
    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhât thực thể"
      visible={props.entityManager.form.showUpdate}
      centered={true}
      width="550px"
      afterClose={() => {
        resetForm();
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.hideFormUpdateChatBotEntity();
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Chat Bot" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('chat_bot_id', {
            initialValue: props.entityManager.form.entity?.chatbot_name,
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
            initialValue: props.entityManager.form.entity?.entity_name,
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
            initialValue: props.entityManager.form.entity?.keyword,
            rules: [
              {required: true, message: 'Vui lòng nhập từ khóa'}
            ],
          })(<Input placeholder="Từ khóa" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Từ đồng nghĩa" className="mb-0" style={{...formItemStyle}}>
          <EditableTagGroup current_tags={tags} onNewTags={(t: string[]) => {
            setTags(t);
          }}/>
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

export default connector(Form.create<UpdateEntityFormProps>()(UpdateEntityForm));

