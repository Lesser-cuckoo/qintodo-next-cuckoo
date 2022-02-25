import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { useState } from "react";
import { TaskWrap } from "src/component/TaskWrap";
import type { TaskType } from "src/lib/Datetime";
import type { TodoType } from "src/lib/SupabaseClient";

// export const Item = (props: Props) => {
//   const { id } = props;
//   const [text, setText] = useState(id);
//   const handleChange = (e: any) => {
//     setText(e.target.value);
//   };
//   return (
//     <>
//       <div className="inline relative top-2">
//         <div
//           className="inline-block overflow-hidden p-1 px-1 h-0 whitespace-nowrap opacity-0"
//           // data-placeholder="文字を入力してください"
//         >
//           {text ? text : "文字を入力してください"}
//         </div>
//         <input
//           type="text"
//           className="absolute top-0 left-0 p-1 w-full h-5 bg-white border-none focus:ring-0"
//           placeholder="文字を入力してください"
//           onChange={handleChange}
//           value={text}
//         />
//       </div>
//     </>
//   );
// };

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
      <div className="absolute top-0 w-full h-10 bg-white" {...listeners}></div>
      <TaskWrap updateTodo={updateTodo} item={todoTask} day={taskType} />
    </div>
  );
};
