import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

export type ForgotPasswordDto = { email: string };
export type ResetPasswordConfirmDto = {
  email: string;
  code: string;
  newPassword: string;
};

const baseUrl = "http://localhost:3000/api";

export function useForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDto>();

  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordDto) =>
      axios.post(`${baseUrl}/auth/forgot-password`, data),
  });

  return { register, handleSubmit, errors, mutation };
}

export function useResetPasswordConfirm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordConfirmDto>();

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordConfirmDto) =>
      axios.post(`${baseUrl}/auth/reset-password-confirm`, data),
  });

  return { register, handleSubmit, errors, mutation };
}
