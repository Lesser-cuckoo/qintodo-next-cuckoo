import Image from "next/image";
import Link from "next/link";
import { Avatar } from "src/component/Avatar";

type Props = {
  avatar: string;
};

/**
 * @package
 */
export const Header = (props: Props) => {
  const { avatar } = props;

  return (
    <div className="flex justify-around items-center p-5">
      <Link href="/" passHref>
        <a>
          <Image
            className="cursor-pointer"
            src="/qintodo_logo.svg"
            alt="QinTodo"
            width={150}
            height={50}
          />
        </a>
      </Link>
      <Link href="/mypage" passHref>
        <a>
          <Avatar image={avatar} size="small" isRounded={true} />
        </a>
      </Link>
    </div>
  );
};
