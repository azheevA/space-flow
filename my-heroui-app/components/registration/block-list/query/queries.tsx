import {
  AddBlockItemDto,
  BlockItemDto,
  blockListControllerAddBlockItem,
  blockListControllerGetList,
  BlockListControllerGetListParams,
  blockListControllerRemoveBlockItem,
} from "@/server/generate/generate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const blockListKey = ["block-list"] as unknown[];

export function useBlockListQuery(params?: BlockListControllerGetListParams) {
  return useQuery({
    queryKey: params?.q ? [...blockListKey, params.q] : blockListKey,
    queryFn: () => blockListControllerGetList(params),
    retry: false,
  });
}

export function useAddBlockItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddBlockItemDto) =>
      blockListControllerAddBlockItem(data),

    onSuccess(newItem) {
      queryClient.setQueryData(["block-list"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          items: [...old.items, newItem],
        };
      });
    },
  });
}

export function useRemoveBlockItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => blockListControllerRemoveBlockItem(id),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: blockListKey });
    },
  });
}
