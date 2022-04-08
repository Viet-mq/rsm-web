import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteReasonReject,
  getListReasonReject,
  searchListReasonReject,
  showFormCreate,
  showFormUpdate
} from "../../redux/actions";
import {DeleteReasonRejectRequest, ReasonRejectEntity} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {reason_reject_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";
import Search from "antd/es/input/Search";

const mapStateToProps = ({reasonRejectManager}: RootState) => ({reasonRejectManager})
const connector = connect(mapStateToProps, {
  getListReasonReject,
  deleteReasonReject,
  showFormUpdate,
  searchListReasonReject
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListReasonReject(props: IProps) {
  const columns: ColumnProps<ReasonRejectEntity>[] = [
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
      title: 'Lý do loại',
      dataIndex: 'reason',
      width: 100,
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: ReasonRejectEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <ButtonDelete path={reason_reject_path} message="lý do" action="delete"
                          handleClick={(event) => handleDelete(event, record)}/>
            <ButtonUpdate path={reason_reject_path} action="update" handleClick={(event) => handleEdit(event, record)}/>

          </div>
        );
      },
    },
  ];
  const {search} = props.reasonRejectManager
  const [page, setPage] = useState(1);
  const scroll = {y: 600};
  const size = 30;
  const [reasonReject, setReasonReject] = useState<any>()
  const [nameSearch, setNameSearch] = useState<any>("")

  useEffect(() => {
    btnSearchClicked()
  }, [page]);

  useEffect(() => {
    setReasonReject(search)
  }, [search])

  const handleDelete = (event: any, entity: ReasonRejectEntity) => {
    event.stopPropagation();
    let req: DeleteReasonRejectRequest = {
      id: entity.id
    }
    props.deleteReasonReject(req);
  }

  const handleEdit = (event: any, entity: ReasonRejectEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  function btnSearchClicked() {
    const req: any = {
      page: page,
      size: size,
      name: nameSearch
    }
    props.searchListReasonReject(req);
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
        dataSource={reasonReject?.rows}
        columns={columns}
        rowKey="id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: reasonReject?.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
      />
    </>
  );

}

export default connector(ListReasonReject);
