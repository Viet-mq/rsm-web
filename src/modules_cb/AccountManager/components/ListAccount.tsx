import {RootState} from "../../../redux/reducers";
import React, {useEffect, useState} from "react";
import {connect, ConnectedProps} from "react-redux";
import {deleteAccount, getSearchAccount, showFormChangePassword, showFormUpdate} from "../redux/actions";
import {ColumnProps} from "antd/lib/table";
import moment from "moment";
import {Button, Icon, Table} from "antd";
import {emptyText} from "../../../configs/locales";
import {DeleteAccountRequest, UserAccount} from "../types";
import ButtonDelete from "../../../components/ComponentUtils/ButtonDelete";
import {account_path, CheckViewAction} from "../../../helpers/utilsFunc";
import ButtonUpdate from "../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({accountManager}: RootState) => ({accountManager})
const connector = connect(mapStateToProps, {deleteAccount, getSearchAccount, showFormUpdate, showFormChangePassword});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListAccount(props: IProps) {
  const columns: ColumnProps<UserAccount>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return (page - 1) * 10 + index + 1
      }
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
      title: 'Email',
      // sorter: true,
      dataIndex: 'email',
      width: 150,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      width: 80,
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      sorter: true,
      width: 80,
      render: (value: any) => value?.map((item: any) => item.name),
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
            <ButtonDelete path={account_path} message="tài khoản" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={account_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

            {CheckViewAction(account_path, "change-password")
              ?
              <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                      onClick={event => handleChangePassword(event, record)}>
                <Icon type="key"/>
              </Button>
              : null}

          </div>
        );
      },
    },
  ];
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [account, setAccount] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")
  const {search} = props.accountManager

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setAccount(search)
  }, [search])

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.getSearchAccount(req);
  }

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


  function handleRowClick(event: any, chatBot: UserAccount) {
    event.stopPropagation();
  }

  return (
    <>
      <div className="c-filter-profile">
        <div style={{width: 200, display: "inline-block"}}>
          <Search
            onChange={e => setNameSearch(e.target.value)}
            onSearch={btnSearchClicked}
            placeholder="Tìm kiếm..."/>
        </div>
      </div>

      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={account?.rows}
        columns={columns}
        rowKey="username"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: account?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
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
