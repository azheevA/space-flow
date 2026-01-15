import { authControllerSignOut } from "@/server/generate/generate";
import { ROUTES } from "@/shared/constants/routing";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();
  const signOutMutation = useMutation({
    mutationFn: authControllerSignOut,
    onSuccess() {
      router.push(ROUTES.SIGN_IN);
    },
  });
  return {
    isLoading: signOutMutation.isPending,
    signOut: signOutMutation.mutate,
  };
}
