import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";

import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {showFormUpdate, updateJob} from "../../redux/actions";


const mapState = ({jobManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormUpdate, updateJob});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateJobFormProps extends FormComponentProps, ReduxProps {
}

function UpdateProcessForm(props: UpdateJobFormProps) {

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
      title="Sửa vòng"
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

        <Form.Item label="Tên vòng" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên vòng tuyển dụng',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên vòng tuyển dụng" className="bg-white text-black"/>
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

export default connector(Form.create<UpdateJobFormProps>()(UpdateProcessForm));
