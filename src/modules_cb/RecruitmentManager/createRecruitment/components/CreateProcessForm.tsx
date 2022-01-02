import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {RootState} from "../../../../redux/reducers";
import {showFormCreate} from "../../redux/actions";

const mapStateToProps = (state: RootState) => ({
  showForm: state.recruitmentManager.showForm
})

const connector = connect(mapStateToProps, {
  showFormCreate,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateJobFormProps extends FormComponentProps, ReduxProps {
  schema:any,
  setSchema:any
}

function CreateProcessForm(props: CreateJobFormProps) {
  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '60px'};
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 4},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 20},
    },
  };

  function onBtnCreateClicked(e: FormEvent) {
    debugger
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.setSchema([
      {
        id: "receiving",
        text: "Tiếp nhận hồ sơ",
        isDragDisabled: true,
      },
      {
        id: "interview",
        text: "Phỏng vấn",
        isDragDisabled: false
      },
      {
        id: "567",
        text: "Phỏng vấn CEO",
        isDragDisabled: false
      },
      {
        id: "789",
        text: "Offer",
        isDragDisabled: true
      },
      {
        id: "8910",
        text: "Đã tuyển",
        isDragDisabled: true
      }
    ])
    props.showFormCreate(false)
    props.form.validateFieldsAndScroll((err, values) => {

    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreate(false)
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Thêm vòng"
      visible={props.showForm.show_create}
      // visible={true}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        props.showFormCreate(false)
      }}
      onCancel={() => {
        resetFields();
        props.showFormCreate(false)
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
          <div style={{textAlign: "right"}}>
            <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
              Thêm
            </Button>

            <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
              Hủy
            </Button>
          </div>

        </Form.Item>
      </Form>
    </Modal>
  );
}

export default connector(Form.create<CreateJobFormProps>()(CreateProcessForm));
