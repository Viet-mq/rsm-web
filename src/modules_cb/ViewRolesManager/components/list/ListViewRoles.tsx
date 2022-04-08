import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteViewRoles, getSearchViewRoles, showFormCreate, showFormUpdate} from "../../redux/actions";
import {DeleteViewRolesRequest, ViewRolesEntity} from "../../types";
import {view_role_path} from "../../../../helpers/utilsFunc";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({viewRolesManager}: RootState) => ({viewRolesManager});
const connector = connect(mapStateToProps, {
  getSearchViewRoles,
  deleteViewRoles,
  showFormUpdate,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListViewRoles(props: IProps) {
  const columns: ColumnProps<ViewRolesEntity>[] = [
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
      render: (_text: string, record: ViewRolesEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <ButtonDelete path={view_role_path} message="View Roles" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={view_role_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {search} = props.viewRolesManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [viewRoles, setViewRoles] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setViewRoles(search)
  }, [search])

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

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.getSearchViewRoles(req);
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
        dataSource={viewRoles?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: viewRoles?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListViewRoles);
