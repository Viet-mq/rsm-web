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
  Table,
  TimePicker,
} from "antd";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import {emptyText} from "../../../configs/locales";
import {getListAccount} from "../../AccountManager/redux/actions";
import {createSchedule, getCandidates, resetCandidates, showFormSchedule} from "../redux/actions";
import Loading from "../../../components/Loading";
import {ProfileEntity} from "../../ProfileManager/types";
import {CreateScheduleRequest, ScheduleEntity} from "../types";
import {ColumnProps} from "antd/lib/table";
import {searchCandidates} from "../redux/actions";


const mapStateToProps = (state: RootState) => ({
  listRecruitment: state.recruitmentManager.list,
  listAddress: state.addressManager.list,
  listAccount: state.accountManager.list,
  listCandidate: state.scheduleManager.getCandidates,
  searchCandidatesState:state.scheduleManager.searchCandidates,
  showSchedule: state.scheduleManager.showSchedule

})

const connector = connect(mapStateToProps,
  {
    getListAccount,
    getCandidates,
    createSchedule,
    resetCandidates,
    showFormSchedule,
    searchCandidates
  });
type ReduxProps = ConnectedProps<typeof connector>;

const {Option} = Select;

interface ScheduleInterviewProps extends FormComponentProps, ReduxProps {
}

