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
  Radio,
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
import {createSchedule, getCandidates, resetCandidates, searchCandidates, showFormSchedule} from "../redux/actions";
import Loading from "../../../components/Loading";
import {ProfileEntity} from "../../ProfileManager/types";
import {CreateScheduleForm, CreateScheduleRequest, ScheduleEntity, ScheduleTime} from "../types";
import {ColumnProps} from "antd/lib/table";
import {getDetailRecruitment, getSearchRecruitment} from "../../RecruitmentManager/redux/actions";
import {showEmailCreateForm, showInterviewEmailCreateForm} from "../../ProfileManager/redux/actions";
import CreateInterviewEmailForm from "./CreateInterviewEmailForm";
import {RecruitmentEntity} from "../../RecruitmentManager/types";


const mapStateToProps = (state: RootState) => ({
  listRecruitment: state.recruitmentManager.list,
  listAddress: state.addressManager.list,
  listAccount: state.accountManager.list,
  listCandidate: state.scheduleManager.getCandidates,
  searchCandidatesState: state.scheduleManager.searchCandidates,
  showSchedule: state.scheduleManager.showSchedule,
  detailRecruitment: state.recruitmentManager.detailRecruitment,
})

const connector = connect(mapStateToProps,
  {
    getListAccount,
    getCandidates,
    resetCandidates,
    showFormSchedule,
    searchCandidates,
    getDetailRecruitment,
    showEmailCreateForm,
    showInterviewEmailCreateForm,
    getSearchRecruitment,
    createSchedule,

  });
type ReduxProps = ConnectedProps<typeof connector>;

const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

interface IProps extends FormComponentProps, ReduxProps {
}

