import type { CustomNextPage } from "next";
import { Profile } from "src/components/page/mypage/profile";
import { FixedLayout } from "src/layout";

const ProfilePage: CustomNextPage = () => <Profile />;

ProfilePage.getLayout = FixedLayout;

export default ProfilePage;
