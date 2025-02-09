import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateTalentPool} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect} from "react";
import {UpdateTalentPoolRequest} from "../types";
import {getListAccount} from "../../AccountManager/redux/actions";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  listAccountState: state.accountManager.list,
  showFormState: state.talentPoolManager.showForm,
})

const connector = connect(mapStateToProps, {
  showFormUpdate,
  updateTalentPool,
  getListAccount,

});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateTalentPoolFormProps extends FormComponentProps, ReduxProps {
}

function UpdateTalentPoolForm(props: UpdateTalentPoolFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '60px'};
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

  useEffect(() => {
    props.getListAccount({page: 1, size: 100});
  }, [])

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateTalentPoolRequest = {
          id: props.showFormState.data_update?.id,
          description: values.description,
          managers: values.managers,
          name: values.name,
          numberOfProfile: values.numberOfProfile
        }
        props.updateTalentPool(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdate(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật kho tiềm năng hệ thống"
      visible={props.showFormState.show_update}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showFormUpdate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên kho tiềm năng" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.showFormState.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên kho tiềm năng',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên kho tiềm năng" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Quản lý" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('managers', {
            initialValue: props.showFormState.data_update?.managers,
            rules: [
              {
                message: 'Vui lòng chọn người quản lý',
                required: true,
              },
            ],
          })(
            <Select getPopupContainer={(trigger: any) => trigger.parentNode} className="bg-white text-black"
                    mode="multiple"
                    placeholder="Vui lòng chọn người quản lý"
            >
              {props.listAccountState.rows?.map((item: any, index: any) => (
                <Option key={index} value={item.username}>{item.fullName}</Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Miêu tả" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('description', {
            initialValue: props.showFormState.data_update?.description,
            rules: [
              {
                message: 'Vui lòng nhập miêu tả',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập miêu tả" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
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

export default connector(Form.create<UpdateTalentPoolFormProps>()(UpdateTalentPoolForm));
