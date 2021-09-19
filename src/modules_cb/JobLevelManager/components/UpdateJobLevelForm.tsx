import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateJobLevel} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {UpdateJobLevelRequest} from "../types";

const mapState = ({joblevelManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormUpdate, updateJobLevel});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateJobLevelFormProps extends FormComponentProps, ReduxProps {
}

function UpdateJobLevelForm(props: UpdateJobLevelFormProps) {

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

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateJobLevelRequest = {
          id: values.id,
          name: values.name,
        }
        props.updateJobLevel(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormUpdate(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật job level hệ thống"
      visible={props.showForm.show_update}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormUpdate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="ID" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('id', {
            initialValue: props.showForm.data_update?.id,
            rules: [
              {
                message: 'Vui lòng nhập id',
                required: true,
              },
            ],
          })(
            <Input disabled placeholder="ID" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Tên job level" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên job level',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên job level" className="bg-white text-black"/>
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

export default connector(Form.create<UpdateJobLevelFormProps>()(UpdateJobLevelForm));
