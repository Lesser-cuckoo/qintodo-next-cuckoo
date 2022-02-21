import type { VFC } from "react";
import { useState } from "react";
import { Dndkit } from "src/component/dndkit";
import type { TodoType } from "src/lib/SupabaseClient";
import { moveTodo } from "src/lib/SupabaseClient";

type Props = {
  todoToday: TodoType[];
  updateTodo: () => Promise<void>;
};

export const Test: VFC<Props> = (props) => {
  const { todoToday, updateTodo } = props;

  //テスト用
  const [target, setTarget] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);

  return (
    <>
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
    </>
  );
};
