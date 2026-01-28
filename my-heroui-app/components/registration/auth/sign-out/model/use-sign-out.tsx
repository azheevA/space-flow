import { authControllerSignOut } from "@/server/generate/generate";
import { ROUTES } from "@/config/utils/constants/routing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useResetSession } from "../../../session-entities";

export function useSignOut() {
  const router = useRouter();
  const resetSession = useResetSession();
  const queryClient = useQueryClient();

  const signOutMutation = useMutation({
    mutationFn: authControllerSignOut,
    async onSuccess() {
      resetSession();
      queryClient.setQueryData(["me"], null);
      queryClient.removeQueries({ queryKey: ["me"] });
      router.push(ROUTES.SIGN_IN);
    },
  });

  return {
    isLoading: signOutMutation.isPending,
    signOut: signOutMutation.mutate,
  };
}
