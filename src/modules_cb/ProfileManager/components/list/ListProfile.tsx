import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Avatar, Button, Icon, Input, Popconfirm, Select, Table, Tooltip, Badge, TreeSelect} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteProfile,
  getElasticSearch,
  getListProfile,
  showFormBooking,
  showFormCreate,
  showFormDetail,
  showFormUpdate,
  showFormUploadCV
} from "../../redux/actions";
import {DataShowBooking, DeleteProfileRequest, DetailCV, ProfileEntity} from "../../types";
import moment from "moment";
import {GiFemale, GiMale, ImPhoneHangUp} from "react-icons/all";
import {getListJobLevel} from "../../../JobLevelManager/redux/actions";
import {getListJob} from "../../../JobManager/redux/actions";
import {getListSourceCV} from "../../../SourceCVManager/redux/actions";
import {getListDepartment} from "../../../DepartmentManager/redux/actions";
import {getListTalentPool} from "../../../TalentPoolManager/redux/actions";
import {useHistory} from "react-router-dom";
import {getListSchool} from "../../../SchoolManager/redux/actions";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  list: state.profileManager.list,
  showDetail: state.profileManager.showForm.show_detail?.show_detail,
  detail: state.profileManager.detail,
  listSourceCV: state.sourcecvManager.list,
  listJobLevel: state.joblevelManager.list,
  listDepartment: state.departmentManager.list,
  listTalentPool: state.talentPoolManager.list,
  listJob: state.jobManager.list,
  elasticSearch: state.profileManager.search,
})
const connector = connect(mapStateToProps, {
  getListProfile,
  deleteProfile,
  showFormCreate,
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
  getListSchool
});

type ReduxProps = ConnectedProps<typeof connector>;

interface ListProfileProps extends ReduxProps {
}

