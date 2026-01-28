import { AddBlockItemDto } from "@/server/generate/generate";
import { useRemoveBlockItemMutation } from "../query/queries";
import { Button } from "@/shared/ui/button/button";

interface BlockItemProps extends AddBlockItemDto {
  id: number;
}

export default function BlockItem({ id, type, data }: BlockItemProps) {
  const RemoveBlockItemMutation = useRemoveBlockItemMutation();
  const handleRemove = () => {
    RemoveBlockItemMutation.mutate(id);
  };
  return (
    <div className="p-2 mb-2 border-b last:border-0 ">
      <div className="text-xl font-bold text-slate-400 uppercase">{type}</div>
      <div className="flex flex-row justify-between">
        <div className="mt-1 text-xl">{data}</div>
        <Button
          className="text-rose-500 hover:text-rose-600 disabled:opacity-50 ml-5"
          disabled={RemoveBlockItemMutation.isPending}
          onClick={handleRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
