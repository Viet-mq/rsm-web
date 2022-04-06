import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Table} from "antd";
import React, {FormEvent, useState} from "react";
import {createAPIRoles, showFormCreate} from "../redux/actions";
import {CreateAPIRolesRequest} from "../types";
import {ColumnProps} from "antd/lib/table";
import {ApiEntity} from "../../APIManager/types";
import env from "../../../configs/env";
import {emptyText} from "../../../configs/locales";
import {formItemLayout} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  apiRolesManager: state.apiRolesManager,
  listApi: state.apiManager.list
});
const connector = connect(mapStateToProps, {createAPIRoles, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateAPIRolesFormProps extends FormComponentProps, ReduxProps {
}

function CreateAPIRolesForm(props: CreateAPIRolesFormProps) {
  const {showForm} = props.apiRolesManager
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  let screenWidth = document.documentElement.clientWidth;
  // const [page, setPage] = useState(1);
  const page = 1
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  // const size = 10;
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const columns: ColumnProps<ApiEntity>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return (page - 1) * 10 + index + 1
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 100,
    },

    {
      title: 'Phương thức',
      dataIndex: 'method',
      width: 100,
    },
    {
      title: 'Đường dẫn',
      dataIndex: 'path',
      width: 200,
    },
  ];

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateAPIRolesRequest = {
          apis: selectedRowKeys,
          description: values.description,
          name: values.name
        }
        props.createAPIRoles(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false);
  }

  const handleChangeAPIs = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới API Roles"
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
      footer={""}>

      <Form className="form-create">

        <Form.Item label="Tên API Roles" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên API Roles',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên API Roles" className="bg-white text-black"/>)}
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

        <Form.Item label="APIs" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('apis', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập miêu tả',
                required: false,
              },
            ],
          })(<Table
            rowKey={'id'}
            size="small"
            columns={columns}
            dataSource={props.listApi.rows}
            scroll={scroll}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectedRowKeys,
              onChange: handleChangeAPIs,
            }}
            pagination={false}
            className="custom-table"
            style={fontWeightStyle}
            locale={{emptyText: emptyText}}
          />)}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px', textAlign: "right"}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
            Tạo mới
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  );

}

export default connector(Form.create<CreateAPIRolesFormProps>()(CreateAPIRolesForm));
