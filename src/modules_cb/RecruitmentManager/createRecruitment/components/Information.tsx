import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Col, DatePicker, Form, Icon, Input, InputNumber, Row, Select, Switch} from "antd";
import React from "react";
import moment from "moment";
import {showFormCreate as showJobFormCreate} from "../../../JobManager/redux/actions";
import 'devextreme/dist/css/dx.light.css';
import ReactQuill from "react-quill";
import {setInfoCheck} from "../../redux/actions";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  listStatus: state.statuscvManager.list,
  getBookingState: state.profileManager.getBooking,
  updateBooking: state.profileManager.updateBooking,
  createBooking: state.profileManager.createBooking,
  showBooking: state.profileManager.showBooking,
  listAddress: state.addressManager.list,
  listRecruitment: state.recruitmentManager.list,
  listTalentPool: state.talentPoolManager.list,
  listJob: state.jobManager.list,
  createJob: state.jobManager.create,
})

const connector = connect(mapStateToProps,
  {
    showJobFormCreate,
    setInfoCheck
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function InformationForm(props: IProps) {

  const {getFieldDecorator} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const dateFormat = 'DD/MM/YYYY';
  const formItemHeight = {height: 250}
  const textEditorHeight = {height: 150}

  const modules = {
    toolbar: [
      [{'header': '1'}, {'header': '2'}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],

    clipboard: {
      matchVisual: false,
    }
  }
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  function onFormChange() {
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.setInfoCheck(true);
      } else {
        props.setInfoCheck(false);
      }
    });
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
                  initialValue: '',
                  rules: [
                    {
                      message: 'Vui lòng nhập tin tuyển dụng',
                      required: true,
                    },
                  ],
                })(
                  <Input onChange={onFormChange} placeholder="Nhập tiêu đề" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item className="form-label" label="Vị trí tuyển dụng" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                <div style={{display: 'flex'}}>
                  {getFieldDecorator('job', {
                    initialValue: undefined,
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
                      initialValue: undefined,
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
                      initialValue: 'Toàn thời gian',
                      rules: [
                        {
                          message: 'Vui lòng chọn loại hình công việc',
                          required: false,
                        },
                      ],
                    })(
                      <Select className="bg-white text-black" style={fontWeightStyle}
                      >
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
                      initialValue: 0,
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
                      initialValue: moment().add(30, 'days'),
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
                    initialValue: undefined,
                    rules: [
                      {
                        message: 'Vui lòng chọn talent pools',
                        required: false,
                      },
                    ],
                  })(
                    <Select className="bg-white text-black" style={fontWeightStyle} placeholder={"Chọn talent pool"}
                    >
                      {props.listTalentPool.rows?.map((item: any, index: any) => (
                        <Option key={index} value={item.id}>{item.name}</Option>
                      ))}
                    </Select>
                  )}
                </div>
              </Form.Item>

              <div className={"font-20-bold-500"}>Mức lương</div>

              <Row style={{marginTop: 15}}>
                <Col span={12} style={{paddingRight: 10}}>
                  <Form.Item className="form-label" label="Từ" labelCol={{span: 24}}
                             wrapperCol={{span: 24}}>
                    {getFieldDecorator('from', {
                      initialValue: 0,
                      rules: [
                        {
                          message: 'Vui lòng chọn số lượng',
                          required: false,
                        },
                      ],
                    })(
                      <InputNumber style={{width: "100%"}} type="number" min={0}
                                   className="bg-white text-black"/>
                    )}
                  </Form.Item>

                </Col>
                <Col span={12}>
                  <Form.Item className="form-label" label="Đến" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                    {getFieldDecorator('to', {
                      initialValue: 0,
                      rules: [
                        {
                          message: 'Vui lòng chọn số lượng',
                          required: false,
                        },
                      ],
                    })(
                      <InputNumber style={{width: "100%"}} type="number" min={0}
                                   className="bg-white text-black"/>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item className="form-label" label="Hiển thị trên tin tuyển dụng" labelCol={{span: 24}}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('detailOfSalary', {
                  initialValue: 'Chi tiết mức lương',
                  rules: [
                    {
                      message: 'Vui lòng chọn loại hình công việc',
                      required: false,
                    },
                  ],
                })(
                  <Select className="bg-white text-black" style={fontWeightStyle}
                  >
                    <Option key="1" value="Chi tiết mức lương">Chi tiết mức lương</Option>
                    <Option key="2" value="Bán thời gian">Thỏa thuận</Option>
                    <Option key="3" value="Từ">Từ ...</Option>
                    <Option key="4" value="Đến">Đến...</Option>
                  </Select>)}
              </Form.Item>

              <div className="font-20-bold-500 mb-4">Mô tả công việc</div>

              <Form.Item className="form-label" label="Mô tả chung về công việc" labelCol={{span: 24}}
                         style={formItemHeight} wrapperCol={{span: 24}}>
                {getFieldDecorator('jobDescription', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Vui lòng nhập mô tả chung',
                      required: true,
                    },
                  ],
                })(
                  <ReactQuill
                    style={{...fontWeightStyle, ...textEditorHeight}}
                    theme={'snow'}
                    modules={modules}
                    formats={formats}
                    bounds={'.app'}
                    placeholder="Mô tả công việc"
                  />)}
              </Form.Item>

              <Form.Item className="form-label" label="Yêu cầu công việc" labelCol={{span: 24}} style={formItemHeight}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('requirementOfJob', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Vui lòng nhập yêu cầu công việc',
                      required: true,
                    },
                  ],
                })(
                  <ReactQuill
                    style={{...fontWeightStyle, ...textEditorHeight}}
                    theme={'snow'}
                    modules={modules}
                    formats={formats}
                    bounds={'.app'}
                    placeholder="Yêu cầu công việc"
                  />)}
              </Form.Item>

              <Form.Item className="form-label" label="Quyền lợi" labelCol={{span: 24}} style={formItemHeight}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('interest', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Quyền lợi',
                      required: true,
                    },
                  ],
                })(
                  <ReactQuill
                    style={{...fontWeightStyle, ...textEditorHeight}}
                    theme={'snow'}
                    modules={modules}
                    formats={formats}
                    bounds={'.app'}
                    placeholder="Quyền lợi"
                  />)}
              </Form.Item>

            </Form>
          </div>
        </div>
      </div>
    </>

  );
}

export default connector(Form.create<IProps>()(InformationForm));
