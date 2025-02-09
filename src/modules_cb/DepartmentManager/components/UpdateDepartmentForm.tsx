import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormUpdate, updateDepartment} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {UpdateDepartmentRequest} from "../types";

const mapStateToProps = (state: RootState) => ({
  departmentManager: state.departmentManager
});
const connector = connect(mapStateToProps, {showFormUpdate, updateDepartment});
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateDepartmentFormProps extends FormComponentProps, ReduxProps {
}

function UpdateDepartmentForm(props: UpdateDepartmentFormProps) {
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
  const {showForm} = props.departmentManager

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let req: UpdateDepartmentRequest = {
          id: showForm.data_update?.id,
          name: values.name,

        }
        props.updateDepartment(req);
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
      title="Cập nhật phòng ban hệ thống"
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

      <Form {...formItemLayout}>

        <Form.Item label="Tên phòng ban" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên phòng ban',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên phòng ban" className="bg-white text-black"/>
          )}
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

export default connector(Form.create<UpdateDepartmentFormProps>()(UpdateDepartmentForm));
