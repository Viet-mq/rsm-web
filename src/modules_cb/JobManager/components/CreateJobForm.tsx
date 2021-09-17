import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {createJob, showFormCreate} from "../redux/actions";
import {CreateJobRequest} from "../types";

const mapStateToProps = ({jobManager}: RootState) => ({jobManager});
const connector = connect(mapStateToProps, {createJob, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateJobFormProps extends FormComponentProps, ReduxProps {
}

function CreateJobForm(props: CreateJobFormProps) {

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
        let req: CreateJobRequest = {
          name: values.name,
        }
        console.log("values: " + JSON.stringify(req));
        props.createJob(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormCreate(false);
  }

  const onCheckBoxChange = (e: any) => {
    setShow(e.target.checked);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới job"
      visible={props.jobManager.showForm.show_create}
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

        <Form.Item label="Tên job" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên job',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên job" className="bg-white text-black"/>)}
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

export default connector(Form.create<CreateJobFormProps>()(CreateJobForm));
