import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteView,
  getListFrontendView,
  removeAction,
  showFrontEndViewAddActionForm,
  showFrontEndViewUpdateForm
} from "../../redux/actions";
import {ActionView, AddActionToViewRequest, FrontendViewEntity} from "../../types";

const mapStateToProps = ({viewManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListFrontendView,
  deleteView,
  showFrontEndViewUpdateForm,
  showFrontEndViewAddActionForm,
  removeAction
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListViewFrontEnd(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;
  const [state, setState] = useState<any>({
    selectedRowKeys: [],
  });

  useEffect(() => {
    props.getListFrontendView({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: FrontendViewEntity) => {
    props.deleteView(entity.id);
  }

  const handleEdit = (event: any, entity: FrontendViewEntity) => {
    props.showFrontEndViewUpdateForm(true, entity);
  }

  const handleAddAction = (event: any, entity: FrontendViewEntity) => {
    props.showFrontEndViewAddActionForm(true, entity);
  }

  const removeAction = (event: any, entity: FrontendViewEntity, action: ActionView) => {
    let req: AddActionToViewRequest = {
      viewId: entity.id,
      actionId: action.actionId,
    }
    props.removeAction(req);
  }

  const columns: ColumnProps<FrontendViewEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      render: (text, record, index) =>  {return (page - 1) * 10 + index + 1}
    },
    {
      title: 'Path',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      width: 100,
    },
    {
      title: 'Show',
      dataIndex: 'show',
      width: 100,
      render: (value: boolean) => {
        return value ? 'Show' : 'Hidden';
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 150,
      render: (_text: string, record: FrontendViewEntity) => {
        let actions = record.actions || [];
        return (
          <ul>
            {actions.map((object, i) => <li key={object.actionId}> {object.actionId} : {object.actionName} <Popconfirm
              title={`Bạn muốn xóa action [` + object.actionName + "] này chứ ?"}
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={event => removeAction(event, record, object)}
            >
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <Icon type="minus"/>
              </Button>
            </Popconfirm></li>)}
          </ul>
        );
      },
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: FrontendViewEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa menu này chứ ?"
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
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                    onClick={event => handleAddAction(event, record)}
            >
              <Icon type="plus"/>
            </Button>
          </div>
        );
      },
    },
  ];

  function onSelectedRowKeysChange(selectedRowKeys: any) {
    setState({selectedRowKeys});
  }

  const {selectedRowKeys} = state;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  return (
    <>
      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={props.list.rows}
        columns={columns}
        rowSelection={rowSelection}
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

export default connector(ListViewFrontEnd);
