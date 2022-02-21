import { Auth } from "@supabase/ui";
import { useCallback, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { RadioButton2 } from "src/component/RadioButton/radiobutton";
import { addTodo } from "src/lib/SupabaseClient";

export const NewTask = (props: any) => {
  const { user } = Auth.useUser();
  const { day, outlineColor, taskColor, updateTodo } = props;
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const inputstyle = "line-through text-[#C2C6D2]";
  const lineThrough: string = isComplete ? inputstyle : "";
  const [text, setText] = useState<string>("");
  const [isAddTask, setAddTask] = useState<boolean>(false);

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 100) {
        setText(e.target.value);
      } else {
        alert("100文字以内で入力してください");
      }
    },
    []
  );

  const handleAddTask = useCallback(
    async (day: "today" | "tomorrow" | "other", isComplete: boolean) => {
      if (text && user) {
        const uid = user.id;
        const isSuccess = await addTodo(uid, text, day, isComplete);
        if (isSuccess) {
          updateTodo();
          setText("");
        } else {
          alert("タスクの追加に失敗しました");
        }
      }
    },
    [text, user, updateTodo]
  );

  const handleClickButton = () => {
    setAddTask(true);
  };

  return (
    <>
      <div className="flex justify-start items-center py-2 px-[0.14rem] mr-16">
        {isAddTask ? (
          <>
            <RadioButton2
              centerColor={taskColor}
              setIsCompleted={setIsComplete}
              isCompleted={isComplete}
            />
            <input
              type="text"
              value={text}
              onChange={handleChangeText}
              onKeyPress={async (e) => {
                if (e.key === "Enter" && !isSending) {
                  setIsSending(true);
                  await handleAddTask(day, isComplete);
                  setIsSending(false);
                }
              }}
              onBlur={async () => {
                //同じ文言であれば編集しないようにする
                if (!isSending) {
                  setIsSending(true);
                  await handleAddTask(day, isComplete);
                  setIsSending(false);
                }
                setAddTask(false);
              }}
              className={`h-[24px] flex-1 pl-2 placeholder:text-[#C2C6D2] truncate border-0 focus:ring-0 caret-[#F43F5E] ${outlineColor} ${lineThrough} rounded-2xl`}
              autoFocus
              disabled={isComplete}
            />
          </>
        ) : (
          <>
            <div
              className={`flex justify-center  w-[18px] h-[18px] rounded-full ring-2 ring-gray-300 bg-gray-300 mr-1`}
            >
              <HiPlusSm size={18} className="text-[#ffffff]" />
            </div>
            <button
              onClick={handleClickButton}
              className="ml-3 h-5 leading-5 placeholder:text-[#C2C6D2] text-gray-400 border-0 focus:ring-0 caret-[#F43F5E]"
            >
              タスクを追加する
            </button>
          </>
        )}
      </div>
    </>
  );
};
