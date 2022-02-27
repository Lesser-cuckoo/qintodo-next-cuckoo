import { Auth } from "@supabase/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Avatar } from "src/component/Avatar";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "src/lib/SupabaseClient";

export const Profile = () => {
  const { user } = Auth.useUser();
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [editName, setEditName] = useState<string>(username);
  const [previewIcon, setPreviewIcon] = useState<string>(avatar);
  const [previewIconFile, setPreviewIconFile] = useState<File | null>(null);

  const iconInputRef = useRef<HTMLInputElement | null>(null);

  const fetchProfile = useCallback(async () => {
    const profile = await getProfile();
    if (profile) {
      setUsername(profile.username);
      setEditName(profile.username);
      setAvatar(profile.avatar);
      setPreviewIcon(profile.avatar);
    }
  }, []);

  const handleChangePreviewIcon = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) {
        return;
      }
      setPreviewIconFile(e.target.files[0]);
      setPreviewIcon(URL.createObjectURL(e.target.files[0]));
      e.currentTarget.value = "";
    },
    []
  );

  const handleClickChangeIcon = useCallback(() => {
    if (!iconInputRef || !iconInputRef.current) {
      return;
    }
    iconInputRef.current.click();
  }, []);

  const handleSave = useCallback(async () => {
    if (user) {
      if (editName == "") {
        alert("名前を入力してください。");
        return;
      }
      let isIconChanged = false;
      if (previewIconFile) {
        const isOk = await uploadAvatar(user.id, previewIconFile);
        if (!isOk) {
          alert("アイコンのアップロードに失敗しました。");
          return;
        }
        isIconChanged = true;
      }
      const isOkUpdate = await updateProfile(
        user.id,
        editName,
        avatar,
        isIconChanged
      );
      if (!isOkUpdate) {
        alert("プロフィールの更新に失敗しました。");
      } else {
        fetchProfile();
        alert("プロフィールを更新しました。");
      }
    }
  }, [user, editName, previewIconFile, avatar, fetchProfile]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  return (
    <div className="container flex flex-col items-center">
      <div className="w-[500px]">
        <div className="flex gap-6 my-4 text-sm font-bold">
          <span className="hover:bg-[#F1F5F9] hover:cursor-pointer">
            ホーム
          </span>
          <HiOutlineChevronRight size={20} className="text-[#C2C6D2]" />
          <span className="hover:bg-[#F1F5F9] hover:cursor-pointer">
            プロフィール
          </span>
        </div>
        <h2 className="mb-6 text-3xl font-black">プロフィール</h2>
        <span className="text-sm text-[#C2C6D2]">アイコン</span>
        <div className="flex items-center mt-2 mb-4">
          <Avatar image={previewIcon} size="large" isRounded={false} />
          <div className="ml-4">
            <input
              className="hidden"
              type="file"
              accept="image/jpeg"
              ref={iconInputRef}
              onChange={handleChangePreviewIcon}
            />
            <button
              className="block py-3 px-4 text-xs font-bold text-[#070417] bg-[#F1F5F9] rounded-2xl hover:opacity-70"
              onClick={handleClickChangeIcon}
            >
              変更する
            </button>
          </div>
        </div>
        <span className="text-xs text-[#C2C6D2]">名前</span>
        <div className="grid gap-8">
          <div className="mt-2 max-w-md">
            <input
              type="text"
              size={66}
              className="py-3 px-4 text-sm font-thin text-[#070417] bg-[#F1F5F9] rounded-3xl"
              placeholder="ユーザー名"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <button
            className="py-4 text-sm font-bold text-white bg-[#3B82F6] rounded-3xl hover:opacity-70"
            onClick={handleSave}
          >
            保存する
          </button>
        </div>
      </div>
    </div>
  );
};
