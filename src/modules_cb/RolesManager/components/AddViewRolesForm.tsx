import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormAddViewRoles} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import {ViewRolesEntity} from "../../ViewRolesManager/types";
import {getListViewRoles, getSearchViewRoles} from "../../ViewRolesManager/redux/actions";

const {Option} = Select;
const mapStateToProps = (state: RootState) => ({
  rolesManager: state.rolesManager,
  listViewRoles: state.viewRolesManager.list,
});
const connector = connect(mapStateToProps, {
  showFormAddViewRoles,
  getSearchViewRoles,
  getListViewRoles
});
type ReduxProps = ConnectedProps<typeof connector>;

interface AddViewRolesFormProps extends FormComponentProps, ReduxProps {
  setViewRolesTable?: any,
  viewRolesTable?: any,
  setViewRolesTable1?: any,
  viewRolesTable1?: any,

}

function AddViewRolesForm(props: AddViewRolesFormProps) {
  const {showForm} = props.rolesManager
  const {getFieldDecorator, resetFields} = props.form;
  const [viewRoles, setViewRoles] = useState<ViewRolesEntity[]>([]);
  const [trigger, setTrigger] = useState({
    viewRoles: false,
  })
  const [addViewRoles, setAddViewRoles] = useState<any>()

  // useEffect(() => {
  //   if (showForm.show_add_view_roles) {
  //     props.getListViewRoles();
  //   }
  // }, [showForm.show_add_view_roles])

  useEffect(() => {
    if (showForm.show_add_view_roles) {
      setViewRoles(props.listViewRoles.rows)
    }
  }, [props.listViewRoles])

  const handleCloseForm = (event: any) => {
    event.stopPropagation();
    resetFields();
    setAddViewRoles(undefined)
    props.showFormAddViewRoles(false)
  }

  function onSearchViewRoles(value: any) {
    props.getSearchViewRoles({name: value})
    setTrigger({...trigger, viewRoles: true})
  }

  function onFocusViewRoles() {
    setViewRoles(props.listViewRoles.rows)
  }

  function handleSelectViewRoles(value: any) {
    setAddViewRoles(JSON.parse(value));
  }

  function btnAddViewRolesClicked() {
 
    const checkDuplicate = props.viewRolesTable.some((item:any) => item.id === addViewRoles.id);
    if(!checkDuplicate){
      props.setViewRolesTable([...props.viewRolesTable, addViewRoles])
    }
    setAddViewRoles("")

    props.showFormAddViewRoles(false)
  }

  return (

    <Modal
      zIndex={5}
      maskClosable={false}
      visible={showForm.show_add_view_roles}
      centered={true}
      width="530px"
      className="custom"
      forceRender={false}
      afterClose={() => {
      }}
      onCancel={handleCloseForm}
      footer={""}>
      <div className="schedule-detail">
        <div className="schedule-detail-head">
          <div className="schedule-detail-title">Thêm View Roles</div>
        </div>

        <div className="select-option">
          <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                  style={{width: "100%", paddingTop: 15}}
                  onSelect={handleSelectViewRoles}
                  placeholder={"Chọn View Roles"}
                  value={JSON.stringify(addViewRoles)}
                  className="bg-white text-black "
                  onSearch={onSearchViewRoles}
                  onFocus={onFocusViewRoles}
                  filterOption={(input, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  optionFilterProp="children"
                  showSearch
          >
            {viewRoles.map((item: any, index: any) => {
              return <Option key={index} value={JSON.stringify(item)}>{item.name}</Option>
            })}

          </Select>
        </div>
      </div>

      <div className="footer-right">
        <Button onClick={handleCloseForm}>Hủy</Button>
        <Button onClick={btnAddViewRolesClicked} type={"primary"} className="ml-2">Thêm</Button>
      </div>
    </Modal>

  )
}

export default connector(Form.create<AddViewRolesFormProps>()(AddViewRolesForm));
