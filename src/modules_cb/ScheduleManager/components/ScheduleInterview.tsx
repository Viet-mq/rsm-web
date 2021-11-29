import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table, TimePicker,
} from "antd";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import 'devextreme/dist/css/dx.light.css';
import {emptyText} from "../../../configs/locales";
import {ProfileEntity} from "../../ProfileManager/types";
import {createBooking, getBooking, showFormBooking, updateBooking} from "../../ProfileManager/redux/actions";
import {getListAccount} from "../../AccountManager/redux/actions";
import {getListStatusCV} from "../../StatusCVManager/redux/actions";
import {set} from "devextreme/events/core/events_engine";

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

const {Option} = Select;

interface ScheduleInterviewProps extends FormComponentProps, ReduxProps {
  handlePopupScheduleInterview: () => void;
  handleClosePopup: () => void;
  visible: boolean
}

function ScheduleInterview(props: ScheduleInterviewProps) {
  const [visible, setVisible] = useState(false);
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const fontWeightStyle = {fontWeight: 400};

  useEffect(() => setVisible(props?.visible), [props?.visible])

  useEffect(() => {
    if (props.showBooking.show_booking) {
      props.getListAccount({page: 1, size: 100});
      props.getListStatusCV({page: 1, size: 100});
    }
  }, [props.showBooking.show_booking])

  const wrapperRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current?.contains(event.target)) {
        setVisibleCandidate(false)
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '60px'};

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

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

  }

  function onBtnCancelClicked() {
    resetFields();
  }

  const getInitials = (name: string) => {
    let initials: any = name.split(' ');

    if (initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 2);
    }

    return initials.toUpperCase();
  }

  const setColor = () => {
    const randomColor: string = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  function handleDelete(e: any, values: any) {
    e.stopPropagation();
    const dataSource = [...candidate.dataSource].filter((item: any) => item.key !== values);
    setCandidate({...candidate, dataSource: dataSource})
  }

  function handleAdd(value:any) {
    console.log("i : " + value.id);
    console.log("result:",candidatesRender.filter(item => item.id !== value.id))
    setCandidatesRender(candidatesRender.filter(item => item.id !== value.id));
    const newData = {
      key: candidate.count.toString(),
      fullName:  "Hồ Đức Duy".concat(value.id.toString()),
      dateOfApply: 1636998012,
    };
    setCandidate({
      ...candidate,
      dataSource: [...candidate.dataSource, newData],
      count: candidate.count + 1,
    });
  };

  const columns: any[] = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      width: 170,
      key: 'fullName',
      render: (text: string, record: any) => {

        return <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: 10}}>
            {/*<Badge count={1}>*/}

            <Avatar src={record.image ? record.image : "#"} style={{backgroundColor: setColor()}}>
              {record.image ? null : getInitials(record.fullName)}
            </Avatar>
            {/*</Badge>*/}
          </div>

          <div>
            <div>
              <div className="c-list-profile" style={{marginRight: "1px", fontWeight: 500}}>
                <span>{text}</span>
              </div>
            </div>

            <span style={{color: "#B2B2B2",}}>
                        {record.levelJobName}
                      </span>
          </div>

        </div>
      },

    },
    {
      title: 'Thời gian',
      dataIndex: 'dateOfApply',
      width: 80,
      key: 'dateOfApply',
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY');
      },
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}></div>;
      },
      dataIndex: 'action',
      width: 30,
      align: "center",
      // fixed: 'right',
      render: (_text: string, record: any) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Button
              size="small"
              className="ant-btn ml-1 mr-1 ant-btn-sm"
              onClick={event => handleDelete(event, record.key)}
            >
              <Icon type="delete" theme="filled"/>
            </Button>
          </div>
        );
      },
    },
  ];

  const [candidate, setCandidate] = useState(
    {
      dataSource: [
        {
          key: '0',
          fullName: 'Hồ Đức Duy',
          dateOfApply: 1636998012,
        },
        {
          key: '1',
          fullName: 'Hồ Đức Duy Hà',
          dateOfApply: 1636998012,
        },
        {
          key: '2',
          fullName: 'Phạm Kỳ Quân',
          dateOfApply: 1636998012,
        },
        {
          key: '3',
          fullName: 'Phạm Trung Hiếu',
          dateOfApply: 1636998012,
        },
        {
          key: '4',
          fullName: 'Phạm Trung Hiếu',
          dateOfApply: 1636998012,
        },
        {
          key: '5',
          fullName: 'Phạm Trung Hiếu',
          dateOfApply: 1636998012,
        },
        {
          key: '6',
          fullName: 'Phạm Trung Hiếu',
          dateOfApply: 1636998012,
        },
        {
          key: '7',
          fullName: 'Phạm Trung Hiếu',
          dateOfApply: 1636998012,
        },
        {
          key: '8',
          fullName: 'Phạm Trung Hiếu',
          dateOfApply: 1636998012,
        },
        {
          key: '9',
          fullName: 'Phạm Trung Hiếu',
          dateOfApply: 1636998012,
        },
      ],
      count: 10,
    }
  );

  function handleSearchCandidate(e: any) {
    console.log(e.target.value)
  }

  const [candidatesRender, setCandidatesRender] = useState<any[]>([]);

  useEffect(()=>{
    let d = [];
    for (let i = 0; i <5; i++){
      d.push({
        "name" : "Duy " + i,
        "id" : i
      });
      setCandidatesRender(d);
    }
  },[]);

  const [visibleCandidate, setVisibleCandidate] = useState(false)

  function showScrollCandidate() {
    setVisibleCandidate(!visibleCandidate)
  }

  return (
    <div>
      <Modal
        zIndex={2}
        maskClosable={false}
        title="Đặt lịch"
        // visible={visible}
        visible={true}
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
                {getFieldDecorator('recruitmentId', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Vui lòng chọn tin tuyển dụng',
                      required: false,
                    },
                  ],
                })(
                  <Select className="bg-white text-black" style={fontWeightStyle}
                  >
                    {props.listRecruitment.rows?.map((item: any, index: any) => (
                      <Option key={index} value={item.id}>{item.title}</Option>
                    ))}
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
                      <DatePicker format={dateFormat} style={{width: "100%"}}/>
                    )}

                  </Form.Item>
                </Col>
                <Col span={6} style={{marginRight: 10}}>
                  <Form.Item className="form-label" label="Giờ bắt đầu" labelCol={{span: 24}} wrapperCol={{span: 24}}>
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
                </Col>
                <Col span={7}>
                  <Form.Item className="form-label" label="Thời lượng(phút)" labelCol={{span: 24}}
                             wrapperCol={{span: 24}}>
                    {getFieldDecorator('interviewTime', {
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
                  <Form.Item className="form-label" label="Địa điểm" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                    {getFieldDecorator('interviewAddress', {
                      initialValue: '',
                      rules: [
                        {
                          message: 'Vui lòng nhập địa điểm',
                          required: true,
                        },
                      ],
                    })(
                      <Select className="bg-white text-black" style={fontWeightStyle}
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
                    {getFieldDecorator('room', {
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
                  <Select className="bg-white text-black" style={fontWeightStyle}
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
          <div className='ant-col-12 grid-right'>
            <div className="grid-right__title">ỨNG VIÊN</div>
            <div>Tin tuyển dụng đang chọn chưa có ứng viên</div>
            <div>
              <Table
                scroll={{y: "350px"}}
                className="custom-table -webkit-scrollbar"
                dataSource={candidate.dataSource}
                columns={columns}
                rowKey="id"
                size="small"
                pagination={false}
                // bordered
                // onChange={handleChange}
                locale={{emptyText: emptyText}}

              />
              <div>
                <Button type={"link"} style={{marginTop: 15, color: "#02a7f0"}} onClick={showScrollCandidate}><Icon
                  type="plus" style={{marginRight: 5}}/>
                  Thêm ứng viên
                </Button>
                {visibleCandidate ?
                  <div ref={wrapperRef} className="dropdown-container">
                    <Input onChange={event => handleSearchCandidate(event)} placeholder="Tìm kiếm ứng viên"/>
                    <div className="scroll-label-content">
                      {candidatesRender.length!==0?candidatesRender.map((item:any, index:any)=>{
                        return (<div key={index} onClick={()=>handleAdd(item)}>
                          <a className="label-content">
                            <div style={{marginRight: 10}}>
                              <Avatar src={"#"} style={{backgroundColor: setColor()}}>
                                {getInitials("Phạm Kỳ Quân")}
                              </Avatar>
                            </div>
                            <div>
                              <div>
                                <div className="c-list-profile" style={{marginRight: "1px", fontWeight: 500}}>
                                  <span>Phạm Kỳ Quân {item.id}</span>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>)
                      }):<span>Vui lòng nhập  tìm kiếm để tìm thêm ứng viên</span>}
                    </div>
                  </div>
                  : null}
              </div>
            </div>
          </div>

        </div>


        <div className="footer-right">
          <Button onClick={props.handleClosePopup} type={"link"} style={{color: "black", marginRight: 15}}>Hủy</Button>
          <Button type={"primary"}>Tạo mới</Button>
        </div>

      </Modal>
    </div>

  );

}

export default connector(Form.create<ScheduleInterviewProps>()(ScheduleInterview));
