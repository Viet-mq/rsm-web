import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {updateRecruitment} from "../redux/actions";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent} from "react";
import {UpdateRecruitmentRequest} from "../../RecruitmentManager/types";


const mapStateToProps = (state: RootState) => ({
  showForm: state.profileManager.showForm,
  elasticSearch: state.profileManager.search,

})

const connector = connect(mapStateToProps, {updateRecruitment});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function UpdateRecruitmentForm(props: IProps) {

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

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // let req: UpdateRecruitmentRequest = {
        //   id: props.showForm.data_update?.id,
        //   name: values.name,
        // }
        // props.updateRecruitment(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    // props.showFormUpdate(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật vị trí công việc"
      visible={props.showForm.show_update}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        // props.showFormUpdate(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên vị trí công việc" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.showForm.data_update?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên vị trí công việc',
                required: true,
              },
            ],
          })(
            <Input placeholder="Tên job" className="bg-white text-black"/>
          )}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnUpdateClicked}>
            Cập nhật
          </Button>

          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default connector(Form.create<IProps>()(UpdateRecruitmentForm));
