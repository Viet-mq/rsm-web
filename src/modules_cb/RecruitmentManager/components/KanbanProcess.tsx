import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Avatar} from "antd";
import {getDetailRecruitment, getListKanbanCandidate} from "../redux/actions";
import {ChangeProcessRequest, ProcessForm} from "../../ProfileManager/types";
import {changeProcess, showChangeProcessForm} from "../../ProfileManager/redux/actions";
import {getInitials} from "../../../helpers/utilsFunc";

const mapStateToProps = (state: RootState) => ({
  recruitmentManager: state.recruitmentManager,

})
const connector = connect(mapStateToProps, {
  getListKanbanCandidate,
  getDetailRecruitment,
  changeProcess,
  showChangeProcessForm,


});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  idRecruitment: string,
  visibleType: string
}

function KanbanProcess(props: IProps) {
  const {listKanbanCandidate,detailRecruitment}=props.recruitmentManager
  const [filterCandidate, setFilterCandidate] = useState<any>([])

  useEffect(() => {
    if (props.visibleType !== 'list')
      props.getListKanbanCandidate({
        recruitment: props.idRecruitment,
        page: 1,
        size: 100
      })
  }, [props.visibleType])

  useEffect(() => {
    if (listKanbanCandidate.rows) {
      handleFilterCandidate(listKanbanCandidate.rows);
    }
  }, [listKanbanCandidate.rows])

  function handleFilterCandidate(values:any) {
      const queryFilter = values.reduce((curr: any, next: any) => {
        const queryCandidate = curr.find((item: any) => {
          return item.statusCVId === next.statusCVId
        })
        if (queryCandidate && queryCandidate.statusCVId !== '') {
          queryCandidate.result?.push(next)
        } else if (next.statusCVId !== '') {
          let newQuery = {
            statusCVId: next.statusCVId,
            statusCVName: next.statusCVName,
            result: [next]
          }
          curr.push(newQuery)
        }
        return curr;
      }, [])

      const result: any = [];
      detailRecruitment?.rows[0]?.interviewProcess.forEach((element: any) => {
        const findInQueryFilter = queryFilter.find((item: any) => {
          return item.statusCVId === element.id
        })
        result.push({
          id: element.id,
          name: element.name,
          total: element.total,
          result: findInQueryFilter?findInQueryFilter.result:[]
        })
      })

      setFilterCandidate(result)
      return result
  }

// fake data generator
  /**
   * Moves an item from one list to another list.
   */
  function move(source: any, destination: any, droppableSource: any, droppableDestination: any){
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

     const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  function reorder(list: any, startIndex: any, endIndex: any){
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function onDragEnd(result: any) {
    const {source, destination,draggableId} = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    const username= filterCandidate[sInd].result.find((item:any)=>item.id===draggableId).username
    if (sInd === dInd) {
      const items = reorder(filterCandidate[sInd]?.result, source.index, destination.index);
      const newState = [...filterCandidate];
      newState[sInd].result = items;
      setFilterCandidate(newState);
    } else {
      const result = move(filterCandidate[sInd]?.result, filterCandidate[dInd]?.result, source, destination);
      const newState = [...filterCandidate];
      newState[sInd].result = result[sInd];
      newState[dInd].result = result[dInd];
      setFilterCandidate(newState);

      let processForm: ProcessForm = ({
        idProfile: draggableId,
        recruitmentId: props.idRecruitment,
        statusCVId: newState[dInd].id,
        username:username,
      })

      //--------------Chuyển luôn không bật popup show email--------------
      let req: ChangeProcessRequest = ({
        changeProcess: processForm,
      })

      props.changeProcess(req,false)

      //--------------Xử lý việc show form email----------
      // props.showChangeProcessForm(true,processForm)
    }
  }

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({

    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    marginBottom: 10,
    borderRadius: "5px",
    boxShadow: " 1px 1px 1px rgba(0, 0, 0, 0.25)",
    // change background colour if dragging
    background: isDragging ? "#e6f7ff" : "#fff",
    // styles we need to apply on draggables
    ...draggableStyle

  });

  return (
    <>
      <div style={{display: "flex"}}>
        <DragDropContext onDragEnd={onDragEnd}>
          {filterCandidate.map((element: any, ind: any) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  className="kanban-droppable"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="kanban-title-list">{element?.name}</div>
                  <div style={{overflow: "auto", height: 610}}>
                    {element.result?.map((item: any, index: any) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                            )}
                          >
                            <div className="kanban-item-list">
                              <div className="c-main-content">
                                <Avatar size={25} style={{backgroundColor: "#ffbd24"}}>
                                  {getInitials(item.fullName)}
                                </Avatar>
                                <div className="c-main-content__wrap-main" style={{width: 160, gridRowGap: 4}}>
                                  <div className="main-1">
                                    <a className="main-1__candidate-name">{item.fullName}</a>
                                  </div>
                                  <div className="ellipsis">{item.phoneNumber}</div>
                                  <div className="ellipsis">{item.email}</div>
                                </div>
                              </div>

                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>

                  {provided.placeholder}

                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  );

}

export default connector(KanbanProcess);
