import {RootState} from "src/redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import {Button, Form, Icon, Switch} from "antd";
import React, {useState} from "react";
import {showFormCreate as showJobFormCreate} from "../../../JobManager/redux/actions";
import 'devextreme/dist/css/dx.light.css';
import ReactQuill from "react-quill";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {MdDragIndicator} from "react-icons/all";
import CreateProcessForm from "./CreateProcessForm";
import UpdateProcessForm from "./UpdateProcessForm";

const mapStateToProps = (state: RootState) => ({
  listAccount: state.accountManager.list,
  listStatus: state.statuscvManager.list,
  getBookingState: state.profileManager.getBooking,
  updateBooking: state.profileManager.updateBooking,
  createBooking: state.profileManager.createBooking,
  showBooking: state.profileManager.showBooking,
  listAddress: state.addressManager.list,
  listRecruitment: state.recruitmentManager.list,
  listTalentPool: state.talentPoolManager.list,
  listJob: state.jobManager.list,
  createJob: state.jobManager.create,
})

const connector = connect(mapStateToProps,
  {
    showJobFormCreate,
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
  const [schema, setSchema] = useState([
    {
      id: "receiving",
      type: "a",
      text: "Tiếp nhận hồ sơ",
      isDragDisabled: true,
    },
    {
      id: "interview",
      type: "b",
      text: "Phỏng vấn",
      isDragDisabled: false
    },
    {
      id: "567",
      type: "a",
      text: "Phỏng vấn CEO",
      isDragDisabled: false
    },
    {
      id: "789",
      type: "b",
      text: "Offer",
      isDragDisabled: true
    },
    {
      id: "8910",
      type: "b",
      text: "Đã tuyển",
      isDragDisabled: true
    }
  ])
  const [lastElement, setLastElement] = useState<any>(schema.map(el => el.isDragDisabled).lastIndexOf(false));

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // reorder using index of source and destination.
    const schemaCopy = schema.slice();
    const [removed] = schemaCopy.splice(result.source.index, 1);
    // put the removed one into destination.
    schemaCopy.splice(result.destination.index, 0, removed);

    console.log(result);
    setLastElement(schemaCopy.map(el => el.isDragDisabled).lastIndexOf(false))
    setSchema(schemaCopy);
  };


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
            <Droppable droppableId="column1">
              {(provided, snap) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {
                    schema.map((it, i) => (
                      it.isDragDisabled ? <div key={it.id} className="process-list process-system flex-items-center">
                          <MdDragIndicator className={"mr-2"}/>
                          <div className={"flex-process"}>
                            {it.text}
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
                                    {it.text}
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
                                <div className="add-process-button">
                                  <Button type="dashed" size={"large"}> <Icon type="plus"/>Thêm vòng tuyển dụng</Button>
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
            <Switch defaultChecked className="mr-2"/> <p className="form-label">Tự động gửi email xác nhận ứng tuyển</p>
          </div>
          <div>Khi ứng viên ứng tuyển vào tin tuyển dụng này, hệ thống sẽ tự động gửi email cho ứng viên</div>

          <div className="schedule-detail-title mb-4">Mô tả công việc</div>
          <ReactQuill
            style={fontWeightStyle}
            theme={'snow'}
            modules={modules}
            formats={formats}
            bounds={'.app'}
            placeholder="Mô tả công việc"
          />

        </div>
      </div>
    </div>

      <CreateProcessForm/>
      <UpdateProcessForm/>
    </>
  );
}

export default connector(Form.create<IProps>()(ProcessForm));
