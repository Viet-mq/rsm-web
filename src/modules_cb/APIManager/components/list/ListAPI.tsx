import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteApi, searchListApi, showFormUpdateApi} from "../../redux/actions";
import {ApiEntity, DeleteApiRequest} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {api_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({apiManager}: RootState) => ({apiManager})
const connector = connect(mapStateToProps, {
  deleteApi,
  showFormUpdateApi,
  searchListApi
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListAPI(props: IProps) {
  const columns: ColumnProps<ApiEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      align: "center",
      width: 40,
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

            <ButtonDelete path={api_path} message="API" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={api_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {search} = props.apiManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [api, setApi] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setApi(search)
  }, [search])

  const handleDelete = (event: any, entity: ApiEntity) => {
    let req: DeleteApiRequest = {
      id: entity.id
    }
    props.deleteApi(req);
  }

  const handleEdit = (event: any, entity: ApiEntity) => {
    props.showFormUpdateApi(true, entity);
  }

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.searchListApi(req);
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
        dataSource={api?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: api?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListAPI);
