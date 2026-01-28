"use client";
import {
  authControllerSignUp,
  SignUpBodyDto,
} from "@/server/generate/generate";
import { ROUTES } from "@/config/utils/constants/routing";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface IForm extends SignUpBodyDto {}
export function useSignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const signUpMutation = useMutation({
    mutationFn: (data: SignUpBodyDto) => authControllerSignUp(data),
    onSuccess() {
      router.push(ROUTES.HOME);
    },
    onError(error) {
      console.error("Sign up error:", error);
    },
  });
  const errorMessage = signUpMutation.error ? "Sign up failed" : undefined;
  return {
    register,
    errorMessage,
    errors,
    handleSubmit: handleSubmit((data) => signUpMutation.mutate(data)),
    isLoading: signUpMutation.isPending,
  };
}
