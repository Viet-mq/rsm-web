import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteSkill,
  getListSkill,
  showFormCreate,
  showFormUpdate,
  updateSkill
} from "../../redux/actions";
import {SkillEntity, DeleteSkillRequest} from "../../types";

const mapStateToProps = ({skillManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListSkill,
  deleteSkill,
  showFormCreate,
  showFormUpdate,
  updateSkill
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListSkill(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;

  useEffect(() => {
    props.getListSkill({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: SkillEntity) => {
    event.stopPropagation();
    let req: DeleteSkillRequest = {
      id: entity.id
    }
    props.deleteSkill(req);
  }

  const handleEdit = (event: any, entity: SkillEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  const columns: ColumnProps<SkillEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align:"center",
      render: (text, record, index) =>  {return (page - 1) * 10 + index + 1}
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
      render: (_text: string, record: SkillEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa kỹ năng này chứ ?"
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

export default connector(ListSkill);
