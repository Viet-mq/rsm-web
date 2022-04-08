import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteView, searchListView, showViewAddActionForm, showViewUpdateForm} from "../../redux/actions";
import {ViewEntity} from "../../types";
import {useHistory} from "react-router-dom";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {view_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({viewManager}: RootState) => ({viewManager})
const connector = connect(mapStateToProps, {
  searchListView,
  deleteView,
  showViewUpdateForm,
  showViewAddActionForm,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListView(props: IProps) {
  const columns: ColumnProps<ViewEntity>[] = [
    {
      title: 'STT',
      key: 'stt',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return (page - 1) * 10 + index + 1
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 100,
    },

    {
      title: 'Path',
      dataIndex: 'path',
      width: 100,
    },

    {
      title: 'Icon',
      dataIndex: 'icon',
      width: 100,
    },
    {
      title: 'Index',
      dataIndex: 'index',
      width: 100,
    },

    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 10,
      fixed: 'right',
      render: (_text: string, record: ViewEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <ButtonDelete path={view_path} message="menu" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={view_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {search} = props.viewManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [view, setView] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")
  const history = useHistory();

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setView(search)
  }, [search])

  const handleDelete = (event: any, entity: ViewEntity) => {
    props.deleteView(entity.id);
  }

  const handleEdit = (event: any, entity: ViewEntity) => {

    history.push({
      pathname: `/view-manager/${entity.id}`
    });
    // props.showViewUpdateForm(true, entity);
  }

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.searchListView(req);
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
        dataSource={view?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: view?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListView);
