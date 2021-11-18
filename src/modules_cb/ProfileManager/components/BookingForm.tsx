import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {createBooking, getActivityLogs, getBooking, showFormBooking, updateBooking} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import React, {FormEvent, useEffect} from "react";
import {getListAccount} from "../../AccountManager/redux/actions";
import {getListStatusCV} from "../../StatusCVManager/redux/actions";
import moment from "moment";
import {CreateBookingRequest, UpdateBookingRequest} from "../types";
import DateBox from "devextreme-react/date-box";

const {Option} = Select;
const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  listStatus: state.statuscvManager.list,
  getBookingState: state.profileManager.getBooking,
  updateBooking: state.profileManager.updateBooking,
  createBooking: state.profileManager.createBooking,
  showBooking: state.profileManager.showBooking,
})

const connector = connect(mapStateToProps,
  {
    getBooking,
    getListAccount,
    getListStatusCV,
    updateBooking,
    createBooking,
    showFormBooking,
    getActivityLogs
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface BookingFormProps extends FormComponentProps, ReduxProps {
}

function BookingForm(props: BookingFormProps) {
  const {getFieldDecorator, resetFields} = props.form;
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
    if (props.showBooking.show_booking) {
      props.getListAccount({page: 1, size: 100});
      props.getListStatusCV({page: 1, size: 100});
    }
  }, [props.showBooking.show_booking])

  useEffect(() => {
    if (props.showBooking.data_booking?.id) {
      props.getBooking({idProfile: props.showBooking.data_booking?.id});
    }

  }, [props.showBooking.data_booking?.id])
  const dateFormat = 'DD/MM/YYYY HH:mm';

  function onBtnCancelClicked() {
    resetFields();
    props.showFormBooking(false);
  }

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateBookingRequest = {
          id: props.getBookingState.result?.id,
          floor: values.floor,
          interviewAddress: values.interviewAddress,
          interviewTime: values.interviewTime,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          type: values.type,
          date: values.date,

          // id: props.getBookingState.result?.id,
          // idProfile: props.getBookingState.result?.idProfile,
          // time: values.time * 1,
          // address: values.address,
          // form: values.form,
          // interviewer: values.interviewer,
          // interviewee: values.interviewee,
          // content: values.content,
          // question: values.question,
          // comments: values.comments,
          // evaluation: values.evaluation,
          // status: values.status,
          // reason: values.reason,
          // timeStart: values.timeStart * 1,
          // timeFinish: values.timeFinish * 1,
        }
        props.updateBooking(req);
        return;
      }
    });
  }

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
        let req: CreateBookingRequest = {
          idProfile: props.showBooking.data_booking?.id,
          date: values.date,
          avatarColor: setColor(),
          floor: values.floor,
          interviewAddress: values.interviewAddress,
          interviewTime: values.interviewTime*1,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          type: values.type,

          // time: values.time * 1,
          // avatarColor:setColor(),
          // address: values.address,
          // form: values.form,
          // interviewer: values.interviewer,
          // interviewee: values.interviewee,
          // content: values.content,
          // question: values.question,
          // comments: values.comments,
          // evaluation: values.evaluation,
          // status: values.status,
          // reason: values.reason,
          // timeStart: values.timeStart * 1,
          // timeFinish: values.timeFinish * 1,
        }
        props.createBooking(req);
        // props.getActivityLogs({idProfile: props.showBooking.data_booking?.id});
        return;
      }
    });
  }

  return (

    <div>
      {props.getBookingState?.result !== undefined ?
        <div>
          <div>
            <Modal
              zIndex={2}
              maskClosable={false}
              visible={props.showBooking.show_booking}
              centered={true}
              width="580px"
              className="custom"
              afterClose={() => {
                resetFields();
              }}
              onCancel={() => {
                resetFields();
                props.showFormBooking(false);
              }}
              footer={""}>
              <div style={{padding: "24px 24px 20px 24px"}}>
                <div className="schedule-detail-title">Sửa lịch</div>
                <div className="main-1">
                  <div className="main-1__candidate-name" style={{color: "#666"}}> {props.showBooking.data_booking?.fullName}</div>
                  <div className="main-1__green-dot"></div>
                  <div className="main-1__job-description">Business Analysis</div>
                </div>
              </div>
              <div className="c-schedule-interview-popup" style={{overflowX: "hidden"}}>
                <div className='ant-col-14 grid-left'>
                  <Form>
                    <Form.Item className="form-label" label="Tin tuyển dụng" labelCol={{span: 24}}
                               wrapperCol={{span: 24}}>
                      {getFieldDecorator('recruitmentId', {
                        initialValue:props.getBookingState.result?.recruitmentId ||'',
                        rules: [
                          {
                            message: 'Vui lòng chọn tin tuyển dụng',
                            required: true,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black"
                        >
                          <Option value="on">Business Analysis</Option>
                          <Option value="off">iOS / Android Developer</Option>
                        </Select>
                      )}
                    </Form.Item>

                    <Row>
                      <Col span={8} style={{marginRight: 10}}>
                        <Form.Item className="form-label" label="Ngày" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                          {getFieldDecorator('date', {
                            initialValue: moment(props.getBookingState.result?.date) || null,
                            rules: [
                              {
                                message: 'Vui lòng chọn ngày bắt đầu',
                                required: true,
                              },
                            ],
                          })(
                            <DateBox displayFormat="dd/MM/yyyy"
                                     type="date"/>
                          )}

                        </Form.Item>
                      </Col>
                      <Col span={6} style={{marginRight: 10}}>
                        <Form.Item className="form-label" label="Giờ bắt đầu" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('timeStart', {
                            initialValue: moment(),
                            rules: [
                              {
                                message: 'Vui lòng chọn giờ bắt đầu',
                                required: true,
                              },
                            ],
                          })(
                            <DateBox type="time"/>)}

                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item className="form-label" label="Thời lượng(phút)" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('interviewTime', {
                            initialValue: moment(props.getBookingState.result?.interviewTime) || null,
                            rules: [
                              {
                                message: 'Vui lòng nhập thời lượng',
                                required: true,
                              },
                            ],
                          })(
                            <InputNumber type="number" min={15} className="bg-white text-black"/>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row style={{marginTop: 15}}>
                      <Col span={14} style={{paddingRight: 10}}>
                        <Form.Item className="form-label" label="Địa điểm" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('interviewAddress', {
                            initialValue:props.getBookingState.result?.interviewAddress || '',
                            rules: [
                              {
                                message: 'Vui lòng nhập địa điểm',
                                required: true,
                              },
                            ],
                          })(
                            <Input placeholder="Địa điểm" className="bg-white text-black"/>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item className="form-label" label="Phòng" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('floor ', {
                            initialValue: props.getBookingState.result?.floor || '',
                            rules: [
                              {
                                message: 'Vui lòng nhập phòng',
                                required: false,
                              },
                            ],
                          })(
                            <Input placeholder="Phòng" className="bg-white text-black"/>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Hội đồng tuyển dụng" className="mb-0" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                      {getFieldDecorator('interviewers', {
                        initialValue: props.getBookingState.result?.interviewers || '',
                        rules: [
                          {
                            message: 'Vui lòng chọn Hội đồng tuyển dụng',
                            required: true,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black"
                                mode="multiple"
                                placeholder="Hội đồng tuyển dụng"
                        >
                          {props.listAccount.rows?.map((item: any, index: any) => (
                            <Option key={index} value={item.username}>{item.fullName}</Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>

                    <Form.Item className="form-label" label="Hình thức" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                      {getFieldDecorator('type', {
                        initialValue: props.getBookingState.result?.type || "Phỏng vấn trực tiếp",
                        rules: [
                          {
                            message: 'Vui lòng chọn hình thức phỏng vấn',
                            required: false,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black"
                        >
                          <Option key="1" value="Phỏng vấn trực tiếp">Phỏng vấn trực tiếp</Option>
                          <Option key="2" value="Thi tuyển">Thi tuyển</Option>
                          <Option key="3" value="Phỏng vấn online ngoài ứng dụng">Phỏng vấn online ngoài ứng
                            dụng</Option>
                          <Option key="4" value="Thi tuyển online">Thi tuyển online</Option>

                        </Select>
                      )}
                    </Form.Item>

                    <Form.Item className="form-label" label="Lưu ý cho ứng viên" labelCol={{span: 24}}
                               wrapperCol={{span: 24}}>
                      {getFieldDecorator('note', {
                        initialValue: props.getBookingState.result?.note || "",
                        rules: [
                          {
                            message: 'Vui lòng chọn mẫu đánh giá',
                            required: false,
                          },
                        ],
                      })(
                        <TextArea placeholder="Nhập lưu ý" style={{height: 100}} className="bg-white text-black"/>
                      )}
                    </Form.Item>

                    <Checkbox defaultChecked={true}>Email thông báo cho ứng viên</Checkbox>
                    <Checkbox defaultChecked={true}>Email thông báo cho hội đồng</Checkbox>

                  </Form>
                </div>
              </div>
              <div className="footer-right">
                <Button onClick={onBtnCancelClicked} type={"link"} style={{color: "black", marginRight: 15}}>Hủy</Button>
                <Button onClick={onBtnUpdateClicked} type={"primary"}>Cập nhật</Button>
              </div>

            </Modal>
          </div>

        </div>

        :
        <div>
          <div>
            <Modal
              zIndex={2}
              maskClosable={false}

              visible={props.showBooking.show_booking}
              centered={true}
              width="580px"
              className="custom"
              afterClose={() => {
                resetFields();
              }}
              onCancel={() => {
                resetFields();
                props.showFormBooking(false);
              }}
              footer={""}>
              <div style={{padding: "24px 24px 20px 24px"}}>
                <div className="schedule-detail-title">Đặt lịch</div>
                <div className="main-1">
                  <div className="main-1__candidate-name" style={{color: "#666"}}>{props.showBooking.data_booking?.fullName}</div>
                  <div className="main-1__green-dot"></div>
                  <div className="main-1__job-description">Business Analysis</div>
                </div>
              </div>
              <div className="c-schedule-interview-popup" style={{overflowX: "hidden"}}>
                <div className='ant-col-14 grid-left'>
                  <Form>
                    <Form.Item className="form-label" label="Tin tuyển dụng" labelCol={{span: 24}}
                               wrapperCol={{span: 24}}>
                      {getFieldDecorator('recruitmentId', {
                        initialValue: '',
                        rules: [
                          {
                            message: 'Vui lòng chọn tin tuyển dụng',
                            required: true,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black"
                        >
                          <Option value="Business Analysis">Business Analysis</Option>
                          <Option value="iOS / Android Developer">iOS / Android Developer</Option>
                        </Select>
                      )}
                    </Form.Item>

                    <Row>
                      <Col span={8} style={{marginRight: 10}}>
                        <Form.Item className="form-label" label="Ngày" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                          {getFieldDecorator('date', {
                            initialValue: moment(),
                            rules: [
                              {
                                message: 'Vui lòng chọn ngày bắt đầu',
                                required: true,
                              },
                            ],
                          })(
                            <DateBox displayFormat="dd/MM/yyyy"
                                     type="date"/>
                          )}

                        </Form.Item>
                      </Col>
                      <Col span={6} style={{marginRight: 10}}>
                        <Form.Item className="form-label" label="Giờ bắt đầu" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('timeStart', {
                            initialValue: moment(),
                            rules: [
                              {
                                message: 'Vui lòng chọn giờ bắt đầu',
                                required: true,
                              },
                            ],
                          })(
                            <DateBox type="time"/>)}

                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item className="form-label" label="Thời lượng(phút)" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('time', {
                            initialValue: '15',
                            rules: [
                              {
                                message: 'Vui lòng nhập thời lượng',
                                required: true,
                              },
                            ],
                          })(
                            <InputNumber type="number" min={15} className="bg-white text-black"/>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row style={{marginTop: 15}}>
                      <Col span={14} style={{paddingRight: 10}}>
                        <Form.Item className="form-label" label="Địa điểm" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('interviewAddress', {
                            initialValue: '',
                            rules: [
                              {
                                message: 'Vui lòng nhập địa điểm',
                                required: true,
                              },
                            ],
                          })(
                            <Input placeholder="Địa điểm" className="bg-white text-black"/>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item className="form-label" label="Phòng" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('floor ', {
                            initialValue: '',
                            rules: [
                              {
                                message: 'Vui lòng nhập phòng',
                                required: false,
                              },
                            ],
                          })(
                            <Input placeholder="Phòng" className="bg-white text-black"/>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Hội đồng tuyển dụng" className="mb-0" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                      {getFieldDecorator('interviewers', {
                        initialValue: undefined,
                        rules: [
                          {
                            message: 'Vui lòng chọn Hội đồng tuyển dụng',
                            required: true,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black"
                                mode="multiple"
                                placeholder="Hội đồng tuyển dụng"
                        >
                          {props.listAccount.rows?.map((item: any, index: any) => (
                            <Option key={index} value={item.username}>{item.fullName}</Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>

                    <Form.Item className="form-label" label="Hình thức" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                      {getFieldDecorator('type', {
                        initialValue: '',
                        rules: [
                          {
                            message: 'Vui lòng chọn hình thức phỏng vấn',
                            required: false,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black"
                        >
                          <Option key="1" value="Phỏng vấn trực tiếp">Phỏng vấn trực tiếp</Option>
                          <Option key="2" value="Thi tuyển">Thi tuyển</Option>
                          <Option key="3" value="Phỏng vấn online ngoài ứng dụng">Phỏng vấn online ngoài ứng
                            dụng</Option>
                          <Option key="4" value="Thi tuyển online">Thi tuyển online</Option>

                        </Select>
                      )}
                    </Form.Item>

                    <Form.Item className="form-label" label="Lưu ý cho ứng viên" labelCol={{span: 24}}
                               wrapperCol={{span: 24}}>
                      {getFieldDecorator('note', {
                        initialValue: '',
                        rules: [
                          {
                            message: 'Vui lòng nhập lưu ý cho ứng viên',
                            required: false,
                          },
                        ],
                      })(
                        <TextArea placeholder="Nhập lưu ý" style={{height: 100}} className="bg-white text-black"/>
                      )}
                    </Form.Item>

                    <Checkbox defaultChecked={true}>Email thông báo cho ứng viên</Checkbox>
                    <Checkbox defaultChecked={true}>Email thông báo cho hội đồng</Checkbox>

                  </Form>
                </div>
              </div>
              <div className="footer-right">
                <Button onClick={onBtnCancelClicked} type={"link"} style={{color: "black", marginRight: 15}}>Hủy</Button>
                <Button type={"primary"}  onClick={onBtnCreateClicked}>Tạo mới</Button>
              </div>

            </Modal>
          </div>

        </div>
      }
    </div>


  );
}

export default connector(Form.create<BookingFormProps>()(BookingForm));
