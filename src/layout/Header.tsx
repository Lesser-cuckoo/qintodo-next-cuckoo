import { Popover } from "@headlessui/react";
import { Auth, IconSettings } from "@supabase/ui";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { Avatar } from "src/component/Avatar";
import { addNewProfile, getProfile } from "src/lib/SupabaseClient";

/**
 * @package
 */
export const Header = () => {
  const { user } = Auth.useUser();

  const [avatar, setAvatar] = useState<string>("");
  const router = useRouter();

  const fetchProfile = useCallback(
    async (uid: string) => {
      if (user) {
        const profile = await getProfile();
        if (profile) {
          setAvatar(profile.avatar);
        } else {
          const username = user.user_metadata.name
            ? user.user_metadata.name
            : "ユーザー";
          const avatar_url = user.user_metadata.avatar_url
            ? user.user_metadata.avatar_url
            : "";
          const isOk = await addNewProfile(uid, username, avatar_url);
          if (!isOk) {
            alert("プロフィールの新規登録に失敗しました。");
          } else {
            setAvatar(avatar_url);
          }
        }
      }
    },
    [user]
  );

  useEffect(() => {
    if (user) {
      fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  const handleSetting = () => {
    router.push("/mypage");
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
        <Popover className="relative w-80 text-center">
          <Popover.Button>
            <Avatar image={avatar} size="small" isRounded={true} />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 mt-2 bg-white rounded-3xl drop-shadow-xl">
            {/* {router.pathname.includes("/mypage") === false ? ( */}
            <div className="flex flex-col py-3 w-80">
              <Popover.Button>
                <button
                  onClick={handleSetting}
                  className="flex gap-2 items-center py-2 px-3 w-full h-10 text-sm font-bold hover:bg-slate-100"
                >
                  <IconSettings size={19} />
                  <p>設定</p>
                </button>
              </Popover.Button>
              <button className="flex gap-2 items-center py-2 px-3 h-10 text-sm font-bold text-red-400 hover:bg-slate-100">
                <HiOutlineLogout size={20} />
                <p>ログアウト</p>
              </button>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </>
  );
};
