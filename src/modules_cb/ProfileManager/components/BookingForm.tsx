import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {
  createBooking,
  getBooking,
  showEmailCreateForm,
  showEmailUpdateForm,
  showFormBooking,
  updateBooking
} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Modal, Radio, Row, Select, TimePicker} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {getListAccount} from "../../AccountManager/redux/actions";
import {getListStatusCV} from "../../StatusCVManager/redux/actions";
import moment from "moment";
import {CreateBookingForm, CreateBookingRequest, UpdateBookingForm, UpdateBookingRequest} from "../types";
import CreateEmailForm from "./CreateEmailForm";
import {plainOptions} from "../../../helpers/utilsFunc";

const {Option} = Select;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  listStatus: state.statuscvManager.list,
  profileManager: state.profileManager,
  listAddress: state.addressManager.list,
  listRecruitment: state.recruitmentManager.list,

})

const connector = connect(mapStateToProps,
  {
    getBooking,
    getListAccount,
    getListStatusCV,
    showFormBooking,
    showEmailCreateForm,
    showEmailUpdateForm,
    createBooking,
    updateBooking

  });
type ReduxProps = ConnectedProps<typeof connector>;

interface BookingFormProps extends FormComponentProps, ReduxProps {
}

function BookingForm(props: BookingFormProps) {
  const {getBooking, showBooking} = props.profileManager
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const interviewTime: any = moment(getBooking.result?.interviewTime)
  const date: any = moment(getBooking.result?.date)
  const diffTime = interviewTime.diff(date, "minutes")
  const [reqCreate, setReqCreate] = useState<CreateBookingRequest | any>()
  const [reqUpdate, setReqUpdate] = useState<UpdateBookingRequest | any>()
  const [checked, setChecked] = useState<any>({
    candidate: {
      checkedList: 'no',
    },
    members: {
      checkedList: 'no',
    },
    interviewers: {
      checkedList: [],
      indeterminate: false,
      checkAll: false
    },
    presenter: {
      checkedList: 'no',
    }
  })

  useEffect(() => {
    if (showBooking.show_booking) {
      props.getListAccount({page: 1, size: 100});
      props.getListStatusCV({page: 1, size: 100});
    }
  }, [showBooking.show_booking])

  function onBtnCancelClicked() {
    resetFields();
    props.showFormBooking(false);
  }

  const setColor = () => {
    const randomColor: string = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  function onBtnContinueUpdateClicked(e: FormEvent) {
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

        let req: UpdateBookingForm = {
          id: showBooking.data_update_booking?.id,
          floor: values.room,
          interviewAddress: values.interviewAddress,
          interviewTime: interviewTime * 1,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          type: values.type,
          date: dateChanged * 1,
        }
        setReqUpdate(req)
        props.showEmailCreateForm(true)
        return;
      }
    });
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

        let req: UpdateBookingForm = {
          id: showBooking.data_update_booking?.id,
          floor: values.room,
          interviewAddress: values.interviewAddress,
          interviewTime: interviewTime * 1,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          type: values.type,
          date: dateChanged * 1,
        }

        let reqUpdateBooking: UpdateBookingRequest = {
          updateBookingForm: req,

        }
        props.updateBooking(reqUpdateBooking)
        return;
      }
    });
  }

  function onBtnContinueCreateClicked(e: FormEvent) {
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

        let req: CreateBookingForm = {
          idProfile: showBooking.data_update_booking?.id,
          date: dateChanged * 1,
          avatarColor: showBooking.data_update_booking.avatarColor,
          floor: values.room,
          interviewAddress: values.interviewAddress,
          interviewTime: interviewTime * 1,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          type: values.type,
        }
        setReqCreate({...req})
        props.showEmailCreateForm(true)
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
        const date = new Date(values.date);
        const time = new Date(values.timeStart);
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        const hh = time.getHours();
        const minutes = time.getMinutes();
        const dateChanged: any = new Date(yyyy, mm - 1, dd, hh, minutes, 0);
        const interviewTime: any = new Date(yyyy, mm - 1, dd, hh, minutes + values.interviewTime, 0);

        let req: CreateBookingForm = {
          idProfile: showBooking.data_update_booking?.id,
          date: dateChanged * 1,
          avatarColor: showBooking.data_update_booking.avatarColor,
          floor: values.room,
          interviewAddress: values.interviewAddress,
          interviewTime: interviewTime * 1,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          type: values.type,
        }

        let reqBookingRequest: CreateBookingRequest = {
          createBookingForm: req,
        }
        props.createBooking(reqBookingRequest)

        return;
      }
    });
  }

  function onCheckInterviewersChange(checkedList: any) {
    setChecked({
        ...checked,
        interviewers: {
          checkedList: checkedList,
          indeterminate: !!checkedList.length && checkedList.length < plainOptions.interviewers.length,
          checkAll: checkedList.length === plainOptions.interviewers.length,
        }
      }
    );
  };

  function onCheckPresenterChange(event: any) {
    setChecked({
        ...checked,
        presenter: {
          checkedList: event.target.value,
        }
      }
    );
  };

  function onCheckMembersChange(event: any) {
    setChecked({
        ...checked,
        members: {
          checkedList: event.target.value,
        }
      }
    );
  };

  function onCheckCandidateChange(event: any) {
    setChecked({
        ...checked,
        candidate: {
          checkedList: event.target.value,
        }
      }
    );
  };

  function onCheckAllInterviewersChange(e: any) {
    setChecked({
      ...checked,
      interviewers: {
        checkedList: e.target.checked ? plainOptions.interviewers.map((item: any) => item.id) : [],
        indeterminate: false,
        checkAll: e.target.checked,
      }
    });
  };

  return (
    <>
      <div>
        {showBooking.is_update ?
          <div>
            <div>
              <Modal
                zIndex={10}
                maskClosable={false}
                visible={showBooking.show_booking}
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
                         style={{color: "#666"}}> {showBooking.data_update_booking?.fullName}</div>
                    {getBooking.result?.recruitmentName ? <>
                      <div className="main-1__green-dot"/>
                      <div className="main-1__job-description">{getBooking.result?.recruitmentName}</div>
                    </> : null}

                  </div>
                </div>
                <div className="c-schedule-interview-popup" style={{overflow: "overlay", width: 580}}>
                  <div className='ant-col-14 grid-left' style={{width: 580}}>
                    <Form>
                      <Form.Item className="form-label" label="Tin tuyển dụng" labelCol={{span: 24}}
                                 wrapperCol={{span: 24}}>
                        {getFieldDecorator('recruitmentId', {
                          initialValue: showBooking.data_update_booking?.recruitmentId || undefined,
                          rules: [
                            {
                              message: 'Vui lòng chọn tin tuyển dụng',
                              required: false,
                            },
                          ],
                        })(
                          <Select getPopupContainer={(trigger: any) => trigger.parentNode} disabled
                                  className="bg-white text-black" style={fontWeightStyle}
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
                              initialValue: moment(showBooking.data_update_booking?.date) || null,
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
                              initialValue: moment(showBooking.data_update_booking?.date),
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
                              initialValue: showBooking.data_update_booking?.interviewAddressId,
                              rules: [
                                {
                                  message: 'Vui lòng nhập địa điểm',
                                  required: true,
                                },
                              ],
                            })(
                              <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                                      className="bg-white text-black" style={fontWeightStyle} placeholder="Nhập địa chỉ"
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
                              initialValue: showBooking.data_update_booking?.floor || '',
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
                      {checked.interviewers.checkedList.length === 0 &&
                      <Form.Item label="Hội đồng tuyển dụng" className="form-label" labelCol={{span: 24}}
                                 wrapperCol={{span: 24}}>
                        {getFieldDecorator('interviewers', {
                          initialValue: showBooking.data_update_booking?.interviewers?.map((item: any) => item.username) || undefined,
                          rules: [
                            {
                              message: 'Vui lòng chọn Hội đồng tuyển dụng',
                              required: true,
                            },
                          ],
                        })(
                          <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                                  className="bg-white text-black" style={fontWeightStyle}
                                  mode="multiple"
                                  placeholder="Chọn thành viên"
                          >
                            {props.listAccount.rows?.map((item: any, index: any) => (
                              <Option key={index} value={item.username}>{item.fullName}</Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>}


                      <Form.Item className="form-label" label="Loại lịch" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                        {getFieldDecorator('type', {
                          initialValue: showBooking.data_update_booking?.type || "Phỏng vấn trực tiếp",
                          rules: [
                            {
                              message: 'Vui lòng chọn hình thức phỏng vấn',
                              required: true,
                            },
                          ],
                        })(
                          <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                                  className="bg-white text-black" style={fontWeightStyle}
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
                          initialValue: showBooking.data_update_booking?.note || "",
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

                      <div style={{fontWeight: 500}}>Gửi mail cho hội đồng tuyển dụng</div>
                      <div style={{display: "flex"}}>
                        <div>
                          <Checkbox
                            indeterminate={checked.interviewers.indeterminate}
                            onChange={onCheckAllInterviewersChange}
                            checked={checked.interviewers.checkAll}
                          >
                            Tất cả
                          </Checkbox>
                        </div>
                        <CheckboxGroup
                          value={checked.interviewers.checkedList}
                          onChange={onCheckInterviewersChange}
                        >
                          {plainOptions.interviewers.map((item: any, index: any) =>
                            <Checkbox key={item.id} value={item.id}>{item.name}</Checkbox>
                          )}
                        </CheckboxGroup>
                      </div>
                      <br/>

                      <div style={{fontWeight: 500}}>Gửi mail cho người giới thiệu</div>
                      <div>
                        <Radio.Group
                          value={checked.presenter.checkedList}
                          onChange={onCheckPresenterChange}
                        >
                          {plainOptions.members.map((item: any, index: any) =>
                            <Radio key={item.id} value={item.id}>{item.name}</Radio>
                          )}
                        </Radio.Group>
                      </div>
                      <br/>

                      <div style={{fontWeight: 500}}>Gửi mail cho ứng viên</div>
                      <div><Radio.Group
                        value={checked.candidate.checkedList}
                        onChange={onCheckCandidateChange}
                      >
                        {plainOptions.candidate.map((item: any, index: any) =>
                          <Radio key={item.id} value={item.id}>{item.name}</Radio>
                        )}
                      </Radio.Group>
                      </div>
                      <br/>

                      <div style={{fontWeight: 500}}>Gửi mail cho cán bộ liên quan</div>
                      <div>
                        <Radio.Group
                          value={checked.members.checkedList}
                          onChange={onCheckMembersChange}
                        >
                          {plainOptions.members.map((item: any, index: any) =>
                            <Radio key={item.id} value={item.id}>{item.name}</Radio>
                          )}
                        </Radio.Group>
                      </div>
                      <br/>

                    </Form>
                  </div>
                </div>
                <div className="footer-right">
                  <Button onClick={onBtnCancelClicked} type={"link"}
                          style={{color: "black", marginRight: 15}}>Hủy</Button>


                  {checked.candidate.checkedList === "yes" ||
                  checked.members.checkedList === "yes" ||
                  checked.interviewers.checkedList.length > 0 ||
                  checked.presenter.checkedList === "yes" ?
                    <Button type={"primary"} onClick={onBtnContinueUpdateClicked}>Tiếp tục</Button>
                    :
                    <Button type={"primary"} onClick={onBtnUpdateClicked}>Đặt lịch</Button>
                  }


                </div>
              </Modal>
            </div>
          </div>
          :
          <div>
            <div>
              <Modal
                zIndex={10}
                maskClosable={false}

                visible={showBooking.show_booking}
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
                         style={{color: "#666"}}>{showBooking.data_update_booking?.fullName}</div>
                    {/*<div className="main-1__green-dot"></div>*/}
                    {/*<div className="main-1__job-description">Business Analysis</div>*/}
                  </div>
                </div>
                <div className="c-schedule-interview-popup" style={{overflow: "overlay", width: 580}}>
                  <div className='ant-col-14 grid-left' style={{width: 580}}>
                    <Form>
                      <Form.Item className="form-label" label="Tin tuyển dụng" labelCol={{span: 24}}
                                 wrapperCol={{span: 24}}>
                        {getFieldDecorator('recruitmentId', {
                          initialValue: showBooking.data_update_booking?.recruitmentId,
                          rules: [
                            {
                              message: 'Vui lòng chọn tin tuyển dụng',
                              required: false,
                            },
                          ],
                        })(
                          <Select getPopupContainer={(trigger: any) => trigger.parentNode} disabled
                                  className="bg-white text-black" style={fontWeightStyle}
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
                              <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                                      className="bg-white text-black" style={fontWeightStyle} placeholder="Nhập địa chỉ"
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
                      {checked.interviewers.checkedList.length === 0 &&
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
                          <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                                  className="bg-white text-black" style={fontWeightStyle}
                                  mode="multiple"
                                  placeholder="Chọn thành viên"
                          >
                            {props.listAccount.rows?.map((item: any, index: any) => (
                              <Option key={index} value={item.username}>{item.fullName}</Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>}

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
                          <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                                  className="bg-white text-black" style={fontWeightStyle}
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

                      <div style={{fontWeight: 500}}>Gửi mail cho hội đồng tuyển dụng</div>
                      <div style={{display: "flex"}}>
                        <div>
                          <Checkbox
                            indeterminate={checked.interviewers.indeterminate}
                            onChange={onCheckAllInterviewersChange}
                            checked={checked.interviewers.checkAll}
                          >
                            Tất cả
                          </Checkbox>
                        </div>
                        <CheckboxGroup
                          value={checked.interviewers.checkedList}
                          onChange={onCheckInterviewersChange}
                        >
                          {plainOptions.interviewers.map((item: any, index: any) =>
                            <Checkbox key={item.id} value={item.id}>{item.name}</Checkbox>
                          )}
                        </CheckboxGroup>
                      </div>
                      <br/>

                      <div style={{fontWeight: 500}}>Gửi mail cho người giới thiệu</div>
                      <div>
                        <Radio.Group
                          value={checked.presenter.checkedList}
                          onChange={onCheckPresenterChange}
                        >
                          {plainOptions.members.map((item: any, index: any) =>
                            <Radio key={item.id} value={item.id}>{item.name}</Radio>
                          )}
                        </Radio.Group>
                      </div>
                      <br/>

                      <div style={{fontWeight: 500}}>Gửi mail cho ứng viên</div>
                      <div><Radio.Group
                        value={checked.candidate.checkedList}
                        onChange={onCheckCandidateChange}
                      >
                        {plainOptions.candidate.map((item: any, index: any) =>
                          <Radio key={item.id} value={item.id}>{item.name}</Radio>
                        )}
                      </Radio.Group>
                      </div>
                      <br/>

                      <div style={{fontWeight: 500}}>Gửi mail cho cán bộ liên quan</div>
                      <div>
                        <Radio.Group
                          value={checked.members.checkedList}
                          onChange={onCheckMembersChange}
                        >
                          {plainOptions.members.map((item: any, index: any) =>
                            <Radio key={item.id} value={item.id}>{item.name}</Radio>
                          )}
                        </Radio.Group>
                      </div>
                      <br/>

                    </Form>
                  </div>
                </div>
                <div className="footer-right">
                  <Button onClick={onBtnCancelClicked} type={"link"}
                          style={{color: "black", marginRight: 15}}>Hủy</Button>

                  {checked.candidate.checkedList === "yes" ||
                  checked.members.checkedList === "yes" ||
                  checked.interviewers.checkedList.length > 0 ||
                  checked.presenter.checkedList === "yes" ?
                    <Button type={"primary"} onClick={onBtnContinueCreateClicked}>Tiếp tục</Button>
                    :
                    <Button type={"primary"} onClick={onBtnCreateClicked}>Đặt lịch</Button>
                  }
                </div>
              </Modal>
            </div>
          </div>
        }
      </div>
      {showBooking.show_booking &&
      <CreateEmailForm type={"booking"}
                       reqCreate={showBooking.is_update ? reqUpdate : reqCreate}
                       isUpdate={showBooking.is_update}
                       profile={showBooking.data_update_booking}
                       checked={checked}/>
      }
    </>

  )
}

export default connector(Form.create <BookingFormProps>()(BookingForm));
