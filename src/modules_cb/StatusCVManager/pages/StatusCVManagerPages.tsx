import React, {useEffect, useState} from "react";
import {Button, Icon, Popconfirm, Tooltip} from "antd";
import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {deleteStatusCV, showFormCreate, showFormUpdate} from "../redux/actions";
import CreateStatusCVForm from "../components/CreateStatusCVForm";
import Loading from "../../../components/Loading";
import UpdateStatusCVForm from "../components/UpdateStatusCVForm";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MdDragIndicator} from "react-icons/all";

const mapStateToProps = (state: RootState) => ({
  statuscvManager: state.statuscvManager,
})

const connector = connect(mapStateToProps, {
  showFormCreate,
  showFormUpdate,
  deleteStatusCV,
});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}

function StatusCVManagerPages(props: IProps) {
  const { list, create, deleteStatusCV, update} = props.statuscvManager
  const [schema, setSchema] = useState<any>([])
  const [lastElement, setLastElement] = useState<any>(list.rows?.map((el: any) => el.isDragDisabled).lastIndexOf(false)!==-1?list.rows?.map((el: any) => el.isDragDisabled).lastIndexOf(false):0);

  useEffect(() => {
    document.title = "Quản lý quy trình tuyển dụng";
  }, []);

  useEffect(() => {
    setSchema(list?.rows)
  }, [list.rows]); 

  useEffect(()=>{
    if (schema?.length) {
      const calLastElement = schema.map((el: any) => el.isDragDisabled).lastIndexOf(false)
      if (calLastElement !== -1) setLastElement(calLastElement)
      else setLastElement(0)
    }
  },[schema])

  function onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // reorder using index of source and destination.
    const schemaCopy: any = list.rows;
    const [removed] = schemaCopy.splice(result.source.index, 1);
    // put the removed one into destination.
    schemaCopy.splice(result.destination.index, 0, removed);
    setLastElement(schemaCopy?.map((el: any) => el.isDragDisabled).lastIndexOf(false))
    setSchema(schemaCopy);
  };

  function showFormCreate(e: any) {
    e.preventDefault();
    if (e?.target) {
      e.target.disabled = true;
      e.target.disabled = false;
    }
    props.showFormCreate(true);
  }

  function showFormUpdate(item: any, index: any) {
    props.showFormUpdate(true, item, index)
  }

  function btnDeleteProcessClicked(item: any, index: any) {
    props.deleteStatusCV({id: item.id})
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
                                  onClick={() => showFormUpdate(item, index)}
                                  style={{fontSize: '130%', marginRight: 15}}/>
                          </Tooltip>
                        </div>
                      </div>
                      {index === lastElement ?
                        <>
                          {provided.placeholder}
                          <div className="add-process-button" onClick={showFormCreate}>
                            <Button type="dashed" size={"large"}> <Icon type="plus"/>
                            Thêm vòng tuyển dụng</Button>
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
                                        onClick={() => showFormUpdate(item, index)}
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
                            <div className="add-process-button" onClick={showFormCreate}>
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

      <CreateStatusCVForm/>
      <UpdateStatusCVForm/>

      {create.loading ||
      deleteStatusCV.loading ||
      update.loading ?
        <Loading/> : null}

    </div>
  );

}

export default connector(StatusCVManagerPages);
