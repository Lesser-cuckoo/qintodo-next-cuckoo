import { Auth } from "@supabase/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "src/component/Avatar";
import {
  getAvatarUrl,
  getProfile,
  updateProfile,
  uploadAvatar,
} from "src/lib/SupabaseClient";

export const Mypage = () => {
  const { user } = Auth.useUser();

  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [editName, setEditName] = useState<string>(username);
  const [previewIcon, setPreviewIcon] = useState<string>(avatar);
  const [previewIconFile, setPreviewIconFile] = useState<File | null>(null);

  const iconInputRef = useRef<HTMLInputElement | null>(null);

  const fetchProfile = useCallback(async () => {
    if (user) {
      const profile = await getProfile();
      if (profile) {
        setUsername(profile.username);
        setEditName(profile.username);
        if (profile.hasavatar) {
          const url = await getAvatarUrl(user.id);
          setAvatar(url);
          setPreviewIcon(url);
        }
      }
    }
  }, [user]);

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
      const profile = await getProfile();
      let hasIcon = profile ? profile.hasavatar : false;
      if (previewIconFile) {
        const isOk = await uploadAvatar(user.id, previewIconFile);
        if (!isOk) {
          alert("アイコンのアップロードに失敗しました。");
          return;
        }
        hasIcon = true;
      }
      const isOkUpdate = await updateProfile(user.id, editName, hasIcon);
      if (!isOkUpdate) {
        alert("プロフィールの更新に失敗しました。");
      } else {
        fetchProfile();
      }
    }
  }, [user, editName, previewIconFile, fetchProfile]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  return (
    <div className="text-center">
      <div className="text-2xl">プロフィール設定</div>
      <div className="my-4">
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
      </div>
      <div>
        <input
          type="text"
          className="border border-black"
          placeholder="ユーザー名"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <button
          className="py-2 px-4 text-2xl bg-orange-200"
          onClick={handleSave}
        >
          変更
        </button>
      </div>
    </div>
  );
};
