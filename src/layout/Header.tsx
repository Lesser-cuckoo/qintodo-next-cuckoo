import { Auth } from "@supabase/ui";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Avatar } from "src/component/Avatar";
import { addNewProfile, getProfile } from "src/lib/SupabaseClient";

/**
 * @package
 */
export const Header = () => {
  const { user } = Auth.useUser();

  const [avatar, setAvatar] = useState<string>("");

  const fetchProfile = useCallback(async (uid: string) => {
    const profile = await getProfile();
    if (profile) {
      setAvatar(profile.avatar);
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

  return (
    <div className="flex justify-around items-center p-5">
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
      <Link href="/mypage" passHref>
        <a>
          <Avatar image={avatar} size="small" isRounded={true} />
        </a>
      </Link>
    </div>
  );
};
