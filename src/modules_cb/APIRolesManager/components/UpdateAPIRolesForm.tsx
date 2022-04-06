import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateAPIRoles} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Table} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {UpdateAPIRolesRequest} from "../types";
import env from "../../../configs/env";
import {ColumnProps} from "antd/lib/table";
import {ApiEntity} from "../../APIManager/types";
import {emptyText} from "../../../configs/locales";
import {formItemLayout} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  apiRolesManager: state.apiRolesManager,
  listApi: state.apiManager.list
});
const connector = connect(mapStateToProps, {showFormUpdate, updateAPIRoles});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateAPIRolesFormProps extends FormComponentProps, ReduxProps {
}

function UpdateAPIRolesForm(props: UpdateAPIRolesFormProps) {
  const {showForm} = props.apiRolesManager
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  let screenWidth = document.documentElement.clientWidth;
  // const [page, setPage] = useState(1);
  const page=1
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

  useEffect(() => {
    if(showForm.data_update?.apis){
      setSelectedRowKeys(showForm.data_update.apis)
    }
  }, [showForm.data_update?.apis])


  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateAPIRolesRequest = {
          apis: selectedRowKeys,
          description: values.description,
          name: values.name,
          id: showForm.data_update?.id,
        }
        props.updateAPIRoles(req);
        return;
      }
    });
  }


  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdate(false);
  }

  const handleChangeAPIs = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };


  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật API Roles"
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

        <Form.Item label="Tên API Roles" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên API Roles',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên API Roles" className="bg-white text-black"/>
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

        <Form.Item label="APIs" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('apis', {
            initialValue: showForm.data_update?.apis,
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
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnUpdateClicked}>
            Cập nhật
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  )
}

export default connector(Form.create<UpdateAPIRolesFormProps>()(UpdateAPIRolesForm));
