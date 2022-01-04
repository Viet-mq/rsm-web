import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {createReasonReject, showFormCreate} from "../redux/actions";
import {CreateReasonRejectRequest} from "../types";

const mapStateToProps = ({reasonRejectManager}: RootState) => ({reasonRejectManager});
const connector = connect(mapStateToProps, {createReasonReject, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateReasonRejectFormProps extends FormComponentProps, ReduxProps {
}

function CreateReasonRejectForm(props: CreateReasonRejectFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
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
        let req: CreateReasonRejectRequest = {
          reason: values.reason,
        }
        props.createReasonReject(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới lý do loại"
      visible={props.reasonRejectManager.showForm.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showFormCreate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Lý do" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('reason', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập lý do',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên lý do" className="bg-white text-black"/>)}
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

export default connector(Form.create<CreateReasonRejectFormProps>()(CreateReasonRejectForm));
