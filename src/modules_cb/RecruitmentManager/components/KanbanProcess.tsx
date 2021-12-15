import {RootState} from "../../../redux/reducers";
import {connect, ConnectedProps} from "react-redux";
import {FormComponentProps} from "antd/lib/form";
import React, {useState} from "react";
import {createJob, showFormCreate} from "../redux/actions";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const mapStateToProps = ({jobManager}: RootState) => ({jobManager});
const connector = connect(mapStateToProps, {createJob, showFormCreate});

type ReduxProps = ConnectedProps<typeof connector>;

interface IProps extends  ReduxProps {
}

const getItems = (count: any, offset = 0) =>
  Array.from({length: count}, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }));


function KanbanProcess(props: IProps) {
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
  const grid = 8;

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  });
  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
  });


  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            setCards([...cards, []]);
          }}
        >
          Add new group
        </button>
        <button
          type="button"
          onClick={() => {
            setCards([...cards, getItems(1)]);
          }}
        >
          Add new item
        </button>
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
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around"
                              }}
                            >
                              {item.content}
                              <button
                                type="button"
                                onClick={() => {
                                  const newState = [...cards];
                                  newState[ind].splice(index, 1);
                                  setCards(
                                    newState.filter(group => group.length)
                                  );
                                }}
                              >
                                delete
                              </button>
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
