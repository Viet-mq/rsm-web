import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteRoles, getSearchRoles, showFormUpdate} from "../../redux/actions";
import {DeleteRolesRequest, RolesEntity} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {roles_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({rolesManager}: RootState) => ({rolesManager});
const connector = connect(mapStateToProps, {
  getSearchRoles,
  deleteRoles,
  showFormUpdate,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListRoles(props: IProps) {
  const columns: ColumnProps<RolesEntity>[] = [
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
      render: (_text: string, record: RolesEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <ButtonDelete path={roles_path} message="Roles" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={roles_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {search} = props.rolesManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [roles, setRoles] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setRoles(search)
  }, [search])

  const handleDelete = (event: any, entity: RolesEntity) => {
    event.stopPropagation();
    let req: DeleteRolesRequest = {
      id: entity.id
    }
    props.deleteRoles(req);
  }

  const handleEdit = (event: any, entity: RolesEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.getSearchRoles(req);
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
        dataSource={roles?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: roles?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListRoles);
