"use client";
import {
  authControllerSignIn,
  SignInBodyDto,
} from "@/server/generate/generate";
import { ROUTES } from "@/config/utils/constants/routing";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface IForm extends SignInBodyDto {}
export function useSignIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const signInMutation = useMutation({
    mutationFn: (data: SignInBodyDto) => authControllerSignIn(data),
    onSuccess() {
      router.push(ROUTES.HOME);
    },
    onError(error) {
      console.error("Sign up error:", error);
    },
  });
  const errorMessage = signInMutation.error ? "Sign in failed" : undefined;
  return {
    register,
    errorMessage,
    errors,
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isLoading: signInMutation.isPending,
  };
}
