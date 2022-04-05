import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteViewRoles, getListViewRoles, showFormCreate, showFormUpdate, updateViewRoles} from "../../redux/actions";
import {DeleteViewRolesRequest, ViewRolesEntity} from "../../types";
import {view_role_path} from "../../../../helpers/utilsFunc";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";

const mapStateToProps = ({viewRolesManager}: RootState) => ({viewRolesManager});
const connector = connect(mapStateToProps, {
  getListViewRoles,
  deleteViewRoles,
  showFormCreate,
  showFormUpdate,
  updateViewRoles
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListViewRoles(props: IProps) {
  const {list} = props.viewRolesManager
  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;
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
          <div style={{whiteSpace: 'nowrap'}} >
            <ButtonDelete path={view_role_path} message="View Roles" action="delete" handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={view_role_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

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
