import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Avatar, Button, DatePicker, Form, Icon, Input, Modal, Select, TreeSelect} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createProfile, showFormCreate} from "../redux/actions";
import {CreateProfileRequest} from "../types";
import {getSearchJob, showFormCreate as showJobFormCreate} from "../../JobManager/redux/actions";
import {getSearchJobLevel, showFormCreate as showJobLevelFormCreate} from "../../JobLevelManager/redux/actions";
import {getSearchSchool, showFormCreate as showSchoolFormCreate} from "../../SchoolManager/redux/actions";
import {getSearchSourceCV, showFormCreate as showSourceCVFormCreate} from "../../SourceCVManager/redux/actions";
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
import {JobEntity} from "../../JobManager/types";
import {JobLevelEntity} from "../../JobLevelManager/types";
import {DepartmentEntity} from "../../DepartmentManager/types";
import {SourceCVEntity} from "../../SourceCVManager/types";
import {SchoolEntity} from "../../SchoolManager/types";
import {getSearchAccount} from "../../AccountManager/redux/actions";
import {UserAccount} from "../../AccountManager/types";
import {formItemLayout, getInitials} from "../../../helpers/utilsFunc";

const {Option} = Select;
const {TreeNode} = TreeSelect;

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
    showDepartmentFormCreate,
    getSearchJob,
    getSearchJobLevel,
    getSearchSourceCV,
    getSearchSchool,
    getSearchAccount
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateProfileFormProps extends FormComponentProps, ReduxProps {
  idRecruitment?: string
}

function CreateProfileForm(props: CreateProfileFormProps) {
  const {showForm} = props.profileManager
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
          email: values.email,
          dateOfBirth: values.dateOfBirth * 1,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
          hometown: values.hometown,
          levelSchool: values.levelSchool,
          school: values.school,
          sourceCV: values.sourceCV,
          job: values.job,
          levelJob: values.levelJob,
          skill: values.skill,
          hrRef: values.hrRef,
          mailRef: values.mailRef,
          mailRef2: values.mailRef2,
          department: values.department,
          dateOfApply: values.dateOfApply * 1,

          company: values.company,
          facebook: values.facebook,
          github: values.github,
          linkedin: values.linkedin,
          pic: values.pic,
          skype: values.skype,
          status: values.status,
          time: 0,
          web: values.web,
          talentPool: showForm.recruitment_talentpool?.talentPool,
          recruitment: showForm.recruitment_talentpool?.recruitment,
        }
        // console.log(req)
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
        title="Tạo mới ứng viên"
        visible={showForm.show_create}
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

        <Form className="form-create" style={{width: 526}}>
          <div className="modal-overflow" style={{paddingRight: 15}}>
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
                    initialValue: "",
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
                    initialValue: "",
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
                    initialValue: "",
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
                    initialValue: "",
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
                    initialValue: "",
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
                  initialValue: undefined,
                  rules: [
                    {
                      message: 'Vui lòng chọn nơi đào tạo',
                      required: false,
                    },
                  ],
                })(
                  <Select getPopupContainer={(trigger: any) => trigger.parentNode}
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
                    // initialValue: undefined,
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
                      initialValue: undefined,
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
                              placeholder={"Nguồn ứng tuyển"}
                              className="bg-white text-black"
                              style={fontWeightStyle}
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
                  initialValue: undefined,
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
                  initialValue: undefined,
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
                  initialValue: undefined,
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
                    mode="multiple" style={fontWeightStyle}
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
                  initialValue: undefined,
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
                initialValue: undefined,
                rules: [
                  {
                    message: 'Vui lòng chọn người giới thiệu',
                    required: false,
                  },
                ],
              })(
                <Select
                  getPopupContainer={(trigger: any) => trigger.parentNode}
                  onSearch={onSearchAccount}
                  onFocus={onFocusAccount}
                  filterOption={(input, option: any) =>
                    option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    || option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  showSearch
                  className="bg-white text-black"
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
                initialValue: "",
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
                initialValue: undefined,
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
                        filterOption={(input, option: any) =>
                          option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          || option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        optionFilterProp="children"
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
          <Form.Item label=" " style={{marginRight:20, textAlign: "right"}} colon={false}>
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
