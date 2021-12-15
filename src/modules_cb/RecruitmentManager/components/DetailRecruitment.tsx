import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Icon,
  Menu,
  Popconfirm,
  Popover,
  Select,
  Table,
  Tabs,
  Tooltip,
  TreeSelect
} from "antd";
import {emptyText} from "src/configs/locales";
import moment from "moment";
import {BsDot, GiFemale, GiMale, ImArrowLeft2, ImPhoneHangUp} from "react-icons/all";
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
import KanBanProcess from "./KanBanProcess";
import {getDataCard} from "./kanbanComponent/Data";

const {Option} = Select;
const {TabPane} = Tabs;

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
  const [visiblePopover, setVisiblePopover] = useState<boolean>(false);
  const content = (<ul style={{width: 160}} className="popup-popover">
    <li>
      <a>Sửa tin</a>
    </li>
    <li>
      <a>Nhân bản</a>
    </li>
    <li>
      <a>Chia sẻ</a>
    </li>
    <li>
      <a>Xem tin tuyển dụng</a>
    </li>
    <li>

      <Popconfirm
        title="Bạn muốn xóa tin tuyển dụng này chứ ?"
        okText="Xóa"
        onCancel={event => {
          event?.stopPropagation();
        }}
        onConfirm={event => handleDelete1(event)}
      >
        <a
          onClick={event => {
            event.stopPropagation();
          }}
        >
          Xóa
        </a>
      </Popconfirm>
    </li>
  </ul>);
  const contentMore = (<div className="content-more">
    <div className="flex-items-center">
      <div className='border-right pr-3'>Người tạo:<span className="bold-text"> Hồ Đức Duy</span></div>
      <div className=" ml-3">Ngày tạo:<span className="bold-text"> 29/11/2021</span></div>
    </div>
    <div className='border-right' style={{width: 200}}>Thời hạn dự kiến: <span className="bold-text"> 29/12/2021</span>
    </div>
  </div>)
  const menu = (
    <Menu className='detail-action'>
      <Menu.Item key="1">
        <div><Icon type="plus"/><span> Thêm hàng loạt</span></div>
      </Menu.Item>
      <Menu.Item key="2">
        <div><Icon type="export"/><span> Xuất Excel</span></div>
      </Menu.Item>
    </Menu>
  );

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

  const handleDelete1 = (event: any) => {
    event.stopPropagation();

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

  const handleVisibleChange = (visible: any) => {
    setVisiblePopover(visible);
  };

  function callback(key: any) {
    console.log(key);
  }
  const quoteMap = {
    alpha: getDataCard(7),
    beta: getDataCard(7)
  };


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

        <Tabs defaultActiveKey="1" className="tab-detail" onChange={callback}>
          <TabPane tab="Ứng viên" className="tab-detail__candidate" key="1" style={{background: "#e8e8e8"}}>
            <KanBanProcess initial={quoteMap} isCombineEnabled/>
            <Table
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
            />
          </TabPane>
          <TabPane tab="Lịch phỏng vấn" key="2" style={{background: "#e8e8e8", marginLeft: 40}}>
            <div className="schedule-tab-detail">

              <ScheduleManagerPages/>
            </div>
          </TabPane>
        </Tabs>

      </div>


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

          <Search style={{display: "inline"}}
                  value={selected.name}
                  onChange={e => setSelected({...selected, name: e.target.value})}
                  onSearch={btnSearchClicked}
                  placeholder="Họ tên"/>

          <Select style={width}
                  placeholder="Công việc"
                  value={selected.job ? selected.job : undefined}
                  onChange={(value: any) => setSelected({...selected, job: value})}
          >
            {props.listJob.rows?.map((item: any, index: any) => (
              <Option key={index} value={item.id}>{item.name}</Option>
            ))}
          </Select>

          <Select style={width}
                  value={selected.jobLevel ? selected.jobLevel : undefined}
                  onChange={(value: any) => setSelected({...selected, jobLevel: value})}
                  placeholder="Vị trí tuyển dụng"
          >
            {props.listJobLevel.rows?.map((item: any, index: any) => (
              <Option key={index} value={item.id}>{item.name}</Option>
            ))}
          </Select>

          <TreeSelect
            style={width}
            value={selected.department ? selected.department : undefined}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={treeData}
            placeholder="Phòng ban"
            treeDefaultExpandAll
            onChange={(value: any) => setSelected({...selected, department: value})}
          />

          <Select
            style={width}
            value={selected.recruitment ? selected.recruitment : undefined}
            onChange={(value: any) => setSelected({...selected, recruitment: value})}
            placeholder="Tin tuyển dụng"
          >
            {props.listRecruitment.rows?.map((item: any, index: any) => (
              <Option key={index} value={item.id}>{item.title}</Option>
            ))}
          </Select>

          <Select
            style={width}
            value={selected.talentPool ? selected.talentPool : undefined}
            onChange={(value: any) => setSelected({...selected, talentPool: value})}
            placeholder="Talent Pools"
          >
            {props.listTalentPool.rows?.map((item: any, index: any) => (
              <Option key={index} value={item.id}>{item.name}</Option>
            ))}
          </Select>

          <Button type="primary" style={width}
                  onClick={btnSearchClicked}
          >Tìm kiếm</Button>

          <Button style={width} onClick={clearAll}>Reset</Button>

        </div>

      </div>
      <br/>


    </>
  );

}

export default connector(DetailRecruitment);
