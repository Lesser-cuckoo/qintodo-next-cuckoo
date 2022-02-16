import Image from "next/image";
import type { VFC } from "react";

/**
 * @package
 */
export const Header: VFC = () => (
  <div className="flex justify-around items-center">
    <Image src="/Qin_Todo.png" alt="logo" width={160} height={80} />
    <Image
      src="/avatar.png"
      alt="avatarImage"
      width={30}
      height={30}
      layout="fixed"
    />
  </div>
);
