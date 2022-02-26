import { Auth } from "@supabase/ui";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from "react";
import type { TodoType } from "src/lib/SupabaseClient";
import { editTodo } from "src/lib/SupabaseClient";
import type { OutLineProps } from "src/type/type";

type Props = {
  item: TodoType;
  updateTodo: () => void;
  outlineColor: OutLineProps;
  setText: Dispatch<SetStateAction<string>>;
  text: string;
};

export const TaskInput = (props: Props) => {
  const { item, outlineColor, setText, text, updateTodo } = props;
  const { user } = Auth.useUser();
  // const [text, setText] = useState<string>(item.task);
  const [isSending, setIsSending] = useState<boolean>(false);

  const inputstyle = "line-through text-[#C2C6D2]";
  const lineThrough: string = item.iscomplete ? inputstyle : "";

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
        alert("タスクの変更に失敗しました");
      }
    } else {
      setText(item.task);
    }
  }, [text, user, item.id, item.task, updateTodo, setText]);

  return (
    <>
      <div className="absolute top-2 left-8">
        <div
          className="inline-block overflow-hidden p-1 px-1 h-0 whitespace-nowrap opacity-0"
          // data-placeholder="文字を入力してください"
        >
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
          className={`absolute top-0 left-0 p-1 w-full h-5 border-0 focus:ring-0 ${lineThrough} truncate caret-[#F43F5E] ${outlineColor} rounded-2xl bg-white/0`}
          disabled={item.iscomplete}
        />
        {/* <input
          type="text"
          className="absolute top-0 left-0 p-1 w-full h-5 bg-white border-none focus:ring-0"
          placeholder="文字を入力してください"
          onChange={handleChange}
          value={text}
        /> */}
      </div>
    </>
  );
};
