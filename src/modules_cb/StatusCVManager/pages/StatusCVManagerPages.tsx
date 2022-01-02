import React, {useEffect, useState} from "react";
import ListStatusCV from "../components/list/ListStatusCV";
import {Button, Icon} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {showFormCreate, showFormUpdate} from "../redux/actions";
import CreateStatusCVForm from "../components/CreateStatusCVForm";
import Loading from "../../../components/Loading";
import UpdateStatusCVForm from "../components/UpdateStatusCVForm";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MdDragIndicator} from "react-icons/all";
import {StatusCVEntity} from "../types";

const mapStateToProps = ({
                           statuscvManager: {
                             showForm,
                             list,
                             create,
                             deleteStatusCV,
                             update,
                           }
                         }: RootState) => ({
  showForm,
  list,
  create,
  deleteStatusCV,
  update,
})
const connector = connect(mapStateToProps, {showFormCreate, showFormUpdate});


type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function StatusCVManagerPages(props: IProps) {
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
  const [schema, setSchema] = useState<StatusCVEntity[]|any>(undefined)

  // useEffect(()=>{
  //   setSchema(props.list.rows)
  // },[props.list.rows])

  const [lastElement, setLastElement] = useState<any>(props.list.rows?.map((el:any) => el.isDragDisabled).lastIndexOf(false));

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // reorder using index of source and destination.
    const schemaCopy:any = props.list.rows;
    const [removed] = schemaCopy.splice(result.source.index, 1);
    // put the removed one into destination.
    schemaCopy.splice(result.destination.index, 0, removed);
    setLastElement(schemaCopy?.map((el:any) => el.isDragDisabled).lastIndexOf(false))
    setSchema(schemaCopy);
  };
  useEffect(() => {
    document.title = "Quản lý quy trình tuyển dụng";
  }, []);

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormCreate(true);
  }

  return (
    <div className="contentPage status-cv-container">

      <div className="entryHeader">
        <div className="flex-space-between">
          <div className="font-20-bold-500 d-flex">Quản lý quy trình tuyển dụng</div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided, snap) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {
                props.list.rows?.map((item:any, index:any) => (
                  item.isDragDisabled ? <div key={item.id} className="process-list process-system flex-items-center">
                      <MdDragIndicator className={"mr-2"}/>
                      <div className={"flex-process"}>
                        {item.name}
                      </div>
                      <div>
                        <Icon type="edit" style={{fontSize: '130%'}}></Icon>
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
                                <Icon type="edit" style={{fontSize: '130%', marginRight: 15}}></Icon>
                              </div>
                              <div>
                                <Icon type="delete" style={{color: 'red', fontSize: '130%'}}></Icon>
                              </div>
                            </div>

                          )}
                        </Draggable>
                        {index === lastElement ?
                          <>
                            {provided.placeholder}
                            <div className="add-process-button" onClick={handleCreate}>
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


      {/*<ListStatusCV/>*/}

      <CreateStatusCVForm/>
      <UpdateStatusCVForm/>

      {props.create.loading ||
      props.list.loading ||
      props.deleteStatusCV.loading ||
      props.update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(StatusCVManagerPages);
