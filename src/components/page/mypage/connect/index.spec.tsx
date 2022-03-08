/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { Profile } from "src/components/page/mypage/profile";

describe("Profile", () => {
  it("renders a heading", () => {
    render(<Profile />);
    const heading = screen.getByRole("heading", { name: /profile/i });
    expect(heading).toBeInTheDocument();
  });
});
