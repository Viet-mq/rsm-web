import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteBlacklist, getListBlacklist, showFormCreate, showFormUpdate, updateBlacklist} from "../../redux/actions";
import {BlacklistEntity, DeleteBlacklistRequest} from "../../types";

const mapStateToProps = ({blacklistManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListBlacklist,
  deleteBlacklist,
  showFormCreate,
  showFormUpdate,
  updateBlacklist
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListBlacklist(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;


  useEffect(() => {
    props.getListBlacklist({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: BlacklistEntity) => {
    event.stopPropagation();
    let req: DeleteBlacklistRequest = {
      id: entity.id
    }
    props.deleteBlacklist(req);
  }

  const handleEdit = (event: any, entity: BlacklistEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  const columns: ColumnProps<BlacklistEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      render: (text, record, index) =>  {return (page - 1) * 10 + index + 1}
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 100,
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',
      width: 100,
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      width: 150,
    },
    {
      title: 'SSN',
      dataIndex: 'ssn',
      width: 100,
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: BlacklistEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa trạng thái CV này chứ ?"
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
      >
      </Table>
    </>
  );

}

export default connector(ListBlacklist);
