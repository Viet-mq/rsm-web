import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Avatar} from "antd";
import {getDetailRecruitment, getListKanbanCandidate} from "../redux/actions";

const mapStateToProps = (state: RootState) => ({
  listKanbanCandidate: state.recruitmentManager.listKanbanCandidate,
  detailRecruitment: state.recruitmentManager.detailRecruitment,

})
const connector = connect(mapStateToProps, {
  getListKanbanCandidate,
  getDetailRecruitment,

});
type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
  idRecruitment: string,
  visibleType: string
}

function KanbanProcess(props: IProps) {
  const [cards, setCards] = useState<any>([
    [
      {
       id: "1",
        fullName: "Vũ Điệp Chi 1",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "2",
        fullName: "Vũ Điệp Chi 2",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "3",
        fullName: "Vũ Điệp Chi 3",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "4",
        fullName: "Vũ Điệp Chi 4",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "5",
        fullName: "Vũ Điệp Chi 5",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "6",
        fullName: "Vũ Điệp Chi 6",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "7",
        fullName: "Vũ Điệp Chi 7",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "8",
        fullName: "Vũ Điệp Chi 8",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
    ],
    [
      {
       id: "9",
        fullName: "Vũ Điệp Chi 9",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "10",
        fullName: "Vũ Điệp Chi 10",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "11",
        fullName: "Vũ Điệp Chi 11",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "12",
        fullName: "Vũ Điệp Chi 12",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "13",
        fullName: "Vũ Điệp Chi 13",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
    ],
    [
      {
       id: "14",
        fullName: "Vũ Điệp Chi 14",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "15",
        fullName: "Vũ Điệp Chi 15",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },
      {
       id: "16",
        fullName: "Vũ Điệp Chi 16",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      },],
    [
      {
       id: "17",
        fullName: "Vũ Điệp Chi 17",
        phoneNumber: "0904 993 1124",
        email: "tranthuy.nute@gmail.com"
      }]]);
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
    if (props.listKanbanCandidate.rows?.length) {
      handleFilterCandidate(props.listKanbanCandidate.rows);
    }
  }, [props.listKanbanCandidate.rows])

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
      props.detailRecruitment?.rows[0]?.interviewProcess.forEach((element: any) => {
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
    const {source, destination} = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(cards[sInd], source.index, destination.index);
      const newState = [...cards];
      newState[sInd] = items;
      setCards(newState);
    } else {
      const result = move(cards[sInd], cards[dInd], source, destination);
      const newState = [...cards];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setCards(newState);
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

  const getInitials = (name: string) => {
    if (name) {
      let initials: any = name.split(' ');
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = name.substring(0, 2);
      }
      return initials.toUpperCase();
    }
  }

  console.log(filterCandidate)
  console.log(filterCandidate[0])
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
