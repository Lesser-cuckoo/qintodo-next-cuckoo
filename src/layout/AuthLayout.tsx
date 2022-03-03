import { Auth } from "@supabase/ui";
import type { CustomLayout } from "next";
import { useEffect, useState } from "react";
import { client } from "src/lib/SupabaseClient";

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

  const { children } = props;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header />
      </header>
      <main className="flex-1 px-4">
        <LayoutErrorBoundary>
          {isMounted && user ? (
            <div>
              <div>{children}</div>
              {/* <div className="flex justify-end my-4 mx-2">
                <Button
                  size="medium"
                  icon={<IconLogOut />}
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </div> */}
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
