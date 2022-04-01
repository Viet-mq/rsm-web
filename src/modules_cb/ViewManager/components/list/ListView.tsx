import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {deleteView, getListView, removeAction, showViewAddActionForm, showViewUpdateForm} from "../../redux/actions";
import {ActionView, DeleteActionToViewRequest, ViewEntity} from "../../types";
import {useHistory} from "react-router-dom";

const mapStateToProps = ({viewManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListView,
  deleteView,
  showViewUpdateForm,
  showViewAddActionForm,
  removeAction
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListView(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;
  const history = useHistory();

  useEffect(() => {
    props.getListView({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: ViewEntity) => {
    props.deleteView(entity.id);
  }

  const handleEdit = (event: any, entity: ViewEntity) => {

    history.push({
      pathname: `/view-manager/${entity.id}`
    });
    // props.showViewUpdateForm(true, entity);

  }

  const removeAction = (event: any, entity: ViewEntity, action: ActionView) => {
    let req: DeleteActionToViewRequest = {
      id: action.id,
      permission_id: entity.id
    }
    props.removeAction(req);
  }

  const columns: ColumnProps<ViewEntity>[] = [
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

export default connector(ListView);
