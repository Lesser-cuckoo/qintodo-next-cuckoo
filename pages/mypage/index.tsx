import type { CustomNextPage } from "next";
import { FixedLayout } from "src/layout";
import { MyPage } from "src/pages/mypage";

const AccountPage: CustomNextPage = () => <MyPage />;

AccountPage.getLayout = FixedLayout;

export default AccountPage;
