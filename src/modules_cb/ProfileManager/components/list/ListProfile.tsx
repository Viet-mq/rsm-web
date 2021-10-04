import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, DatePicker, Icon, Input, Popconfirm, Select, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteProfile,
  getDetailProfile,
  getListProfile,
  showFormCreate,
  showFormDetail,
  showFormUpdate,
  showFormUploadCV,
  showFormBooking, getBooking, getActivityLogs
} from "../../redux/actions";
import {DeleteProfileRequest, DetailCV, ProfileEntity} from "../../types";
import moment from "moment";
import Search from "antd/lib/input/Search";
import {getListSourceCV} from "../../../SourceCVManager/redux/actions";

const InputGroup = Input.Group;
const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  list: state.profileManager.list,
  detail: state.profileManager.detail,
  listSource: state.sourcecvManager.list,
})
const connector = connect(mapStateToProps, {
  getListProfile,
  deleteProfile,
  showFormCreate,
  showFormUpdate,
  showFormDetail,
  showFormUploadCV,
  getDetailProfile,
  getListSourceCV,
  showFormBooking,
  getBooking,
  getActivityLogs
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListProfile(props: IProps) {
  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false});
  const size = 10;
  const [state, setState] = useState<any>({
    selectedRowKeys: [],
  });
  const [id, setId] = useState('');
  const [sourceCV, setSourceCV] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    props.getListProfile({page: 1, size: 100});
    props.getListSourceCV({page: '', size: ''});
  }, []);

  useEffect(() => {
    props.getDetailProfile({idProfile: id});
    props.getActivityLogs({idProfile: id});
  }, [id])

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
    props.showFormBooking(true,entity);
  }

  const handleUploadCV = (e: any, entity: ProfileEntity) => {
    e.stopPropagation();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormUploadCV(true, entity);
  }

  const handleDetail = (e: any, entity: ProfileEntity) => {
    e.stopPropagation();
    setId(entity.id);

    let req: DetailCV = {
      show_detail: true,
      general: 12,
      detail: 12,
    }
    props.showFormDetail(req, props.detail?.result);
  }

  const handleSearch = (value: any) => {
    props.getListProfile({key: value, page: 1, size: 100,dateOfApply:date,sourceCV:sourceCV});
  }

  const handleSelectSource = (value: any) => {
    setSourceCV(value);
  }

  const handleSelectDate = (value: any) => {
    let applyDate: string = moment(unixTimeToDate(value)).format('DD/MM/YYYY');
    setSourceCV(applyDate);
  }
  const columns: ColumnProps<ProfileEntity>[] = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      width: 130,
      key: '2',
      render: (text: string, record: ProfileEntity) => <a onClick={event => handleDetail(event, record)}>{text}</a>,
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
      dataIndex: 'school',
      width: 200,
      key: '5',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      width: 110,
      key: '6',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
      key: '7',
    },
    {
      title: 'Công việc',
      dataIndex: 'job',
      width: 100,
      key: '8',
    },
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'levelJob',
      width: 100,
      key: '9',
    },
    {
      title: 'CV',
      dataIndex: 'cv',
      width: 100,
      key: '10',
    },
    {
      title: 'Nguồn CV',
      dataIndex: 'sourceCV',
      width: 100,
      key: '11',
    },
    {
      title: 'HR Ref',
      dataIndex: 'hrRef',
      width: 100,
      key: '12',
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'dateOfApply',
      width: 100,
      key: '13',
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
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <Icon type="delete" theme="filled"/>
              </Button>
            </Popconfirm>

            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                    onClick={event => handleEdit(event, record)}
            >
              <Icon type="edit"/>
            </Button>
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                    onClick={event => handleUploadCV(event, record)}
            >
              <Icon type="upload"/>
            </Button>
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                    onClick={event => handleBooking(event, record)}
            >
              <Icon type="calendar"/>
            </Button>
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                    onClick={event => handleDetail(event, record)}
            >Chi tiết</Button>
          </div>
        );
      },
    },
  ];

  function onSelectedRowKeysChange(selectedRowKeys: any) {
    setState({selectedRowKeys});
  }

  const {selectedRowKeys} = state;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  const dateFormat = 'DD/MM/YYYY';

  return (
    <>
      <InputGroup compact>
        <Select
          placeholder="Nguồn CV"
          size="large"
          style={{width: '25%'}}
          onChange={handleSelectSource}
        >
          {props.listSource.rows?.map((item: any, index: any) => (
            <Option key={index} value={item.name}>{item.name}</Option>
          ))}
        </Select>
        <DatePicker size="large"
                    style={{width: '25%'}}
                    format={dateFormat}
                    placeholder="Chọn thời gian nộp"
                    onChange={handleSelectDate}
        />
        <Search
          placeholder="Nhập tìm kiếm"
          enterButton="Tìm kiếm"
          size="large"
          style={{width: '50%'}}
          onSearch={handleSearch}
        />
      </InputGroup>


      <br/>
      <br/>
      <Table
        scroll={{x: 1300}}
        className="custom-table"
        dataSource={props.list.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: props.list.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListProfile);
