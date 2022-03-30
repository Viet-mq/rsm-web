import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Col, Form, Icon, Input, InputNumber, Popconfirm, Row, Table} from "antd";
import React, {FormEvent, useEffect, useState} from "react";
import {
  getDetailView,
  removeAction,
  showViewAddActionForm,
  showViewUpdateActionForm,
  showViewUpdateForm,
  updateView
} from "../redux/actions";
import {
  ActionView,
  DeleteActionToViewRequest,
  UpdateActionToViewRequest,
  UpdateViewRequest,
  ViewEntity
} from "../types";
import {useHistory, useParams} from "react-router-dom";
import {ColumnProps} from "antd/lib/table";
import {emptyText} from "../../../configs/locales";
import env from "../../../configs/env";
import CreateActionForm from "./CreateActionForm";
import UpdateActionForm from "./UpdateActionForm";
import Loading from "../../../components/Loading";

const mapStateToProps = ({viewManager}: RootState) => ({viewManager});
const connector = connect(mapStateToProps, {
  showViewUpdateForm,
  updateView,
  getDetailView,
  showViewAddActionForm,
  showViewUpdateActionForm,
  removeAction
});

type ReduxProps = ConnectedProps<typeof connector>;

interface UpdateViewFormProps extends FormComponentProps, ReduxProps {
}

function UpdateViewForm(props: UpdateViewFormProps) {
  const {detail, remove_action} = props.viewManager;
  const {getFieldDecorator, resetFields} = props.form;
  const formItemStyle = {height: '60px'};
  const {id} = useParams();
  const history = useHistory();
  let screenWidth = document.documentElement.clientWidth;
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;

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

  const [page, setPage] = useState(1);
  const [detailView, setDetailView] = useState<ViewEntity>()


  const columns: ColumnProps<ActionView>[] = [
    {
      title: 'STT',
      key: 'index',
      width: 40,
      align: "center",
      render: (text, record, index) => {
        return (page - 1) * 10 + index + 1
      }
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: 100,
    },

    {
      title: 'Key',
      dataIndex: 'key',
      width: 100,
    },

    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: ActionView) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa menu này chứ ?"
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={event => handleDeleteAction(event, record)}
            >
              <Button
                size="small"
                className="ant-btn ml-1 mr-1 ant-btn-sm"
                onClick={event => {
                  event.stopPropagation();
                }}
              >
                <Icon type="delete" theme="filled"/>
              </Button>
            </Popconfirm>
            <Button size="small" className="ant-btn ml-1 mr-1 ant-btn-sm"
                    onClick={event => handleUpdateAction(event, record)}
            >
              <Icon type="edit"/>
            </Button>

          </div>
        );
      },
    },
  ];

  useEffect(() => {
    props.getDetailView({id: id});
  }, []);

  useEffect(() => {
    if (detail.rows) {
      setDetailView(detail.rows[0])
    }
  }, [detail])

  function onBtnUpdateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: UpdateViewRequest = {
          icon: values.icon,
          index: values.index,
          path: values.path,
          title: values.title,
          id: detailView?.id,
        }
        props.updateView(req);
        return;
      }
    });
  }


  function handleUpdateAction(event: any, record: UpdateActionToViewRequest) {
    let req: UpdateActionToViewRequest = {
      id: record.id,
      key: record.key,
      permission_id: detailView?.id,
      title: record.title
    }
    props.showViewUpdateActionForm(true, req);
  }


  function onBtnCancelClicked() {
    resetFields();
    history.push({
      pathname: `/view-manager`
    });
  }

  function handleShowCreateActionForm(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }

    props.showViewAddActionForm(true, detailView?.id)
  }


  function handleDeleteAction(event: any, record: ActionView) {
    let req: DeleteActionToViewRequest = {
      id: record.id,
      permission_id: detailView?.id
    }
    props.removeAction(req)
  }

  return (
    <div>
      <div className="contentPage">
        <div className="entryHeader">
          <Row>
            <Col md={16}>
              <div className="tmp-title-page-size20">Cập nhật View (menu hiển thị)</div>
            </Col>
            <Col className="d-flex" md={8}>
              <div className="tmp-btn">
                <div>
                  <Button
                    // onClick={handleCreate}
                  >
                    <Icon type="plus"/> Tạo View
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="bg-white pt-5 pr-5 pl-5 pb-3">
          <Form {...formItemLayout}>

            <Form.Item label="Tên View" className="mb-0" style={{...formItemStyle}}>
              {getFieldDecorator('title', {
                initialValue: detailView?.title,
                rules: [
                  {
                    message: 'Vui lòng nhập tên',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên View" className="bg-white text-black"/>)}
            </Form.Item>

            <Form.Item label="Đường dẫn" className="mb-0" style={{...formItemStyle}}>
              {getFieldDecorator('path', {
                initialValue: detailView?.path,
                rules: [
                  {
                    message: 'Vui lòng nhập đường dẫn',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập đường dẫn" className="bg-white text-black"/>)}
            </Form.Item>

            <Form.Item label="Index" className="mb-0" style={{...formItemStyle}}>
              {getFieldDecorator('index', {
                initialValue: detailView?.index,
                rules: [
                  {
                    message: 'Vui lòng nhập Index',
                    required: true,
                  },
                ],
              })(<InputNumber style={{width: '100%'}} placeholder="Nhập Index" className="bg-white text-black"/>)}
            </Form.Item>

            <Form.Item label="Icon" className="mb-0" style={{...formItemStyle}}>
              {getFieldDecorator('icon', {
                initialValue: detailView?.icon,
                rules: [
                  {
                    message: 'Vui lòng nhập Icon',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập icon menu" className="bg-white text-black"/>)}
            </Form.Item>

            <Form.Item label=" " style={{marginBottom: '0', marginTop: '8px'}} colon={false}>
              <div style={{textAlign: "right"}}>
                <Button className="mr-3 create-btn" htmlType="submit" onClick={onBtnUpdateClicked}>
                  Cập nhật
                </Button>
                <Button type="default" className="pl-5 pr-5" onClick={onBtnCancelClicked}>
                  Hủy
                </Button>
              </div>

            </Form.Item>

          </Form>
        </div>

        <div className="bg-white p-3 mt-5">
          <div className="font-20-bold-500 pb-1">Actions</div>
          <div className="pb-2"><Button type="primary" onClick={handleShowCreateActionForm}>Thêm action</Button></div>
          <Table
            scroll={scroll}
            className="custom-table"
            dataSource={detailView?.actions}
            columns={columns}

            rowKey="id"
            locale={{emptyText: emptyText}}
            pagination={{
              current: page,
              pageSize: size,
              total: detailView?.actions?.length,
              onChange: value => setPage(value),
              showTotal: (total, range) => `Đang xem ${range[0]} đến ${range[1]} trong tổng số ${total} mục`,
            }}
          />
        </div>
      </div>


      <CreateActionForm/>
      <UpdateActionForm/>

      {remove_action.loading ? <Loading/> : null}

    </div>

  );

}

export default connector(Form.create<UpdateViewFormProps>()(UpdateViewForm));




