import { Auth } from "@supabase/ui";
import type { VFC } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { CgTrash } from "react-icons/cg";
import { HiPlusCircle } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { Dndkit } from "src/component/dndkit";
import type { TodoType } from "src/lib/SupabaseClient";
import { addTodo, getTodo } from "src/lib/SupabaseClient";

export const Index: VFC = () => {
  const { user } = Auth.useUser();
  const [textToday, setTextToday] = useState<string>("");
  const [textTomorrow, setTextTomorrow] = useState<string>("");
  const [textOther, setTextOther] = useState<string>("");
  const [todoToday, setTodoToday] = useState<TodoType[]>([]);
  const [todoTomorrow, setTodoTomorrow] = useState<TodoType[]>([]);
  const [todoOther, setTodoOther] = useState<TodoType[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleChangeTextToday = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTextToday(e.target.value);
    },
    []
  );

  const handleChangeTextTomorrow = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTextTomorrow(e.target.value);
    },
    []
  );

  const handleChangeTextOther = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTextOther(e.target.value);
    },
    []
  );

  const updateTodo = useCallback(async () => {
    let data = await getTodo("today");
    setTodoToday(data);
    data = await getTodo("tomorrow");
    setTodoTomorrow(data);
    data = await getTodo("other");
    setTodoOther(data);
  }, []);

  const handleAddToday = useCallback(async () => {
    if (textToday && user) {
      const uid = user.id;
      const isSuccess = await addTodo(uid, textToday, "today");
      if (isSuccess) {
        updateTodo();
        setTextToday("");
      } else {
        alert("タスクの追加に失敗しました");
      }
    }
  }, [textToday, user, updateTodo]);

  const handleAddTomorrow = useCallback(async () => {
    if (textTomorrow && user) {
      const uid = user.id;
      const isSuccess = await addTodo(uid, textTomorrow, "tomorrow");
      if (isSuccess) {
        updateTodo();
        setTextTomorrow("");
      } else {
        alert("タスクの追加に失敗しました");
      }
    }
  }, [textTomorrow, user, updateTodo]);

  const handleAddOther = useCallback(async () => {
    if (textOther && user) {
      const uid = user.id;
      const isSuccess = await addTodo(uid, textOther, "other");
      if (isSuccess) {
        updateTodo();
        setTextOther("");
      } else {
        alert("タスクの追加に失敗しました");
      }
    }
  }, [textOther, user, updateTodo]);

  useEffect(() => {
    updateTodo();
  }, [updateTodo]);

  const mapTaskElement = [
    {
      id: 1,
      header: "今日する",
      color: "#F43F5E",
      taskArray: todoToday,
      value: textToday,
      handleChangeEvent: handleChangeTextToday,
      addTodoFunction: handleAddToday,
    },
    {
      id: 2,
      header: "明日する",
      color: "#FB923C",
      taskArray: todoTomorrow,
      value: textTomorrow,
      handleChangeEvent: handleChangeTextTomorrow,
      addTodoFunction: handleAddTomorrow,
    },
    {
      id: 3,
      header: "今度する",
      color: "#FBBF24",
      taskArray: todoOther,
      value: textOther,
      handleChangeEvent: handleChangeTextOther,
      addTodoFunction: handleAddOther,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 my-8 mx-12">
      {mapTaskElement.map((task) => (
        <div className="col-span-1" key={task.id}>
          <div className={`text-xl font-bold text-[${task.color}]`}>
            {task.header}
          </div>
          <div className="mt-6">
            <ul>
              {task.taskArray.map((item) => (
                <li
                  className="group flex gap-3 justify-start p-1"
                  key={`item-${item.id}`}
                >
                  <div className="aspect-square h-5 rounded-full border-2 border-[#C2C6D2]"></div>
                  <p className="grow h-5">{item.task}</p>
                  <div className="flex invisible group-hover:visible gap-2 items-center mr-6 text-[#C2C6D2] hover:cursor-pointer">
                    <MdOutlineContentCopy />
                    <CgTrash />
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-start p-1">
              <HiPlusCircle size={20} className="text-[#C2C6D2]" />
              <input
                type="text"
                value={task.value}
                onChange={task.handleChangeEvent}
                onKeyPress={async (e) => {
                  if (e.key === "Enter" && !isSending) {
                    setIsSending(true);
                    await task.addTodoFunction();
                    setIsSending(false);
                  }
                }}
                className="h-5 placeholder:text-[#C2C6D2] border-0 focus:ring-0 caret-[#F43F5E]"
                placeholder="タスクを追加する"
              />
            </div>
          </div>
        </div>
      ))}
      <Dndkit />
    </div>
  );
};
