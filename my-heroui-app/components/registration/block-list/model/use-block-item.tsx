import { useForm } from "react-hook-form";
import { useAddBlockItemMutation } from "../query/queries";
import {
  AddBlockItemDto,
  AddBlockItemDtoType,
} from "@/server/generate/generate";

export function useBlockItem() {
  const { handleSubmit, register, watch, reset } = useForm<AddBlockItemDto>({
    defaultValues: {
      type: AddBlockItemDtoType.Website,
      data: "",
    },
  });
  const addBlockItemMutation = useAddBlockItemMutation();
  const type = watch("type");

  return {
    handleSubmit: handleSubmit((data) =>
      addBlockItemMutation.mutate(data, {
        onSuccess: () => reset(),
      }),
    ),
    isLoading: addBlockItemMutation.isPending,
    register,
    type,
  };
}
