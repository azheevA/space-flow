import { authControllerSignOut } from "@/server/generate/generate";
import { ROUTES } from "@/shared/constants/routing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOutMutation = useMutation({
    mutationFn: authControllerSignOut,
    async onSuccess() {
      queryClient.setQueryData(["session"], null);
      router.push(ROUTES.SIGN_IN);
    },
  });
  return {
    isLoading: signOutMutation.isPending,
    signOut: signOutMutation.mutate,
  };
}
