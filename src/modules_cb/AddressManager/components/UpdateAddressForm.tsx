import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateAddress} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {UpdateAddressRequest} from "../types";

const mapState = ({addressManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormUpdate, updateAddress});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateAddressFormProps extends FormComponentProps, ReduxProps {
}

function UpdateAddressForm(props: UpdateAddressFormProps) {

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
        let req: UpdateAddressRequest = {
          id: props.showForm.data_update?.id,
          name: values.name,
          officeName: values.officeName
        }
        props.updateAddress(req);
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
      title="Cập nhật địa chỉ"
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

        <Form.Item label="địa chỉ" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập địa chỉ',
                required: true,
              },
            ],
          })(
            <Input placeholder="Địa chỉ" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Văn phòng" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('officeName', {
            initialValue: props.showForm.data_update?.officeName,
            rules: [
              {
                message: 'Vui lòng nhập văn phòng',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập văn phòng" className="bg-white text-black"/>)}
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

export default connector(Form.create<UpdateAddressFormProps>()(UpdateAddressForm));
