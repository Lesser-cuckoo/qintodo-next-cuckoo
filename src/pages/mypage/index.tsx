import { useRouter } from "next/router";
import type { VFC } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { MyPageLayout } from "src/layout/MypageLayout";

export const MyPage: VFC = () => {
  const router = useRouter();
  const handleClick = (URL: string) => {
    router.push(`${URL}`);
  };

  const List1 = [
    {
      url: "/mypage/profile",
      title: <p>プロフィール設定</p>,
    },
    {
      url: "/",
      title: <p>アカウント設定</p>,
    },
    {
      url: "/",
      title: (
        <div className="flex justify-between w-full">
          <p>テーマ</p>
          <p>OSの設定に合わせる</p>
        </div>
      ),
    },
  ];
  const List2 = [
    {
      url: "/",
      title: <p>プライバシーポリシー</p>,
    },
    {
      url: "/",
      title: <p>利用規約</p>,
    },
    {
      url: "/",
      title: <p>オープンソースライセンス</p>,
    },
  ];

  type ButtonProps = {
    item: { url: string; title: JSX.Element };
  };

  const Button = (props: ButtonProps) => {
    const { item } = props;
    return (
      <>
        <button
          onClick={() => handleClick(item.url)}
          className="flex justify-between items-center p-2 w-full font-bold hover:bg-slate-100 rounded-sm"
        >
          {item.title}
          <HiOutlineChevronRight size={34} className="pl-2 text-gray-400" />
        </button>
      </>
    );
  };

  return (
    <>
      <MyPageLayout title="アカウント" backbutton="home">
        <div className="m-auto mt-5 w-full text-xl font-bold">
          <div className="p-2 py-2 text-lg text-gray-400">設定</div>
          {List1.map((item, index) => (
            <Button item={item} key={index} />
          ))}
          <div className="p-2 py-2 text-lg text-gray-400">サポート</div>
          {List2.map((item, index) => (
            <Button item={item} key={index} />
          ))}

          <button
            className="p-2 font-bold hover:bg-slate-100 rounded-sm"
            onClick={() => handleClick("/")}
          >
            お問合せ
          </button>
          <div className="flex p-2">
            <p>バージョン</p>
            <p>1.0.0</p>
          </div>
        </div>
      </MyPageLayout>
    </>
  );
};
