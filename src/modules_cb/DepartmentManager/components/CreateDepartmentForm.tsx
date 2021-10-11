import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {createDepartment, showFormCreate} from "../redux/actions";
import {CreateDepartmentRequest} from "../types";

const mapStateToProps = ({departmentManager}: RootState) => ({departmentManager});
const connector = connect(mapStateToProps, {createDepartment, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateDepartmentFormProps extends FormComponentProps, ReduxProps {
}

function CreateDepartmentForm(props: CreateDepartmentFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
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

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateDepartmentRequest = {
          name: values.name,
        }
        console.log("values: " + JSON.stringify(req));
        props.createDepartment(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormCreate(false);
  }


  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới phòng ban"
      visible={props.departmentManager.showForm.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormCreate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên phòng ban" className="mb-0" style={{...formItemStyle}}>
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
