"use client";
import { useForm } from "react-hook-form";
import { CreateItemDto } from "@/server/generate/generate";
import { useCreateItemMutation } from "../model/useCardItemQuery";
import { useSessionQuery } from "@/components/registration/session-entities";
import { useUploadPhotosMutation } from "../model/useItemPhotoMutation";
import { useState } from "react";

export function CreateItemForm({ onComplete }: { onComplete?: () => void }) {
  const { data: user, isLoading: isUserLoading } = useSessionQuery();
  const { register, handleSubmit, reset } = useForm<CreateItemDto>();
  const createMutation = useCreateItemMutation();
  const uploadPhotos = useUploadPhotosMutation();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const onSubmit = async (data: CreateItemDto) => {
    if (!user?.id) {
      alert("Вы должны быть авторизованы!");
      return;
    }
    const finalData: CreateItemDto = {
      ...data,
      authorId: Number(user.id),
      published: Boolean(data.published),

      content: {
        type: data.content.type,
        subtype: data.content.subtype,
        size: data.content.size,
      },
    };

    createMutation.mutate(finalData, {
      onSuccess: async (newItem: any) => {
        if (selectedFiles && selectedFiles.length > 0) {
          await uploadPhotos.mutateAsync({
            itemId: newItem.id,
            files: selectedFiles,
          });
        }
        reset();
        setSelectedFiles(null);
        onComplete?.();
      },
    });
  };

  if (isUserLoading) return <div>Проверка авторизации...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded-2xl bg-stone-950 text-white"
    >
      <input type="hidden" {...register("authorId")} />
      <h3 className="text-lg font-bold">Создать небесное тело</h3>
      <div>
        <label className="block text-sm mb-1 text-stone-400">Название</label>
        <input
          {...register("title")}
          className="border border-stone-700 p-2 w-full rounded bg-stone-900 focus:border-blue-500 outline-none transition-all"
          placeholder="например, TON-618"
          required
        />
      </div>

      <div className="border border-stone-800 p-3 rounded bg-stone-900/50">
        <p className="text-sm font-semibold mb-2 text-stone-300">
          Характеристики объекта
        </p>
        <div className="grid gap-2">
          <input
            {...register("content.type")}
            className="border border-stone-700 p-2 bg-stone-900 rounded outline-none focus:border-blue-500"
            placeholder="Тип (Черная дыра)"
            required
          />
          <input
            {...register("content.subtype")}
            className="border border-stone-700 p-2 bg-stone-900 rounded outline-none focus:border-blue-500"
            placeholder="Сабтип (Сверхмассивная)"
            required
          />
          <input
            {...register("content.size")}
            className="border border-stone-700 p-2 bg-stone-900 rounded outline-none focus:border-blue-500"
            placeholder="Размер (390 млрд км)"
            required
          />
        </div>
      </div>
      <div className="border border-dashed border-stone-700 p-4 rounded-xl bg-stone-900/30 hover:bg-stone-900/50 transition-colors">
        <label className="block text-sm font-semibold mb-2 text-stone-300">
          Фотографии
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setSelectedFiles(e.target.files)}
          className="block w-full text-sm text-stone-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white
            hover:file:bg-blue-700 cursor-pointer"
        />
        {selectedFiles && selectedFiles.length > 0 && (
          <div className="mt-3 space-y-1">
            <p className="text-xs text-blue-400 font-medium">
              Выбрано файлов: {selectedFiles.length}
            </p>
            <ul className="text-[10px] text-stone-500 truncate">
              {Array.from(selectedFiles).map((file, i) => (
                <li key={i}>• {file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 py-2">
        <input
          type="checkbox"
          {...register("published")}
          id="published"
          className="w-4 h-4 accent-blue-500"
        />
        <label
          htmlFor="published"
          className="text-sm text-stone-300 cursor-pointer"
        >
          Опубликовать сразу
        </label>
      </div>

      <button
        type="submit"
        disabled={createMutation.isPending || uploadPhotos.isPending}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl transition-colors disabled:bg-stone-700 disabled:text-stone-500"
      >
        {createMutation.isPending || uploadPhotos.isPending
          ? "Обработка..."
          : "Создать объект"}
      </button>

      {createMutation.isError && (
        <p className="text-red-400 text-sm mt-2">
          Ошибка: {createMutation.error.message}
        </p>
      )}
    </form>
  );
}
