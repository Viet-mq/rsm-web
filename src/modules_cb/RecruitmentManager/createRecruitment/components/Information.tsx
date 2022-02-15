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
import ReactQuill from "react-quill";
import CreateJobForm from "../../../JobManager/components/CreateJobForm";
import Loading from "../../../../components/Loading";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  listAddress: state.addressManager.list,
  recruitmentManager: state.recruitmentManager,
  listTalentPool: state.talentPoolManager.list,
  listJob: state.jobManager.list,
  createJob: state.jobManager.create,
  listProcess: state.statuscvManager.list,
})

const connector = connect(mapStateToProps,
  {
    showJobFormCreate,
    checkInformationValidate,
    createSteps,
    getDataRecruitmentUpdate,

  });
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function InformationForm(props: IProps) {
  const location = useLocation();
  const {createSteps, update} = props.recruitmentManager
  const {getFieldDecorator} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const dateFormat = 'DD/MM/YYYY';
  const buttonCreate = useRef(null);
  const textEditorStyle = {marginBottom: 30}
  const isEdit = location.pathname.includes("edit");
  const [salary, setSalary] = useState<any>({
    from: 0,
    to: 0,
    detailOfSalary: "Chi tiết mức lương",
    // salaryDescription: "Từ 0 VND đến 0 VND"
  })
  const [display, setDisplay] = useState({
    interest: false,
    requirementOfJob: false,
    jobDescription: false

  })
  const [valueEditor, setValueEditor] = useState({
    interest: isEdit ? update.dataUpdate?.interest : createSteps.request?.interest || "",
    requirementOfJob: isEdit ? update.dataUpdate?.requirementOfJob : createSteps.request?.requirementOfJob || "",
    jobDescription: isEdit ? update.dataUpdate?.jobDescription : createSteps.request?.jobDescription || ""
  })

  const modules = {
    toolbar: [
      [{'header': '1'}, {'header': '2'}],
      ['blockquote', 'code-block'],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'direction': 'rtl'}],                         // text direction
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
      ['clean'],
    ],

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]


  useEffect(() => {
    document.title = "Quản lý tin tuyển dụng";
    if (isEdit) {
      setSalary({
        from: update.dataUpdate?.from,
        to: update.dataUpdate?.to,
        detailOfSalary: update.dataUpdate?.detailOfSalary,
      })
    }
  }, []);

  function onFormChange(salaryChange?: any, valueEditorChange?: any) {
    setTimeout(() => props.form.validateFields((err, values) => {
      let salaryDescription: any = '';
      switch (salaryChange.detailOfSalary) {
        case "Chi tiết mức lương":
          salaryDescription = ` Từ ${salaryChange.from.toLocaleString()} VND đến ${salaryChange.to.toLocaleString()} VND`;
          break
        case "Thỏa thuận":
          salaryDescription = " Thỏa thuận";
          break
        case "Từ ...":
          salaryDescription = ` Từ ${salaryChange.from.toLocaleString()} VND`;
          break
        case "Up to ...":
          salaryDescription = ` Up to ${salaryChange.to.toLocaleString()} VND`;
          break
      }

      if (!err &&valueEditorChange.interest&&valueEditorChange.jobDescription&& valueEditorChange.requirementOfJob) {
        if (isEdit) {
          if (update.dataUpdate) {
            let req: RecruitmentEntity = {
              ...update.dataUpdate,
              addressId: values.address,
              deadLine: values.deadLine * 1,
              jobId: values.job,
              quantity: values.quantity,
              talentPoolId: values.talentPool,
              title: values.title,
              typeOfJob: values.typeOfJob,
              detailOfSalary: salaryChange.detailOfSalary,
              from: salaryChange.from,
              to: salaryChange.to,
              salaryDescription: salaryDescription,
              requirementOfJob: valueEditorChange.requirementOfJob,
              jobDescription: valueEditorChange.jobDescription,
              interest: valueEditorChange.interest,
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
            detailOfSalary: salaryChange.detailOfSalary,
            from: salaryChange.from,
            to: salaryChange.to,
            salaryDescription: salaryDescription,
            requirementOfJob: valueEditorChange.requirementOfJob,
            jobDescription: valueEditorChange.jobDescription,
            interest: valueEditorChange.interest,
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
    onFormChange(newSalary, valueEditor)
    setSalary(newSalary)
  }

  function fromChange(value: any) {
    const newSalary = salary;
    newSalary.from = value !== null ? value : 0;
    onFormChange(newSalary, valueEditor)
    setSalary(newSalary)
  }

  function toChange(value: any) {
    const newSalary = salary;
    newSalary.to = value !== null ? value : 0;
    onFormChange(newSalary, valueEditor)
    setSalary(newSalary)
  }

  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  function handleChangeInterest(content: any) {
    console.log("Interest",content)

    if (content === "<p><br></p>") {
      setDisplay({...display, interest: true})
      setValueEditor({...valueEditor, interest: ""})
    } else {
      const newDisplay=display
      display.interest=false
      setDisplay(newDisplay)
      const newValueEditor = valueEditor
      newValueEditor.interest = content
      onFormChange(salary, newValueEditor)
      setValueEditor(newValueEditor)
    }
  }

  function handleChangeRequirement(content: any) {
    console.log("Requirement",content)
    if (content === "<p><br></p>") {
      setDisplay({...display, requirementOfJob: true})
      setValueEditor({...valueEditor, requirementOfJob: ""})
    } else {
      const newDisplay=display
      display.requirementOfJob=false
      setDisplay(newDisplay)
      const newValueEditor = valueEditor
      newValueEditor.requirementOfJob = content
      onFormChange(salary, newValueEditor)
      setValueEditor(newValueEditor)
    }
  }

  function handleChangeJobDescription(content: any) {
    console.log("Description",content)
    if (content === "<p><br></p>") {
      setDisplay({...display, jobDescription: true})
      setValueEditor({...valueEditor, jobDescription: ""})
    } else {
      const newDisplay=display
      display.jobDescription=false
      setDisplay(newDisplay)
      const newValueEditor = valueEditor
      newValueEditor.jobDescription = content
      onFormChange(salary, newValueEditor)
      setValueEditor(newValueEditor)
    }
  }

  const handleCreateJob = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showJobFormCreate(true);
  }

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
                  initialValue: isEdit ? update.dataUpdate?.title : createSteps.request?.title || '',
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
                    initialValue: isEdit ? update.dataUpdate?.jobId : createSteps.request?.job || undefined,
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
                        <Option key={index} value={item.id}>{item.name}</Option>
                      ))}
                    </Select>)}
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

              <Row style={{marginTop: 15}}>
                <Col span={12} style={{paddingRight: 10}}>
                  <Form.Item className="form-label" label="Địa điểm làm việc" labelCol={{span: 24}}
                             wrapperCol={{span: 24}}>
                    {getFieldDecorator('address', {
                      initialValue: isEdit ? update.dataUpdate?.addressId : createSteps.request?.address || undefined,
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
                      initialValue: isEdit ? update.dataUpdate?.typeOfJob : createSteps.request?.typeOfJob || 'Toàn thời gian',
                      rules: [
                        {
                          message: 'Vui lòng chọn loại hình công việc',
                          required: false,
                        },
                      ],
                    })(
                      <Select onChange={onFormChange} className="bg-white text-black" style={fontWeightStyle}>
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
                      initialValue: isEdit ? update.dataUpdate?.quantity : createSteps.request?.quantity || 1,
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
                      initialValue: isEdit ? moment(update.dataUpdate?.deadLine) : moment(createSteps.request?.deadLine) || moment().add(30, 'days'),
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
                    initialValue: isEdit ? update.dataUpdate?.talentPoolId : createSteps.request?.talentPool || undefined,
                    rules: [
                      {
                        message: 'Vui lòng chọn talent pools',
                        required: false,
                      },
                    ],
                  })(
                    <Select onChange={onFormChange} className="bg-white text-black" style={fontWeightStyle}
                            placeholder={"Chọn talent pool"}>
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
                  initialValue: isEdit ? update.dataUpdate?.detailOfSalary : createSteps.request?.detailOfSalary || 'Chi tiết mức lương',
                  rules: [
                    {
                      message: 'Vui lòng chọn loại hình công việc',
                      required: false,
                    },
                  ],
                })(
                  <Select onSelect={handleSelect} className="bg-white text-black"
                          style={fontWeightStyle}>
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
                      initialValue: isEdit ? update.dataUpdate?.from : createSteps.request?.from || 0,
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
                      initialValue: isEdit ? update.dataUpdate?.to : createSteps.request?.to || 0,
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
                {isEdit ? update.dataUpdate?.salaryDescription : createSteps.request?.salaryDescription}
              </div>

              <div className="font-20-bold-500 ">Mô tả công việc</div>
              <div className="form-label mb-4">
                <div className="mb-2">Mô tả công việc chi tiết<span className="value-required">*</span></div>
                <ReactQuill
                  style={fontWeightStyle}
                  className="ql-custom"
                  onChange={handleChangeJobDescription}
                  value={valueEditor.jobDescription||""}

                  theme={'snow'}
                  modules={modules}
                  formats={formats}
                  bounds={'.app'}
                  placeholder="Mô tả công việc chi tiết"
                />
                <div className={display.jobDescription ? "value-required show" : "value-required hide"}>Vui lòng nhập mô
                  tả chung
                </div>

              </div>
              <div className="form-label mb-4">
                <div className="mb-2">Yêu cầu công việc <span className="value-required">*</span></div>
                <ReactQuill
                  style={fontWeightStyle}
                  className="ql-custom"
                  onChange={handleChangeRequirement}
                  value={valueEditor.requirementOfJob||""}

                  theme={'snow'}
                  modules={modules}
                  formats={formats}
                  bounds={'.app'}
                  placeholder="Yêu cầu công việc"
                />
                <div className={display.requirementOfJob ? "value-required show" : "value-required hide"}>Vui lòng nhập
                  yêu cầu công việc
                </div>
              </div>

              <div className="form-label">
                <div className="mb-2">Quyền lợi <span className="value-required">*</span></div>
                <ReactQuill
                  style={fontWeightStyle}
                  className="ql-custom"
                  onChange={handleChangeInterest}
                  value={valueEditor.interest||""}

                  theme={'snow'}
                  modules={modules}
                  formats={formats}
                  bounds={'.app'}
                  placeholder="Quyền lợi"
                />

                <div className={display.interest ? "value-required show" : "value-required hide"}>Vui lòng nhập quyền
                  lợi
                </div>

              </div>

            </Form>
          </div>
        </div>
      </div>
      <CreateJobForm/>
      {props.createJob.loading  ?
        <Loading/> : null}
    </>

  );
}

export default connector(Form.create<IProps>()(InformationForm));
