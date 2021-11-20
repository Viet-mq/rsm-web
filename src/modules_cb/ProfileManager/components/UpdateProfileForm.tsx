import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateProfile} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, DatePicker, Form, Icon, Input, Modal, Select, TreeSelect} from "antd";
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
import CreateSkillForm from "../../SkillManager/components/CreateSkillForm";

import Loading from "../../../components/Loading";
import {getListTalentPool} from "../../TalentPoolManager/redux/actions";
import {getListDepartment, showFormCreate as showDepartmentFormCreate} from "../../DepartmentManager/redux/actions";
import CreateDepartmentForm from "../../DepartmentManager/components/CreateDepartmentForm";
import {showFormCreate as showSkillFormCreate} from "../../SkillManager/redux/actions";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  showForm: state.profileManager.showForm,
  listJob: state.jobManager.list,
  listJobLevel: state.joblevelManager.list,
  listSchool: state.schoolManager.list,
  listSourceCV: state.sourcecvManager.list,
  listDepartment: state.departmentManager.list,
  createJob: state.jobManager.create,
  createJobLevel: state.joblevelManager.create,
  createSchool: state.schoolManager.create,
  createSourceCV: state.sourcecvManager.create,
  listTalentPool: state.talentPoolManager.list,
  listSkill:state.skillManager.list,
  createSkill: state.skillManager.create
})

