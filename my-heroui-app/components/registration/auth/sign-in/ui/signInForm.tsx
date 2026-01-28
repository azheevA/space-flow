"use client";
import { uniqueText } from "@/config/utils/primitives";
import { Button } from "@/shared/ui/button/button";
import clsx from "clsx";

import { useSignIn } from "../model/use-sign-in";
import { AuthInput } from "@/shared/ui/input/auth-input";
import { KeyRound, Mail } from "lucide-react";
import { PasswordInput } from "@/shared/ui/input/input-password";
import { usePasswordToggle } from "../../change-password/utils/use-password-toggle";

export function SignInForm() {
  const { register, errorMessage, errors, handleSubmit, isLoading } =
    useSignIn();
  const togglePassword = usePasswordToggle();
  return (
    <form className="flex flex-col gap-2 p-6 w-full" onSubmit={handleSubmit}>
      <h1 className="text-2xl">
        Введите{" "}
        <span className={clsx(uniqueText({ color: "violet", size: "sm" }))}>
          email
        </span>
      </h1>
      <AuthInput
        icon={<Mail size={18} />}
        placeholder="test@test.com"
        color="cyan"
        error={errors.email?.message}
        type="email"
        register={register("email", {
          required: "Это поле обязательно",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Неверный формат почты",
          },
        })}
      />
      <h1 className="text-2xl">
        Введите{" "}
        <span className={clsx(uniqueText({ color: "violet", size: "sm" }))}>
          пароль
        </span>
      </h1>
      <PasswordInput
        icon={<KeyRound size={18} />}
        placeholder="qwerty"
        toggle={togglePassword.toggle}
        visible={togglePassword.visible}
        type={togglePassword.type}
        error={errors.password?.message}
        register={register("password", {
          required: "Пароль обязателен",
          minLength: {
            value: 6,
            message: "Минимум 6 символов",
          },
        })}
        color="violet"
      />
      <div className="mt-10 w-full flex justify-center">
        <Button size="lg" disabled={isLoading} variant="secondary">
          Sign In
        </Button>
      </div>
      {errorMessage ? (
        <div className="text-rose-500">{errorMessage}</div>
      ) : (
        <div className="p-5"></div>
      )}
    </form>
  );
}
