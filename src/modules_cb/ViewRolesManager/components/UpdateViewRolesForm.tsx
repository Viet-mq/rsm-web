import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateViewRoles} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Tree} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {PermissionsRequest, UpdateViewRolesRequest} from "../types";
import {formItemLayout} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  viewRolesManager: state.viewRolesManager,
  listView: state.viewManager.list
});
const connector = connect(mapStateToProps, {showFormUpdate, updateViewRoles});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateViewRolesFormProps extends FormComponentProps, ReduxProps {
}

function UpdateViewRolesForm(props: UpdateViewRolesFormProps) {
  const {showForm} = props.viewRolesManager
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const [views, setViews] = useState<any>([]);
  const [permissionsChecked, setPermissionsChecked] = useState<PermissionsRequest[]>([]);
  const [listChecked, setListChecked] = useState([]);

  useEffect(() => {
    if (props.listView) {
      const newViews = props.listView.rows?.map((e: any) => ({
        ...e,
        key: e.id,
        type: 'view',
        children: e.actions.map((a: any) => ({
          ...a,
          key: a.id,
          type: 'action',
          parent_id: e.id,
        })),
      }));

      setViews(newViews);
    }
  }, [props.listView])

  useEffect(()=>{
    if(showForm.data_update?.permissions){
      const a =showForm.data_update.permissions.map((node:any) => node.actions.map((item:any)=>item.id)).flat()
      setListChecked(a)
      setPermissionsChecked(showForm.data_update.permissions.map((item:any)=>({permission_id:item.id,actions:item.actions.map((el:any)=>el.id)})))
    }
  },[showForm.data_update])

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateViewRolesRequest = {
          description: values.description,
          name: values.name,
          permissions: permissionsChecked,
          id: showForm.data_update?.id
        }
        props.updateViewRoles(req);
        return;
      }
    });
  }


  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdate(false);
  }

  const onCheck = (checkedKeysValue: any, e: any) => {
    const listView = e.checkedNodes
      .filter((node: any) => node.props.type === 'view')
      .map((node: any) => ({
        permission_id: node.key,
        actions: node.props.actions?.map((item: any) => item.id),
      }));


    if (e.halfCheckedKeys) {
      const newListView = e.halfCheckedKeys.map((item: any) => ({
        permission_id: item,
        actions: e.checkedNodes.filter((el: any) => el.props.parent_id === item).map((childEl: any) => childEl.props.id)
      }))
      const list: any = [...listView, ...newListView]
      setPermissionsChecked(list);

    }

    setListChecked(checkedKeysValue);
  };

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật View Roles"
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

        <Form.Item label="Tên View Roles" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên View Roles',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên View Roles" className="bg-white text-black"/>
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

        <Form.Item label="Views" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('views', {
            initialValue: showForm.data_update?.views,
            rules: [
              {
                message: 'Vui lòng nhập miêu tả',
                required: false,
              },
            ],
          })(<Tree
            treeData={views}
            checkable
            onCheck={onCheck}
            defaultExpandAll={true}
            checkedKeys={listChecked}
            style={fontWeightStyle}
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

export default connector(Form.create<UpdateViewRolesFormProps>()(UpdateViewRolesForm));
