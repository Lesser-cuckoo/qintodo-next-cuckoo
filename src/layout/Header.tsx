import { Auth } from "@supabase/ui";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { Avatar } from "src/component/Avatar";
import { addNewProfile, getProfile } from "src/lib/SupabaseClient";

/**
 * @package
 */
export const Header = () => {
  const { user } = Auth.useUser();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");

  const fetchProfile = useCallback(async (uid: string) => {
    const profile = await getProfile();
    if (profile) {
      setAvatar(profile.avatar);
      setName(profile.username);
    } else {
      const isOk = await addNewProfile(uid);
      if (!isOk) {
        alert("プロフィールの新規登録に失敗しました。");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <>
      <div className="flex justify-around items-center p-5 dark:bg-[#353e49]">
        <Link href="/" passHref>
          <a>
            <Image
              className="cursor-pointer"
              src="/qintodo_logo.svg"
              alt="QinTodo"
              width={150}
              height={50}
            />
          </a>
        </Link>
        {/* <Link href="/mypage" passHref> */}
        <div className="relative w-80 text-center">
          <button onClick={handleOpenMenu}>
            <Avatar image={avatar} size="small" isRounded={true} />
          </button>
          {isOpenMenu ? (
            <div className="absolute shadow-xl card bg-base-100">
              <div className="flex flex-col gap-4 p-5 w-80">
                <div className="flex gap-2 items-center ">
                  <button onClick={handleOpenMenu} className="max-w-fit">
                    <Avatar image={avatar} size="small" isRounded={true} />
                  </button>
                  <div className="text-sm text-left">
                    <p>{name}</p>
                    <p>@ahsuidhais</p>
                  </div>
                </div>
                <button className="items-center text-xs font-bold text-red-400 card-actions">
                  <HiOutlineLogout size={19} />
                  <p>ログアウト</p>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
