import React, {useEffect, useState} from "react";
import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {ColumnProps} from "antd/lib/table";
import moment from "moment";
import {Button, Icon, Popconfirm, Table} from "antd";
import {DeleteChatBotIntentRequest, IntentEntity} from "../types";
import {emptyText} from "src/configs/locales";
import env from "src/configs/env";
import {deleteChatBotIntent, getListIntent, showFormUpdateIntent} from "../redux/actions";

const mapStateToProps = ({intentManager: {list}, chatBotManager: {selector_bot}}: RootState) => ({list, selector_bot})
const connector = connect(mapStateToProps, {
  getListIntent,
  deleteChatBotIntent,
  showFormUpdateIntent
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListIntent(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false});
  const size = 10;
  const [state, setState] = useState<any>({
    selectedRowKeys: [],
  });

  useEffect(() => {
    props.getListIntent({chatbot_id: props.selector_bot.bot_id, page: 1, size: 100});
  }, []);

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  const handleDelete = (event: any, intent: IntentEntity) => {
    let req: DeleteChatBotIntentRequest = {
      intent_id: intent.intent_id
    };
    props.deleteChatBotIntent(req);
  }

  const handleEdit = (event: any, intent: IntentEntity) => {
    props.showFormUpdateIntent(true, intent);
  }

  const columns: ColumnProps<IntentEntity>[] = [
    {
      title: 'Chat Bot',
      sorter: true,
      dataIndex: 'chatbot_name',
      width: 80,
    },
    {
      title: 'Ý định',
      dataIndex: 'intent_name',
      width: 80,
    },
    {
      title: 'Câu mẫu',
      dataIndex: 'sample_content',
      sorter: true,
      width: 160,
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
      render: (_text: string, record: IntentEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa Intent này chứ ?"
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
        rowKey="intent_id"
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

export default connector(ListIntent);
