import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateSchool} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {UpdateSchoolRequest} from "../types";

const mapState = ({schoolManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormUpdate, updateSchool});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateSchoolFormProps extends FormComponentProps, ReduxProps {
}

function UpdateSchoolForm(props: UpdateSchoolFormProps) {

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
        let req: UpdateSchoolRequest = {
          id: props.showForm.data_update?.id,
          name: values.name,
        }
        props.updateSchool(req);
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
      title="Cập nhật trường hệ thống"
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

        <Form.Item label="Tên trường" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên trường',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên trường" className="bg-white text-black"/>
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

export default connector(Form.create<UpdateSchoolFormProps>()(UpdateSchoolForm));
