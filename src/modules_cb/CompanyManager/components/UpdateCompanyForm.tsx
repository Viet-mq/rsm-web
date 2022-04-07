import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateCompany} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {UpdateCompanyRequest} from "../types";

const mapStateToProps = (state: RootState) => ({
  companyManager: state.companyManager,
});
const connector = connect(mapStateToProps, {showFormUpdate, updateCompany});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateCompanyFormProps extends FormComponentProps, ReduxProps {
}

function UpdateCompanyForm(props: UpdateCompanyFormProps) {
  const {showForm} = props.companyManager
  const {getFieldDecorator, resetFields} = props.form;
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

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateCompanyRequest = {
          name: values.name,
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


  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật công ty"
      visible={showForm.show_update}
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

      <Form className="form-create">

        <Form.Item label="Tên  Công ty" className="form-label"  {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên Công ty',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên Công ty" className="bg-white text-black"/>
          )}
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
