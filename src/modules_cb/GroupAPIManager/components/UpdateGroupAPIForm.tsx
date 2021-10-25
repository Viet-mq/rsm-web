import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Card, Checkbox, Form, Input, Modal} from "antd";
import React, {FormEvent, useState} from "react";
import {showUpdateGroupAPIForm, updateGroupAPI} from "../redux/actions";
import {UpdateGroupAPIRequest} from "../types";

const CheckboxGroup = Checkbox.Group;
const mapStateToProps = (state: RootState) => ({
  groupAPIManager: state.groupAPIManager,
  listApiState: state.apiManager.list
});
const connector = connect(mapStateToProps, {
  showUpdateGroupAPIForm,
  updateGroupAPI
});

type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateGroupAPIFormProps extends FormComponentProps, ReduxProps {
}

function UpdateGroupAPIForm(props: UpdateGroupAPIFormProps) {
  console.log("props:", props.groupAPIManager.showForm?.view)
  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '60px'};

  const [listApi, setListApi] = useState<any>({
    api: [
      {
        id: '',
        path: '',
        method: '',
        name: ''
      }
    ],
    checkedList: [],
    indeterminate: false,
    checkAll: false,
  })

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

  const onChange = (value: any) => {
    console.log("onChangeonChange", value)
    const findApi = props.listApiState.rows?.filter((item: any) => value.includes(item.name));

    setListApi({
      api: findApi,
      checkedList: value,
      indeterminate: !!value.length && value.length < props.listApiState?.total,
      checkAll: value.length === props.listApiState?.total,
    })

  }
  const onCheckAllChange = (e: any) => {
    if (props.listApiState) {
      setListApi({
        api: props.listApiState.rows,
        checkedList: e.target.checked ? (props.listApiState.rows?.map((item: any) => item.name)) : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    }

  }

  const onBtnUpdateClicked = (e: FormEvent) => {

    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateGroupAPIRequest = {
          id: props.groupAPIManager.showForm?.view.id,
          name: values.name,
          roles: listApi.api?.map((item: any) => item.id),
        }

        console.log("props.createGroupAPI(req):", req)
        // props.updateGroupAPI(req);
        return;
      }
    });
  }
  console.log("value:", listApi.checkedList)
  console.log("list:", props.listApiState?.rows?.map((item: any) => item.name))
  const onBtnCancelClicked = () => {
    resetFields();
    setListApi({
      api: [
        {
          id: '',
          path: '',
          method: '',
          name: ''
        }
      ],
      checkedList: [],
      indeterminate: false,
      checkAll: false,
    })

    props.showUpdateGroupAPIForm(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Cập nhật menu"
      visible={props.groupAPIManager.showForm.show_update}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showUpdateGroupAPIForm(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên group api" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: props.groupAPIManager.showForm.view?.name,
            rules: [
              {
                message: 'Vui lòng nhập tên group api',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập tên group api " className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="Gán API" className="mb-0" style={{...formItemStyle, marginTop: "4px"}}>
          {getFieldDecorator('roles', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng chọn api',
                required: true,
              },
            ],
          })(<Card>
            <Checkbox
              indeterminate={listApi.indeterminate}
              onChange={onCheckAllChange}
              checked={listApi.checkAll}
            >
              Check all
            </Checkbox>
            <CheckboxGroup
              style={{display: "grid"}}
              // options={props.listApiState?.rows?.map((item: any) => item.name)}
              options={['1', '2']}
              value={listApi.checkedList}
              // defaultValue={props.groupAPIManager.showForm?.view?.roles.map((item:any)=>item.name)}
              defaultValue={['1']}
              onChange={event => onChange(event)}
            />
          </Card>)}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit"
                  onClick={onBtnUpdateClicked}
          >
            Cập nhật
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  );

}

export default connector(Form.create<UpdateGroupAPIFormProps>()(UpdateGroupAPIForm));
