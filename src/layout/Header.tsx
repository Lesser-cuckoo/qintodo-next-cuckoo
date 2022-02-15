import Image from "next/image";
import type { VFC } from "react";
import { NavLink } from "src/component/Button";

const items = [
  { href: "/", label: "Root" },
  { href: "/about", label: "About" },
];

/**
 * @package
 */
export const Header: VFC = () => (
  <div>
    <Image src="/Qin_todo.png" alt="logo" width={120} height={80} />
    <nav>
      {items.map(({ href, label }) => (
        <NavLink key={href} href={href} activeClassName="text-red-500">
          <a className="inline-block p-4">{label}</a>
        </NavLink>
      ))}
    </nav>
  </div>
);
