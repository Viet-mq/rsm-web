import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteSchool, getListSchool, getSearchSchool, showFormCreate, showFormUpdate} from "../../redux/actions";
import {DeleteSchoolRequest, SchoolEntity} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {school_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({schoolManager}: RootState) => ({schoolManager})
const connector = connect(mapStateToProps, {
  getListSchool,
  deleteSchool,
  showFormUpdate,
  getSearchSchool
});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListSchool(props: IProps) {
  const columns: ColumnProps<SchoolEntity>[] = [
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
      render: (_text: string, record: SchoolEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <ButtonDelete path={school_path} message="trường" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={school_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {search} = props.schoolManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [school, setSchool] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setSchool(search)
  }, [search])

  const handleDelete = (event: any, entity: SchoolEntity) => {
    event.stopPropagation();
    let req: DeleteSchoolRequest = {
      id: entity.id
    }
    props.deleteSchool(req);
  }

  const handleEdit = (event: any, entity: SchoolEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.getSearchSchool(req);
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
        dataSource={school?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: school?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListSchool);
