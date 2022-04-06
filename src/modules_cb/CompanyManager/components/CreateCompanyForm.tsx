import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {createCompany, showFormCreate} from "../redux/actions";
import {CreateCompanyRequest} from "../types";
import {formItemLayout} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  companyManager: state.companyManager,

});
const connector = connect(mapStateToProps, {createCompany, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateCompanyFormProps extends FormComponentProps, ReduxProps {
}

function CreateCompanyForm(props: CreateCompanyFormProps) {
  const {showForm} = props.companyManager
  const {getFieldDecorator, resetFields} = props.form;

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateCompanyRequest = {
          description: values.description,
          name: values.name,
          organizations: []
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
