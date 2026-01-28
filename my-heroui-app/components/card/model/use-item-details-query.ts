import { itemControllerFindOneItem } from "@/server/generate/generate";
import { ExtendedItemDto } from "@/types/extended";
import { useQuery } from "@tanstack/react-query";

export function useItemDetailsQuery(id: string) {
  return useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const response = await itemControllerFindOneItem(id);
      return response as unknown as ExtendedItemDto;
    },
    enabled: !!id,
  });
}
