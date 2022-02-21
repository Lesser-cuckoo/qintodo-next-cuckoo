import type { VFC } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { Dndkit } from "src/component/dndkit";
import { NewTask } from "src/component/NewTask";
import { TaskWrap } from "src/component/TaskWrap";
import { taskElement } from "src/constants/TaskElement";
import type { TodoType } from "src/lib/SupabaseClient";
import { getTodo, moveTodo } from "src/lib/SupabaseClient";

export const Index: VFC = () => {
  const [todoToday, setTodoToday] = useState<TodoType[]>([]);
  const [todoTomorrow, setTodoTomorrow] = useState<TodoType[]>([]);
  const [todoOther, setTodoOther] = useState<TodoType[]>([]);

  //テスト用
  const [target, setTarget] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);

  const updateTodo = useCallback(async () => {
    let data = await getTodo("today");
    setTodoToday(data);
    data = await getTodo("tomorrow");
    setTodoTomorrow(data);
    data = await getTodo("other");
    setTodoOther(data);
  }, []);

  useEffect(() => {
    updateTodo();
  }, [updateTodo]);

  const mapTaskElement = [
    {
      ...taskElement[0],
      taskArray: todoToday,
      setState: setTodoToday,
    },
    {
      ...taskElement[1],
      taskArray: todoTomorrow,
      setState: setTodoTomorrow,
    },
    {
      ...taskElement[2],
      taskArray: todoOther,
      setState: setTodoOther,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-4 my-8 mx-12">
        {mapTaskElement.map((task) => (
          <div className="col-span-1" key={task.id}>
            <div className={`text-xl font-bold ${task.color}`}>
              {task.header}
            </div>
            <div className="mt-6">
              <ul>
                {task.taskArray.map((item) => (
                  <TaskWrap
                    key={`item-${item.id}`}
                    updateTodo={updateTodo}
                    item={item}
                    day={task.day}
                    taskColor={task.bgColor}
                    outlineColor={task.outlineColor}
                  />
                ))}
              </ul>
              <NewTask
                day={task.day}
                updateTodo={updateTodo}
                taskColor={task.bgColor}
                outlineColor={task.outlineColor}
              />
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
