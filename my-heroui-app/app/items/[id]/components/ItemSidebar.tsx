import { Divider } from "@heroui/react";
import {
  GlobeIcon,
  CalendarIcon,
  UserIcon,
  StarIcon,
  EditIcon,
} from "lucide-react";

interface ItemSidebarProps {
  item: any;
  photos: any[];
  router: any;
  itemId: string;
  isUploadPending: boolean;
}

export function ItemSidebar({
  item,
  photos,
  router,
  itemId,
  isUploadPending,
}: ItemSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="border border-white/10 bg-black/40 backdrop-blur-sm p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-6">
          <GlobeIcon className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Характеристики</h2>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Тип объекта</p>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg">
              {item.content?.type || "Не указано"}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Подтип</p>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg">
              {item.content?.subtype || "Не указано"}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Размер</p>
            <div className="flex items-center gap-2">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <p className="text-lg font-semibold text-white">
                {item.content?.size || "Не указано"}
              </p>
            </div>
          </div>

          <Divider className="my-4" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">ID автора</p>
              <p className="text-white font-medium">{item.authorId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">Фотографии</p>
              <div className="flex items-center justify-center gap-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                  {photos.length}
                </span>
                <span className="text-white">шт.</span>
              </div>
            </div>
          </div>

          {item.content && (
            <>
              <Divider className="my-4" />
              <div>
                <p className="text-sm text-gray-400 mb-2">
                  Техническая информация
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">ID контента:</span>
                    <span className="text-white font-mono">
                      {item.content.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">ID объекта:</span>
                    <span className="text-white font-mono">
                      {item.content.itemId}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border border-white/10 bg-black/40 backdrop-blur-sm p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Статистика</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Статус</span>
            <span
              className={`px-2 py-1 rounded text-sm ${item.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
            >
              {item.published ? "Активен" : "В черновике"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Автор</span>
            <span className="text-white">
              {item.author?.email?.split("@")[0] || "Аноним"}
            </span>
          </div>

          {item.createdAt && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Создан</span>
              </div>
              <span className="text-white">
                {new Date(item.createdAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="border border-white/10 bg-black/40 backdrop-blur-sm p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">
          Быстрые действия
        </h3>
        <div className="space-y-3">
          <button
            onClick={() => router.push(`/edit/${itemId}`)}
            className="w-full px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <EditIcon className="w-4 h-4" />
            Редактировать объект
          </button>

          <button
            onClick={() => document.getElementById("file-input")?.click()}
            disabled={isUploadPending}
            className="w-full px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 disabled:bg-yellow-600/10 text-yellow-300 border border-yellow-500/30 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isUploadPending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-300"></div>
            ) : (
              ""
            )}
            Загрузить ещё фото
          </button>
        </div>
      </div>
    </div>
  );
}
