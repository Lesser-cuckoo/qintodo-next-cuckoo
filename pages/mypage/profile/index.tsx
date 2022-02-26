import type { CustomNextPage } from "next";
import { FixedLayout } from "src/layout";
import { Profile } from "src/pages/mypage/profile";

const ProfilePage: CustomNextPage = () => <Profile />;

ProfilePage.getLayout = FixedLayout;

export default ProfilePage;
