"use client";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useItemDetailsQuery } from "../../../components/card/model/use-item-details-query";
import { useUploadPhotosMutation } from "@/components/card/model/useItemPhotoMutation";
import {
  useDeleteItem,
  useDeletePhoto,
} from "@/components/card/model/use-item-delete-mutation";
import { ItemHeader } from "../../../components/item-profile/ui/ItemHeader";
import { PhotoGallery } from "../../../components/item-profile/ui/PhotoGallery";
import { ItemSidebar } from "../../../components/item-profile/ui/ItemSidebar";
import { DeleteItemModal } from "../../../components/item-profile/ui/DeleteItemModal";
import { DeletePhotoModal } from "../../../components/item-profile/ui/DeletePhotoModal";
import { LoadingState } from "../../../components/item-profile/ui/LoadingState";
import { ErrorState } from "../../../components/item-profile/ui/ErrorState";

export default function ItemPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id as string;

  const [photoToDelete, setPhotoToDelete] = useState<number | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [showAllPhotos, setShowAllPhotos] = useState<boolean>(false);
  const [isDeleteItemOpen, setIsDeleteItemOpen] = useState(false);
  const [isDeletePhotoOpen, setIsDeletePhotoOpen] = useState(false);

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
    }
  };

  const handleDeleteItem = () => {
    deleteItemMutation.mutate(id, {
      onSuccess: () => {
        router.push("/");
        setIsDeleteItemOpen(false);
      },
    });
  };

  const handleDeletePhoto = () => {
    if (photoToDelete) {
      deletePhotoMutation.mutate(photoToDelete, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["item", id] });
          queryClient.invalidateQueries({ queryKey: ["item"] });
          setIsDeletePhotoOpen(false);
          setPhotoToDelete(null);
        },
      });
    }
  };

  const openDeletePhotoModal = (photoId: number) => {
    setPhotoToDelete(photoId);
    setIsDeletePhotoOpen(true);
  };

  if (isLoading) return <LoadingState />;
  if (error || !item) return <ErrorState router={router} />;

  const photos = item.photos || [];
  const selectedPhoto = photos[selectedPhotoIndex];

  return (
    <main className="min-h-screen px-10 py-5 bg-gradient-to-br from-gray-900 via-black to-blue-900/20 rounded-2xl border-t border-blue-500/30 shadow-[0_-2px_30px_rgba(59,130,246,0.3),0_-1px_15px_rgba(168,85,247,0.2),0_0_5px_rgba(236,72,153,0.1)] mb-20">
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-grid" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <ItemHeader
          item={item}
          router={router}
          onDeleteClick={() => setIsDeleteItemOpen(true)}
          onUploadClick={() => document.getElementById("file-input")?.click()}
          isUploadPending={uploadPhotosMutation.isPending}
          isDeletePending={deleteItemMutation.isPending}
        />

        <input
          id="file-input"
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && handleUploadPhotos(e.target.files)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <PhotoGallery
              photos={photos}
              selectedPhotoIndex={selectedPhotoIndex}
              showAllPhotos={showAllPhotos}
              onSelectPhoto={setSelectedPhotoIndex}
              onToggleShowAll={() => setShowAllPhotos(!showAllPhotos)}
              onDeletePhoto={openDeletePhotoModal}
              selectedPhoto={selectedPhoto}
              isDeletePending={deletePhotoMutation.isPending}
            />
          </div>

          <ItemSidebar
            item={item}
            photos={photos}
            router={router}
            itemId={id}
            isUploadPending={uploadPhotosMutation.isPending}
          />
        </div>

        <DeleteItemModal
          isOpen={isDeleteItemOpen}
          onClose={() => setIsDeleteItemOpen(false)}
          item={item}
          onDelete={handleDeleteItem}
          isPending={deleteItemMutation.isPending}
        />

        <DeletePhotoModal
          isOpen={isDeletePhotoOpen}
          onClose={() => setIsDeletePhotoOpen(false)}
          selectedPhoto={selectedPhoto}
          onDelete={handleDeletePhoto}
          isPending={deletePhotoMutation.isPending}
        />
      </div>
    </main>
  );
}
