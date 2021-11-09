import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Icon, Popconfirm, Table} from "antd";
import {emptyText} from "src/configs/locales";
import {
  deleteDepartment,
  getListDepartment,
  showFormCreate,
  showFormUpdate,
  updateDepartment
} from "../../redux/actions";
import {DepartmentEntity, DeleteDepartmentRequest} from "../../types";
import {ProfileEntity} from "../../../ProfileManager/types";

const mapStateToProps = ({departmentManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListDepartment,
  deleteDepartment,
  showFormCreate,
  showFormUpdate,
  updateDepartment
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function ListDepartment(props: IProps) {

  let screenWidth = document.documentElement.clientWidth;
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;


  useEffect(() => {
    props.getListDepartment({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: DepartmentEntity) => {
    // event.stopPropagation();
    // let req: DeleteDepartmentRequest = {
    //   id: entity.id
    // }
    // props.deleteDepartment(req);
  }

  const handleEdit = (event: any, entity: DepartmentEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  const columns: ColumnProps<DepartmentEntity>[] = [

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
      render: (_text: string, record: DepartmentEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa phòng ban này chứ ?"
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

export default connector(ListDepartment);
