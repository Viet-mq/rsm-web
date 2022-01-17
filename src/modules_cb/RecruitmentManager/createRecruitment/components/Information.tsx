import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Col, DatePicker, Form, Icon, Input, InputNumber, Row, Select, Switch} from "antd";
import React, {useEffect, useRef, useState} from "react";
import moment from "moment";
import {showFormCreate as showJobFormCreate} from "../../../JobManager/redux/actions";
import {checkInformationValidate, createSteps, getDataRecruitmentUpdate} from "../../redux/actions";
import {CreateRecruitmentRequest, RecruitmentEntity} from "../../types";
import {useLocation} from "react-router-dom";
import {Editor} from "@tinymce/tinymce-react";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  getBookingState: state.profileManager.getBooking,
  updateBooking: state.profileManager.updateBooking,
  createBooking: state.profileManager.createBooking,
  showBooking: state.profileManager.showBooking,
  listAddress: state.addressManager.list,
  listRecruitment: state.recruitmentManager.list,
  listTalentPool: state.talentPoolManager.list,
  listJob: state.jobManager.list,
  createJob: state.jobManager.create,
  listProcess: state.statuscvManager.list,
  createStepsState: state.recruitmentManager.createSteps,
  dataUpdate: state.recruitmentManager.update.dataUpdate
})

