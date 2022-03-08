import type { VFC } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { Dndkit } from "src/component/Dndkit";
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
      <Dndkit
        todoToday={todoToday}
        setTodoToday={setTodoToday}
        todoTomorrow={todoTomorrow}
        setTodoTomorrow={setTodoTomorrow}
        todoOther={todoOther}
        setTodoOther={setTodoOther}
        updateTodo={updateTodo}
        mapTaskElement={mapTaskElement}
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
