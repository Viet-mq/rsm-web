import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Avatar, Button} from "antd";

const mapStateToProps = ({jobManager}: RootState) => ({jobManager});
const connector = connect(mapStateToProps, {});

type ReduxProps = ConnectedProps<typeof connector>;
interface IProps extends ReduxProps {
}

function KanbanProcess(props: IProps) {
  const [cards, setCards] = useState<any>([
    [
    {
      id: "1",
      name: "Vũ Điệp Chi 1",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "2",
      name: "Vũ Điệp Chi 2",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "3",
      name: "Vũ Điệp Chi 3",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "4",
      name: "Vũ Điệp Chi 4",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "5",
      name: "Vũ Điệp Chi 5",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "6",
      name: "Vũ Điệp Chi 6",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "7",
      name: "Vũ Điệp Chi 7",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "8",
      name: "Vũ Điệp Chi 8",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
  ],
    [
    {
      id: "9",
      name: "Vũ Điệp Chi 9",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "10",
      name: "Vũ Điệp Chi 10",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "11",
      name: "Vũ Điệp Chi 11",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "12",
      name: "Vũ Điệp Chi 12",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "13",
      name: "Vũ Điệp Chi 13",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
  ],
    [
    {
    id: "14",
    name: "Vũ Điệp Chi 14",
    phone: "0904 993 1124",
    mail: "tranthuy.nute@gmail.com"
  },
    {
      id: "15",
      name: "Vũ Điệp Chi 15",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },
    {
      id: "16",
      name: "Vũ Điệp Chi 16",
      phone: "0904 993 1124",
      mail: "tranthuy.nute@gmail.com"
    },],
    [
    {
    id: "17",
    name: "Vũ Điệp Chi 17",
    phone: "0904 993 1124",
    mail: "tranthuy.nute@gmail.com"
  }]]);
  const reorder = (list: any, startIndex: any, endIndex: any) => {
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

// fake data generator
  /**
   * Moves an item from one list to another list.
   */
  const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

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
  const getListStyle = (isDraggingOver: any) => ({
    // background: isDraggingOver ? "#e6f7ff" : "#F4F4F4",
    background: "#F4F4F4",
    padding: 17,
    width: 250,
    marginRight: 10,
    height: 685,
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

  return (
    <>
        <div style={{display: "flex"}}>
          <DragDropContext onDragEnd={onDragEnd}>
            {cards.map((element: any, ind: any) => (

              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    <div className="kanban-title-list">Tuyển dụng</div>
                    <div style={{overflow:"auto",height:610}}>
                      {element.map((item: any, index: any) => (
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
                                provided.draggableProps.style
                              )}
                            >
                              <div className="kanban-item-list">
                                <div className="c-main-content">
                                  <Avatar size={25} style={{backgroundColor: "#ffbd24"}}>
                                    {getInitials(item.name)}
                                  </Avatar>
                                  <div className="c-main-content__wrap-main" style={{width: 160, gridRowGap: 4}}>
                                    <div className="main-1">
                                      <a className="main-1__candidate-name">{item.name}</a>
                                    </div>
                                    <div className="ellipsis">{item.phone}</div>
                                    <div className="ellipsis">{item.mail}</div>
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
