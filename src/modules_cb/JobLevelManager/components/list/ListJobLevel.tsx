import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteJobLevel, getListJobLevel, showFormCreate, showFormUpdate, updateJobLevel} from "../../redux/actions";
import {DeleteJobLevelRequest, JobLevelEntity} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {joblevel_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";

const mapStateToProps = ({joblevelManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListJobLevel,
  deleteJobLevel,
  showFormCreate,
  showFormUpdate,
  updateJobLevel
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListJobLevel(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;


  useEffect(() => {
    props.getListJobLevel({page: 1, size: 100});
  }, []);

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
      />
    </>
  );

}

export default connector(ListJobLevel);
