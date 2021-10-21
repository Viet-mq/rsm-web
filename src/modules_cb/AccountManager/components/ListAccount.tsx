import {RootState} from "../../../redux/reducers";
import React, {useEffect, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {deleteAccount, getListAccount, showFormChangePassword, showFormUpdate} from "../redux/actions";
import env from "../../../configs/env";
import {ColumnProps} from "antd/lib/table";
import moment from "moment";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "../../../configs/locales";
import {DeleteAccountRequest, UserAccount} from "../types";

const mapStateToProps = ({accountManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {deleteAccount, getListAccount, showFormUpdate, showFormChangePassword});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListAccount(props: IProps) {

  useEffect(() => {
    props.getListAccount({page: 1, size: 100});
  }, []);

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false});
  const size = 10;
  const [state, setState] = useState<any>({
    selectedRowKeys: [],
  });

  useEffect(() => {

    function updateSize() {
      if (document.documentElement.clientWidth < env.desktopWidth) setScroll({x: 'fit-content'})
      else setScroll({x: false})
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);

  }, []);

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  function handleDelete(event: any, userAccount: UserAccount) {
    event.stopPropagation();
    let req: DeleteAccountRequest = {
      username: userAccount.username
    }
    props.deleteAccount(req);
  }

  function handleEdit(event: any, userAccount: UserAccount) {
    event.stopPropagation();
    props.showFormUpdate(true, userAccount);

  }

  function handleChangePassword(event: any, userAccount: UserAccount) {
    event.stopPropagation();
    props.showFormChangePassword(true, userAccount);
  }

  const columns: ColumnProps<UserAccount>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      render: (text, record, index) =>  {return (page - 1) * 10 + index + 1}
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      sorter: true,
      width: 100,
    },
    {
      title: 'Họ tên',
      sorter: true,
      dataIndex: 'fullName',
      width: 80,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      width: 80,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      sorter: true,
      width: 80,
      render: (value: number) => {
        if (value === 1) {
          return 'User'
        } else {
          return 'Admin'
        }
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      sorter: true,
      width: 80,
      render: (value: number) => {
        if (value === 1) {
          return 'Active'
        } else {
          return 'Disable'
        }
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
      title: 'Cập nhật lúc',
      dataIndex: 'updateAt',
      width: 100,
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY HH:mm');
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'createBy',
      width: 80,
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 120,
      fixed: 'right',
      render: (_text: string, record: UserAccount) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa tài khoản này ?"
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
                    onClick={event => handleEdit(event, record)}>
              <Icon type="edit"/>
            </Button>
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                    onClick={event => handleChangePassword(event, record)}>
              <Icon type="key"/>
            </Button>
          </div>
        );
      },
    },
  ];

  function handleRowClick(event: any, chatBot: UserAccount) {
    event.stopPropagation();
  }

  function handleTableChange(pagination: any, filters: any, sorter: any) {

  }

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
        scroll={scroll}
        className="custom-table"
        dataSource={props.list.rows}
        columns={columns}
        rowSelection={rowSelection}
        rowKey="username"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: props.list.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
        onChange={handleTableChange}
        onRow={(record, recordIndex) => {
          return {
            onClick: event => {
              handleRowClick(event, record);
            },
          };
        }}
      />
    </>
  );

}

export default connector(ListAccount);
