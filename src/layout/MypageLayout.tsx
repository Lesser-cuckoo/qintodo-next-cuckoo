import { useRouter } from "next/router";
import { HiOutlineChevronLeft } from "react-icons/hi";

type Props = {
  children: React.ReactNode;
  title: string;
  backbutton: "home" | "back" | "none";
};

export const MyPageLayout = (props: Props) => {
  const { backbutton, children, title } = props;

  const router = useRouter();

  const handleBack = () => {
    window.history.back();
  };
  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className="m-auto mt-6 w-full lg:w-1/3">
        <div className="flex relative m-auto text-center">
          {backbutton === "home" && (
            <button className="absolute" onClick={handleBackHome}>
              <HiOutlineChevronLeft size={30} />
            </button>
          )}
          {backbutton === "back" && (
            <button className="absolute" onClick={handleBack}>
              <HiOutlineChevronLeft size={30} />
            </button>
          )}
          <h1 className="m-auto text-2xl font-bold">{title}</h1>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};
