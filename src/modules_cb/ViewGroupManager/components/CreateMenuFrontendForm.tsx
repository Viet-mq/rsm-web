import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {createMenuFrontEnd, showFormMenuFrontEndCreate} from "../redux/actions";
import {CreateMenuFrontendRequest} from "../types";

const mapStateToProps = ({viewGroupManager}: RootState) => ({viewGroupManager});
const connector = connect(mapStateToProps, {showFormMenuFrontEndCreate, createMenuFrontEnd});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateMenuFrontendFormProps extends FormComponentProps, ReduxProps {
}

function CreateMenuFrontendForm(props: CreateMenuFrontendFormProps) {
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
        let req: CreateMenuFrontendRequest = {
          name: values.name,
        }
        console.log("values: " + JSON.stringify(req));
        props.createMenuFrontEnd(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormMenuFrontEndCreate(false);
  }

  const onCheckBoxChange = (e: any) => {
    setShow(e.target.checked);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới menu"
      visible={props.viewGroupManager.showForm.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormMenuFrontEndCreate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

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

export default connector(Form.create<CreateMenuFrontendFormProps>()(CreateMenuFrontendForm));
