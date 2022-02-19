import Image from "next/image";
import type { VFC } from "react";
import Avatar from "react-avatar";

/**
 * @package
 */
export const Header: VFC = () => (
  <div className="flex justify-around items-center p-5">
    <Image src="/qintodo_logo.svg" alt="QinTodo" width={150} height={50} />
    <Avatar size="42" name="test" alt="Icon" round src="/avatar.png" />
  </div>
);
