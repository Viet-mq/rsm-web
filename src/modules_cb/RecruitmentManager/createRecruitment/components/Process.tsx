import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Input, Switch} from "antd";
import React, {useEffect, useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {MdDragIndicator} from "react-icons/all";
import CreateProcessForm from "./CreateProcessForm";
import UpdateProcessForm from "./UpdateProcessForm";
import {createSteps, getDataRecruitmentUpdate, showFormCreate, showFormUpdate} from "../../redux/actions";
import {CreateRecruitmentRequest, RecruitmentEntity} from "../../types";
import {useLocation} from "react-router-dom";

const {TextArea} = Input;

const mapStateToProps = (state: RootState) => ({
  showForm: state.recruitmentManager.showForm,
  createStepsState: state.recruitmentManager.createSteps,
  dataUpdate: state.recruitmentManager.update.dataUpdate

})

const connector = connect(mapStateToProps, {
  showFormCreate,
  showFormUpdate,
  createSteps,
  getDataRecruitmentUpdate

});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function ProcessForm(props: IProps) {
  const location = useLocation();
  const fontWeightStyle = {fontWeight: 400, height: 215};
  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  const modules = {
    toolbar: [
      [{'header': '1'}, {'header': '2'}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
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
  useEffect(() => {
    document.title = "Quản lý tin tuyển dụng";
  }, []);

  useEffect(() => {
    location.pathname.includes("edit") ? setSchema(props.dataUpdate?.interviewProcess) : setSchema(props.createStepsState.request?.interviewProcess)

  }, [props.createStepsState.request, props.dataUpdate])

  useEffect(() => {
    if (schema?.length) {
      setLastElement(schema.map((el: any) => el.isDragDisabled).lastIndexOf(false))
    }
  }, [schema])

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


    if (location.pathname.includes("edit")) {
      if (props.dataUpdate) {
        let req: RecruitmentEntity = {
          ...props.dataUpdate,
          interviewProcess: schemaCopy
        }
        props.getDataRecruitmentUpdate(req)
      }

    } else {
      let req: CreateRecruitmentRequest = ({
        ...props.createStepsState.request,
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

  function btnDeleteProcessClicked(values: any, index: any) {
    schema.splice(index, 1)
    if (location.pathname.includes("edit")) {
      if (props.dataUpdate) {
        let req: RecruitmentEntity = {
          ...props.dataUpdate,
          interviewProcess: schema
        }
        props.getDataRecruitmentUpdate(req)
      }

    } else {
      let req: CreateRecruitmentRequest = ({
        ...props.createStepsState.request,
        interviewProcess: schema
      })
      props.createSteps(req)
    }

    setSchema(schema)
    setLastElement(schema.map((el: any) => el.isDragDisabled).lastIndexOf(false))

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
                          <div key={item.id} className="process-list process-system flex-items-center">
                            <MdDragIndicator className={"mr-2"}/>
                            <div className={"flex-process"}>
                              {item.name}
                            </div>
                            <div>
                              <Icon type="edit" style={{fontSize: '130%'}}/>
                            </div>
                          </div> :
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
                                      <Icon type="edit" style={{fontSize: '130%', marginRight: 15}}/>
                                    </div>
                                    <div className="icon-delete" onClick={() => btnDeleteProcessClicked(item, index)}>
                                      <Icon type="delete" style={{color: 'red', fontSize: '130%'}}/>
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
            {/*<ReactQuill*/}
            {/*  style={fontWeightStyle}*/}
            {/*  theme={'snow'}*/}
            {/*  modules={modules}*/}
            {/*  formats={formats}*/}
            {/*  bounds={'.app'}*/}
            {/*  placeholder="Nội dung email"*/}
            {/*/>*/}

            <TextArea onChange={onFormChange} placeholder="Quyền lợi" style={{height: 150}}
                      className="bg-white text-black"/>

          </div>
        </div>
      </div>

      <CreateProcessForm schema={schema} setSchema={setSchema} lastElement={lastElement}
                         setLastElement={setLastElement}/>
      <UpdateProcessForm/>
    </>
  );
}

export default connector(Form.create<IProps>()(ProcessForm));
