"use client";
import Image from "next/image";
import { ImageIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface PhotoGalleryProps {
  photos: any[];
  selectedPhotoIndex: number;
  showAllPhotos: boolean;
  selectedPhoto: any;
  isDeletePending: boolean;
  onSelectPhoto: (index: number) => void;
  onToggleShowAll: () => void;
  onDeletePhoto: (id: number) => void;
}

export function PhotoGallery({
  photos,
  selectedPhotoIndex,
  showAllPhotos,
  selectedPhoto,
  isDeletePending,
  onSelectPhoto,
  onToggleShowAll,
  onDeletePhoto,
}: PhotoGalleryProps) {
  const getPhotoUrl = (photoUrl: string) => {
    if (!photoUrl) return "";
    if (photoUrl.startsWith("http://") || photoUrl.startsWith("https://"))
      return photoUrl;
    if (photoUrl.startsWith("/static/"))
      return `http://localhost:3000${photoUrl}`;
    return `http://localhost:3000/static/${photoUrl}`;
  };

  const displayedPhotos = showAllPhotos ? photos : photos.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm rounded-xl">
        <div className="aspect-[16/9] relative">
          {selectedPhoto ? (
            <Image
              src={getPhotoUrl(selectedPhoto.url)}
              alt={selectedPhoto.originalName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
              <ImageIcon className="w-16 h-16 mb-4" />
              <p className="text-lg font-medium">Нет фотографий</p>
              <p className="text-sm">Нажмите "Добавить фото" для загрузки</p>
            </div>
          )}

          {selectedPhoto && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-white truncate">
                  {selectedPhoto.originalName}
                </p>
                <button
                  onClick={() => onDeletePhoto(selectedPhoto.id)}
                  disabled={isDeletePending}
                  className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 text-sm rounded-lg flex items-center gap-1"
                >
                  Удалить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {photos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">
                Все фото ({photos.length})
              </h3>
            </div>

            {photos.length > 4 && (
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                  {displayedPhotos.length} из {photos.length}
                </span>

                <button
                  onClick={onToggleShowAll}
                  className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded flex items-center gap-1 text-sm"
                >
                  {showAllPhotos ? (
                    <>
                      <ChevronUpIcon className="w-4 h-4" /> Свернуть
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon className="w-4 h-4" /> Развернуть
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayedPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(index)}
                className={`aspect-square cursor-pointer overflow-hidden border-2 transition-all rounded-2xl ${
                  selectedPhotoIndex === index
                    ? "border-blue-500 ring-2 ring-blue-500/20"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={getPhotoUrl(photo.url)}
                    alt={photo.originalName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePhoto(photo.id);
                    }}
                    className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-lg opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    🗑️
                  </div>
                </div>
              </div>
            ))}
          </div>

          {photos.length > 4 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={onToggleShowAll}
                className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-lg flex items-center gap-2"
              >
                {showAllPhotos ? (
                  <>
                    <ChevronUpIcon className="w-4 h-4" /> Свернуть галерею
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="w-4 h-4" /> Показать все
                    фотографии ({photos.length})
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
