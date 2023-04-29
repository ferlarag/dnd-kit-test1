import {
  SortableContext,
  rectSwappingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import Droppable from "./Droppable";

const SortableBoard = ({ id, items, children, className }) => {
  return (
    <Droppable id={id}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="w-[300px]">
          <h1 className="bg-white p-4 border-b rounded-t-md">Column {id}</h1>
          <div
            className={`${className} p-4 rounded-b-md max-h-[700px] overflow-y-auto overflow-x-hidden`}
          >
            {children}
          </div>
        </div>
      </SortableContext>
    </Droppable>
  );
};

export default SortableBoard;
