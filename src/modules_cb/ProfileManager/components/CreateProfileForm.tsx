import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Avatar, Button, DatePicker, Form, Icon, Input, Modal, Select, TreeSelect} from "antd";
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
  listAccount: state.accountManager.list
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
  idRecruitment?: string
}

function CreateProfileForm(props: CreateProfileFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 24},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 24},
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

  const getInitials = (name: string) => {
    if (name) {
      let initials: any = name.split(' ');
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = name.substring(0, 2);
      }
      return initials.toUpperCase();
    }
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

        <Form className="form-create">
          <div className="modal-overflow">
            <Form.Item label="Họ Tên" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('fullName', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập họ tên',
                    required: true,
                  },
                ],
              })(
                <Input placeholder="Nhập họ và tên" className="bg-white text-black"/>
              )}
            </Form.Item>

            <div className="flex-space-between">
              <div className="mr-2">
                <Form.Item label="Năm sinh" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('dateOfBirth', {
                    // initialValue: '',
                    rules: [
                      {
                        message: 'Vui lòng nhập năm sinh',
                        required: false,
                      },
                    ],
                  })(
                    <DatePicker placeholder="dd/mm/yyyy" format={dateFormat} style={{width: "100%"}}/>
                  )}
                </Form.Item>
              </div>

              <div className="flex-process">
                <Form.Item label="Giới tính" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('gender', {
                    initialValue: "Nam",
                    rules: [
                      {
                        message: 'Vui lòng nhập Giới tính',
                        required: false,
                      },
                    ],
                  })(
                    <Select className="bg-white text-black" style={fontWeightStyle}
                    >
                      <Option value="Nam">Nam</Option>
                      <Option value="Nữ">Nữ</Option>
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>

            <div className="flex-space-between">
              <div className="mr-2" style={{width: 230}}>
                <Form.Item label="Số điện thoại" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('phoneNumber', {
                    initialValue: '',
                    rules: [
                      {
                        message: 'Vui lòng nhập số điện thoại',
                        required: false,
                      },
                    ],
                  })(
                    <Input placeholder="Nhập số điện thoại" className="bg-white text-black"/>
                  )}
                </Form.Item>
              </div>

              <div className="flex-process">
                <Form.Item label="Email" className="form-label"  {...formItemLayout}>
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
              </div>
            </div>

            <Form.Item label="Địa chỉ" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('hometown', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập địa chỉ',
                    required: false,
                  },
                ],
              })(
                <Input placeholder="Địa chỉ" className="bg-white text-black"/>
              )}
            </Form.Item>

            <Form.Item label="Trình độ đào tạo" className="form-label"  {...formItemLayout}>
              <div style={{display: 'flex'}}>
                {getFieldDecorator('levelSchool', {
                  initialValue: undefined,
                  rules: [
                    {
                      message: 'Vui lòng chọn trình độ đào tạo',
                      required: false,
                    },
                  ],
                })(
                  <Select className="bg-white text-black" style={fontWeightStyle} placeholder="Chọn trình độ đào tạo"
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

            <Form.Item label="Nơi đào tạo" className="form-label"  {...formItemLayout}>
              <div style={{display: 'flex'}}>
                {getFieldDecorator('school', {
                  initialValue: undefined,
                  rules: [
                    {
                      message: 'Vui lòng chọn nơi đào tạo',
                      required: false,
                    },
                  ],
                })(
                  <Select className="bg-white text-black" style={fontWeightStyle} placeholder="Chọn nơi đào tạo"
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

            <div className="flex-space-between">
              <div className="mr-2" style={{width: 230}}>
                <Form.Item label="Ngày ứng tuyển" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('dateOfApply', {
                    initialValue: moment(),
                    rules: [
                      {
                        message: 'Vui lòng nhập ngày ứng tuyển',
                        required: false,
                      },
                    ],
                  })(
                    <DatePicker placeholder="dd/mm/yyyy" format={dateFormat} style={{width: "100%"}}/>
                  )}
                </Form.Item>
              </div>

              <div className="flex-process">
                <Form.Item label="Nguồn ứng tuyển" className="form-label"  {...formItemLayout}>
                  <div style={{display: 'flex', padding: "4px 0"}}>
                    {getFieldDecorator('sourceCV', {
                      initialValue: props.listSourceCV.rows[0]?.id,
                      rules: [
                        {
                          message: 'Vui lòng nhập nguồn ứng tuyển',
                          required: true,
                        },
                      ],
                    })(
                      <Select className="bg-white text-black" style={fontWeightStyle}
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
              </div>
            </div>

            <Form.Item label="Vị trí công việc" className="form-label"  {...formItemLayout}>
              <div style={{display: 'flex'}}>
                {getFieldDecorator('job', {
                  initialValue: undefined,
                  rules: [
                    {
                      message: 'Vui lòng chọn vị trí công việc',
                      required: true,
                    },
                  ],
                })(
                  <Select className="bg-white text-black" placeholder="Chọn vị trí công việc" style={fontWeightStyle}
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

            <Form.Item label="Cấp bậc công việc" className="form-label"  {...formItemLayout}>
              <div style={{display: 'flex'}}>
                {getFieldDecorator('levelJob', {
                  initialValue: undefined,
                  rules: [
                    {
                      message: 'Vui lòng nhập cấp bậc công việc',
                      required: false,
                    },
                  ],
                })(
                  <Select className="bg-white text-black" placeholder="Câp bậc công việc" style={fontWeightStyle}
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

            <Form.Item label="Kỹ năng công việc" className="form-label" style={{paddingBottom: 15}}>
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
                  <Select className="bg-white text-black" placeholder="Chọn kỹ năng công việc"
                          mode="multiple" style={fontWeightStyle}
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

            <Form.Item label="Người giới thiệu" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('hrRef', {
                initialValue: undefined,
                rules: [
                  {
                    message: 'Vui lòng chọn người giới thiệu',
                    required: false,
                  },
                ],
              })(
                <Select className="bg-white text-black select-account-custom" style={fontWeightStyle}
                        placeholder="Chọn người giới thiệu">
                  {props.listAccount.rows?.map((item: any, index: any) => (
                    <Option key={index} value={item.username} label={item.fullName}>
                      <div className="flex-items-center" style={{paddingTop: 5}}>
                        <div style={{marginRight: 10}}>
                          <Avatar src={item.image ? item.image : "#"}
                                  style={{backgroundColor: item?.avatarColor, marginRight: 5}}>
                            {getInitials(item.fullName)}
                          </Avatar>
                        </div>
                        <div className="c-list-profile" style={{fontWeight: 500}}>
                          <div style={{height: 25}}>{item.fullName}</div>
                          <div style={{height: 25}} className="more-information">{item.email}</div>
                        </div>
                      </div>
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Phòng ban" className="form-label"  {...formItemLayout}>
              <div style={{display: 'flex'}}>
                {getFieldDecorator('department', {
                  initialValue: undefined,
                  rules: [
                    {
                      message: 'Vui lòng nhập phòng ban',
                      required: false,
                    },
                  ],
                })(
                  <TreeSelect
                    className="bg-white text-black"
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    treeData={treeData}
                    style={fontWeightStyle}
                    placeholder="Chọn bộ phận, phòng ban"
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
          </div>
          <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px', textAlign: "right"}} colon={false}>
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
