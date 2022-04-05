import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteApi, getListApi, showFormUpdateApi} from "../../redux/actions";
import {ApiEntity, DeleteApiRequest} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {api_path, view_role_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";

const mapStateToProps = ({apiManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListApi,
  deleteApi,
  showFormUpdateApi,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListAPI(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;
  const [state, setState] = useState<any>({
    selectedRowKeys: [],
  });

  useEffect(() => {
    props.getListApi({page: 1, size: 0});
  }, []);

  const handleDelete = (event: any, entity: ApiEntity) => {
    let req: DeleteApiRequest = {
      id: entity.id
    }
    props.deleteApi(req);
  }

  const handleEdit = (event: any, entity: ApiEntity) => {
    props.showFormUpdateApi(true, entity);
  }

  const columns: ColumnProps<ApiEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      align:"center",
      width: 40,
      render: (text, record, index) =>  {return (page - 1) * 10 + index + 1}
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      width: 100,
    },

    {
      title: 'Path',
      dataIndex: 'path',
      width: 100,
    },


    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: ApiEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>

            <ButtonDelete path={api_path} message="API" action="delete" handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={api_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

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

export default connector(ListAPI);
