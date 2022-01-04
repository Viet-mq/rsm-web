import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {createViewFrontEnd, showFrontEndViewCreateForm} from "../redux/actions";
import {CreateFrontendViewRequest} from "../types";

const mapStateToProps = ({viewManager}: RootState) => ({viewManager});
const connector = connect(mapStateToProps, {showFrontEndViewCreateForm, createViewFrontEnd});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateViewFormProps extends FormComponentProps, ReduxProps {
}

function CreateViewForm(props: CreateViewFormProps) {

  const [show, setShow] = useState<boolean>(true);
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
        let req: CreateFrontendViewRequest = {
          id: values.path,
          name: values.name,
          icon: values.icon,
          show: show
        }
        console.log("values: " + JSON.stringify(req));
        props.createViewFrontEnd(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFrontEndViewCreateForm(false);
  }

  const onCheckBoxChange = (e: any) => {
    setShow(e.target.checked);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới menu"
      visible={props.viewManager.showForm.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFrontEndViewCreateForm(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Đường dẫn" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('path', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập đường dẫn',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập đường dẫn" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Tên menu" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên menu" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Icon" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('icon', {
            initialValue: '',
            rules: [],
          })(<Input placeholder="Nhập icon menu" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Show" className="mb-0" style={{...formItemStyle}}>
          <Checkbox checked={show} onChange={onCheckBoxChange}/>
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

export default connector(Form.create<CreateViewFormProps>()(CreateViewForm));
