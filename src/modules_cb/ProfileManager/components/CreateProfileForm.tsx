import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, DatePicker, Form, Icon, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createProfile, showFormCreate} from "../redux/actions";
import {CreateProfileRequest} from "../types";
import {getListJob, showFormCreate as showJobFormCreate} from "../../JobManager/redux/actions";
import {getListJobLevel, showFormCreate as showJobLevelFormCreate} from "../../JobLevelManager/redux/actions";
import {getListSchool, showFormCreate as showSchoolFormCreate} from "../../SchoolManager/redux/actions";
import {getListSourceCV, showFormCreate as showSourceCVFormCreate} from "../../SourceCVManager/redux/actions";
// import {getListStatusCV,showFormCreate as showStatusCVFormCreate } from "../../StatusCVManager/redux/actions";
import CreateJobForm from "../../JobManager/components/CreateJobForm";
import CreateJobLevelForm from "../../JobLevelManager/components/CreateJobLevelForm";
import CreateSourceCVForm from "../../SourceCVManager/components/CreateSourceCVForm";
import CreateSchoolForm from "../../SchoolManager/components/CreateSchoolForm";
import CreateStatusCVForm from "../../StatusCVManager/components/CreateStatusCVForm";

import Loading from "../../../components/Loading";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  listJob: state.jobManager.list,
  listJobLevel: state.joblevelManager.list,
  listSchool: state.schoolManager.list,
  listSourceCV: state.sourcecvManager.list,
  // listStatusCV:state.statuscvManager.list,
  createJob: state.jobManager.create,
  createJobLevel: state.joblevelManager.create,
  createSchool: state.schoolManager.create,
  createSourceCV: state.sourcecvManager.create,
  // createStatusCV:state.statuscvManager.create

})

