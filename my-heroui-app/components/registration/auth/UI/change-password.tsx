"use client";

import { Button } from "@/shared/ui/button";
import { useChangePassword } from "../model/use-change-password";
import { Lock, KeyRound, ShieldCheck } from "lucide-react";
import { usePasswordToggle } from "../model/use-password-toggle";
import { PasswordInput } from "@/shared/ui/input-password";

export function ChangePasswordForm() {
  const { register, handleSubmit, isLoading, errorMessage, formErrors } =
    useChangePassword();

  const oldPwd = usePasswordToggle();
  const newAndConfirmPwd = usePasswordToggle();

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col gap-6 p-8
        rounded-2xl bg-[#0b0b14]
        border border-cyan-500/20
        shadow-[0_0_40px_rgba(34,211,238,0.15)]
        max-w-md mx-auto
      "
    >
      <h2 className="text-2xl text-white text-center">🔐 Смена пароля</h2>
      <PasswordInput
        icon={<Lock size={18} />}
        placeholder="Старый пароль"
        error={formErrors.oldPassword?.message}
        type={oldPwd.type}
        toggle={oldPwd.toggle}
        visible={oldPwd.visible}
        register={register("oldPassword", {
          required: "Введите старый пароль",
        })}
        color="cyan"
      />
      <PasswordInput
        icon={<KeyRound size={18} />}
        placeholder="Новый пароль"
        error={formErrors.newPassword?.message}
        type={newAndConfirmPwd.type}
        toggle={newAndConfirmPwd.toggle}
        visible={newAndConfirmPwd.visible}
        register={register("newPassword", {
          required: "Введите новый пароль",
          minLength: {
            value: 6,
            message: "Минимум 6 символов",
          },
        })}
        color="violet"
      />
      <PasswordInput
        icon={<ShieldCheck size={18} />}
        placeholder="Повторите новый пароль"
        error={formErrors.confirmNewPassword?.message}
        type={newAndConfirmPwd.type}
        toggle={newAndConfirmPwd.toggle}
        visible={newAndConfirmPwd.visible}
        register={register("confirmNewPassword", {
          required: "Подтвердите новый пароль",
        })}
        color="emerald"
      />

      <Button
        size="lg"
        disabled={isLoading}
        className="
          mt-4 rounded-full
          bg-gradient-to-r from-cyan-500 to-violet-600
        "
      >
        {isLoading ? "Сохраняем..." : "Изменить пароль"}
      </Button>

      {errorMessage && (
        <p className="text-center text-rose-500 text-sm">{errorMessage}</p>
      )}
    </form>
  );
}
