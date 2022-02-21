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
      <div onClick={handleJudgeCompleted} className="mr-2 h-[24px]">
        <input
          type="radio"
          className={`${bgColor} radio border-gray-200 outline-none focus:outline-none checked:outline-none`}
          readOnly
          checked={item.iscomplete}
        ></input>
      </div>
    </>
  );
};
