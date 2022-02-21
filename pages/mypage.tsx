import type { CustomNextPage } from "next";
import { FixedLayout } from "src/layout";
import { Mypage } from "src/pages/mypage";

const AboutPage: CustomNextPage = () => <Mypage />;

AboutPage.getLayout = FixedLayout;

export default AboutPage;
