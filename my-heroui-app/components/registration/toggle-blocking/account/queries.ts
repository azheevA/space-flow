import {
  accountControllerGetAccount,
  accountControllerPatchAccount,
  PatchAccountDto,
} from "@/server/generate/generate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const accountKey = ["account"];
export function useAccountQuery() {
  return useQuery({
    queryKey: accountKey,
    queryFn: accountControllerGetAccount,
  });
}
export function useUpdateAccountMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PatchAccountDto) => accountControllerPatchAccount(data),
    onSuccess(data) {
      queryClient.setQueryData(accountKey, data);
    },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: accountKey });
    },
  });
}
