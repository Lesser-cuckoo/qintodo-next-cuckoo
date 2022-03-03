import type { VFC } from "react";

type Props = {
  title: string;
  message: string;
  onClick: () => void;
  id: string;
};

export const AlertModal: VFC<Props> = (props) => {
  const { id, message, onClick, title } = props;
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="mx-auto max-w-md modal-box">
          <h3 className="text-2xl font-bold text-center">{title}</h3>
          <p className="py-4 font-thin text-center">{message}</p>
          <div className="flex gap-4 justify-center modal-action">
            {/* <button> */}
            <label
              htmlFor={id}
              className="py-3 px-8 text-[#070417] bg-[#F1F5F9] rounded-full border-none hover:opacity-70 btn btn-outline"
            >
              キャンセル
            </label>
            {/* </button> */}
            {/* <button
              onClick={onClick}
              className="block py-3 px-14 text-white bg-[#EF4444] rounded-full hover:opacity-70"
            > */}
            <label
              htmlFor={id}
              onClick={onClick}
              className=" py-3 px-12 text-white bg-[#EF4444] rounded-full hover:opacity-70 btn btn-outline"
            >
              OK
            </label>

            {/* </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
