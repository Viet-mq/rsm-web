import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Input, Popconfirm, Switch, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {MdDragIndicator} from "react-icons/all";
import CreateProcessForm from "./CreateProcessForm";
import UpdateProcessForm from "./UpdateProcessForm";
import {
  createSteps,
  deleteProcess,
  getDataRecruitmentUpdate,
  showFormCreate,
  showFormUpdate
} from "../../redux/actions";
import {CreateRecruitmentRequest, DeleteProcessRequest, RecruitmentEntity} from "../../types";
import {useLocation} from "react-router-dom";
import ReactQuill from "react-quill";

const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  recruitmentManager: state.recruitmentManager,
})

const connector = connect(mapStateToProps, {
  showFormCreate,
  showFormUpdate,
  createSteps,
  getDataRecruitmentUpdate,
  deleteProcess

});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function ProcessForm(props: IProps) {
  const {createSteps, update, deleteProcess} = props.recruitmentManager
  const location = useLocation();
  const isEdit = location.pathname.includes("edit");
  const fontWeightStyle = {fontWeight: 400};
  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  const modules = {
    toolbar: [
      [{'header': '1'}, {'header': '2'}],
      ['blockquote', 'code-block'],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
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

  const [schema, setSchema] = useState<any>([])
  const [lastElement, setLastElement] = useState<any>();
  const [valueEditor, setValueEditor] = useState(
     isEdit ? update.dataUpdate?.interest : createSteps.request?.interest || ""
  )

  const [display, setDisplay] = useState(false)

  useEffect(() => {
    document.title = "Quản lý tin tuyển dụng";
  }, []);

  useEffect(() => {
    isEdit ? setSchema(update.dataUpdate?.interviewProcess) : setSchema(createSteps.request?.interviewProcess)
  }, [createSteps.request, update.dataUpdate])

  useEffect(() => {
    if (schema?.length) {
      const calLastElement = schema.map((el: any) => el.isDragDisabled).lastIndexOf(false)
      if (calLastElement !== -1) setLastElement(calLastElement)
      else setLastElement(0)
    }
  }, [schema])

  useEffect(() => {
    if (deleteProcess.response?.code === 0) {
      schema.splice(deleteProcess?.index, 1)
      checkIsNewProcess();
    }

  }, [deleteProcess.response])

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    // reorder using index of source and destination.
    const schemaCopy: any = schema?.slice();
    const [removed] = schemaCopy.splice(result.source.index, 1);
    // put the removed one into destination.
    schemaCopy.splice(result.destination.index, 0, removed);
    setLastElement(schemaCopy.map((el: any) => el.isDragDisabled).lastIndexOf(false))
    if (isEdit) {
      if (update.dataUpdate) {
        let req: RecruitmentEntity = {
          ...update.dataUpdate,
          interviewProcess: schemaCopy
        }
        props.getDataRecruitmentUpdate(req)
      }
    } else {
      let req: CreateRecruitmentRequest = ({
        ...createSteps.request,
        interviewProcess: schemaCopy
      })
      props.createSteps(req)
    }

    setSchema(schemaCopy);
  };

  function showFormProcess() {
    props.showFormCreate(true)
  }

  function onFormChange() {
    // let req: CreateRecruitmentRequest = ({
    //
    // })
    // props.createSteps(req)
    // props.checkInformationValidate(true)
  }

  function checkIsNewProcess() {
    if (isEdit) {
      if (update.dataUpdate) {
        let req: RecruitmentEntity = {
          ...update.dataUpdate,
          interviewProcess: schema
        }
        props.getDataRecruitmentUpdate(req)
      }
    } else {
      let req: CreateRecruitmentRequest = ({
        ...createSteps.request,
        interviewProcess: schema
      })
      props.createSteps(req)
    }
    const calLastElement = schema.map((el: any) => el.isDragDisabled).lastIndexOf(false)
    if (calLastElement !== -1) setLastElement(calLastElement)
    else setLastElement(0)
    setSchema(schema)
  }

  function btnDeleteProcessClicked(values: any, index: any) {
    if (values.isNew === true) {
      schema.splice(index, 1)
      checkIsNewProcess()
    } else {
      let req: DeleteProcessRequest = {
        recruitmentId: update.dataUpdate?.id,
        statusCVId: values.id,
      }
      props.deleteProcess(req, index)
    }
  }

  function btnEditProcessClicked(item: any, index: any) {
    props.showFormUpdate(true, item, index)
  }

  function handleChangeTextEditor(value:any) {
    console.log(value)
    if (value === "<p><br></p>") {
      setDisplay( true)
      setValueEditor( "")
    } else {
      setDisplay( false)
      // const newValueEditor = valueEditor
      // newValueEditor.interest = value
      // onFormChange(salary, newValueEditor)
      setValueEditor(value)
    }
  }

  return (
    <>
      <div className="main-content main-process">
        <div style={{padding: "24px 24px 0 24px"}}>
          <div className="schedule-detail-title">Quy trình tuyển dụng</div>
          <div>Xây dựng quy trình tuyển dụng cho vị trí đang đăng tuyển</div>
        </div>
        <div className="c-schedule-interview-popup">
          <div className='ant-col-14 grid-left'>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable-1">
                {(provided, snap) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {
                      schema?.map((item: any, index: any) => (
                        item.isDragDisabled ?
                          (<>
                            <div key={item.id} className="process-list process-system flex-items-center">
                              <MdDragIndicator className={"mr-2"}/>
                              <div className={"flex-process"}>
                                {item.name}
                              </div>
                              <div>
                                <Tooltip placement="top" title="Sửa">
                                  <Icon className="hover-pointer" type="edit"
                                        onClick={() => btnEditProcessClicked(item, index)}
                                        style={{fontSize: '130%', marginRight: 15}}/>
                                </Tooltip>
                              </div>
                            </div>
                            {index === lastElement ?
                              <>
                                {provided.placeholder}
                                <div className="add-process-button" onClick={showFormProcess}>
                                  <Button type="dashed" size={"large"}> <Icon type="plus"/>Thêm vòng tuyển
                                    dụng</Button>
                                </div>
                              </>
                              : null}
                          </>) :
                          (
                            <>
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                                isDragDisabled={item.isDragDisabled}
                              >
                                {(provided, snap) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snap.isDragging
                                        ? "#e6f7ff"
                                        : "#fff",
                                      ...provided.draggableProps.style
                                    }}
                                    className="process-list flex-items-center"
                                  >

                                    <MdDragIndicator className={"mr-2"}/>
                                    <div className={"flex-process"}>
                                      {item.name}
                                    </div>
                                    <div>
                                      <Tooltip placement="top" title="Sửa">
                                        <Icon className="hover-pointer" type="edit"
                                              onClick={() => btnEditProcessClicked(item, index)}
                                              style={{fontSize: '130%', marginRight: 15}}/>
                                      </Tooltip>
                                    </div>
                                    <div className="hover-pointer">
                                      <Popconfirm
                                        title="Bạn muốn xóa vòng tuyển dụng này chứ ?"
                                        okText="Xóa"
                                        onCancel={event => {
                                          event?.stopPropagation();
                                        }}
                                        onConfirm={() => btnDeleteProcessClicked(item, index)}
                                      >
                                        <Tooltip placement="top" title="Xóa">
                                          <Icon type="delete" style={{color: 'red', fontSize: '130%'}}/>

                                        </Tooltip>

                                      </Popconfirm>
                                    </div>
                                  </div>

                                )}
                              </Draggable>
                              {index === lastElement ?
                                <>
                                  {provided.placeholder}
                                  <div className="add-process-button" onClick={showFormProcess}>
                                    <Button type="dashed" size={"large"}> <Icon type="plus"/>Thêm vòng tuyển
                                      dụng</Button>
                                  </div>
                                </>
                                : null}
                            </>
                          )
                      ))
                    }
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div style={{display: "flex"}}>
              <Switch defaultChecked className="mr-2"/> <p className="form-label">Tự động gửi email xác nhận ứng
              tuyển</p>
            </div>
            <div>Khi ứng viên ứng tuyển vào tin tuyển dụng này, hệ thống sẽ tự động gửi email cho ứng viên</div>

            <div className="schedule-detail-title mb-4">Nội dung email</div>
            <ReactQuill
              style={fontWeightStyle}
              className="ql-custom"
              onChange={handleChangeTextEditor}
              value={valueEditor||""}
              
              theme={'snow'}
              modules={modules}
              formats={formats}
              bounds={'.app'}
              placeholder="Nội dung email"
            />
            <div className={display ? "value-required show" : "value-required hide"}>Vui lòng nhập email
            </div>
          </div>
        </div>
      </div>

      <CreateProcessForm schema={schema} lastElement={lastElement}
                         setLastElement={setLastElement}/>
      <UpdateProcessForm schema={schema} setSchema={setSchema}/>
    </>
  );
}

export default connector(Form.create<IProps>()(ProcessForm));
