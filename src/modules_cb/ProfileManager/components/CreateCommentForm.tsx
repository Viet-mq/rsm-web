import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createComment} from "../redux/actions";
import {CreateCommentRequest} from "../types";
import {showFormCreateComment} from "../redux/actions";
import {getListAccount} from "../../AccountManager/redux/actions";

const {Option} = Select;
const { TextArea } = Input;

const mapStateToProps = (state: RootState) => ({
  showComment: state.profileManager.showComment,
  listAccount: state.accountManager.list,
})

const connector = connect(mapStateToProps,
  {
    showFormCreateComment,
    createComment,
    getListAccount,

  });

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateProfileFormProps extends FormComponentProps, ReduxProps {
}

function CreateProfileForm(props: CreateProfileFormProps) {

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
    if (props.showComment.show_comment_create) {
      props.getListAccount({page: 1, size: 100});
    }

  }, [props.showComment.show_comment_create])

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateCommentRequest = {
          idProfile: props.showComment.idProfile,
          content: values.comment,
        }
        props.createComment(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormCreateComment(false);
  }

  return (
    <div>
      <Modal
        zIndex={2}
        maskClosable={false}
        title="Tạo mới ghi chú"
        visible={props.showComment.show_comment_create}
        centered={true}
        width="550px"
        afterClose={() => {
          resetFields();
        }}
        onCancel={() => {
          resetFields();
          props.showFormCreateComment(false);
        }}
        footer={""}>

        <Form {...formItemLayout}>

          <Form.Item label="Ghi chú" className="mb-0" style={{height:110}}>
            {getFieldDecorator('comment', {
              initialValue: '',
              rules: [
                {
                  message: 'Vui lòng nhập ghi chú',
                  required: true,
                },
              ],
            })(
              <TextArea placeholder="Ghi chú" style={{height:"100px"}} className="bg-white text-black"/>
            )}
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

    </div>
  );

}

export default connector(Form.create<CreateProfileFormProps>()(CreateProfileForm));
