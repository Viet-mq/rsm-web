import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect} from "react";
import {createTalentPool, showFormCreate} from "../redux/actions";
import {CreateTalentPoolRequest} from "../types";
import {getListAccount} from "../../AccountManager/redux/actions";
import {formItemLayout} from "../../../helpers/utilsFunc";

const {Option} = Select;
const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  listAccountState: state.accountManager.list,
  talentPoolManagerState: state.talentPoolManager,
})

const connector = connect(mapStateToProps, {
  createTalentPool,
  showFormCreate,
  getListAccount,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateTalentPoolFormProps extends FormComponentProps, ReduxProps {
}

function CreateTalentPoolForm(props: CreateTalentPoolFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};

  useEffect(() => {
    props.getListAccount({page: 1, size: 100});
  }, [])

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateTalentPoolRequest = {
          description: values.description,
          managers: values.managers,
          name: values.name
        }
        props.createTalentPool(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới kho tiềm năng"
      visible={props.talentPoolManagerState.showForm.show_create}
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

        <Form.Item label="Tên kho tiềm năng" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên kho tiềm năng',
                required: true,
              },
            ],
          })(
            <Input placeholder="Nhập tên kho tiềm năng" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item className="form-label" label="Mô tả kho tiềm năng" labelCol={{span: 24}}
                   wrapperCol={{span: 24}}>
          {getFieldDecorator('note', {
            initialValue: "",
            rules: [
              {
                message: 'Vui lòng nhập mô tả',
                required: false,
              },
            ],
          })(
            <TextArea placeholder="Nhập nội dung" style={{height: 100}} className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label="Thành viên quản lý - có quyền truy cập toàn bộ hồ sơ"
                   className="form-label"  {...formItemLayout}>
          {getFieldDecorator('managers', {
            initialValue: undefined,
            rules: [
              {
                message: 'Vui lòng chọn người quản lý',
                required: true,
              },
            ],
          })(
            <Select getPopupContainer={(trigger: any) => trigger.parentNode} mode="multiple"
                    className="bg-white text-black" style={fontWeightStyle} placeholder="Chọn thành viên"
            >
              {props.listAccountState.rows?.map((item: any, index: any) => (
                <Option key={index} value={item.username}>{item.fullName}</Option>
              ))}
            </Select>
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

export default connector(Form.create<CreateTalentPoolFormProps>()(CreateTalentPoolForm));
