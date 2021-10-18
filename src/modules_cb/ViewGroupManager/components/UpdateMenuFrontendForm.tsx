import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {showFormMenuFrontEndUpdate, updateMenuFrontEnd} from "../redux/actions";
import { UpdateMenuFrontendRequest} from "../types";

const mapStateToProps = ({viewGroupManager}: RootState) => ({viewGroupManager});
const connector = connect(mapStateToProps, {showFormMenuFrontEndUpdate, updateMenuFrontEnd});

type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateMenuFrontendFormProps extends FormComponentProps, ReduxProps {
}

function UpdateMenuFrontendForm(props: UpdateMenuFrontendFormProps) {

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
        let req: UpdateMenuFrontendRequest = {

          id: values.id,
          name: values.name,
          viewIds: [
            values.view_action,
          ]
        }
        props.updateMenuFrontEnd(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormMenuFrontEndUpdate(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật menu"
      visible={props.viewGroupManager.showForm.show_update}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormMenuFrontEndUpdate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="ID" className="mb-0" style={{...formItemStyle,display:"none"}}>
          {getFieldDecorator('id', {
            initialValue: props.viewGroupManager.showForm.view?.id,
            rules: [
              {
                message: 'Vui lòng nhập id',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập id" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Tên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.viewGroupManager.showForm.view?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên view',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên view" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="View Action" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('view_action', {
            initialValue: props.viewGroupManager.showForm.view?.views[0]?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên view action',
                required: false,
              },
            ],
          })(<Input placeholder="Nhập tên view action" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
            Cập nhật
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>

        </Form.Item>

      </Form>

    </Modal>

  );

}

export default connector(Form.create<UpdateMenuFrontendFormProps>()(UpdateMenuFrontendForm));
