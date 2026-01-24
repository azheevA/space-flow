"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  authControllerChangePassword,
  ChangePasswordDto,
} from "@/server/generate/generate";
import { AxiosError } from "axios";

export function useChangePassword() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordDto>();

  const mutation = useMutation({
    mutationFn: (data: ChangePasswordDto) => authControllerChangePassword(data),
    onSuccess() {
      reset();
    },
    onError(error) {
      const err = error as AxiosError<any>;
      const message = err.response?.data?.message;

      if (message === "Old password is incorrect") {
        setError("oldPassword", {
          type: "server",
          message: "Старый пароль неверен",
        });
        return;
      }

      if (message === "Passwords do not match") {
        setError("confirmNewPassword", {
          type: "server",
          message: "Пароли не совпадают",
        });
        return;
      }

      setError("root", {
        type: "server",
        message: "Не удалось изменить пароль",
      });
    },
  });

  return {
    register,
    handleSubmit: handleSubmit((data) => mutation.mutate(data)),
    isLoading: mutation.isPending,
    errorMessage: errors.root?.message,
    formErrors: errors,
  };
}
