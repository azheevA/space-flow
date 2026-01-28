interface DeleteItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  onDelete: () => void;
  isPending: boolean;
}

export function DeleteItemModal({
  isOpen,
  onClose,
  item,
  onDelete,
  isPending,
}: DeleteItemModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-white/10 rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-2 text-red-500 mb-4">
          <span className="text-xl">⚠️</span>
          <h3 className="text-lg font-bold">Удаление объекта</h3>
        </div>

        <p className="text-gray-300 mb-4">
          Вы уверены, что хотите удалить объект{" "}
          <strong className="text-white">{item.title}</strong>? Это действие
          нельзя отменить.
        </p>

        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400">
            ⚠️ Вместе с объектом будут удалены все связанные фотографии и
            контент.
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
              "🗑️"
            )}
            {isPending ? "Удаление..." : "Удалить объект"}
          </button>
        </div>
      </div>
    </div>
  );
}
