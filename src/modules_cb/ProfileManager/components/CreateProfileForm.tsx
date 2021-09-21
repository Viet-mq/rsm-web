import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {createProfile, showFormCreate} from "../redux/actions";
import {CreateProfileRequest} from "../types";

const mapStateToProps = ({profileManager}: RootState) => ({profileManager});
const connector = connect(mapStateToProps, {createProfile, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateProfileFormProps extends FormComponentProps, ReduxProps {
}

function CreateProfileForm(props: CreateProfileFormProps) {

  const [show, setShow] = useState<boolean>(true);
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

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateProfileRequest = {
          cv: values.cv,
          cvType: values.cvType,
          dateOfApply: values.dateOfApply,
          dateOfBirth: values.dateOfBirth,
          email: values.email,
          fullName: values.fullName,
          hometown: values.hometown,
          hrRef: values.hr,
          phonenumberid: values.phonenumberid,
          job: values.job,
          levelJob: values.levelJob,
          phonenumber: values.phonenumber,
          school: values.school,
          sourceCV: values.sourceCV,
        }
        console.log("values: " + JSON.stringify(req));
        props.createProfile(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormCreate(false);
  }

  const onCheckBoxChange = (e: any) => {
    setShow(e.target.checked);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới profile"
      visible={props.profileManager.showForm.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormCreate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên Profile" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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
            initialValue: '',
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

export default connector(Form.create<CreateProfileFormProps>()(CreateProfileForm));
