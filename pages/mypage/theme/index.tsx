import type { CustomNextPage } from "next";
import { Theme } from "src/components/page/mypage/theme";
import { FixedLayout } from "src/layout";

const ThemePage: CustomNextPage = () => <Theme />;

ThemePage.getLayout = FixedLayout;

export default ThemePage;
