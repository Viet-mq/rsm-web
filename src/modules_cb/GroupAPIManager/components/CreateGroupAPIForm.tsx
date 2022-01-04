import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Card, Checkbox, Form, Input, Modal} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {
  createGroupAPI,
  deleteGroupAPI,
  getListGroupAPI,
  showAddAPIForm,
  showAssignUserForm,
  showCreateGroupAPIForm,
  showUpdateGroupAPIForm
} from "../redux/actions";
import {getListApiRole} from "../../APIManager/redux/actions";
import {CreateGroupAPIRequest} from "../types";

const CheckboxGroup = Checkbox.Group;
const mapStateToProps = (state: RootState) => ({
  groupAPIManager: state.groupAPIManager,
  listApiState: state.apiManager.list
});
const connector = connect(mapStateToProps, {
  showCreateGroupAPIForm,
  showUpdateGroupAPIForm,
  showAssignUserForm,
  showAddAPIForm,
  getListGroupAPI,
  deleteGroupAPI,
  getListApiRole,
  createGroupAPI
});

type ReduxProps = ConnectedProps<typeof connector>;

interface CreateViewFormProps extends FormComponentProps, ReduxProps {
}

function CreateGroupAPIForm(props: CreateViewFormProps) {

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

  useEffect(() => {
    props.getListApiRole();
  }, [])

  const onChange = (value: any) => {
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

  const onBtnCreateClicked = (e: FormEvent) => {

    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateGroupAPIRequest = {
          name: values.name,
          roleIds: listApi.api?.map((item: any) => item.id),
        }

        // props.createGroupAPI(req);
        return;
      }
    });
  }
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

    props.showCreateGroupAPIForm(false);
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Tạo mới menu"
      visible={props.groupAPIManager.showForm.show_create}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
      }}
      onCancel={() => {
        resetFields();
        props.showCreateGroupAPIForm(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Tên group API" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập Tên group API',
                required: true,
              },
            ],
          })(<Input placeholder="Nhập Tên group API" className="bg-white text-black"/>)}
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
              options={props.listApiState?.rows?.map((item: any) => item.name)}
              value={listApi.checkedList}
              onChange={event => onChange(event)}
            />
          </Card>)}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit"
                  onClick={onBtnCreateClicked}
          >
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

export default connector(Form.create<CreateViewFormProps>()(CreateGroupAPIForm));
