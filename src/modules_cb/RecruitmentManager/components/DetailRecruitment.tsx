import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {
  Avatar,
  Badge,
  Button, Col,
  Dropdown,
  Icon,
  Layout,
  Menu,
  Popconfirm,
  Popover, Row,
  Select,
  Table,
  Tabs,
  Tooltip
} from "antd";
import moment from "moment";
import {BsDot, GiFemale, GiMale, HiOutlineAdjustments, ImArrowLeft2, ImPhoneHangUp} from "react-icons/all";
import {getListJobLevel} from "../../JobLevelManager/redux/actions";
import {getListJob} from "../../JobManager/redux/actions";
import {getListSourceCV} from "../../SourceCVManager/redux/actions";
import {getListDepartment} from "../../DepartmentManager/redux/actions";
import {getListTalentPool} from "../../TalentPoolManager/redux/actions";
import {Link, useHistory} from "react-router-dom";
import {getListSchool} from "../../SchoolManager/redux/actions";
import Search from "antd/es/input/Search";
import {
  deleteProfile,
  getActivityLogs,
  getElasticSearch,
  getListProfile,
  showFormBooking,
  showFormDetail,
  showFormUploadCV
} from "../../ProfileManager/redux/actions";
import {showFormUpdate} from "../redux/actions";
import {DataShowBooking, DeleteProfileRequest, DetailCV, ProfileEntity} from "../../ProfileManager/types";
import ScheduleManagerPages from "../../ScheduleManager/pages/ScheduleManagerPages";
import KanbanProcess from "./KanbanProcess";
import {emptyText} from "../../../configs/locales";

const {Option} = Select;
const {TabPane} = Tabs;
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

