import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import Loading from "../../../components/Loading";
import {UpdateActionToViewRequest} from "../types";
import {showViewUpdateActionForm, updateAction} from "../redux/actions";
import {formItemLayout} from "../../../helpers/utilsFunc";


const mapStateToProps = (state: RootState) => ({
  viewManager: state.viewManager,

})

const connector = connect(mapStateToProps,
  {
    updateAction,
    showViewUpdateActionForm
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateActionFormProps extends FormComponentProps, ReduxProps {

}

function CreateActionForm(props: CreateActionFormProps) {
  const {showForm, update_action} = props.viewManager
  const {getFieldDecorator, resetFields} = props.form;

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateActionToViewRequest = {
          key: values.key,
          permission_id: showForm.actions?.permission_id,
          title: values.title,
          id: showForm.actions?.id,
        }

        props.updateAction(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showViewUpdateActionForm(false);
  }

  return (
    <div>
      <Modal
        zIndex={2}
        maskClosable={false}
        title="Cập nhật action trong view"
        visible={showForm.show_update_action}
        centered={true}
        width="550px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
          props.showViewUpdateActionForm(false);
        }}
        footer={""}>

        <Form className="form-create">
          <Form.Item label="Tiêu đề" className="form-label"  {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: showForm.actions?.title,
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

          <Form.Item label="Key" className="form-label"  {...formItemLayout}>
            {getFieldDecorator('key', {
              initialValue: showForm.actions?.key,
              rules: [
                {
                  message: 'Vui lòng nhập key',
                  required: true,
                },
              ],
            })(
              <Input placeholder="Nhập key" className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px', textAlign: "right"}} colon={false}>
            <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
              Cập nhật
            </Button>
            <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
              Hủy
            </Button>
          </Form.Item>

        </Form>

      </Modal>


      {update_action.loading ?
        <Loading/> : null}
    </div>
  );

}

export default connector(Form.create<CreateActionFormProps>()(CreateActionForm));
