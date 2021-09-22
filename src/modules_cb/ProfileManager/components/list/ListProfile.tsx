import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteProfile,
  getListProfile,
  showFormCreate,
  showFormUpdate,
  updateProfile
} from "../../redux/actions";
import {ProfileEntity, CreateProfileRequest, UpdateProfileRequest, DeleteProfileRequest} from "../../types";

const mapStateToProps = ({profileManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListProfile,
  deleteProfile,
  showFormCreate,
  showFormUpdate,
  updateProfile
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListProfile(props: IProps) {
  console.log("list:",props);
  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false});
  const size = 10;
  const [state, setState] = useState<any>({
    selectedRowKeys: [],
  });

  useEffect(() => {
    props.getListProfile({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: ProfileEntity) => {
    event.stopPropagation();
    let req: DeleteProfileRequest = {
      id: entity.id
    }
    console.log(props.deleteProfile(req));
    props.deleteProfile(req);
  }

  const handleEdit = (event: any, entity: ProfileEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  const columns: ColumnProps<ProfileEntity>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
      key: '1',
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      width: 150,
      key: '2',
    },
    {
      title: 'Năm sinh',
      dataIndex: 'dateOfBirth',
      width: 100,
      key: '3',
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
      dataIndex: 'phonenumber',
      width: 100,
      key: '6',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 150,
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

  return (
    <>
      <Table
        scroll={{x:1300}}
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
