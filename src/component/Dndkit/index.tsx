import type {
  DragEndEvent,
  DragOverEvent,
  // DragStartEvent,
  Over,
} from "@dnd-kit/core";
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
// import { useState } from "react";
import type { TodoType } from "src/lib/SupabaseClient";

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
  // const [activeId, setActiveId] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id: string) => {
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
    return "other";
  };

  //つかんだとき
  // const handleDragStart = (event: DragStartEvent) => {
  //   const { active } = event;
  //   const { id } = active;
  //   setActiveId(id);
  // };

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
  const handleDragEnd = (event: DragEndEvent) => {
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

    const items =
      activeContainer === "today"
        ? todoToday
        : activeContainer === "tomorrow"
        ? todoTomorrow
        : todoOther;

    const activeIndex = items.findIndex((item) => item.id === Number(id));
    const overIndex = items.findIndex((item) => item.id === Number(overId));

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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      // onDragStart={handleDragStart}
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
      {/* <DragOverlay>
          {activeId ? (
            <Item id={activeId} />
          ) : // <div>aaaa</div>
          null}
        </DragOverlay> */}
    </DndContext>
  );
};