function CreateScheduleInterview(props: IProps) {
  const dateFormat = 'DD/MM/YYYY';
  const timeFormat = 'HH:mm';
  const fontWeightStyle = {fontWeight: 400};
  const wrapperRef = useRef<any>(null);
  const {getFieldDecorator, resetFields} = props.form;
  const [recruitmentSelect, setRecruitmentSelect] = useState(null)
  const [reqCreate, setReqCreate] = useState<CreateScheduleForm>()
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
        return <div style={{whiteSpace: 'nowrap'}}/>;
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
  const [recruitment, setRecruitment] = useState<RecruitmentEntity[]>([]);
  const [trigger, setTrigger] = useState({
    recruitment: false,
  })
  const plainOptions = {
    candidate: [{
      id: "yes",
      name: "Có",
    }, {
      id: "no",
      name: "Không",
    }],
    interviewers: [{
      id: "system",
      name: "Hệ thống",
    }, {
      id: "outSide",
      name: "Ngoài hệ thống",
    }],
    members: [{
      id: "yes",
      name: "Có",
    }, {
      id: "no",
      name: "Không",
    }],
    presenter: [{
      id: "system",
      name: "Hệ thống",
    }, {
      id: "outSide",
      name: "Ngoài hệ thống",
    }]
  };
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
      checkedList: [],
      indeterminate: false,
      checkAll: false
    }
  })


  useEffect(() => {
    setListCandidates(props.listCandidate.rows);
  }, [props.listCandidate]);

  useEffect(() => {
    setListCandidates(props.searchCandidatesState.rows);
  }, [props.searchCandidatesState]);

  useEffect(() => {
    setDatasource([])
  }, [recruitmentSelect])

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

  function handleAdd(e: FormEvent, candidate: any) {
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
        setListCandidates(listCandidates.filter((item: ProfileEntity) => item.id !== candidate.id));
        const newData = {
          idProfile: candidate.id,
          fullName: candidate.fullName,
          date: dateChanged * 1,
          interviewTime: interviewTime * 1,
          avatarColor: candidate.avatarColor,
          username: candidate.username
        };
        setDatasource([...dataSource, newData]);

        return;
      }
    });

  };

  function handleSearchCandidate(e?: any) {
    setKeySearch(e?.target.value)
    props.searchCandidates({fullName: e?.target.value, recruitment: recruitmentSelect, calendar: "notSet", page: 1, size: 15})
  }

  function showScrollCandidate() {
    setVisibleCandidate(!visibleCandidate)
  }

  function handleSelectRecruitment(value: any) {
    setRecruitmentSelect(value);
    props.getCandidates({recruitment: value, calendar: "notSet", page: 1, size: 15})
    props.getDetailRecruitment({id: value})

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


        let times: ScheduleTime[] = dataSource?.reduce((curr: any, next: any) => {
          const newTimes: ScheduleTime = {
            // avatarColor: next.avatarColor,
            // date: next.date,
            // idProfile: next.idProfile,
            // interviewTime: next.interviewTime

            avatarColor: next.avatarColor,
            date: dateChanged * 1,
            idProfile: next.idProfile,
            interviewTime: interviewTime * 1
          }
          curr.push(newTimes)
          return curr;
        }, [])

        let req: CreateScheduleForm = {
          floor: values.floor,
          interviewAddress: values.interviewAddress,
          interviewers: props.detailRecruitment.rows[0]?.interviewer?.map((item: any) => item.username),
          note: values.note,
          recruitmentId: values.recruitmentId,
          times: times,
          type: values.type,
        }
        setReqCreate(req)
        console.log(" req.time:", times)
        console.log(" dataSource:", dataSource)
        props.showInterviewEmailCreateForm(true)

        // props.createSchedule(req);
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


        let times: ScheduleTime[] = dataSource?.reduce((curr: any, next: any) => {
          const newTimes: ScheduleTime = {
            // avatarColor: next.avatarColor,
            // date: next.date,
            // idProfile: next.idProfile,
            // interviewTime: next.interviewTime

            avatarColor: next.avatarColor,
            date: dateChanged * 1,
            idProfile: next.idProfile,
            interviewTime: interviewTime * 1
          }
          curr.push(newTimes)
          return curr;
        }, [])

        let req: CreateScheduleForm = {
          floor: values.floor,
          interviewAddress: values.interviewAddress,
          interviewers: props.detailRecruitment.rows[0]?.interviewer?.map((item: any) => item.username),
          note: values.note,
          recruitmentId: values.recruitmentId,
          times: times,
          type: values.type,
        }
        let reqCreateSchedule: CreateScheduleRequest = {
          createScheduleForm: req,
        }

        props.createSchedule(reqCreateSchedule);
        return;
      }
    });
  }

  function onSearchRecruitment(value: any) {
    props.getSearchRecruitment({name: value})
    setTrigger({...trigger, recruitment: true})
  }

  function onFocusRecruitment() {
    setRecruitment(props.listRecruitment.rows)
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

  function onCheckPresenterChange(checkedList: any) {
    setChecked({
        ...checked,
        presenter: {
          checkedList: checkedList,
          indeterminate: !!checkedList.length && checkedList.length < plainOptions.presenter.length,
          checkAll: checkedList.length === plainOptions.presenter.length,
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

  function onCheckAllPresenterChange(e: any) {
    setChecked({
      ...checked,
      presenter: {
        checkedList: e.target.checked ? plainOptions.presenter.map((item: any) => item.id) : [],
        indeterminate: false,
        checkAll: e.target.checked,
      }
    });
  };

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
            <div className='ant-col-12 grid-left' style={{overflow:"auto",height:"inherit"}}>
              <Form>
                <Form.Item className="form-label" label="Tin tuyển dụng" labelCol={{span: 24}} wrapperCol={{span: 24}}>
                  {getFieldDecorator('recruitmentId', {
                    initialValue: undefined,
                    rules: [
                      {
                        message: 'Vui lòng chọn tin tuyển dụng',
                        required: true,
                      },
                    ],
                  })(
                    <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                            className="bg-white text-black"
                            style={fontWeightStyle}
                            onSelect={handleSelectRecruitment}
                            placeholder="Chọn tin tuyển dụng"

                            onSearch={onSearchRecruitment}
                            onFocus={onFocusRecruitment}
                            filterOption={(input, option: any) =>
                              option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            optionFilterProp="label"
                            showSearch
                    >
                      {props.listRecruitment.rows?.map((item: any, index: any) => (
                        <Option key={index} value={item.id}
                                label={item.title}>[{item.departmentName}] {item.title}</Option>
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
                        <Select getPopupContainer={(trigger: any) => trigger.parentNode} className="bg-white text-black"
                                style={fontWeightStyle} placeholder="Nhập địa chỉ"
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

                {/*<Form.Item label="Hội đồng tuyển dụng" className="form-label" labelCol={{span: 24}} wrapperCol={{span: 24}}>*/}
                {/*  {getFieldDecorator('interviewers', {*/}
                {/*    initialValue: props.detailRecruitment.rows[0]?.interviewer?.map((item:any)=>item.username)||undefined,*/}
                {/*    rules: [*/}
                {/*      {*/}
                {/*        message: 'Vui lòng chọn Hội đồng tuyển dụng',*/}
                {/*        required: true,*/}
                {/*      },*/}
                {/*    ],*/}
                {/*  })(*/}
                {/*  <Select getPopupContainer={(trigger:any) => trigger.parentNode} className="bg-white text-black" style={fontWeightStyle}*/}
                {/*            mode="multiple"*/}
                {/*            placeholder="Chọn thành viên"*/}
                {/*    >*/}
                {/*      {props.listAccount.rows?.map((item: any, index: any) => (*/}
                {/*        <Option key={index} value={item.username}>{item.fullName}</Option>*/}
                {/*      ))}*/}
                {/*    </Select>*/}
                {/*  )}*/}
                {/*</Form.Item>*/}

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
                    <Select getPopupContainer={(trigger: any) => trigger.parentNode} className="bg-white text-black"
                            style={fontWeightStyle}
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

                <div style={{fontWeight: 500}}>Gửi mail cho ứng người giới thiệu</div>
                <div style={{display: "flex"}}>
                  <div>
                    <Checkbox
                      indeterminate={checked.presenter.indeterminate}
                      onChange={onCheckAllPresenterChange}
                      checked={checked.presenter.checkAll}
                    >
                      Tất cả
                    </Checkbox>
                  </div>
                  <CheckboxGroup
                    value={checked.presenter.checkedList}
                    onChange={onCheckPresenterChange}
                  >
                    {plainOptions.presenter.map((item: any, index: any) =>
                      <Checkbox key={item.id} value={item.id}>{item.name}</Checkbox>
                    )}
                  </CheckboxGroup>
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
                        <Input onChange={event => handleSearchCandidate(event)} value={keySearch}
                               placeholder="Tìm kiếm thành viên"/>
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
            {checked.candidate.checkedList === "yes" ||
            checked.members.checkedList === "yes" ||
            checked.interviewers.checkedList.length > 0 ||
            checked.presenter.checkedList.length > 0 ?
              <Button type={"primary"} onClick={onBtnContinueCreateClicked}>Tiếp tục</Button>
              :
              <Button type={"primary"} onClick={onBtnCreateClicked}>Đặt lịch</Button>
            }
          </div>

        </Modal>
      </div>
      <CreateInterviewEmailForm reqCreateSchedule={reqCreate}/>
      {props.listCandidate.loading ?
        <Loading/> : null}
    </>);

}

export default connector(Form.create<IProps>()(CreateScheduleInterview));
