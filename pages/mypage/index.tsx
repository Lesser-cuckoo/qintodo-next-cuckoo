import type { CustomNextPage } from "next";
import { FixedLayout } from "src/layout";
import { MyPage } from "src/pages/mypage";

const AboutPage: CustomNextPage = () => <MyPage />;

AboutPage.getLayout = FixedLayout;

export default AboutPage;
