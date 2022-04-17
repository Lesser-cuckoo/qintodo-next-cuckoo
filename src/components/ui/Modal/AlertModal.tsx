/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { Dialog, Transition } from "@headlessui/react";
import type { Dispatch, SetStateAction, VFC } from "react";
import { Fragment } from "react";

type Props = {
  title: string;
  message: string;
  onClick: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const AlertModal: VFC<Props> = (props) => {
  const { isOpen, message, onClick, setIsOpen, title } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="overflow-y-auto fixed inset-0 z-10 bg-gray-500/75 transition-opacity"
        onClose={() => setIsOpen(false)}
      >
        <div className="px-4 min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block overflow-hidden p-6 my-8 w-full max-w-md text-left align-middle bg-white dark:bg-gray-700 rounded-2xl shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-2xl font-bold text-center text-[#070417] dark:text-white"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2">
                <p className="py-4 font-thin text-center text-[#070417] dark:text-white">
                  {message}
                </p>
              </div>

              <div className="mt-4">
                <div className="flex gap-4 justify-center">
                  <button
                    className="z-10 py-3 px-8 text-[#070417] bg-[#F1F5F9] rounded-full border-none hover:opacity-70"
                    onClick={() => setIsOpen(false)}
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={onClick}
                    className="z-10 py-3 px-12 text-white bg-[#EF4444] rounded-full hover:opacity-70"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
