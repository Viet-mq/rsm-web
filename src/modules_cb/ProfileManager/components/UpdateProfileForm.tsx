import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateProfile} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Avatar, Button, DatePicker, Form, Icon, Input, Modal, Select, TreeSelect} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {UpdateProfileRequest} from "../types";
import {getListJob, getSearchJob, showFormCreate as showJobFormCreate} from "../../JobManager/redux/actions";
import {
  getListJobLevel,
  getSearchJobLevel,
  showFormCreate as showJobLevelFormCreate
} from "../../JobLevelManager/redux/actions";
import {
  getListSchool,
  getSearchSchool,
  showFormCreate as showSchoolFormCreate
} from "../../SchoolManager/redux/actions";
import {
  getListSourceCV,
  getSearchSourceCV,
  showFormCreate as showSourceCVFormCreate
} from "../../SourceCVManager/redux/actions";
import moment from "moment";
import CreateJobForm from "../../JobManager/components/CreateJobForm";
import CreateJobLevelForm from "../../JobLevelManager/components/CreateJobLevelForm";
import CreateSourceCVForm from "../../SourceCVManager/components/CreateSourceCVForm";
import CreateSchoolForm from "../../SchoolManager/components/CreateSchoolForm";
import CreateSkillForm from "../../SkillManager/components/CreateSkillForm";

import Loading from "../../../components/Loading";
import {getListDepartment, showFormCreate as showDepartmentFormCreate} from "../../DepartmentManager/redux/actions";
import CreateDepartmentForm from "../../DepartmentManager/components/CreateDepartmentForm";
import {showFormCreate as showSkillFormCreate} from "../../SkillManager/redux/actions";
import {getSearchAccount} from "../../AccountManager/redux/actions";
import {JobEntity} from "../../JobManager/types";
import {JobLevelEntity} from "../../JobLevelManager/types";
import {DepartmentEntity} from "../../DepartmentManager/types";
import {SourceCVEntity} from "../../SourceCVManager/types";
import {SchoolEntity} from "../../SchoolManager/types";
import {UserAccount} from "../../AccountManager/types";
import {formItemLayout, getInitials} from "../../../helpers/utilsFunc";

const {Option} = Select;
const {TreeNode} = TreeSelect;

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
  listSkill: state.skillManager.list,
  createSkill: state.skillManager.create,
  listRecruitment: state.recruitmentManager.list,
  listAccount: state.accountManager.list


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
    getListDepartment,
    showSkillFormCreate,
    showDepartmentFormCreate,
    getSearchJob,
    getSearchJobLevel,
    getSearchSourceCV,
    getSearchSchool,
    getSearchAccount
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateProfileFormProps extends FormComponentProps, ReduxProps {
}

