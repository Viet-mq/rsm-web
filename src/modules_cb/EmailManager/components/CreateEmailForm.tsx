import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import env from "src/configs/env";
import {Button, Col, Form, Icon, Input, Modal, Row, Tabs} from "antd";
import {deleteJob, getListJob, showFormCreate, showFormUpdate, updateJob} from "../redux/actions";
import {DeleteJobRequest, JobEntity} from "../types";
import Search from "antd/es/input/Search";
import {FormComponentProps} from "antd/lib/form";
import {Editor} from "@tinymce/tinymce-react";
import {Link} from "react-router-dom";
import {changeProcess, showChangeProcessForm} from "../../ProfileManager/redux/actions";
import {getListRecruitment} from "../../RecruitmentManager/redux/actions";

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  recruitment: state.recruitmentManager.list,
  listAccount: state.accountManager.list,

})

const connector = connect(mapStateToProps,
  {
    showChangeProcessForm,
    changeProcess,
    getListRecruitment
  })
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {
}

function CreateEmailForm(props: IProps) {
  const {getFieldDecorator} = props.form;
  const formItemHeight = {height: 250}


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
                    //apiKey="b616i94ii3b9vlza43fus93fppxb1yxb8f03gh926u51qhs6"
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
      <div className="footer-right">

        <Link to={`/email-manager`}>
          <Button >Hủy</Button>
        </Link>
        <Button type={"primary"} className="ml-2">Lưu</Button>
      </div>
    </div>
  );

}

export default connector(Form.create<IProps>()(CreateEmailForm));
