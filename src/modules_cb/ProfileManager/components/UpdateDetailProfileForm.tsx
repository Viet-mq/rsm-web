import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {
  getActivityLogs,
  showFormDetail,
  showFormUpdate,
  showFormUpdateDetail,
  updateDetail,
  updateProfile,
} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Avatar, Button, DatePicker, Form, Icon, Input, Modal, Select, TreeSelect} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {DetailCV, UpdateDetailRequest} from "../types";
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
import {getListTalentPool} from "../../TalentPoolManager/redux/actions";
import CreateDepartmentForm from "../../DepartmentManager/components/CreateDepartmentForm";
import CreateSkillForm from "../../SkillManager/components/CreateSkillForm";
import {getListDepartment, showFormCreate as showDepartmentFormCreate} from "../../DepartmentManager/redux/actions";
import {showFormCreate as showSkillFormCreate} from "../../SkillManager/redux/actions";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  showForm: state.profileManager.showForm,
  listJob: state.jobManager.list,
  listJobLevel: state.joblevelManager.list,
  listSchool: state.schoolManager.list,
  listSourceCV: state.sourcecvManager.list,
  createJob: state.jobManager.create,
  createJobLevel: state.joblevelManager.create,
  createSchool: state.schoolManager.create,
  createSourceCV: state.sourcecvManager.create,
  listTalentPool: state.talentPoolManager.list,
  listDepartment: state.departmentManager.list,

  listSkill: state.skillManager.list,
  createSkill: state.skillManager.create,
  listRecruitment: state.recruitmentManager.list,
  listAccount: state.accountManager.list
})

const connector = connect(mapStateToProps,
  {
    updateDetail,
    getListJob,
    getListJobLevel,
    getListSchool,
    getListSourceCV,
    showJobFormCreate,
    showJobLevelFormCreate,
    showSchoolFormCreate,
    showSourceCVFormCreate,
    getActivityLogs,
    showFormUpdateDetail,
    showFormDetail,
    getListTalentPool,
    showFormUpdate,
    updateProfile,
    getListDepartment,
    showSkillFormCreate,
    showDepartmentFormCreate

  });
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateProfileFormProps extends FormComponentProps, ReduxProps {
}

