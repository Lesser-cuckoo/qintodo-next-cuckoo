import { Auth } from "@supabase/ui";
import { useCallback } from "react";
import { CgTrash } from "react-icons/cg";
import { MdOutlineContentCopy } from "react-icons/md";
import { RadioButton } from "src/component/RadioButton";
import { TaskInput } from "src/component/taskInput";
import { editIsComplete } from "src/lib/SupabaseClient";

export const TaskWrap = (props: any) => {
  const { user } = Auth.useUser();
  const { item, updateTodo } = props;

  const handleEditIsComplete = useCallback(
    async (itemId: number, itemiscomplete: boolean) => {
      if (user) {
        const isSuccess = await editIsComplete(itemId, itemiscomplete);
        if (isSuccess) {
          updateTodo();
        } else {
          alert("isComplete処理に失敗しました。");
        }
      } else {
      }
    },
    [user, updateTodo]
  );

  return (
    <>
      <li className="group flex justify-start py-2 px-1">
        <RadioButton
          handleEditIsComplete={handleEditIsComplete}
          centerColor="bg-[#F43F5E]"
          item={item}
        />
        <TaskInput item={item} updateTodo={updateTodo} />
        <div className="invisible group-hover:visible">
          <div className="flex invisible group-hover:visible gap-2 items-center mr-6 text-[#C2C6D2] hover:cursor-pointer">
            <MdOutlineContentCopy />
            <CgTrash />
          </div>
        </div>
      </li>
    </>
  );
};
