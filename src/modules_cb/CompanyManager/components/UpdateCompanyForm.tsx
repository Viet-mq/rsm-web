import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateCompany} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Tree} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {DepartmentRequest, UpdateCompanyRequest} from "../types";
import {formItemLayout} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  companyManager: state.companyManager,
  listView: state.viewManager.list,
  listDepartment: state.departmentManager.list
});
const connector = connect(mapStateToProps, {showFormUpdate, updateCompany});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateCompanyFormProps extends FormComponentProps, ReduxProps {
}

function UpdateCompanyForm(props: UpdateCompanyFormProps) {
  const {showForm} = props.companyManager
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const [department, setDepartment] = useState<any>([]);
  // const [departmentChecked, setDepartmentChecked] = useState<DepartmentRequest[]>([]);
  const [listChecked, setListChecked] = useState([]);

  useEffect(() => {
    if (showForm.data_update) {
      const newDepartment=recursiveDepartment(props.listDepartment.rows)
      setDepartment(newDepartment)
    }
  }, [showForm.data_update])

  function recursiveDepartment(department: any) {
    return department?.map((item: any) => ({
      title: item.name,
      id: item.id,
      key: item.id,
      children:recursiveDepartment(item.children)
    }))
  }

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateCompanyRequest = {
          description: values.description,
          name: values.name,
          organizations: listChecked,
          id: showForm.data_update?.id
        }
        props.updateCompany(req);
        return;
      }
    });
  }


  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdate(false);
  }

  const onCheck = (checkedKeysValue: any, e: any) => {
    // const listView = e.checkedNodes
    //   .filter((node: any) => node.props.type === 'view')
    //   .map((node: any) => ({
    //     permission_id: node.key,
    //     actions: node.props.actions?.map((item: any) => item.id),
    //   }));
    //
    //
    // if (e.halfCheckedKeys) {
    //   const newListView = e.halfCheckedKeys.map((item: any) => ({
    //     permission_id: item,
    //     actions: e.checkedNodes.filter((el: any) => el.props.parent_id === item).map((childEl: any) => childEl.props.id)
    //   }))
    //   const list: any = [...listView, ...newListView]
    //   setListChecked(list);
    //
    // }

    setListChecked(checkedKeysValue);
  };

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật công ty"
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

        <Form.Item label="Tên  Công ty" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên  Công ty',
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

        <Form.Item label="Phòng ban" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('organizations', {
            initialValue: showForm.data_update?.organizations,
            rules: [
              {
                message: 'Vui lòng chọn phòng ban',
                required: false,
              },
            ],
          })(<Tree
            treeData={department && department}
            checkable
            onCheck={onCheck}
            defaultExpandAll={false}
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

export default connector(Form.create<UpdateCompanyFormProps>()(UpdateCompanyForm));
