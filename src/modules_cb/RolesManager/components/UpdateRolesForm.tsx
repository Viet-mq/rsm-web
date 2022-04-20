import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormAddAPIRoles, showFormAddViewRoles, showFormUpdate, updateRoles,} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Input, Modal, Popconfirm, Table} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {UpdateRolesRequest} from "../types";
import {ColumnProps} from "antd/lib/table";
import {emptyText} from "../../../configs/locales";
import {APIRolesEntity} from "../../APIRolesManager/types";
import {ViewRolesEntity} from "../../ViewRolesManager/types";
import AddAPIRolesForm from "./AddAPIRolesForm";
import AddViewRolesForm from "./AddViewRolesForm";
import {formItemLayout} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  rolesManager: state.rolesManager,

});
const connector = connect(mapStateToProps, {
  updateRoles,
  showFormUpdate,
  showFormAddAPIRoles,
  showFormAddViewRoles
});

type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateRolesFormProps extends FormComponentProps, ReduxProps {
}

function UpdateRolesForm(props: UpdateRolesFormProps) {
  const columnsAPIRoles: ColumnProps<APIRolesEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return index + 1
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 100,
    },

    {
      title: 'Miêu tả',
      dataIndex: 'description',
      width: 100,
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: APIRolesEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa API Roles này chứ ?"
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={event => handleDeleteAPIRoles(event, record)}
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
          </div>
        );
      },
    },
  ];
  const columnsViewRoles: ColumnProps<ViewRolesEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return index + 1
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 100,
    },

    {
      title: 'Miêu tả',
      dataIndex: 'description',
      width: 100,
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: ViewRolesEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa View Roles này chứ ?"
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={event => handleDeleteViewRoles(event, record)}
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
          </div>
        );
      },
    },
  ];
  const {showForm} = props.rolesManager
  const {getFieldDecorator, resetFields} = props.form;
  const scroll = {x: 300};
  const [apiRolesTable, setApiRolesTable] = useState<APIRolesEntity[]>([])
  const [viewRolesTable, setViewRolesTable] = useState<ViewRolesEntity[]>([])

  useEffect(() => {
    if (showForm.show_update) {
      setApiRolesTable([...showForm.data_update?.api_roles])
      setViewRolesTable([...showForm.data_update?.view_roles])
    }

  }, [showForm.show_update])

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateRolesRequest = {
          api_roles: apiRolesTable.map((item: any) => item.id),
          description: values.description,
          id: showForm.data_update.id,
          name: values.name,
          view_roles: viewRolesTable.map((item: any) => item.id)
        }
        props.updateRoles(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdate(false);
  }


  function handleShowAPIRolesForm(e: any) {
    e.preventDefault();
    props.showFormAddAPIRoles(true)
  }

  function handleShowViewRolesForm(e: any) {
    e.preventDefault();
    props.showFormAddViewRoles(true)
  }

  const handleDeleteAPIRoles = (event: any, record: APIRolesEntity) => {

    let index = apiRolesTable.findIndex(function (o: any) {
      return o.id === record.id;
    })
    if (index !== -1) {
      const api = apiRolesTable
      api.splice(index, 1)
      setApiRolesTable([...api])
    }
  }

  function handleDeleteViewRoles(event: any, record: ViewRolesEntity) {
    let index = viewRolesTable.findIndex(function (o: any) {
      return o.id === record.id;
    })
    if (index !== -1) {
      const view = viewRolesTable
      view.splice(index, 1)
      setViewRolesTable([...view])
    }
  }

  return (
    <>
      <Modal
        zIndex={2}
        maskClosable={false}
        title="Cập nhật Roles"
        visible={showForm.show_update}
        centered={true}
        width="1000px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
          props.showFormUpdate(false);
        }}
        footer={""}>

        <Form className="form-create">

          <Form.Item label="Tên Roles" className="form-label"  {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: showForm.data_update?.name,
              rules: [
                {
                  message: 'Vui lòng nhập tên  Roles',
                  required: true,
                },
              ],
            })(
              <Input placeholder="Tên  Roles" className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label="Miêu tả" className="form-label"  {...formItemLayout}>
            {getFieldDecorator('description', {
              initialValue: showForm.data_update?.description,
              rules: [
                {
                  message: 'Vui lòng nhập miêu tả',
                  required: true,
                },
              ],
            })(<Input placeholder="Nhập miêu tả" className="bg-white text-black"/>)}
          </Form.Item>

          <div className="flex-space-between mt-3">

            {/*api roles*/}
            <div className="ant-col-12 pr-3">
              <div className="flex-space-between-item-center mb-2">
                <div className="font-14-bold-500">API Roles</div>
                <div><Button onClick={handleShowAPIRolesForm} type={"primary"} size="small">Thêm</Button></div>
              </div>

              <div>
                <Table
                  scroll={scroll}
                  className="custom-table"
                  dataSource={apiRolesTable}
                  columns={columnsAPIRoles}
                  rowKey="id"
                  locale={{emptyText: emptyText}}
                />
              </div>
            </div>

            {/*view roles */}
            <div className="ant-col-12 pl-3">
              <div className="flex-space-between-item-center mb-2">
                <div className="font-14-bold-500">View Roles</div>
                <div><Button type={"primary"} size="small" onClick={handleShowViewRolesForm}>Thêm</Button></div>
              </div>

              <div>
                <Table
                  scroll={scroll}
                  className="custom-table"
                  dataSource={viewRolesTable}
                  columns={columnsViewRoles}
                  rowKey="id"
                  locale={{emptyText: emptyText}}
                />
              </div>
            </div>
            {/*----*/}
          </div>

          <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px', textAlign: "right"}} colon={false}>
            <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnUpdateClicked}>
              Cập nhật
            </Button>
            <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
              Hủy
            </Button>
          </Form.Item>

        </Form>


        {/*{showForm.show_update && <>*/}
        {/*    <AddAPIRolesForm setApiRolesTable={setApiRolesTable} apiRolesTable={apiRolesTable}/>*/}
        {/*<AddViewRolesForm setViewRolesTable={setViewRolesTable} viewRolesTable={viewRolesTable}/>*/}
        {/*</>}*/}
      </Modal>
      <AddAPIRolesForm setApiRolesTable={setApiRolesTable} apiRolesTable={apiRolesTable}/>
      <AddViewRolesForm setViewRolesTable={setViewRolesTable} viewRolesTable={viewRolesTable}/>
    </>
  )
};

export default connector(Form.create<UpdateRolesFormProps>()(UpdateRolesForm));
