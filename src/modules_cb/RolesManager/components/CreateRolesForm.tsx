import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Input, Modal, Popconfirm, Table} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createRoles, showFormAddAPIRoles, showFormAddViewRoles, showFormCreate} from "../redux/actions";
import {CreateRolesRequest} from "../types";
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
  createRoles,
  showFormCreate,
  showFormAddAPIRoles,
  showFormAddViewRoles
});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateRolesFormProps extends FormComponentProps, ReduxProps {
}

function CreateRolesForm(props: CreateRolesFormProps) {

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
  const {showForm,create} = props.rolesManager
  const {getFieldDecorator, resetFields} = props.form;
  const scroll = {x: 300};
  const [apiRolesTable, setApiRolesTable] = useState<APIRolesEntity[]>([])
  const [viewRolesTable, setViewRolesTable] = useState<ViewRolesEntity[]>([])

  useEffect(()=>{
    if(create.response?.code===0){
      setApiRolesTable([])
      setViewRolesTable([])
    }
  },[create.response])

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateRolesRequest = {
          api_roles: apiRolesTable.map((item: any) => item.id),
          description: values.description,
          name: values.name,
          view_roles: viewRolesTable.map((item: any) => item.id)
        }
        props.createRoles(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setApiRolesTable([])
    setViewRolesTable([])
    props.showFormCreate(false);
  }

  function handleShowAPIRolesForm(e: any) {
    e.preventDefault();
    props.showFormAddAPIRoles(true)
  }

  function handleShowViewRolesForm(e: any) {
    e.preventDefault();
    props.showFormAddViewRoles(true)
  }

  function handleDeleteAPIRoles(event: any, record: any) {
    let index = apiRolesTable.findIndex(function (o: any) {
      return o.id === record.id;
    })
    if (index !== -1) {
      const newApiRolesTable=apiRolesTable
      newApiRolesTable.splice(index, 1)
      setApiRolesTable(newApiRolesTable)
    }
  }

  function handleDeleteViewRoles(event: any, record: ViewRolesEntity) {
    let index = viewRolesTable.findIndex(function (o: any) {
      return o.id === record.id;
    })
    if (index !== -1) {
      const newViewRolesTable=viewRolesTable
      newViewRolesTable.splice(index, 1)
      setViewRolesTable(newViewRolesTable)
    }
  }

  return (
    <>
      <Modal
        zIndex={2}
        maskClosable={false}
        title="Tạo mới Roles"
        visible={showForm.show_create}
        centered={true}
        width="1000px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
          props.showFormCreate(false);
        }}
        forceRender={false}
        footer={""}>

        <Form className="form-create">

          <Form.Item label="Tên Roles" className="form-label"  {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [
                {
                  message: 'Vui lòng nhập tên  Roles',
                  required: true,
                },
              ],
            })(<Input placeholder="Nhập tên  Roles" className="bg-white text-black"/>)}
          </Form.Item>

          <Form.Item label="Miêu tả" className="form-label"  {...formItemLayout}>
            {getFieldDecorator('description', {
              initialValue: '',
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
            <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
              Tạo mới
            </Button>
            <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
              Hủy
            </Button>
          </Form.Item>

        </Form>


        {showForm.show_create && <><AddAPIRolesForm setApiRolesTable={setApiRolesTable} apiRolesTable={apiRolesTable}/>
          <AddViewRolesForm setViewRolesTable={setViewRolesTable} viewRolesTable={viewRolesTable}/></>}
      </Modal>
    </>
  );

}

export default connector(Form.create<CreateRolesFormProps>()(CreateRolesForm));
