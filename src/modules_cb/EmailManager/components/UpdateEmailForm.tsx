import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import env from "src/configs/env";
import {ColumnProps} from "antd/lib/table";
import {Button, Col, Form, Icon, Input, Popconfirm, Row, Tabs} from "antd";
import {deleteJob, getListJob, showFormCreate, showFormUpdate, updateJob} from "../redux/actions";
import {DeleteJobRequest, JobEntity} from "../types";
import Search from "antd/es/input/Search";
import {FormComponentProps} from "antd/lib/form";

const {TabPane} = Tabs;

const mapStateToProps = ({jobManager: {list}}: RootState) => ({list})
const connector = connect(mapStateToProps, {
  getListJob,
  deleteJob,
  showFormCreate,
  showFormUpdate,
  updateJob
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {
}

function UpdateEmailForm(props: IProps) {
  const {getFieldDecorator} = props.form;
  let screenWidth = document.documentElement.clientWidth;
  const {TextArea} = Input;
  const formItemHeight = {height: 250}
  const [page, setPage] = useState(1);
  const scroll = screenWidth < env.desktopWidth ? {x: 'fit-content'} : {x: false};
  const size = 10;
  const operations = <Search
    placeholder="Tìm kiếm nhanh mẫu email"
    // onSearch={value => onSearch(value)}
    style={{width: 235}}
  />;

  useEffect(() => {
    props.getListJob({page: 1, size: 100});
  }, []);

  const handleDelete = (event: any, entity: JobEntity) => {
    event.stopPropagation();
    let req: DeleteJobRequest = {
      id: entity.id
    }
    props.deleteJob(req);
  }

  const handleEdit = (event: any, entity: JobEntity) => {
    event.stopPropagation();
    props.showFormUpdate(true, entity);
  }

  const columns: ColumnProps<JobEntity>[] = [
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
      title: 'Name',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: () => {
        return <div style={{whiteSpace: 'nowrap'}}>Thao tác</div>;
      },
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_text: string, record: JobEntity) => {
        return (
          <div style={{whiteSpace: 'nowrap'}}>
            <Popconfirm
              title="Bạn muốn xóa Job này chứ ?"
              okText="Xóa"
              onCancel={event => {
                event?.stopPropagation();
              }}
              onConfirm={event => handleDelete(event, record)}
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
                    onClick={event => handleEdit(event, record)}
            >
              <Icon type="edit"/>
            </Button>
          </div>
        );
      },
    },
  ];


  return (
    <div className="page-container">
      <Row style={{display: "flex"}}>
        <Col span={18} className='mail-content grid-left'>
              <div >
                <Form>
                  <Form.Item className="form-label" label="Tên mẫu mail" labelCol={{span: 24}}
                             wrapperCol={{span: 24}}>
                    {getFieldDecorator('name', {
                      initialValue: 'Thư xác nhận',
                      rules: [
                        {
                          message: 'Vui lòng nhập tên mẫu',
                          required: true,
                        },
                      ],
                    })(
                      <Input placeholder="Nhập tên mẫu" className="bg-white text-black"/>
                    )}
                  </Form.Item>

                  <Form.Item className="form-label" label="Tiêu đề mail" labelCol={{span: 24}}
                             wrapperCol={{span: 24}}>
                    {getFieldDecorator('name', {
                      initialValue: "Bạn vừa ứng tuyển vào  [ Tên công ty ]",
                      rules: [
                        {
                          message: 'Vui lòng nhập tiêu đề mail',
                          required: true,
                        },
                      ],
                    })(
                      <Input placeholder="Nhập tiêu đề" className="bg-white text-black"/>
                    )}
                  </Form.Item>


                  <Form.Item className="form-label quill-editor" label="Nội dung" labelCol={{span: 24}}
                             style={formItemHeight} wrapperCol={{span: 24}}>
                    {getFieldDecorator('jobDescription', {
                      initialValue: '',
                      rules: [
                        {
                          message: 'Vui lòng nhập nội dung',
                          required: true,
                        },
                        // {
                        //   validator: validateReactQuill,
                        // },
                      ],
                    })(
                      // <ReactQuill
                      //   style={{...fontWeightStyle, ...textEditorHeight}}
                      //   theme={'snow'}
                      //   modules={modules}
                      //   formats={formats}
                      //   bounds={'.app'}
                      //   placeholder="Mô tả công việc"
                      // />
                      <TextArea  placeholder="Nội dụng" style={{height: 150}}
                                className="bg-white text-black"/>
                    )}
                  </Form.Item>

                </Form>
              </div>
        </Col>
        <Col span={6} className="email-option-variable grid-left">
          <div>
            <div className="form-label mb-3">Biến mẫu</div>
            <div className="mb-2">
              <span style={{color:"red"}}>[ </span><span>Vị trí tuyển dụng</span><span style={{color:"red"}}> ]</span>
            </div>
            <div>
              <span style={{color:"red"}}>[ </span><span>Vị trí tuyển dụng</span><span style={{color:"red"}}> ]</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );

}

export default connector(Form.create<IProps>()(UpdateEmailForm));
