import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateProfile} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {UpdateProfileRequest} from "../types";

const mapState = ({profileManager: {showForm}}: RootState) => ({showForm})

const connector = connect(mapState, {showFormUpdate, updateProfile});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateProfileFormProps extends FormComponentProps, ReduxProps {
}

function UpdateProfileForm(props: UpdateProfileFormProps) {

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
        let req: UpdateProfileRequest = {
          id:values.id,
          cv: values.cv,
          cvType: values.cvType,
          dateOfApply: values.dateOfApply,
          dateOfBirth: values.dateOfBirth,
          email: values.email,
          fullName: values.fullName,
          hometown: values.hometown,
          hrRef: values.hrRef,
          phonenumberid: values.phonenumberid,
          job: values.job,
          levelJob: values.levelJob,
          phonenumber: values.phonenumber,
          school: values.school,
          sourceCV: values.sourceCV,
        }
        props.updateProfile(req);
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
      title="Cập nhật Profile hệ thống"
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

        <Form.Item label="Tên Profile" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.showForm.data_update?.fullName,
            rules: [
              {
                message: 'Vui lòng nhập tên Profile',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên Profile" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Năm sinh" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('dateOfBirth', {
            initialValue: props.showForm.data_update?.dateOfBirth,
            rules: [
              {
                message: 'Vui lòng nhập năm sinh',
                required: true,
              },
            ],
          })(
            <Input disabled placeholder="Năm sinh" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Quê quán" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('hometown', {
            initialValue: props.showForm.data_update?.hometown,
            rules: [
              {
                message: 'Vui lòng nhập quê quán',
                required: true,
              },
            ],
          })(
            <Input placeholder="Quê quán" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Trường học" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('school', {
            initialValue: props.showForm.data_update?.school,
            rules: [
              {
                message: 'Vui lòng nhập trường học',
                required: true,
              },
            ],
          })(
            <Input disabled placeholder="Trường học" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Email" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('email', {
            initialValue: props.showForm.data_update?.email,
            rules: [
              {
                message: 'Vui lòng nhập Email',
                required: true,
              },
            ],
          })(
            <Input disabled placeholder="Email" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Công việc" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('job', {
            initialValue: props.showForm.data_update?.job,
            rules: [
              {
                message: 'Vui lòng nhập tên Profile',
                required: false,
              },
            ],
          })(
            <Input placeholder="Công việc" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Vị trí tuyển dụng" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('levelJob', {
            initialValue: props.showForm.data_update?.levelJob,
            rules: [
              {
                message: 'Vui lòng nhập vị trí tuyển dụng',
                required: false,
              },
            ],
          })(
            <Input disabled placeholder="Vị trí tuyển dụng" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Nguồn CV" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('sourceCV', {
            initialValue: props.showForm.data_update?.sourceCV,
            rules: [
              {
                message: 'Vui lòng nhập Nguồn CV',
                required: false,
              },
            ],
          })(
            <Input disabled placeholder="Nguồn CV" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="HR Ref" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('hrRef', {
            initialValue: props.showForm.data_update?.hrRef,
            rules: [
              {
                message: 'Vui lòng nhập tên Profile',
                required: false,
              },
            ],
          })(
            <Input placeholder="Tên HR Ref" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Thời gian nộp" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('dateOfApply', {
            initialValue: props.showForm.data_update?.dateOfApply,
            rules: [
              {
                message: 'Vui lòng nhập id',
                required: false,
              },
            ],
          })(
            <Input disabled placeholder="Thời gian nộp" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Loại CV" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('cvType', {
            initialValue: props.showForm.data_update?.cvType,
            rules: [
              {
                message: 'Vui lòng nhập loại CV',
                required: false,
              },
            ],
          })(
            <Input placeholder="Loại CV" className="bg-white text-black"/>
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

export default connector(Form.create<UpdateProfileFormProps>()(UpdateProfileForm));
