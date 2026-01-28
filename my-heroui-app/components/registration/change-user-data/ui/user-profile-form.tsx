"use client";
import { useState, useRef, DragEvent } from "react";
import { Button } from "@/shared/ui/button/button";
import { User, ImagePlus, Upload } from "lucide-react";
import clsx from "clsx";
import { useProfile } from "../model/use-profile";
import { useUpdateProfile } from "../model/use-update-profile";
import { useUploadAvatar } from "../model/use-upload-avatar";
import { AvatarCropModal } from "./avatar-crop-modal";

export function ProfileForm() {
  const { data: user, isLoading } = useProfile();
  const updateProfile = useUpdateProfile(user?.name);
  const uploadAvatar = useUploadAvatar();

  const [isDragging, setIsDragging] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setCropImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  if (isLoading) {
    return (
      <p className="text-center text-cyan-500 animate-pulse mt-10">
        Загрузка данных...
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-[#0b0b14] border border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.15)] max-w-md mx-auto">
      <h2 className="text-2xl text-white text-center font-bold">👤 Профиль</h2>

      <div className="flex flex-col items-center gap-6">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="relative cursor-pointer"
        >
          <div
            className={clsx(
              "w-36 h-36 rounded-full flex items-center justify-center transition-all",
              isDragging && "scale-105",
            )}
          >
            <div
              className={clsx(
                "absolute inset-0 rounded-full border-2 border-dashed transition-all",
                isDragging
                  ? "border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.6)]"
                  : "border-cyan-500/40",
              )}
            />

            <div className="w-30 h-30 rounded-full overflow-hidden relative z-10">
              <img
                src={user?.photo?.url || "/avatar-placeholder.png"}
                className={clsx(
                  "w-full h-full object-cover transition-opacity",
                  isDragging ? "opacity-40" : "hover:opacity-60",
                )}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                {isDragging ? (
                  <Upload className="text-cyan-400 animate-bounce" size={30} />
                ) : (
                  <ImagePlus className="text-white/80" size={24} />
                )}
              </div>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        />

        {cropImage && (
          <AvatarCropModal
            image={cropImage}
            onClose={() => setCropImage(null)}
            onSave={(file) =>
              uploadAvatar.mutate(file, {
                onSuccess: () => setCropImage(null),
              })
            }
          />
        )}
      </div>
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <span className="text-[12px] tracking-widest text-slate-500 uppercase">
          Изменение имени
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      </div>
      <form
        onSubmit={updateProfile.handleSubmit}
        className="flex flex-col gap-4"
      >
        <div
          className={clsx(
            "flex items-center gap-3 px-5 py-3 rounded-full bg-black border",
            updateProfile.errors.name
              ? "border-rose-500"
              : "border-cyan-500/60",
          )}
        >
          <User size={18} className="text-slate-300" />
          <input
            {...updateProfile.register("name", {
              required: "Введите имя",
              minLength: { value: 2, message: "Минимум 2 символа" },
            })}
            defaultValue={user?.name}
            placeholder="Ввести новое имя"
            className="bg-transparent w-full text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <Button
          size="lg"
          disabled={updateProfile.isLoading}
          className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-600"
        >
          {updateProfile.isLoading ? "Сохранение..." : "Сохранить"}
        </Button>
      </form>
    </div>
  );
}
