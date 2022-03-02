import { Auth } from "@supabase/ui";
import { useCallback, useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import type { TaskType } from "src/lib/Datetime";
import { addTodo } from "src/lib/SupabaseClient";
// import type { BgColorProps, OutLineProps } from "src/type/type";

type Props = {
  day: TaskType;
  updateTodo: () => Promise<void>;
};

export const NewTask = (props: Props) => {
  const { user } = Auth.useUser();
  const { day, updateTodo } = props;
  const [isSending, setIsSending] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [isAddTask, setAddTask] = useState<boolean>(false);

  // const outlineColor = useMemo<OutLineProps>(
  //   () =>
  //     day == "today"
  //       ? "outline-today"
  //       : day == "tomorrow"
  //       ? "outline-tomorrow"
  //       : "outline-other",
  //   [day]
  // );

  // const taskColor = useMemo<BgColorProps>(
  //   () =>
  //     day == "today"
  //       ? "checked:bg-today"
  //       : day == "tomorrow"
  //       ? "checked:bg-tomorrow"
  //       : "checked:bg-other",
  //   [day]
  // );

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
    async (day: "today" | "tomorrow" | "other") => {
      if (text && user) {
        const uid = user.id;
        const isSuccess = await addTodo(uid, text, day);
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
            <div
              className={`flex justify-center w-[22px] h-[22px] rounded-full  ring-1 ring-gray-200 mr-2`}
            >
              <button
                className={`outline-none w-full h-full rounded-full  dark:bg-[#22272E]`}
              />
            </div>
            <input
              type="text"
              value={text}
              onChange={handleChangeText}
              onKeyPress={async (e) => {
                if (e.key === "Enter" && !isSending) {
                  setIsSending(true);
                  await handleAddTask(day);
                  setIsSending(false);
                }
              }}
              onBlur={async () => {
                //同じ文言であれば編集しないようにする
                if (!isSending) {
                  setIsSending(true);
                  await handleAddTask(day);
                  setIsSending(false);
                }
                setAddTask(false);
              }}
              className="flex-1 pl-2 h-[24px] truncate dark:bg-[#22272E] rounded-2xl border-0 outline-none focus:ring-0 caret-[#F43F5E]"
              autoFocus
            />
          </>
        ) : (
          <>
            <div
              className={`flex justify-center  w-[18px] h-[18px] rounded-full ring-2 ring-gray-300 bg-gray-300 ml-[2px]`}
            >
              <HiPlusSm
                size={18}
                className="text-[#ffffff] dark:text-[#22272E]"
              />
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
