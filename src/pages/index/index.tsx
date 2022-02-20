import { Auth } from "@supabase/ui";
import type { VFC } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { CgTrash } from "react-icons/cg";
import { HiPlusCircle } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { Dndkit } from "src/component/dndkit";
import { RadioButton } from "src/component/RadioButton";
import { TaskInput } from "src/component/taskInput";
import type { TodoType } from "src/lib/SupabaseClient";
import {
  addTodo,
  deleteTodo,
  editIsComplete,
  getTodo,
  moveTodo,
} from "src/lib/SupabaseClient";

export const Index: VFC = () => {
  const { user } = Auth.useUser();
  const [textToday, setTextToday] = useState<string>("");
  const [textTomorrow, setTextTomorrow] = useState<string>("");
  const [textOther, setTextOther] = useState<string>("");
  const [todoToday, setTodoToday] = useState<TodoType[]>([]);
  const [todoTomorrow, setTodoTomorrow] = useState<TodoType[]>([]);
  const [todoOther, setTodoOther] = useState<TodoType[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);

  //テスト用
  const [target, setTarget] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);

  const handleChangeTextToday = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 100) {
        setTextToday(e.target.value);
      } else {
        alert("100文字以内で入力してください");
      }
    },
    []
  );

  const handleChangeTextTomorrow = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 100) {
        setTextTomorrow(e.target.value);
      } else {
        alert("100文字以内で入力してください");
      }
    },
    []
  );

  const handleChangeTextOther = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 100) {
        setTextOther(e.target.value);
      } else {
        alert("100文字以内で入力してください");
      }
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
      setState: setTodoToday,
    },
    {
      id: 2,
      header: "明日する",
      color: "#FB923C",
      taskArray: todoTomorrow,
      value: textTomorrow,
      handleChangeEvent: handleChangeTextTomorrow,
      addTodoFunction: handleAddTomorrow,
      setState: setTodoTomorrow,
    },
    {
      id: 3,
      header: "今度する",
      color: "#FBBF24",
      taskArray: todoOther,
      value: textOther,
      handleChangeEvent: handleChangeTextOther,
      addTodoFunction: handleAddOther,
      setState: setTodoOther,
    },
  ];

  return (
    <>
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
                    <RadioButton
                      centerColor="bg-[#F43F5E]"
                      handleEditIsComplete={handleEditIsComplete}
                      item={item}
                    />
                    <TaskInput updateTodo={updateTodo} item={item} />
                    <div className="invisible group-hover:visible">
                      <div className="flex invisible group-hover:visible gap-2 items-center mr-6 text-[#C2C6D2] hover:cursor-pointer">
                        <MdOutlineContentCopy />
                        <CgTrash
                          onClick={async () => await handleDelete(item.id)}
                        />
                      </div>
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
        {/* テスト用 */}
        <div className="col-span-3">
          <div className="flex flex-col w-36">
            <a>並べ替え対象</a>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
            />
            <a>挿入位置</a>
            <input
              type="number"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
            />
            <button
              className="my-2 bg-gray-200"
              onClick={async () => {
                const isOk = await moveTodo(
                  todoToday,
                  todoToday[target].id,
                  position
                );
                if (!isOk) {
                  alert("並び替え失敗");
                }
                await updateTodo();
              }}
            >
              変更
            </button>
          </div>
          <Dndkit />
        </div>
      </div>
    </>
  );
};
