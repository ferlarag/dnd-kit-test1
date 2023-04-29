import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const SortableItem = ({ id, className }) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className="py-1"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={`bg-white px-4 py-6 border rounded-md z-10 ${className}`}>
        <h1>{id}</h1>
      </div>
    </div>
  );
};

export default SortableItem;
