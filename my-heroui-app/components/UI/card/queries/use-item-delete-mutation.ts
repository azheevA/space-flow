import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itemControllerRemoveItem } from "@/server/generate/generate";
import axios from "axios";

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
    mutationFn: async (photoId: number) => {
      const response = await axios.delete(
        `http://localhost:3000/photos/${photoId}`,
        { withCredentials: true },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item"] });
    },
  });
}
