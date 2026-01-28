"use client";
import Image from "next/image";

interface DeletePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPhoto: any;
  onDelete: () => void;
  isPending: boolean;
}

export function DeletePhotoModal({
  isOpen,
  onClose,
  selectedPhoto,
  onDelete,
  isPending,
}: DeletePhotoModalProps) {
  if (!isOpen || !selectedPhoto) return null;

  const getPhotoUrl = (photoUrl: string) => {
    if (!photoUrl) return "";
    if (photoUrl.startsWith("http://") || photoUrl.startsWith("https://"))
      return photoUrl;
    if (photoUrl.startsWith("/static/"))
      return `http://localhost:3000${photoUrl}`;
    return `http://localhost:3000/static/${photoUrl}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-white/10 rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-2 text-red-500 mb-4">
          <span className="text-xl">⚠️</span>
          <h3 className="text-lg font-bold">Удаление фотографии</h3>
        </div>

        <p className="text-gray-300 mb-4">
          Вы уверены, что хотите удалить эту фотографию?
        </p>

        <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
          <div className="aspect-video relative rounded overflow-hidden mb-3">
            <Image
              src={getPhotoUrl(selectedPhoto.url)}
              alt={selectedPhoto.originalName}
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
          <p className="text-sm text-gray-300 truncate">
            {selectedPhoto.originalName}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 text-gray-300 hover:text-white disabled:text-gray-500"
          >
            Отмена
          </button>
          <button
            onClick={onDelete}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white rounded-lg flex items-center gap-2"
          >
            {isPending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              ""
            )}
            {isPending ? "Удаление..." : "Удалить фото"}
          </button>
        </div>
      </div>
    </div>
  );
}