function ScheduleInterview(props: ScheduleInterviewProps) {
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const fontWeightStyle = {fontWeight: 400};
  const wrapperRef = useRef<any>(null);
  const {getFieldDecorator, resetFields} = props.form;
  const [recruitment, setRecruitment] = useState(null)
  const columns: ColumnProps<ScheduleEntity>[] = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      width: 170,
      key: 'fullName',
      render: (text: string, record: ScheduleEntity) => {
        return <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: 10}}>
            <Avatar src={"#"} style={{backgroundColor: record.avatarColor}}>
              {getInitials(record.fullName)}
            </Avatar>
          </div>

          <div>
            <div className="c-list-profile" style={{marginRight: "1px", fontWeight: 500}}>
              <span>{text}</span>
            </div>
          </div>
        </div>
      },

    },
    {
      title: 'Thời gian',
      dataIndex: 'dateOfApply',
      width: 80,
      key: 'dateOfApply',
      render: (text: string, record) => {
        return moment(record?.date).format(timeFormat) + " - " + moment(record?.interviewTime).format(timeFormat)
      },
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}></div>;
      },
      dataIndex: 'action',
      width: 30,
      key: 'action',
      align: "center",
      // fixed: 'right',
      render: (_text: string, record: any) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Button
              size="small"
              className="ant-btn ml-1 mr-1 ant-btn-sm"
              onClick={event => handleDelete(event, record.idProfile)}
            >
              <Icon type="delete" theme="filled"/>
            </Button>
          </div>
        );
      },
    },
  ];
  const [dataSource, setDatasource] = useState<any>([]);
  const [listCandidates, setListCandidates] = useState<ProfileEntity[] | any>([]);
  const [visibleCandidate, setVisibleCandidate] = useState(false)
  const [keySearch, setKeySearch] = useState(undefined);

  useEffect(() => {
    setListCandidates(props.listCandidate.rows);
  }, [props.listCandidate]);

  useEffect(() => {
    setListCandidates(props.searchCandidatesState.rows);
  }, [props.searchCandidatesState]);

  useEffect(() => {
    setDatasource([])
  }, [recruitment])

  useEffect(() => {
    if (props.showSchedule.show_schedule === false) {
      props.resetCandidates();
      resetFields();
      setDatasource([]);
      setKeySearch(undefined)
      setListCandidates([]);
    }
  }, [props.showSchedule.show_schedule])

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

  function onBtnCancelClicked() {
    props.showFormSchedule(false)
    props.resetCandidates();
    resetFields();
    setDatasource([]);
    setKeySearch(undefined)
    setListCandidates([]);
  }

  const getInitials = (name: string) => {
    if (name) {
      let initials: any = name.split(' ');
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = name.substring(0, 2);
      }
      return initials.toUpperCase();
    }
  }

  function handleDelete(e: any, values: any) {
    e.stopPropagation();
    const filterCandidate: ProfileEntity | any = props.searchCandidatesState.rows?.filter((item: any) => item.id === values)
    setDatasource(dataSource.filter((item: any) => item.idProfile !== values))
    setListCandidates(filterCandidate.concat(listCandidates))
  }

  function handleAdd(e: FormEvent, value: any) {
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
        setListCandidates(listCandidates.filter((item: ProfileEntity) => item.id !== value.id));
        const newData = {
          idProfile: value.id,
          fullName: value.fullName,
          date: dateChanged * 1,
          interviewTime: interviewTime * 1,
          avatarColor: value.avatarColor
        };
        setDatasource([...dataSource, newData]);

        return;
      }
    });

  };

  function handleSearchCandidate(e?: any) {
    console.log(e?.target.value)
    setKeySearch(e?.target.value)
    props.searchCandidates({fullName: e?.target.value, recruitment: recruitment, calendar: "notSet", page: 1, size: 15})
  }

  function showScrollCandidate() {
    setVisibleCandidate(!visibleCandidate)
  }

  function handleSelectRecruitment(value: any) {
    setRecruitment(value);
    props.getCandidates({recruitment: value, calendar: "notSet", page: 1, size: 15})
  }

  function btnListScheduleClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateScheduleRequest = {
          floor: values.floor,
          interviewAddress: values.interviewAddress,
          interviewers: values.interviewers,
          note: values.note,
          recruitmentId: values.recruitmentId,
          times: dataSource,
          type: values.type,
        }
        props.createSchedule(req);
        return;
      }
    });
  }

  return (
    <>
      <div>
        <Modal
          zIndex={2}
          maskClosable={false}
          title="Đặt lịch"
          visible={props.showSchedule.show_schedule}
          centered={true}
          width="990px"
          className="custom"
          afterClose={() => {
            resetFields();
          }}
          onCancel={onBtnCancelClicked}
          footer={""}>
          <div className="c-schedule-interview-popup">
            <div className='ant-col-12 grid-left'>
              <Form>
                <Form.Item className="form-label" label="Tin tuyển dụng" labelCol={{span: 24}} wrapperCol={{span: 24}}>
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
                            onSelect={handleSelectRecruitment} placeholder="Chọn tin tuyển dụng"
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
                        <InputNumber style={{width: "100%"}} type="number" min={15} className="bg-white text-black"/>
                      )}
                    </Form.Item>
                  </div>
                </div>

                <Checkbox defaultChecked disabled>Các ứng viên tham gia đồng thời</Checkbox>

                <Row style={{marginTop: 15}}>
                  <Col span={14} style={{paddingRight: 10}}>
                    <Form.Item className="form-label" label="Địa điểm" labelCol={{span: 24}} wrapperCol={{span: 24}}>
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

                <Form.Item label="Hội đồng tuyển dụng" className="form-label" labelCol={{span: 24}} wrapperCol={{span: 24}}>
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

                <Form.Item className="form-label" label="Ghi chép nội bộ" labelCol={{span: 24}} wrapperCol={{span: 24}}>
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
            <div className='ant-col-12 grid-right'>
              <div className="grid-right__title">ỨNG VIÊN</div>
              {props.listCandidate.rows?.length ?
                (<div>
                  <Table
                    scroll={{y: "350px"}}
                    className="custom-table -webkit-scrollbar"
                    dataSource={dataSource}
                    columns={columns}
                    rowKey="idProfile"
                    size="small"
                    pagination={false}
                    // bordered
                    // onChange={handleChange}
                    locale={{emptyText: emptyText}}
                  />
                  <div>
                    <Button type={"link"} style={{marginTop: 15, paddingLeft: 0, color: "#02a7f0"}}
                            onClick={showScrollCandidate}><Icon
                      type="plus" style={{marginRight: 5}}/>
                      Thêm ứng viên
                    </Button>
                    {visibleCandidate ?
                      <div ref={wrapperRef} className="dropdown-container">
                        <Input onChange={event => handleSearchCandidate(event)} value={keySearch} placeholder="Tìm kiếm thành viên"/>
                        <div className="scroll-label-content">
                          {listCandidates.length !== 0 ? listCandidates.map((item: any, index: any) => {
                            return (<div key={item.id} onClick={event => handleAdd(event, item)}>
                              <a className="label-content">
                                <div style={{marginRight: 10}}>
                                  <Avatar src={item.image ? item.image : "#"}
                                          style={{backgroundColor: item?.avatarColor, marginRight: 5}}>
                                    {getInitials(item.fullName)}
                                  </Avatar>
                                </div>
                                <div>
                                  <div>
                                    <div className="c-list-profile" style={{marginRight: "1px", fontWeight: 500}}>
                                      <span>{item.fullName}</span>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>)
                          }) : <span>Vui lòng nhập  tìm kiếm để tìm thêm ứng viên</span>}
                        </div>
                      </div>
                      : null}
                  </div>
                </div>)
                :
                (<div>Tin tuyển dụng đang chọn chưa có ứng viên</div>)
              }
            </div>
          </div>


          <div className="footer-right">
            <Button onClick={onBtnCancelClicked} type={"link"}
                    style={{color: "black", marginRight: 15}}>Hủy</Button>
            <Button onClick={btnListScheduleClicked} type={"primary"}>Tạo mới</Button>
          </div>

        </Modal>
      </div>
      {props.listCandidate.loading ?
        <Loading/> : null}
    </>);

}

export default connector(Form.create<ScheduleInterviewProps>()(ScheduleInterview));
