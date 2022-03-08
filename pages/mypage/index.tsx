import type { CustomNextPage } from "next";
import { MyPage } from "src/components/page/mypage";
import { FixedLayout } from "src/layout";

const AboutPage: CustomNextPage = () => <MyPage />;

AboutPage.getLayout = FixedLayout;

export default AboutPage;
