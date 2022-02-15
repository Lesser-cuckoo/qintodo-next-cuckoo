import { Auth } from "@supabase/ui";
import type { VFC } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
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

  return (
    <div className="grid grid-cols-3 gap-4 my-8 mx-12">
      <div className="col-span-1">
        <div className="text-xl font-bold text-[#F43F5E]">今日する</div>
        <div className="mt-6">
          {todoToday.map((item) => (
            <div
              key={`item-${item.id}`}
              className="flex gap-3 justify-start p-1"
            >
              <div className="aspect-square h-5 rounded-full border-2 border-[#C2C6D2]"></div>
              <div className="h-5">{item.task}</div>
            </div>
          ))}
          <div className="flex justify-start p-1">
            <HiPlusCircle size={20} className="text-[#C2C6D2]" />
            <input
              type="text"
              value={textToday}
              onChange={handleChangeTextToday}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddToday();
                }
              }}
              className="h-5 placeholder:text-[#C2C6D2] border-0 focus:ring-0 caret-[#F43F5E]"
              placeholder="タスクを追加する"
            />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="text-xl font-bold text-[#FB923C]">明日する</div>
        <div className="mt-6">
          {todoTomorrow.map((item) => (
            <div
              key={`item-${item.id}`}
              className="flex gap-3 justify-start p-1"
            >
              <div className="aspect-square h-5 rounded-full border-2 border-[#C2C6D2]"></div>
              <div className="h-5">{item.task}</div>
            </div>
          ))}
          <div className="flex justify-start p-1">
            <HiPlusCircle size={20} className="text-[#C2C6D2]" />
            <input
              type="text"
              value={textTomorrow}
              onChange={handleChangeTextTomorrow}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddTomorrow();
                }
              }}
              className="h-5 placeholder:text-[#C2C6D2] border-0 focus:ring-0 caret-[#F43F5E]"
              placeholder="タスクを追加する"
            />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="text-xl font-bold text-[#FBBF24]">今度する</div>
        <div className="mt-6">
          {todoOther.map((item) => (
            <div
              key={`item-${item.id}`}
              className="flex gap-3 justify-start p-1"
            >
              <div className="aspect-square h-5 rounded-full border-2 border-[#C2C6D2]"></div>
              <div className="h-5">{item.task}</div>
            </div>
          ))}
          <div className="flex justify-start p-1">
            <HiPlusCircle size={20} className="text-[#C2C6D2]" />
            <input
              type="text"
              value={textOther}
              onChange={handleChangeTextOther}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddOther();
                }
              }}
              className="h-5 placeholder:text-[#C2C6D2] border-0 focus:ring-0 caret-[#F43F5E]"
              placeholder="タスクを追加する"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