const connector = connect(mapStateToProps,
  {
    createProfile,
    showFormCreate,
    getListJob,
    getListJobLevel,
    getListSchool,
    getListSourceCV,
    // getListStatusCV,
    showJobFormCreate,
    showJobLevelFormCreate,
    showSchoolFormCreate,
    showSourceCVFormCreate,
    // showStatusCVFormCreate,
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateProfileFormProps extends FormComponentProps, ReduxProps {
}

function CreateProfileForm(props: CreateProfileFormProps) {

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
    props.getListSchool({page: '', size: ''});
    props.getListSourceCV({page: '', size: ''});
    // props.getListStatusCV({page: '', size: ''});
  }, [])

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateProfileRequest = {
          cv: values.cv,
          cvType: values.cvType,
          dateOfApply: values.dateOfApply*1,
          dateOfBirth: values.dateOfBirth*1,
          email: values.email,
          fullName: values.fullName,
          hometown: values.hometown,
          hrRef: values.hrRef,
          job: values.job,
          levelJob: values.levelJob,
          phoneNumber: values.phoneNumber,
          school: values.school,
          sourceCV: values.sourceCV,
          // statusCV: values.statusCV,
        }
        console.log("values: ", req);
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


  const dateFormat = 'DD/MM/YYYY';

  const handleCreateSchool = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showSchoolFormCreate(true);
  }

  const handleCreateJob = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showJobFormCreate(true);
  }

  const handleCreateJobLevel = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showJobLevelFormCreate(true);
  }
  const handleCreateSourceCV = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showSourceCVFormCreate(true);
  }

  // const handleCreateStatusCV = (e: any) => {
  //   console.log("Click")
  //   e.preventDefault();
  //   if (e?.target) {
  //     e.target.disabled = true;
  //     e.target.disabled = false;
  //   }
  //   props.showStatusCVFormCreate(true);
  //   console.log(props.showStatusCVFormCreate(true))
  // }

  return (
    <div>
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

          <Form.Item label="Họ Tên" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('fullName', {
              initialValue: '',
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
              // initialValue: '',
              rules: [
                {
                  message: 'Vui lòng nhập năm sinh',
                  required: true,
                },
              ],
            })(
              <DatePicker format={dateFormat} style={{width:"100%"}}/>
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
            <div style={{display: 'flex'}}>
              {getFieldDecorator('school', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập trường học',
                    required: true,
                  },
                ],
              })(
                <Select className="bg-white text-black"
                >
                  {props.listSchool.rows?.map((item: any, index: any) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                style={{height: '32px'}}
                onClick={handleCreateSchool}
              >
                <Icon type="plus"/>
              </Button>
            </div>

          </Form.Item>

          <Form.Item label="SĐT" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('phoneNumber', {
              initialValue: '',
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
              initialValue: '',
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
            <div style={{display: 'flex'}}>
              {getFieldDecorator('job', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập tên công việc',
                    required: true,
                  },
                ],
              })(
                <Select className="bg-white text-black"
                >
                  {props.listJob.rows?.map((item: any, index: any) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                style={{height: '32px'}}
                onClick={handleCreateJob}
              >
                <Icon type="plus"/>
              </Button>

            </div>
          </Form.Item>

          <Form.Item label="Vị trí tuyển dụng" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('levelJob', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập vị trí tuyển dụng',
                    required: true,
                  },
                ],
              })(
                <Select className="bg-white text-black"
                >
                  {props.listJobLevel.rows?.map((item: any, index: any) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                style={{height: '32px'}}
                onClick={handleCreateJobLevel}
              >
                <Icon type="plus"/>
              </Button>
            </div>
          </Form.Item>

          <Form.Item label="Nguồn CV" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('sourceCV', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập Nguồn CV',
                    required: true,
                  },
                ],
              })(
                <Select className="bg-white text-black"
                >
                  {props.listSourceCV.rows?.map((item: any, index: any) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                style={{height: '32px'}}
                onClick={handleCreateSourceCV}
              >
                <Icon type="plus"/>
              </Button>
            </div>
          </Form.Item>

          {/*<Form.Item label="Trạng thái CV" className="mb-0" style={{...formItemStyle}}>*/}
          {/*  <div style={{display: 'flex'}}>*/}
          {/*    {getFieldDecorator('statusCV', {*/}
          {/*      initialValue: '',*/}
          {/*      rules: [*/}
          {/*        {*/}
          {/*          message: 'Vui lòng nhập trạng thái CV',*/}
          {/*          required: false,*/}
          {/*        },*/}
          {/*      ],*/}
          {/*    })(*/}
          {/*      <Select className="bg-white text-black"*/}
          {/*      >*/}
          {/*        {props.listStatusCV.rows?.map((item: any, index: any) => (*/}
          {/*          <Option key={index} value={item.id}>{item.name}</Option>*/}
          {/*        ))}*/}
          {/*      </Select>*/}
          {/*    )}*/}
          {/*    <Button*/}
          {/*      size="small"*/}
          {/*      className="ant-btn ml-1 mr-1 ant-btn-sm"*/}
          {/*      style={{height: '32px'}}*/}
          {/*      onClick={handleCreateStatusCV}*/}
          {/*    >*/}
          {/*      <Icon type="plus"/>*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*</Form.Item>*/}

          <Form.Item label="HR Reference" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('hrRef', {
              initialValue: '',
              rules: [
                {
                  message: 'Vui lòng nhập tên HR Reference',
                  required: true,
                },
              ],
            })(
              <Input placeholder="Tên HR Reference" className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label="Thời gian nộp" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('dateOfApply', {
              // initialValue: '',
              rules: [
                {
                  message: 'Vui lòng nhập thời gian',
                  required: true,
                },
              ],
            })(
              <DatePicker format={dateFormat} style={{width:"100%"}}/>
            )}
          </Form.Item>

          <Form.Item label="CV" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('cv', {
              initialValue: '',
              rules: [
                {
                  message: 'Vui lòng nhập CV',
                  required: true,
                },
              ],
            })(
              <Input placeholder="CV" className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label="Loại CV" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('cvType', {
              initialValue: '',
              rules: [
                {
                  message: 'Vui lòng nhập loại CV',
                  required: true,
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

      <CreateJobForm/>
      <CreateJobLevelForm/>
      <CreateSourceCVForm/>
      <CreateSchoolForm/>
      <CreateStatusCVForm/>

      {props.createJob.loading ||
      props.createJobLevel.loading ||
      props.createSchool.loading ||
      props.createSourceCV.loading ?
        <Loading/> : null}
    </div>
  );

}

export default connector(Form.create<CreateProfileFormProps>()(CreateProfileForm));
