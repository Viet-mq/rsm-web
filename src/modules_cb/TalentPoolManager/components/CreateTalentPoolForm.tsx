import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {createTalentPool, showFormCreate} from "../redux/actions";
import {CreateTalentPoolRequest} from "../types";
import {getListAccount} from "../../AccountManager/redux/actions";

const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  listAccountState: state.accountManager.list,
  talentPoolManagerState: state.talentPoolManager,
})

const connector = connect(mapStateToProps, {
  createTalentPool,
  showFormCreate,
  getListAccount,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateTalentPoolFormProps extends FormComponentProps, ReduxProps {
}

function CreateTalentPoolForm(props: CreateTalentPoolFormProps) {

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

  useEffect(() => {
    props.getListAccount({page: 1, size: 100});
  }, [])

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateTalentPoolRequest = {
          description:values.description,
          managers: values.managers,
          name: values.name
        }
        props.createTalentPool(req);
        return;
      }
    });
  }

  function onBtnCancelClicked() {
    resetFields();
    setCompensatoryDataSource([]);
    props.showFormCreate(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới TalentPool"
      visible={props.talentPoolManagerState.showForm.show_create}
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

        <Form.Item label="Tên TalentPool" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên TalentPool',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên TalentPool" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Quản lý" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('managers', {
            initialValue: undefined,
            rules: [
              {
                message: 'Vui lòng chọn người quản lý',
                required: true,
              },
            ],
          })(
            <Select className="bg-white text-black"
                    mode="multiple"
                    placeholder="Vui lòng chọn người quản lý"
            >
              {props.listAccountState.rows?.map((item: any,index:any) => (
                <Option key={index} value={item.username}>{item.fullName}</Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Miêu tả" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('description', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập miêu tả',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập miêu tả" className="bg-white text-black"/>)}
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

export default connector(Form.create<CreateTalentPoolFormProps>()(CreateTalentPoolForm));
