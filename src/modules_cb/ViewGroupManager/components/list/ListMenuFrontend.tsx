import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteMenuFrontend,
  getListMenuFrontend,
  showFormMenuFrontEndDetail,
  showFormMenuFrontEndUpdate
} from "../../redux/actions";
import {MenuFrontendEntity} from "../../types";

const mapStateToProps = ({viewGroupManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListMenuFrontend,
  deleteMenuFrontend,
  showFormMenuFrontEndUpdate,
  showFormMenuFrontEndDetail
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListMenuFrontend(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false});
  const size = 10;
  const [state, setState] = useState<any>({
    selectedRowKeys: [],
  });

  useEffect(() => {
    props.getListMenuFrontend({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: MenuFrontendEntity) => {
    props.deleteMenuFrontend(entity.id);
  }

  const handleEdit = (event: any, entity: MenuFrontendEntity) => {
    props.showFormMenuFrontEndUpdate(true, entity);
  }

  const handleDetail = (e: any, entity: MenuFrontendEntity) => {
    e.stopPropagation();
    props.showFormMenuFrontEndDetail(true, entity);
  }

  const columns: ColumnProps<MenuFrontendEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      render: (text, record, index) =>  {return (page - 1) * 10 + index + 1}
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
      render:(text:string,record:MenuFrontendEntity)=><a onClick={event=>handleDetail(event,record)}>{text}</a>
    },
    {
      title: 'Mô tả',
      dataIndex: 'desc',
      width: 200,
    },
    {
      title: 'Views',
      dataIndex: 'views',
      width: 150,
      render: (_text: string, record: MenuFrontendEntity) => {
        let actions = record.views || [];
        return (
          <ul style={{paddingLeft:'0px'}}>
            {actions.map((object, i) => <li style={{listStyleType:'none'}} key={object.id}>
              <span>&nbsp;{object.id} : {object.name}</span>
            </li>)}
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
      render: (_text: string, record: MenuFrontendEntity) => {
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

  // function onSelectedRowKeysChange(selectedRowKeys: any) {
  //   setState({selectedRowKeys});
  // }
  //
  // const {selectedRowKeys} = state;
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectedRowKeysChange,
  // };

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

export default connector(ListMenuFrontend);
