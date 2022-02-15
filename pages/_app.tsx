import "../src/style/index.css";

import { Auth } from "@supabase/ui";
import type { CustomAppPage } from "next/app";
import Head from "next/head";
import { memo } from "react";
import { AuthLayout } from "src/layout";
import { client } from "src/lib/SupabaseClient";

const App: CustomAppPage = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>QinTodo</title>
    </Head>
    <div>
      <Auth.UserContextProvider supabaseClient={client}>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </Auth.UserContextProvider>
    </div>
  </>
);

export default memo(App);
