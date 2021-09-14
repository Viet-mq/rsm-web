import React, {useEffect, useState} from "react";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {deleteChatBotEntity, getListChatBotEntity, showFormUpdateChatBotEntity} from "../redux/actions";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import moment from "moment";
import {Button, Icon, Popconfirm, Table} from "antd";
import {ChatBotEntity} from "../redux/services/apis";
import {emptyText} from "src/configs/locales";

const mapStateToProps = ({entityManager: {list}}: RootState) => ({list});
const connector = connect(mapStateToProps, {getListChatBotEntity, deleteChatBotEntity, showFormUpdateChatBotEntity});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListEntity(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false});
  const size = 10;
  const [state, setState] = useState<any>({
    selectedRowKeys: [],
  });

  useEffect(() => {
    document.title = "Quản lý thực thể";
    props.getListChatBotEntity({});
  }, []);

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  const deleteEntity = (event: any, entity: ChatBotEntity) => {
    event.stopPropagation();
    props.deleteChatBotEntity(entity.entity_id);
  }

  const updateEntity = (event: any, entity: ChatBotEntity) => {
    event.stopPropagation();
    props.showFormUpdateChatBotEntity(entity);
  }

  const columns: ColumnProps<ChatBotEntity>[] = [
    {
      title: 'Chat Bot',
      dataIndex: 'chatbot_name',
      sorter: true,
      width: 100,
    },
    {
      title: 'Tên',
      sorter: true,
      dataIndex: 'entity_name',
      width: 80,
    },
    {
      title: 'Loại',
      dataIndex: 'entity_type',
      width: 100,
      render: (value: string) => {
        return (parseInt(value) === 1 ? 'Đối tượng' : 'Hệ thống');
      },
    },
    {
      title: 'Từ khóa',
      dataIndex: 'keyword',
      sorter: true,
      width: 100,
    }, {
      title: 'Từ đồng nghĩa',
      dataIndex: 'synonymsOfKeyword',
      sorter: true,
      width: 100,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'create_at',
      width: 100,
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY HH:mm');
      },
    },
    {
      title: 'Cập nhật lúc',
      dataIndex: 'update_at',
      width: 100,
      render: (value: number) => {
        return moment(unixTimeToDate(value)).format('DD/MM/YYYY HH:mm');
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'create_by',
      width: 80,
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 120,
      fixed: 'right',
      render: (_text: string, record: ChatBotEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa thực thể này ?"
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={event => deleteEntity(event, record)}
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
                    onClick={event => updateEntity(event, record)}
            >
              <Icon type="edit"/>
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
        rowKey="entity_id"
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

export default connector(ListEntity);
