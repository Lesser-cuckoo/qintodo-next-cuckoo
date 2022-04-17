import { Auth } from "@supabase/ui";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from "react";
import type { TodoType } from "src/lib/SupabaseClient";
import { editTodo } from "src/lib/SupabaseClient";
import { useToast } from "src/lib/ToastHooks";
import type { CaretColorProps } from "src/type/type";

type Props = {
  item: TodoType;
  updateTodo: () => void;
  setText: Dispatch<SetStateAction<string>>;
  text: string;
  caretColor: CaretColorProps;
};

export const TaskInput = (props: Props) => {
  const { caretColor, item, setText, text, updateTodo } = props;
  const { user } = Auth.useUser();
  const [isSending, setIsSending] = useState<boolean>(false);
  const { errorToast } = useToast();

  const inputStyle = "line-through text-[#C2C6D2] dark:text-gray-400";
  const lineThrough: string = item.iscomplete ? inputStyle : "";

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 100) {
        setText(e.target.value);
      } else {
        alert("100文字以内で入力してください");
      }
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
        errorToast("タスクの変更に失敗しました");
      }
    } else {
      setText(item.task);
    }
  }, [text, user, item.id, item.task, updateTodo, setText, errorToast]);

  return (
    <>
      <div className="absolute top-2 left-8">
        <div className=" overflow-hidden p-1 px-1 h-0 whitespace-nowrap opacity-0">
          {text ? text : "文字を入力してください"}
        </div>
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
          className={`absolute top-0 left-0 p-1 h-5 border-0 dark:bg-darkbg focus:ring-0 focus:outline-none ${lineThrough} truncate ${caretColor}  rounded-2xl bg-white/0`}
          disabled={item.iscomplete}
        />
      </div>
    </>
  );
};