function UpdateProfileForm(props: UpdateProfileFormProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const dateFormat = 'DD/MM/YYYY';
  const [job, setJob] = useState<JobEntity[]>([]);
  const [jobLevel, setJobLevel] = useState<JobLevelEntity[]>([]);
  const [department, setDepartment] = useState<DepartmentEntity[]>([]);
  const [sourceCV, setSourceCV] = useState<SourceCVEntity[]>([]);
  const [school, setSchool] = useState<SchoolEntity[]>([]);
  const [account, setAccount] = useState<UserAccount[] | any>([]);
  const [trigger, setTrigger] = useState({
    job: false,
    jobLevel: false,
    department: false,
    sourceCV: false,
    school: false,
    account: false,
  })

  useEffect(() => {
    setJob(props.listJob.rows)
    setJobLevel(props.listJobLevel.rows)
    setDepartment(props.listDepartment.rows)
    setSchool(props.listSchool.rows)
  }, [])

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
          fullName: values.fullName,
          hometown: values.hometown,
          email: values.email,
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
          mailRef2: values.mailRef2,
          recruitment: values.recruitmentId,
          skill: values.skill,

          company: values.company,
          facebook: values.facebook,
          github: values.github,
          linkedin: values.linkedin,
          pic: values.pic,
          skype: values.skype,
          status: values.status,
          time: 0,
          web: values.web,
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

  function handleCreateSchool(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showSchoolFormCreate(true);
  }

  function handleCreateJob(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showJobFormCreate(true);
  }

  function handleCreateJobLevel(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showJobLevelFormCreate(true);
  }

  function handleCreateSourceCV(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showSourceCVFormCreate(true);
  }

  function handleCreateDepartment(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showDepartmentFormCreate(true);
  }

  function handleCreateSkill(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showSkillFormCreate(true);
  }

  function onSearchJob(value: any) {
    props.getSearchJob({name: value})
    setTrigger({...trigger, job: true})
  }

  function onFocusJob() {
    setJob(props.listJob.rows)
  }

  function onSearchJobLevel(value: any) {
    props.getSearchJobLevel({name: value})
    setTrigger({...trigger, jobLevel: true})
  }

  function onFocusJobLevel() {
    setJobLevel(props.listJobLevel.rows)
  }

  function onSearchSourceCV(value: any) {
    props.getSearchSourceCV({name: value})
    setTrigger({...trigger, sourceCV: true})
  }

  function onFocusSourceCV() {
    setSourceCV(props.listSourceCV.rows)
  }

  function onSearchSchool(value: any) {
    props.getSearchSchool({name: value})
    setTrigger({...trigger, school: true})
  }

  function onFocusSchool() {
    setSchool(props.listSchool.rows)
  }

  function onSearchAccount(value: any) {
    props.getSearchAccount({name: value})
    setTrigger({...trigger, account: true})
  }

  function onFocusAccount() {
    setAccount(props.listAccount.rows)
  }

  const filterTreeNode = (input: any, node: any) => {
    const title = node.props.title;
    return title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

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
        <Form className="form-create" style={{width: 526}}>
          <div className="modal-overflow" style={{paddingRight: 15}}>

            <Form.Item label="Họ Tên" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('fullName', {
                initialValue: props.showForm.data_update?.fullName,
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
                    initialValue: moment(props.showForm.data_update?.dateOfBirth),
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
                    initialValue: props.showForm.data_update?.gender,
                    rules: [
                      {
                        message: 'Vui lòng nhập Giới tính',
                        required: false,
                      },
                    ],
                  })(
                    <Select getPopupContainer={(trigger: any) => trigger.parentNode} className="bg-white text-black"
                            style={fontWeightStyle}
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
                    initialValue: props.showForm.data_update?.phoneNumber,
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
                    initialValue: props.showForm.data_update?.email,
                    rules: [
                      {
                        message: 'Vui lòng nhập Email',
                        required: false,
                      },
                    ],
                  })(
                    <Input placeholder="Email" className="bg-white text-black"/>
                  )}
                </Form.Item>
              </div>
            </div>

            <div className="flex-space-between">
              <div className="mr-2" style={{width: 230}}>
                <Form.Item label="Facebook" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('facebook', {
                    initialValue: props.showForm.data_update?.facebook,
                    rules: [
                      {
                        message: 'Vui lòng nhập Facebook',
                        required: false,
                      },
                    ],
                  })(
                    <Input placeholder="Nhập Facebook" className="bg-white text-black"/>
                  )}
                </Form.Item>
              </div>

              <div className="flex-process">
                <Form.Item label="Skype" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('skype', {
                    initialValue: props.showForm.data_update?.skype,
                    rules: [
                      {
                        message: 'Vui lòng nhập skype',
                        required: false,
                      },
                    ],
                  })(
                    <Input placeholder="Skype" className="bg-white text-black"/>
                  )}
                </Form.Item>
              </div>
            </div>

            <div className="flex-space-between">
              <div className="mr-2" style={{width: 230}}>
                <Form.Item label="LinkedIn" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('linkedin', {
                    initialValue: props.showForm.data_update?.linkedin,
                    rules: [
                      {
                        message: 'Vui lòng nhập LinkedIn',
                        required: false,
                      },
                    ],
                  })(
                    <Input placeholder="Nhập LinkedIn" className="bg-white text-black"/>
                  )}
                </Form.Item>
              </div>

              <div className="flex-process">
                <Form.Item label="Github" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('github', {
                    initialValue: props.showForm.data_update?.github,
                    rules: [
                      {
                        message: 'Vui lòng nhập github',
                        required: false,
                      },
                    ],
                  })(
                    <Input placeholder="Github" className="bg-white text-black"/>
                  )}
                </Form.Item>
              </div>
            </div>

            <div className="flex-space-between">
              <div className="flex-process">
                <Form.Item label="Web" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('web', {
                    initialValue: props.showForm.data_update?.web,
                    rules: [
                      {
                        message: 'Vui lòng nhập web',
                        required: false,
                      },
                    ],
                  })(
                    <Input placeholder="Web" className="bg-white text-black"/>
                  )}
                </Form.Item>
              </div>
            </div>

            <Form.Item label="Địa chỉ" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('hometown', {
                initialValue: props.showForm.data_update?.hometown,
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
                  initialValue: props.showForm.data_update?.levelSchool,
                  rules: [
                    {
                      message: 'Vui lòng chọn trình độ đào tạo',
                      required: false,
                    },
                  ],
                })(
                  <Select getPopupContainer={(trigger: any) => trigger.parentNode} className="bg-white text-black"
                          style={fontWeightStyle} placeholder="Chọn trình độ đào tạo"
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
                  initialValue: props.showForm.data_update?.schoolId,
                  rules: [
                    {
                      message: 'Vui lòng chọn nơi đào tạo',
                      required: false,
                    },
                  ],
                })(
                  <Select
                    getPopupContainer={(trigger: any) => trigger.parentNode}
                    onSearch={onSearchSchool}
                    onFocus={onFocusSchool}
                    filterOption={(input, option: any) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    optionFilterProp="children"
                    showSearch
                    className="bg-white text-black"
                    style={fontWeightStyle}
                    placeholder="Chọn nơi đào tạo"
                  >
                    {school.map((item: any, index: any) => (
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
                    initialValue: moment(props.showForm.data_update?.dateOfApply),
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
                      initialValue: props.showForm.data_update?.sourceCVId,
                      rules: [
                        {
                          message: 'Vui lòng nhập nguồn ứng tuyển',
                          required: true,
                        },
                      ],
                    })(
                      <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                              onSearch={onSearchSourceCV}
                              onFocus={onFocusSourceCV}
                              filterOption={(input, option: any) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                              optionFilterProp="children"
                              showSearch
                              className="bg-white text-black" style={fontWeightStyle}
                      >
                        {sourceCV.map((item: any, index: any) => (
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
                  initialValue: props.showForm.data_update?.jobId,
                  rules: [
                    {
                      message: 'Vui lòng chọn vị trí công việc',
                      required: true,
                    },
                  ],
                })(
                  <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                          onSearch={onSearchJob}
                          onFocus={onFocusJob}
                          filterOption={(input, option: any) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          optionFilterProp="children"
                          showSearch
                          className="bg-white text-black"
                          placeholder="Chọn vị trí công việc"
                          style={fontWeightStyle}
                  >
                    {job.map((item: any, index: any) => (
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
                  initialValue: props.showForm.data_update?.levelJobId,
                  rules: [
                    {
                      message: 'Vui lòng nhập cấp bậc công việc',
                      required: false,
                    },
                  ],
                })(
                  <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                          onSearch={onSearchJobLevel}
                          onFocus={onFocusJobLevel}
                          filterOption={(input, option: any) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          optionFilterProp="children"
                          showSearch
                          className="bg-white text-black"
                          placeholder="Câp bậc công việc"
                          style={fontWeightStyle}
                  >
                    {jobLevel.map((item: any, index: any) => (
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
                  initialValue: props.showForm.data_update?.skill?.map((item: any) => item.id) || undefined,
                  rules: [
                    {
                      message: 'Vui lòng chọn kỹ năng công việc',
                      required: false,
                    },
                  ],
                })(
                  <Select
                    getPopupContainer={(trigger: any) => trigger.parentNode}
                    className="bg-white text-black"
                    placeholder="Chọn kỹ năng công việc"
                    mode="multiple"
                    style={fontWeightStyle}

                    filterOption={(input, option: any) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    optionLabelProp="children"
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

            <Form.Item label="Phòng ban" className="form-label"  {...formItemLayout}>
              <div style={{display: 'flex'}}>
                {getFieldDecorator('department', {
                  initialValue: props.showForm.data_update?.departmentId,
                  rules: [
                    {
                      message: 'Vui lòng nhập phòng ban',
                      required: false,
                    },
                  ],
                })(
                  <TreeSelect
                    showSearch
                    allowClear
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    getPopupContainer={(trigger: any) => trigger.parentNode}
                    filterTreeNode={filterTreeNode}
                    placeholder="Phòng ban"
                    className="bg-white text-black"
                    style={fontWeightStyle}
                  >
                    {props.listDepartment.rows?.map((item: any) => (
                      <TreeNode style={fontWeightStyle} value={item.id} title={item.name} key={item.id}>
                        {item.children ? item.children.map((el: any) => (
                          <TreeNode style={fontWeightStyle} value={el.id} key={el.id} title={el.name}/>
                        )) : null}
                      </TreeNode>

                    ))}

                  </TreeSelect>
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

            <Form.Item label="Người giới thiệu" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('hrRef', {
                initialValue: props.showForm.data_update?.username,
                rules: [
                  {
                    message: 'Vui lòng chọn giới thiệu',
                    required: false,
                  },
                ],
              })(
                <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                        onSearch={onSearchAccount}
                        onFocus={onFocusAccount}
                        showSearch
                        className="bg-white text-black select-account-custom"
                        style={fontWeightStyle}
                        optionLabelProp="label"
                        placeholder="Chọn người giới thiệu">
                  <Option key={"none"} value={""} label={"<None>"}>
                    <div>&lt;None&gt;</div>
                  </Option>
                  {account.map((item: any, index: any) => (
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

            <Form.Item label="Email người giới thiệu(Ngoài hệ thống)" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('mailRef2', {
                initialValue: props.showForm.data_update?.mailRef2,
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

            <Form.Item label="HR phụ trách" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('pic', {
                initialValue: props.showForm.data_update?.picId,
                rules: [
                  {
                    message: 'Vui lòng chọn HR phụ trách',
                    required: false,
                  },
                ],
              })(
                <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                        onSearch={onSearchAccount}
                        onFocus={onFocusAccount}
                        showSearch
                        className="bg-white text-black"
                        style={fontWeightStyle}
                        optionLabelProp="label"
                        placeholder="Chọn HR phụ trách">
                  <Option key={"none"} value={""} label={"<None>"}>
                    <div>&lt;None&gt;</div>
                  </Option>
                  {account.map((item: any, index: any) => (
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

          </div>
          <Form.Item label=" " style={{marginRight: 20, textAlign: "right"}} colon={false}>
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
