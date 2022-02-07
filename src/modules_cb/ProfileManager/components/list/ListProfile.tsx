import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Avatar, Badge, Button, Icon, Popconfirm, Select, Table, Tooltip, TreeSelect} from "antd";
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
import moment from "moment";
import {GiFemale, GiMale, ImPhoneHangUp} from "react-icons/all";
import {useHistory, useLocation} from "react-router-dom";
import Search from "antd/es/input/Search";
import {getDetailTalentPool} from "../../../TalentPoolManager/redux/actions";
import BookingForm from "../BookingForm";
import Loading from "../../../../components/Loading";
import UpdateProfileForm from "../UpdateProfileForm";
import UploadCVForm from "../UploadCVForm";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  showDetail: state.profileManager.showForm.show_detail?.show_detail,
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
  resetSearch,
  getDetailTalentPool
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
  const {search,list,getBooking, deleteProfile, update, uploadCV, createBooking, updateBooking}=props.profileManager
  const history = useHistory();
  const {pathname} = useLocation();
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
  const [dataID, setDataID] = useState<any>({});
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
    {
      title: 'Người giới thiệu',
      dataIndex: 'hrRef',
      width: 160,
      key: 'hrRef',
      render: (text: string, record: ProfileEntity) => {
        return <div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{fontWeight: 500}}>{record.hrRef}</span>
          </div>
          <div>
            <span style={{color: "#B2B2B2"}}>{record.mailRef}</span>
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
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY');
      },
      sorter: (a, b) => a.talentPoolName.length - b.talentPoolName.length,
      sortOrder: state.sortedInfo.columnKey === 'talentPoolName' && state.sortedInfo.order,
      ellipsis: true,
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

  useEffect(() => {
    setTreeData(convertArrayToTree(props.listDepartment.rows))
  }, [props.listDepartment.rows])

  useEffect(() => {
    props.setDataID(selected)
  },[selected])

  useEffect(() => {
    if (pathname.includes("recruitment-manager")) props.getListProfile({
      recruitment: props.idRecruitment,
      statusCV: props.idProcess,
      page: page,
      size: 30
    });
    else if (pathname.includes("talent-pool-manager")) {
      props.getListProfile({
        talentPool: props.idTalentPool,
        page: page,
        size: 30
      });
      props.getDetailTalentPool({id: props.idTalentPool})

    } else props.getListProfile({page: page, size: 30});
  }, [page, pathname])

  useEffect(() => {
    if (search.request?.key) {
      setDataSource(search);
      setKeySearch(search.request?.key)
    }
  }, [search.rowsSearchFull])

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
    });
    // props.setDataID({
    //   job: null,
    //   jobLevel: null,
    //   department: null,
    //   talentPool: null,
    //   recruitment: null
    // })
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
    props.showFormUpdate(true, entity);
  }

  const handleBooking = (event: any, entity: ProfileEntity) => {
    let req: DataShowBooking = {
      id: entity.id,
      fullName: entity.fullName,
      idRecruitment: entity.recruitmentId,
      username:entity.username,
    }
    props.showFormBooking(true, req);
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
    props.getListProfile({page: 1, size: 100});
  }

  function btnSearchClicked() {
    setDataID(selected);
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

  return (
    <>
      {pathname === '/profile-manager' ? (
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

              <Search style={{display: "inline"}}
                      value={selected.name}
                      onChange={e => {
                        setSelected({...selected, name: e.target.value});
                        // props.setDataID({...selected, name: e.target.value})
                      }}
                      onSearch={btnSearchClicked}
                      placeholder="Họ tên"/>

              <Select style={width}
                      placeholder="Vị trí công việc"
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
                      placeholder="Cấp bậc công việc"
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
      ) : null}

      <Table
        scroll={{x: "1500px", y: "638px"}}
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
