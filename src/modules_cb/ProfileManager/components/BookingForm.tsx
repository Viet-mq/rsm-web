import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {createBooking, getBooking, showFormBooking, updateBooking} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, TimePicker} from "antd";
import React, {FormEvent, useEffect} from "react";
import {getListAccount} from "../../AccountManager/redux/actions";
import {getListStatusCV} from "../../StatusCVManager/redux/actions";
import moment from "moment";
import {CreateBookingRequest, UpdateBookingRequest} from "../types";

const {Option} = Select;
const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  listStatus: state.statuscvManager.list,
  getBookingState: state.profileManager.getBooking,
  updateBooking: state.profileManager.updateBooking,
  createBooking: state.profileManager.createBooking,
  showBooking: state.profileManager.showBooking,
  listAddress: state.addressManager.list,
  listRecruitment: state.recruitmentManager.list,
})

const connector = connect(mapStateToProps,
  {
    getBooking,
    getListAccount,
    getListStatusCV,
    updateBooking,
    createBooking,
    showFormBooking,
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface BookingFormProps extends FormComponentProps, ReduxProps {
}

function BookingForm(props: BookingFormProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const interviewTime: any = moment(props.getBookingState.result?.interviewTime)
  const date: any = moment(props.getBookingState.result?.date)
  const diffTime = interviewTime.diff(date, "minutes")

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

        const date = new Date(values.date);
        const time = new Date(values.timeStart);
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        const hh = time.getHours();
        const minutes = time.getMinutes();
        const dateChanged: any = new Date(yyyy, mm - 1, dd, hh, minutes, 0);
        const interviewTime: any = new Date(yyyy, mm - 1, dd, hh, minutes + values.interviewTime, 0);
        console.log("UpdateBooking------------")
        console.log("values.interviewTime:", values.interviewTime)
        console.log("interviewTime:", interviewTime, yyyy, mm, dd, hh, minutes)
        console.log("start:", dateChanged, "end:", interviewTime)
        console.log("-------------------------")
        let req: UpdateBookingRequest = {
          id: props.getBookingState.result?.id,
          floor: values.room,
          interviewAddress: values.interviewAddress,
          interviewTime: interviewTime * 1,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          type: values.type,
          date: dateChanged * 1,

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
        const date = new Date(values.date);
        const time = new Date(values.timeStart);
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        const hh = time.getHours();
        const minutes = time.getMinutes();
        const dateChanged: any = new Date(yyyy, mm - 1, dd, hh, minutes, 0);
        const interviewTime: any = new Date(yyyy, mm - 1, dd, hh, minutes + values.interviewTime, 0);
        console.log("CreateBooking------------")
        console.log("values.interviewTime:", values.interviewTime)
        console.log("interviewTime:", interviewTime, yyyy, mm, dd, hh, minutes)
        console.log("start:", dateChanged, "end:", interviewTime)
        console.log("-------------------------")
        let req: CreateBookingRequest = {
          idProfile: props.showBooking.data_booking?.id,
          date: dateChanged * 1,
          avatarColor: setColor(),
          floor: values.room,
          interviewAddress: values.interviewAddress,
          interviewTime: interviewTime * 1,
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
                  <div className="main-1__candidate-name"
                       style={{color: "#666"}}> {props.showBooking.data_booking?.fullName}</div>
                  {props.getBookingState.result?.recruitmentName ? <>
                    <div className="main-1__green-dot"></div>
                    <div className="main-1__job-description">{props.getBookingState.result?.recruitmentName}</div>
                  </> : null}

                </div>
              </div>
              <div className="c-schedule-interview-popup" style={{overflowX: "hidden"}}>
                <div className='ant-col-14 grid-left'>
                  <Form>
                    <Form.Item className="form-label" label="Tin tuyển dụng" labelCol={{span: 24}}
                               wrapperCol={{span: 24}}>
                      {getFieldDecorator('recruitmentId', {
                        initialValue: props.getBookingState.result?.recruitmentId || '',
                        rules: [
                          {
                            message: 'Vui lòng chọn tin tuyển dụng',
                            required: false,
                          },
                        ],
                      })(
                        <Select disabled className="bg-white text-black" style={fontWeightStyle}
                                placeholder="Chọn tin tuyển dụng"
                        >
                          {props.listRecruitment.rows?.map((item: any, index: any) => (
                            <Option key={index} value={item.id}>{item.title}</Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>

                    <div className="flex-space-between">
                      <div className="mr-2">
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
                            <DatePicker format={dateFormat} style={{width: "100%"}}/>
                          )}

                        </Form.Item>
                      </div>
                      <div className="mr-2">
                        <Form.Item className="form-label" label="Giờ bắt đầu" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('timeStart', {
                            initialValue: moment(props.getBookingState.result?.date),
                            rules: [
                              {
                                message: 'Vui lòng chọn giờ bắt đầu',
                                required: true,
                              },
                            ],
                          })(
                            <TimePicker format={timeFormat} minuteStep={30} style={{width: "100%"}}
                            />)}

                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item className="form-label" label="Thời lượng(phút)" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('interviewTime', {
                            initialValue: diffTime || 15,
                            rules: [
                              {
                                message: 'Vui lòng nhập thời lượng',
                                required: true,
                              },
                            ],
                          })(
                            <InputNumber style={{width: "100%"}} type="number" min={15}
                                         className="bg-white text-black"/>
                          )}
                        </Form.Item>
                      </div>
                    </div>

                    <Row style={{marginTop: 15}}>
                      <Col span={14} style={{paddingRight: 10}}>
                        <Form.Item className="form-label" label="Địa điểm" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('interviewAddress', {
                            initialValue: props.getBookingState.result?.interviewAddressId,
                            rules: [
                              {
                                message: 'Vui lòng nhập địa điểm',
                                required: true,
                              },
                            ],
                          })(
                            <Select className="bg-white text-black" style={fontWeightStyle} placeholder="Nhập địa chỉ"
                            >
                              {props.listAddress.rows?.map((item: any, index: any) => (
                                <Option key={index} value={item.id}>{item.officeName} - {item.name}</Option>
                              ))}
                            </Select>
                          )}
                        </Form.Item>

                      </Col>
                      <Col span={10}>
                        <Form.Item className="form-label" label="Phòng" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                          {getFieldDecorator('floor', {
                            initialValue: props.getBookingState.result?.floor || '',
                            rules: [
                              {
                                message: 'Vui lòng nhập phòng',
                                required: false,
                              },
                            ],
                          })(
                            <Input placeholder="Nhập tên phòng" className="bg-white text-black"/>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Hội đồng tuyển dụng" className="form-label" labelCol={{span: 24}}
                               wrapperCol={{span: 24}}>
                      {getFieldDecorator('interviewers', {
                        initialValue: props.getBookingState.result?.interviewers?.map((item: any) => item.username) || undefined,
                        rules: [
                          {
                            message: 'Vui lòng chọn Hội đồng tuyển dụng',
                            required: true,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black" style={fontWeightStyle}
                                mode="multiple"
                                placeholder="Chọn thành viên"
                        >
                          {props.listAccount.rows?.map((item: any, index: any) => (
                            <Option key={index} value={item.username}>{item.fullName}</Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>

                    <Form.Item className="form-label" label="Loại lịch" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                      {getFieldDecorator('type', {
                        initialValue: props.getBookingState.result?.type || "Phỏng vấn trực tiếp",
                        rules: [
                          {
                            message: 'Vui lòng chọn hình thức phỏng vấn',
                            required: true,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black" style={fontWeightStyle}
                        >
                          <Option key="1" value="Phỏng vấn trực tiếp">Phỏng vấn trực tiếp</Option>
                          <Option key="2" value="Phỏng vấn online">Phỏng vấn online</Option>
                          {/*<Option key="2" value="Thi tuyển">Thi tuyển</Option>*/}
                          {/*<Option key="3" value="Phỏng vấn online ngoài ứng dụng">Phỏng vấn online ngoài ứng*/}
                          {/*  dụng</Option>*/}
                          {/*<Option key="4" value="Thi tuyển online">Thi tuyển online</Option>*/}

                        </Select>
                      )}
                    </Form.Item>

                    <Form.Item className="form-label" label="Ghi chép nội bộ" labelCol={{span: 24}}
                               wrapperCol={{span: 24}}>
                      {getFieldDecorator('note', {
                        initialValue: props.getBookingState.result?.note || "",
                        rules: [
                          {
                            message: 'Vui lòng nhập lưu ý cho ứng viên',
                            required: false,
                          },
                        ],
                      })(
                        <TextArea placeholder="Nhập nội dung" style={{height: 100}} className="bg-white text-black"/>
                      )}
                    </Form.Item>

                    <Checkbox defaultChecked={true}>Email thông báo cho ứng viên</Checkbox>
                    <Checkbox defaultChecked={true}>Email thông báo cho hội đồng</Checkbox>

                  </Form>
                </div>
              </div>
              <div className="footer-right">
                <Button onClick={onBtnCancelClicked} type={"link"}
                        style={{color: "black", marginRight: 15}}>Hủy</Button>
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
                  <div className="main-1__candidate-name"
                       style={{color: "#666"}}>{props.showBooking.data_booking?.fullName}</div>
                  {/*<div className="main-1__green-dot"></div>*/}
                  {/*<div className="main-1__job-description">Business Analysis</div>*/}
                </div>
              </div>
              <div className="c-schedule-interview-popup" style={{overflowX: "hidden"}}>
                <div className='ant-col-14 grid-left'>
                  <Form>

                    <Form.Item className="form-label" label="Tin tuyển dụng" labelCol={{span: 24}}
                               wrapperCol={{span: 24}}>
                      {getFieldDecorator('recruitmentId', {
                        initialValue: undefined,
                        rules: [
                          {
                            message: 'Vui lòng chọn tin tuyển dụng',
                            required: false,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black" style={fontWeightStyle}
                                placeholder="Chọn tin tuyển dụng"
                        >
                          {props.listRecruitment.rows?.map((item: any, index: any) => (
                            <Option key={index} value={item.id}>{item.title}</Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>

                    <div className="flex-space-between">
                      <div className="mr-2">
                        <Form.Item className="form-label" label="Ngày" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                          {getFieldDecorator('date', {
                            initialValue: moment().add(1, 'days'),
                            rules: [
                              {
                                message: 'Vui lòng chọn ngày bắt đầu',
                                required: true,
                              },
                            ],
                          })(
                            <DatePicker format={dateFormat} style={{width: "100%"}}/>
                          )}

                        </Form.Item>
                      </div>
                      <div className="mr-2">
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
                            <TimePicker format={timeFormat} minuteStep={30} style={{width: "100%"}}
                            />)}

                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item className="form-label" label="Thời lượng(phút)" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('interviewTime', {
                            initialValue: 15,
                            rules: [
                              {
                                message: 'Vui lòng nhập thời lượng',
                                required: true,
                              },
                            ],
                          })(
                            <InputNumber style={{width: "100%"}} type="number" min={15}
                                         className="bg-white text-black"/>
                          )}
                        </Form.Item>
                      </div>
                    </div>

                    <Row style={{marginTop: 15}}>
                      <Col span={14} style={{paddingRight: 10}}>
                        <Form.Item className="form-label" label="Địa điểm" labelCol={{span: 24}}
                                   wrapperCol={{span: 24}}>
                          {getFieldDecorator('interviewAddress', {
                            initialValue: props.listAddress.rows[0]?.id,
                            rules: [
                              {
                                message: 'Vui lòng nhập địa điểm',
                                required: true,
                              },
                            ],
                          })(
                            <Select className="bg-white text-black" style={fontWeightStyle} placeholder="Nhập địa chỉ"
                            >
                              {props.listAddress.rows?.map((item: any, index: any) => (
                                <Option key={index} value={item.id}>{item.officeName} - {item.name}</Option>
                              ))}
                            </Select>
                          )}
                        </Form.Item>

                      </Col>
                      <Col span={10}>
                        <Form.Item className="form-label" label="Phòng" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                          {getFieldDecorator('floor', {
                            initialValue: '',
                            rules: [
                              {
                                message: 'Vui lòng nhập phòng',
                                required: false,
                              },
                            ],
                          })(
                            <Input placeholder="Nhập tên phòng" className="bg-white text-black"/>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Hội đồng tuyển dụng" className="form-label" labelCol={{span: 24}}
                               wrapperCol={{span: 24}}>
                      {getFieldDecorator('interviewers', {
                        initialValue: undefined,
                        rules: [
                          {
                            message: 'Vui lòng chọn Hội đồng tuyển dụng',
                            required: true,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black" style={fontWeightStyle}
                                mode="multiple"
                                placeholder="Chọn thành viên"
                        >
                          {props.listAccount.rows?.map((item: any, index: any) => (
                            <Option key={index} value={item.username}>{item.fullName}</Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>

                    <Form.Item className="form-label" label="Loại lịch" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                      {getFieldDecorator('type', {
                        initialValue: 'Phỏng vấn trực tiếp',
                        rules: [
                          {
                            message: 'Vui lòng chọn hình thức phỏng vấn',
                            required: true,
                          },
                        ],
                      })(
                        <Select className="bg-white text-black" style={fontWeightStyle}
                        >
                          <Option key="1" value="Phỏng vấn trực tiếp">Phỏng vấn trực tiếp</Option>
                          <Option key="2" value="Phỏng vấn online">Phỏng vấn online</Option>
                          {/*<Option key="2" value="Thi tuyển">Thi tuyển</Option>*/}
                          {/*<Option key="3" value="Phỏng vấn online ngoài ứng dụng">Phỏng vấn online ngoài ứng*/}
                          {/*  dụng</Option>*/}
                          {/*<Option key="4" value="Thi tuyển online">Thi tuyển online</Option>*/}

                        </Select>
                      )}
                    </Form.Item>

                    <Form.Item className="form-label" label="Ghi chép nội bộ" labelCol={{span: 24}}
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
                        <TextArea placeholder="Nhập nội dung" style={{height: 100}} className="bg-white text-black"/>
                      )}
                    </Form.Item>

                    <Checkbox defaultChecked={true}>Email thông báo cho ứng viên</Checkbox>
                    <Checkbox defaultChecked={true}>Email thông báo cho hội đồng</Checkbox>

                  </Form>
                </div>
              </div>
              <div className="footer-right">
                <Button onClick={onBtnCancelClicked} type={"link"}
                        style={{color: "black", marginRight: 15}}>Hủy</Button>
                <Button type={"primary"} onClick={onBtnCreateClicked}>Tạo mới</Button>
              </div>

            </Modal>
          </div>

        </div>
      }
    </div>


  );
}

export default connector(Form.create<BookingFormProps>()(BookingForm));
