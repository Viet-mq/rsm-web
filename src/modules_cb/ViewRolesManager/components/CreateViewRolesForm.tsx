import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Tree} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createViewRoles, showFormCreate} from "../redux/actions";
import {CreateViewRolesRequest} from "../types";
import {formItemLayout} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  viewRolesManager: state.viewRolesManager,
  listView: state.viewManager.list
});
const connector = connect(mapStateToProps, {createViewRoles, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateViewRolesFormProps extends FormComponentProps, ReduxProps {
}

function CreateViewRolesForm(props: CreateViewRolesFormProps) {
  const {showForm} = props.viewRolesManager
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const [views, setViews] = useState<any>([]);
  const [permissionsChecked, setPermissionsChecked] = useState([]);
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

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateViewRolesRequest = {
          description: values.description,
          name: values.name,
          permissions: permissionsChecked
        }
        props.createViewRoles(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false);
  }

  const onCheck = (checkedKeysValue: any, e: any) => {
    const listView = e.checkedNodes
      .filter((node:any) => node.props.type === 'view')
      .map((node:any) => ({
        permission_id: node.key,
        actions: node.props.actions?.map((item:any)=>item.id),
      }));


    if(e.halfCheckedKeys){
       const newListView=e.halfCheckedKeys.map((item:any)=>({
        permission_id:item,
          actions:e.checkedNodes.filter((el:any)=> el.props.parent_id===item).map((childEl:any)=>childEl.props.id)
      }))
      const list:any=[...listView,...newListView]
      setPermissionsChecked(list);

    }

    setListChecked(checkedKeysValue);
  };

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới View Roles"
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

      <Form className="form-create" >

        <Form.Item label="Tên View Roles" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên View Roles',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên View Roles" className="bg-white text-black"/>)}
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

        <Form.Item label="Views" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('views', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập miêu tả',
                required: false,
              },
            ],
          })(
              <Tree
              treeData={views}
              checkable
              onCheck={onCheck}
              defaultExpandAll={true}
              checkedKeys={listChecked}
              style={fontWeightStyle}
            />
          )}
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

export default connector(Form.create<CreateViewRolesFormProps>()(CreateViewRolesForm));