function UpdateProfileForm(props: UpdateProfileFormProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const [treeData, setTreeData] = useState([])
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

  useEffect(() => {
    setTreeData(convertArrayToTree(props.listDepartment.rows))
  }, [props.listDepartment.rows])

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateDetailRequest = {
          id: props.showForm.data_update_detail?.id,
          dateOfApply: values.dateOfApply * 1,
          dateOfBirth: values.dateOfBirth * 1,
          email: values.email,
          evaluation: values.evaluation,
          gender: values.gender,
          fullName: values.fullName,
          hometown: values.hometown,
          hrRef: values.hrRef,
          job: values.job,
          levelJob: values.levelJob,
          phoneNumber: values.phoneNumber,
          school: values.school,
          sourceCV: values.sourceCV,
          lastApply: values.lastApply * 1,
          company: values.company,
          facebook: values.facebook,
          github: values.github,
          linkedin: values.linkedin,
          otherTech: values.otherTech,
          pic: values.pic,
          skype: values.skype,
          status: values.status,
          time: 0,
          web: values.web,
          department: values.department,
          levelSchool: values.levelSchool,
          skill: values.skill,
        }
        props.updateDetail(req);

        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdateDetail(false);
    let req: DetailCV = {
      show_detail: true,
      general: 12,
      detail: 12,
    }

    props.showFormDetail(req);
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

  function convertArrayToTree(arrays: any) {
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

  function getInitials(name: string) {
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
    <>
      <div>
        <Modal
          zIndex={2}
          maskClosable={false}
          title="Cập nhật chi tiết ứng viên"
          visible={props.showForm.show_update_detail}
          centered={true}
          width="550px"
          afterClose={() => {
            resetFields();
          }}
          onCancel={() => {
            resetFields();
            props.showFormUpdateDetail(false);
          }}
          footer={""}>
          <Form className="form-create">
            <div className="modal-overflow">

              <Form.Item label="Họ Tên" className="form-label"  {...formItemLayout}>
                {getFieldDecorator('fullName', {
                  initialValue: props.showForm.data_update_detail?.fullName,
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

              <div className="flex-space-between">
                <div className="mr-2">
                  <Form.Item label="Năm sinh" className="form-label"  {...formItemLayout}>
                    {getFieldDecorator('dateOfBirth', {
                      initialValue: moment(props.showForm.data_update_detail?.dateOfBirth),
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
                      initialValue: props.showForm.data_update_detail?.gender,
                      rules: [
                        {
                          message: 'Vui lòng nhập Giới tính',
                          required: false,
                        },
                      ],
                    })(
                    <Select getPopupContainer={(trigger:any) => trigger.parentNode} className="bg-white text-black" style={fontWeightStyle}
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
                      initialValue: props.showForm.data_update_detail?.phoneNumber,
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
                      initialValue: props.showForm.data_update_detail?.email,
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
                      initialValue: props.showForm.data_update_detail?.facebook,
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
                      initialValue: props.showForm.data_update_detail?.skype,
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
                      initialValue: props.showForm.data_update_detail?.linkedin,
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
                      initialValue: props.showForm.data_update_detail?.github,
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
                <div className="mr-2" style={{width: 230}}>
                  <Form.Item label="Other Tech" className="form-label"  {...formItemLayout}>
                    {getFieldDecorator('otherTech', {
                      initialValue: props.showForm.data_update_detail?.otherTech,
                      rules: [
                        {
                          message: 'Vui lòng nhập Other Tech',
                          required: false,
                        },
                      ],
                    })(
                      <Input placeholder="Nhập Other Tech" className="bg-white text-black"/>
                    )}
                  </Form.Item>
                </div>

                <div className="flex-process">
                  <Form.Item label="Web" className="form-label"  {...formItemLayout}>
                    {getFieldDecorator('web', {
                      initialValue: props.showForm.data_update_detail?.web,
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
                  initialValue: props.showForm.data_update_detail?.hometown,
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
                    initialValue: props.showForm.data_update_detail?.levelSchool,
                    rules: [
                      {
                        message: 'Vui lòng chọn trình độ đào tạo',
                        required: false,
                      },
                    ],
                  })(
                  <Select getPopupContainer={(trigger:any) => trigger.parentNode} className="bg-white text-black" style={fontWeightStyle} placeholder="Chọn trình độ đào tạo"
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
                    initialValue: props.showForm.data_update_detail?.schoolId,
                    rules: [
                      {
                        message: 'Vui lòng chọn nơi đào tạo',
                        required: false,
                      },
                    ],
                  })(
                  <Select getPopupContainer={(trigger:any) => trigger.parentNode} className="bg-white text-black" style={fontWeightStyle} placeholder="Chọn nơi đào tạo"
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
                      initialValue: moment(props.showForm.data_update_detail?.dateOfApply),
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
                        initialValue: props.showForm.data_update_detail?.sourceCVId,
                        rules: [
                          {
                            message: 'Vui lòng nhập nguồn ứng tuyển',
                            required: true,
                          },
                        ],
                      })(
                      <Select getPopupContainer={(trigger:any) => trigger.parentNode} className="bg-white text-black" style={fontWeightStyle}
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
                    initialValue: props.showForm.data_update_detail?.jobId,
                    rules: [
                      {
                        message: 'Vui lòng chọn vị trí công việc',
                        required: true,
                      },
                    ],
                  })(
                  <Select getPopupContainer={(trigger:any) => trigger.parentNode} className="bg-white text-black" placeholder="Chọn vị trí công việc" style={fontWeightStyle}
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
                    initialValue: props.showForm.data_update_detail?.levelJobId,
                    rules: [
                      {
                        message: 'Vui lòng nhập cấp bậc công việc',
                        required: false,
                      },
                    ],
                  })(
                  <Select getPopupContainer={(trigger:any) => trigger.parentNode} className="bg-white text-black" placeholder="Câp bậc công việc" style={fontWeightStyle}
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
                    initialValue: props.showForm.data_update_detail?.skill?.map((item: any) => item.id) || undefined,
                    rules: [
                      {
                        message: 'Vui lòng chọn kỹ năng công việc',
                        required: false,
                      },
                    ],
                  })(
                  <Select getPopupContainer={(trigger:any) => trigger.parentNode} className="bg-white text-black" placeholder="Chọn kỹ năng công việc"
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
                  initialValue: props.showForm.data_update_detail?.username,
                  rules: [
                    {
                      message: 'Vui lòng chọn giới thiệu',
                      required: false,
                    },
                  ],
                })(
                <Select getPopupContainer={(trigger:any) => trigger.parentNode}
                    className="bg-white text-black select-account-custom"
                    style={fontWeightStyle}
                    optionLabelProp="label"

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

              <Form.Item label="HR phụ trách" className="form-label"  {...formItemLayout}>
                {getFieldDecorator('pic', {
                  initialValue: props.showForm.data_update_detail?.picId,
                  rules: [
                    {
                      message: 'Vui lòng HR phụ trách',
                      required: false,
                    },
                  ],
                })(
                <Select getPopupContainer={(trigger:any) => trigger.parentNode}
                    className="bg-white text-black select-account-custom"
                    style={fontWeightStyle}
                    optionLabelProp="label"

                    placeholder="Chọn HR phụ trách">
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
                    initialValue: props.showForm.data_update_detail?.department,
                    rules: [
                      {
                        message: 'Vui lòng nhập phòng ban',
                        required: false,
                      },
                    ],
                  })(
                    <TreeSelect getPopupContainer={(trigger:any) => trigger.parentNode}
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

    </>


  )
}

export default connector(Form.create<UpdateProfileFormProps>()(UpdateProfileForm));
