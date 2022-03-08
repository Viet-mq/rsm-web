import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {FormEvent, useRef, useState} from "react";
import {Button, Col, Form, Icon, Input, Row, Tooltip} from "antd";
import {FormComponentProps} from "antd/lib/form";

import {Link} from "react-router-dom";
import {CreateEmailRequest} from "../types";
import {createEmail} from "../redux/actions";
import ReactQuill from "react-quill";

const mapStateToProps = (state: RootState) => ({
  emailManager:state.emailManager
})

const connector = connect(mapStateToProps,
  {
    createEmail
  })
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps, FormComponentProps {
}

function CreateEmailForm(props: IProps) {
  const {keyPoint}=props.emailManager
  const {getFieldDecorator} = props.form;
  const [display, setDisplay] = useState(false)
  const [valueEditor, setValueEditor] = useState('')
  const modules = {
    toolbar: [
      [{'header': '1'}, {'header': '2'}],
      ['blockquote', 'code-block'],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'direction': 'rtl'}],                         // text direction
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
      ['clean'],
    ],

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
  const fontWeightStyle = {fontWeight: 400};
  let reactQuillRef = useRef<any>()


  function onButtonClick(val:any){
    if(val){
      const range = reactQuillRef.current.getEditor()?.getSelection();
      let position = range ? range.index : 0;
      reactQuillRef.current?.getEditor()?.insertText(position, val)
    }

  };

  function onBtnCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let req: CreateEmailRequest = {
          content: valueEditor,
          name: values.name,
          subject: values.subject,
          type: values.type
        };
        props.createEmail(req);
        return;
      }
    });
  }

  function handleChangeMailContent(content: any) {
    if (content === "<p><br></p>") {
      setDisplay(true)
      setValueEditor("")
    } else {
      setDisplay(false)
      setValueEditor(content)
    }
  }

  return (
    <div className="page-container">
      <Row style={{display: "flex"}}>
        <Col span={18} className='mail-content grid-left'>
          <div>
            <Form>
              <Form.Item className="form-label" label="Loại email" labelCol={{span: 24}}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('type', {
                  initialValue: '',
                  rules: [
                    {
                      message: 'Vui lòng chọn loại email',
                      required: false,
                    },
                  ],
                })(
                  <Input placeholder="Nhập tên mẫu" className="bg-white text-black"/>
                )}
              </Form.Item>

              <Form.Item className="form-label" label="Tên mẫu mail" labelCol={{span: 24}}
                         wrapperCol={{span: 24}}>
                {getFieldDecorator('name', {
                  initialValue: '',
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
                {getFieldDecorator('subject', {
                  initialValue: "",
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

              <div className="form-label">
                <div className="mb-2">Nội dung <span className="value-required">*</span></div>
                <ReactQuill
                  ref={reactQuillRef}
                  style={fontWeightStyle}
                  className="ql-custom"
                  onChange={handleChangeMailContent}
                  value={valueEditor || ""}
                  theme={'snow'}
                  modules={modules}
                  formats={formats}
                  bounds={'.app'}
                  placeholder="Mô tả công việc"
                />
                <div className={display ? "value-required show" : "value-required hide"}>Vui lòng nhập nội dung</div>
              </div>

            </Form>
          </div>
        </Col>
        <Col span={6} className="email-option-variable grid-left">
          <div>
            <div className="form-label mb-3">Biến mẫu</div>
          </div>
          <div style={{overflow: "auto", height: 610}}>
            {keyPoint.rows.map((item:any)=>{
              return <>
                <Tooltip placement="top" title={item.description}>
                  <div style={{marginBottom:5}}><Button style={{width:"100%"}} key={item.id} onClick={()=>onButtonClick(item.id)}>{item.id}</Button></div>
                </Tooltip>
              </>

            })}
          </div>

        </Col>
      </Row>
      <div className="footer-right">

        <Link to={`/email-manager`}>
          <Button>Hủy</Button>
        </Link>
        <Button onClick={onBtnCreateClicked} type={"primary"} className="ml-2">Lưu</Button>
      </div>
    </div>
  );

}

export default connector(Form.create<IProps>()(CreateEmailForm));
