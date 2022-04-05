import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, TreeSelect} from "antd";
import React, {FormEvent, useState} from "react";
import {createDepartment, showFormCreate} from "../redux/actions";
import {CreateDepartmentRequest} from "../types";

const {TreeNode} = TreeSelect;

const mapStateToProps = (state: RootState) => ({
  departmentManager: state.departmentManager
});
const connector = connect(mapStateToProps, {createDepartment, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateDepartmentFormProps extends FormComponentProps, ReduxProps {
}

function CreateDepartmentForm(props: CreateDepartmentFormProps) {

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };
  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '60px'};
  const {list} = props.departmentManager
  const [valueSelect, setValueSelect] = useState(undefined)
  const fontWeightStyle = {fontWeight: 400};
  // const [searchValue, setSearchValue] = useState("");

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateDepartmentRequest = {
          name: values.name,
          idParent: valueSelect,
        }
        props.createDepartment(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false);
  }

  function onChange(value: any) {
    console.log(value);
    setValueSelect(value)
  };

  const filterTreeNode = (input:any,node: any) => {
    const title = node.props.title;
    return title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };


  return (

    <Modal
      zIndex={4}
      maskClosable={false}
      title="Tạo mới phòng ban"
      visible={props.departmentManager.showForm.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showFormCreate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên phòng ban" className="form-label" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên phòng ban',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên phòng ban" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Thuộc phòng ban" className="form-label" style={{...formItemStyle}}>
          {getFieldDecorator('idParent', {
            initialValue: undefined,
            rules: [
              {
                message: 'Vui lòng chọn phòng ban',
                required: false,
              },
            ],
          })(
            <TreeSelect
              style={{width: '100%', ...fontWeightStyle}}
              showSearch
              allowClear
              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
              placeholder="Chọn phòng ban"
              className="bg-white text-black"
              onChange={onChange}
              getPopupContainer={(trigger: any) => trigger.parentNode}
              filterTreeNode={filterTreeNode}

            >
              {list.rows?.map((item: any) => (
                <TreeNode style={fontWeightStyle} value={item.id} title={item.name} key={item.id}>
                  {item.children ? item.children.map((el: any) => (
                    <TreeNode style={fontWeightStyle} value={el.id} key={el.id} title={el.name}/>
                  )) : null}
                </TreeNode>

              ))}

            </TreeSelect>
          )}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
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

export default connector(Form.create<CreateDepartmentFormProps>()(CreateDepartmentForm));
