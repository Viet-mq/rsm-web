import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormAddAPIRoles} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import {APIRolesEntity} from "../../APIRolesManager/types";
import {getListAPIRoles, getSearchAPIRoles} from "../../APIRolesManager/redux/actions";

const {Option} = Select;
const mapStateToProps = (state: RootState) => ({
  rolesManager: state.rolesManager,
  listAPIRoles: state.apiRolesManager.list,
});
const connector = connect(mapStateToProps, {
  showFormAddAPIRoles,
  getSearchAPIRoles,
  getListAPIRoles
});
type ReduxProps = ConnectedProps<typeof connector>;

interface AddAPIRolesFormProps extends FormComponentProps, ReduxProps {
  setApiRolesTable?: any,
  apiRolesTable?: any,
  setApiRolesTableUpdate?: any,
  apiRolesTableUpdate?: any
}

function AddAPIRolesForm(props: AddAPIRolesFormProps) {
  const {showForm} = props.rolesManager
  const {getFieldDecorator, resetFields} = props.form;
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 24},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 24},
    },
  };
  const [apiRoles, setApiRoles] = useState<APIRolesEntity[]>([]);
  const [trigger, setTrigger] = useState({
    apiRoles: false,
  })
  const [addAPIRoles, setAddAPIRoles] = useState<any>()

  // useEffect(() => {
  //   if (showForm.show_add_api_roles) {
  //     props.getListAPIRoles();
  //   }
  // }, [showForm.show_add_api_roles])

  useEffect(() => {
    if (showForm.show_add_api_roles) {
      setApiRoles(props.listAPIRoles.rows)
    }
  }, [props.listAPIRoles])

  const handleCloseForm = (event: any) => {
    event.stopPropagation();
    resetFields();
    setAddAPIRoles(undefined)
    props.showFormAddAPIRoles(false)
  }

  function onSearchAPIRoles(value: any) {
    props.getSearchAPIRoles({name: value})
    setTrigger({...trigger, apiRoles: true})
  }

  function onFocusAPIRoles() {
    setApiRoles(props.listAPIRoles.rows)
  }

  function handleSelectAPIRoles(value: any) {
    console.log("value", value)
    setAddAPIRoles(JSON.parse(value));
  }

  function btnAddAPIRolesClicked() {
    const checkDuplicate = props.apiRolesTable.some((item: any) => item.id === addAPIRoles.id);
    if (!checkDuplicate) {
      props.setApiRolesTable([...props.apiRolesTable, addAPIRoles])
    }
    setAddAPIRoles(undefined)
    props.showFormAddAPIRoles(false)
  }

  return (

    <Modal
      zIndex={5}
      maskClosable={false}
      visible={showForm.show_add_api_roles}
      centered={true}
      width="530px"
      className="custom"
      afterClose={() => {
        resetFields();
      }}
      onCancel={handleCloseForm}
      footer={""}>
      <div className="schedule-detail">
        <div className="schedule-detail-head">
          <div className="schedule-detail-title">Thêm API Roles</div>
        </div>

        <div className="select-option">
          <Select getPopupContainer={(trigger: any) => trigger.parentNode}
                  style={{width: "100%", paddingTop: 15}}
                  onSelect={handleSelectAPIRoles}
                  placeholder={"Chọn API Roles"}
                  value={JSON.stringify(addAPIRoles)}
                  className="bg-white text-black "
                  onSearch={onSearchAPIRoles}
                  onFocus={onFocusAPIRoles}
                  filterOption={(input, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  optionFilterProp="children"
                  showSearch
          >
            {apiRoles.map((item: any, index: any) => {
              return <Option key={index} value={JSON.stringify(item)}>{item.name}</Option>
            })}

          </Select>
        </div>
      </div>

      <div className="footer-right">
        <Button onClick={handleCloseForm}>Hủy</Button>
        <Button onClick={btnAddAPIRolesClicked} type={"primary"} className="ml-2">Thêm</Button>
      </div>
    </Modal>

  )
}

export default connector(Form.create<AddAPIRolesFormProps>()(AddAPIRolesForm));
