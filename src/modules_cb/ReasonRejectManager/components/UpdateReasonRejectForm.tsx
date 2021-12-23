import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateReasonReject} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {UpdateReasonRejectRequest} from "../types";

const mapState = ({reasonRejectManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormUpdate, updateReasonReject});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateReasonRejectFormProps extends FormComponentProps, ReduxProps {
}

function UpdateReasonRejectForm(props: UpdateReasonRejectFormProps) {

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

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateReasonRejectRequest = {
          id: props.showForm.data_update?.id,
          reason: values.reason,
        }
        props.updateReasonReject(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdate(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật lý do loại"
      visible={props.showForm.show_update}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showFormUpdate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên lý do" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('reason', {
            initialValue: props.showForm.data_update?.reason,
            rules: [
              {
                message: 'Vui lòng nhập lý do',
                required: true,
              },
            ],
          })(
            <Input placeholder="Lý do" className="bg-white text-black"/>
          )}
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

export default connector(Form.create<UpdateReasonRejectFormProps>()(UpdateReasonRejectForm));