function ListProfile(props: ListProfileProps) {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const size = 30;
  const [state, setState] = useState<any>(
    {
      filteredInfo: null,
      sortedInfo: {
        order: null,
        columnKey: null,
      },
    }
  );
  const [selected, setSelected] = useState<any>({
    name: null,
    job: null,
    jobLevel: null,
    department: null,
    talentPool: null,
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
            <Avatar icon={record.image ? null : "user"} src={record.image ? record.image : "#"}/>
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
      render: (text, record) =>{
        return <div>
          {
            record.statusCVName==="APPLY"?<Badge status="default" />:
              record.statusCVName==="INTERVIEW"?<Badge status="processing" />:
                record.statusCVName==="OFFER"?<Badge status="warning" />:
                  record.statusCVName==="HIRED"?<Badge status="success" />:
                    record.statusCVName==="REJECT"?<Badge status="error" />:
                      record.statusCVName==="TEST"?<Badge color="purple" />:null
          }

          <span>{record.statusCVName}</span>
        </div>
      } ,
      sorter: (a, b) => a.statusCVName.length - b.statusCVName.length,
      sortOrder: state.sortedInfo.columnKey === 'statusCVName' && state.sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Công việc',
      dataIndex: 'jobName',
      width: 150,
      key: 'jobName',
      render: (text, record) => <span style={{fontWeight: 500}}>{record.jobName}</span>,
      sorter: (a, b) => a.jobName.length - b.jobName.length,
      sortOrder: state.sortedInfo.columnKey === 'jobName' && state.sortedInfo.order,
      ellipsis: true,
    },
    // {
    //   title: 'Vị trí tuyển dụng',
    //   dataIndex: 'levelJobName',
    //   width: 170,
    //   key: 'levelJobName',
    //   sorter: (a, b) => a.levelJobName.length - b.levelJobName.length,
    //   sortOrder: state.sortedInfo.columnKey === 'levelJobName' && state.sortedInfo.order,
    //   ellipsis: true,
    // },
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
      filters: props.listSourceCV?.rows.map((item: any) => ({
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

  useEffect(() => {
    props.getListJob({page: 1, size: 100});
    props.getListJobLevel({page: 1, size: 100});
    props.getListSourceCV({page: 1, size: 100});
    props.getListTalentPool({page: 1, size: 100});
    props.getListDepartment({page: 1, size: 100});
    props.getListSchool({page: 1, size: 100});
  }, [])

  useEffect(() => {
    props.getListProfile({page: page, size: 30});

  }, [page])

  const convertArrayToTree = (arrays:any)=>{
    let dataFetch:any=[];
    for (let i=0;i<arrays.length;i++){
      if(arrays[i]?.children){
        dataFetch.push({
          title:arrays[i].name,
          key:arrays[i].id,
          value:arrays[i].id,
          children:convertArrayToTree(arrays[i].children)
        })
      }
      else{
        dataFetch.push({
          title:arrays[i].name,
          key:arrays[i].id,
          value:arrays[i].id,
        })
      }
    }
    return dataFetch;
  }

const [treeData,setTreeData]=useState([])
 useEffect(()=>{
   setTreeData(convertArrayToTree(props.listDepartment.rows))
 },[props.listDepartment.rows])

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
    props.showFormUpdate(true, entity);
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

  const [keySearch, setKeySearch] = useState<string>('')

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

  const [dataSource, setDataSource] = useState<ProfileEntity[] | any>(undefined)

  useEffect(() => {
    setDataSource(props.elasticSearch.rowsRs);
    if (props.elasticSearch.request?.key) {
      setKeySearch(props.elasticSearch.request?.key)
    }
  }, [props.elasticSearch.triggerSearch])

  function btnSearchClicked() {
    selected.name ?
      props.getListProfile({
        fullName: selected.name,
        jobId: selected.job,
        levelJobId: selected.jobLevel,
        departmentId: selected.department,
        talentPoolId: selected.talentPool,
        page: 1,
        size: 30,
      })
      :
      props.getListProfile({
        jobId: selected.job,
        levelJobId: selected.jobLevel,
        departmentId: selected.department,
        talentPoolId: selected.talentPool,
        page: 1,
        size: 30,
      })

  }

  return (
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

          <Input style={{display: "inline"}}
                 value={selected.name}
                 onChange={e => setSelected({...selected, name: e.target.value})}

                 placeholder="Họ tên" prefix={<Icon type="search"/>}/>

          <Select style={{width: "13%"}}
                  placeholder="Công việc"
                  value={selected.job ? selected.job : undefined}
                  onChange={(value: any) => setSelected({...selected, job: value})}
          >
            {props.listJob.rows?.map((item: any, index: any) => (
              <Option key={index} value={item.id}>{item.name}</Option>
            ))}
          </Select>

          <Select style={{width: "13%"}}
                  value={selected.jobLevel ? selected.jobLevel : undefined}
                  onChange={(value: any) => setSelected({...selected, jobLevel: value})}
                  placeholder="Vị trí tuyển dụng"
          >
            {props.listJobLevel.rows?.map((item: any, index: any) => (
              <Option key={index} value={item.id}>{item.name}</Option>
            ))}
          </Select>

          <TreeSelect
            style={{ width: "13%" }}
            value={selected.department ? selected.department : undefined}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="Phòng ban"
            treeDefaultExpandAll
            onChange={(value: any) => setSelected({...selected, department: value})}
          />

          <Select
            style={{
              width: "13%"
            }}
            value={selected.talentPool ? selected.talentPool : undefined}
            onChange={(value: any) => setSelected({...selected, talentPool: value})}
            placeholder="Talent Pools"
          >
            {props.listTalentPool.rows?.map((item: any, index: any) => (
              <Option key={index} value={item.id}>{item.name}</Option>
            ))}
          </Select>

          <Button type="primary" style={{
            width: "13%"
          }}
                  onClick={btnSearchClicked}
          >Tìm kiếm</Button>

          <Button style={{
            width: "13%"
          }} onClick={clearAll}>Reset</Button>

        </div>

      </div>
      <br/>

      <Table
        scroll={{x: "1500px", y: "600px"}}
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

    </>
  );

}

export default connector(ListProfile);
