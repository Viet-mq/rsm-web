import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteViewRoles,
  getListViewRoles,
  showFormCreate,
  showFormUpdate,
  updateViewRoles
} from "../../redux/actions";
import {ViewRolesEntity, DeleteViewRolesRequest} from "../../types";

const mapStateToProps = ({viewRolesManager}: RootState) => ({viewRolesManager});
const connector = connect(mapStateToProps, {
  getListViewRoles,
   deleteViewRoles: deleteViewRoles,
  showFormCreate,
  showFormUpdate,
  updateViewRoles
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListViewRoles(props: IProps) {
  const {list}=props.viewRolesManager
  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;
  const columns: ColumnProps<ViewRolesEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align:"center",
      render: (text, record, index) =>  {return (page - 1) * 10 + index + 1}
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 100,
    },

    {
      title: 'Miêu tả',
      dataIndex: 'description',
      width: 100,
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: ViewRolesEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa View Roles này chứ ?"
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

  useEffect(() => {
    props.getListViewRoles({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: ViewRolesEntity) => {
    event.stopPropagation();
    let req: DeleteViewRolesRequest = {
      id: entity.id
    }
    props.deleteViewRoles(req);
  }

  const handleEdit = (event: any, entity: ViewRolesEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }


  // function onSelectedRowKeysChange(selectedRowKeys: any) {
  //   setState({selectedRowKeys});
  // }
  //
  // const {selectedRowKeys} = state;
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectedRowKeysChange,
  // };

  return (
    <>
      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={list.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: list.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListViewRoles);
