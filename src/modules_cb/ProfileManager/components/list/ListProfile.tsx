import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Avatar, Badge, Button, Form, Icon, Popconfirm, Table, Tooltip} from "antd";
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
import {FormComponentProps} from "antd/lib/form";
import {GiFemale, GiMale, ImPhoneHangUp} from "react-icons/all";
import {getListJobLevel} from "../../../JobLevelManager/redux/actions";
import {getListJob} from "../../../JobManager/redux/actions";
import {getListSourceCV} from "../../../SourceCVManager/redux/actions";
import {getListDepartment} from "../../../DepartmentManager/redux/actions";
import {getListTalentPool} from "../../../TalentPoolManager/redux/actions";


const mapStateToProps = (state: RootState) => ({
  list: state.profileManager.list,
  showDetail: state.profileManager.showForm.show_detail?.show_detail,
  detail: state.profileManager.detail,
  listSourceCV: state.sourcecvManager.list,
  listJobLevel: state.joblevelManager.list,
  listDepartment:state.departmentManager.list,
  listTalentPool:state.talentPoolManager.list,
  listJob:state.jobManager.list,

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
  getListTalentPool
});

type ReduxProps = ConnectedProps<typeof connector>;

interface ListProfileProps extends FormComponentProps, ReduxProps {
  locationState: any,
}

function ListProfile(props: ListProfileProps) {
  console.log("locationState:", props.locationState)
  const [page, setPage] = useState(1);
  const size = 30;
  const [dataSource, setDataSource] = useState<ProfileEntity | any>(undefined)
  const [state, setState] = useState<any>(
    {
      filteredInfo: null,
      sortedInfo: {
        order: null,
        columnKey: null,
      },
    }
  );
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
      width: 200,
      key: 'fullName',
      fixed: "left",
      render: (text: string, record: ProfileEntity) => {
        return <div>
                  <span style={{marginRight: 24}}>
                    <Badge count={1}>
                      <Avatar icon={record.image ? null : "user"} src={record.image ? record.image : "#"}/>
                    </Badge>
                  </span>
          <a className="c-list-profile" style={{marginRight: "1px"}}
             onClick={event => handleDetail(event, record)}><span>{text}</span></a>
          {record.gender === "Nam" ? <GiMale/> : <GiFemale/>}
        </div>
      }
    },

    {
      title: 'Thông tin liên hệ',
      width: 200,
      fixed: props.showDetail ? undefined : "left",
      key: 'contact',
      render: (text: string, record: ProfileEntity) => {
        return <div>
          <p>
            <Icon type="mail" className="mr-1"/>
            <span>{record.email}</span>
          </p>
          <p>
            <ImPhoneHangUp className="mr-1"/>
            <span>{record.phoneNumber}</span>
          </p>
        </div>
      }
    },
    {
      title: 'Công việc',
      dataIndex: 'jobName',
      width: 120,
      key: 'jobName',
      render: (text, record) => <span style={{fontWeight: 500}}>{record.jobName}</span>,
      filters: props.listJob?.rows.map((item: any) => ({
        text: item.name,
        value: item.name
      }))
      ,
      filteredValue: state.filteredInfo?.jobName || null,
      onFilter: (value, record) => record.jobName.includes(value),
      sorter: (a, b) => a.jobName.length - b.jobName.length,
      sortOrder: state.sortedInfo.columnKey === 'jobName' && state.sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'levelJobName',
      width: 170,
      key: 'levelJobName',
      filters: props.listJobLevel?.rows.map((item: any) => ({
        text: item.name,
        value: item.name
      }))
      ,
      filteredValue: state.filteredInfo?.levelJobName || null,
      onFilter: (value, record) => record.levelJobName.includes(value),
      sorter: (a, b) => a.levelJobName.length - b.levelJobName.length,
      sortOrder: state.sortedInfo.columnKey === 'levelJobName' && state.sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Phòng ban',
      dataIndex: 'departmentName',
      width: 150,
      key: 'departmentName',
      filters: props.listDepartment?.rows.map((item: any) => ({
        text: item.name,
        value: item.name
      }))
      ,
      filteredValue: state.filteredInfo?.departmentName || null,
      onFilter: (value, record) => record.departmentName.includes(value),
      sorter: (a, b) => a.departmentName.length - b.departmentName.length,
      sortOrder: state.sortedInfo.columnKey === 'departmentName' && state.sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'CV',
      dataIndex: 'cv',
      width: 200,
      key: 'cv',
      render: (text, record) => <a className="cv-overflow" href={record.urlCV} target="_blank">{record.cv}</a>
    },
    {
      title: 'Nguồn CV',
      dataIndex: 'sourceCVName',
      width: 120,
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
      filters: props.listTalentPool?.rows.map((item: any) => ({
        text: item.name,
        value: item.name
      }))
      ,
      filteredValue: state.filteredInfo?.talentPoolName || null,
      onFilter: (value, record) => record.talentPoolName.includes(value),
      sorter: (a, b) => a.talentPoolName.length - b.talentPoolName.length,
      sortOrder: state.sortedInfo.columnKey === 'talentPoolName' && state.sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'HR Ref',
      dataIndex: 'hrRef',
      width: 100,
      key: 'hrRef',
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'dateOfApply',
      width: 110,
      key: 'dateOfApply',
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY');
      },
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
    },
    {
      title: 'Trường học',
      dataIndex: 'schoolName',
      width: 200,
      key: '5',
    },

    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
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
    props.getListProfile({page: 1, size: 100});
    props.getListJob({page: 1, size: 100});
    props.getListJobLevel({page: 1, size: 100});
    props.getListSourceCV({page: 1, size: 100});
    props.getListTalentPool({page: 1, size: 100});
    props.getListDepartment({page: 1, size: 100});
  }, [])

  useEffect(() => {
    setDataSource(props.locationState?.rows);
  }, [props.locationState])

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  const clearFilters = () => {
    setState({...state, filteredInfo: null});
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: {
        order: null,
        columnKey: null,
      },
    });
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

  function onBtnResetClicked() {
    setDataSource(undefined);
    setState({
      filteredInfo: null,
      sortedInfo: {
        order: null,
        columnKey: null,
      },
    });
    props.getListProfile({page: 1, size: 100});
  }


  return (
    <>
      <Form style={{display: "flex", flexWrap: "wrap"}}>

        <Button style={{

          margin: "0 10px 0 0 ",
        }} onClick={clearFilters}>Clear filters</Button>

        <Button style={{

          margin: "0 10px 0 0 ",
        }} onClick={clearAll}>Clear filters and sorters</Button>

        <Button
          style={{
            width: "115px",
          }}
          type="danger"
          onClick={onBtnResetClicked}>
          Reset All
        </Button>
      </Form>

      <br/>

      <Table
        scroll={{x: 1500}}
        className="custom-table -webkit-scrollbar"
        dataSource={dataSource !== undefined ? dataSource : props.list.rows}
        columns={columns}
        rowKey="id"
        onChange={handleChange}
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: dataSource !== undefined ? dataSource.length : props.list.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(Form.create<ListProfileProps>()(ListProfile));
