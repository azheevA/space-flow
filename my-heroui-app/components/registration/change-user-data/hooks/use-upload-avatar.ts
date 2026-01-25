"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userControllerUploadAvatar } from "@/server/generate/generate";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => userControllerUploadAvatar({ file }),

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
