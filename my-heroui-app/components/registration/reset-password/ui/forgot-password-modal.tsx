"use client";
import { useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { AuthInput } from "@/shared/ui/input/auth-input";
import { PasswordInput } from "@/shared/ui/input/input-password";
import { Mail, KeyRound, Lock, CheckCircle2 } from "lucide-react";
import {
  useForgotPassword,
  useResetPasswordConfirm,
} from "../model/use-reset-password";
import { usePasswordToggle } from "@/components/registration/auth/change-password/utils/use-password-toggle";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [savedEmail, setSavedEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const forgotPwd = useForgotPassword();
  const resetPwd = useResetPasswordConfirm();
  const newPwdToggle = usePasswordToggle();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("email");
      setIsSuccess(false);
    }, 300);
  };

  const onSendCode = (data: { email: string }) => {
    setSavedEmail(data.email);
    forgotPwd.mutation.mutate(data, {
      onSuccess: () => setStep("code"),
    });
  };

  const onReset = (data: any) => {
    resetPwd.mutation.mutate(
      {
        email: savedEmail,
        code: data.code,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#0b0b14] border border-cyan-500/20 rounded-2xl p-6 shadow-2xl relative transition-all">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center py-8 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="text-emerald-500" size={40} />
            </div>
            <h2 className="text-2xl text-white font-bold mb-2 text-center">
              Готово!
            </h2>
            <p className="text-slate-400 text-center mb-6">
              Ваш пароль успешно изменен. Теперь вы можете войти в аккаунт.
            </p>
            <Button
              onClick={handleClose}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-full"
            >
              Вернуться к входу
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl text-white text-center mb-6 font-bold">
              {step === "email" ? "Restore Access" : "Enter Code"}
            </h2>

            {step === "email" && (
              <form
                onSubmit={forgotPwd.handleSubmit(onSendCode)}
                className="flex flex-col gap-4"
              >
                <AuthInput
                  icon={<Mail size={18} />}
                  placeholder="Email"
                  color="cyan"
                  type="email"
                  error={forgotPwd.errors.email?.message}
                  register={forgotPwd.register("email", {
                    required: "Required",
                  })}
                />
                <Button
                  size="lg"
                  className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  disabled={forgotPwd.mutation.isPending}
                >
                  {forgotPwd.mutation.isPending ? "Sending..." : "Send Code"}
                </Button>
              </form>
            )}

            {step === "code" && (
              <form
                onSubmit={resetPwd.handleSubmit(onReset)}
                className="flex flex-col gap-4"
              >
                <AuthInput
                  icon={<KeyRound size={18} />}
                  placeholder="Code (6 digits)"
                  color="violet"
                  type="text"
                  error={resetPwd.errors.code?.message}
                  register={resetPwd.register("code", { required: "Required" })}
                />
                <PasswordInput
                  icon={<Lock size={18} />}
                  placeholder="New Password"
                  color="violet"
                  error={resetPwd.errors.newPassword?.message}
                  toggle={newPwdToggle.toggle}
                  visible={newPwdToggle.visible}
                  type={newPwdToggle.type}
                  register={resetPwd.register("newPassword", {
                    required: "Required",
                    minLength: { value: 6, message: "Min 6 chars" },
                  })}
                />
                <Button
                  size="lg"
                  className="mt-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full"
                  disabled={resetPwd.mutation.isPending}
                >
                  {resetPwd.mutation.isPending
                    ? "Saving..."
                    : "Change Password"}
                </Button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
