"use client";
import { useQuery } from "@tanstack/react-query";
import { userControllerGetMe, UserDto } from "@/server/generate/generate";
import { useSessionQuery } from "../../entities";

export function useProfile() {
  const { data: session } = useSessionQuery();

  return useQuery<UserDto | null>({
    queryKey: ["me"],
    queryFn: async () => {
      if (!session) return null;
      return await userControllerGetMe();
    },
    enabled: !!session,
    retry: false,
  });
}
