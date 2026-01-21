"use client";
import { useParams, useRouter } from "next/navigation";
import { useItemDetailsQuery } from "../../../components/UI/card/queries/use-item-details-query";
import Image from "next/image";
import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadPhotosMutation } from "@/components/UI/card/queries/useItemPhotoMutation";
import {
  useDeleteItem,
  useDeletePhoto,
} from "@/components/UI/card/queries/use-item-delete-mutation";

export default function ItemPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: item, isLoading, error } = useItemDetailsQuery(id);
  const uploadPhotosMutation = useUploadPhotosMutation();
  const deleteItemMutation = useDeleteItem();
  const deletePhotoMutation = useDeletePhoto();

  const handleUploadPhotos = async (files: FileList) => {
    if (!files || files.length === 0) return;

    try {
      await uploadPhotosMutation.mutateAsync({
        itemId: Number(id),
        files: files,
      });
      queryClient.invalidateQueries({ queryKey: ["item", id] });
      queryClient.invalidateQueries({ queryKey: ["item"] });
    } catch (error) {
      console.error("Ошибка при загрузке фотографий:", error);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const handleDeleteItem = () => {
    if (window.confirm("Вы уверены, что хотите удалить этот объект?")) {
      deleteItemMutation.mutate(id, {
        onSuccess: () => {
          router.push("/");
        },
      });
    }
  };
  const handleDeletePhoto = (photoId: number) => {
    if (window.confirm("Вы уверены, что хотите удалить эту фотографию?")) {
      deletePhotoMutation.mutate(photoId);
    }
  };

  if (isLoading)
    return <div className="p-10 text-white">Загрузка данных об объекте...</div>;
  if (error || !item)
    return <div className="p-10 text-red-500">Объект не найден</div>;

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto"></div>
    </main>
  );
}
