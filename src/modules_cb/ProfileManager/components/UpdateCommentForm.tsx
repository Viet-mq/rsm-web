import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useEffect} from "react";
import {showFormUpdateComment, updateComment} from "../redux/actions";
import {UpdateCommentRequest} from "../types";
import {getListAccount} from "../../AccountManager/redux/actions";

const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  showComment: state.profileManager.showComment,
  listAccount: state.accountManager.list,
})

const connector = connect(mapStateToProps,
  {
    showFormUpdateComment,
    updateComment,
    getListAccount,

  });

type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateProfileFormProps extends FormComponentProps, ReduxProps {
}

function UpdateProfileForm(props: UpdateProfileFormProps) {

  const {getFieldDecorator, resetFields} = props.form;

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12},
    },
  };

  useEffect(() => {
    if (props.showComment.show_comment_update) {
      props.getListAccount({page: 1, size: 100});
    }

  }, [props.showComment.show_comment_update])

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateCommentRequest = {
          id: props.showComment.data_update?.id,
          content: values.comment,
        }
        props.updateComment(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormUpdateComment(false);
  }

  return (
    <div>
      <Modal
        zIndex={2}
        maskClosable={false}
        title="Sửa đánh giá"
        visible={props.showComment.show_comment_update}
        centered={true}
        width="550px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
          props.showFormUpdateComment(false);
        }}
        footer={""}>

        <Form {...formItemLayout}>

          <Form.Item label="Ghi chú" className="mb-0" style={{height: 110}}>
            {getFieldDecorator('comment', {
              initialValue: props.showComment.data_update?.content,
              rules: [
                {
                  message: 'Vui lòng nhập ghi chú',
                  required: true,
                },
              ],
            })(
              <TextArea placeholder="Ghi chú" style={{height: "100px"}} className="bg-white text-black"/>
            )}
          </Form.Item>

          <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
            <Button className="mr-3 Update-btn" type="primary" htmlType="submit" onClick={onBtnUpdateClicked}>
              Cập nhật
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

export default connector(Form.create<UpdateProfileFormProps>()(UpdateProfileForm));
