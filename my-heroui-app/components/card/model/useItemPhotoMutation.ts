import { photoControllerUploadPhoto } from "@/server/generate/generate";
import { useMutation } from "@tanstack/react-query";

export function useUploadPhotosMutation() {
  return useMutation({
    mutationFn: async ({
      itemId,
      files,
    }: {
      itemId: number;
      files: FileList;
    }) => {
      return photoControllerUploadPhoto({
        itemId: String(itemId),
        files: Array.from(files) as unknown as string[],
      });
    },
  });
}
