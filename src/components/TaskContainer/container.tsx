import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NewTask } from "src/components/TaskContainer/NewTask";
import { SortableItem } from "src/components/TaskContainer/sortableItem";
import type { TaskType } from "src/lib/Datetime";
import type { TodoType } from "src/lib/SupabaseClient";

type Props = {
  taskType: TaskType;
  todo: TodoType[];
  updateTodo: () => Promise<void>;
};

export const Container = (props: Props) => {
  const { taskType, todo, updateTodo } = props;

  const { setNodeRef } = useDroppable({
    id: taskType,
  });

  const todoIds = todo.map((todoTask) => String(todoTask.id));

  return (
    <SortableContext
      id={taskType}
      items={todoIds}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef}>
        {todo.map((todoTask) => (
          <SortableItem
            key={todoTask.id}
            todoTask={todoTask}
            taskType={taskType}
            updateTodo={updateTodo}
          />
        ))}
        <NewTask day={taskType} updateTodo={updateTodo} />
      </div>
    </SortableContext>
  );
};
