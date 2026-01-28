import { authControllerGetSessionInfo } from "@/server/generate/generate";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const sessionKey = ["session"];
export function useSessionQuery() {
  return useQuery({
    queryKey: sessionKey,
    queryFn: authControllerGetSessionInfo,
    retry: false,
    staleTime: 0 * 60 * 1000,
  });
}

export function useResetSession() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.setQueryData(sessionKey, null);
    queryClient.invalidateQueries({ queryKey: ["me"] });
  };
}
