import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Icon,
  Popover,
  Row,
  Select,
  Table,
  Tooltip,
  TreeSelect
} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteProfile,
  getListProfile,
  resetSearch,
  showFormBooking,
  showFormDetail,
  showFormUpdate,
  showFormUploadCV
} from "../../redux/actions";
import {DataShowBooking, DeleteProfileRequest, DetailCV, ProfileEntity} from "../../types";
import moment from 'moment';
import 'moment/locale/vi';
import {GiFemale, GiMale, ImPhoneHangUp} from "react-icons/all";
import {useHistory, useLocation} from "react-router-dom";
import Search from "antd/es/input/Search";
import {getDetailTalentPool} from "../../../TalentPoolManager/redux/actions";
import BookingForm from "../BookingForm";
import Loading from "../../../../components/Loading";
import UpdateProfileForm from "../UpdateProfileForm";
import UploadCVForm from "../UploadCVForm";
import env from 'src/configs/env';
import {JobEntity} from "../../../JobManager/types";
import {JobLevelEntity} from "../../../JobLevelManager/types";
import {DepartmentEntity} from "../../../DepartmentManager/types";
import {RecruitmentEntity} from "../../../RecruitmentManager/types";
import {convertArrayToTree, getInitials, profile_path} from "../../../../helpers/utilsFunc";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import {getListJob as getListJobApi} from "../../../JobManager/redux/services/apis";
import {getListJobLevel as getListJobLevelApi} from "../../../JobLevelManager/redux/services/apis";
import {getListRecruitment as getListRecruitmentApi} from "src/modules_cb/RecruitmentManager/redux/services/apis";
import {getListTalentPool as getListTalentPoolApi} from "src/modules_cb/TalentPoolManager/redux/services/apis";
import {getListAccount as getListAccountApi} from "../../../AccountManager/redux/services/apis";

const {Option} = Select;
const {RangePicker} = DatePicker;
const {TreeNode} = TreeSelect;
const CheckboxGroup = Checkbox.Group;

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  showDetail: state.profileManager.showForm.show_detail?.show_detail,
  listSourceCV: state.sourcecvManager.list,
  listJobLevel: state.joblevelManager.list,
  listDepartment: state.departmentManager.list,
  listRecruitment: state.recruitmentManager.list,
  listTalentPool: state.talentPoolManager.list,
  listJob: state.jobManager.list,
  listAccount: state.accountManager.list,
})

const connector = connect(mapStateToProps, {
  getListProfile,
  deleteProfile,
  showFormUpdate,
  showFormDetail,
  showFormUploadCV,
  showFormBooking,
  resetSearch,
  getDetailTalentPool,

});

type ReduxProps = ConnectedProps<typeof connector>;

interface ListProfileProps extends ReduxProps {
  idRecruitment?: any,
  idProcess?: any,
  idTalentPool?: any,
  dataID?: any,
  setDataID?: any,
}

