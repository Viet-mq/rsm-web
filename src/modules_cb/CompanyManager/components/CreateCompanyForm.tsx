import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, TreeSelect} from "antd";
import React, {FormEvent, useState} from "react";
import {createCompany, showFormCreate} from "../redux/actions";
import {CreateCompanyRequest} from "../types";
import {formItemLayout} from "../../../helpers/utilsFunc";

const {TreeNode} = TreeSelect;

const mapStateToProps = (state: RootState) => ({
  companyManager: state.companyManager,

});
const connector = connect(mapStateToProps, {createCompany, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateCompanyFormProps extends FormComponentProps, ReduxProps {
}

function CreateCompanyForm(props: CreateCompanyFormProps) {
  const {showForm,list} = props.companyManager
  const {getFieldDecorator, resetFields} = props.form;
  const [valueSelect, setValueSelect] = useState(undefined)
  const formItemStyle = {height: '60px'};
  const fontWeightStyle = {fontWeight: 400};

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateCompanyRequest = {
          name: values.name,
          idParent: valueSelect,
        }
        props.createCompany(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false);
  }

  const filterTreeNode = (input: any, node: any) => {
    const title = node.props.title;
    return title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  function onChange(value: any) {
    setValueSelect(value)
  };

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới Công ty"
      visible={showForm.show_create}
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

      <Form className="form-create">

        <Form.Item label="Tên Công ty" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên Công ty',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên Công ty" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Thuộc công ty" className="form-label" style={{...formItemStyle}}>
          {getFieldDecorator('idParent', {
            initialValue: undefined,
            rules: [
              {
                message: 'Vui lòng chọn công ty',
                required: false,
              },
            ],
          })(
            <TreeSelect
              style={{width: '100%', ...fontWeightStyle}}
              showSearch
              allowClear
              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
              placeholder="Chọn công ty"
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

export default connector(Form.create<CreateCompanyFormProps>()(CreateCompanyForm));
