/* eslint-disable tailwindcss/no-custom-classname */
import { useRouter } from "next/router";
import type { VFC } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { IconContext } from "react-icons";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineChevronRight } from "react-icons/hi";
import { AlertModal } from "src/component/Modal/AlertModal";
import { client } from "src/lib/SupabaseClient";

export const Connect: VFC = () => {
  const router = useRouter();
  const handleClick = (URL: string) => {
    router.push(`${URL}`);
  };

  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);

  const handleLogout = useCallback(() => {
    client.auth.signOut();
    router.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModalActions = [
    {
      isOpen: isOpenLogout,
      setIsOpen: setIsOpenLogout,
      title: "ログアウト",
      message: "ログアウトしてよろしいですか？",
      onClick: handleLogout,
      buttonChildren: "ログアウト",
    },
    {
      isOpen: isOpenAccount,
      setIsOpen: setIsOpenAccount,
      title: "アカウントの削除",
      message: "アカウント完全に削除してよろしいですか？",
      onClick: () => alert("アカウントを削除しました"),
      buttonChildren: "アカウントの削除",
    },
  ];

  const ButtonList = [
    {
      url: "/mypage/profile",
      icon: <FcGoogle />,
      title: <>Google</>,
    },
    {
      url: "/mypage/connect",
      icon: <FaApple />,
      title: <>Apple</>,
    },
  ];

  type ButtonProps = {
    item: { url: string; title: JSX.Element; icon?: JSX.Element };
  };

  const Button = (props: ButtonProps) => {
    const { item } = props;
    return (
      <>
        <div className="flex justify-between items-center px-2 mb-5 w-full h-10 font-bold rounded-sm">
          <div className="flex items-center">
            <IconContext.Provider value={{ size: "1.5em", className: "mr-5" }}>
              {item.icon}
            </IconContext.Provider>
            <p className="text-base">{item.title}</p>
          </div>
          <button className="px-7 text-base bg-gray-100 hover:bg-blue-500 rounded-full border-none btn btn-outline">
            解除する
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="m-auto mt-6 w-1/3">
        <div className="m-auto mt-5 w-full text-xl font-bold">
          <div className="flex items-center p-2 py-2 mb-1 h-10 text-base">
            <p
              className=" hover:underline cursor-pointer"
              onClick={() => handleClick("/")}
            >
              ホーム
            </p>
            <HiOutlineChevronRight size={22} className=" mx-5 text-gray-400" />
            <p
              className=" hover:underline cursor-pointer"
              onClick={() => handleClick("/mypage/connect")}
            >
              アカウントの連携
            </p>
          </div>
          <div className="p-2 py-2 mb-14 text-4xl">アカウント連携</div>
          {ButtonList.map((item, index) => (
            <Button item={item} key={index} />
          ))}
          <div className="p-2 py-2 mt-14 mb-2 text-lg text-gray-400">
            アカウント操作
          </div>
          {handleModalActions.map((item) => (
            <div key={item.title}>
              <button
                className="p-2 mb-3 font-bold text-red-500 hover:bg-slate-100 rounded-sm modal-button"
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => item.setIsOpen(true)}
              >
                {item.buttonChildren}
              </button>
              <AlertModal
                isOpen={item.isOpen}
                setIsOpen={item.setIsOpen}
                message={item.message}
                title={item.title}
                // eslint-disable-next-line react/jsx-handler-names
                onClick={item.onClick}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
