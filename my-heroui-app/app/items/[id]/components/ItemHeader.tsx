import { Divider } from "@heroui/react";
import { UserIcon, CalendarIcon, ArrowLeftIcon } from "lucide-react";

interface ItemHeaderProps {
  item: any;
  router: any;
  onDeleteClick: () => void;
  onUploadClick: () => void;
  isUploadPending: boolean;
  isDeletePending: boolean;
}

export function ItemHeader({
  item,
  router,
  onDeleteClick,
  onUploadClick,
  isUploadPending,
  isDeletePending,
}: ItemHeaderProps) {
  return (
    <div className="mb-8">
      <button
        onClick={() => router.push("/")}
        className="mb-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Назад
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {item.title}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${item.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
            >
              {item.published ? "Опубликовано" : "Черновик"}
            </span>
          </div>

          {item.author && (
            <div className="flex items-center gap-2 text-gray-300">
              <UserIcon className="w-4 h-4" />
              <span>Автор: {item.author.name || item.author.email}</span>
              <Divider orientation="vertical" className="h-4" />
              <CalendarIcon className="w-4 h-4" />
              <span>ID: {item.id}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onUploadClick}
            disabled={isUploadPending}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            {isUploadPending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              "📤"
            )}
            Добавить фото
          </button>

          <button
            onClick={onDeleteClick}
            disabled={isDeletePending}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 disabled:bg-red-600/10 text-red-400 border border-red-500/30 rounded-lg transition-colors flex items-center gap-2"
          >
            🗑️ Удалить объект
          </button>
        </div>
      </div>
    </div>
  );
}
