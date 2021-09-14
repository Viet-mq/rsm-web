import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useState} from "react";
import {createScript, showFormUpdateAddStep} from "../redux/actions";
import {CreateScriptRequest} from "../types";

const {Option} = Select;

const mapStateToProps = ({scriptManager, chatBotManager}: RootState) => ({scriptManager, chatBotManager});
const connector = connect(mapStateToProps, {showFormUpdateAddStep, createScript});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateStepFormProps extends FormComponentProps, ReduxProps {
}

function CreateStepForm(props: CreateStepFormProps) {

  const [show, setShow] = useState<boolean>(true);
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
        // let req: CreateScriptRequest = {
        //   bot_id: props.chatBotManager.selector_bot.bot_id || "",
        //   name: values.path,
        // }
        // props.createScript(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormUpdateAddStep(false);
  }

  return (

    <Modal
      zIndex={100}
      maskClosable={false}
      title="Thêm bước"
      visible={props.scriptManager.show_form.show_add_step}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormUpdateAddStep(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên bước" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên bước',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên bước" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Chọn nguồn" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('src', {
            initialValue: '1',
            rules: [
              {
                message: 'Vui lòng chọn nguồn',
                required: true,
              },
            ],
          })(
            <Select
              placeholder="Chọn nguồn có sẵn"
            >
              <Option value="0">Nguồn 1</Option>
              <Option value="1">Nguồn 2</Option>
            </Select>,
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

  );

}

export default connector(Form.create<CreateStepFormProps>()(CreateStepForm));
