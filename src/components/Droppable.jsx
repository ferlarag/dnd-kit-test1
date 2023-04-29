import { useDroppable } from "@dnd-kit/core";
import React from "react";

const Droppable = ({ id, children }) => {
  const { setNodeRef, isOver, over } = useDroppable({ id: id });
  return (
    <div className="border rounded-md" ref={setNodeRef}>
      {children}
    </div>
  );
};

export default Droppable;
