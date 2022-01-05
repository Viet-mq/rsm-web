import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Input, Modal} from "antd";
import React, {FormEvent, useEffect} from "react";
import {RootState} from "../../../../redux/reducers";
import {createInterviewProcess, createSteps, showFormCreate} from "../../redux/actions";
import {CreateStatusCVRequest, StatusCVEntity} from "../../../StatusCVManager/types";
import {CreateRecruitmentRequest} from "../../types";

const mapStateToProps = (state: RootState) => ({
  showForm: state.recruitmentManager.showForm,
  createInterviewProcessState: state.recruitmentManager.createInterviewProcess,
  createStepsState: state.recruitmentManager.createSteps

})

const connector = connect(mapStateToProps, {
  showFormCreate,
  createInterviewProcess,
  createSteps
});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateJobFormProps extends FormComponentProps, ReduxProps {
  schema: any,
  setSchema: any,
  lastElement: any,
  setLastElement: any,
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

  useEffect(() => {
    if (props.createInterviewProcessState?.response?.code===0) {
      const schemaCopy: any = props.schema?.slice();
      let dataAdd: StatusCVEntity = ({
        id: props.createInterviewProcessState?.response.id,
        name: props.createInterviewProcessState?.response.name,
        isDragDisabled: props.createInterviewProcessState?.response.isDragDisabled
      })
      schemaCopy.splice(props.lastElement + 1, 0, dataAdd);

      props.setLastElement(schemaCopy.map((el: any) => el.isDragDisabled).lastIndexOf(false))

      let req: CreateRecruitmentRequest = ({
        ...props.createStepsState.request,
        interviewProcess: schemaCopy
      })
      props.createSteps(req)
      // props.setSchema(schemaCopy);
      props.showFormCreate(false)
    }
  }, [props.createInterviewProcessState?.response])

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateStatusCVRequest = {
          name: values.name,
          statusCVS: props.schema
        }
        props.createInterviewProcess(req);
        return;
      }
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
