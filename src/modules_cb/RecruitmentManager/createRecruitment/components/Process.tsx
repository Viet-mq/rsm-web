import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Switch} from "antd";
import React, {useState} from "react";
import 'devextreme/dist/css/dx.light.css';
import ReactQuill from "react-quill";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {MdDragIndicator} from "react-icons/all";
import CreateProcessForm from "./CreateProcessForm";
import UpdateProcessForm from "./UpdateProcessForm";
import {showFormCreate, showFormUpdate} from "../../redux/actions";

const mapStateToProps = (state: RootState) => ({
  listProcess: state.statuscvManager.list,
})

const connector = connect(mapStateToProps, {
  showFormCreate,
  showFormUpdate
});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends FormComponentProps, ReduxProps {
}

function ProcessForm(props: IProps) {
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
  const [schema, setSchema] = useState(props.listProcess.rows)
  const [lastElement, setLastElement] = useState<any>(schema?.map(el => el.isDragDisabled).lastIndexOf(false));

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // reorder using index of source and destination.
    const schemaCopy:any = schema?.slice();
    const [removed] = schemaCopy.splice(result.source.index, 1);
    // put the removed one into destination.
    schemaCopy.splice(result.destination.index, 0, removed);
    setLastElement(schemaCopy.map((el:any) => el.isDragDisabled).lastIndexOf(false))
    setSchema(schemaCopy);
  };

  function showFormProcess() {
    props.showFormCreate(true)
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
                      schema?.map((it, i) => (
                        it.isDragDisabled ? <div key={it.id} className="process-list process-system flex-items-center">
                            <MdDragIndicator className={"mr-2"}/>
                            <div className={"flex-process"}>
                              {it.name}
                            </div>
                            <div>
                              <Icon type="edit" style={{fontSize: '130%'}}></Icon>
                            </div>
                          </div> :
                          (
                            <>
                              <Draggable
                                key={it.id}
                                draggableId={it.id}
                                index={i}
                                isDragDisabled={it.isDragDisabled}
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
                                      {it.name}
                                    </div>
                                    <div>
                                      <Icon type="edit" style={{fontSize: '130%', marginRight: 15}}></Icon>
                                    </div>
                                    <div>
                                      <Icon type="delete" style={{color: 'red', fontSize: '130%'}}></Icon>
                                    </div>
                                  </div>

                                )}
                              </Draggable>
                              {i === lastElement ?
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
              theme={'snow'}
              modules={modules}
              formats={formats}
              bounds={'.app'}
              placeholder="Nội dung email"
            />

          </div>
        </div>
      </div>

      <CreateProcessForm schema={schema} setSchema={setSchema}/>
      <UpdateProcessForm/>
    </>
  );
}

export default connector(Form.create<IProps>()(ProcessForm));