const connector = connect(mapStateToProps,
  {
    showJobFormCreate,
    checkInformationValidate,
    createSteps,
    getDataRecruitmentUpdate
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function InformationForm(props: IProps) {
  const location = useLocation();
  const {getFieldDecorator} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const dateFormat = 'DD/MM/YYYY';
  const buttonCreate = useRef(null);
  const textEditorStyle = {marginBottom: 30}
  const [salary, setSalary] = useState<any>({
    from: 0,
    to: 0,
    detailOfSalary: "Chi tiết mức lương",
    salaryDescription: "Từ 0 VND đến 0 VND"
  })

  useEffect(() => {
    document.title = "Quản lý tin tuyển dụng";
    if (location.pathname.includes("edit")) {
      setSalary({
        from: props.dataUpdate?.from,
        to: props.dataUpdate?.to,
        detailOfSalary: props.dataUpdate?.detailOfSalary,
        salaryDescription: props.dataUpdate?.salaryDescription,
      })
    }
  }, []);


  function onFormChange() {
    setTimeout(() => props.form.validateFields((err, values) => {
      if (!err) {
        if (location.pathname.includes("edit")) {
          if (props.dataUpdate) {
            let req: RecruitmentEntity = {
              ...props.dataUpdate,
              addressId: values.address,
              deadLine: values.deadLine * 1,
              jobId: values.job,
              quantity: values.quantity,
              talentPoolId: values.talentPool,
              title: values.title,
              typeOfJob: values.typeOfJob,
              detailOfSalary: salary.detailOfSalary,
              from: salary.from,
              to: salary.to,
              salaryDescription: salary.salaryDescription,
              requirementOfJob: values.requirementOfJob,
              jobDescription: values.jobDescription,
              interest: values.interest,
            }
            props.getDataRecruitmentUpdate(req)
          }
        } else {
          let req: CreateRecruitmentRequest = ({
            address: values.address,
            deadLine: values.deadLine * 1,
            job: values.job,
            quantity: values.quantity,
            talentPool: values.talentPool,
            title: values.title,
            typeOfJob: values.typeOfJob,
            detailOfSalary: values.detailOfSalary,
            from: values.from,
            to: values.to,
            salaryDescription: salary.salaryDescription,
            requirementOfJob: values.requirementOfJob,
            jobDescription: values.jobDescription,
            interest: values.interest,
            interviewProcess: props.listProcess.rows,
            interviewer: []
          })
          props.createSteps(req)
        }

        props.checkInformationValidate(true)
      } else {
        props.checkInformationValidate(false)

      }
    }), 10)
  }

  function handleSelect(value: any) {
    const newSalary = salary;
    newSalary.detailOfSalary = value;

    if (value === "Chi tiết mức lương") {
      newSalary.salaryDescription = ` Từ ${newSalary.from} VND đến ${newSalary.to} VND`
    }
    if (value === "Thỏa thuận") {
      newSalary.salaryDescription = " Thỏa thuận"
    }
    if (value === "Từ ...") {
      newSalary.salaryDescription = ` Từ ${salary.from} VND`
    }
    if (value === "Up to ...") {
      newSalary.salaryDescription = ` Up to ${salary.to} VND`
    }
    setSalary(newSalary)
  }

  function fromChange(value: any) {
    const newSalary = salary;
    newSalary.from = value !== null ? value : 0;
    setSalary(newSalary)
  }

  function toChange(value: any) {
    const newSalary = salary;
    newSalary.to = value !== null ? value : 0;
    setSalary(newSalary)
  }

  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <div className="main-content">
        <div style={{padding: "24px 24px 0 24px"}}>
          <div className="schedule-detail-title">Thông tin chung</div>
        </div>
        <div className="c-schedule-interview-popup">
          <div className='ant-col-14 grid-left'>
            <Form>
              <Form.Item className="form-label" label="Tiều đề tin tuyển dụng" labelCol={{span: 24}}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('title', {
                  initialValue: location.pathname.includes("edit") ? props.dataUpdate?.title : props.createStepsState.request?.title || '',
                  rules: [
                    {
                      message: 'Vui lòng nhập tin tuyển dụng',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Nhập tiêu đề" onChange={onFormChange} className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item className="form-label" label="Vị trí tuyển dụng" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                <div style={{display: 'flex'}}>
                  {getFieldDecorator('job', {
                    initialValue: location.pathname.includes("edit") ? props.dataUpdate?.jobId : props.createStepsState.request?.job || undefined,
                    rules: [
                      {
                        message: 'Vui lòng nhập vị trí tuyển dụng',
                        required: true,
                      },
                    ],
                  })(
                    <Select onChange={onFormChange} className="bg-white text-black" style={fontWeightStyle}
                            placeholder="Chọn vị trí công việc"
                    >
                      {props.listJob.rows?.map((item: any, index: any) => (
                        <Option key={index} value={item.id}>{item.officeName} - {item.name}</Option>
                      ))}
                    </Select>)}
                  <Button
                    size="small"
                    className="ant-btn ml-1 mr-1 ant-btn-sm"
                    style={{height: '32px'}}
                  >
                    <Icon type="plus"/>
                  </Button>
                </div>
              </Form.Item>

              <Row style={{marginTop: 15}}>
                <Col span={12} style={{paddingRight: 10}}>
                  <Form.Item className="form-label" label="Địa điểm làm việc" labelCol={{span: 24}}
                             wrapperCol={{span: 24}}>
                    {getFieldDecorator('address', {
                      initialValue: location.pathname.includes("edit") ? props.dataUpdate?.addressId : props.createStepsState.request?.address || undefined,
                      rules: [
                        {
                          message: 'Vui lòng nhập địa điểm',
                          required: true,
                        },
                      ],
                    })(
                      <Select onChange={onFormChange} className="bg-white text-black" style={fontWeightStyle}
                              placeholder="Chọn địa điểm"
                      >
                        {props.listAddress.rows?.map((item: any, index: any) => (
                          <Option key={index} value={item.id}>{item.officeName} - {item.name}</Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item className="form-label" label="Loại hình công việc" labelCol={{span: 24}}
                             wrapperCol={{span: 24}}>
                    {getFieldDecorator('typeOfJob', {
                      initialValue: location.pathname.includes("edit") ? props.dataUpdate?.typeOfJob : props.createStepsState.request?.typeOfJob || 'Toàn thời gian',
                      rules: [
                        {
                          message: 'Vui lòng chọn loại hình công việc',
                          required: false,
                        },
                      ],
                    })(
                      <Select className="bg-white text-black" style={fontWeightStyle}>
                        <Option key="1" value="Toàn thời gian">Toàn thời gian</Option>
                        <Option key="2" value="Bán thời gian">Bán thời gian</Option>
                        <Option key="3" value="Hợp đồng thời vụ">Hợp đồng thời vụ</Option>
                        <Option key="4" value="Thực tập sinh">Thực tập sinh</Option>
                        <Option key="5" value="Cộng tác viên">Cộng tác viên</Option>
                        <Option key="6" value="Freelancer">Freelancer</Option>
                      </Select>)}
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{marginTop: 15}}>
                <Col span={12} style={{paddingRight: 10}}>
                  <Form.Item className="form-label" label="Số lượng tuyển dụng" labelCol={{span: 24}}
                             wrapperCol={{span: 24}}>
                    {getFieldDecorator('quantity', {
                      initialValue: location.pathname.includes("edit") ? props.dataUpdate?.quantity : props.createStepsState.request?.quantity || 1,
                      rules: [
                        {
                          message: 'Vui lòng chọn số lượng',
                          required: true,
                        },
                      ],
                    })(
                      <InputNumber onChange={onFormChange} style={{width: "100%"}} type="number" min={0}
                                   className="bg-white text-black"/>
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item className="form-label" label="Hạn nộp hồ sơ" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                    {getFieldDecorator('deadLine', {
                      initialValue: location.pathname.includes("edit") ? moment(props.dataUpdate?.deadLine) : moment(props.createStepsState.request?.deadLine) || moment().add(30, 'days'),
                      rules: [
                        {
                          message: 'Vui lòng chọn ngày hạn nộp',
                          required: true,
                        },
                      ],
                    })(
                      <DatePicker onChange={onFormChange} format={dateFormat} style={{width: "100%"}}/>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <div style={{display: "flex"}}>
                <Switch defaultChecked className="mr-2"/> <p className="form-label">Tuyển đến khi đủ</p>
              </div>

              <Form.Item label="Talent pools" className="form-label" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                <div style={{display: 'flex'}}>
                  {getFieldDecorator('talentPool', {
                    initialValue: location.pathname.includes("edit") ? props.dataUpdate?.talentPoolId : props.createStepsState.request?.talentPool || undefined,
                    rules: [
                      {
                        message: 'Vui lòng chọn talent pools',
                        required: false,
                      },
                    ],
                  })(
                    <Select className="bg-white text-black" style={fontWeightStyle} placeholder={"Chọn talent pool"}>
                      {props.listTalentPool.rows?.map((item: any, index: any) => (
                        <Option key={index} value={item.id}>{item.name}</Option>
                      ))}
                    </Select>
                  )}
                </div>
              </Form.Item>

              <div className={"font-20-bold-500"}>Mức lương</div>

              <Form.Item className="form-label" label="Hiển thị trên tin tuyển dụng" labelCol={{span: 24}}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('detailOfSalary', {
                  initialValue: location.pathname.includes("edit") ? props.dataUpdate?.detailOfSalary : props.createStepsState.request?.detailOfSalary || 'Chi tiết mức lương',
                  rules: [
                    {
                      message: 'Vui lòng chọn loại hình công việc',
                      required: false,
                    },
                  ],
                })(
                  <Select onSelect={handleSelect} className="bg-white text-black" style={fontWeightStyle}>
                    <Option key="1" value="Chi tiết mức lương">Chi tiết mức lương</Option>
                    <Option key="2" value="Thỏa thuận">Thỏa thuận</Option>
                    <Option key="3" value="Từ ...">Từ ...</Option>
                    <Option key="4" value="Up to ...">Up to ...</Option>
                  </Select>)}
              </Form.Item>

              <Row style={{marginTop: 15}}>
                <Col span={12} style={{paddingRight: 10}}>
                  <Form.Item className="form-label" label="Từ" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                    {getFieldDecorator('from', {
                      initialValue: location.pathname.includes("edit") ? props.dataUpdate?.from : props.createStepsState.request?.from || 0,
                      rules: [
                        {
                          message: 'Vui lòng chọn mức lương từ',
                          required: false,
                        },
                      ],
                    })(
                      <InputNumber onChange={fromChange} style={{width: "100%"}} type="number" min={0}
                                   className="bg-white text-black"/>
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item className="form-label" label="Đến" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                    {getFieldDecorator('to', {
                      initialValue: location.pathname.includes("edit") ? props.dataUpdate?.to : props.createStepsState.request?.to || 0,
                      rules: [
                        {
                          message: 'Vui lòng chọn mức lương đến',
                          required: false,
                        },
                      ],
                    })(
                      <InputNumber onChange={toChange} style={{width: "100%"}} type="number" min={0}
                                   className="bg-white text-black"/>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <div className="pb-3" style={{color: "#6a727d"}}>Nội dung hiển thị:
                {salary.detailOfSalary === "Chi tiết mức lương" ? ` Từ ${salary.from} VND đến ${salary.to} VND` :
                  salary.detailOfSalary === "Thỏa thuận" ? " Thỏa thuận" :
                    salary.detailOfSalary === "Từ ..." ? ` Từ ${salary.from} VND` : ` Up to ${salary.to} VND`
                }
              </div>

              <div className="font-20-bold-500 ">Mô tả công việc</div>

              <Form.Item className="form-label quill-editor" label="Mô tả chung về công việc" labelCol={{span: 24}}
                         style={textEditorStyle} wrapperCol={{span: 24}}>
                {getFieldDecorator('jobDescription', {
                  initialValue: location.pathname.includes("edit") ? props.dataUpdate?.jobDescription : props.createStepsState.request?.jobDescription || '',
                  rules: [
                    {
                      message: 'Vui lòng nhập mô tả chung',
                      required: true,
                    },
                  ],
                })(
                  <Editor
                    onChange={onFormChange}
                    apiKey="b616i94ii3b9vlza43fus93fppxb1yxb8f03gh926u51qhs6"
                    // onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                      menu: {
                        tc: {
                          title: 'Comments',
                          items: 'addcomment showcomments deleteallconversations'
                        }
                      },
                      height: 330,
                       menubar: true,
                      branding: false,
                      toolbar: 'undo redo | bold italic underline strikethrough |alignleft aligncenter alignright alignjustify | outdent indent |fontselect fontsizeselect formatselect |    numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                      autosave_interval: '30s',
                      autosave_restore_when_empty: false,
                      autosave_retention: '2m',
                      image_caption: true,
                      quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                      toolbar_mode: 'sliding',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />
                )}
              </Form.Item>

              <Form.Item className="form-label quill-editor" label="Yêu cầu công việc" labelCol={{span: 24}}
                         style={textEditorStyle} wrapperCol={{span: 24}}>
                {getFieldDecorator('requirementOfJob', {
                  initialValue: location.pathname.includes("edit") ? props.dataUpdate?.requirementOfJob : props.createStepsState.request?.requirementOfJob || '',
                  rules: [
                    {
                      message: 'Vui lòng nhập yêu cầu công việc',
                      required: true,
                    },
                  ],
                })(
                  <Editor
                    onChange={onFormChange}
                    apiKey="b616i94ii3b9vlza43fus93fppxb1yxb8f03gh926u51qhs6"
                    // onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                      menu: {
                        tc: {
                          title: 'Comments',
                          items: 'addcomment showcomments deleteallconversations'
                        }
                      },
                      height: 330,
                       menubar: true,
                      branding: false,
                      toolbar: 'undo redo | bold italic underline strikethrough |alignleft aligncenter alignright alignjustify | outdent indent |fontselect fontsizeselect formatselect |    numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                      autosave_interval: '30s',
                      autosave_restore_when_empty: false,
                      autosave_retention: '2m',
                      image_caption: true,
                      quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                      toolbar_mode: 'sliding',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />
                )}
              </Form.Item>

              <Form.Item className="form-label quill-editor" label="Quyền lợi" labelCol={{span: 24}}
                         style={textEditorStyle} wrapperCol={{span: 24}}>
                {getFieldDecorator('interest', {
                  initialValue: location.pathname.includes("edit") ? props.dataUpdate?.interest : props.createStepsState.request?.interest || 'hhgfhjgfhj',
                  getValueFromEvent: e => e.target && e.target.getContent()&&console.log(e.target.getContent()),

                  rules: [
                    {
                      message: 'Vui lòng nhập quyển lợi',
                      required: true,
                    },
                  ],
                })(
                  <Editor
                    onChange={onFormChange}
                    apiKey="b616i94ii3b9vlza43fus93fppxb1yxb8f03gh926u51qhs6"
                    // onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                      menu: {
                        tc: {
                          title: 'Comments',
                          items: 'addcomment showcomments deleteallconversations'
                        }
                      },
                      height: 330,
                       menubar: true,
                      branding: false,
                      toolbar: 'undo redo | bold italic underline strikethrough |alignleft aligncenter alignright alignjustify | outdent indent |fontselect fontsizeselect formatselect |    numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                      autosave_interval: '30s',
                      autosave_restore_when_empty: false,
                      autosave_retention: '2m',
                      image_caption: true,
                      quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                      toolbar_mode: 'sliding',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />
                )}
              </Form.Item>

            </Form>
          </div>
        </div>
      </div>
    </>

  );
}

export default connector(Form.create<IProps>()(InformationForm));
