import {RootState} from "../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createJob, showFormCreate} from "../JobManager/redux/actions";
import {CreateJobRequest} from "../JobManager/types";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import 'devextreme/dist/css/dx.light.css';

import DateBox from 'devextreme-react/date-box';

const mapStateToProps = ({jobManager}: RootState) => ({jobManager});
const connector = connect(mapStateToProps, {createJob, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

const {Option} = Select;

interface ScheduleInterviewProps extends FormComponentProps, ReduxProps {
  handlePopupScheduleInterview: () => void;
  handleClosePopup: () => void;
  visible: boolean
}

function ScheduleInterview(props: ScheduleInterviewProps) {
  const [visible, setVisible] = useState(false);
  const dateFormat = 'DD/MM/YYYY';
  useEffect(() => setVisible(props?.visible), [props?.visible])
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

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateJobRequest = {
          name: values.name,
        }
        props.createJob(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false);
  }

  console.log(visible)

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Đặt lịch"
      visible={visible}
      // visible={true}
      centered={true}
      width="990px"
      className="custom"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.handleClosePopup()
      }}
      footer={""}>
      <div className="c-schedule-interview-popup">
        <div className='ant-col-12 grid-left'>
          <Form>
            <Form.Item className="form-label" label="Tin tuyển dụng" labelCol={{span: 24}} wrapperCol={{span: 24}}>
              {getFieldDecorator('recruitment', {
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
                  <Option value="on">Business Analysis</Option>
                  <Option value="off">iOS / Android Developer</Option>
                </Select>
              )}
            </Form.Item>

            <Row>
              <Col span={8} style={{marginRight: 10}}>
                <Form.Item className="form-label" label="Ngày" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                  {/*{getFieldDecorator('date', {*/}
                  {/*  initialValue: moment(),*/}
                  {/*  rules: [*/}
                  {/*    {*/}
                  {/*      message: 'Vui lòng chọn ngày bắt đầu',*/}
                  {/*      required: true,*/}
                  {/*    },*/}
                  {/*  ],*/}
                  {/*})(*/}
                  {/*  <DateBox defaultValue={moment()} type="date" />*/}
                  {/*  // <DatePicker defaultValue={moment()} format={dateFormat}*/}
                  {/*  // ></DatePicker>*/}
                  {/*)}*/}
                    <DateBox defaultValue={moment()} displayFormat="dd/MM/yyyy"
                             type="date" />
                </Form.Item>
              </Col>
              <Col span={6} style={{marginRight: 10}}>
                <Form.Item className="form-label" label="Giờ bắt đầu" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                  {/*{getFieldDecorator('timeStart', {*/}
                  {/*  initialValue: '',*/}
                  {/*  rules: [*/}
                  {/*    {*/}
                  {/*      message: 'Vui lòng chọn giờ',*/}
                  {/*      required: true,*/}
                  {/*    },*/}
                  {/*  ],*/}
                  {/*})(*/}
                  {/*  <Input placeholder="Giờ bắt đầu" className="bg-white text-black"/>*/}
                  {/*)}*/}
                    <DateBox defaultValue={moment()}
                             type="time" />
                </Form.Item>
              </Col>
              <Col span={7}>
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
            <Checkbox>Các ứng viên tham gia đồng thời</Checkbox>

            <Row style={{marginTop: 15}}>
              <Col span={14} style={{paddingRight: 10}}>
                <Form.Item className="form-label" label="Địa điểm" labelCol={{span: 24}}
                           wrapperCol={{span: 24}}>
                  {getFieldDecorator('address', {
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
                  {getFieldDecorator('room ', {
                    initialValue: '',
                    rules: [
                      {
                        message: 'Vui lòng nhập phòng',
                        required: false,
                      },
                    ],
                  })(
                    <Input placeholder="Thời lượng" className="bg-white text-black"/>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className="form-label" label="Hình thức" labelCol={{span: 24}} wrapperCol={{span: 24}}>
              {getFieldDecorator('form', {
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
                  <Option key="3" value="Phỏng vấn online ngoài ứng dụng">Phỏng vấn online ngoài ứng dụng</Option>
                  <Option key="4" value="Thi tuyển online">Thi tuyển online</Option>

                </Select>
              )}
            </Form.Item>

            <Form.Item className="form-label" label="Mẫu đánh giá" labelCol={{span: 24}} wrapperCol={{span: 24}}>
              {getFieldDecorator('form', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng chọn mẫu đánh giá',
                    required: false,
                  },
                ],
              })(
                <Select className="bg-white text-black"
                >
                  <Option key="1" value="Trung cấp">Mẫu 1</Option>
                  <Option key="2" value="Đại học">Mẫu 2</Option>

                </Select>)}
            </Form.Item>

            <Form.Item className="form-label" label="Lưu ý cho ứng viên" labelCol={{span: 24}} wrapperCol={{span: 24}}>
              {getFieldDecorator('note', {
                initialValue: '',
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
        <div className='ant-col-12 grid-right'>
          <div className="grid-right__title">ỨNG VIÊN</div>
          <div>Tin tuyển dụng đang chọn chưa có ứng viên</div>
          <div></div>
        </div>

      </div>
      <div className="schedule-popup-footer">
        <Button onClick={props.handleClosePopup} type={"link"} style={{color: "black", marginRight: 15}}>Hủy</Button>
        <Button type={"primary"}>Tiếp tục</Button>
      </div>

    </Modal>

  );

}

export default connector(Form.create<ScheduleInterviewProps>()(ScheduleInterview));
