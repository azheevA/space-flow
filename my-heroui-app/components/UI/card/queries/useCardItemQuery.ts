"use client";
import {
  CreateItemDto,
  itemControllerCreateItem,
  itemControllerFindAllItems,
} from "@/server/generate/generate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const cardItemKey = ["item"];

export function useCardItemQuery() {
  return useQuery({
    queryKey: cardItemKey,
    queryFn: itemControllerFindAllItems,
  });
}
export function useCreateItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateItemDto) => itemControllerCreateItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardItemKey });
    },
  });
}
