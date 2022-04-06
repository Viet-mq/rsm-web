import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import Loading from "../../../components/Loading";
import {AddActionToViewRequest} from "../types";
import {addAction, showViewAddActionForm} from "../redux/actions";
import {formItemLayout} from "../../../helpers/utilsFunc";


const mapStateToProps = (state: RootState) => ({
  viewManager: state.viewManager,

})

const connector = connect(mapStateToProps,
  {
    addAction,
    showViewAddActionForm
  });

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateActionFormProps extends FormComponentProps, ReduxProps {

}

function CreateActionForm(props: CreateActionFormProps) {
  const {showForm,add_action} = props.viewManager
  const {getFieldDecorator, resetFields} = props.form;

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: AddActionToViewRequest = {
          key: values.key,
          permission_id: showForm.id_view,
          title: values.title
        }
        // console.log(req)
        props.addAction(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showViewAddActionForm(false);
  }

  return (
    <div>
      <Modal
        zIndex={2}
        maskClosable={false}
        title="Thêm action vào view"
        visible={showForm.show_add_action}
        centered={true}
        width="550px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
          props.showViewAddActionForm(false);
        }}
        footer={""}>

        <Form className="form-create" >
          <Form.Item label="Tiêu đề" className="form-label"  {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: "",
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
              initialValue: "",
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
              Thêm
            </Button>
            <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
              Hủy
            </Button>
          </Form.Item>

        </Form>

      </Modal>


      {add_action.loading ?
        <Loading/> : null}
    </div>
  );

}

export default connector(Form.create<CreateActionFormProps>()(CreateActionForm));