const connector = connect(mapStateToProps,
  {
    showFormUpdate,
    updateProfile,
    getListJob,
    getListJobLevel,
    getListSchool,
    getListSourceCV,
    showJobFormCreate,
    showJobLevelFormCreate,
    showSchoolFormCreate,
    showSourceCVFormCreate,
    getListTalentPool,
    getListDepartment,
    showSkillFormCreate,
    showDepartmentFormCreate
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateProfileFormProps extends FormComponentProps, ReduxProps {
}

function UpdateProfileForm(props: UpdateProfileFormProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '50px'};
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 14},
    },
  };

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateProfileRequest = {
          id: props.showForm.data_update?.id,
          dateOfApply: values.dateOfApply * 1,
          dateOfBirth: values.dateOfBirth * 1,
          email: values.email,
          fullName: values.fullName,
          hometown: values.hometown,
          hrRef: values.hrRef,
          job: values.job,
          levelJob: values.levelJob,
          phoneNumber: values.phoneNumber,
          school: values.school,
          sourceCV: values.sourceCV,
          gender: values.gender,
          talentPool: values.talentPoolId,
          department: values.department,
          levelSchool: values.levelSchool,
          mailRef: values.mailRef,
          recruitment: values.recruitment,
          skill:values.skill,
        }
        props.updateProfile(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
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

  const handleCreateDepartment = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showDepartmentFormCreate(true);
  }

  const convertArrayToTree = (arrays: any) => {
    let dataFetch: any = [];
    for (let i = 0; i < arrays.length; i++) {
      if (arrays[i]?.children) {
        dataFetch.push({
          title: arrays[i].name,
          key: arrays[i].id,
          value: arrays[i].id,
          children: convertArrayToTree(arrays[i].children)
        })
      } else {
        dataFetch.push({
          title: arrays[i].name,
          key: arrays[i].id,
          value: arrays[i].id,
        })
      }
    }
    return dataFetch;
  }

  const [treeData, setTreeData] = useState([])
  useEffect(() => {
    setTreeData(convertArrayToTree(props.listDepartment.rows))
  }, [props.listDepartment.rows])

  const handleCreateSkill = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showSkillFormCreate(true);
  }

  return (
    <div>

      <Modal
        zIndex={2}
        maskClosable={false}
        title="Cập nhật thông tin ứng viên"
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

        <Form {...formItemLayout} >

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
                  required: false,
                },
              ],
            })(
              <DatePicker format={dateFormat} style={{width: "100%"}}/>
            )}
          </Form.Item>

          <Form.Item label="Giới tính" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('gender', {
              initialValue: props.showForm.data_update?.gender,
              rules: [
                {
                  message: 'Vui lòng nhập Giới tính',
                  required: false,
                },
              ],
            })(
              <Select className="bg-white text-black"
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="SĐT" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('phoneNumber', {
              initialValue: props.showForm.data_update?.phoneNumber,
              rules: [
                {
                  message: 'Vui lòng nhập SDT',
                  required: false,
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

          <Form.Item label="Địa chỉ" className="mb-0" style={{...formItemStyle}}>
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

          <Form.Item label="Trình độ học vấn" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('levelSchool', {
                initialValue: props.showForm.data_update?.levelSchool,
                rules: [
                  {
                    message: 'Vui lòng chọn cấp bậc',
                    required: false,
                  },
                ],
              })(
                <Select className="bg-white text-black"
                >
                  <Option key="1" value="Trung cấp">Trung cấp</Option>
                  <Option key="2" value="Đại học">Đại học</Option>
                  <Option key="3" value="Cao đẳng">Cao đẳng</Option>
                  <Option key="4" value="Thạc sĩ">Thạc sĩ</Option>
                  <Option key="5" value="Tiến sĩ">Tiến sĩ</Option>
                  <Option key="6" value="Giáo sư">Giáo sư</Option>
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

          <Form.Item label="Nơi đào tạo" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('school',
                {
                  initialValue: props.showForm.data_update?.schoolId,
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

          <Form.Item label="Nguồn ứng tuyển" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('sourceCV', {
                initialValue: props.showForm.data_update?.sourceCVId,
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

          <Form.Item label="Vị trí công việc" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('job', {
                initialValue: props.showForm.data_update?.jobId,
                rules: [
                  {
                    message: 'Vui lòng nhập vị trí công việc',
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

          <Form.Item label="Cập bậc công việc" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('levelJob', {
                initialValue: props.showForm.data_update?.levelJobId,
                rules: [
                  {
                    message: 'Vui lòng nhập Cập bậc công việc',
                    required: false,
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

          <Form.Item label="Kỹ năng công việc" className="mb-0" style={{paddingBottom:15}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('skill', {
                initialValue:props.showForm.data_update?.skill.map((item:any)=>item.id)||undefined,
                rules: [
                  {
                    message: 'Vui lòng nhập kỹ năng công việc',
                    required: false,
                  },
                ],
              })(
                <Select className="bg-white text-black"
                        mode="multiple"
                >
                  {props.listSkill.rows?.map((item: any, index: any) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                style={{height: '32px'}}
                onClick={handleCreateSkill}
              >
                <Icon type="plus"/>
              </Button>
            </div>
          </Form.Item>

          <Form.Item label="Tin tuyển dụng" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('recruitment', {
                initialValue: props.showForm.data_update?.recruitment,
                rules: [
                  {
                    message: 'Vui lòng chọn tin tuyển dụng',
                    required: false,
                  },
                ],
              })(
                <Select className="bg-white text-black" disabled
                >
                  {props.listTalentPool.rows?.map((item: any, index: any) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </div>
          </Form.Item>

          <Form.Item label="Talent pools" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('talentPoolId', {
                initialValue: props.showForm.data_update?.talentPoolId,
                rules: [
                  {
                    message: 'Vui lòng chọn talent pools',
                    required: false,
                  },
                ],
              })(
                <Select className="bg-white text-black"
                >
                  {props.listTalentPool.rows?.map((item: any, index: any) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </div>
          </Form.Item>

          <Form.Item label="Người giới thiệu" className="mb-0" style={{...formItemStyle}}>
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

          <Form.Item label="Email người giới thiệu" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('emailRef', {
              initialValue: props.showForm.data_update?.emailRef,
              rules: [
                {
                  message: 'Vui lòng nhập email người giới thiệu',
                  required: false,
                },
              ],
            })(
              <Input placeholder="Email người giới thiệu" className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label="Phòng ban" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('department', {
                initialValue: props.showForm.data_update?.department,
                rules: [
                  {
                    message: 'Vui lòng nhập Phòng ban',
                    required: false,
                  },
                ],
              })(
                <TreeSelect
                  className="bg-white text-black"
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  treeData={treeData}
                  placeholder="Phòng ban"
                  treeDefaultExpandAll
                />
              )}
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                style={{height: '32px'}}
                onClick={handleCreateDepartment}
              >
                <Icon type="plus"/>
              </Button>
            </div>
          </Form.Item>

          <Form.Item label="Thời gian nộp" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('dateOfApply', {
              initialValue: moment(props.showForm.data_update?.dateOfApply),
              rules: [
                {
                  message: 'Vui lòng nhập thời gian',
                  required: true,
                },
              ],
            })(
              <DatePicker format={dateFormat} style={{width: "100%"}}/>
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
      <CreateDepartmentForm/>
      <CreateSkillForm/>
      {props.createJob.loading ||
      props.createJobLevel.loading ||
      props.createSchool.loading ||
      props.createSourceCV.loading ?
        <Loading/> : null}
    </div>

  )
}

export default connector(Form.create<UpdateProfileFormProps>()(UpdateProfileForm));