const mapStateToProps = (state: RootState) => ({
  list: state.profileManager.list,
  showDetail: state.profileManager.showForm.show_detail?.show_detail,
  detail: state.profileManager.detail,
  elasticSearch: state.profileManager.search,
  listSourceCV: state.sourcecvManager.list,
  listJobLevel: state.joblevelManager.list,
  listDepartment: state.departmentManager.list,
  listTalentPool: state.talentPoolManager.list,
  listJob: state.jobManager.list,
  listRecruitment: state.recruitmentManager.list,

})
const connector = connect(mapStateToProps, {
  getListProfile,
  deleteProfile,
  showFormUpdate,
  showFormDetail,
  showFormUploadCV,
  showFormBooking,
  getElasticSearch,
  getListJobLevel,
  getListJob,
  getListSourceCV,
  getListDepartment,
  getListTalentPool,
  getListSchool,
  getActivityLogs
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function DetailRecruitment(props: IProps) {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const size = 30;
  const width = {width: "11%"};
  const [state, setState] = useState<any>({
    filteredInfo: null,
    sortedInfo: {
      order: null,
      columnKey: null,
    },
  });
  const [keySearch, setKeySearch] = useState<string>('')
  const [dataSource, setDataSource] = useState<ProfileEntity[] | any>(undefined)
  const [selected, setSelected] = useState<any>({
    name: null,
    job: null,
    jobLevel: null,
    department: null,
    talentPool: null,
    recruitment: null
  })
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
      width: 230,
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
      title: 'Vòng tuyển dụng',
      dataIndex: 'statusCVName',
      width: 150,
      key: 'statusCVName',
      render: (text, record) => {
        return <div>
          {
            record.statusCVName === "APPLY" ? <Badge status="default"/> :
              record.statusCVName === "INTERVIEW" ? <Badge status="processing"/> :
                record.statusCVName === "OFFER" ? <Badge status="warning"/> :
                  record.statusCVName === "HIRED" ? <Badge status="success"/> :
                    record.statusCVName === "REJECT" ? <Badge status="error"/> :
                      record.statusCVName === "TEST" ? <Badge color="purple"/> : null
          }

          <span>{record.statusCVName}</span>
        </div>
      },
      sorter: (a, b) => a.statusCVName.length - b.statusCVName.length,
      sortOrder: state.sortedInfo.columnKey === 'statusCVName' && state.sortedInfo.order,
      ellipsis: true,
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
      title: 'Tin tuyển dụng',
      dataIndex: 'recruitmentName',
      width: 170,
      key: 'recruitmentName',
      sorter: (a, b) => a.recruitmentName.length - b.recruitmentName.length,
      sortOrder: state.sortedInfo.columnKey === 'recruitmentName' && state.sortedInfo.order,
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
      title: 'CV',
      dataIndex: 'cv',
      width: 150,
      key: 'cv',
      render: (text, record) => <a className="cv-overflow" href={record.urlCV} target="_blank">{record.cv}</a>
    },
    {
      title: 'Nguồn CV',
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
    {
      title: 'HR Ref',
      dataIndex: 'hrRef',
      width: 160,
      key: 'hrRef',
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'dateOfApply',
      width: 120,
      key: 'dateOfApply',
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY');
      },
      sorter: (a, b) => a.talentPoolName.length - b.talentPoolName.length,
      sortOrder: state.sortedInfo.columnKey === 'talentPoolName' && state.sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Loại CV',
      dataIndex: 'cvType',
      width: 100,
      key: '14',
    },
    {
      title: 'Năm sinh',
      dataIndex: 'dateOfBirth',
      width: 100,
      key: '3',
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY');
      },
    },

    {
      title: 'Quê quán',
      dataIndex: 'hometown',
      width: 200,
      key: '4',
      ellipsis: true

    },
    {
      title: 'Trường học',
      dataIndex: 'schoolName',
      width: 200,
      key: '5',
      ellipsis: true
    },

    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 170,
      // fixed: 'right',
      render: (_text: string, record: ProfileEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa Profile này chứ ?"
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={event => handleDelete(event, record)}
            >
              <Tooltip placement="top" title="Xóa">
                <Button
                  size="small"
                  className="ant-btn ml-1 mr-1 ant-btn-sm"
                  onClick={event => {
                    event.stopPropagation();
                  }}
                >
                  <Icon type="delete" theme="filled"/>
                </Button>
              </Tooltip>

            </Popconfirm>

            <Tooltip placement="top" title="Sửa">
              <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                      onClick={event => handleEdit(event, record)}
              >
                <Icon type="edit"/>
              </Button>
            </Tooltip>

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
  const [treeData, setTreeData] = useState([])
  const contentMore = (<div className="content-more">
    <div className="flex-items-center">
      <div className='border-right pr-3'>Người tạo:<span className="bold-text"> Hồ Đức Duy</span></div>
      <div className=" ml-3">Ngày tạo:<span className="bold-text"> 29/11/2021</span></div>
    </div>
    <div className='border-right' style={{width: 200}}>Thời hạn dự kiến: <span className="bold-text"> 29/12/2021</span>
    </div>
  </div>)
  const menu = (<Menu className='detail-action'>
    <Menu.Item key="1">
      <div><Icon type="plus"/><span> Thêm hàng loạt</span></div>
    </Menu.Item>
    <Menu.Item key="2">
      <div><Icon type="export"/><span> Xuất Excel</span></div>
    </Menu.Item>
  </Menu>);

  useEffect(() => {
    setTreeData(convertArrayToTree(props.listDepartment.rows))
  }, [props.listDepartment.rows])

  useEffect(() => {
    props.getListProfile({page: page, size: 30});

  }, [page])

  useEffect(() => {
    document.title = "Chi tiết tin tuyển dụng";
  }, [document.title]);

  useEffect(() => {
    setDataSource(props.elasticSearch.rowsRs);
    if (props.elasticSearch.request?.key) {
      setKeySearch(props.elasticSearch.request?.key)
    }
  }, [props.elasticSearch.triggerSearch])

  const getInitials = (name: string) => {
    let initials: any = name.split(' ');

    if (initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 2);
    }
    return initials.toUpperCase();
  }

  const convertArrayToTree = (arrays: any) => {
    let dataFetch: any = [];
    for (let i = 0; i < arrays.length; i++) {
      if (arrays[i]?.children) {
        dataFetch.push({
          title: arrays[i].name,
          key: arrays[i].id,
          value: arrays[i].id,
          children: convertArrayToTree(arrays[i].children)
        })
      } else {
        dataFetch.push({
          title: arrays[i].name,
          key: arrays[i].id,
          value: arrays[i].id,
        })
      }
    }
    return dataFetch;
  }

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
      job: null,
      jobLevel: null,
      department: null,
      talentPool: null,
      recruitment: null
    })
    props.getListProfile({page: 1, size: 30});
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
    event.stopPropagation();
    props.showFormUpdate(true);
  }

  const handleBooking = (event: any, entity: ProfileEntity) => {
    event.stopPropagation();
    let req: DataShowBooking = {
      id: entity.id,
      fullName: entity.fullName
    }
    props.showFormBooking(true, req);
  }

  const handleUploadCV = (e: any, entity: ProfileEntity) => {
    e.stopPropagation();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormUploadCV(true, entity.id);
  }

  const handleDetail = (e: any, entity: ProfileEntity) => {
    e.stopPropagation();
    // setId(entity.id);

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
    setKeySearch('')
    props.getListProfile({page: 1, size: 100});
  }

  function btnSearchClicked() {
    props.getListProfile({
      fullName: selected.name,
      job: selected.job,
      levelJob: selected.jobLevel,
      department: selected.department,
      talentPool: selected.talentPool,
      recruitment: selected.recruitment,
      page: 1,
      size: 30,
    })
  }

  function callback(key: any) {
    console.log(key);
  }

  const operations = <Select className="tab-operator" defaultValue={"Công khai"}>
    <Option key={1} value={"Công khai"}>Công khai</Option>
    <Option key={2} value={"Nội bộ"}>Nội bộ</Option>
    <Option key={3} value={"Ngưng nhận hồ sơ"}>Ngưng nhận hồ sơ</Option>
    <Option key={4} value={"Đóng"}>Đóng</Option>
  </Select>;

  const [visibleType, setVisibleType] = useState<string>('list')

  function candidateListClicked() {
    setVisibleType("list")
  }

  function candidateKanbanClicked() {
    setVisibleType("kanban")
  }

  const [col,setCol]=useState({
    list:24,
    filter:0,
  })

  function onOpenFilterClicked() {
    setCol({
      list:19,
      filter:5,
    })
  }

  function onCloseFilterClicked() {
    setCol({
      list:24,
      filter:0,
    })
  }

  return (
    <>
      <div>
        <div className="header-box header-detail">
          <Link to={`/recruitment-manager`} style={{marginRight: 10, paddingTop: 5, color: "black"}}>
            <ImArrowLeft2 size={20}/>
          </Link>
          <div className="header-box-main">
            <span className="p">Business Analysis</span> <Link
            to={`/recruitment-manager/edit`}><Icon type={"edit"}
                                                   style={{fontSize: "150%", marginLeft: 15}}></Icon></Link>
            <div className="detail-flex">
              <div>Business Analysis</div>
              <div><BsDot size={20}/></div>
              <div className="p">444</div>

              <div className="ml-3">SL cần tuyển:</div>
              <div className="p">1</div>

              <div className="ml-3">Hạn nộp hồ sơ:</div>
              <div className="p">28/01/2022</div>

              <Popover content={contentMore} trigger="click">
                <a className="ml-3">Xem thêm</a>
              </Popover>
            </div>
          </div>
          <div>
            <Dropdown.Button overlay={menu} style={{marginBottom: 15}} type="primary">Thêm ứng viên</Dropdown.Button>

          </div>
        </div>

        <Tabs defaultActiveKey="1" className="tab-detail" onChange={callback} tabBarExtraContent={operations}>
          <TabPane tab="Ứng viên" className="tab-candidate-detail" key="1" style={{background: "#e8e8e8"}}>
            <Layout className="layout-candidate-detail">
              <Header className="header-candidate-detail flex-items-start">
                <Button size="large" className={visibleType === 'list' ? "icon-list is-active" : "icon-list"}
                        onClick={candidateListClicked}><Icon type="unordered-list" style={{fontSize: "150%"}}/></Button>
                <Button size="large" className={visibleType === 'kanban' ? "is-active" : undefined}
                        onClick={candidateKanbanClicked}><Icon type="project" style={{fontSize: "150%"}}/></Button>

                <div className="search-wrap">
                  <Search
                    value={selected.name}
                    onChange={e => setSelected({...selected, name: e.target.value})}
                    onSearch={btnSearchClicked}
                    placeholder="Tìm kiếm nhanh"/>
                </div>

                <Button onClick={onOpenFilterClicked} className="ml-2" size={"large"}><HiOutlineAdjustments className="mr-1"/>Bộ lọc</Button>
                <Button className="ml-2" size={"large"}><Icon type="export" className="mr-1"/>Xuất dữ liệu</Button>
              </Header>

              <Content>
                <Row gutter={16}>
                  <Col span={col.list} >
                    {visibleType === 'list' ? <Table
                        scroll={{x: "1500px", y: "638px"}}
                        className="custom-table -webkit-scrollbar"
                        dataSource={dataSource ? dataSource : props.list.rows}
                        columns={columns}
                        rowKey="id"
                        size="small"
                        bordered
                        onChange={handleChange}
                        locale={{emptyText: emptyText}}
                        pagination={{
                          current: page,
                          pageSize: size,
                          total: dataSource ? dataSource.length : props.list.total,
                          onChange: value => setPage(value),
                          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
                        }}
                      /> :
                      <KanbanProcess/>
                    }
                  </Col>
                  <Col span={col.filter}><div className="filter-recruitment">
                    <div className="flex-space-between">
                      <div className="font-20-bold-600">Bộ lọc</div>
                      <div><Icon onClick={onCloseFilterClicked} type="close" className="font-20-bold-500" /></div>
                    </div>
                    <div className={"button-filter"}>
                      <Button className={"mr-2"} >Bỏ lọc</Button>
                      <Button type={"primary"}>Áp dụng</Button>
                    </div>
                  </div></Col>
                </Row>

              </Content>
            </Layout>
          </TabPane>

          <TabPane tab="Lịch phỏng vấn" key="2" style={{background: "#e8e8e8", marginLeft: 40}}>
            <div className="schedule-tab-detail">
              <ScheduleManagerPages/>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );

}

export default connector(DetailRecruitment);
