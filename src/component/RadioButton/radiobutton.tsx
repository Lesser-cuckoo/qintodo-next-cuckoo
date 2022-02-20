import type { VFC } from "react";

type Style = {
  centerColor: string;
  isCompleted: boolean;
  setIsCompleted: any;
};

export const RadioButton2: VFC<Style> = (props) => {
  const { centerColor, isCompleted, setIsCompleted } = props;
  const bgColor: string = isCompleted ? `bg-[${centerColor}]` : "bg-white";

  const handleJudgeCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <>
      <div
        className={`flex justify-center p-[0.15rem] w-5 h-5 rounded-full ring-2 ring-gray-200 mr-1`}
        onClick={handleJudgeCompleted}
      >
        <button
          className={`outline-none w-full h-full rounded-full ${bgColor}`}
        />
      </div>
    </>
  );
};
