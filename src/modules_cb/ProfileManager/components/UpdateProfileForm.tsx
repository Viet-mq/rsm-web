import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateProfile} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {UpdateProfileRequest} from "../types";
import moment from "moment";
import {getListJob} from "../../JobManager/redux/actions";
import {getListJobLevel} from "../../JobLevelManager/redux/actions";

const {Option} = Select;

// const mapState = ({profileManager: {showForm}}: RootState) => ({showForm})

const mapStateToProps = (state: RootState) => ({
  showForm: state.profileManager.showForm,
  listJob: state.jobManager.list,
  listJobLevel: state.joblevelManager.list,
})

const connector = connect(mapStateToProps, {showFormUpdate, updateProfile, getListJob, getListJobLevel});
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

  useEffect(() => {
    props.getListJob({page: '', size: ''});
    props.getListJobLevel({page: '', size: ''});
  }, [])

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateProfileRequest = {
          id: values.id,
          cv: values.cv,
          cvType: values.cvType,
          dateOfApply: values.dateOfApply,
          dateOfBirth: values.dateOfBirth,
          email: values.email,
          fullName: values.fullName,
          hometown: values.hometown,
          hrRef: values.hrRef,
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

  const dateFormat = 'DD/MM/YYYY';

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

        <Form.Item label="Họ Tên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('fullName', {
            initialValue: props.showForm.data_update?.fullName,
            rules: [
              {
                message: 'Vui lòng nhập họ tên',
                required: true,
              },
            ],
          })(
            <Input placeholder="Họ tên" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Năm sinh" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('dateOfBirth', {
            initialValue: moment(props.showForm.data_update?.dateOfBirth),
            rules: [
              {
                message: 'Vui lòng nhập năm sinh',
                required: true,
              },
            ],
          })(
            <DatePicker format={dateFormat}/>
          )}
        </Form.Item>

        <Form.Item label="Quê quán" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('hometown', {
            initialValue: props.showForm.data_update?.hometown,
            rules: [
              {
                message: 'Vui lòng nhập quê quán',
                required: false,
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
                required: false,
              },
            ],
          })(
            <Input placeholder="Trường học" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="SĐT" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('phonenumber', {
            initialValue: props.showForm.data_update?.phonenumber,
            rules: [
              {
                message: 'Vui lòng nhập SDT',
                required: true,
              },
            ],
          })(
            <Input placeholder="SDT" className="bg-white text-black"/>
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
            <Input placeholder="Email" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Công việc" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('job', {
            initialValue: props.showForm.data_update?.job,
            rules: [
              {
                message: 'Vui lòng nhập tên công việc',
                required: true,
              },
            ],
          })(
            <Select className="bg-white text-black"
                    defaultValue={props.showForm.data_update?.job}
            >
              {props.listJob.rows?.map((item: any, index: any) => (
                <Option value={item.name}>{item.name}</Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Vị trí tuyển dụng" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('levelJob', {
            initialValue: props.showForm.data_update?.levelJob,
            rules: [
              {
                message: 'Vui lòng nhập vị trí tuyển dụng',
                required: true,
              },
            ],
          })(
            <Select className="bg-white text-black"
                    defaultValue={props.showForm.data_update?.levelJob}
            >
              {props.listJobLevel.rows?.map((item: any, index: any) => (
                <Option value={item.name}>{item.name}</Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label=" CV" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('cv', {
            initialValue: props.showForm.data_update?.cv,
            rules: [
              {
                message: 'Vui lòng nhập CV',
                required: true,
              },
            ],
          })(
            <Input placeholder="Nguồn CV" className="bg-white text-black"/>
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
            <Input placeholder="Nguồn CV" className="bg-white text-black"/>
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
            initialValue: moment(props.showForm.data_update?.dateOfApply),
            rules: [
              {
                message: 'Vui lòng nhập thời gian',
                required: false,
              },
            ],
          })(
            <DatePicker format={dateFormat}/>
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
