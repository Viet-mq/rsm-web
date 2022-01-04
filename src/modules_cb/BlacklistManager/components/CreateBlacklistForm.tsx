import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {AutoComplete, Button, Form, Icon, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {createBlacklist, showFormCreate} from "../redux/actions";
import {CreateBlacklistRequest} from "../types";

const mapStateToProps = ({blacklistManager}: RootState) => ({blacklistManager});
const connector = connect(mapStateToProps, {createBlacklist, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateBlacklistFormProps extends FormComponentProps, ReduxProps {
}

function CreateBlacklistForm(props: CreateBlacklistFormProps) {

  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '60px'};
  const {TextArea} = Input;

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
        let req: CreateBlacklistRequest = {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          reason: values.reason,
        }
        props.createBlacklist(req);
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
      title="Blacklist hồ sơ ứng viên"
      visible={props.blacklistManager.showForm.show_create}
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

        <Form.Item className="form-label" label="Tên hồ sơ" labelCol={{span: 24}} wrapperCol={{span: 24}}>
          {getFieldDecorator('name', {
            initialValue: "",
            rules: [
              {
                message: 'Vui lòng nhập tên hồ sơ',
                required: true,
              },
            ],
          })(<AutoComplete>
            <Input placeholder="Tìm kiếm ứng viên" suffix={<Icon type="search" className="certain-category-icon"/>}/>
          </AutoComplete>)}
        </Form.Item>

        <Form.Item className="form-label" label="Email" labelCol={{span: 24}} wrapperCol={{span: 24}}>
          {getFieldDecorator('email', {
            initialValue: "",
            rules: [
              {
                message: 'Vui lòng nhập email',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập email" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item className="form-label" label="Số điện thoại" labelCol={{span: 24}} wrapperCol={{span: 24}}>
          {getFieldDecorator('phoneNumber', {
            initialValue: "",
            rules: [
              {
                message: 'Vui lòng nhập số điện thoại',
                required: false,
              },
            ],
          })(<Input placeholder="Nhập số điện thoại" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item className="form-label" label="Nguyên nhân đưa vào blacklist" labelCol={{span: 24}}
                   wrapperCol={{span: 24}}>
          {getFieldDecorator('reason', {
            initialValue: "",
            rules: [
              {
                message: 'Vui lòng nhập số điện thoại',
                required: false,
              },
            ],
          })(<TextArea
            placeholder={"Nhập nguyên nhân đưa vào blacklist (Không bắt buộc)"} rows={4}/>)}
        </Form.Item>


        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px', textAlign: "right"}} colon={false}>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
          <Button className="ml-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
            Đưa vào blacklist
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  );

}

export default connector(Form.create<CreateBlacklistFormProps>()(CreateBlacklistForm));
