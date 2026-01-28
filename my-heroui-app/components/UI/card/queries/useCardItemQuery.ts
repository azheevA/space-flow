"use client";
import {
  CreateItemDto,
  itemControllerCreateItem,
  itemControllerFindAllItems,
} from "@/server/generate/generate";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const cardItemKey = ["item"];
export function useCreateItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateItemDto) => itemControllerCreateItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardItemKey });
    },
  });
}

export function useCardItemInfiniteQuery(search: string) {
  return useInfiniteQuery({
    queryKey: ["item", "infinite", search],
    queryFn: async ({ pageParam }) =>
      itemControllerFindAllItems({
        page: pageParam,
        limit: 8,
        search: search,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const next = lastPage.nextPage as number | null;
      return next ?? undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.data),
  });
}