function ListProfile(props: ListProfileProps) {
  const [state, setState] = useState<any>({
    filteredInfo: null,
    sortedInfo: {
      order: null,
      columnKey: null,
    },
  });
  const columns: ColumnProps<ProfileEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 50,
      align: "center",
      fixed: "left",
      render: (text, record, index) => {
        return (page - 1) * 30 + index + 1
      }
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      width: 250,
      key: 'fullName',
      fixed: "left",
      render: (text: string, record: ProfileEntity) => {
        return <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: 10}}>
            {/*<Badge count={1}>*/}
            <Avatar src={record.image ? record.image : "#"} style={{backgroundColor: record.avatarColor}}>
              {record.image ? null : getInitials(record.fullName)}
            </Avatar>
            {/*</Badge>*/}
          </div>

          <div>
            <div>
              <a className="c-list-profile" style={{marginRight: "1px"}}
                 onClick={event => handleDetail(event, record)}>
                <span>{text}</span>
              </a>
              {record.gender === "Nam" ? <GiMale/> : <GiFemale/>}

            </div>

            <span style={{color: "#B2B2B2",}}>
                        {record.levelJobName}
                      </span>
          </div>

        </div>
      },
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortOrder: state.sortedInfo.columnKey === 'fullName' && state.sortedInfo.order,
      // ellipsis: true,
    },
    {
      title: 'Thông tin liên hệ',
      width: 240,
      fixed: props.showDetail ? undefined : "left",
      key: 'contact',
      render: (text: string, record: ProfileEntity) => {
        return <div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Icon type="mail" className="mr-1" style={{alignSelf: 'flex-start', paddingTop: 3}}/>
            <span style={{fontWeight: 500}}>{record.email}</span>
          </div>
          <div>
            <ImPhoneHangUp className="mr-1"/>
            <span style={{color: "#B2B2B2"}}>{record.phoneNumber}</span>
          </div>
        </div>
      }

    },
    {
      title: 'Vị trí công việc',
      dataIndex: 'jobName',
      width: 150,
      key: 'jobName',
      render: (text, record) => <span style={{fontWeight: 500}}>{record.jobName}</span>,
      sorter: (a, b) => a.jobName.length - b.jobName.length,
      sortOrder: state.sortedInfo.columnKey === 'jobName' && state.sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Phòng ban',
      dataIndex: 'departmentName',
      width: 150,
      key: 'departmentName',
      sorter: (a, b) => a.departmentName.length - b.departmentName.length,
      sortOrder: state.sortedInfo.columnKey === 'departmentName' && state.sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Tin tuyển dụng',
      dataIndex: 'recruitmentName',
      width: 170,
      key: 'recruitmentName',
      sorter: (a, b) => a.recruitmentName.length - b.recruitmentName.length,
      sortOrder: state.sortedInfo.columnKey === 'recruitmentName' && state.sortedInfo.order,
      ellipsis: true,
      render: (text: string, record: ProfileEntity) => {
        return <div>
          <div style={{fontWeight: 500}}>{record.recruitmentName}</div>
          <div style={{color: "#B2B2B2"}}>
            {
              record.statusCVName === "APPLY" ? <Badge status="default"/> :
                record.statusCVName === "INTERVIEW" ? <Badge status="processing"/> :
                  record.statusCVName === "OFFER" ? <Badge status="warning"/> :
                    record.statusCVName === "HIRED" ? <Badge status="success"/> :
                      record.statusCVName === "Loại" ? <Badge status="error"/> :
                        record.statusCVName === "Test" ? <Badge color="purple"/> : null
            }

            <span>{record.statusCVName}</span>
          </div>
        </div>
      },


    },
    {
      title: 'CV',
      dataIndex: 'cv',
      width: 150,
      key: 'cv',
      render: (text, record) => <a className="cv-overflow" href={record.urlCV} target="_blank">{record.cv}</a>
    },
    {
      title: 'Nguồn ứng viên',
      dataIndex: 'sourceCVName',
      width: 130,
      key: 'sourceCVName',
      filters: props.listSourceCV.rows?.map((item: any) => ({
        text: item.name,
        value: item.name
      }))
      ,
      filteredValue: state.filteredInfo?.sourceCVName || null,
      onFilter: (value, record) => record.sourceCVName.includes(value),
      sorter: (a, b) => a.sourceCVName.length - b.sourceCVName.length,
      sortOrder: state.sortedInfo.columnKey === 'sourceCVName' && state.sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Talent Pools',
      dataIndex: 'talentPoolName',
      width: 140,
      key: 'talentPoolName',
      // filters: props.listTalentPool?.rows.map((item: any) => ({
      //   text: item.name,
      //   value: item.name
      // }))
      // ,
      // filteredValue: state.filteredInfo?.talentPoolName || null,
      // onFilter: (value, record) => record.talentPoolName.includes(value),
      sorter: (a, b) => a.talentPoolName.length - b.talentPoolName.length,
      sortOrder: state.sortedInfo.columnKey === 'talentPoolName' && state.sortedInfo.order,
      ellipsis: true,
    },
    // {
    //   title: 'Người giới thiệu',
    //   dataIndex: 'hrRef',
    //   width: 180,
    //   key: 'hrRef',
    //   render: (text: string, record: ProfileEntity) => {
    //     return <div>
    //       <div style={{display: 'flex', alignItems: 'center'}}>
    //         <span style={{fontWeight: 500}}>{record.hrRef}</span>
    //       </div>
    //       <div>
    //         <span style={{color: "#B2B2B2"}}>{record.mailRef}</span>
    //       </div>
    //     </div>
    //   }
    // },
    //
    // {
    //   title: 'Email người giới thiệu(Ngoài hệ thống)',
    //   dataIndex: 'mailRef2',
    //   width: 180,
    //   key: 'mailRef2',
    // },
    {
      title: 'PIC',
      dataIndex: 'picName',
      width: 180,
      key: 'picName',
      render: (text: string, record: ProfileEntity) => {
        return <div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{fontWeight: 500}}>{record.picName}</span>
          </div>
          <div>
            <span style={{color: "#B2B2B2"}}>{record.picMail}</span>
          </div>
        </div>
      }
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'dateOfApply',
      width: 120,
      key: 'dateOfApply',
      render: (value: number) => {
        return value === 0 ? "" : moment(unixTimeToDate(value)).format('DD/MM/YYYY');
      },
      sorter: (a, b) => a.talentPoolName.length - b.talentPoolName.length,
      sortOrder: state.sortedInfo.columnKey === 'talentPoolName' && state.sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createAt',
      width: 100,
      key: 'createAt',
      render: (value: number) => {
        return value === 0 ? "" : moment(unixTimeToDate(value)).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Năm sinh',
      dataIndex: 'dateOfBirth',
      width: 100,
      key: 'dateOfBirth',
      render: (value: number) => {
        return value === 0 ? "" : moment(unixTimeToDate(value)).format('DD/MM/YYYY');
      },
    },
    // {
    //   title: 'Quê quán',
    //   dataIndex: 'hometown',
    //   width: 200,
    //   key: '4',
    //   ellipsis: true
    //
    // },
    // {
    //   title: 'Trường học',
    //   dataIndex: 'schoolName',
    //   width: 200,
    //   key: '5',
    //   ellipsis: true
    // },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 170,
      align: "center",
      fixed: 'right',
      render: (_text: string, record: ProfileEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <ButtonDelete path={profile_path} message="ứng viên" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={profile_path} action="update" handleClick={(event) => handleEdit(event, record)}/>


            <Tooltip placement="top" title="Upload CV">
              <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                      onClick={event => handleUploadCV(event, record)}
              >
                <Icon type="upload"/>
              </Button>
            </Tooltip>


            <Tooltip placement="top" title="Lịch phỏng vấn">
              <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                      onClick={event => handleBooking(event, record)}
              >
                <Icon type="calendar"/>
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const {search, list, getBooking, deleteProfile, update, uploadCV, createBooking, updateBooking} = props.profileManager
  const history = useHistory();
  const location = useLocation();
  const {pathname} = useLocation();
  const [page, setPage] = useState(1);
  const size = 30;
  const width = {width: 200};
  const fontWeightStyle = {fontWeight: 400};
  const [keySearch, setKeySearch] = useState<string>('')
  const [dataSource, setDataSource] = useState<ProfileEntity[] | any>(undefined)
  const [selected, setSelected] = useState<any>({
    job: undefined,
    jobLevel: undefined,
    department: undefined,
    talentPool: undefined,
    recruitment: undefined,
    hrRef: undefined,
    pic: undefined,
    name: undefined,
    startDateRange: undefined,
    endDateRange: undefined,
    startCreateAt: undefined,
    endCreateAt: undefined,
  })
  const dateFormat = 'DD/MM/YYYY';
  const [treeData, setTreeData] = useState([])
  const screenHeight = document.documentElement.clientHeight;
  const [job, setJob] = useState<JobEntity[]>([]);
  const [jobLevel, setJobLevel] = useState<JobLevelEntity[]>([]);
  const [department, setDepartment] = useState<DepartmentEntity[]>([]);
  const [recruitment, setRecruitment] = useState<RecruitmentEntity[]>([]);
  const [talentPool, setTalentPool] = useState<JobEntity[]>([]);
  const arrayUrl = ['/talent-pool-manager', '/profile-manager', '/recruitment-manager', '/blacklist-manager']
  const [visibleSelect, setVisibleSelect] = useState(false)
  const [checkSelect, setCheckSelect] = useState<any>({
    checkedList: ["job",
      "department",
      "recruitment",
      "pic",
      "name"],
    indeterminate: false,
    checkAll: false
  })
  const [account, setAccount] = useState<any>({
    pic: [],
    presenter: [],
  });
  const options = [
    {
      id: "job",
      name: "Vị trí công việc"
    },
    {
      id: "jobLevel",
      name: "Cấp bậc công việc"
    },
    {
      id: "department",
      name: "Phòng ban"
    },
    {
      id: "talentPool",
      name: "Talent Pools"
    },
    {
      id: "recruitment",
      name: "Tin tuyển dụng"
    },
    {
      id: "hrRef",
      name: "Người giới thiệu"
    },
    {
      id: "pic",
      name: "HR phụ trách"
    },
    {
      id: "name",
      name: "Họ tên"
    },
    {
      id: "dateRange",
      name: "Ngày nộp hồ sơ"
    },
    {
      id: "createAt",
      name: "Ngày tạo"
    },

  ];
  const content = (<div>
    <div style={{borderBottom: '1px solid #E9E9E9'}}>
      <Checkbox
        indeterminate={checkSelect.indeterminate}
        onChange={onCheckAll}
        checked={checkSelect.checkAll}
      >
        All
      </Checkbox>
    </div>
    <br/>
    <CheckboxGroup
      style={{width: '100%'}}
      value={checkSelect.checkedList}
      onChange={onChangeSelect}
    >
      <Row>
        {options?.map((item: any, index: any) =>
          <Col span={12} key={index}>
            <Checkbox key={index} value={item.id}>{item.name}</Checkbox>
          </Col>
        )}
      </Row>
    </CheckboxGroup>
  </div>)

  useEffect(() => {
    setTreeData(convertArrayToTree(props.listDepartment.rows))
  }, [props.listDepartment.rows])

  useEffect(() => {
    if (location.pathname.includes("profile-manager")) props.setDataID(selected)
  }, [selected])

  useEffect(() => {
    btnSearchClicked()
  }, [page, pathname])

  useEffect(() => {
    if (search.request?.key) {
      setDataSource(search);
      setKeySearch(search.request?.key)
    }
  }, [search.rowsSearchFull])

  useEffect(() => {
    setJob(props.listJob.rows)
    setJobLevel(props.listJobLevel.rows)
    setDepartment(props.listDepartment.rows)
    setRecruitment(props.listRecruitment.rows)
    setTalentPool(props.listTalentPool.rows)
  }, [])

  const onVisibleChange = (visible: any) => {
    setVisibleSelect(visible);
  };

  function onChangeSelect(checkedList: any) {
    setCheckSelect({
        ...checkSelect,
        checkedList: checkedList,
        indeterminate: !!checkedList.length && checkedList.length < options.length,
        checkAll: checkedList.length === options.length,
      }
    );
  }

  function onCheckAll(e: any) {
    setCheckSelect({
      ...checkSelect,
      checkedList: e.target.checked ? options?.map((item: any) => item.id) : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: {
        order: null,
        columnKey: null,
      },
    });

    setSelected({
      job: undefined,
      jobLevel: undefined,
      department: undefined,
      talentPool: undefined,
      recruitment: undefined,
      hrRef: undefined,
      pic: undefined,
      name: undefined,
      startDateRange: undefined,
      endDateRange: undefined,
      startCreateAt: undefined,
      endCreateAt: undefined,
    })
    const req: any = {}
    req.page = page;
    req.size = 30;

    if (pathname.includes("talent-pool-manager")) {
      req.talentPool = props.idTalentPool
      props.getListProfile(req);
      props.getDetailTalentPool({id: props.idTalentPool})

    } else if (pathname.includes("recruitment-manager")) {
      req.recruitment = props.idRecruitment
      req.statusCV = props.idProcess
      props.getListProfile(req);

    } else if (pathname.includes("blacklist-manager")) {
      req.blackList = "reject"
      props.getListProfile(req);

    } else {
      req.key = "recruitment"
      props.getListProfile(req)
    }
  };

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  const handleDelete = (event: any, entity: ProfileEntity) => {
    event.stopPropagation();
    let req: DeleteProfileRequest = {
      id: entity.id
    }
    props.deleteProfile(req);
    history.push({
      state: undefined,
    });
  }

  const handleEdit = (event: any, entity: ProfileEntity) => {
    props.showFormUpdate(true, entity);
  }

  const handleBooking = (event: any, entity: ProfileEntity) => {
    let req: DataShowBooking = {
      id: entity.id,
      fullName: entity.fullName,
      idRecruitment: entity.recruitmentId,
      username: entity.username,
    }
    props.showFormBooking(true, req, entity, false);
  }

  const handleUploadCV = (e: any, entity: ProfileEntity) => {
    props.showFormUploadCV(true, entity.id);
  }

  const handleDetail = (e: any, entity: ProfileEntity) => {
    let req: DetailCV = {
      show_detail: true,
      general: 12,
      detail: 12,
    }
    props.showFormDetail(req, entity.id);
  }

  function onBtnResetClicked() {
    setDataSource(undefined);
    setState({
      filteredInfo: null,
      sortedInfo: {
        order: null,
        columnKey: null,
      },
    });
    props.resetSearch({key: ""})
    setKeySearch("")
    if (pathname.includes("talent-pool-manager")) {
      let req = {
        talentPool: props.idTalentPool,
        page: 1,
        size: 30
      }
      req.talentPool = props.idTalentPool
      props.getListProfile(req);
      props.getDetailTalentPool({id: props.idTalentPool})

    } else props.getListProfile({page: 1, size: 30})
  }

  function btnSearchClicked() {
    const req: any = {}
    if (selected.name) req.fullName = encodeURI(selected.name);
    if (selected.job) req.job = selected.job
    if (selected.jobLevel) req.jobLevel = selected.jobLevel
    if (selected.department) req.department = selected.department
    if (selected.talentPool) req.talentPool = selected.talentPool
    if (selected.recruitment) req.recruitment = selected.recruitment
    if (selected.hrRef) req.hrRef = selected.hrRef
    if (selected.pic) req.pic = selected.pic
    if (selected.startDateRange) req.from = selected.startDateRange * 1
    if (selected.endDateRange) req.to = selected.endDateRange * 1
    if (selected.startCreateAt) req.fromCreateAt = selected.startCreateAt * 1
    if (selected.endCreateAt) req.toCreateAt = selected.endCreateAt * 1
    req.page = page;
    req.size = 30;

    if (pathname.includes("talent-pool-manager")) {
      req.talentPool = props.idTalentPool
      props.getListProfile(req);
      props.getDetailTalentPool({id: props.idTalentPool})

    } else if (pathname.includes("recruitment-manager")) {
      req.recruitment = props.idRecruitment
      req.statusCV = props.idProcess
      props.getListProfile(req);

    } else if (pathname.includes("blacklist-manager")) {
      req.blackList = "blacklist"
      props.getListProfile(req);

    } else {
      req.key = "recruitment"
      props.getListProfile(req)
    }
  }

  function onSearchJob(value: any) {
    getListJobApi({name: value}).then((rs: any) => {
      setJob([...rs.rows])
    })
  }

  function onFocusJob() {
    setJob(props.listJob.rows)
  }

  function onSearchJobLevel(value: any) {
    getListJobLevelApi({name: value}).then((rs: any) => {
      setJobLevel([...rs.rows])
    })
  }

  function onFocusJobLevel() {
    setJobLevel(props.listJobLevel.rows)
  }

  function onSearchRecruitment(value: any) {
    getListRecruitmentApi({keySearch: value}).then((rs: any) => {
      setRecruitment([...rs.rows])
    })
  }

  function onFocusRecruitment() {
    setRecruitment(props.listRecruitment.rows)
  }

  function onSearchTalentPool(value: any) {
    getListTalentPoolApi({name: value}).then((rs: any) => {
      setTalentPool([...rs.rows])
    })
  }

  function onFocusTalentPool() {
    setJob(props.listTalentPool.rows)
  }

  function onChangeDateRange(dates: any) {
    if (dates) {
      dates[0]?.set({hour: 0, minute: 0, second: 0})
      dates[1]?.set({hour: 23, minute: 59, second: 59})
      let [start, end] = [dates[0], dates[1]];
      // setValueDateRange([start, end])

      setSelected({...selected, startDateRange: start, endDateRange: end})

    }
  }

  function onChangeCreateAt(dates: any) {
    if (dates) {
      dates[0]?.set({hour: 0, minute: 0, second: 0})
      dates[1]?.set({hour: 23, minute: 59, second: 59})
      let [start, end] = [dates[0], dates[1]];
      // setValueDateRange([start, end])
      setSelected({...selected, startCreateAt: start, endCreateAt: end})
    }
  }

  function onSearchPIC(value: any) {
    getListAccountApi({name: value}).then((rs: any) => {
      setAccount({...account, pic: rs.rows})
    })
  }

  function onFocusPIC() {
    setAccount({
      ...account,
      pic: props.listAccount.rows,
    })
  }

  function onSearchPresenter(value: any) {
    getListAccountApi({name: value}).then((rs: any) => {
      setAccount({...account, presenter: rs.rows})
    })
  }

  function onFocusPresenter() {
    setAccount({
      ...account,
      presenter: props.listAccount.rows,
    })
  }

  function onChange(value: any) {
    setSelected({...selected, department: value})
  };

  const filterTreeNode = (input: any, node: any) => {
    const title = node.props.title;
    return title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <>
      <div>
        <Popover onVisibleChange={onVisibleChange}
                 visible={visibleSelect}
                 placement="right"
                 content={content}
                 overlayStyle={{width: "20%"}}
                 trigger="click">
          <Button><Icon type="setting"/> Config Fields</Button>

        </Popover>

      </div>
      {arrayUrl.some((item: any) => pathname.includes(item)) ? (
        <>
          <div>
            {keySearch ?
              <div style={{marginLeft: 15}}>
                <span>Kết quả tìm kiếm cho: </span>
                <span
                  className="c-search-profile"
                >
              {keySearch}
            </span>
                <a style={{color: "black", fontStyle: "italic"}} onClick={onBtnResetClicked}>x</a>
              </div>
              : null}

            <br/>

            <div className="c-filter-profile">
              {checkSelect.checkedList.includes("name") && <div style={{width: 200, display: "inline-block"}}>
                <Search
                  value={selected.name}

                  onChange={e => {
                    setSelected({...selected, name: e.target.value});
                  }}
                  onSearch={btnSearchClicked}
                  placeholder="Họ tên"/>
              </div>}

              {checkSelect.checkedList.includes("job") &&
              <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                      className="bg-white text-black form-label"
                      style={{...width, ...fontWeightStyle}}
                      placeholder="Vị trí công việc"
                value={selected.job ? selected.job : undefined}
                      onChange={(value: any) => setSelected({...selected, job: value})}
                      onSearch={onSearchJob}
                      onFocus={onFocusJob}
                      filterOption={false}
                      showSearch
              >
                {job?.map((item: any, index: any) => (
                  <Option key={index} value={item.id}>{item.name}</Option>
                ))}
              </Select>}

              {checkSelect.checkedList.includes("jobLevel") &&
              <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                      className="bg-white text-black form-label"
                      style={{...width, ...fontWeightStyle}}
                      value={selected.jobLevel ? selected.jobLevel : undefined}
                      onChange={(value: any) => setSelected({
                        ...selected,
                        jobLevel: value
                      })}
                      placeholder="Cấp bậc công việc"
                      onSearch={onSearchJobLevel}
                      onFocus={onFocusJobLevel}
                      filterOption={false}
                      showSearch
              >
                {jobLevel?.map((item: any, index: any) => (
                  <Option key={index} value={item.id}>{item.name}</Option>
                ))}
              </Select>}

              {checkSelect.checkedList.includes("department") && <TreeSelect
                style={{...width, ...fontWeightStyle}}
                showSearch
                allowClear
                value={selected.department ? selected.department : undefined}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                className="bg-white text-black form-label"
                onChange={onChange}
                getPopupContainer={(trigger: any) => trigger.parentNode}
                filterTreeNode={filterTreeNode}
                placeholder="Phòng ban"
              >
                {props.listDepartment.rows?.map((item: any) => (
                  <TreeNode style={fontWeightStyle} value={item.id} title={item.name} key={item.id}>
                    {item.children ? item.children?.map((el: any) => (
                      <TreeNode style={fontWeightStyle} value={el.id} key={el.id} title={el.name}/>
                    )) : null}
                  </TreeNode>

                ))}

              </TreeSelect>}

              {checkSelect.checkedList.includes("talentPool") ? pathname.includes("talent-pool-manager") ?
                null
                :
                <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                        value={selected.talentPool ? selected.talentPool : undefined}
                        onChange={(value: any) => setSelected({...selected, talentPool: value})}
                        placeholder="Talent Pools"
                        onSearch={onSearchTalentPool}
                        onFocus={onFocusTalentPool}
                        className="bg-white text-black form-label"
                        style={{...width, ...fontWeightStyle}}
                        filterOption={false}
                        showSearch
                >
                  {talentPool?.map((item: any, index: any) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                  ))}
                </Select>
                : null}

              {checkSelect.checkedList.includes("recruitment") ?
                pathname.includes("recruitment-manager") ?
                  null
                  :
                  <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                          className="bg-white text-black form-label"
                          style={{...width, ...fontWeightStyle}}
                          value={selected.recruitment ? selected.recruitment : undefined}
                          onChange={(value: any) => setSelected({...selected, recruitment: value})}
                          placeholder="Tin tuyển dụng"
                          onSearch={onSearchRecruitment}
                          onFocus={onFocusRecruitment}
                          filterOption={false}
                          showSearch
                  >
                    {recruitment?.map((item: any, index: any) => (
                      <Option key={index} value={item.id}
                              label={item.title}>[{item.departmentName}] {item.title}</Option>
                    ))}
                  </Select> : null}

              {checkSelect.checkedList.includes("hrRef") &&
              <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                      onSearch={onSearchPresenter}
                      onFocus={onFocusPresenter}
                      filterOption={false}
                      showSearch
                      className="bg-white text-black form-label"
                      style={{width: "200px", ...fontWeightStyle}}
                      onChange={e => {
                        setSelected({...selected, hrRef: e});
                      }}
                      placeholder="Chọn người giới thiệu">
                <Option key={"none"} value={""} label={"<None>"}>
                  <div>&lt;None&gt;</div>
                </Option>
                {account.presenter?.map((item: any, index: any) => (
                  <Option key={index} value={item.username} label={item.fullName}>
                    <div className="flex-items-center" style={{paddingTop: 5}}>
                      <div style={{marginRight: 10}}>
                        <Avatar src={item.image ? item.image : "#"}
                                style={{backgroundColor: item?.avatarColor, marginRight: 5}}>
                          {getInitials(item.fullName)}
                        </Avatar>
                      </div>
                      <div className="c-list-profile" style={{fontWeight: 500}}>
                        <div style={{height: 25}}>{item.fullName}</div>
                        <div style={{height: 25}} className="more-information">{item.email}</div>
                      </div>
                    </div>
                  </Option>
                ))}
              </Select>}

              {checkSelect.checkedList.includes("pic") &&
              <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                      onSearch={onSearchPIC}
                      onFocus={onFocusPIC}
                      filterOption={false}
                      showSearch
                      onChange={e => {
                        setSelected({...selected, pic: e});
                      }}
                      className="bg-white text-black form-label"
                      style={{width: "200px", ...fontWeightStyle}}
                      optionLabelProp="label"
                      placeholder="Chọn HR phụ trách">
                <Option key={"none"} value={""} label={"<None>"}>
                  <div>&lt;None&gt;</div>
                </Option>
                {account.pic?.map((item: any, index: any) => (
                  <Option key={index} value={item.username} label={item.fullName}>
                    <div className="flex-items-center" style={{paddingTop: 5}}>
                      <div style={{marginRight: 10}}>
                        <Avatar src={item.image ? item.image : "#"}
                                style={{backgroundColor: item?.avatarColor, marginRight: 5}}>
                          {getInitials(item.fullName)}
                        </Avatar>
                      </div>
                      <div className="c-list-profile" style={{fontWeight: 500}}>
                        <div style={{height: 25}}>{item.fullName}</div>
                        <div style={{height: 25}} className="more-information">{item.email}</div>
                      </div>
                    </div>
                  </Option>
                ))}
              </Select>}

              {checkSelect.checkedList.includes("dateRange") && <RangePicker
                style={{width: 250}}
                format={dateFormat}
                value={[selected.startDateRange, selected.endDateRange]}
                // allowClear={false}
                ranges={{
                  'Hôm nay': [moment(), moment()],
                  'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                }}
                placeholder={["Ngày nộp hồ sơ", "Ngày nộp hồ sơ"]}
                onChange={onChangeDateRange}
              />}
              {checkSelect.checkedList.includes("createAt") && <RangePicker
                style={{width: 250}}
                format={dateFormat}
                value={[selected.startCreateAt, selected.endCreateAt]}
                // allowClear={false}
                ranges={{
                  'Hôm nay': [moment(), moment()],
                  'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                }}
                placeholder={["Ngày tạo", "Ngày tạo"]}
                onChange={onChangeCreateAt}
              />}

              <Button type="primary" style={width}
                      onClick={btnSearchClicked}
              >Tìm kiếm</Button>

              <Button style={width} onClick={clearAll}>Reset</Button>

            </div>

          </div>
          <br/>
        </>
      ) : null}

      <Table
        scroll={{x: "1500px", y: screenHeight < env.desktopHeight ? "450px" : "638px"}}
        className="custom-table -webkit-scrollbar"
        dataSource={dataSource ? dataSource.rowsSearchFull : list?.rows}
        columns={columns}
        rowKey="id"
        size="small"
        bordered
        onChange={handleChange}
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: dataSource ? dataSource.totalSearchFull : list?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
      <BookingForm/>
      <UpdateProfileForm/>
      <UploadCVForm/>
      <UpdateProfileForm/>

      {getBooking.loading ||
      list.loading ||
      deleteProfile.loading ||
      update.loading ||
      uploadCV.loading ||
      createBooking.loading ||
      updateBooking.loading ?
        <Loading/> : null}
    </>
  );

}

export default connector(ListProfile);
