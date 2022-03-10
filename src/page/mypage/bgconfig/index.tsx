import type { VFC } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";

export const Theme: VFC = () => {
  const [isTheme, setIsTheme] = useState<undefined | "dark" | "light">(
    localStorage.theme
  );

  const handleDark = useCallback(() => {
    document.body.classList.add("dark");
    localStorage.theme = "dark";
    setIsTheme("dark");
  }, []);
  const handleLight = useCallback(() => {
    document.body.classList.remove("dark");
    localStorage.theme = "light";
    setIsTheme("light");
  }, []);

  const handleMedia = useCallback(() => {
    const isLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    localStorage.removeItem("theme");
    if (isLight) {
      document.body.classList.remove("dark");
    } else if (!isLight) {
      document.body.classList.add("dark");
    }
    setIsTheme(undefined);
  }, []);

  return (
    <>
      <div className="flex flex-col m-auto mt-5 w-full text-xl font-bold ">
        <button
          onClick={handleMedia}
          className="flex justify-between p-4 font-bold text-left hover:bg-slate-100 dark:hover:bg-darkhover rounded-sm"
        >
          <p>OSの設定に合わせる</p>
          {isTheme === undefined ? (
            <div className="text-blue-500">
              <HiCheck size={25} />
            </div>
          ) : null}
        </button>
        <button
          onClick={handleLight}
          className="flex justify-between p-4 font-bold text-left hover:bg-slate-100 dark:hover:bg-darkhover rounded-sm"
        >
          ライト
          {isTheme === "light" ? (
            <div className="text-blue-500">
              <HiCheck size={25} />
            </div>
          ) : null}
        </button>
        <button
          onClick={handleDark}
          className="flex justify-between p-4 font-bold text-left hover:bg-slate-100 dark:hover:bg-darkhover rounded-sm"
        >
          ダーク
          {isTheme === "dark" ? (
            <div className="text-blue-500">
              <HiCheck size={25} />
            </div>
          ) : null}
        </button>
      </div>
    </>
  );
};
