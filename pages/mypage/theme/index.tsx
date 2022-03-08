import type { CustomNextPage } from "next";
import { FixedLayout } from "src/layout";
import { Theme } from "src/pages/mypage/theme";

const ThemePage: CustomNextPage = () => <Theme />;

ThemePage.getLayout = FixedLayout;

export default ThemePage;
