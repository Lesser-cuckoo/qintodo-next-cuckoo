import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { useState } from "react";
import { TaskWrap } from "src/components/TaskContainers/TaskWrap";
import type { TaskType } from "src/lib/Datetime";
import type { TodoType } from "src/lib/SupabaseClient";

type Props = {
  taskType: TaskType;
  todoTask: TodoType;
  updateTodo: () => Promise<void>;
};

export const SortableItem = (props: Props) => {
  const { taskType, todoTask, updateTodo } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: String(todoTask.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="group relative w-full h-10"
    >
      <div className="absolute top-0 w-full h-10" {...listeners}></div>
      <TaskWrap updateTodo={updateTodo} item={todoTask} day={taskType} />
    </div>
  );
};
