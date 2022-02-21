import { Auth, Button, IconLogOut } from "@supabase/ui";
import type { CustomLayout } from "next";
import { cloneElement, useCallback, useEffect, useState } from "react";
import { addNewProfile, client, getProfile } from "src/lib/SupabaseClient";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { LayoutErrorBoundary } from "./LayoutErrorBoundary";

type Props = {
  children: React.ReactElement;
};

/**
 * @package
 */
export const AuthLayout: CustomLayout = (props: Props) => {
  const { user } = Auth.useUser();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const { children } = props;

  const fetchProfile = useCallback(async (uid: string) => {
    const profile = await getProfile();
    if (profile) {
      setUsername(profile.username);
      setAvatar(profile.avatar);
    } else {
      const isOk = await addNewProfile(uid);
      if (!isOk) {
        alert("プロフィールの新規登録に失敗しました。");
      }
    }
  }, []);

  const handleLogout = useCallback(() => {
    client.auth.signOut();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header avatar={avatar} />
      </header>
      <main className="flex-1 px-4">
        <LayoutErrorBoundary>
          {isMounted && user ? (
            <div>
              <div>
                {cloneElement(children, {
                  uid: user.id,
                  username: username,
                  avatar: avatar,
                  fetchProfile: fetchProfile,
                })}
              </div>
              <div className="flex justify-end my-4 mx-2">
                <Button
                  size="medium"
                  icon={<IconLogOut />}
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Auth supabaseClient={client} />
            </div>
          )}
        </LayoutErrorBoundary>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
