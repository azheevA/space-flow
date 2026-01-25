"use client";
import { useQuery } from "@tanstack/react-query";
import { userControllerGetMe, UserDto } from "@/server/generate/generate";

export function useProfile() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const data: UserDto = await userControllerGetMe();
      return data;
    },
  });
}
