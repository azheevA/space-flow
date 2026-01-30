import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  itemControllerRemoveItem,
  photoControllerRemovePhoto,
} from "@/server/generate/generate";

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => itemControllerRemoveItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item"] });
    },
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photoId: number) =>
      photoControllerRemovePhoto(String(photoId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item"] });
    },
  });
}
