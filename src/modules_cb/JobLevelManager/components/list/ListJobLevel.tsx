import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteJobLevel, getListJobLevel, getSearchJobLevel, showFormCreate, showFormUpdate} from "../../redux/actions";
import {DeleteJobLevelRequest, JobLevelEntity} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {joblevel_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";


const mapStateToProps = (state: RootState) => ({
  jobLevelManager: state.joblevelManager,
})

const connector = connect(mapStateToProps, {
  getListJobLevel,
  deleteJobLevel,
  showFormUpdate,
  getSearchJobLevel
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListJobLevel(props: IProps) {
  const columns: ColumnProps<JobLevelEntity>[] = [
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
      render: (_text: string, record: JobLevelEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <ButtonDelete path={joblevel_path} message="cấp bậc công việc" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={joblevel_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {search} = props.jobLevelManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [jobLevel, setJobLevel] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setJobLevel(search)
  }, [search])

  const handleDelete = (event: any, entity: JobLevelEntity) => {
    event.stopPropagation();
    let req: DeleteJobLevelRequest = {
      id: entity.id
    }
    props.deleteJobLevel(req);
  }

  const handleEdit = (event: any, entity: JobLevelEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.getSearchJobLevel(req);
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
        dataSource={jobLevel?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: jobLevel?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListJobLevel);
