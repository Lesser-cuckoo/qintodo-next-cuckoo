import { useCallback, useRef, useState } from "react";
import { Avatar } from "src/component/Avatar";
import { updateProfile, uploadAvatar } from "src/lib/SupabaseClient";

type Props = {
  uid: string;
  username: string;
  avatar: string;
  fetchProfile: (uid: string) => Promise<void>;
};

export const Mypage = (props: Props) => {
  const { avatar, fetchProfile, uid, username } = props;

  const [editName, setEditName] = useState<string>(username);
  const [previewIcon, setPreviewIcon] = useState<string>(avatar);
  const [previewIconFile, setPreviewIconFile] = useState<File | null>(null);

  const iconInputRef = useRef<HTMLInputElement | null>(null);

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
    if (editName == "") {
      alert("名前を入力してください。");
      return;
    }
    let isIconChanged = false;
    if (previewIconFile) {
      const isOk = await uploadAvatar(uid, previewIconFile);
      if (!isOk) {
        alert("アイコンのアップロードに失敗しました。");
        return;
      }
      isIconChanged = true;
    }
    const isOkUpdate = await updateProfile(
      uid,
      editName,
      avatar,
      isIconChanged
    );
    if (!isOkUpdate) {
      alert("プロフィールの更新に失敗しました。");
    } else {
      fetchProfile(uid);
    }
  }, [uid, avatar, previewIconFile, editName, fetchProfile]);

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
