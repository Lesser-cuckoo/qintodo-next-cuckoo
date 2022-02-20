import type { VFC } from "react";
import { useCallback } from "react";

type Style = {
  centerColor: string;
  handleEditIsComplete: any;
  item: any;
};

export const RadioButton: VFC<Style> = (props) => {
  const { centerColor, handleEditIsComplete, item } = props;
  const bgColor: string = item.iscomplete ? centerColor : "bg-white";

  const handleJudgeCompleted = useCallback(() => {
    handleEditIsComplete(item.id, !item.iscomplete);
  }, [item.iscomplete, item.id, handleEditIsComplete]);

  return (
    <>
      <div
        className={`flex justify-center p-[0.15rem] w-5 h-5 rounded-full ring-2 ring-gray-200`}
        onClick={handleJudgeCompleted}
      >
        <button
          className={`outline-none w-full h-full rounded-full ${bgColor}`}
        />
      </div>
    </>
  );
};
