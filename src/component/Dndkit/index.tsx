import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  Over,
} from "@dnd-kit/core";
// import { DragOverlay } from "@dnd-kit/core";
import {
  closestCorners,
  DndContext,
  // DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import type { TaskType } from "src/lib/Datetime";
import type { TodoType } from "src/lib/SupabaseClient";
import { getTodo } from "src/lib/SupabaseClient";
import { moveTodo } from "src/lib/SupabaseClient";

import { Container } from "./container";

type Props = {
  todoToday: TodoType[];
  setTodoToday: Dispatch<SetStateAction<TodoType[]>>;
  todoTomorrow: TodoType[];
  setTodoTomorrow: Dispatch<SetStateAction<TodoType[]>>;
  todoOther: TodoType[];
  setTodoOther: Dispatch<SetStateAction<TodoType[]>>;
  updateTodo: () => Promise<void>;
};

export const Dndkit = (props: Props) => {
  const {
    setTodoOther,
    setTodoToday,
    setTodoTomorrow,
    todoOther,
    todoToday,
    todoTomorrow,
    updateTodo,
  } = props;
  const [activeId, setActiveId] = useState<number>(-1);
  const [sourceContainer, setSourceContainer] = useState<TaskType | null>(null);
  const [targetContainer, setTargetContainer] = useState<TaskType | null>(null);
  const [targetIndex, setTargetIndex] = useState<number>(-1);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id: string): TaskType => {
    let filtered = todoToday.filter((todo) =>
      todo.id == Number(id) ? true : false
    );
    if (filtered.length == 1) {
      return "today";
    }
    filtered = todoTomorrow.filter((todo) =>
      todo.id == Number(id) ? true : false
    );
    if (filtered.length == 1) {
      return "tomorrow";
    }
    filtered = todoOther.filter((todo) =>
      todo.id == Number(id) ? true : false
    );
    if (filtered.length == 1) {
      return "other";
    }
    if (id == "today") {
      return "today";
    }
    if (id == "tomorrow") {
      return "tomorrow";
    }
    return "other";
  };

  // つかんだとき;
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;

    const activeContainer = findContainer(id);
    setSourceContainer(activeContainer);
  };

  //動かして他の要素の上に移動した時
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as Over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    const activeItems =
      activeContainer === "today"
        ? todoToday
        : activeContainer === "tomorrow"
        ? todoTomorrow
        : todoOther;
    const overItems =
      overContainer === "today"
        ? todoToday
        : overContainer === "tomorrow"
        ? todoTomorrow
        : todoOther;

    const activeIndex = activeItems.findIndex((item) => item.id === Number(id));
    const overIndex = overItems.findIndex((item) => item.id === Number(overId));

    const newIndex = overIndex + 1;
    let newItem: TodoType;

    if (activeContainer === "today") {
      newItem = todoToday[activeIndex];
      setTodoToday([...todoToday.filter((item) => item.id !== Number(id))]);
    } else if (activeContainer === "tomorrow") {
      newItem = todoTomorrow[activeIndex];
      setTodoTomorrow([
        ...todoTomorrow.filter((item) => item.id !== Number(id)),
      ]);
    } else {
      newItem = todoOther[activeIndex];
      setTodoOther([...todoOther.filter((item) => item.id !== Number(id))]);
    }

    if (overContainer === "today") {
      setTodoToday([
        ...todoToday.slice(0, newIndex),
        newItem,
        ...todoToday.slice(newIndex, todoToday.length),
      ]);
    } else if (overContainer === "tomorrow") {
      setTodoTomorrow([
        ...todoTomorrow.slice(0, newIndex),
        newItem,
        ...todoTomorrow.slice(newIndex, todoTomorrow.length),
      ]);
    } else {
      setTodoOther([
        ...todoOther.slice(0, newIndex),
        newItem,
        ...todoOther.slice(newIndex, todoOther.length),
      ]);
    }
  };

  //要素を離したとき
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as Over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    setActiveId(Number(id));
    setTargetContainer(activeContainer);

    const items =
      activeContainer === "today"
        ? todoToday
        : activeContainer === "tomorrow"
        ? todoTomorrow
        : todoOther;

    const activeIndex = items.findIndex((item) => item.id === Number(id));
    const overIndex = items.findIndex((item) => item.id === Number(overId));

    if (activeContainer === sourceContainer) {
      setTargetIndex(activeIndex < overIndex ? overIndex + 1 : overIndex);
    } else {
      setTargetIndex(overIndex);
    }

    if (activeIndex !== overIndex) {
      if (activeContainer === "today") {
        setTodoToday(arrayMove(todoToday, activeIndex, overIndex));
      } else if (activeContainer === "tomorrow") {
        setTodoTomorrow(arrayMove(todoTomorrow, activeIndex, overIndex));
      } else {
        setTodoOther(arrayMove(todoOther, activeIndex, overIndex));
      }
    }
  };

  const handleMove = useCallback(async () => {
    if (targetContainer) {
      const todo = await getTodo(targetContainer);
      const isOk = await moveTodo(todo, activeId, targetIndex, targetContainer);
      if (!isOk) {
        alert("更新に失敗しました。");
      } else {
        updateTodo();
        setActiveId(-1);
        setTargetContainer(null);
        setTargetIndex(-1);
      }
    }
  }, [activeId, targetContainer, targetIndex, updateTodo]);

  useEffect(() => {
    if (activeId != -1 && targetContainer && targetIndex != -1) {
      handleMove();
    }
  }, [activeId, targetContainer, targetIndex, handleMove]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-4 mx-12 mt-8">
        <Container taskType="today" todo={todoToday} updateTodo={updateTodo} />
        <Container
          taskType="tomorrow"
          todo={todoTomorrow}
          updateTodo={updateTodo}
        />
        <Container taskType="other" todo={todoOther} updateTodo={updateTodo} />
      </div>
      {/* <DragOverlay>{activeId ? <TaskWrap /> : null}</DragOverlay> */}
    </DndContext>
  );
};
