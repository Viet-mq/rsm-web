import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {getActivityLogs, showFormUpdate, updateProfile} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, DatePicker, Form, Icon, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {UpdateProfileRequest} from "../types";
import {getListJob, showFormCreate as showJobFormCreate} from "../../JobManager/redux/actions";
import {getListJobLevel, showFormCreate as showJobLevelFormCreate} from "../../JobLevelManager/redux/actions";
import {getListSchool, showFormCreate as showSchoolFormCreate} from "../../SchoolManager/redux/actions";
import {getListSourceCV, showFormCreate as showSourceCVFormCreate} from "../../SourceCVManager/redux/actions";
import moment from "moment";
import CreateJobForm from "../../JobManager/components/CreateJobForm";
import CreateJobLevelForm from "../../JobLevelManager/components/CreateJobLevelForm";
import CreateSourceCVForm from "../../SourceCVManager/components/CreateSourceCVForm";
import CreateSchoolForm from "../../SchoolManager/components/CreateSchoolForm";
import Loading from "../../../components/Loading";
// import {getListStatusCV, showFormCreate as showStatusCVFormCreate} from "../../StatusCVManager/redux/actions";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  showForm: state.profileManager.showForm,
  listJob: state.jobManager.list,
  listJobLevel: state.joblevelManager.list,
  listSchool: state.schoolManager.list,
  // listStatusCV:state.statuscvManager.list,
  listSourceCV: state.sourcecvManager.list,
  createJob: state.jobManager.create,
  createJobLevel: state.joblevelManager.create,
  createSchool: state.schoolManager.create,
  // createStatusCV:state.statuscvManager.create,
  createSourceCV: state.sourcecvManager.create,
})

const connector = connect(mapStateToProps,
  {
    showFormUpdate,
    updateProfile,
    getListJob,
    getListJobLevel,
    getListSchool,
    getListSourceCV,
    // getListStatusCV,
    showJobFormCreate,
    showJobLevelFormCreate,
    showSchoolFormCreate,
    showSourceCVFormCreate,
    getActivityLogs
    // showStatusCVFormCreate

  });
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
    props.getListJob({page: 1, size: 100});
    props.getListJobLevel({page: 1, size: 100});
    props.getListSchool({page: 1, size: 100});
    props.getListSourceCV({page: 1, size: 100});
    // props.getListStatusCV({page: 1, size: 100});
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
          dateOfApply: values.dateOfApply*1,
          dateOfBirth: values.dateOfBirth*1,
          email: values.email,
          fullName: values.fullName,
          hometown: values.hometown,
          hrRef: values.hrRef,
          job: props.showForm.data_update?.jobName.includes(values.job)? props.showForm.data_update?.jobId:values.job,
          levelJob: props.showForm.data_update?.levelJobName.includes(values.levelJob)? props.showForm.data_update?.levelJobId:values.levelJob,
          phoneNumber: values.phoneNumber,
          school: props.showForm.data_update?.schoolName.includes(values.school)? props.showForm.data_update?.schoolId:values.school,
          sourceCV: props.showForm.data_update?.sourceCVName.includes(values.sourceCV)? props.showForm.data_update?.sourceCVId:values.sourceCV,
          // statusCV: values.statusCV,
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
  //   e.preventDefault();
  //   if (e?.target) {
  //     e.target.disabled = true;
  //     e.target.disabled = false;
  //   }
  //   props.showStatusCVFormCreate(true);
  // }
  return (
    <div>

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

        <Form {...formItemLayout} >

          <Form.Item label="ID" className="mb-0" style={{...formItemStyle, display: 'none'}}>
            {getFieldDecorator('id', {
              initialValue: props.showForm.data_update?.id,
              rules: [
                {
                  message: 'Vui lòng nhập id',
                  required: true,
                },
              ],
            })(
              <Input disabled placeholder="id" className="bg-white text-black"/>
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
              <DatePicker format={dateFormat} style={{width:"100%"}}/>
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
            <div style={{display: 'flex'}}>
              {getFieldDecorator('school',
                {
                  initialValue: props.showForm.data_update?.schoolName,
                  rules: [
                    {
                      message: 'Vui lòng nhập Trường học',
                      required: false,
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
              initialValue: props.showForm.data_update?.phoneNumber,
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
            <div style={{display: 'flex'}}>
              {getFieldDecorator('job', {
                initialValue: props.showForm.data_update?.jobName,
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
                initialValue: props.showForm.data_update?.levelJobName,
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
                initialValue: props.showForm.data_update?.sourceCVName,
                rules: [
                  {
                    message: 'Vui lòng nhập Nguồn CV',
                    required: false,
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
          {/*      initialValue: props.showForm.data_update?.statusCVName,*/}
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

          <Form.Item label="CV" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('cv', {
              initialValue: props.showForm.data_update?.cv,
              rules: [
                {
                  message: 'Vui lòng nhập cv',
                  required: false,
                },
              ],
            })(
              <Input placeholder="CV" className="bg-white text-black"/>
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
              <DatePicker format={dateFormat} style={{width:"100%"}}/>
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

      <CreateJobForm/>
      <CreateJobLevelForm/>
      <CreateSourceCVForm/>
      <CreateSchoolForm/>

      {props.createJob.loading ||
      props.createJobLevel.loading ||
      props.createSchool.loading ||
      props.createSourceCV.loading ?
        <Loading/> : null}
    </div>

  )
}

export default connector(Form.create<UpdateProfileFormProps>()(UpdateProfileForm));
