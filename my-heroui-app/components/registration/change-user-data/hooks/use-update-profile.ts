"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userControllerUpdateProfile } from "@/server/generate/generate";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

type Form = {
  name: string;
};

export function useUpdateProfile(initialName?: string) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { name: initialName },
  });

  const mutation = useMutation({
    mutationFn: async (data: Form) => {
      const formData = new FormData();
      formData.append("name", data.name);

      return userControllerUpdateProfile(formData as any);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError(error) {
      const err = error as AxiosError<any>;
      setError("name", {
        type: "server",
        message: err.response?.data?.message || "Не удалось обновить профиль",
      });
    },
  });

  return {
    register,
    handleSubmit: handleSubmit((data) => mutation.mutate(data)),
    isLoading: mutation.isPending,
    errors,
  };
}
