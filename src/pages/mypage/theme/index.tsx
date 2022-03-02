import type { VFC } from "react";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { MyPageLayout } from "src/layout/MypageLayout";

export const Theme: VFC = () => {
  const [isTheme, setIsTheme] = useState<"media" | "dark" | "light">("media");
  const handleDark = () => {
    document.body.classList.add("dark");
    setIsTheme("dark");
  };
  const handleLight = () => {
    document.body.classList.remove("dark");
    setIsTheme("light");
  };

  const handleMedia = () => {
    setIsTheme("media");
  };
  return (
    <>
      <MyPageLayout title="テーマ" backbutton="back">
        <div className="flex flex-col m-auto mt-5 w-full text-xl font-bold ">
          <button
            onClick={handleMedia}
            className="flex justify-between p-4 font-bold text-left hover:bg-slate-100 dark:hover:bg-[#202425] rounded-sm"
          >
            <p>OSの設定に合わせる</p>
            {isTheme === "media" ? (
              <div className="text-blue-500">
                <HiCheck size={25} />
              </div>
            ) : null}
          </button>
          <button
            onClick={handleLight}
            className="flex justify-between p-4 font-bold text-left hover:bg-slate-100 dark:hover:bg-[#202425] rounded-sm"
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
            className="flex justify-between p-4 font-bold text-left hover:bg-slate-100 dark:hover:bg-[#202425] rounded-sm"
          >
            ダーク
            {isTheme === "dark" ? (
              <div className="text-blue-500">
                <HiCheck size={25} />
              </div>
            ) : null}
          </button>
        </div>
      </MyPageLayout>
    </>
  );
};
