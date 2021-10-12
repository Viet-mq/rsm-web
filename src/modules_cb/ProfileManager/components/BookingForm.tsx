import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {createBooking, getActivityLogs, getBooking, showFormBooking, updateBooking} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {getListAccount} from "../../AccountManager/redux/actions";
import {getListStatusCV} from "../../StatusCVManager/redux/actions";
import moment from "moment";
import {CreateBookingRequest, UpdateBookingRequest} from "../types";

const {Option} = Select;

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
    props.getListAccount({page: 1, size: 100});
    props.getListStatusCV({page: 1, size: 100});
  }, [])

  useEffect(() => {
    if (props.showBooking.data_booking?.id) {
      props.getBooking({idProfile: props.showBooking.data_booking?.id});
    }

  }, [props.showBooking.data_booking?.id])
  console.log("getbooking:",props.getBookingState)
  const dateFormat = 'DD/MM/YYYY HH:mm';
  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormBooking(false);
  }

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateBookingRequest = {
          id: values.id,
          idProfile: values.idProfile,
          time: values.time * 1,
          address: values.address,
          form: values.form,
          interviewer: values.interviewer,
          interviewee: values.interviewee,
          content: values.content,
          question: values.question,
          comments: values.comments,
          evaluation: values.evaluation,
          status: values.status,
          reason: values.reason,
          timeStart: values.timeStart * 1,
          timeFinish: values.timeFinish * 1,
        }
        props.updateBooking(req);
        return;
      }
    });
  }

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateBookingRequest = {
          idProfile: values.idProfile,
          time: values.time * 1,
          address: values.address,
          form: values.form,
          interviewer: values.interviewer,
          interviewee: values.interviewee,
          content: values.content,
          question: values.question,
          comments: values.comments,
          evaluation: values.evaluation,
          status: values.status,
          reason: values.reason,
          timeStart: values.timeStart * 1,
          timeFinish: values.timeFinish * 1,
        }
        props.createBooking(req);
        props.getActivityLogs({idProfile: values.idProfile});
        return;
      }
    });
  }

  return (

    <div>
      {props.getBookingState?.result !== undefined ?

        <div>
          <Modal
            zIndex={2}
            maskClosable={false}
            title="Sửa lịch phỏng vấn"
            visible={props.showBooking.show_booking}
            centered={true}
            width="550px"
            afterClose={() => {
              resetFields();
              setCompensatoryDataSource([]);
            }}
            onCancel={() => {
              resetFields();
              setCompensatoryDataSource([]);
              props.showFormBooking(false);
            }}
            footer={""}>

            <Form {...formItemLayout}>

              <Form.Item label="ID" className="mb-0" style={{...formItemStyle, display: "none"}}>
                {getFieldDecorator('id', {
                  initialValue: props.getBookingState.result?.id || '',
                  rules: [
                    {
                      message: 'Vui lòng nhập id',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="ID" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="ID Profile" className="mb-0" style={{...formItemStyle, display: "none"}}>
                {getFieldDecorator('idProfile', {
                  initialValue: props.getBookingState.result?.idProfile || '',
                  rules: [
                    {
                      message: 'Vui lòng nhập ID Profile',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="ID Profile" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Họ Tên" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('interviewee', {
                  initialValue: props.getBookingState.result?.interviewee || '',
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

              <Form.Item label="Địa chỉ phỏng vấn" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('address', {
                  initialValue: props.getBookingState.result?.address || '',
                  rules: [
                    {
                      message: 'Vui lòng nhập Địa chỉ phỏng vấn',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Địa chỉ phỏng vấn" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Nội dung phỏng vấn" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('content', {
                  initialValue: props.getBookingState.result?.content || '',
                  rules: [
                    {
                      message: 'Vui lòng nhập Nội dung phỏng vấn',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Nội dung phỏng vấn" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Hình thức" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('form', {
                  initialValue: 'Online',
                  rules: [
                    {
                      message: 'Vui lòng nhập Hình thức phỏng vấn',
                      required: true,
                    },
                  ],
                })(
                  <Select className="bg-white text-black"
                  >
                    <Option value="on">Online</Option>
                    <Option value="off">Offline</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="Người phỏng vấn" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('interviewer', {
                  initialValue: props.getBookingState.result?.interviewer||'',
                  rules: [
                    {
                      message: 'Vui lòng chọn người phỏng vấn',
                      required: true,
                    },
                  ],
                })(
                  <Select className="bg-white text-black"
                          mode="multiple"
                          placeholder="Please select"
                  >
                    {props.listAccount.rows?.map((item: any) => (
                      <Option key={item.username} value={item.username}>{item.fullName}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="Đánh giá" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('evaluation', {
                  initialValue: props.getBookingState.result?.evaluation || '',
                  rules: [
                    {
                      message: 'Vui lòng nhập Đánh giá',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Đánh giá" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Câu hỏi" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('question', {
                  initialValue: props.getBookingState.result?.question || [],
                  rules: [
                    {
                      message: 'Vui lòng nhập câu hỏi',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Đánh giá" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Nhận xét" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('comments', {
                  initialValue: props.getBookingState.result?.comments || [],
                  rules: [
                    {
                      message: 'Vui lòng nhập nhận xét',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Nhận xét" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Lý do" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('reason', {
                  initialValue: props.getBookingState.result?.reason || '',
                  rules: [
                    {
                      message: 'Vui lòng nhập Lý do',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Lý do" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Trạng thái phỏng vấn" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('status', {
                  initialValue: props.getBookingState.result?.statusId || '',
                  rules: [
                    {
                      message: 'Vui lòng chọn Trạng thái phỏng vấn',
                      required: true,
                    },
                  ],
                })(
                  <Select className="bg-white text-black"
                          placeholder="Please select"
                  >
                    {props.listStatus?.rows?.map((item: any) => (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="Thời gian phỏng vấn dự kiến" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('time', {
                  initialValue: moment(props.getBookingState.result?.time) || null,
                  rules: [
                    {
                      message: 'Vui lòng nhập Thời gian phỏng vấn dự kiến',
                      required: true,
                    },
                  ],
                })(
                  <DatePicker format={dateFormat} style={{width: "100%"}}/>
                )}
              </Form.Item>

              <Form.Item label="Thời gian bắt đầu" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('timeStart', {
                  initialValue: moment(props.getBookingState.result?.timeStart) || null,
                  rules: [
                    {
                      message: 'Vui lòng nhập Thời gian bắt đầu',
                      required: true,
                    },
                  ],
                })(
                  <DatePicker format={dateFormat} style={{width: "100%"}}>

                  </DatePicker>
                )}
              </Form.Item>

              <Form.Item label="Thời gian kết thúc" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('timeFinish', {
                  initialValue: moment(props.getBookingState.result?.timeFinish) || null,
                  rules: [
                    {
                      message: 'Vui lòng nhập Thời gian phỏng vấn dự kiến',
                      required: true,
                    },
                  ],
                })(
                  <DatePicker format={dateFormat} style={{width: "100%"}}/>
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

        </div>
        :
        <div>
          <Modal
            zIndex={2}
            maskClosable={false}
            title="Lập lịch phỏng vấn"
            visible={props.showBooking.show_booking}
            centered={true}
            width="550px"
            afterClose={() => {
              resetFields();
              setCompensatoryDataSource([]);
            }}
            onCancel={() => {
              resetFields();
              setCompensatoryDataSource([]);
              props.showFormBooking(false);
            }}
            footer={""}>

            <Form {...formItemLayout}>

              <Form.Item label="ID Profile" className="mb-0" style={{...formItemStyle, display: "none"}}>
                {getFieldDecorator('idProfile', {
                  initialValue: props.showBooking.data_booking?.id||'',
                  rules: [
                    {
                      message: 'Vui lòng nhập ID Profile',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="ID Profile" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Họ Tên" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('interviewee', {
                  initialValue: props.showBooking.data_booking?.fullName||'',
                  rules: [
                    {
                      message: 'Vui lòng nhập họ tên',
                      required: true,
                    },
                  ],
                })(
                  <Input disabled placeholder="Họ tên" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Địa chỉ phỏng vấn" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('address', {
                  initialValue: "",
                  rules: [
                    {
                      message: 'Vui lòng nhập Địa chỉ phỏng vấn',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Địa chỉ phỏng vấn" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Nội dung phỏng vấn" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('content', {
                  initialValue: "",
                  rules: [
                    {
                      message: 'Vui lòng nhập Nội dung phỏng vấn',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Nội dung phỏng vấn" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Hình thức" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('form', {
                  initialValue: 'Online',
                  rules: [
                    {
                      message: 'Vui lòng nhập hình thức',
                      required: true,
                    },
                  ],
                })(
                  <Select className="bg-white text-black"
                  >
                    <Option key='1' value="Online">Online</Option>
                    <Option key='2' value="Offline">Offline</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="Người phỏng vấn" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('interviewer', {
                  initialValue: undefined,
                  rules: [
                    {
                      message: 'Vui lòng chọn người phỏng vấn',
                      required: true,
                    },
                  ],
                })(
                  <Select className="bg-white text-black"
                          mode="multiple"
                          placeholder="Please select"
                  >
                    {props.listAccount.rows?.map((item: any,index:any) => (
                      <Option key={index} value={item.username}>{item.fullName}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="Câu hỏi" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('question', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Vui lòng nhập nhận xét',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Nhận xét" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Đánh giá" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('evaluation', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Vui lòng nhập Đánh giá',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Đánh giá" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Nhận xét" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('comments', {
                  initialValue: [''],
                  rules: [
                    {
                      message: 'Vui lòng nhập nhận xét',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Đánh giá" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Lý do" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('reason', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Vui lòng nhập Lý do',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder="Lý do" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item label="Trạng thái phỏng vấn" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('status', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Vui lòng chọn Trạng thái phỏng vấn',
                      required: true,
                    },
                  ],
                })(
                  <Select className="bg-white text-black"
                          placeholder="Please select"
                  >
                    {props.listStatus.rows?.map((item: any) => (
                      <Option key={item.id} value={item.id}>{item.name}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="Thời gian phỏng vấn dự kiến" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('time', {
                  initialValue: undefined,
                  rules: [
                    {
                      message: 'Vui lòng nhập Thời gian phỏng vấn dự kiến',
                      required: true,
                    },
                  ],
                })(
                  <DatePicker format={dateFormat} style={{width: "100%"}}/>
                )}
              </Form.Item>

              <Form.Item label="Thời gian bắt đầu" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('timeStart', {
                  initialValue: undefined,
                  rules: [
                    {
                      message: 'Vui lòng nhập Thời gian bắt đầu',
                      required: true,
                    },
                  ],
                })(
                  <DatePicker format={dateFormat} style={{width: "100%"}}>

                  </DatePicker>
                )}
              </Form.Item>

              <Form.Item label="Thời gian kết thúc" className="mb-0" style={{...formItemStyle}}>
                {getFieldDecorator('timeFinish', {
                  initialValue: undefined,
                  rules: [
                    {
                      message: 'Vui lòng nhập Thời gian phỏng vấn dự kiến',
                      required: true,
                    },
                  ],
                })(
                  <DatePicker format={dateFormat} style={{width: "100%"}}/>
                )}
              </Form.Item>

              <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
                <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
                  Tạo mới
                </Button>
                <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
                  Hủy
                </Button>
              </Form.Item>

            </Form>

          </Modal>

        </div>

      }
    </div>


  );
}

export default connector(Form.create<BookingFormProps>()(BookingForm));
