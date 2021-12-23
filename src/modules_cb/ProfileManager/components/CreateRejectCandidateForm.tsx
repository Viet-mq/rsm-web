import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Modal, Select} from "antd";
import React, {FormEvent} from "react";
import {createRejectCandidate, showFormReasonReject} from "../redux/actions";
import {CreateRejectCandidateRequest} from "../types";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  reasonReject: state.reasonRejectManager.list,
  profileManager: state.profileManager
})

const connector = connect(mapStateToProps, {
  showFormReasonReject,
  createRejectCandidate
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function CreateRejectCandidateForm(props: IProps) {

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
      if (!err) {
        let req: CreateRejectCandidateRequest = {
          idProfile: props.profileManager.showForm?.id_detail,
          reason: values.reason
        }
        props.createRejectCandidate(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    props.showFormReasonReject(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Lý do loại ứng viên"
      visible={props.profileManager.showForm.show_reason_reject}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showFormReasonReject(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Lý do loại" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('reason', {
            initialValue: undefined,
            rules: [
              {
                message: 'Vui lòng chọn lý do loại',
                required: true,
              },
            ],
          })(
            <Select className="bg-white text-black" placeholder={"Chọn lý do loại"}
            >
              {props.reasonReject.rows?.map((item: any, index: any) => (
                <Option key={index} value={item.id}>{item.reason}</Option>
              ))}
            </Select>)}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" type={"danger"} htmlType="submit" onClick={onBtnCreateClicked}>
            Loại
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  );

}

export default connector(Form.create<IProps>()(CreateRejectCandidateForm));
