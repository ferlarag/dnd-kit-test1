import { useState } from "react";
import SortableBoard from "./components/SortableBoard";
import SortableItem from "./components/SortableItem";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
  const [activeId, setActiveId] = useState(null);
  const [boards, setBoards] = useState([
    {
      id: "A",
      tasks: [
        "Task 1",
        "Task 2",
        "Task 3",
        "Task 4",
        "Task 5",
        "Task 6",
        "Task 7",
        "Task 8",
        "Task 9",
        "Taks 10",
      ],
    },
    {
      id: "B",
      tasks: [
        "Task 11",
        "Task 12",
        "Task 13",
        "Task 14",
        "Task 15",
        "Task 16",
        "Task 17",
        "Task 18",
        "Task 19",
        "Taks 20",
      ],
    },
    {
      id: "C",
      tasks: [
        "Task 21",
        "Task 22",
        "Task 23",
        "Task 24",
        "Task 25",
        "Task 26",
        "Task 27",
        "Task 28",
        "Task 29",
        "Taks 30",
      ],
    },
    {
      id: "D",
      tasks: [
        "Task 31",
        "Task 32",
        "Task 33",
        "Task 34",
        "Task 35",
        "Task 36",
        "Task 37",
        "Task 38",
        "Task 39",
        "Taks 40",
      ],
    },
  ]);

  return (
    <div className="ml-10 mt-5 w-full flex items-start gap-4">
      <DndContext
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        {boards.map((board) => {
          return (
            <SortableBoard
              className={
                board.tasks.find((task) => task === activeId)
                  ? "bg-neutral-100"
                  : "bg-neutral-50"
              }
              items={board.tasks}
              id={board.id}
              key={board.id}
            >
              {board.tasks.map((task) => {
                return (
                  <SortableItem
                    className={activeId === task ? "opacity-20" : null}
                    id={task}
                    key={task}
                  />
                );
              })}
            </SortableBoard>
          );
        })}
        <DragOverlay>
          {activeId ? <SortableItem id={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function handleDragStart(e) {
    setActiveId(e.active.id);
  }

  function handleDragEnd(e) {
    setActiveId(null);
  }

  function handleDragOver(e) {
    const { active, over } = e;

    if (over.data.current) {
      //find on what board the is dragged from are from --- returns obeject from boards array
      const activeBoard = boards.find((board) =>
        board.tasks.includes(active.id)
      );
      const overBoard = boards.find((board) => board.tasks.includes(over.id));

      //find what items the user is dragging
      const activeItem = activeBoard.tasks.indexOf(active.id);
      const overItem = overBoard.tasks.indexOf(over.id);

      //reorginze the order of the active and over board.tasks arrays
      let newActive = [...activeBoard.tasks];
      if (activeBoard !== overBoard) {
        newActive.splice(activeItem, 1);
      } else {
        newActive = arrayMove(newActive, activeItem, overItem);
      }

      const newOver = [...overBoard.tasks];
      newOver.splice(overItem, 0, active.id);

      //set a new state
      setBoards((boards) => {
        const newTasks = boards.map((board) => {
          if (board.id === activeBoard.id) {
            return { ...board, tasks: newActive };
          } else if (board.id === overBoard.id) {
            return { ...board, tasks: newOver };
          } else return board;
        });
        return newTasks;
      });
    } else {
      //identify the empty board and the active board
      const emptyBoard = boards.find((board) => board.id === over.id);

      const activeBoard = boards.find((board) =>
        board.tasks.includes(active.id)
      );

      const activeItem = activeBoard.tasks.indexOf(active.id);

      //remove the item from the previous array
      let newActive = [...activeBoard.tasks];
      if (newActive.length > 1) {
        newActive.splice(activeItem, 1);
      } else return;

      //add it to the empty array
      const newOver = [...emptyBoard.tasks];
      newOver.push(active.id);

      //set a new state
      setBoards((boards) => {
        const newTasks = boards.map((board) => {
          if (board.id === activeBoard.id) {
            return { ...board, tasks: newActive };
          } else if (board.id === emptyBoard.id) {
            return { ...board, tasks: newOver };
          } else return board;
        });
        return newTasks;
      });
    }
  }
}

export default App;
