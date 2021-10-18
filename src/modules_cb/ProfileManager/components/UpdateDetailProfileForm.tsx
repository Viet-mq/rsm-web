import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {
  getActivityLogs,
  showFormDetail,
  showFormUpdateDetail,
  updateDetail,
} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, DatePicker, Form, Icon, Input, Modal, Select} from "antd";
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
    showFormDetail

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
  }, [])
  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;

      props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateDetailRequest = {
          id: props.showForm.data_update_detail?.id,
          cv: values.cv,
          cvType: values.cvType,
          dateOfApply: values.dateOfApply*1,
          dateOfBirth: values.dateOfBirth*1,
          email: values.email,
          evaluation: values.evaluation,
          gender: values.gender,
          fullName: values.fullName,
          hometown: values.hometown,
          hrRef: values.hrRef,
          job:values.job,
          levelJob: values.levelJob,
          phoneNumber: values.phoneNumber,
          school:values.school,
          sourceCV:values.sourceCV,
          lastApply: values.lastApply*1,
          note: values.note,
          tags: values.tags
        }
        // console.log("UpdateProfile:",req)
        props.updateDetail(req);
        return;
      }
    });
  }

  console.log("props.showForm.data_update_detail:",props.showForm.data_update_detail)
  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormUpdateDetail(false);
    let req: DetailCV = {
      show_detail: true,
      general: 12,
      detail: 12,
    }
    props.showFormDetail(req);
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

  return (
    <div>

      <Modal
        zIndex={2}
        maskClosable={false}
        title="Cập nhật Profile hệ thống"
        visible={props.showForm.show_update_detail}
        centered={true}
        width="550px"
        afterClose={() => {
          resetFields();
          setCompensatoryDataSource([]);
        }}
        onCancel={() => {
          resetFields();
          setCompensatoryDataSource([]);
          props.showFormUpdateDetail(false);
          let req: DetailCV = {
            show_detail: true,
            general: 12,
            detail: 12,
          }
          props.showFormDetail(req);
        }}
        footer={""}>

        <Form {...formItemLayout} >

          <Form.Item label="Họ Tên" className="mb-0" style={{...formItemStyle}}>
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

          <Form.Item label="Giới tính" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('gender', {
              initialValue: props.showForm.data_update_detail?.gender==="Nam"?"Nam":"Nữ",
              rules: [
                {
                  message: 'Vui lòng nhập Giới tính',
                  required: true,
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

          <Form.Item label="Năm sinh" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('dateOfBirth', {
              initialValue: moment(props.showForm.data_update_detail?.dateOfBirth),
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
              initialValue: props.showForm.data_update_detail?.hometown,
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
                  initialValue: props.showForm.data_update_detail?.schoolId,
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
              initialValue: props.showForm.data_update_detail?.phoneNumber,
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
              initialValue: props.showForm.data_update_detail?.email,
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
                initialValue: props.showForm.data_update_detail?.jobId,
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
                initialValue: props.showForm.data_update_detail?.levelJobId,
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


          <Form.Item label="Note" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('note', {
              initialValue: props.showForm.data_update_detail?.note,
              rules: [
                {
                  message: 'Vui lòng nhập ghi chú',
                  required: true,
                },
              ],
            })(
              <Input placeholder="Note" className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label="Đánh giá" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('evaluation', {
              initialValue: props.showForm.data_update_detail?.evaluation,
              rules: [
                {
                  message: 'Vui lòng nhập đánh giá',
                  required: true,
                },
              ],
            })(
              <Input placeholder="Đánh giá" className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label="Tags" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('tags', {
              initialValue: props.showForm.data_update_detail?.tags,
              rules: [
                {
                  message: 'Vui lòng nhập tags',
                  required: true,
                },
              ],
            })(
              <Input placeholder="Tags" className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label="Nguồn CV" className="mb-0" style={{...formItemStyle}}>
            <div style={{display: 'flex'}}>
              {getFieldDecorator('sourceCV', {
                initialValue: props.showForm.data_update_detail?.sourceCVId,
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

          <Form.Item label="CV" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('cv', {
              initialValue: props.showForm.data_update_detail?.cv,
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
              initialValue: props.showForm.data_update_detail?.hrRef,
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
              initialValue: moment(props.showForm.data_update_detail?.dateOfApply),
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
         
          <Form.Item label="Chỉnh sửa lần cuối" className="mb-0" style={{...formItemStyle}}>
            {getFieldDecorator('lastApply', {
              initialValue: moment(props.showForm.data_update_detail?.lastApply),
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
              initialValue: props.showForm.data_update_detail?.cvType,
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
