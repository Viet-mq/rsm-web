import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteAPIRoles, getSearchAPIRoles, showFormUpdate} from "../../redux/actions";
import {APIRolesEntity, DeleteAPIRolesRequest} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {api_roles_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({apiRolesManager}: RootState) => ({apiRolesManager});
const connector = connect(mapStateToProps, {
  deleteAPIRoles,
  showFormUpdate,
  getSearchAPIRoles
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListAPIRoles(props: IProps) {
  const columns: ColumnProps<APIRolesEntity>[] = [
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
      render: (_text: string, record: APIRolesEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <ButtonDelete path={api_roles_path} message="API Roles" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={api_roles_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {search} = props.apiRolesManager
  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [apiRoles, setApiRoles] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setApiRoles(search)
  }, [search])

  const handleDelete = (event: any, entity: APIRolesEntity) => {
    event.stopPropagation();
    let req: DeleteAPIRolesRequest = {
      id: entity.id
    }
    props.deleteAPIRoles(req);
  }

  const handleEdit = (event: any, entity: APIRolesEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.getSearchAPIRoles(req);
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
        dataSource={apiRoles?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: apiRoles?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListAPIRoles);
