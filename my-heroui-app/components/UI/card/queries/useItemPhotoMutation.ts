// useItemPhotoMutation.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useUploadPhotosMutation() {
  return useMutation({
    mutationFn: async ({
      itemId,
      files,
    }: {
      itemId: number;
      files: FileList;
    }) => {
      const formData = new FormData();
      formData.append("itemId", String(itemId));

      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const response = await axios.post(
        "http://localhost:3000/photos/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      return response.data;
    },
  });
}
