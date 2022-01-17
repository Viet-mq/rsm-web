import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import env from "src/configs/env";
import {Button, Col, Form, Input, Row, Tabs} from "antd";
import {deleteJob, getListJob, showFormCreate, showFormUpdate, updateJob} from "../redux/actions";
import {DeleteJobRequest, JobEntity} from "../types";
import Search from "antd/es/input/Search";
import {FormComponentProps} from "antd/lib/form";
import {Editor} from "@tinymce/tinymce-react";

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

  const inputEl = useRef<any>(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();

  };

  return (
    <div className="page-container">
      <Row style={{display: "flex"}}>
        <Col span={18} className='mail-content grid-left'>
          <div>
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


              <Form.Item className="form-label " label="Nội dung" labelCol={{span: 24}}
                         style={formItemHeight} wrapperCol={{span: 24}}>
                {getFieldDecorator('context', {
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
                  <Editor
                    apiKey="b616i94ii3b9vlza43fus93fppxb1yxb8f03gh926u51qhs6"
                    // onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                      menu: {
                        tc: {
                          title: 'Comments',
                          items: 'addcomment showcomments deleteallconversations'
                        }
                      },
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help '
                      ],
                      height: 330,
                      menubar: true,
                      branding: false,
                      toolbar: 'undo redo | bold italic underline strikethrough |alignleft aligncenter alignright alignjustify | outdent indent |fontselect fontsizeselect formatselect |    numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                      autosave_interval: '30s',
                      autosave_restore_when_empty: false,
                      autosave_retention: '2m',
                      image_caption: true,
                      quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                      toolbar_mode: 'sliding',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />
                )}
              </Form.Item>

            </Form>
          </div>
        </Col>
        <Col span={6} className="email-option-variable grid-left">
          <div>
            <div className="form-label mb-3">Biến mẫu</div>
            <div className="mb-2">
              <span style={{color: "red"}}>[ </span><span>Vị trí tuyển dụng</span><span style={{color: "red"}}> ]</span>
            </div>
            <div>
              <span style={{color: "red"}}>[ </span><span>Vị trí tuyển dụng</span><span style={{color: "red"}}> ]</span>
            </div>
          </div>
          <Button onClick={onButtonClick}>Haaha</Button>
        </Col>
      </Row>
    </div>
  );

}

export default connector(Form.create<IProps>()(UpdateEmailForm));
