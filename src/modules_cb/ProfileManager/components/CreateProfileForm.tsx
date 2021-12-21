import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, DatePicker, Form, Icon, Input, Modal, Select, TreeSelect} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createProfile, showFormCreate} from "../redux/actions";
import {CreateProfileRequest} from "../types";
import {showFormCreate as showJobFormCreate} from "../../JobManager/redux/actions";
import {showFormCreate as showJobLevelFormCreate} from "../../JobLevelManager/redux/actions";
import {showFormCreate as showSchoolFormCreate} from "../../SchoolManager/redux/actions";
import {showFormCreate as showSourceCVFormCreate} from "../../SourceCVManager/redux/actions";
import {showFormCreate as showSkillFormCreate} from "../../SkillManager/redux/actions";
import CreateJobForm from "../../JobManager/components/CreateJobForm";
import CreateJobLevelForm from "../../JobLevelManager/components/CreateJobLevelForm";
import CreateSourceCVForm from "../../SourceCVManager/components/CreateSourceCVForm";
import CreateSchoolForm from "../../SchoolManager/components/CreateSchoolForm";
import CreateStatusCVForm from "../../StatusCVManager/components/CreateStatusCVForm";
import CreateSkillForm from "../../SkillManager/components/CreateSkillForm";
import {showFormCreate as showDepartmentFormCreate} from "../../DepartmentManager/redux/actions";
import Loading from "../../../components/Loading";
import CreateDepartmentForm from "../../DepartmentManager/components/CreateDepartmentForm";
import moment from 'moment';

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  listJob: state.jobManager.list,
  listJobLevel: state.joblevelManager.list,
  listSchool: state.schoolManager.list,
  listSourceCV: state.sourcecvManager.list,
  listTalentPool: state.talentPoolManager.list,
  createJob: state.jobManager.create,
  createJobLevel: state.joblevelManager.create,
  createSchool: state.schoolManager.create,
  createSourceCV: state.sourcecvManager.create,
  listDepartment: state.departmentManager.list,
  listSkill: state.skillManager.list,
  createSkill: state.skillManager.create,
  listRecruitment: state.recruitmentManager.list,
})

const connector = connect(mapStateToProps,
  {
    createProfile,
    showFormCreate,
    showJobFormCreate,
    showJobLevelFormCreate,
    showSchoolFormCreate,
    showSourceCVFormCreate,
    showSkillFormCreate,
    showDepartmentFormCreate
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateProfileFormProps extends FormComponentProps, ReduxProps {
}

function CreateProfileForm(props: CreateProfileFormProps) {

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
  const dateFormat = 'DD/MM/YYYY';
  const [treeData, setTreeData] = useState([])

  useEffect(() => {
    setTreeData(convertArrayToTree(props.listDepartment.rows))
  }, [props.listDepartment.rows])


  const setColor = () => {
    const randomColor: string = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateProfileRequest = {
          fullName: values.fullName,
          avatarColor: setColor(),
          dateOfBirth: values.dateOfBirth * 1,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
          email: values.email,
          hometown: values.hometown,
          levelSchool: values.levelSchool,
          school: values.school,
          sourceCV: values.sourceCV,
          job: values.job,
          levelJob: values.levelJob,
          skill: values.skill,
          talentPool: values.talentPool,
          hrRef: values.hrRef,
          mailRef: values.mailRef,
          department: values.department,
          dateOfApply: values.dateOfApply * 1,
        }
        props.createProfile(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false);
  }

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
  const handleCreateSkill = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showSkillFormCreate(true);
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


  return (
    <div>
      <Modal
        zIndex={2}
        maskClosable={false}
        title="Tạo mới thông tin ứng viên"
        visible={props.profileManager.showForm.show_create}
        centered={true}
        width="550px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
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
                  required: false,
                },
              ],
            })(
              <DatePicker format={dateFormat} style={{width: "100%"}}/>
            )}
          </Form.Item>

          <Form.Item label="Giới tính" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('gender', {
              initialValue: "Nam",
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
              initialValue: '',
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

          <Form.Item label="Địa chỉ" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('hometown', {
              initialValue: '',
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
                initialValue: '',
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
              {getFieldDecorator('school', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập trường học',
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
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập nguồn ứng tuyển',
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
                initialValue: '',
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

          <Form.Item label="Cấp bậc công việc" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('levelJob', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập cấp bậc công việc',
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

          <Form.Item label="Kỹ năng công việc" className="mb-0" style={{paddingBottom: 15}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('skill', {
                initialValue: undefined,
                rules: [
                  {
                    message: 'Vui lòng chọn kỹ năng công việc',
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

          <Form.Item label="Talent pools" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('talentPool', {
                initialValue: undefined,
                rules: [
                  {
                    message: 'Vui lòng chọn talent pools',
                    required: false,
                  },
                ],
              })(
                <Select className="bg-white text-black" placeholder={"Chọn talent pools"}
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
              initialValue: '',
              rules: [
                {
                  message: 'Vui lòng nhập tên người giới thiệu',
                  required: false,
                },
              ],
            })(
              <Input placeholder="Tên HR Reference" className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label="Email người giới thiệu" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('emailRef', {
              initialValue: '',
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
                initialValue: "",
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

          <Form.Item label="Ngày tạo" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('dateOfApply', {
              initialValue: moment(),
              rules: [
                {
                  message: 'Vui lòng nhập thời gian',
                  required: false,
                },
              ],
            })(
              <DatePicker format={dateFormat} style={{width: "100%"}}/>
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
      <CreateDepartmentForm/>
      <CreateSkillForm/>

      {props.createJob.loading ||
      props.createJobLevel.loading ||
      props.createSchool.loading ||
      props.createSourceCV.loading ?
        <Loading/> : null}
    </div>
  );

}

export default connector(Form.create<CreateProfileFormProps>()(CreateProfileForm));
