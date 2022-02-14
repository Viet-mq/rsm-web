import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, DatePicker, Form, Icon, Input, Modal, Popconfirm, Tooltip} from "antd";
import React, {FormEvent} from "react";
import {deleteReminder, showFormUpdateReminder, updateReminder} from "../redux/actions";
import {DeleteReminderRequest, UpdateReminderRequest} from "../types";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

const mapStateToProps = (state: RootState) => ({
  reminderManager: state.reminderManager,
})

const connector = connect(mapStateToProps,
  {
    showFormUpdateReminder,
    updateReminder,
    deleteReminder
  });
type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateReminderFormProps extends FormComponentProps, ReduxProps {
}

function UpdateReminderForm(props: UpdateReminderFormProps) {
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

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateReminderRequest = {
          id: showReminder.data_update?.id,
          start: values.start * 1,
          title: values.title,
          desc: values.desc,
          end: values.end * 1,
        }
        props.updateReminder(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdateReminder(false);
  }

  const dateFormat = 'DD/MM/YYYY HH:mm';

  function onBtnDeleteClicked() {
 let req:DeleteReminderRequest=({
   id:showReminder.data_update?.id
 })
    props.deleteReminder(req)
  }

  return (
    <div>
      <Modal
        zIndex={5}
        maskClosable={false}
        title="Cập nhật nhắc nhở"
        visible={showReminder.show_reminder_update}
        centered={true}
        width="550px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
          props.showFormUpdateReminder(false);
        }}
        footer={""}>
        <Form className="form-create">
          <div className="modal-overflow" style={{height:290}}>
            <Form.Item label="Tiêu đề" className="form-label"  {...formItemLayout}>
              {getFieldDecorator('title', {
                initialValue: showReminder.data_update?.title,
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
                    initialValue: moment(showReminder.data_update?.start),
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
                    initialValue: moment(showReminder.data_update?.end),
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
                initialValue: showReminder.data_update?.desc,
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
            <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnUpdateClicked}>
              Cập nhật
            </Button>

            <Popconfirm
              title="Bạn muốn xóa nhắc nhở này chứ ?"
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={onBtnDeleteClicked}
            >
                <Button
                  className="mr-3"
                  type={"danger"}
                  onClick={event => {
                    event.stopPropagation();
                  }}
                >
                  Xóa
                </Button>
            </Popconfirm>

            <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>

  )
}

export default connector(Form.create<UpdateReminderFormProps>()(UpdateReminderForm));
