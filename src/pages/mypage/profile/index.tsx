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
      }
    }
  }, [user, editName, previewIconFile, avatar, fetchProfile]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  return (
    <div className="flex flex-col mx-auto">
      <div className="flex gap-6">
        <span>ホーム</span>
        <HiOutlineChevronRight size={30} className="text-gray-300" />
        <span>プロフィール</span>
      </div>
      <h2 className="text-2xl">プロフィール設定</h2>
      <span className="text-gray-400">アイコン</span>
      <div className="flex">
        <input
          className="hidden"
          type="file"
          accept="image/jpeg"
          ref={iconInputRef}
          onChange={handleChangePreviewIcon}
        />
        <div className="flex justify-center">
          <Avatar
            image={previewIcon}
            size="large"
            isRounded={false}
            onClick={handleClickChangeIcon}
          />
        </div>
        <div>
          <button
            className="block py-2 px-4 text-xl text-white bg-blue-500 rounded-xl"
            onClick={handleSave}
          >
            変更
          </button>
        </div>
      </div>
      <span>名前</span>
      <div>
        <input
          type="text"
          className="p-2 bg-gray-200 rounded-xl"
          placeholder="ユーザー名"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
      </div>
      <button
        className="py-2 px-4 text-xl text-white bg-blue-500 rounded-xl"
        onClick={handleSave}
      >
        保存する
      </button>
      <div className="mt-4"></div>
    </div>
  );
};
