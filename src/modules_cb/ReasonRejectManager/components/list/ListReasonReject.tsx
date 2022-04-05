import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteReasonReject,
  getListReasonReject,
  showFormCreate,
  showFormUpdate,
  updateReasonReject
} from "../../redux/actions";
import {DeleteReasonRejectRequest, ReasonRejectEntity} from "../../types";
import ButtonDelete from "../../../../components/ComponentUtils/ButtonDelete";
import {reason_reject_path} from "../../../../helpers/utilsFunc";
import ButtonUpdate from "../../../../components/ComponentUtils/ButtonUpdate";

const mapStateToProps = ({reasonRejectManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListReasonReject,
  deleteReasonReject: deleteReasonReject,
  showFormCreate,
  showFormUpdate,
  updateReasonReject
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListReasonReject(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;

  useEffect(() => {
    props.getListReasonReject({page: 1, size: 100});
  }, []);

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

export default connector(ListReasonReject);
