import React, {useEffect, useState} from "react";
import {RootState} from "src/redux/reducers";
import {getListContent, showFormUpdateContent} from "../redux/actions";
import {connect, ConnectedProps} from "react-redux";
import env from "../../../configs/env";
import {ColumnProps} from "antd/lib/table";
import moment from "moment";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "../../../configs/locales";
import {ChatBotContent} from "../types";

const mapStateToProps = ({contentManager: {list}, chatBotManager: {selector_bot}}: RootState) => ({list, selector_bot});
const mapDispatchToProps = {
  getListContent,
  showFormUpdateContent
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListContent(props: IProps) {

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

  useEffect(() => {
    props.getListContent({"chatbot_id": props.selector_bot.bot_id});
  }, []);


  function unixTimeToDate(unixTime: number): Date {
    return new Date(unixTime);
  }

  function handleDelete(event: any, chatBot: ChatBotContent) {
    console.log('chatBotDelete id => ', chatBot)
    event.stopPropagation();
  }

  function handleEdit(event: any, chatBot: ChatBotContent) {
    event.stopPropagation();
    console.log("handleEdit: " + JSON.stringify(chatBot));
    props.showFormUpdateContent(true, chatBot);
  }

  const columns: ColumnProps<ChatBotContent>[] = [
    {
      title: 'Chat Bot',
      dataIndex: 'chatbot_name',
      sorter: true,
      width: 80,
    },
    {
      title: 'Nội dung',
      sorter: true,
      dataIndex: 'sample_content',
      width: 100,
    },
    {
      title: 'Từ đồng nghĩa',
      dataIndex: 'synonyms_of_sample_content',
      width: 100,
    },
    {
      title: 'Ý định',
      dataIndex: 'intent_name',
      sorter: true,
      width: 80,
    },
    {
      title: 'Từ khóa - Thực thể',
      dataIndex: 'keywords_and_entities',
      sorter: true,
      width: 140,
      render: (value: any[]) => {
        return (
          <ul>
            {(value || []).map((item: any, index: number) => {
              return (
                <li key={item.keyword}>{item.keyword} : {item.entity_name}</li>
              );
            })}
          </ul>
        );
      }
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
      render: (_text: string, record: ChatBotContent) => {
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

  return (
    <>
      <Table
        scroll={scroll}
        className="custom-table"
        dataSource={props.list.rows}
        columns={columns}
        rowKey="content_id"
        locale={{emptyText: emptyText}}
        pagination={{
          current: page,
          pageSize: size,
          total: props.list.total,
          onChange: value => setPage(value),
          showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
        }}
        onRow={(record, recordIndex) => {
          return {
            onClick: event => {
            },
          };
        }}
      />
    </>
  )
}

export default connector(ListContent);
