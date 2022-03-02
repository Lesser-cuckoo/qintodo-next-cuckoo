import type { CustomNextPage } from "next";
import { FixedLayout } from "src/layout";

import { Connect } from "../../../src/pages/mypage/connect/index";

const ConnectPage: CustomNextPage = () => <Connect />;

ConnectPage.getLayout = FixedLayout;

export default ConnectPage;
