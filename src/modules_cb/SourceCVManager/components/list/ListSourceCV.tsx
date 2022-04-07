import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteSourceCV, getListSourceCV, getSearchSourceCV, showFormCreate, showFormUpdate} from "../../redux/actions";
import {DeleteSourceCVRequest, SourceCVEntity} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {sourcecv_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({sourcecvManager}: RootState) => ({sourcecvManager})
const connector = connect(mapStateToProps, {
  getListSourceCV,
  deleteSourceCV,
  showFormUpdate,
  getSearchSourceCV
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListSourceCV(props: IProps) {
  const columns: ColumnProps<SourceCVEntity>[] = [
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
      render: (_text: string, record: SourceCVEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa Nguồn ứng viên này chứ ?"
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={event => handleDelete(event, record)}
            >
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <Icon type="delete" theme="filled"/>
              </Button>
            </Popconfirm>
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                    onClick={event => handleEdit(event, record)}
            >
              <Icon type="edit"/>
            </Button>


            <ButtonDelete path={sourcecv_path} message="Nguồn ứng viên" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={sourcecv_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {search} = props.sourcecvManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [sourceCV, setSourceCV] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setSourceCV(search)
  }, [search])

  const handleDelete = (event: any, entity: SourceCVEntity) => {
    event.stopPropagation();
    let req: DeleteSourceCVRequest = {
      id: entity.id
    }
    props.deleteSourceCV(req);
  }

  const handleEdit = (event: any, entity: SourceCVEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.getSearchSourceCV(req);
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
        dataSource={sourceCV?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: sourceCV?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListSourceCV);
