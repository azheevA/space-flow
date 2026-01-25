"use client";
import { Button } from "@/shared/ui/button";
import { User, ImagePlus } from "lucide-react";
import clsx from "clsx";
import { useProfile } from "./hooks/use-profile";
import { useUpdateProfile } from "./hooks/use-update-profile";
import { useUploadAvatar } from "./hooks/use-upload-avatar";

export function ProfileForm() {
  const { data: user, isLoading } = useProfile();
  const updateProfile = useUpdateProfile(user?.name);
  const uploadAvatar = useUploadAvatar();

  if (isLoading) {
    return <p className="text-center text-slate-400">Загрузка профиля...</p>;
  }

  return (
    <div
      className="
        flex flex-col gap-8 p-8
        rounded-2xl bg-[#0b0b14]
        border border-cyan-500/20
        shadow-[0_0_40px_rgba(34,211,238,0.15)]
        max-w-md mx-auto
      "
    >
      <h2 className="text-2xl text-white text-center">👤 Профиль</h2>
      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photo?.url || "/avatar-placeholder.png"}
          className="w-32 h-32 rounded-full object-cover border border-cyan-500/40"
        />

        <label className="cursor-pointer">
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadAvatar.mutate(file);
            }}
          />
          <Button
            size="sm"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-600"
          >
            <ImagePlus size={16} className="mr-2" />
            Сменить аватар
          </Button>
        </label>
      </div>
      <form
        onSubmit={updateProfile.handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <div
            className={clsx(
              "flex items-center gap-3 px-5 py-3 rounded-full bg-black border",
              updateProfile.errors.name
                ? "border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]"
                : "border-cyan-500/60 shadow-[0_0_15px_rgba(34,211,238,0.4)]",
            )}
          >
            <User size={18} className="text-slate-300" />
            <input
              {...updateProfile.register("name", {
                required: "Введите имя",
                minLength: { value: 2, message: "Минимум 2 символа" },
              })}
              placeholder="Ваше имя"
              className="
                bg-transparent w-full text-white outline-none
                placeholder:text-slate-500
              "
            />
          </div>

          {updateProfile.errors.name && (
            <span className="text-rose-500 text-sm pl-4">
              {updateProfile.errors.name.message}
            </span>
          )}
        </div>

        <Button
          size="lg"
          disabled={updateProfile.isLoading}
          className="
            mt-2 rounded-full
            bg-gradient-to-r from-cyan-500 to-violet-600
          "
        >
          {updateProfile.isLoading ? "Сохраняем..." : "Сохранить изменения"}
        </Button>
      </form>
    </div>
  );
}
