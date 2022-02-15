import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, DatePicker, Form, Input, Modal} from "antd";
import React, {FormEvent, useEffect} from "react";
import {CreateReminderRequest} from "../types";
import TextArea from "antd/es/input/TextArea";
import {createReminder, showFormCreateReminder} from "../redux/actions";
import moment from "moment";

const mapStateToProps = (state: RootState) => ({
  reminderManager: state.reminderManager,
})

const connector = connect(mapStateToProps,
  {
    createReminder,
    showFormCreateReminder
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateReminderFormProps extends FormComponentProps, ReduxProps {

}

function CreateReminderForm(props: CreateReminderFormProps) {
  const {showReminder} = props.reminderManager
  const {getFieldDecorator, resetFields} = props.form;
  const fontWeightStyle = {fontWeight: 400};
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 24},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 24},
    },
  };
  const dateFormat = 'DD/MM/YYYY HH:mm';

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateReminderRequest = {
          start: values.start * 1,
          title: values.title,
          desc: values.desc,
          end: values.end * 1,
        }
        props.createReminder(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreateReminder(false);
  }

  return (
    <div>
      <Modal
        zIndex={5}
        maskClosable={false}
        title="Tạo mới nhắc nhở"
        visible={showReminder.show_reminder_create}
        centered={true}
        width="550px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
          props.showFormCreateReminder(false);
        }}
        footer={""}>

        <Form className="form-create">
          <div className="modal-overflow" style={{height:290}}>
            <Form.Item label="Tiêu đề" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('title', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập tiêu đề',
                    required: true,
                  },
                ],
              })(
                <Input placeholder="Nhập tiêu đề" className="bg-white text-black"/>
              )}
            </Form.Item>

            <div className="flex-space-between">
              <div className="mr-2" style={{width: 230}}>
                <Form.Item label="Thời gian bắt đầu" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('start', {
                    initialValue: moment(showReminder.time_create?.start),
                    rules: [
                      {
                        message: 'Vui lòng chọn thời gian bắt đầu',
                        required: true,
                      },
                    ],
                  })(
                    <DatePicker placeholder="dd/mm/yyyy" format={dateFormat} style={{width: "100%"}}/>
                  )}
                </Form.Item>
              </div>

              <div className="flex-process">
                <Form.Item label="Thời gian kết thúc" className="form-label"  {...formItemLayout}>
                  {getFieldDecorator('end', {
                    initialValue: moment(showReminder.time_create?.end),
                    rules: [
                      {
                        message: 'Vui lòng chọn thời gian kết thúc',
                        required: true,
                      },
                    ],
                  })(
                    <DatePicker placeholder="dd/mm/yyyy" format={dateFormat} style={{width: "100%"}}/>
                  )}
                </Form.Item>
              </div>
            </div>

            <Form.Item label="Nội dung" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('desc', {
                initialValue: '',
                rules: [
                  {
                    message: 'Vui lòng nhập tiêu đề',
                    required: false,
                  },
                ],
              })(
                <TextArea placeholder="Nội dung" style={{height: "100px"}} className="bg-white text-black"/>
              )}
            </Form.Item>

          </div>
          <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px', textAlign: "right"}} colon={false}>
            <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
              Tạo mới
            </Button>
            <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default connector(Form.create<CreateReminderFormProps>()(CreateReminderForm));
