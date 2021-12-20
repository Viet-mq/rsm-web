import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {RootState} from "../../../../redux/reducers";
import {createRecruitment} from "../../redux/actions";

const mapStateToProps = (state: RootState) => ({
  jobManager: state.jobManager
})

const connector = connect(mapStateToProps, {createRecruitment});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateJobFormProps extends FormComponentProps, ReduxProps {
}

function CreateProcessForm(props: CreateJobFormProps) {
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

    });
  }

  function onBtnCancelClicked() {
    resetFields();

  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Thêm vòng"
      visible={props.jobManager.showForm.show_create}
      // visible={true}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
      }}
      footer={""}>
      <Form {...formItemLayout}>
        <Form.Item label="Tên vòng" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên vòng tuyển dụng',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên vòng tuyển dụng" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
            Sửa
          </Button>

          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default connector(Form.create<CreateJobFormProps>()(CreateProcessForm));
