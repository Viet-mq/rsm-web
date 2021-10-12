import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Card, Checkbox, Form, Input, Modal, Select} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {addActionView, showFormActionView} from "../redux/actions";
import {ActionViewRequest} from "../types";
import {getListFrontendView} from "../../ViewManager/redux/actions";
import {FrontendViewEntity} from "../../ViewManager/types";

const CheckboxGroup = Checkbox.Group;
const {Option} = Select;

const mapStateToProps = (state: RootState) => ({
  viewGroupManager: state.viewGroupManager,
  listView: state.viewManager.list

})
const connector = connect(mapStateToProps, {
  showFormActionView,
  addActionView,
  getListFrontendView
});

type ReduxProps = ConnectedProps<typeof connector>;

interface AddActionViewFormProps extends FormComponentProps, ReduxProps {
}

function AddActionViewForm(props: AddActionViewFormProps) {

  const [state, setState] = useState({
    action: [
      {
        actionId: "",
        actionName: "",
        desc: "",
        show: null
      }
    ],
    checkedList: [],
    indeterminate: false,
    checkAll: false,
  })
  const [action, setAction] = useState<FrontendViewEntity | any>(null);
  const {getFieldDecorator, resetFields} = props.form;
  const [compensatoryDataSource, setCompensatoryDataSource] = useState([] as any[]);
  const formItemStyle = {height: '40px'};

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
    props.getListFrontendView({page: 1, size: 100});
  }, [])

  const onChange = (value: any) => {
    const findName = action.actions?.filter((item: any) => value.includes(item.actionName))
    setState({
      action: findName,
      checkedList: value,
      indeterminate: !!value.length && value.length < action?.actions?.length,
      checkAll: value.length === action?.actions.length,
    });
  };

  const onCheckAllChange = (e: any) => {
    if(action){
      setState({
        action: e.target.checked ? (action.actions?.map((item: any) => item)) : [],
        checkedList: e.target.checked ? (action.actions?.map((item: any) => item.actionName)) : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    }

  };

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    console.log("Action", action);
    console.log("State:", state);
    let viewActionIds:any = [];
    viewActionIds=state.action.map((item:any)=>{return action.id+" "+item.actionId})
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: ActionViewRequest = {
          menuId: props.viewGroupManager.showForm.data_detail?.id,
          viewActionIds: viewActionIds,
        }
        console.log("req:", req);
        props.addActionView(req);
        return;
      }
    });
  }


  function onBtnCancelClicked() {
    resetFields();
    setAction(null);
    setState({
      action: [
        {
          actionId: "",
          actionName: "",
          desc: "",
          show: null
        }
      ],
      checkedList: [],
      indeterminate: false,
      checkAll: false,
    });
    setCompensatoryDataSource([]);
    props.showFormActionView(false);
  }

  const onChangeSelectView = (value: any) => {
    if (props.listView.rows) {
      const selectedRow = props.listView.rows?.find(row => row.id === value);
      setAction(selectedRow as FrontendViewEntity);
    }
  }

  return (

    <Modal
      zIndex={2}
      maskClosable={false}
      title="Thêm mới View Action"
      visible={props.viewGroupManager.showForm.show_action_view}
      centered={true}
      width="550px"
      afterClose={() => {
        resetFields();
        setCompensatoryDataSource([]);
      }}
      onCancel={() => {
        resetFields();
        setCompensatoryDataSource([]);
        props.showFormActionView(false);
      }}
      footer={""}>

      <Form {...formItemLayout}>

        <Form.Item label="Menu" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('menu', {
            initialValue: props.viewGroupManager.showForm.data_detail?.name,
            rules: [
              {
                message: 'Vui lòng nhập đường dẫn',
                required: true,
              },
            ],
          })(<Input disabled={true} placeholder="Nhập đường dẫn" className="bg-white text-black"/>)}
        </Form.Item>

        <Form.Item label="View" className="mb-0" style={{...formItemStyle}}>
          {getFieldDecorator('viewActionIds', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên View',
                required: true,
              },
            ],
          })(<Select className="bg-white text-black"
                     onChange={onChangeSelectView}
          >
            {props.listView.rows?.map((item: any, index: any) => (
              <Option key={index} value={item.id}>{item.name}</Option>
            ))}
          </Select>)}
        </Form.Item>

        <Form.Item label="Nhập tên" className="mb-0" style={{...formItemStyle, marginTop: "4px"}}>
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [
              {
                message: 'Vui lòng nhập tên',
                required: true,
              },
            ],
          })(<Card>
            <Checkbox
              indeterminate={state.indeterminate}
              onChange={onCheckAllChange}
              checked={state.checkAll}
            >
              Check all
            </Checkbox>
            <CheckboxGroup
              style={{display: "grid"}}
              options={action?.actions.map((item: any) => item.actionName)}
              value={state.checkedList}
              onChange={event => onChange(event)}
            />
          </Card>)}
        </Form.Item>

        <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
          <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnCreateClicked}>
            Thêm Action
          </Button>
          <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
            Hủy
          </Button>
        </Form.Item>

      </Form>

    </Modal>

  );

}

export default connector(Form.create<AddActionViewFormProps>()(AddActionViewForm));
