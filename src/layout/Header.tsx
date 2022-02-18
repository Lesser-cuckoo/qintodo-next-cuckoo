import Image from "next/image";
import type { VFC } from "react";

/**
 * @package
 */
export const Header: VFC = () => (
  <div className="flex justify-around items-center p-5">
    <Image src="/qintodo_logo.svg" alt="QinTodo" width={150} height={50} />
    <Image
      src="/avatar.png"
      alt="avatarImage"
      width={30}
      height={30}
      layout="fixed"
    />
  </div>
);
