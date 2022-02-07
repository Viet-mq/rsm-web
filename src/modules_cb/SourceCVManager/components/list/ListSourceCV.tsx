import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteSourceCV,
  getListSourceCV,
  showFormCreate,
  showFormUpdate,
  updateSourceCV
} from "../../redux/actions";
import {SourceCVEntity, DeleteSourceCVRequest} from "../../types";

const mapStateToProps = ({sourcecvManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListSourceCV,
   deleteSourceCV,
  showFormCreate,
  showFormUpdate,
  updateSourceCV
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListSourceCV(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;


  useEffect(() => {
    props.getListSourceCV({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: SourceCVEntity) => {
    event.stopPropagation();
    let req: DeleteSourceCVRequest = {
      id: entity.id
    }
    props.deleteSourceCV(req);
  }

  const handleEdit = (event: any, entity: SourceCVEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  const columns: ColumnProps<SourceCVEntity>[] = [
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
      render: (_text: string, record: SourceCVEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa Nguồn ứng viên này chứ ?"
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

export default connector(ListSourceCV);
