import { Auth } from "@supabase/ui";
import type { VFC } from "react";
import { useCallback, useState } from "react";
import { CgTrash } from "react-icons/cg";
import { MdOutlineContentCopy } from "react-icons/md";
import { RadioButton } from "src/component/RadioButton";
import { TaskInput } from "src/component/taskInput";
import type { TodoType } from "src/lib/SupabaseClient";
import { addTodo, deleteTodo, editIsComplete } from "src/lib/SupabaseClient";
import type { DayProps, OutLineProps } from "src/type/type";

type Props = {
  day: DayProps;
  outlineColor: OutLineProps;
  item: TodoType;
  taskColor: string;
  updateTodo: () => Promise<void>;
};

export const TaskWrap: VFC<Props> = (props) => {
  const { day, item, outlineColor, taskColor, updateTodo } = props;
  const { user } = Auth.useUser();
  const [text, setText] = useState<string>(item.task);

  const handleEditIsComplete = useCallback(
    async (itemId: number, itemiscomplete: boolean) => {
      if (user) {
        const isSuccess = await editIsComplete(itemId, itemiscomplete);
        if (isSuccess) {
          updateTodo();
        } else {
          alert("isComplete処理に失敗しました。");
        }
      } else {
      }
    },
    [user, updateTodo]
  );

  const handleDelete = async (id: number) => {
    if (user) {
      const isSuccess = await deleteTodo(id);
      if (isSuccess) {
        updateTodo();
      } else {
        alert("タスクの削除に失敗しました");
      }
    }
  };

  const handleCopyTask = useCallback(
    async (day) => {
      if (text && user) {
        const uid = user.id;
        const isSuccess = await addTodo(uid, text, day);
        if (isSuccess) {
          updateTodo();
        } else {
          alert("タスクの追加に失敗しました");
        }
      }
    },
    [text, user, updateTodo]
  );

  return (
    <>
      <li className="group flex justify-start py-2 ">
        <RadioButton
          handleEditIsComplete={handleEditIsComplete}
          centerColor={taskColor}
          item={item}
        />
        <TaskInput
          item={item}
          text={text}
          setText={setText}
          updateTodo={updateTodo}
          outlineColor={outlineColor}
        />
        <div className="invisible group-hover:visible">
          <div className="flex invisible group-hover:visible gap-2 items-center mr-6 text-[#C2C6D2] dark:text-[#22272E] hover:cursor-pointer">
            <MdOutlineContentCopy
              onClick={async () => await handleCopyTask(day)}
            />
            <CgTrash onClick={async () => await handleDelete(item.id)} />
          </div>
        </div>
      </li>
    </>
  );
};
