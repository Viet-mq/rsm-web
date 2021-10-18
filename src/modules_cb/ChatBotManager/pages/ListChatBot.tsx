import React, {useEffect, useState} from "react";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import env from "src/configs/env";
import {ColumnProps} from 'antd/lib/table';
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "../../../configs/locales";
import {ChatBot} from "../types";
import moment from 'moment';
import {deleteChatBot, showUpdateChatBotForm} from "../redux/actions";

const mapStateToProps = ({chatBotManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {deleteChatBot, showUpdateChatBotForm});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListChatBot(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false});
  const size = 10;
  const [state, setState] = useState<any>({
    selectedRowKeys: [],
  });

  useEffect(() => {

    function updateSize() {
      if (document.documentElement.clientWidth < env.desktopWidth) setScroll({x: 'fit-content'})
      else setScroll({x: false})
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);

  }, []);

  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  function handleDelete(event: any, chatBot: ChatBot) {
    event.stopPropagation();
    props.deleteChatBot(chatBot.chatbot_id);
  }

  function handleEdit(event: any, chatBot: ChatBot) {
    event.stopPropagation();
    props.showUpdateChatBotForm(chatBot);
  }

  const columns: ColumnProps<ChatBot>[] = [
    {
      title: 'Tên Chat Bot',
      dataIndex: 'chatbot_name',
      sorter: true,
      width: 100,
    },
    {
      title: 'Ngôn ngữ',
      sorter: true,
      dataIndex: 'chatbot_language_id',
      width: 80,
      render: (value: number) => {
        if (value === 0) {
          return 'Tiếng Anh';
        } else {
          return 'Tiếng Việt';
        }
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'chatbot_description',
      width: 160,
    },
    {
      title: 'Active',
      dataIndex: 'active_status',
      sorter: true,
      width: 80,
      render: (value: number) => {
        if (value === 1) {
          return 'Active'
        } else {
          return 'Disabled'
        }
      },
    },
    {
      title: 'Train',
      dataIndex: 'training_status',
      sorter: true,
      width: 100,
      render: (value: number) => {
        if (value === 0) {
          return 'Pending';
        } else if (value === 1) {
          return 'Training';
        } else if (value === 2) {
          return 'Trained';
        }
        return 'Unknown';
      },
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
      render: (_text: string, record: ChatBot) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa Chat Bot này ?"
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
                    onClick={event => handleEdit(event, record)}>
              <Icon type="edit"/>
            </Button>
          </div>
        );
      },
    },
  ];

  function handleRowClick(event: any, chatBot: ChatBot) {
    event.stopPropagation();
  }

  function handleTableChange(pagination: any, filters: any, sorter: any) {

  }

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
        rowKey="chatbot_id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: props.list.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
        onChange={handleTableChange}
        onRow={(record, recordIndex) => {
          return {
            onClick: event => {
              handleRowClick(event, record);
            },
          };
        }}
        rowClassName={() => {
          return 'cursor-pointer';
        }}
      />
    </>
  )
}

export default connector(ListChatBot);
