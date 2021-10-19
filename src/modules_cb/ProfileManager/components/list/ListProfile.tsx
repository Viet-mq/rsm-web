import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Button, DatePicker, Form, Icon, Input, Popconfirm, Select, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteProfile,
  getActivityLogs,
  getBooking,
  getDetailProfile,
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
// import {getListSourceCV} from "../../../SourceCVManager/redux/actions";

const InputGroup = Input.Group;
const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  list: state.profileManager.list,
  detail: state.profileManager.detail,
  listSource: state.sourcecvManager.list,
  elasticSearch: state.profileManager.search
})
const connector = connect(mapStateToProps, {
  getListProfile,
  deleteProfile,
  showFormCreate,
  showFormUpdate,
  showFormDetail,
  showFormUploadCV,
  getDetailProfile,
  // getListSourceCV,
  showFormBooking,
  getBooking,
  getActivityLogs,
  getElasticSearch
});

type ReduxProps = ConnectedProps<typeof connector>;

interface ListProfileProps extends FormComponentProps, ReduxProps {
}

function ListProfile(props: ListProfileProps) {
  const [page, setPage] = useState(1);
  const size = 10;
  const formItemStyle = {height: '32px'};
  const {getFieldDecorator, resetFields} = props.form;

  const [sourceCV, setSourceCV] = useState('');
  const [date, setDate] = useState<any>();
  const [inputValue, setInputValue] = useState<any>("")
  const [dataSource, setDataSource] = useState<ProfileEntity | any>(undefined)
  const columns: ColumnProps<ProfileEntity>[] = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      width: 130,
      key: '2',
      render: (text: string, record: ProfileEntity) => <a onClick={event => handleDetail(event, record)}>{text}</a>,
    },
    {
      title: 'Công việc',
      dataIndex: 'jobName',
      width: 150,
      key: '8',
    },
    {
      title: 'Vị trí tuyển dụng',
      dataIndex: 'levelJobName',
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
      dataIndex: 'sourceCVName',
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
      title: 'Năm sinh',
      dataIndex: 'dateOfBirth',
      width: 100,
      key: '3',
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
      key: '7',
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
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      width: 110,
      key: '6',
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

  useEffect(() => {
    props.getListProfile({page: 1, size: 100});
    // props.getListSourceCV({page: 1, size: 100});
  }, [])


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

    props.getDetailProfile({idProfile: entity.id});
    props.getActivityLogs({idProfile: entity.id});
    props.getBooking({idProfile: entity.id});
    props.showFormDetail(req, props.detail?.result);
  }

  const handleSelectSource = (value: any) => {
    setSourceCV(value);
  }

  const handleSelectDate = (value: any) => {
    // let applyDate: number = moment(unixTimeToDate(value)).format('DD/MM/YYYY');
    setDate(value * 1);
  }

  function onBtnResetClicked() {
    resetFields();
    setDataSource(undefined)
    props.getListProfile({page:1,size:100});
    // setDataSource(props.list.rows);
  }

  const onBtnSearchClicked = () => {
    inputValue ? props.getElasticSearch({key: inputValue}) : props.getElasticSearch();
    // props.elasticSearch?.request === {} ? setDataSource(props.list.rows) : setDataSource(props.elasticSearch?.rows);
  }

  const dateFormat = 'DD/MM/YYYY';

  function inputChange(event: any) {
    setInputValue(event.target.value)
  }

  useEffect(()=>{
    if(props.elasticSearch.request!==null){
      setDataSource(props.elasticSearch.rows)
    }
  },[props.elasticSearch.rows])

  if(dataSource!==undefined){
    console.log("showDatasource:",dataSource)
  }else {
    console.log("showListProfile:", props.list.rows)

  }
  // console.log("elasticSearch:",props.elasticSearch)


  return (
    <>
      <Form style={{display: "flex"}}>
        <Select
          placeholder="Nguồn CV"
          style={{width: "20%", padding: "0 5px 0 0"}}
          onChange={handleSelectSource}
        >
          {props.listSource.rows?.map((item: any, index: any) => (
            <Option key={index} value={item.name}>{item.name}</Option>
          ))}
        </Select>
        <DatePicker
          className="col"
          style={{width: "auto", padding: "0 5px"}}
          format={dateFormat}
          placeholder="Chọn thời gian nộp"
          onChange={handleSelectDate}
        />

        <Form.Item style={{margin: "-5px 5px 0", width: "40%"}}>
          {getFieldDecorator('valueInput')(
            <Input
              placeholder={"Họ tên, Năm sinh, Quê quán, Trường học, Số điện thoại, Email, Công việc"}
              className="bg-white text-black"
              onChange={event => inputChange(event)}
              prefix={<Icon type="search"/>}

            />
          )}
        </Form.Item>
        <Button type="primary"
                style={{
                  width: "10%",
                  margin: "0 5px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                onClick={onBtnSearchClicked}>
          Tìm kiếm
        </Button>
        <Button style={{
          width: "10%",
          margin: "0 5px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
                onClick={onBtnResetClicked}>
          Reset
        </Button>
      </Form>

      <br/>
      <Table
        scroll={{x: 1300}}
        className="custom-table -webkit-scrollbar"
        // dataSource={props.elasticSearch?.rows?.length !== 0 ? (props.elasticSearch?.rows) : (props.list.rows)}
        dataSource={dataSource!==undefined?dataSource:props.list.rows}
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

export default connector(Form.create<ListProfileProps>()(ListProfile));
