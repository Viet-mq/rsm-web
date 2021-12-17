import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Avatar, Button} from "antd";
import moment from "moment";

const mapStateToProps = ({jobManager}: RootState) => ({jobManager});
const connector = connect(mapStateToProps, {});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends ReduxProps {
}


function KanbanProcess(props: IProps) {
  const getItems = (count: any, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
      id: `item-${k + offset}-${new Date().getTime()}`,
      content: `item ${k + offset}`
    }));

  const [cards, setCards] = useState<any>([getItems(10), getItems(5, 10)]);
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

      setCards(newState.filter(group => group.length));
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
  const grid = 17;

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    marginBottom:10,
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
    padding: grid,
    width: 250,
    marginRight: 10,
    height: 650,
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
      <div>
        <Button
          onClick={() => {
            setCards([...cards, []]);
          }}
        >
          Add new group
        </Button>
        <Button
          onClick={() => {
            setCards([...cards, getItems(1)]);
          }}
        >
          Add new item
        </Button>
        <div style={{display: "flex"}}>
          <DragDropContext onDragEnd={onDragEnd}>
            {cards.map((el: any, ind: any) => (

              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    <div className="kanban-title-list">Tuyển dụng</div>
                    {el.map((item: any, index: any) => (
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
                                <Avatar size={25} style={{backgroundColor:"#ffbd24"}}>
                                  {getInitials("Vũ Điệp Chi")}
                                </Avatar>
                                <div className="c-main-content__wrap-main" style={{width:160,gridRowGap:4}}>
                                  <div className="main-1">
                                    <a className="main-1__candidate-name">Vũ Điệp Chi</a>
                                  </div>
                                    <div className="ellipsis">0808 332 1114</div>
                                    <div className="ellipsis">tranthuy.nute@gmail.com</div>
                                  <div>{item.content}</div>
                                </div>
                              </div>


                              {/*<button*/}
                              {/*  type="button"*/}
                              {/*  onClick={() => {*/}
                              {/*    const newState = [...cards];*/}
                              {/*    newState[ind].splice(index, 1);*/}
                              {/*    setCards(*/}
                              {/*      newState.filter(group => group.length)*/}
                              {/*    );*/}
                              {/*  }}*/}
                              {/*>*/}
                              {/*  delete*/}
                              {/*</button>*/}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            ))}
          </DragDropContext>
        </div>
      </div>
    </>
  );

}

export default connector(KanbanProcess);
