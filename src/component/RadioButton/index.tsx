import type { VFC } from "react";
import { useState } from "react";

type Style = {
  centerColor: string;
};

export const RadioButton: VFC<Style> = (props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { centerColor } = props;
  const bgColor: string = isSelected ? centerColor : "bg-white";

  const handleClicked = () => {
    setIsSelected((prev: boolean) => !prev);
  };

  return (
    <>
      <div
        className={`flex justify-center p-[0.15rem] w-5 h-5 rounded-full ring-2 ring-gray-200 mr-1`}
        onClick={handleClicked}
      >
        <button
          className={`outline-none w-full h-full rounded-full ${bgColor}`}
        />
      </div>
    </>
  );
};
