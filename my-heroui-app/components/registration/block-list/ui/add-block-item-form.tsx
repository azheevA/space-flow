import { Button } from "@/shared/ui/button/button";
import { useBlockItem } from "../model/use-block-item";
import { AddBlockItemDtoType } from "@/server/generate/generate";

const typeOptions = [
  { label: "Website", value: AddBlockItemDtoType.Website },
  { label: "KeyWord", value: AddBlockItemDtoType.KeyWord },
];
export default function AddBlockItemForm() {
  const { handleSubmit, isLoading, register, type } = useBlockItem();
  return (
    <form
      className="flex gap-2 border border-white rounded-xl p-4"
      onSubmit={handleSubmit}
    >
      <select
        {...register("type")}
        className="grow min-w-[200px] border border-white rounded-xl p-2"
      >
        {typeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder={
          type === AddBlockItemDtoType.KeyWord
            ? "Enter Key Word..."
            : "Enter Website"
        }
        {...register("data")}
        className="grow border border-white rounded-xl  p-2"
      />
      <Button variant="secondary" disabled={isLoading}>
        Add Block-Item
      </Button>
    </form>
  );
}
