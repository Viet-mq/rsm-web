import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteDepartment,
  getListDepartment,
  searchListDepartment,
  showFormCreate,
  showFormUpdate
} from "../../redux/actions";
import {DeleteDepartmentRequest, DepartmentEntity} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {department_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({departmentManager}: RootState) => ({departmentManager})
const connector = connect(mapStateToProps, {
  getListDepartment,
  deleteDepartment,
  showFormUpdate,
  searchListDepartment
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListDepartment(props: IProps) {
  const columns: ColumnProps<DepartmentEntity>[] = [
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
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: DepartmentEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <ButtonDelete path={department_path} message="phòng ban" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={department_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {list, search} = props.departmentManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [department, setDepartment] = useState<any>()

  useEffect(() => {
    props.getListDepartment({page: page, size: size});
  }, []);

  useEffect(() => {
    setDepartment(list)
  }, [list])

  useEffect(() => {
    setDepartment(search)
  }, [search])

  const handleDelete = (event: any, entity: DepartmentEntity) => {
    event.stopPropagation();
    let req: DeleteDepartmentRequest = {
      id: entity.id
    }
    props.deleteDepartment(req);
  }

  const handleEdit = (event: any, entity: any) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  function btnSearchClicked(value: any) {
    const req: any = {
      page: page,
      size: size,
      name: value
    }
    props.searchListDepartment(req);
  }


  return (
    <>
      <div className="c-filter-profile">
        <div style={{width: 200, display: "inline-block"}}>
          <Search
            onSearch={btnSearchClicked}
            placeholder="Tìm kiếm..."/>
        </div>
      </div>

      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={department?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: department?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListDepartment);
