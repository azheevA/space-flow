"use client";
import { useForm } from "react-hook-form";
import { useRef, useState, DragEvent } from "react";
import { CreateItemDto } from "@/server/generate/generate";
import { useSessionQuery } from "@/components/registration/session-entities";
import {
  Rocket,
  Layers,
  Tag,
  Maximize,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  X,
} from "lucide-react";
import { AuthInput } from "@/shared/ui/input/auth-input";
import { Button } from "@/shared/ui/button/button";
import { useCreateItemMutation } from "@/components/card/model/useCardItemQuery";
import { useUploadPhotosMutation } from "@/components/card/model/useItemPhotoMutation";
import clsx from "clsx";

export default function CreateItemForm({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const { data: user, isLoading: isUserLoading } = useSessionQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateItemDto>();
  const createMutation = useCreateItemMutation();
  const uploadPhotos = useUploadPhotosMutation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CreateItemDto) => {
    if (!user?.id) return alert("Вы должны быть авторизованы!");

    const finalData: CreateItemDto = {
      ...data,
      authorId: Number(user.id),
      published: Boolean(data.published),
      content: { ...data.content },
    };

    createMutation.mutate(finalData, {
      onSuccess: async (newItem: any) => {
        if (selectedFiles.length > 0) {
          const dataTransfer = new DataTransfer();
          selectedFiles.forEach((file) => dataTransfer.items.add(file));

          await uploadPhotos.mutateAsync({
            itemId: newItem.id,
            files: dataTransfer.files,
          });
        }
        reset();
        setSelectedFiles([]);
        onComplete?.();
      },
    });
  };

  if (isUserLoading)
    return (
      <p className="text-center text-cyan-500 animate-pulse">
        Инициализация систем...
      </p>
    );

  return (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-[#0b0b14] border border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.15)] max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-3">
        <Rocket className="text-cyan-400 animate-bounce-slow" size={28} />
        <h2 className="text-xl text-white font-bold tracking-tight">
          Новый небесный объект
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <AuthInput
          icon={<Rocket size={18} />}
          placeholder="Название (напр. Messier 87)"
          color="cyan"
          register={register("title", { required: "Введите название" })}
          error={errors.title?.message}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AuthInput
            icon={<Layers size={18} />}
            placeholder="Тип объекта"
            color="violet"
            register={register("content.type", { required: "Укажите тип" })}
            error={errors.content?.type?.message}
          />
          <AuthInput
            icon={<Tag size={18} />}
            placeholder="Подтип"
            color="violet"
            register={register("content.subtype")}
          />
        </div>

        <AuthInput
          icon={<Maximize size={18} />}
          placeholder="Масштаб / Масса"
          color="emerald"
          register={register("content.size")}
        />
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={clsx(
            "relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer",
            isDragging
              ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              : "border-cyan-500/20 bg-black/40 hover:border-cyan-500/40",
          )}
        >
          <input
            type="file"
            multiple
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={(e) => {
              if (e.target.files)
                setSelectedFiles((prev) => [
                  ...prev,
                  ...Array.from(e.target.files!),
                ]);
            }}
          />
          <UploadCloud
            className={clsx(
              "transition-transform duration-300",
              isDragging ? "scale-125 text-cyan-400" : "text-slate-500",
            )}
            size={40}
          />
          <div className="text-center">
            <p className="text-sm text-slate-300 font-medium">
              Перетащите фото сюда или кликните
            </p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">
              PNG, JPG до 10MB
            </p>
          </div>

          {selectedFiles.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-2 w-full">
              {selectedFiles.map((file, i) => (
                <div
                  key={i}
                  className="group relative flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full"
                >
                  <span className="text-[10px] text-cyan-400 truncate max-w-[100px]">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    className="text-slate-500 hover:text-rose-500 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <label className="flex items-center gap-3 cursor-pointer group px-2">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              {...register("published")}
              className="peer h-5 w-5 opacity-0 absolute cursor-pointer"
            />
            <div className="h-5 w-5 border-2 border-cyan-500/50 rounded shadow-[0_0_10px_rgba(34,211,238,0.2)] peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all">
              <CheckCircle2
                size={16}
                className="text-white scale-0 peer-checked:scale-100 transition-transform"
              />
            </div>
          </div>
          <span className="text-slate-400 text-xs group-hover:text-cyan-400 transition-colors">
            Активировать протокол публикации
          </span>
        </label>
        <Button
          type="submit"
          disabled={createMutation.isPending || uploadPhotos.isPending}
          className="
            mt-2 rounded-xl py-4 px-8 text-sm font-bold uppercase tracking-widest
            bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600
            hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]
            disabled:opacity-40 transition-all duration-300
            active:scale-95 mx-auto w-[80%]
          "
        >
          {createMutation.isPending || uploadPhotos.isPending ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-3 w-3 border-2 border-white/30 border-t-white" />
              Синхронизация...
            </span>
          ) : (
            "Создать объект"
          )}
        </Button>

        {createMutation.isError && (
          <div className="flex items-center gap-2 text-rose-500 text-[10px] justify-center bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
            <AlertCircle size={14} />
            <span>Ошибка системы: {createMutation.error.message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
