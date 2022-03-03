import type { VFC } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { Dndkit } from "src/component/dndkit";
import { taskElement } from "src/constants/TaskElement";
import type { TodoType } from "src/lib/SupabaseClient";
import { getTodo } from "src/lib/SupabaseClient";

export const Index: VFC = () => {
  const [todoToday, setTodoToday] = useState<TodoType[]>([]);
  const [todoTomorrow, setTodoTomorrow] = useState<TodoType[]>([]);
  const [todoOther, setTodoOther] = useState<TodoType[]>([]);

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
      <div className="grid grid-cols-3 gap-4 mx-12 mt-8">
        {mapTaskElement.map((task) => (
          <div className="col-span-1" key={task.id}>
            <div className={`text-xl font-bold ${task.color}`}>
              {task.header}
            </div>
          </div>
        ))}
      </div>
      <Dndkit
        todoToday={todoToday}
        setTodoToday={setTodoToday}
        todoTomorrow={todoTomorrow}
        setTodoTomorrow={setTodoTomorrow}
        todoOther={todoOther}
        setTodoOther={setTodoOther}
        updateTodo={updateTodo}
      />
      {/* <div>
        <div>
          <div>
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
        <Test todoToday={todoToday} updateTodo={updateTodo} />
      </div> */}
    </>
  );
};
