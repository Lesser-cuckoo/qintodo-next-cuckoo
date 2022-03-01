import { Auth } from "@supabase/ui";
import type { VFC } from "react";
import { useMemo } from "react";
import { useCallback, useState } from "react";
import { CgTrash } from "react-icons/cg";
import { MdOutlineContentCopy } from "react-icons/md";
import { RadioButton } from "src/component/RadioButton";
import { TaskInput } from "src/component/TaskInput";
import type { TodoType } from "src/lib/SupabaseClient";
import { addTodo, deleteTodo, editIsComplete } from "src/lib/SupabaseClient";
import type { BgColorProps, DayProps, OutLineProps } from "src/type/type";

type Props = {
  day: DayProps;
  item: TodoType;
  updateTodo: () => Promise<void>;
};

export const TaskWrap: VFC<Props> = (props) => {
  const { day, item, updateTodo } = props;
  const { user } = Auth.useUser();
  const [text, setText] = useState<string>(item.task);

  const outlineColor = useMemo<OutLineProps>(
    () =>
      day == "today"
        ? "outline-today"
        : day == "tomorrow"
        ? "outline-tomorrow"
        : "outline-other",
    [day]
  );

  const taskColor = useMemo<BgColorProps>(
    () =>
      day == "today"
        ? "checked:bg-today"
        : day == "tomorrow"
        ? "checked:bg-tomorrow"
        : "checked:bg-other",
    [day]
  );

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
        const isSuccess = await addTodo(uid, text, day, false);
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
      <li className="flex justify-between py-2">
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
        <div className="absolute top-2 right-2 invisible group-hover:visible">
          <div className="flex invisible group-hover:visible gap-2 items-center text-[#C2C6D2] hover:cursor-pointer">
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
