import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {addAction, showFrontEndViewCreateForm} from "../redux/actions";
import {AddActionToViewRequest} from "../types";

const mapStateToProps = ({viewManager}: RootState) => ({viewManager});
const connector = connect(mapStateToProps, {showFrontEndViewCreateForm, addAction});

type ReduxProps = ConnectedProps<typeof connector>;

interface AddActionFormProps extends FormComponentProps, ReduxProps {
}

function AddActionForm(props: AddActionFormProps) {

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
        let req: AddActionToViewRequest = {
          viewId: props.viewManager.showForm.view?.id || '',
          actionId: values.action,
          actionName: values.name,
          desc: values.description
        }
        props.addAction(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFrontEndViewCreateForm(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Thêm mới action"
      visible={props.viewManager.showForm.show_add_action}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFrontEndViewCreateForm(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Menu" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('path', {
            initialValue: props.viewManager.showForm.view?.name,
            rules: [
              {
                message: 'Vui lòng nhập đường dẫn',
                required: true,
              },
            ],
          })(<Input disabled={true} placeholder="Nhập đường dẫn" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="ID Action" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('action', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập ID action',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập action" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Tên Action" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên action" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
            Thêm Action
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  );

}

export default connector(Form.create<AddActionFormProps>()(AddActionForm));
