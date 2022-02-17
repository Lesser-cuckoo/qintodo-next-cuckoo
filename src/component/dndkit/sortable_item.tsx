import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Item = (props: any) => {
  const { id } = props;

  return (
    <div className="flex items-center pl-3 mt-2 w-full h-10 bg-white">{id}</div>
  );
};

type Props = {
  id: any;
};

export const SortableItem = (props: Props) => {
  const { id } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={id} />
    </div>
  );
};
