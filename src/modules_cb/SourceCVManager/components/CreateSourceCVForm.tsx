import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {createSourceCV, showFormCreate} from "../redux/actions";
import {CreateSourceCVRequest} from "../types";

const mapStateToProps = ({sourcecvManager}: RootState) => ({sourcecvManager});
const connector = connect(mapStateToProps, {createSourceCV, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateSourceCVFormProps extends FormComponentProps, ReduxProps {
}

function CreateSourceCVForm(props: CreateSourceCVFormProps) {

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

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateSourceCVRequest = {
          name: values.name,
        }
        props.createSourceCV(req);
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
      title="Tạo mới Nguồn ứng viên"
      visible={props.sourcecvManager.showForm.show_create}
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

        <Form.Item label="Tên Nguồn ứng viên" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên Nguồn ứng viên',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên Nguồn ứng viên" className="bg-white text-black"/>)}
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

export default connector(Form.create<CreateSourceCVFormProps>()(CreateSourceCVForm));
