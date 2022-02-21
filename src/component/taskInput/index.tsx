import { Auth } from "@supabase/ui";
import { useCallback, useState } from "react";
import { editTodo } from "src/lib/SupabaseClient";

export const TaskInput = (props: any) => {
  const { item, outlineColor, setText, text, updateTodo } = props;
  const { user } = Auth.useUser();
  // const [text, setText] = useState<string>(item.task);
  const [isSending, setIsSending] = useState<boolean>(false);

  const inputstyle = "line-through text-[#C2C6D2]";
  const lineThrough: string = item.iscomplete ? inputstyle : "";

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText]
  );

  //編集処理を書く
  const handleEditTask = useCallback(async () => {
    if (text && user) {
      const isSuccess = await editTodo(item.id, text);
      if (isSuccess) {
        updateTodo();
        setText(text);
      } else {
        alert("タスクの変更に失敗しました");
      }
    } else {
      setText(item.task);
    }
  }, [text, user, item.id, item.task, updateTodo, setText]);

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={handleChangeText}
        onKeyPress={async (e) => {
          //同じ文言であれば編集しないようにする
          if (e.key === "Enter" && !isSending && item.task !== text) {
            e.currentTarget.blur();
            setIsSending(true);
            await handleEditTask();
            setIsSending(false);
          }
        }}
        onBlur={async () => {
          //同じ文言であれば編集しないようにする
          if (item.task !== text) {
            setIsSending(true);
            await handleEditTask();
            setIsSending(false);
          }
        }}
        className={`h-[1.5rem] flex-1 placeholder:text-[#C2C6D2] truncate border-0 focus:ring-0 pl-2 caret-[#F43F5E] ${lineThrough} ${outlineColor} rounded-2xl`}
        disabled={item.iscomplete}
      />
    </>
  );
};
