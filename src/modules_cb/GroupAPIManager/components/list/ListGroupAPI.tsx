import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteGroupAPI,
  getListGroupAPI,
  showAddAPIForm,
  showAssignUserForm,
  showUpdateGroupAPIForm
} from "../../redux/actions";
import {GroupAPIEntity} from "../../types";
import moment from "moment";

const mapStateToProps = ({groupAPIManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  showUpdateGroupAPIForm,
  showAssignUserForm,
  showAddAPIForm,
  getListGroupAPI,
  deleteGroupAPI,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListGroupAPI(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false});
  const size = 10;
  const [state, setState] = useState<any>({
    selectedRowKeys: [],
  });

  useEffect(() => {
    props.getListGroupAPI({page: 1, size: 100});
  }, []);

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }


  const handleDelete = (event: any, entity: GroupAPIEntity) => {
    event.stopPropagation();
    props.deleteGroupAPI(entity.id);
  }

  const handleEdit = (event: any, entity: GroupAPIEntity) => {
    props.showUpdateGroupAPIForm(true, entity);
  }

  const columns: ColumnProps<GroupAPIEntity>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      width: 100,
    },

    {
      title: 'Views',
      dataIndex: 'views',
      width: 150,
      render: (_text: string, record: GroupAPIEntity) => {
        let actions = record.roles || [];
        return (
          <ul style={{paddingLeft:'0px'}}>
            {actions.map((object, i) => <li style={{listStyleType:'none'}} key={object.id}>
              {object.name}
            </li>)}
          </ul>
        );
      },
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createAt',
      width: 100,
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY HH:mm');
      },
    },

    {
      title: 'Thời gian sửa',
      dataIndex: 'updateAt',
      width: 100,
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY HH:mm');
      },
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: GroupAPIEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa menu này chứ ?"
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
            >
              <Icon type="plus"/>
            </Button>
          </div>
        );
      },
    },
  ];

  function onSelectedRowKeysChange(selectedRowKeys: any) {
    setState({selectedRowKeys});
  }


  return (
    <>
      <Table
        scroll={scroll}
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

export default connector(ListGroupAPI);
