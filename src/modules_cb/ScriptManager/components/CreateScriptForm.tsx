import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {createScript, showFormCreateScript} from "../redux/actions";
import {CreateScriptRequest} from "../types";

const mapStateToProps = ({scriptManager, chatBotManager}: RootState) => ({scriptManager, chatBotManager});
const connector = connect(mapStateToProps, {showFormCreateScript, createScript});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateScriptFormProps extends FormComponentProps, ReduxProps {
}

function CreateScriptForm(props: CreateScriptFormProps) {

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
        let req: CreateScriptRequest = {
          chatbot_id: props.chatBotManager.selector_bot.bot_id || "",
          scenario_name: values.name,
        }
        props.createScript(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormCreateScript(false);
  }

  return (

    <Modal
      zIndex={100}
      maskClosable={false}
      title="Tạo kịch bản"
      visible={props.scriptManager.show_form.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormCreateScript(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên kịch bản" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên kịch bản',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên kịch bản" className="bg-white text-black"/>)}
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

export default connector(Form.create<CreateScriptFormProps>()(CreateScriptForm));
