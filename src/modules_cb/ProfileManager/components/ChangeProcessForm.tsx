import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Checkbox, Form, Icon, Input, Modal, Radio, Select} from "antd";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import {changeProcess, showChangeProcessForm, showEmailChangeProcessForm} from "../redux/actions";
import {getListRecruitment} from "../../RecruitmentManager/redux/actions";
import {ChangeProcessRequest, CreateBookingRequest, MailForm, MailRequest, ProcessForm} from "../types";
import 'react-quill/dist/quill.snow.css';
import {getListEmail, searchListEmail} from "../../EmailManager/redux/actions";
import {EmailEntity} from "../../EmailManager/types";
import ReactQuill from "react-quill";
import CreateEmailChangeProcessForm from "./CreateEmailChangeProcessForm";

const {Option} = Select;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

const mapStateToProps = (state: RootState) => ({
  profileManager: state.profileManager,
  recruitment: state.recruitmentManager.list,
  listAccount: state.accountManager.list,
  listEmail: state.emailManager.list,
})

const connector = connect(mapStateToProps,
  {
    showChangeProcessForm,
    changeProcess,
    getListRecruitment,
    getListEmail,
    searchListEmail,
    showEmailChangeProcessForm
  })

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function ChangeProcessForm(props: IProps) {
  const fontWeight = {
    fontWeight: 500
  }
  const {showForm} = props.profileManager
  const [process, setProcess] = useState<any>('')
  const {getFieldDecorator, resetFields} = props.form;
  const [display, setDisplay] = useState(false)
  const fontWeightStyle = {fontWeight: 400};
  const formItemStyle = {
    labelCol: {span: 4},
    wrapperCol: {span: 20}
  };
  const [emailTemp, setEmailTemp] = useState<EmailEntity>()
  const [valueEditor, setValueEditor] = useState("")
  const inputFile = useRef<any>(null)
  const [fileAttach, setFileAttach] = useState<any>([]);
  const [trigger, setTrigger] = useState({
    email: false,

  })
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
  const plainOptions = {
    candidate: [{
      id: "yes",
      name: "Có",
    }, {
      id: "no",
      name: "Không",
    }],
    interviewers: [{
      id: "system",
      name: "Hệ thống",
    }, {
      id: "outSide",
      name: "Ngoài hệ thống",
    }],
    members: [{
      id: "yes",
      name: "Có",
    }, {
      id: "no",
      name: "Không",
    }],
    presenter: [{
      id: "system",
      name: "Hệ thống",
    }, {
      id: "outSide",
      name: "Ngoài hệ thống",
    }]
  };
  const [checked, setChecked] = useState<any>({
    candidate: {
      checkedList: 'no',
    },
    members: {
      checkedList: 'no',
    },
    interviewers: {
      checkedList: [],
      indeterminate: false,
      checkAll: false
    },
    presenter: {
      checkedList: [],
      indeterminate: false,
      checkAll: false
    }
  })
  const [reqCreate, setReqCreate] = useState<ChangeProcessRequest | any>()

  useEffect(() => {
    if (showForm.show_change_process) {
      props.getListRecruitment({id: showForm.change_process?.recruitmentId})
      setProcess(showForm.change_process?.statusCVId)

      props.getListEmail({page: 1, size: 91});
    }
  }, [showForm.show_change_process])


  useEffect(() => {
    if (showForm.show_change_process && props.listEmail) {
      setEmailTemp(props.listEmail.rows[0])
      setValueEditor(props.listEmail.rows[0]?.content)
    }
  }, [props.listEmail])


  const handleCloseForm = () => {
    resetFields()
    props.showChangeProcessForm(false)
    setValueEditor("")
    setEmailTemp(undefined)
  }

  function btnChangeProcessClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let processForm: ProcessForm = ({
          idProfile: showForm.change_process?.idProfile,
          recruitmentId: showForm.change_process?.recruitmentId,
          statusCVId: process
        })

        let req: ChangeProcessRequest = ({
          changeProcess: processForm,

        })
        props.changeProcess(req, false)
        return;
      }
    });

  }

  function onBtnContinueCreateClicked(e: FormEvent) {
    e.preventDefault();
    (e.target as any).disabled = true;
    (e.target as any).disabled = false;
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let processForm: ProcessForm = ({
          idProfile: showForm.change_process?.idProfile,
          recruitmentId: showForm.change_process?.recruitmentId,
          statusCVId: process
        })
        setReqCreate(processForm)
        props.showEmailChangeProcessForm(true)
        return;
      }
    });

  }

  function handleChangeProcess(event: any) {
    setProcess(event.target.value)
  }

  function handleChangeMailContent(content: string) {
    if (content === "<p><br></p>") {
      setDisplay(true)
      setValueEditor("")
    } else {
      setDisplay(false)
      setValueEditor(content)
    }
  }

  function handleSelectMailTemplate(value: any) {
    const selectEmail = props.listEmail.rows.find((item: any) => item.id === value)
    setEmailTemp(selectEmail)
    setValueEditor(selectEmail.content)
  }

  function onFileChange(e: any) {
    const newFile = fileAttach.concat(e.target.files[0])
    setFileAttach(newFile);
  }

  function handleDeleteFile(item: any, index: any) {
    const newFile = Array.from(fileAttach);
    newFile.splice(index, 1)
    setFileAttach(newFile)
  }

  const onOpenFileClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  function onSearchEmail(value: any) {
    props.searchListEmail({name: value})
    setTrigger({...trigger, email: true})
  }

  function onFocusEmail() {
    setEmailTemp(props.listEmail.rows)
  }


  function onCheckInterviewersChange(checkedList: any) {
    setChecked({
        ...checked,
        interviewers: {
          checkedList: checkedList,
          indeterminate: !!checkedList.length && checkedList.length < plainOptions.interviewers.length,
          checkAll: checkedList.length === plainOptions.interviewers.length,
        }
      }
    );
  };

  function onCheckPresenterChange(checkedList: any) {
    setChecked({
        ...checked,
        presenter: {
          checkedList: checkedList,
          indeterminate: !!checkedList.length && checkedList.length < plainOptions.presenter.length,
          checkAll: checkedList.length === plainOptions.presenter.length,
        }
      }
    );
  };

  function onCheckMembersChange(event: any) {
    setChecked({
        ...checked,
        members: {
          checkedList: event.target.value,
        }
      }
    );
  };

  function onCheckCandidateChange(event: any) {
    setChecked({
        ...checked,
        candidate: {
          checkedList: event.target.value,
        }
      }
    );
  };

  function onCheckAllInterviewersChange(e: any) {
    setChecked({
      ...checked,
      interviewers: {
        checkedList: e.target.checked ? plainOptions.interviewers.map((item: any) => item.id) : [],
        indeterminate: false,
        checkAll: e.target.checked,
      }
    });
  };

  function onCheckAllPresenterChange(e: any) {
    setChecked({
      ...checked,
      presenter: {
        checkedList: e.target.checked ? plainOptions.presenter.map((item: any) => item.id) : [],
        indeterminate: false,
        checkAll: e.target.checked,
      }
    });
  };

  return (
    <>
      <Modal
        zIndex={2}
        maskClosable={false}
        visible={showForm.show_change_process}
        centered={true}
        width="700px"
        className="custom"
        afterClose={handleCloseForm}
        onCancel={handleCloseForm}
        footer={""}>
        <div style={{overflow: "auto", height: 555}}>
          <div className="schedule-detail" style={{paddingBottom: 0}}>
            <div className="schedule-detail-head">
              <div className="schedule-detail-title">Chuyển vòng</div>
            </div>
            <div className="schedule-detail-content">
              <div style={{...fontWeight}}>Vòng tuyển dụng</div>

              <Radio.Group onChange={handleChangeProcess} value={process}>
                {props.recruitment.rows[0]?.interviewProcess.map((item: any, index: any) => {
                  return <Radio key={index} value={item.id} className="flex-items-center">
                    {item.name}
                  </Radio>
                })}
              </Radio.Group>

            </div>
          </div>

          <div style={{padding: "0 24px 24px"}}>
              <div style={{fontWeight: 500}}>Gửi mail cho hội đồng tuyển dụng</div>
              <div style={{display: "flex"}}>
                <div>
                  <Checkbox
                    indeterminate={checked.interviewers.indeterminate}
                    onChange={onCheckAllInterviewersChange}
                    checked={checked.interviewers.checkAll}
                  >
                    Tất cả
                  </Checkbox>
                </div>
                <CheckboxGroup
                  value={checked.interviewers.checkedList}
                  onChange={onCheckInterviewersChange}
                >
                  {plainOptions.interviewers.map((item: any, index: any) =>
                    <Checkbox key={item.id} value={item.id}>{item.name}</Checkbox>
                  )}
                </CheckboxGroup>
              </div>
              <br/>

              <div style={{fontWeight: 500}}>Gửi mail cho ứng người giới thiệu</div>
              <div style={{display: "flex"}}>
                <div>
                  <Checkbox
                    indeterminate={checked.presenter.indeterminate}
                    onChange={onCheckAllPresenterChange}
                    checked={checked.presenter.checkAll}
                  >
                    Tất cả
                  </Checkbox>
                </div>
                <CheckboxGroup
                  value={checked.presenter.checkedList}
                  onChange={onCheckPresenterChange}
                >
                  {plainOptions.presenter.map((item: any, index: any) =>
                    <Checkbox key={item.id} value={item.id}>{item.name}</Checkbox>
                  )}
                </CheckboxGroup>
              </div>
              <br/>

              <div style={{fontWeight: 500}}>Gửi mail cho ứng viên</div>
              <div><Radio.Group
                value={checked.candidate.checkedList}
                onChange={onCheckCandidateChange}
              >
                {plainOptions.candidate.map((item: any, index: any) =>
                  <Radio key={item.id} value={item.id}>{item.name}</Radio>
                )}
              </Radio.Group>
              </div>
              <br/>

              <div style={{fontWeight: 500}}>Gửi mail cho cán bộ liên quan</div>
              <div>
                <Radio.Group
                  value={checked.members.checkedList}
                  onChange={onCheckMembersChange}
                >
                  {plainOptions.members.map((item: any, index: any) =>
                    <Radio key={item.id} value={item.id}>{item.name}</Radio>
                  )}
                </Radio.Group>
              </div>
              <br/>

          </div>
        </div>

        <div className="footer-right">
          <Button onClick={handleCloseForm}>Hủy</Button>
          {checked.candidate.checkedList === "yes" ||
          checked.members.checkedList === "yes" ||
          checked.interviewers.checkedList.length>0||
          checked.presenter.checkedList.length>0 ?
            <Button type={"primary"} className="ml-2" onClick={onBtnContinueCreateClicked}>Tiếp tục</Button>
            :
            <Button onClick={btnChangeProcessClicked} type={"primary"} className="ml-2">Chuyển</Button>
          }
        </div>
      </Modal>

      <CreateEmailChangeProcessForm reqCreate={reqCreate}/>
    </>
  );
}

export default connector(Form.create<IProps>()(ChangeProcessForm));
